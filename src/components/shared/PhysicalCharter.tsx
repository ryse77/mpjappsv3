import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatNIP } from "@/lib/id-utils";
import mpjHorizontalColor from "@/assets/mpj-horizontal-color.png";

interface PhysicalCharterProps {
  noId: string;
  namaMedia: string;
  alamat: string;
  ketuaUmum?: string;
  tanggal?: string;
  className?: string;
}

/**
 * Physical Charter Component - A4 Landscape Classic Certificate
 * Official text: "Diberikan Kepada... sebagai anggota resmi Komunitas Media Pondok Jawa Timur..."
 * Signature: "Januari 2026, Ketua Umum Media Pondok Jawa Timur"
 */
export const PhysicalCharter = ({
  noId,
  namaMedia,
  alamat,
  ketuaUmum = "H. Abdul Qodir Jailani",
  tanggal = "Januari 2026",
  className,
}: PhysicalCharterProps) => {
  return (
    <Card className={cn(
      "overflow-hidden border-0 shadow-2xl",
      className
    )}>
      <CardContent className="p-0">
        {/* A4 Landscape Ratio */}
        <div className="aspect-[297/210] bg-gradient-to-br from-amber-50 via-white to-amber-50 relative overflow-hidden">
          {/* Ornate Border */}
          <div className="absolute inset-3 border-4 border-double border-emerald-800/30 rounded-lg" />
          <div className="absolute inset-5 border-2 border-emerald-800/20 rounded-lg" />

          {/* Corner Decorations */}
          <div className="absolute top-6 left-6 w-12 h-12 border-t-4 border-l-4 border-emerald-800/40 rounded-tl-lg" />
          <div className="absolute top-6 right-6 w-12 h-12 border-t-4 border-r-4 border-emerald-800/40 rounded-tr-lg" />
          <div className="absolute bottom-6 left-6 w-12 h-12 border-b-4 border-l-4 border-emerald-800/40 rounded-bl-lg" />
          <div className="absolute bottom-6 right-6 w-12 h-12 border-b-4 border-r-4 border-emerald-800/40 rounded-br-lg" />

          {/* Content */}
          <div className="absolute inset-8 flex flex-col items-center justify-center text-center p-6">
            {/* Header with Logo */}
            <div className="mb-4">
              <img 
                src={mpjHorizontalColor}
                alt="MPJ Logo"
                className="h-12 w-auto mx-auto mb-2"
              />
              <p className="text-[10px] text-emerald-800/60 uppercase tracking-[0.3em]">
                Komunitas Media Pondok Jawa Timur
              </p>
            </div>

            {/* Title */}
            <div className="mb-4">
              <h1 className="text-2xl font-serif font-bold text-emerald-800 tracking-wide">
                SERTIFIKAT KEANGGOTAAN
              </h1>
              <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-2" />
            </div>

            {/* Official Text */}
            <div className="max-w-lg mb-4 space-y-2">
              <p className="text-sm text-slate-600 font-serif leading-relaxed">
                Diberikan Kepada:
              </p>
              
              {/* Recipient Name */}
              <div className="py-3 px-6 border-b-2 border-emerald-800/30">
                <h2 className="text-xl font-serif font-bold text-emerald-800">
                  {namaMedia}
                </h2>
                <p className="text-xs text-slate-500 mt-1">{alamat}</p>
              </div>

              <p className="text-sm text-slate-600 font-serif leading-relaxed pt-2">
                sebagai <strong>anggota resmi</strong> Komunitas Media Pondok Jawa Timur.
              </p>
              
              <p className="text-sm text-slate-600 font-serif leading-relaxed">
                Kami MPJ Pusat mengucapkan selamat datang di keluarga besar 
                Media Pondok Jawa Timur.
              </p>
              
              <p className="text-base font-serif font-semibold text-emerald-800 pt-2 italic">
                "Salam Khidmah, Salam Militan"
              </p>
            </div>

            {/* NIP */}
            <div className="mb-4">
              <p className="text-[9px] text-slate-500 uppercase tracking-wider">
                Nomor Induk Pesantren
              </p>
              <p className="text-lg font-mono font-bold text-emerald-800 tracking-wider">
                {formatNIP(noId, true)}
              </p>
            </div>

            {/* Signature Section */}
            <div className="flex items-end justify-end w-full mt-auto">
              <div className="text-right">
                <p className="text-xs text-slate-500">{tanggal}</p>
                <p className="text-xs text-slate-600 font-medium">
                  Ketua Umum Media Pondok Jawa Timur
                </p>
                <div className="h-8 my-1" /> {/* Signature space */}
                <p className="text-sm font-serif font-semibold text-emerald-800 border-t border-slate-300 pt-1">
                  {ketuaUmum}
                </p>
              </div>
            </div>
          </div>

          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <img 
              src={mpjHorizontalColor}
              alt=""
              className="w-2/3 h-auto"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhysicalCharter;
