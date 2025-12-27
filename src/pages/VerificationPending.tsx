import { useNavigate } from "react-router-dom";
import { Clock, LogOut, ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import logoMpj from "@/assets/logo-mpj.png";

/**
 * VERIFICATION PENDING PAGE
 * 
 * Static page for users with status_account = 'pending'.
 * Shows: "Menunggu Verifikasi Admin"
 * 
 * Allowed actions:
 * - Logout
 * - Back to Home
 * - Contact Admin via WhatsApp
 * 
 * NO access to any other tables or data fetching.
 */
const VerificationPending = () => {
  const navigate = useNavigate();
  const { signOut, profile } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/login", { replace: true });
  };

  const handleContactAdmin = () => {
    const message = encodeURIComponent(
      `Halo Admin MPJ,\n\nSaya ingin menanyakan status verifikasi akun saya.\n\nTerima kasih.`
    );
    window.open(`https://wa.me/6281234567890?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-background to-amber-50/50 dark:from-amber-950/20 dark:via-background dark:to-amber-950/10 p-4">
      {/* Logo */}
      <div className="mb-6">
        <img src={logoMpj} alt="MPJ Logo" className="h-14 w-auto" />
      </div>

      {/* Main Card */}
      <Card className="w-full max-w-md shadow-lg border-amber-200 dark:border-amber-800">
        <CardHeader className="text-center pb-4">
          {/* Icon */}
          <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-10 h-10 text-amber-600 dark:text-amber-400" />
          </div>
          
          <CardTitle className="text-2xl font-bold text-amber-700 dark:text-amber-400">
            Menunggu Verifikasi
          </CardTitle>
          <CardDescription className="text-base">
            Akun Anda sedang dalam proses verifikasi oleh Admin Wilayah
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Status Info */}
          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Status:</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full text-xs font-medium">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                Pending
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Proses verifikasi biasanya memakan waktu <span className="font-semibold text-foreground">1x24 jam</span> kerja. 
              Anda akan menerima notifikasi melalui WhatsApp setelah akun diverifikasi.
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Tahapan Verifikasi:</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xs text-primary-foreground font-bold">✓</span>
                </div>
                <span className="text-sm text-foreground">Pendaftaran berhasil</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">2</span>
                </div>
                <span className="text-sm text-foreground font-medium">Menunggu verifikasi admin</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-xs text-muted-foreground font-bold">3</span>
                </div>
                <span className="text-sm text-muted-foreground">Akun aktif</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <Button
              variant="outline"
              onClick={handleContactAdmin}
              className="w-full h-12 gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Hubungi Admin via WhatsApp
            </Button>

            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="flex-1 h-11 gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Beranda
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="flex-1 h-11 gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="w-4 h-4" />
                Keluar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationPending;
