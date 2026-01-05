-- Update generate_nip to use clean format without dots
CREATE OR REPLACE FUNCTION public.generate_nip(p_claim_id uuid, p_region_id uuid)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
    v_year TEXT;
    v_region_code TEXT;
    v_sequence INTEGER;
    v_nip TEXT;
BEGIN
    -- Get 2-digit year
    v_year := TO_CHAR(NOW(), 'YY');
    
    -- Get region code (must be exactly 2 digits)
    SELECT code INTO v_region_code
    FROM public.regions
    WHERE id = p_region_id;
    
    -- Validate region code is 2 digits
    IF v_region_code IS NULL OR LENGTH(v_region_code) != 2 OR v_region_code !~ '^[0-9]{2}$' THEN
        RAISE EXCEPTION 'Region code must be exactly 2 digits. Please configure the region code first.';
    END IF;
    
    -- Get next sequence number for this region (count approved claims in this region)
    SELECT COALESCE(COUNT(*), 0) + 1 INTO v_sequence
    FROM public.pesantren_claims
    WHERE region_id = p_region_id
      AND mpj_id_number IS NOT NULL;
    
    -- Format NIP: YYRRXXX (clean format without dots)
    v_nip := v_year || v_region_code || LPAD(v_sequence::TEXT, 3, '0');
    
    -- Update the claim with the NIP
    UPDATE public.pesantren_claims
    SET mpj_id_number = v_nip
    WHERE id = p_claim_id;
    
    RETURN v_nip;
END;
$function$;

-- Update generate_niam to use clean format without dots
CREATE OR REPLACE FUNCTION public.generate_niam(p_crew_id uuid, p_profile_id uuid, p_jabatan_code_id uuid)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
    v_role_code TEXT;
    v_nip TEXT;
    v_nip_clean TEXT;
    v_sequence INTEGER;
    v_niam TEXT;
BEGIN
    -- Get role code from jabatan_codes
    SELECT code INTO v_role_code
    FROM public.jabatan_codes
    WHERE id = p_jabatan_code_id;
    
    IF v_role_code IS NULL THEN
        RAISE EXCEPTION 'Invalid jabatan code';
    END IF;
    
    -- Get NIP from pesantren_claims using profile_id
    SELECT pc.mpj_id_number INTO v_nip
    FROM public.pesantren_claims pc
    WHERE pc.user_id = p_profile_id
      AND pc.mpj_id_number IS NOT NULL
    LIMIT 1;
    
    IF v_nip IS NULL THEN
        RAISE EXCEPTION 'Institution NIP not found. Account must be activated first.';
    END IF;
    
    -- Clean NIP (remove any dots if present for backward compatibility)
    v_nip_clean := REPLACE(v_nip, '.', '');
    
    -- Get next sequence number for crew in this institution
    SELECT COALESCE(COUNT(*), 0) + 1 INTO v_sequence
    FROM public.crews
    WHERE profile_id = p_profile_id
      AND niam IS NOT NULL;
    
    -- Format NIAM: ROLEYYRRRXXXKK (clean format without dots)
    v_niam := v_role_code || v_nip_clean || LPAD(v_sequence::TEXT, 2, '0');
    
    -- Update the crew with the NIAM
    UPDATE public.crews
    SET niam = v_niam, jabatan_code_id = p_jabatan_code_id
    WHERE id = p_crew_id;
    
    RETURN v_niam;
END;
$function$;

-- Update trigger function for crew NIAM update on jabatan change
CREATE OR REPLACE FUNCTION public.update_crew_niam()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
    v_role_code TEXT;
    v_nip TEXT;
    v_nip_clean TEXT;
    v_sequence_part TEXT;
    v_new_niam TEXT;
BEGIN
    -- Only run if jabatan_code_id changed
    IF OLD.jabatan_code_id IS DISTINCT FROM NEW.jabatan_code_id AND NEW.jabatan_code_id IS NOT NULL THEN
        -- Get new role code
        SELECT code INTO v_role_code
        FROM public.jabatan_codes
        WHERE id = NEW.jabatan_code_id;
        
        IF v_role_code IS NOT NULL AND OLD.niam IS NOT NULL THEN
            -- Extract the sequence part (last 2 digits) from existing NIAM
            v_sequence_part := RIGHT(OLD.niam, 2);
            
            -- Get clean NIP from pesantren_claims
            SELECT REPLACE(pc.mpj_id_number, '.', '') INTO v_nip_clean
            FROM public.pesantren_claims pc
            WHERE pc.user_id = NEW.profile_id
              AND pc.mpj_id_number IS NOT NULL
            LIMIT 1;
            
            IF v_nip_clean IS NOT NULL AND v_sequence_part IS NOT NULL THEN
                -- Format: ROLENIPCLEANSEQUENCE
                v_new_niam := v_role_code || v_nip_clean || v_sequence_part;
                NEW.niam := v_new_niam;
            END IF;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$function$;