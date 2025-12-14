import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Users,
  Calendar,
  ArrowRight,
} from "lucide-react";

const Index = () => {
  const stats = [
    { label: "Pesantren", value: "700+", icon: Building2, bgColor: "bg-primary/10", iconColor: "text-primary" },
    { label: "Khodim", value: "1500+", icon: Users, bgColor: "bg-accent/15", iconColor: "text-accent" },
    { label: "Events", value: "50+", icon: Calendar, bgColor: "bg-primary/10", iconColor: "text-primary" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/30 to-background">
      {/* Navigation - Clean & Simple */}
      <nav className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/50 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-primary text-lg">MPJ Apps</span>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline" size="sm" className="h-9 px-4 rounded-full border-border hover:bg-secondary">
                Masuk
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="h-9 px-4 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium shadow-md">
                Daftar Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 pt-12 sm:pt-20 pb-8 sm:pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-4">
                Media Pondok<br />Jawa Timur
              </h1>
              
              <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed">
                Platform Digital Komunitas Media Pesantren Terbesar
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link to="/login">
                  <Button variant="outline" className="w-full sm:w-auto h-12 px-6 rounded-full border-2 border-border hover:bg-secondary font-medium">
                    Masuk
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="w-full sm:w-auto h-12 px-6 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-lg shadow-accent/25">
                    Daftar Sekarang
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right - Stats Cards */}
            <div className="hidden lg:block">
              <div className="bg-gradient-to-br from-primary/5 via-secondary to-accent/5 rounded-3xl p-6 shadow-soft">
                <div className="space-y-4">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-4 rounded-2xl ${
                        index % 2 === 0 ? 'bg-primary/8' : 'bg-accent/10'
                      } transition-transform hover:scale-[1.02]`}
                    >
                      <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                        <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Stats */}
      <section className="px-4 py-6 lg:hidden">
        <div className="flex justify-center gap-6 sm:gap-10">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center mx-auto mb-2`}>
                <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
              </div>
              <div className="text-xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-8">
            Fitur Unggulan
          </h2>
          
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 text-center hover:shadow-glow transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Profil Pesantren</h3>
              <p className="text-sm text-muted-foreground">Kelola identitas & data lembaga</p>
            </div>
            
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 text-center hover:shadow-glow transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-accent/15 flex items-center justify-center mx-auto mb-4">
                <Users className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Crew Management</h3>
              <p className="text-sm text-muted-foreground">Kelola tim media pesantren</p>
            </div>
            
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 text-center hover:shadow-glow transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Event & Sertifikat</h3>
              <p className="text-sm text-muted-foreground">Ikuti event & raih sertifikat</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 sm:p-10 text-center shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-primary-foreground mb-3">
              Siap Bergabung?
            </h2>
            <p className="text-primary-foreground/80 mb-6 text-sm sm:text-base">
              Daftar sekarang & jadilah bagian dari komunitas media pesantren terbesar
            </p>
            <Link to="/register">
              <Button className="h-12 px-8 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-lg">
                Daftar Gratis Sekarang
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">MPJ Apps</span>
          <span>© 2024 Media Pondok Jawa Timur</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
