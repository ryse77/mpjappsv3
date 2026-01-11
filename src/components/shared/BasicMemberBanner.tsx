import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

interface BasicMemberBannerProps {
  onActivate: () => void;
}

/**
 * Banner displayed to Basic (unpaid) members to encourage NIP/NIAM activation
 */
const BasicMemberBanner = ({ onActivate }: BasicMemberBannerProps) => {
  return (
    <Alert className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200 shadow-md mb-6">
      <Sparkles className="h-5 w-5 text-amber-600" />
      <AlertDescription className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3">
        <div className="flex-1">
          <p className="text-amber-800 font-medium">
            Akun Anda telah terverifikasi sebagai anggota <strong>Basic</strong>.
          </p>
          <p className="text-amber-700 text-sm mt-1">
            Klik di sini untuk aktivasi pembayaran guna mendapatkan nomor ID digital yaitu <strong>NIP</strong> dan <strong>NIAM</strong>.
          </p>
        </div>
        <Button 
          onClick={onActivate}
          className="bg-amber-600 hover:bg-amber-700 text-white shrink-0"
        >
          Aktivasi NIP/NIAM
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default BasicMemberBanner;
