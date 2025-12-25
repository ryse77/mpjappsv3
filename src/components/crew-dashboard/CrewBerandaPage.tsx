import { Bell, Zap, CheckCircle, Award, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

type ViewType = "beranda" | "event" | "sertifikat" | "eid" | "profil";

interface CrewBerandaPageProps {
  onNavigate: (view: ViewType) => void;
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

const CrewBerandaPage = ({ onNavigate }: CrewBerandaPageProps) => {
  const stats = {
    currentXP: 150,
    targetXP: 500,
    totalCertificates: 5,
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Header with Greeting */}
      <div className="bg-gradient-to-br from-primary to-primary/80 px-4 pt-6 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 ring-2 ring-primary-foreground/30">
              <AvatarImage src="https://i.pravatar.cc/150?img=12" />
              <AvatarFallback className="bg-primary-foreground text-primary font-bold">AF</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-primary-foreground/80 text-sm">Selamat datang,</p>
              <h1 className="text-xl font-bold text-primary-foreground">Halo, Ahmad Fauzi</h1>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-destructive rounded-full" />
          </Button>
        </div>

        {/* Status Cards Grid */}
        <div className="grid grid-cols-3 gap-3">
          {/* XP Card */}
          <Card className="bg-primary-foreground/15 backdrop-blur border-0 col-span-2">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80 text-sm">XP Personal</span>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-2xl font-bold text-primary-foreground">{stats.currentXP}</span>
                <span className="text-primary-foreground/60 text-sm">XP</span>
              </div>
              <Progress 
                value={(stats.currentXP / stats.targetXP) * 100} 
                className="h-2 bg-primary-foreground/20"
              />
              <p className="text-xs text-primary-foreground/60 mt-1">
                {stats.targetXP - stats.currentXP} XP lagi ke level berikutnya
              </p>
            </CardContent>
          </Card>

          {/* Status Badge */}
          <Card className="bg-primary-foreground/15 backdrop-blur border-0">
            <CardContent className="p-4 flex flex-col items-center justify-center h-full">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mb-2">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
              </div>
              <Badge className="bg-emerald-500 text-primary-foreground text-xs">
                ACTIVE
              </Badge>
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
