import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OTPVerifyRequest {
  phone: string;
  otp_code: string;
  otp_id?: string;
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

    const { phone, otp_code, otp_id }: OTPVerifyRequest = await req.json();

    if (!phone || !otp_code) {
      return new Response(
        JSON.stringify({ error: "Nomor telepon dan kode OTP diperlukan" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Find the OTP record
    let query = supabase
      .from("otp_verifications")
      .select("*")
      .eq("user_phone", phone)
      .eq("is_verified", false)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1);

    if (otp_id) {
      query = supabase
        .from("otp_verifications")
        .select("*")
        .eq("id", otp_id)
        .eq("is_verified", false)
        .gt("expires_at", new Date().toISOString());
    }

    const { data: otpRecords, error: fetchError } = await query;

    if (fetchError || !otpRecords || otpRecords.length === 0) {
      return new Response(
        JSON.stringify({ 
          error: "Kode OTP tidak ditemukan atau sudah kadaluarsa",
          expired: true 
        }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const otpRecord = otpRecords[0];

    // Check attempts (max 5)
    if (otpRecord.attempts >= 5) {
      return new Response(
        JSON.stringify({ 
          error: "Terlalu banyak percobaan. Silakan minta kode OTP baru.",
          max_attempts: true 
        }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Verify OTP code
    if (otpRecord.otp_code !== otp_code) {
      // Increment attempts
      await supabase
        .from("otp_verifications")
        .update({ attempts: otpRecord.attempts + 1 })
        .eq("id", otpRecord.id);

      return new Response(
        JSON.stringify({ 
          error: "Kode OTP salah",
          attempts_remaining: 5 - (otpRecord.attempts + 1)
        }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // OTP is correct - mark as verified
    const { error: updateError } = await supabase
      .from("otp_verifications")
      .update({ 
        is_verified: true,
        verified_at: new Date().toISOString()
      })
      .eq("id", otpRecord.id);

    if (updateError) {
      console.error("Error updating OTP:", updateError);
      return new Response(
        JSON.stringify({ error: "Gagal memverifikasi OTP" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // If there's an associated claim, update its status
    if (otpRecord.pesantren_claim_id) {
      await supabase
        .from("pesantren_claims")
        .update({ 
          status: "pending", // Pending regional approval
          updated_at: new Date().toISOString()
        })
        .eq("id", otpRecord.pesantren_claim_id);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Verifikasi berhasil",
        pesantren_claim_id: otpRecord.pesantren_claim_id
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in otp-verify function:", error);
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
