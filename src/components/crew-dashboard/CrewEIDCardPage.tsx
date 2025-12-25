import { Download, QrCode, Shield, Lock, FileImage, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface CrewEIDCardPageProps {
  isGold: boolean;
  onBack: () => void;
}

const CrewEIDCardPage = ({ isGold, onBack }: CrewEIDCardPageProps) => {
  const userData = {
    name: "Ahmad Fauzi",
    role: "Kru Media",
    institution: "PP. Nurul Huda",
    memberId: "MPJ-2024-001234",
    skills: ["Editor", "Desainer", "Videographer"],
  };

  const handleDownloadPNG = () => {
    toast({
      title: "Download PNG",
      description: "ID Card sedang diproses untuk diunduh sebagai PNG...",
    });
  };

  const handleDownloadPDF = () => {
    toast({
      title: "Download PDF",
      description: "ID Card sedang diproses untuk diunduh sebagai PDF...",
    });
  };

  if (!isGold) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
        <Card className="w-full max-w-sm bg-muted relative overflow-hidden">
          {/* Blurred Preview */}
          <div className="blur-md opacity-50 pointer-events-none">
            <CardContent className="p-6">
              <div className="aspect-[85.6/53.98] bg-gradient-to-br from-primary to-primary/80 rounded-xl p-4">
                <div className="h-full flex flex-col justify-between">
                  <div className="text-center">
                    <div className="h-3 bg-primary-foreground/20 rounded w-20 mx-auto mb-1" />
                    <div className="h-2 bg-primary-foreground/20 rounded w-16 mx-auto" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-primary-foreground/20 rounded-full" />
                    <div className="flex-1 space-y-1">
                      <div className="h-3 bg-primary-foreground/20 rounded w-3/4" />
                      <div className="h-2 bg-primary-foreground/20 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-12 h-12 bg-primary-foreground/20 rounded" />
                  </div>
                </div>
              </div>
            </CardContent>
          </div>

          {/* Lock Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-foreground/60 backdrop-blur-sm">
            <div className="bg-card rounded-full p-4 mb-4 shadow-lg">
              <Lock className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-primary-foreground mb-2">Fitur Terkunci</h3>
            <p className="text-primary-foreground/80 text-center text-sm mb-6 px-8">
              Upgrade ke status Gold untuk mengakses E-ID Card
            </p>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Shield className="h-4 w-4 mr-2" />
              Upgrade to Gold
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* ID Card - Credit Card Aspect Ratio */}
      <Card className="overflow-hidden shadow-xl border-0">
        <CardContent className="p-0">
          <div className="aspect-[85.6/53.98] bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-5 relative overflow-hidden">
            {/* Wave Pattern Background */}
            <div className="absolute inset-0 opacity-10">
              <svg viewBox="0 0 400 250" className="w-full h-full">
                <path
                  d="M0 100 Q100 50 200 100 T400 100 L400 250 L0 250 Z"
                  fill="white"
                />
                <path
                  d="M0 130 Q100 80 200 130 T400 130 L400 250 L0 250 Z"
                  fill="white"
                  opacity="0.5"
                />
              </svg>
            </div>

            {/* Gold Badge */}
            <div className="absolute top-3 right-3">
              <Badge className="bg-accent text-accent-foreground text-[10px] font-bold shadow-lg">
                <Shield className="h-3 w-3 mr-1" />
                GOLD
              </Badge>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col">
              {/* Header */}
              <div className="text-center mb-3">
                <h2 className="text-lg font-bold text-primary-foreground tracking-wide">MPJ APPS</h2>
                <p className="text-[10px] text-primary-foreground/70">Media Pondok Jawa Timur</p>
              </div>

              {/* Main Content */}
              <div className="flex-1 flex items-center gap-4">
                {/* Avatar */}
                <div className="w-16 h-16 bg-primary-foreground rounded-full flex items-center justify-center text-primary text-xl font-bold shadow-lg flex-shrink-0">
                  AF
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-primary-foreground truncate">{userData.name}</h3>
                  <p className="text-xs text-primary-foreground/80">{userData.role}</p>
                  <p className="text-[10px] text-primary-foreground/60 truncate">{userData.institution}</p>
                  
                  {/* Skill Tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {userData.skills.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="outline" 
                        className="text-[8px] px-1.5 py-0 border-primary-foreground/30 text-primary-foreground/90 bg-primary-foreground/10"
                      >
                        #{skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* QR Code */}
                <div className="bg-primary-foreground rounded-lg p-2 shadow-lg flex-shrink-0">
                  <QrCode className="h-12 w-12 text-primary" />
                </div>
              </div>

              {/* Footer */}
              <div className="text-center mt-2">
                <p className="text-[9px] text-primary-foreground/60">
                  ID: {userData.memberId}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Download Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button 
          onClick={handleDownloadPNG}
          className="bg-primary hover:bg-primary/90"
        >
          <FileImage className="h-4 w-4 mr-2" />
          Download PNG
        </Button>
        <Button 
          onClick={handleDownloadPDF}
          variant="outline"
          className="border-primary text-primary hover:bg-primary/10"
        >
          <FileText className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </div>

      {/* Info Section */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <h3 className="font-semibold text-foreground">Informasi ID Card</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium text-accent">Gold Member</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Berlaku Hingga</span>
              <span className="font-medium">31 Desember 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ID Number</span>
              <span className="font-medium">{userData.memberId}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Info */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground mb-3">Cara Penggunaan</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Tunjukkan QR Code saat registrasi event
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Gunakan sebagai identitas resmi kru media
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Download dan cetak untuk keperluan offline
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrewEIDCardPage;
