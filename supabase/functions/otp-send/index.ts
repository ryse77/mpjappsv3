import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OTPSendRequest {
  phone: string;
  pesantren_claim_id?: string;
}

// Generate random 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { phone, pesantren_claim_id }: OTPSendRequest = await req.json();

    if (!phone) {
      return new Response(
        JSON.stringify({ error: "Nomor telepon diperlukan" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Generate OTP
    const otpCode = generateOTP();
    
    // Set expiration to 10 minutes from now
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    // Invalidate any existing unused OTPs for this phone
    await supabase
      .from("otp_verifications")
      .update({ is_verified: true }) // Mark as used
      .eq("user_phone", phone)
      .eq("is_verified", false);

    // Insert new OTP
    const { data: otpData, error: insertError } = await supabase
      .from("otp_verifications")
      .insert({
        user_phone: phone,
        otp_code: otpCode,
        pesantren_claim_id: pesantren_claim_id || null,
        expires_at: expiresAt,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting OTP:", insertError);
      return new Response(
        JSON.stringify({ error: "Gagal membuat kode OTP" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // TODO: Integrate with WhatsApp API here
    // For now, log the OTP (remove in production)
    console.log(`OTP for ${phone}: ${otpCode}`);

    // In production, you would send via WhatsApp API like:
    // await sendWhatsAppOTP(phone, otpCode);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Kode OTP telah dikirim ke nomor WhatsApp yang terdaftar",
        otp_id: otpData.id,
        expires_at: expiresAt,
        // For development only - remove in production:
        // dev_otp: otpCode
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in otp-send function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
