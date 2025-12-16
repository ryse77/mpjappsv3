import { useState, useMemo } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

// Regional data type
interface RegionalData {
  id: string;
  name: string;
  displayName: string;
  memberCount: number;
  pesantrenCount: number;
  status: "active" | "inactive";
}

// Demo data as specified
const regionalData: RegionalData[] = [
  // High Density (Powerhouse) - Deep Forest Green
  { id: "malang", name: "Kab. Malang", displayName: "MPJ Malang Raya", memberCount: 2500, pesantrenCount: 45, status: "active" },
  { id: "kota-malang", name: "Kota Malang", displayName: "MPJ Malang Raya", memberCount: 1850, pesantrenCount: 32, status: "active" },
  { id: "surabaya", name: "Kota Surabaya", displayName: "MPJ Surabaya Raya", memberCount: 2100, pesantrenCount: 38, status: "active" },
  { id: "sidoarjo", name: "Kab. Sidoarjo", displayName: "MPJ Surabaya Raya", memberCount: 1200, pesantrenCount: 28, status: "active" },
  { id: "gresik", name: "Kab. Gresik", displayName: "MPJ Surabaya Raya", memberCount: 980, pesantrenCount: 22, status: "active" },
  
  // Medium Density - Vibrant Emerald
  { id: "jember", name: "Kab. Jember", displayName: "MPJ Tapal Kuda", memberCount: 680, pesantrenCount: 18, status: "active" },
  { id: "kediri", name: "Kab. Kediri", displayName: "MPJ Kediri Raya", memberCount: 580, pesantrenCount: 15, status: "active" },
  { id: "kota-kediri", name: "Kota Kediri", displayName: "MPJ Kediri Raya", memberCount: 420, pesantrenCount: 12, status: "active" },
  { id: "jombang", name: "Kab. Jombang", displayName: "MPJ Jombang Raya", memberCount: 720, pesantrenCount: 20, status: "active" },
  { id: "pasuruan", name: "Kab. Pasuruan", displayName: "MPJ Pasuruan Raya", memberCount: 520, pesantrenCount: 14, status: "active" },
  { id: "probolinggo", name: "Kab. Probolinggo", displayName: "MPJ Tapal Kuda", memberCount: 380, pesantrenCount: 12, status: "active" },
  { id: "banyuwangi", name: "Kab. Banyuwangi", displayName: "MPJ Tapal Kuda", memberCount: 450, pesantrenCount: 13, status: "active" },
  
  // Low Density - Soft Emerald
  { id: "blitar", name: "Kab. Blitar", displayName: "MPJ Blitar Raya", memberCount: 280, pesantrenCount: 8, status: "active" },
  { id: "tulungagung", name: "Kab. Tulungagung", displayName: "MPJ Blitar Raya", memberCount: 240, pesantrenCount: 7, status: "active" },
  { id: "lamongan", name: "Kab. Lamongan", displayName: "MPJ Lamongan", memberCount: 320, pesantrenCount: 9, status: "active" },
  { id: "tuban", name: "Kab. Tuban", displayName: "MPJ Tuban", memberCount: 280, pesantrenCount: 8, status: "active" },
  { id: "bojonegoro", name: "Kab. Bojonegoro", displayName: "MPJ Bojonegoro", memberCount: 195, pesantrenCount: 6, status: "active" },
  { id: "ngawi", name: "Kab. Ngawi", displayName: "MPJ Madiun Raya", memberCount: 145, pesantrenCount: 5, status: "active" },
  { id: "madiun", name: "Kab. Madiun", displayName: "MPJ Madiun Raya", memberCount: 165, pesantrenCount: 5, status: "active" },
  { id: "nganjuk", name: "Kab. Nganjuk", displayName: "MPJ Madiun Raya", memberCount: 175, pesantrenCount: 6, status: "active" },
  { id: "ponorogo", name: "Kab. Ponorogo", displayName: "MPJ Madiun Raya", memberCount: 155, pesantrenCount: 5, status: "active" },
  { id: "mojokerto", name: "Kab. Mojokerto", displayName: "MPJ Mojokerto", memberCount: 210, pesantrenCount: 7, status: "active" },
  { id: "lumajang", name: "Kab. Lumajang", displayName: "MPJ Tapal Kuda", memberCount: 185, pesantrenCount: 6, status: "active" },
  { id: "situbondo", name: "Kab. Situbondo", displayName: "MPJ Tapal Kuda", memberCount: 125, pesantrenCount: 4, status: "active" },
  { id: "bondowoso", name: "Kab. Bondowoso", displayName: "MPJ Tapal Kuda", memberCount: 135, pesantrenCount: 4, status: "active" },
  
  // Madura
  { id: "bangkalan", name: "Kab. Bangkalan", displayName: "MPJ Madura Raya", memberCount: 220, pesantrenCount: 7, status: "active" },
  { id: "sampang", name: "Kab. Sampang", displayName: "MPJ Madura Raya", memberCount: 145, pesantrenCount: 5, status: "active" },
  { id: "pamekasan", name: "Kab. Pamekasan", displayName: "MPJ Madura Raya", memberCount: 165, pesantrenCount: 5, status: "active" },
  { id: "sumenep", name: "Kab. Sumenep", displayName: "MPJ Madura Raya", memberCount: 130, pesantrenCount: 4, status: "active" },
  
  // Inactive/Low Coverage
  { id: "pacitan", name: "Kab. Pacitan", displayName: "MPJ Pacitan", memberCount: 45, pesantrenCount: 2, status: "inactive" },
  { id: "magetan", name: "Kab. Magetan", displayName: "MPJ Madiun Raya", memberCount: 65, pesantrenCount: 2, status: "inactive" },
  { id: "trenggalek", name: "Kab. Trenggalek", displayName: "MPJ Blitar Raya", memberCount: 55, pesantrenCount: 2, status: "inactive" },
];

// Simplified GeoJSON for East Java (Jawa Timur)
const jatimGeoJson = {
  type: "FeatureCollection",
  features: [
    // Main island regions
    { type: "Feature", properties: { id: "pacitan", name: "Kab. Pacitan" }, geometry: { type: "Polygon", coordinates: [[[111.1, -8.2], [111.4, -8.15], [111.5, -8.25], [111.45, -8.35], [111.2, -8.4], [111.05, -8.3], [111.1, -8.2]]] }},
    { type: "Feature", properties: { id: "ponorogo", name: "Kab. Ponorogo" }, geometry: { type: "Polygon", coordinates: [[[111.3, -7.85], [111.55, -7.8], [111.65, -7.95], [111.55, -8.1], [111.35, -8.15], [111.2, -8.0], [111.3, -7.85]]] }},
    { type: "Feature", properties: { id: "trenggalek", name: "Kab. Trenggalek" }, geometry: { type: "Polygon", coordinates: [[[111.55, -8.1], [111.8, -8.05], [111.9, -8.2], [111.85, -8.35], [111.55, -8.35], [111.45, -8.2], [111.55, -8.1]]] }},
    { type: "Feature", properties: { id: "tulungagung", name: "Kab. Tulungagung" }, geometry: { type: "Polygon", coordinates: [[[111.8, -8.0], [112.05, -7.95], [112.15, -8.1], [112.05, -8.25], [111.85, -8.3], [111.75, -8.15], [111.8, -8.0]]] }},
    { type: "Feature", properties: { id: "blitar", name: "Kab. Blitar" }, geometry: { type: "Polygon", coordinates: [[[112.05, -7.9], [112.3, -7.85], [112.45, -8.0], [112.35, -8.2], [112.1, -8.25], [112.0, -8.1], [112.05, -7.9]]] }},
    { type: "Feature", properties: { id: "kediri", name: "Kab. Kediri" }, geometry: { type: "Polygon", coordinates: [[[111.9, -7.65], [112.15, -7.6], [112.3, -7.75], [112.2, -7.95], [111.95, -8.0], [111.8, -7.85], [111.9, -7.65]]] }},
    { type: "Feature", properties: { id: "kota-kediri", name: "Kota Kediri" }, geometry: { type: "Polygon", coordinates: [[[112.0, -7.78], [112.08, -7.76], [112.1, -7.85], [112.02, -7.87], [112.0, -7.78]]] }},
    { type: "Feature", properties: { id: "malang", name: "Kab. Malang" }, geometry: { type: "Polygon", coordinates: [[[112.35, -7.8], [112.7, -7.75], [112.9, -7.95], [112.85, -8.3], [112.5, -8.35], [112.3, -8.15], [112.35, -7.8]]] }},
    { type: "Feature", properties: { id: "kota-malang", name: "Kota Malang" }, geometry: { type: "Polygon", coordinates: [[[112.58, -7.93], [112.68, -7.91], [112.7, -8.0], [112.6, -8.02], [112.58, -7.93]]] }},
    { type: "Feature", properties: { id: "lumajang", name: "Kab. Lumajang" }, geometry: { type: "Polygon", coordinates: [[[112.85, -7.95], [113.15, -7.9], [113.25, -8.1], [113.15, -8.25], [112.9, -8.3], [112.8, -8.1], [112.85, -7.95]]] }},
    { type: "Feature", properties: { id: "jember", name: "Kab. Jember" }, geometry: { type: "Polygon", coordinates: [[[113.25, -8.05], [113.6, -8.0], [113.75, -8.2], [113.6, -8.4], [113.3, -8.35], [113.2, -8.2], [113.25, -8.05]]] }},
    { type: "Feature", properties: { id: "banyuwangi", name: "Kab. Banyuwangi" }, geometry: { type: "Polygon", coordinates: [[[113.75, -8.0], [114.3, -7.75], [114.45, -8.2], [114.35, -8.6], [113.95, -8.55], [113.7, -8.3], [113.75, -8.0]]] }},
    { type: "Feature", properties: { id: "bondowoso", name: "Kab. Bondowoso" }, geometry: { type: "Polygon", coordinates: [[[113.7, -7.75], [114.0, -7.7], [114.1, -7.9], [113.95, -8.05], [113.7, -8.0], [113.6, -7.85], [113.7, -7.75]]] }},
    { type: "Feature", properties: { id: "situbondo", name: "Kab. Situbondo" }, geometry: { type: "Polygon", coordinates: [[[113.85, -7.6], [114.25, -7.55], [114.4, -7.7], [114.15, -7.85], [113.9, -7.8], [113.8, -7.7], [113.85, -7.6]]] }},
    { type: "Feature", properties: { id: "probolinggo", name: "Kab. Probolinggo" }, geometry: { type: "Polygon", coordinates: [[[113.1, -7.7], [113.4, -7.65], [113.55, -7.85], [113.4, -8.0], [113.15, -7.95], [113.05, -7.8], [113.1, -7.7]]] }},
    { type: "Feature", properties: { id: "pasuruan", name: "Kab. Pasuruan" }, geometry: { type: "Polygon", coordinates: [[[112.75, -7.55], [113.05, -7.5], [113.15, -7.7], [113.0, -7.9], [112.75, -7.85], [112.65, -7.7], [112.75, -7.55]]] }},
    { type: "Feature", properties: { id: "sidoarjo", name: "Kab. Sidoarjo" }, geometry: { type: "Polygon", coordinates: [[[112.65, -7.35], [112.85, -7.32], [112.9, -7.5], [112.75, -7.55], [112.6, -7.45], [112.6, -7.35], [112.65, -7.35]]] }},
    { type: "Feature", properties: { id: "mojokerto", name: "Kab. Mojokerto" }, geometry: { type: "Polygon", coordinates: [[[112.35, -7.4], [112.6, -7.35], [112.65, -7.55], [112.5, -7.65], [112.3, -7.6], [112.25, -7.5], [112.35, -7.4]]] }},
    { type: "Feature", properties: { id: "jombang", name: "Kab. Jombang" }, geometry: { type: "Polygon", coordinates: [[[112.15, -7.45], [112.4, -7.4], [112.5, -7.6], [112.35, -7.75], [112.1, -7.7], [112.05, -7.55], [112.15, -7.45]]] }},
    { type: "Feature", properties: { id: "nganjuk", name: "Kab. Nganjuk" }, geometry: { type: "Polygon", coordinates: [[[111.85, -7.45], [112.1, -7.4], [112.2, -7.6], [112.05, -7.75], [111.8, -7.7], [111.75, -7.55], [111.85, -7.45]]] }},
    { type: "Feature", properties: { id: "madiun", name: "Kab. Madiun" }, geometry: { type: "Polygon", coordinates: [[[111.45, -7.5], [111.7, -7.45], [111.8, -7.65], [111.65, -7.8], [111.4, -7.75], [111.35, -7.6], [111.45, -7.5]]] }},
    { type: "Feature", properties: { id: "magetan", name: "Kab. Magetan" }, geometry: { type: "Polygon", coordinates: [[[111.3, -7.6], [111.5, -7.55], [111.55, -7.7], [111.45, -7.85], [111.25, -7.8], [111.2, -7.7], [111.3, -7.6]]] }},
    { type: "Feature", properties: { id: "ngawi", name: "Kab. Ngawi" }, geometry: { type: "Polygon", coordinates: [[[111.3, -7.35], [111.6, -7.3], [111.7, -7.45], [111.55, -7.6], [111.3, -7.55], [111.2, -7.45], [111.3, -7.35]]] }},
    { type: "Feature", properties: { id: "bojonegoro", name: "Kab. Bojonegoro" }, geometry: { type: "Polygon", coordinates: [[[111.65, -7.1], [112.0, -7.05], [112.1, -7.25], [111.95, -7.4], [111.65, -7.35], [111.55, -7.2], [111.65, -7.1]]] }},
    { type: "Feature", properties: { id: "tuban", name: "Kab. Tuban" }, geometry: { type: "Polygon", coordinates: [[[111.9, -6.85], [112.25, -6.8], [112.35, -7.0], [112.2, -7.15], [111.95, -7.1], [111.85, -6.95], [111.9, -6.85]]] }},
    { type: "Feature", properties: { id: "lamongan", name: "Kab. Lamongan" }, geometry: { type: "Polygon", coordinates: [[[112.2, -6.95], [112.5, -6.9], [112.6, -7.1], [112.45, -7.3], [112.2, -7.25], [112.1, -7.1], [112.2, -6.95]]] }},
    { type: "Feature", properties: { id: "gresik", name: "Kab. Gresik" }, geometry: { type: "Polygon", coordinates: [[[112.5, -6.95], [112.75, -6.9], [112.8, -7.15], [112.65, -7.3], [112.45, -7.25], [112.4, -7.1], [112.5, -6.95]]] }},
    { type: "Feature", properties: { id: "surabaya", name: "Kota Surabaya" }, geometry: { type: "Polygon", coordinates: [[[112.68, -7.2], [112.82, -7.18], [112.85, -7.35], [112.72, -7.37], [112.65, -7.3], [112.68, -7.2]]] }},
    // Madura
    { type: "Feature", properties: { id: "bangkalan", name: "Kab. Bangkalan" }, geometry: { type: "Polygon", coordinates: [[[112.7, -6.95], [113.05, -6.9], [113.15, -7.1], [112.95, -7.15], [112.7, -7.1], [112.65, -7.0], [112.7, -6.95]]] }},
    { type: "Feature", properties: { id: "sampang", name: "Kab. Sampang" }, geometry: { type: "Polygon", coordinates: [[[113.1, -6.9], [113.4, -6.85], [113.5, -7.05], [113.35, -7.15], [113.1, -7.1], [113.05, -6.95], [113.1, -6.9]]] }},
    { type: "Feature", properties: { id: "pamekasan", name: "Kab. Pamekasan" }, geometry: { type: "Polygon", coordinates: [[[113.4, -6.85], [113.65, -6.82], [113.75, -7.0], [113.6, -7.12], [113.4, -7.08], [113.35, -6.92], [113.4, -6.85]]] }},
    { type: "Feature", properties: { id: "sumenep", name: "Kab. Sumenep" }, geometry: { type: "Polygon", coordinates: [[[113.7, -6.82], [114.05, -6.75], [114.15, -6.95], [113.95, -7.1], [113.7, -7.05], [113.65, -6.9], [113.7, -6.82]]] }},
  ]
};

// Color scale function based on member count
const getRegionColor = (memberCount: number, status: string): string => {
  if (status === "inactive" || memberCount < 100) return "#ECFDF5"; // Very light (inactive)
  if (memberCount >= 1500) return "#064E3B"; // Deep Forest Green (Powerhouse)
  if (memberCount >= 800) return "#047857"; // Rich Emerald
  if (memberCount >= 400) return "#10B981"; // Vibrant Emerald (Medium)
  if (memberCount >= 200) return "#34D399"; // Light Emerald
  return "#6EE7B7"; // Soft Emerald (Low)
};

interface Props {
  onRegionClick?: (regionalId: string) => void;
}

const JatimChoroplethMap = ({ onRegionClick }: Props) => {
  const [hoveredRegion, setHoveredRegion] = useState<RegionalData | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Create a lookup map for regional data
  const dataMap = useMemo(() => {
    const map: Record<string, RegionalData> = {};
    regionalData.forEach(r => {
      map[r.id] = r;
    });
    return map;
  }, []);

  // Calculate totals
  const totals = useMemo(() => ({
    members: regionalData.reduce((acc, r) => acc + r.memberCount, 0),
    pesantren: regionalData.reduce((acc, r) => acc + r.pesantrenCount, 0),
    activeRegions: regionalData.filter(r => r.status === "active").length,
  }), []);

  const handleMouseMove = (event: React.MouseEvent, geo: any) => {
    const regionId = geo.properties.id;
    const data = dataMap[regionId];
    if (data) {
      setHoveredRegion(data);
      setTooltipPos({
        x: event.clientX,
        y: event.clientY,
      });
    }
  };

  const handleClick = (geo: any) => {
    const regionId = geo.properties.id;
    const data = dataMap[regionId];
    if (data && onRegionClick) {
      onRegionClick(regionId);
    }
  };

  return (
    <Card className="bg-white border-0 shadow-sm overflow-hidden relative">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg text-slate-800 font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-emerald-600" />
              Peta Strategis Jawa Timur
            </CardTitle>
            <p className="text-sm text-slate-500 mt-1">
              {totals.members.toLocaleString()} anggota • {totals.pesantren} pesantren • {totals.activeRegions} wilayah aktif
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="relative bg-gradient-to-b from-slate-50 to-slate-100/50 rounded-lg overflow-hidden">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 8500,
              center: [112.75, -7.55],
            }}
            style={{ width: "100%", height: "auto" }}
          >
            <ZoomableGroup center={[112.75, -7.55]} zoom={1} minZoom={0.8} maxZoom={3}>
              <Geographies geography={jatimGeoJson}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const regionId = geo.properties.id;
                    const data = dataMap[regionId];
                    const isHovered = hoveredRegion?.id === regionId;
                    const fillColor = data 
                      ? getRegionColor(data.memberCount, data.status)
                      : "#ECFDF5";

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseMove={(e) => handleMouseMove(e, geo)}
                        onMouseLeave={() => setHoveredRegion(null)}
                        onClick={() => handleClick(geo)}
                        style={{
                          default: {
                            fill: fillColor,
                            stroke: "#D1FAE5",
                            strokeWidth: 0.5,
                            outline: "none",
                            cursor: "pointer",
                            transition: "all 0.2s ease-out",
                          },
                          hover: {
                            fill: fillColor,
                            stroke: "#F59E0B",
                            strokeWidth: 2,
                            outline: "none",
                            cursor: "pointer",
                            filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.15))",
                            transform: "scale(1.02)",
                            transformOrigin: "center",
                          },
                          pressed: {
                            fill: fillColor,
                            stroke: "#D97706",
                            strokeWidth: 2,
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>

          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-md p-3 space-y-2">
            <p className="text-xs font-medium text-slate-600 mb-2">Kepadatan Anggota</p>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#ECFDF5" }} />
              <span className="text-xs text-slate-500">Inactive</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#6EE7B7" }} />
              <span className="text-xs text-slate-500">Low</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#10B981" }} />
              <span className="text-xs text-slate-500">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#064E3B" }} />
              <span className="text-xs text-slate-500">High</span>
            </div>
          </div>
        </div>

        {/* Smart Tooltip - Fixed Position */}
        {hoveredRegion && (
          <div
            className="fixed z-50 pointer-events-none animate-fade-in"
            style={{
              left: `${tooltipPos.x + 15}px`,
              top: `${tooltipPos.y - 10}px`,
            }}
          >
            <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-4 min-w-[220px]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-800">{hoveredRegion.displayName}</h3>
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-xs font-medium",
                  hoveredRegion.status === "active" 
                    ? "bg-emerald-100 text-emerald-700" 
                    : "bg-slate-100 text-slate-500"
                )}>
                  {hoveredRegion.status === "active" ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-3">{hoveredRegion.name}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-semibold text-slate-700">
                    {hoveredRegion.memberCount.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400">Members</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-700">
                    {hoveredRegion.pesantrenCount}
                  </span>
                  <span className="text-xs text-slate-400">Pesantren</span>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100">
                <p className="text-xs text-emerald-600 font-medium">Klik untuk lihat detail →</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JatimChoroplethMap;
