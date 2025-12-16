import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface RegionData {
  id: string;
  name: string;
  memberCount: number;
  path: string;
}

// East Java Regencies with simplified SVG paths (choropleth map)
const regionsData: RegionData[] = [
  // High Density (Deep Green) - 100+ members
  { id: "malang", name: "Kota Malang", memberCount: 2450, path: "M220 185 L240 180 L255 190 L250 205 L230 210 L215 200 Z" },
  { id: "malang-kab", name: "Kab. Malang", memberCount: 1850, path: "M200 165 L220 160 L260 170 L275 195 L265 220 L235 230 L195 215 L180 190 Z" },
  { id: "surabaya", name: "Kota Surabaya", memberCount: 2100, path: "M340 95 L365 90 L380 100 L375 115 L355 120 L335 110 Z" },
  { id: "sidoarjo", name: "Kab. Sidoarjo", memberCount: 980, path: "M335 120 L365 115 L380 135 L370 155 L345 160 L325 145 Z" },
  { id: "jombang", name: "Kab. Jombang", memberCount: 720, path: "M265 125 L290 120 L310 135 L305 155 L280 160 L260 145 Z" },
  
  // Medium Density (Emerald)
  { id: "kediri-kab", name: "Kab. Kediri", memberCount: 580, path: "M185 140 L210 130 L235 145 L230 170 L200 180 L175 165 Z" },
  { id: "kediri", name: "Kota Kediri", memberCount: 420, path: "M195 155 L215 150 L225 165 L215 175 L195 175 Z" },
  { id: "blitar-kab", name: "Kab. Blitar", memberCount: 380, path: "M170 180 L195 175 L215 195 L205 220 L175 225 L155 205 Z" },
  { id: "tulungagung", name: "Kab. Tulungagung", memberCount: 340, path: "M145 170 L170 165 L185 185 L175 210 L150 215 L130 195 Z" },
  { id: "pasuruan-kab", name: "Kab. Pasuruan", memberCount: 520, path: "M310 155 L340 150 L365 170 L355 195 L325 200 L300 180 Z" },
  { id: "gresik", name: "Kab. Gresik", memberCount: 460, path: "M310 95 L335 90 L350 105 L340 120 L315 125 L300 110 Z" },
  { id: "lamongan", name: "Kab. Lamongan", memberCount: 390, path: "M265 90 L295 85 L315 100 L305 120 L275 125 L255 110 Z" },
  { id: "mojokerto-kab", name: "Kab. Mojokerto", memberCount: 310, path: "M280 130 L305 125 L320 145 L310 165 L285 170 L270 150 Z" },
  
  // Lower Density (Soft Green)
  { id: "probolinggo-kab", name: "Kab. Probolinggo", memberCount: 280, path: "M365 175 L395 165 L420 185 L410 210 L380 215 L355 195 Z" },
  { id: "lumajang", name: "Kab. Lumajang", memberCount: 240, path: "M285 210 L315 200 L345 215 L335 245 L300 250 L275 235 Z" },
  { id: "jember", name: "Kab. Jember", memberCount: 350, path: "M350 220 L385 210 L415 230 L405 265 L365 275 L340 250 Z" },
  { id: "banyuwangi", name: "Kab. Banyuwangi", memberCount: 290, path: "M425 235 L465 220 L490 255 L475 300 L430 310 L405 275 Z" },
  { id: "situbondo", name: "Kab. Situbondo", memberCount: 180, path: "M420 185 L455 175 L480 195 L470 220 L435 230 L410 210 Z" },
  { id: "bondowoso", name: "Kab. Bondowoso", memberCount: 195, path: "M410 210 L440 200 L460 225 L450 255 L415 260 L395 235 Z" },
  
  // Very Low Density (Light Gray/Green)
  { id: "ngawi", name: "Kab. Ngawi", memberCount: 120, path: "M165 95 L195 85 L220 100 L215 125 L185 135 L160 120 Z" },
  { id: "magetan", name: "Kab. Magetan", memberCount: 95, path: "M140 110 L165 100 L185 120 L175 145 L150 150 L130 135 Z" },
  { id: "ponorogo", name: "Kab. Ponorogo", memberCount: 135, path: "M125 140 L150 130 L175 150 L165 180 L135 190 L110 170 Z" },
  { id: "trenggalek", name: "Kab. Trenggalek", memberCount: 85, path: "M115 185 L145 175 L165 200 L155 230 L120 240 L95 215 Z" },
  { id: "pacitan", name: "Kab. Pacitan", memberCount: 65, path: "M75 210 L105 195 L130 215 L120 250 L85 260 L60 235 Z" },
  { id: "madiun-kab", name: "Kab. Madiun", memberCount: 145, path: "M165 120 L195 110 L215 130 L205 155 L175 165 L155 145 Z" },
  { id: "nganjuk", name: "Kab. Nganjuk", memberCount: 165, path: "M200 115 L230 105 L255 125 L245 150 L215 160 L190 140 Z" },
  { id: "bojonegoro", name: "Kab. Bojonegoro", memberCount: 175, path: "M225 85 L260 75 L290 95 L280 120 L245 130 L215 110 Z" },
  { id: "tuban", name: "Kab. Tuban", memberCount: 155, path: "M265 65 L300 55 L330 75 L320 100 L285 110 L255 90 Z" },
  
  // Madura Island
  { id: "bangkalan", name: "Kab. Bangkalan", memberCount: 185, path: "M385 75 L415 65 L440 80 L435 100 L405 110 L380 95 Z" },
  { id: "sampang", name: "Kab. Sampang", memberCount: 125, path: "M440 70 L475 60 L500 75 L495 95 L460 105 L435 90 Z" },
  { id: "pamekasan", name: "Kab. Pamekasan", memberCount: 145, path: "M495 65 L530 55 L555 70 L550 90 L515 100 L490 85 Z" },
  { id: "sumenep", name: "Kab. Sumenep", memberCount: 110, path: "M545 55 L585 45 L615 60 L610 85 L575 95 L540 80 Z" },
];

// Color scale based on member count
const getRegionColor = (memberCount: number): string => {
  if (memberCount >= 1500) return "hsl(152 61% 15%)"; // Deep Forest Green
  if (memberCount >= 800) return "hsl(152 50% 25%)"; // Dark Emerald
  if (memberCount >= 400) return "hsl(152 45% 35%)"; // Emerald
  if (memberCount >= 200) return "hsl(152 40% 50%)"; // Medium Green
  if (memberCount >= 100) return "hsl(152 35% 65%)"; // Light Green
  return "hsl(152 25% 85%)"; // Very Light (Inactive)
};

interface Props {
  onRegionClick?: (regionId: string) => void;
}

const JatimChoroplethMap = ({ onRegionClick }: Props) => {
  const [hoveredRegion, setHoveredRegion] = useState<RegionData | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<SVGPathElement>, region: RegionData) => {
    const svgRect = e.currentTarget.closest('svg')?.getBoundingClientRect();
    if (svgRect) {
      setTooltipPos({
        x: e.clientX - svgRect.left,
        y: e.clientY - svgRect.top - 60,
      });
    }
    setHoveredRegion(region);
  };

  const handleClick = (regionId: string) => {
    if (onRegionClick) {
      onRegionClick(regionId);
    }
  };

  // Calculate totals
  const totalMembers = regionsData.reduce((acc, r) => acc + r.memberCount, 0);
  const activeRegions = regionsData.filter(r => r.memberCount >= 100).length;

  return (
    <Card className="bg-white border-0 shadow-sm overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-slate-800 font-semibold">
          Peta Persebaran Anggota Jawa Timur
        </CardTitle>
        <p className="text-sm text-slate-500">
          {totalMembers.toLocaleString()} anggota di {activeRegions} wilayah aktif
        </p>
      </CardHeader>
      <CardContent className="p-4">
        <div className="relative">
          <svg 
            viewBox="50 40 600 290" 
            className="w-full h-auto"
            style={{ maxHeight: '400px' }}
          >
            {/* Background */}
            <rect x="50" y="40" width="600" height="290" fill="hsl(152 20% 97%)" rx="8" />
            
            {/* Water/Sea background */}
            <path
              d="M50 40 L650 40 L650 330 L50 330 Z"
              fill="hsl(200 30% 95%)"
              opacity="0.5"
            />
            
            {/* Regions */}
            {regionsData.map((region) => {
              const isHovered = hoveredRegion?.id === region.id;
              const fillColor = getRegionColor(region.memberCount);
              
              return (
                <path
                  key={region.id}
                  d={region.path}
                  fill={fillColor}
                  stroke={isHovered ? "hsl(45 72% 49%)" : "hsl(0 0% 100%)"}
                  strokeWidth={isHovered ? 3 : 1}
                  className={cn(
                    "cursor-pointer transition-all duration-200",
                    isHovered && "drop-shadow-lg"
                  )}
                  style={{
                    transform: isHovered ? "scale(1.02)" : "scale(1)",
                    transformOrigin: "center",
                    filter: isHovered ? "brightness(1.1)" : "none",
                  }}
                  onMouseMove={(e) => handleMouseMove(e, region)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => handleClick(region.id)}
                />
              );
            })}
            
            {/* Legend */}
            <g transform="translate(480, 260)">
              <rect x="0" y="0" width="160" height="60" rx="6" fill="white" fillOpacity="0.95" />
              <text x="10" y="18" className="text-xs font-medium" fill="#64748b">Kepadatan Anggota</text>
              
              {/* Color scale */}
              <rect x="10" y="26" width="20" height="10" fill="hsl(152 25% 85%)" rx="2" />
              <text x="35" y="34" className="text-xs" fill="#94a3b8">{"<100"}</text>
              
              <rect x="70" y="26" width="20" height="10" fill="hsl(152 45% 35%)" rx="2" />
              <text x="95" y="34" className="text-xs" fill="#94a3b8">400+</text>
              
              <rect x="10" y="42" width="20" height="10" fill="hsl(152 61% 15%)" rx="2" />
              <text x="35" y="50" className="text-xs" fill="#94a3b8">1500+</text>
            </g>
          </svg>

          {/* Floating Tooltip */}
          {hoveredRegion && (
            <div
              className="absolute pointer-events-none z-10 bg-white rounded-lg shadow-lg border border-slate-200 p-3 min-w-[160px] transition-all duration-150"
              style={{
                left: `${tooltipPos.x}px`,
                top: `${tooltipPos.y}px`,
                transform: 'translateX(-50%)',
              }}
            >
              <p className="font-semibold text-slate-800 text-sm">{hoveredRegion.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold text-emerald-600">
                  {hoveredRegion.memberCount.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500">anggota</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default JatimChoroplethMap;
