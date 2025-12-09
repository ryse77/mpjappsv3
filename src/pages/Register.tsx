import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logoMpj from "@/assets/logo-mpj.png";

// Regional data mapping
const regionalData: Record<string, { code: string; name: string }> = {
  // 01 - MALANG RAYA
  "Kota Malang": { code: "01", name: "MALANG RAYA" },
  "Kabupaten Malang": { code: "01", name: "MALANG RAYA" },
  "Kota Batu": { code: "01", name: "MALANG RAYA" },
  // 02 - BLITAR RAYA
  "Kota Blitar": { code: "02", name: "BLITAR RAYA" },
  "Kabupaten Blitar": { code: "02", name: "BLITAR RAYA" },
  // 03 - TULUNGGALEK
  "Kabupaten Tulungagung": { code: "03", name: "TULUNGAGUNG-TRENGGALEK (TULUNGGALEK)" },
  "Kabupaten Trenggalek": { code: "03", name: "TULUNGAGUNG-TRENGGALEK (TULUNGGALEK)" },
  // 04 - PLAT AE
  "Kota Madiun": { code: "04", name: "MADIUN-MAGETAN-NGAWI-PONOROGO-PACITAN (PLAT AE)" },
  "Kabupaten Madiun": { code: "04", name: "MADIUN-MAGETAN-NGAWI-PONOROGO-PACITAN (PLAT AE)" },
  "Kabupaten Magetan": { code: "04", name: "MADIUN-MAGETAN-NGAWI-PONOROGO-PACITAN (PLAT AE)" },
  "Kabupaten Ngawi": { code: "04", name: "MADIUN-MAGETAN-NGAWI-PONOROGO-PACITAN (PLAT AE)" },
  "Kabupaten Ponorogo": { code: "04", name: "MADIUN-MAGETAN-NGAWI-PONOROGO-PACITAN (PLAT AE)" },
  "Kabupaten Pacitan": { code: "04", name: "MADIUN-MAGETAN-NGAWI-PONOROGO-PACITAN (PLAT AE)" },
  // 05 - BANYUWANGI
  "Kabupaten Banyuwangi": { code: "05", name: "BANYUWANGI" },
  // 06 - OJOLAMBAN
  "Kabupaten Bojonegoro": { code: "06", name: "BOJONEGORO-LAMONGAN-TUBAN (OJOLAMBAN)" },
  "Kabupaten Lamongan": { code: "06", name: "BOJONEGORO-LAMONGAN-TUBAN (OJOLAMBAN)" },
  "Kabupaten Tuban": { code: "06", name: "BOJONEGORO-LAMONGAN-TUBAN (OJOLAMBAN)" },
  // 07 - KEDIRI RAYA
  "Kota Kediri": { code: "07", name: "KEDIRI RAYA" },
  "Kabupaten Kediri": { code: "07", name: "KEDIRI RAYA" },
  // 08 - JOMBANG
  "Kabupaten Jombang": { code: "08", name: "JOMBANG" },
  // 09 - MOJOKERTO
  "Kota Mojokerto": { code: "09", name: "MOJOKERTO" },
  "Kabupaten Mojokerto": { code: "09", name: "MOJOKERTO" },
  // 10 - DAPIL IV
  "Kabupaten Jember": { code: "10", name: "JEMBER-LUMAJANG (DAPIL IV)" },
  "Kabupaten Lumajang": { code: "10", name: "JEMBER-LUMAJANG (DAPIL IV)" },
  // 11 - NGANJUK
  "Kabupaten Nganjuk": { code: "11", name: "NGANJUK" },
  // 12 - MADURA RAYA
  "Kabupaten Bangkalan": { code: "12", name: "MADURA RAYA" },
  "Kabupaten Sampang": { code: "12", name: "MADURA RAYA" },
  "Kabupaten Pamekasan": { code: "12", name: "MADURA RAYA" },
  "Kabupaten Sumenep": { code: "12", name: "MADURA RAYA" },
  // 13 - PROBOLINGGO RAYA
  "Kota Probolinggo": { code: "13", name: "PROBOLINGGO RAYA" },
  "Kabupaten Probolinggo": { code: "13", name: "PROBOLINGGO RAYA" },
  // 14 - SURABAYA-GRESIK
  "Kota Surabaya": { code: "14", name: "SURABAYA-GRESIK" },
  "Kabupaten Gresik": { code: "14", name: "SURABAYA-GRESIK" },
  // 15 - SIDOPAS
  "Kabupaten Sidoarjo": { code: "15", name: "SIDOARJO-PASURUAN (SIDOPAS)" },
  "Kota Pasuruan": { code: "15", name: "SIDOARJO-PASURUAN (SIDOPAS)" },
  "Kabupaten Pasuruan": { code: "15", name: "SIDOARJO-PASURUAN (SIDOPAS)" },
  // 16 - SITUBONDO
  "Kabupaten Situbondo": { code: "16", name: "SITUBONDO" },
  // 17 - BONDOWOSO
  "Kabupaten Bondowoso": { code: "17", name: "BONDOWOSO" },
};

const cities = Object.keys(regionalData).sort();

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    namaPesantren: "",
    namaPengasuh: "",
    email: "",
    phone: "",
    city: "",
    regional: "",
    regionalCode: "",
    password: "",
    agreeTerms: false,
  });
  const { toast } = useToast();

  const handleCityChange = (value: string) => {
    const regional = regionalData[value];
    setFormData({
      ...formData,
      city: value,
      regional: regional ? regional.name : "",
      regionalCode: regional ? regional.code : "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.namaPesantren || !formData.namaPengasuh || !formData.email || 
        !formData.phone || !formData.city || !formData.password) {
      toast({
        title: "Form tidak lengkap",
        description: "Mohon lengkapi semua kolom yang diperlukan",
        variant: "destructive",
      });
      return;
    }

    if (!formData.agreeTerms) {
      toast({
        title: "Syarat & Ketentuan",
        description: "Anda harus menyetujui syarat & ketentuan untuk mendaftar",
        variant: "destructive",
      });
      return;
    }

    // Save to localStorage temporarily
    const registrations = JSON.parse(localStorage.getItem("mpj_registrations") || "[]");
    const newRegistration = {
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    registrations.push(newRegistration);
    localStorage.setItem("mpj_registrations", JSON.stringify(registrations));

    toast({
      title: "Pendaftaran Berhasil! 🎉",
      description: "Data Anda telah tersimpan. Silakan tunggu konfirmasi dari admin.",
    });

    // Reset form
    setFormData({
      namaPesantren: "",
      namaPengasuh: "",
      email: "",
      phone: "",
      city: "",
      regional: "",
      regionalCode: "",
      password: "",
      agreeTerms: false,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary/20 via-background to-accent/5 p-4 py-8">
      <div className="w-full max-w-md animate-scale-in">
        <div className="bg-card rounded-3xl shadow-soft p-8 border border-border/50">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={logoMpj} alt="Media Pondok Jawa Timur" className="h-14 object-contain" />
          </div>

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Daftar Pesantren Baru 🕌
            </h1>
            <p className="text-muted-foreground text-sm">
              Bergabung dengan komunitas Media Pondok Jawa Timur
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="namaPesantren" className="text-foreground">Nama Pesantren</Label>
              <Input
                id="namaPesantren"
                type="text"
                placeholder="Masukkan nama pesantren"
                value={formData.namaPesantren}
                onChange={(e) => setFormData({ ...formData, namaPesantren: e.target.value })}
                className="h-11 rounded-xl border-border/50 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="namaPengasuh" className="text-foreground">Nama Pengasuh</Label>
              <Input
                id="namaPengasuh"
                type="text"
                placeholder="Masukkan nama pengasuh"
                value={formData.namaPengasuh}
                onChange={(e) => setFormData({ ...formData, namaPengasuh: e.target.value })}
                className="h-11 rounded-xl border-border/50 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-11 rounded-xl border-border/50 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">No. HP / WhatsApp Aktif</Label>
              <div className="flex gap-2">
                <div className="flex items-center px-3 h-11 rounded-xl border border-border/50 bg-muted/30">
                  <span className="text-sm font-medium text-foreground">+62</span>
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="8123456789"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-11 rounded-xl border-border/50 focus:border-primary flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-foreground">Kabupaten / Kota</Label>
              <Select value={formData.city} onValueChange={handleCityChange}>
                <SelectTrigger className="h-11 rounded-xl border-border/50 focus:border-primary bg-background">
                  <SelectValue placeholder="Pilih Kabupaten/Kota" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border max-h-60">
                  {cities.map((city) => (
                    <SelectItem key={city} value={city} className="cursor-pointer">
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="regional" className="text-foreground">Nama Regional</Label>
              <div className="flex items-center gap-2">
                {formData.regionalCode && (
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 border border-primary/30">
                    <span className="text-sm font-bold text-primary">{formData.regionalCode}</span>
                  </div>
                )}
                <Input
                  id="regional"
                  type="text"
                  value={formData.regional}
                  placeholder="Otomatis terisi berdasarkan kota"
                  readOnly
                  disabled
                  className="h-11 rounded-xl border-border/50 bg-muted/50 flex-1 text-muted-foreground"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                * Regional akan terisi otomatis setelah memilih Kabupaten/Kota
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Buat password yang kuat"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="h-11 rounded-xl border-border/50 focus:border-primary pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <Checkbox 
                id="terms" 
                className="mt-1" 
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
              />
              <label htmlFor="terms" className="text-sm text-foreground cursor-pointer leading-relaxed">
                Saya setuju dengan{" "}
                <Link to="/privacy-policy" className="text-accent hover:text-accent/80">
                  kebijakan privasi
                </Link>
                {" "}dan{" "}
                <Link to="/terms" className="text-accent hover:text-accent/80">
                  syarat & ketentuan
                </Link>
              </label>
            </div>

            <Button type="submit" className="w-full h-11 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-glow">
              Daftar Sekarang
            </Button>
          </form>

          {/* Sign In Link */}
          <p className="text-center mt-6 text-sm text-muted-foreground">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-accent hover:text-accent/80 font-semibold transition-colors">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
