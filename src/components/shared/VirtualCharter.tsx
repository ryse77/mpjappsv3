import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatNIP } from "@/lib/id-utils";
import mpjVerticalColor from "@/assets/mpj-vertical-color.png";

type CharterLevel = "silver" | "gold" | "platinum";

interface VirtualCharterProps {
  level: CharterLevel;
  noId: string;
  namaMedia: string;
  alamat: string;
  className?: string;
}

/**
 * Virtual Charter Component - A4 Portrait (YouTube Play Button Style)
 * Silver: Embossed silver logo - Lunas Administrasi
 * Gold: Embossed gold logo - Profil Lengkap
 * Platinum/Diamond: Embossed diamond with glow effect
 */
export const VirtualCharter = ({
  level,
  noId,
  namaMedia,
  alamat,
  className,
}: VirtualCharterProps) => {
  const getLevelStyles = () => {
    switch (level) {
      case "platinum":
        return {
          bg: "from-slate-900 via-slate-800 to-slate-900",
          border: "border-cyan-300/30",
          logoShadow: "drop-shadow-[0_0_30px_rgba(103,232,249,0.6)]",
          logoFilter: "brightness-150 contrast-110 saturate-50",
          textGlow: "text-cyan-300 drop-shadow-[0_0_10px_rgba(103,232,249,0.8)]",
          badgeText: "PLATINUM / DIAMOND",
          embossClass: "bg-gradient-to-br from-cyan-200 via-white to-cyan-300",
        };
      case "gold":
        return {
          bg: "from-amber-50 via-amber-100 to-yellow-50",
          border: "border-amber-300/50",
          logoShadow: "drop-shadow-[0_4px_20px_rgba(245,158,11,0.4)]",
          logoFilter: "sepia-[0.3] saturate-150 brightness-95",
          textGlow: "text-amber-600",
          badgeText: "GOLD",
          embossClass: "bg-gradient-to-br from-amber-300 via-yellow-200 to-amber-400",
        };
      case "silver":
      default:
        return {
          bg: "from-slate-100 via-slate-200 to-slate-100",
          border: "border-slate-300/50",
          logoShadow: "drop-shadow-[0_4px_15px_rgba(100,116,139,0.3)]",
          logoFilter: "grayscale saturate-50 brightness-105",
          textGlow: "text-slate-600",
          badgeText: "SILVER",
          embossClass: "bg-gradient-to-br from-slate-300 via-slate-200 to-slate-400",
        };
    }
  };

  const styles = getLevelStyles();

  return (
    <Card className={cn(
      "overflow-hidden border-2 shadow-2xl",
      styles.border,
      className
    )}>
      <CardContent className="p-0">
        <div className={cn(
          "aspect-[3/4] relative overflow-hidden bg-gradient-to-br p-6 flex flex-col items-center justify-center",
          styles.bg
        )}>
          {/* Decorative Pattern */}
          {level === "platinum" && (
            <div className="absolute inset-0 opacity-20">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <pattern id="diamond-pattern" patternUnits="userSpaceOnUse" width="20" height="20">
                  <polygon points="10,0 20,10 10,20 0,10" fill="currentColor" className="text-cyan-400" opacity="0.3" />
                </pattern>
                <rect width="100" height="100" fill="url(#diamond-pattern)" />
              </svg>
            </div>
          )}

          {/* Header Text */}
          <div className="relative z-10 text-center mb-6">
            <p className={cn("text-xs tracking-[0.3em] uppercase mb-1", styles.textGlow)}>
              {styles.badgeText}
            </p>
            <h2 className={cn("text-lg font-bold tracking-wide", styles.textGlow)}>
              PIAGAM KEANGGOTAAN
            </h2>
          </div>

          {/* Embossed Logo - YouTube Play Button Style */}
          <div className="relative z-10 mb-6">
            {/* Shadow/3D Effect Container */}
            <div className={cn(
              "relative rounded-2xl p-8",
              level === "platinum" ? "bg-gradient-to-br from-slate-700/50 to-slate-800/50" : "bg-white/80",
              "shadow-[inset_0_2px_20px_rgba(0,0,0,0.1),_0_10px_40px_rgba(0,0,0,0.2)]"
            )}>
              {/* Holographic Effect for Platinum */}
              {level === "platinum" && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-400/20 via-purple-400/10 to-pink-400/20 animate-pulse" />
              )}
              
              <img 
                src={mpjVerticalColor}
                alt="MPJ Logo"
                className={cn(
                  "h-32 w-auto relative z-10",
                  styles.logoFilter,
                  styles.logoShadow
                )}
              />
            </div>
          </div>

          {/* Recipient Info */}
          <div className="relative z-10 text-center space-y-2">
            <p className={cn("text-xs uppercase tracking-wider opacity-70", styles.textGlow)}>
              Diberikan Kepada
            </p>
            <h3 className={cn("text-xl font-bold", styles.textGlow)}>
              {namaMedia}
            </h3>
            <p className={cn("text-sm opacity-80 max-w-xs", styles.textGlow)}>
              {alamat}
            </p>
            <div className="pt-4">
              <p className={cn("text-xs uppercase tracking-wider opacity-60", styles.textGlow)}>
                Nomor Induk Pesantren
              </p>
              <p className={cn("text-lg font-mono font-bold tracking-wider", styles.textGlow)}>
                {formatNIP(noId, true)}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className={cn(
            "absolute bottom-4 left-0 right-0 text-center",
            styles.textGlow
          )}>
            <p className="text-[10px] uppercase tracking-wider opacity-60">
              Media Pondok Jawa Timur
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VirtualCharter;
