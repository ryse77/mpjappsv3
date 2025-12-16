import { Users, Building2, MapPin, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JatimChoroplethMap from "./JatimChoroplethMap";

type ViewType = 
  | "dashboard" 
  | "regional-akun" 
  | "regional-mapping" 
  | "monitoring-validasi" 
  | "pusat-unduhan"
  | "database-pesantren" 
  | "gamifikasi"
  | "pengaturan";

interface Props {
  onNavigate?: (view: ViewType) => void;
}

// Demo stats as specified
const STATS = {
  totalAnggota: 12500,
  totalPesantren: 340,
  wilayahAktif: 28,
};

// Activity feed mock data
const recentActivity = [
  { id: 1, message: "Admin Malang Raya menambahkan 5 anggota baru", time: "2 menit lalu", type: "add" },
  { id: 2, message: "PP Al-Hikmah Surabaya terdaftar di sistem", time: "15 menit lalu", type: "register" },
  { id: 3, message: "Regional Kediri mengupdate data wilayah", time: "1 jam lalu", type: "update" },
  { id: 4, message: "Badge 'Veteran Jatim' diberikan ke 3 anggota", time: "2 jam lalu", type: "badge" },
  { id: 5, message: "Admin Jombang memverifikasi 12 pendaftar", time: "3 jam lalu", type: "verify" },
];

const DashboardHome = ({ onNavigate }: Props) => {
  const handleRegionClick = (regionId: string) => {
    // Navigate to regional detail
    console.log("Navigate to region:", regionId);
    onNavigate?.("regional-mapping");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid - Clickable */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card 
          className="bg-white border-0 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all duration-200 group"
          onClick={() => onNavigate?.("database-pesantren")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">Total Anggota</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">
                  {STATS.totalAnggota.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
            <p className="text-xs text-emerald-600 mt-3 font-medium">Lihat Database Kru →</p>
          </CardContent>
        </Card>

        <Card 
          className="bg-white border-0 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all duration-200 group"
          onClick={() => onNavigate?.("database-pesantren")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">Total Pesantren</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">
                  {STATS.totalPesantren.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-blue-600 mt-3 font-medium">Lihat Database Pesantren →</p>
          </CardContent>
        </Card>

        <Card 
          className="bg-white border-0 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all duration-200 group"
          onClick={() => onNavigate?.("regional-mapping")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">Wilayah Aktif</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">
                  {STATS.wilayahAktif}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                <MapPin className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <p className="text-xs text-amber-600 mt-3 font-medium">Lihat Regional Data →</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Choropleth Map - Takes 2 columns */}
        <div className="lg:col-span-2">
          <JatimChoroplethMap onRegionClick={handleRegionClick} />
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-1">
          <Card className="bg-white border-0 shadow-sm h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-slate-800 font-semibold flex items-center gap-2">
                <Activity className="h-5 w-5 text-emerald-600" />
                Aktivitas Terkini
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="p-3 rounded-lg hover:bg-slate-50 transition-colors border-l-2 border-transparent hover:border-emerald-500"
                >
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {activity.message}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
