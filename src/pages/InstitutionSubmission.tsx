import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  User,
  MapPin,
  Mail,
  CheckCircle,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Map,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CityCombobox } from "@/components/registration/CityCombobox";
import { LocationPicker } from "@/components/registration/LocationPicker";

const InstitutionSubmission = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const searchedName = location.state?.searchedName || "";

  // Wizard step
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Data Pokok
  const [formData, setFormData] = useState({
    namaPesantren: searchedName,
    namaPengasuh: "",
    alamatSingkat: "",
    cityId: "",
    cityName: "",
    noWhatsapp: "",
    password: "",
    konfirmasiPassword: "",
  });

  // Step 2: Location
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCitySelect = (cityId: string, cityName: string) => {
    setFormData((prev) => ({ ...prev, cityId, cityName }));
  };

  const handleLocationChange = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  // Validation for Step 1
  const isStep1Valid = () => {
    return (
      formData.namaPesantren.trim() &&
      formData.namaPengasuh.trim() &&
      formData.alamatSingkat.trim() &&
      formData.cityId &&
      formData.noWhatsapp.trim().length >= 10 &&
      formData.password.length >= 6 &&
      formData.password === formData.konfirmasiPassword
    );
  };

  // Handle Step 1 completion - Create user and profile
  const handleStep1Complete = async () => {
    if (!isStep1Valid()) return;

    setIsSubmitting(true);

    try {
      // Format phone number as email for auth
      const phoneEmail = `${formData.noWhatsapp}@mpj.local`;

      // Sign up user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: phoneEmail,
        password: formData.password,
      });

      if (authError) {
        throw authError;
      }

      if (!authData.user) {
        throw new Error("Gagal membuat akun");
      }

      // Update profile with pesantren data
      // Note: region_id will be auto-filled by DB trigger based on city_id
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          nama_pesantren: formData.namaPesantren,
          nama_pengasuh: formData.namaPengasuh,
          alamat_singkat: formData.alamatSingkat,
          city_id: formData.cityId,
          no_wa_pendaftar: formData.noWhatsapp,
          // status_account defaults to 'pending' in DB
          // region_id auto-calculated by enforce_region_immutability trigger
        })
        .eq("id", authData.user.id);

      if (profileError) {
        throw profileError;
      }

      // Move to Step 2
      setCurrentStep(2);

      toast({
        title: "Data tersimpan",
        description: "Lanjutkan ke langkah berikutnya",
      });
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Gagal mendaftar",
        description: error.message || "Terjadi kesalahan saat mendaftar",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Step 2 completion - Update location
  const handleStep2Complete = async () => {
    setIsSubmitting(true);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session?.user) {
        throw new Error("Sesi tidak ditemukan");
      }

      // Update profile with location data
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          latitude: latitude,
          longitude: longitude,
        })
        .eq("id", sessionData.session.user.id);

      if (updateError) {
        throw updateError;
      }

      // Sign out user (they need to wait for admin approval)
      await supabase.auth.signOut();

      setIsSuccess(true);

      toast({
        title: "Pendaftaran Berhasil!",
        description: "Menunggu verifikasi admin wilayah.",
      });
    } catch (error: any) {
      console.error("Location update error:", error);
      toast({
        title: "Gagal menyimpan lokasi",
        description: error.message || "Terjadi kesalahan",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Skip Step 2 and complete registration
  const handleSkipStep2 = async () => {
    setIsSubmitting(true);

    try {
      // Sign out user (they need to wait for admin approval)
      await supabase.auth.signOut();

      setIsSuccess(true);

      toast({
        title: "Pendaftaran Berhasil!",
        description: "Menunggu verifikasi admin wilayah.",
      });
    } catch (error: any) {
      console.error("Skip error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success State
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">
            Pendaftaran Berhasil
          </h1>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Menunggu Verifikasi Admin Wilayah. Anda akan menerima notifikasi
            WhatsApp dalam <span className="font-semibold">1x24 jam</span>.
          </p>
          <div className="bg-muted rounded-xl p-4 mb-6 space-y-2 text-left">
            <div>
              <p className="text-xs text-muted-foreground">Pesantren:</p>
              <p className="font-medium text-foreground">
                {formData.namaPesantren}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pengasuh:</p>
              <p className="font-medium text-foreground">
                {formData.namaPengasuh}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">WhatsApp:</p>
              <p className="font-medium text-foreground">
                {formData.noWhatsapp}
              </p>
            </div>
          </div>
          <Button
            onClick={() => navigate("/login")}
            className="w-full h-12 rounded-xl"
          >
            Ke Halaman Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-6 px-4">
      <div className="w-full max-w-md mx-auto">
        {/* Back Button */}
        <button
          onClick={() =>
            currentStep === 1 ? navigate("/check-institution") : setCurrentStep(1)
          }
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali</span>
        </button>

        {/* Progress Indicator */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className={`flex-1 h-1.5 rounded-full ${
              currentStep >= 1 ? "bg-primary" : "bg-muted"
            }`}
          />
          <div
            className={`flex-1 h-1.5 rounded-full ${
              currentStep >= 2 ? "bg-primary" : "bg-muted"
            }`}
          />
        </div>

        {/* Step 1: Data Pokok */}
        {currentStep === 1 && (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-1">
                Daftar Pesantren Baru
              </h1>
              <p className="text-muted-foreground text-sm">
                Langkah 1: Data Pokok
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Section: Data Pesantren */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    A
                  </div>
                  <h2 className="font-semibold text-foreground">
                    Data Pesantren
                  </h2>
                </div>

                <div className="space-y-4 bg-muted/50 rounded-xl p-4">
                  {/* Nama Pesantren */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Building2 className="w-4 h-4" />
                      Nama Pesantren
                    </label>
                    <Input
                      type="text"
                      placeholder="Masukkan nama pesantren"
                      value={formData.namaPesantren}
                      onChange={(e) =>
                        handleChange("namaPesantren", e.target.value)
                      }
                      className="h-11"
                    />
                  </div>

                  {/* Nama Pengasuh */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <User className="w-4 h-4" />
                      Nama Pengasuh
                    </label>
                    <Input
                      type="text"
                      placeholder="Masukkan nama pengasuh"
                      value={formData.namaPengasuh}
                      onChange={(e) =>
                        handleChange("namaPengasuh", e.target.value)
                      }
                      className="h-11"
                    />
                  </div>

                  {/* Alamat Singkat */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <MapPin className="w-4 h-4" />
                      Alamat Singkat
                    </label>
                    <Textarea
                      placeholder="Contoh: Jl. Raya No. 123, Kecamatan..."
                      value={formData.alamatSingkat}
                      onChange={(e) =>
                        handleChange("alamatSingkat", e.target.value)
                      }
                      className="min-h-[80px] resize-none"
                    />
                  </div>

                  {/* Kota/Kabupaten - Searchable Combobox */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <MapPin className="w-4 h-4" />
                      Kota/Kabupaten
                    </label>
                    <CityCombobox
                      value={formData.cityId}
                      onSelect={handleCitySelect}
                    />
                  </div>
                </div>
              </div>

              {/* Section: Data Akun */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    B
                  </div>
                  <h2 className="font-semibold text-foreground">
                    Data Akun Anda
                  </h2>
                </div>

                <div className="space-y-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl p-4">
                  {/* No WhatsApp */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Phone className="w-4 h-4" />
                      No. WhatsApp
                    </label>
                    <Input
                      type="tel"
                      placeholder="08xxxxxxxxxx"
                      value={formData.noWhatsapp}
                      onChange={(e) =>
                        handleChange(
                          "noWhatsapp",
                          e.target.value.replace(/\D/g, "")
                        )
                      }
                      className="h-11"
                    />
                    <p className="text-xs text-muted-foreground">
                      Nomor ini akan digunakan untuk login
                    </p>
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Lock className="w-4 h-4" />
                      Buat Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Minimal 6 karakter"
                        value={formData.password}
                        onChange={(e) =>
                          handleChange("password", e.target.value)
                        }
                        className="h-11 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Konfirmasi Password */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Lock className="w-4 h-4" />
                      Konfirmasi Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Ulangi password"
                        value={formData.konfirmasiPassword}
                        onChange={(e) =>
                          handleChange("konfirmasiPassword", e.target.value)
                        }
                        className="h-11 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {formData.konfirmasiPassword &&
                      formData.password !== formData.konfirmasiPassword && (
                        <p className="text-xs text-destructive">
                          Password tidak cocok
                        </p>
                      )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleStep1Complete}
                disabled={!isStep1Valid() || isSubmitting}
                className="w-full h-12 rounded-xl"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Menyimpan...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Lanjutkan
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </div>
          </>
        )}

        {/* Step 2: Location Map */}
        {currentStep === 2 && (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-1">
                Lokasi Pesantren
              </h1>
              <p className="text-muted-foreground text-sm">
                Langkah 2: Tentukan Lokasi di Peta
              </p>
            </div>

            <div className="space-y-6">
              {/* Map Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                    <Map className="w-3.5 h-3.5" />
                  </div>
                  <h2 className="font-semibold text-foreground">
                    Lokasi di Peta
                  </h2>
                </div>

                <div className="bg-muted/50 rounded-xl p-4">
                  <LocationPicker
                    latitude={latitude}
                    longitude={longitude}
                    onLocationChange={handleLocationChange}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleStep2Complete}
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Menyimpan...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Selesaikan Pendaftaran
                    </span>
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={handleSkipStep2}
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl"
                >
                  Lewati, Atur Nanti
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InstitutionSubmission;
