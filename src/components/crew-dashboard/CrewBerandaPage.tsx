import { Bell, Zap, Award, ChevronRight, IdCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { XPLevelBadge } from "@/components/shared/LevelBadge";
import { formatNIAM, getXPLevel } from "@/lib/id-utils";

type ViewType = "beranda" | "event" | "sertifikat" | "eid" | "profil";

interface CrewData {
  id?: string;
  nama?: string;
  niam?: string;
  jabatan?: string;
  xp_level?: number;
  skill?: string[];
  institution_name?: string;
  institution_nip?: string;
}

interface CrewBerandaPageProps {
  onNavigate: (view: ViewType) => void;
  debugCrew?: CrewData;
}

const mockNews = [
  {
    id: 1,
    title: "Kopdar Akbar MPJ Jawa Timur 2025",
    date: "25 Des 2024",
    thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&h=120&fit=crop",
  },
  {
    id: 2,
    title: "Workshop Video Editing untuk Kru Media",
    date: "20 Des 2024",
    thumbnail: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=200&h=120&fit=crop",
  },
  {
    id: 3,
    title: "Pengumuman Pemenang Lomba Konten Kreatif",
    date: "15 Des 2024",
    thumbnail: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=200&h=120&fit=crop",
  },
  {
    id: 4,
    title: "Pelatihan Fotografi Dasar untuk Santri",
    date: "10 Des 2024",
    thumbnail: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=200&h=120&fit=crop",
  },
];

const CrewBerandaPage = ({ onNavigate, debugCrew }: CrewBerandaPageProps) => {
  // Use debug data or fallback to defaults
  const crewName = debugCrew?.nama || "Ahmad Fauzi";
  const crewNIAM = debugCrew?.niam || "";
  const currentXP = debugCrew?.xp_level || 150;
  const jabatan = debugCrew?.jabatan || "Kru Media";
  
  const xpInfo = getXPLevel(currentXP);
  const stats = {
    currentXP,
    targetXP: xpInfo.maxXP === Infinity ? currentXP + 1000 : xpInfo.maxXP,
    totalCertificates: 5,
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Header with Greeting & NIAM Identity Card */}
      <div className="bg-gradient-to-br from-primary to-primary/80 px-4 pt-6 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-14 w-14 ring-2 ring-primary-foreground/30">
                <AvatarImage src="https://i.pravatar.cc/150?img=12" />
                <AvatarFallback className="bg-primary-foreground text-primary font-bold text-lg">
                  {crewName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              {/* Militansi Badge Overlay */}
              <div className="absolute -bottom-1 -right-1">
                <XPLevelBadge xp={currentXP} size="sm" />
              </div>
            </div>
            <div>
              <p className="text-primary-foreground/80 text-sm">Selamat datang,</p>
              <h1 className="text-xl font-bold text-primary-foreground">{crewName}</h1>
              <p className="text-primary-foreground/70 text-xs">{jabatan}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-destructive rounded-full" />
          </Button>
        </div>

        {/* NIAM Identity Card */}
        {crewNIAM && (
          <Card className="bg-primary-foreground/10 backdrop-blur border-primary-foreground/20 mb-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                  <IdCard className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-primary-foreground/70 text-xs uppercase tracking-wider">Nomor Induk Anggota Media</p>
                  <p className="text-2xl font-mono font-bold text-primary-foreground tracking-wide">
                    {formatNIAM(crewNIAM, true)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Status Cards Grid */}
        <div className="grid grid-cols-3 gap-3">
          {/* XP Card */}
          <Card className="bg-primary-foreground/15 backdrop-blur border-0 col-span-2">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80 text-sm">Militansi XP</span>
                <XPLevelBadge xp={currentXP} size="sm" />
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-2xl font-bold text-primary-foreground">{stats.currentXP}</span>
                <span className="text-primary-foreground/60 text-sm">XP</span>
              </div>
              <Progress 
                value={((stats.currentXP - xpInfo.minXP) / (stats.targetXP - xpInfo.minXP)) * 100} 
                className="h-2 bg-primary-foreground/20"
              />
              <p className="text-xs text-primary-foreground/60 mt-1">
                {stats.targetXP === Infinity ? 'Level Tertinggi!' : `${stats.targetXP - stats.currentXP} XP lagi ke ${xpInfo.level === 'bronze' ? 'Silver' : xpInfo.level === 'silver' ? 'Gold' : 'Platinum'}`}
              </p>
            </CardContent>
          </Card>

          {/* Militansi Badge */}
          <Card className="bg-primary-foreground/15 backdrop-blur border-0">
            <CardContent className="p-4 flex flex-col items-center justify-center h-full">
              <div className={`w-12 h-12 rounded-full ${xpInfo.color} flex items-center justify-center mb-2 shadow-lg`}>
                <span className="text-xl">{xpInfo.icon}</span>
              </div>
              <p className="text-primary-foreground text-xs font-semibold text-center">
                {xpInfo.label}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Certificate Counter */}
      <div className="px-4 -mt-4 relative z-10">
        <Card className="shadow-lg border-0">
          <CardContent className="p-4">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => onNavigate("sertifikat")}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Award className="h-7 w-7 text-accent" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Total Sertifikat</p>
                  <p className="text-3xl font-bold text-foreground">{stats.totalCertificates}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* News Feed Section */}
      <div className="flex-1 px-4 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Info Terkini</h2>
          <Button variant="ghost" size="sm" className="text-primary">
            Lihat Semua
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-420px)]">
          <div className="space-y-3 pb-4">
            {mockNews.map((news) => (
              <Card key={news.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="flex gap-3">
                    <img
                      src={news.thumbnail}
                      alt={news.title}
                      className="w-24 h-20 object-cover rounded-l-lg"
                    />
                    <div className="flex-1 py-3 pr-3">
                      <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-1">
                        {news.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">{news.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CrewBerandaPage;
