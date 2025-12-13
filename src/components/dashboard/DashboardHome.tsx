import { TrendingUp, Clock, Building2, Trophy, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DashboardHome = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <p className="text-slate-500 text-sm">Super Admin / Pusat</p>
        <h1 className="text-2xl md:text-3xl font-bold text-emerald-700">
          Pengurus Pusat (Khodim Harian Pusat)
        </h1>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-4">
          {/* Total Omzet */}
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-amber-600" />
                    </div>
                    <p className="text-slate-600 text-sm font-medium">Total Omzet (Bulan Ini)</p>
                  </div>
                  <p className="text-3xl font-bold text-emerald-600">Rp 15.500.000</p>
                  <p className="text-emerald-500 text-sm mt-1 flex items-center gap-1">
                    <span className="inline-block">▲</span> 12% dari bulan lalu
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Users Jatim */}
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Total Users Jatim</p>
                  <p className="text-4xl font-bold text-emerald-700 mt-2">850</p>
                  <p className="text-slate-500 text-sm mt-1">Total Pesantren & Anggota</p>
                </div>
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Regional Teraktif */}
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Regional Teraktif (Bulan Ini)</p>
                  <p className="text-3xl font-bold text-emerald-700 mt-2">Malang Raya</p>
                  <p className="text-slate-500 text-sm mt-1">Berdasarkan jumlah pendaftar & event</p>
                </div>
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Pending Payment */}
          <Card className="bg-white border-0 shadow-sm border-l-4 border-l-red-500">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-slate-600 text-sm font-medium">Pending Payment (Menunggu Verifikasi)</p>
                    <p className="text-3xl font-bold text-red-500 mt-1">12 Request</p>
                  </div>
                </div>
                <Button className="bg-red-500 hover:bg-red-600 text-white gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Lihat Antrian
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* East Java Map */}
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="relative">
                {/* SVG Map of East Java */}
                <svg viewBox="0 0 600 300" className="w-full h-auto">
                  {/* Background */}
                  <rect width="600" height="300" fill="#e8f5e9" rx="8" />
                  
                  {/* Simplified East Java Map Shape */}
                  <path
                    d="M50 180 
                       C60 160, 80 140, 120 130 
                       C160 120, 200 115, 240 110 
                       C280 105, 320 100, 360 105 
                       C400 110, 440 120, 480 130 
                       C520 140, 550 160, 560 180 
                       C570 200, 560 220, 540 230 
                       C520 240, 480 245, 440 248 
                       C400 251, 360 252, 320 250 
                       C280 248, 240 244, 200 238 
                       C160 232, 120 224, 80 215 
                       C60 210, 45 195, 50 180Z"
                    fill="#c8e6c9"
                    stroke="#81c784"
                    strokeWidth="2"
                  />
                  
                  {/* Madura Island */}
                  <path
                    d="M420 90 C450 85, 500 82, 540 88 C560 95, 565 110, 550 118 C530 125, 480 128, 440 122 C420 118, 415 100, 420 90Z"
                    fill="#c8e6c9"
                    stroke="#81c784"
                    strokeWidth="2"
                  />
                  
                  {/* Activity Hotspots with gradients */}
                  <defs>
                    <radialGradient id="hotspot1" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity="0.2" />
                    </radialGradient>
                    <radialGradient id="hotspot2" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
                      <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity="0.1" />
                    </radialGradient>
                  </defs>
                  
                  {/* Malang Area - High Activity */}
                  <circle cx="340" cy="180" r="45" fill="url(#hotspot1)" />
                  <circle cx="340" cy="180" r="25" fill="#f59e0b" fillOpacity="0.6" />
                  
                  {/* Surabaya Area */}
                  <circle cx="420" cy="140" r="35" fill="url(#hotspot2)" />
                  <circle cx="420" cy="140" r="18" fill="#f59e0b" fillOpacity="0.5" />
                  
                  {/* Kediri Area */}
                  <circle cx="260" cy="170" r="28" fill="url(#hotspot2)" />
                  <circle cx="260" cy="170" r="14" fill="#f59e0b" fillOpacity="0.4" />
                  
                  {/* Jember Area */}
                  <circle cx="480" cy="200" r="25" fill="url(#hotspot2)" />
                  <circle cx="480" cy="200" r="12" fill="#f59e0b" fillOpacity="0.4" />
                  
                  {/* Jombang Area */}
                  <circle cx="320" cy="145" r="22" fill="url(#hotspot2)" />
                  <circle cx="320" cy="145" r="10" fill="#f59e0b" fillOpacity="0.4" />
                  
                  {/* City Labels */}
                  <text x="340" y="185" textAnchor="middle" className="text-xs font-semibold" fill="#166534">Malang</text>
                  <text x="420" y="145" textAnchor="middle" className="text-xs font-medium" fill="#166534">Surabaya</text>
                  <text x="260" y="175" textAnchor="middle" className="text-xs font-medium" fill="#166534">Kediri</text>
                  <text x="480" y="205" textAnchor="middle" className="text-xs font-medium" fill="#166534">Jember</text>
                  <text x="320" y="150" textAnchor="middle" className="text-xs font-medium" fill="#166534">Jombang</text>
                  <text x="180" y="190" textAnchor="middle" className="text-xs font-medium" fill="#166534">Madiun</text>
                  <text x="540" cy="220" textAnchor="middle" className="text-xs font-medium" fill="#166534">Banyuwangi</text>
                  <text x="480" y="105" textAnchor="middle" className="text-xs font-medium" fill="#166534">Madura</text>
                  
                  {/* Legend */}
                  <rect x="380" y="260" width="180" height="30" rx="6" fill="white" fillOpacity="0.9" />
                  <text x="395" y="280" className="text-xs" fill="#64748b">Low Activity</text>
                  <rect x="470" y="270" width="60" height="10" rx="2" fill="url(#legendGradient)" />
                  <defs>
                    <linearGradient id="legendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                  <text x="540" y="280" className="text-xs" fill="#64748b">High Activity</text>
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
