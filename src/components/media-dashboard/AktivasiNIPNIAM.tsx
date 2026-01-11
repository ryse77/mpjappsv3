import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Upload, 
  Copy, 
  Check, 
  Building2, 
  Loader2, 
  Info, 
  CreditCard,
  Sparkles,
  FileCheck
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const MAX_FILE_SIZE = 350 * 1024; // 350KB - Global limit

interface AktivasiNIPNIAMProps {
  onPaymentSubmitted?: () => void;
}

const AktivasiNIPNIAM = ({ onPaymentSubmitted }: AktivasiNIPNIAMProps) => {
  const [senderName, setSenderName] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);
  
  // Payment data
  const [baseAmount, setBaseAmount] = useState<number>(0);
  const [uniqueCode, setUniqueCode] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string>('pending_payment');
  const [claimData, setClaimData] = useState<{
    id: string;
    pesantren_name: string;
    jenis_pengajuan: string;
  } | null>(null);

  const [bankInfo, setBankInfo] = useState({
    bank: "Bank Syariah Indonesia (BSI)",
    accountNumber: "7171234567890",
    accountName: "MEDIA PONDOK JAWA TIMUR",
  });
  
  const { toast } = useToast();
  const { user } = useAuth();

  // Initialize payment data
  useEffect(() => {
    const initializePayment = async () => {
      if (!user) return;

      setIsInitializing(true);
      
      try {
        // 1. Get claim data
        const { data: claim, error: claimError } = await supabase
          .from('pesantren_claims')
          .select('id, pesantren_name, jenis_pengajuan, status')
          .eq('user_id', user.id)
          .maybeSingle();

        if (claimError) throw claimError;
        if (!claim) return;

        setClaimData(claim);

        // 2. Get base price from system_settings
        const priceKey = claim.jenis_pengajuan === 'klaim' 
          ? 'claim_base_price' 
          : 'registration_base_price';

        const { data: priceSetting } = await supabase
          .from('system_settings')
          .select('value')
          .eq('key', priceKey)
          .single();

        const fetchedBaseAmount = priceSetting 
          ? parseInt(String(priceSetting.value).replace(/"/g, '')) 
          : 50000;
        setBaseAmount(fetchedBaseAmount);

        // Fetch bank info from system_settings
        const { data: bankSettings } = await supabase
          .from('system_settings')
          .select('key, value')
          .in('key', ['bank_name', 'bank_account_number', 'bank_account_name']);

        if (bankSettings && bankSettings.length > 0) {
          const bankData: Record<string, string> = {};
          bankSettings.forEach(setting => {
            bankData[setting.key] = String(setting.value).replace(/"/g, '');
          });
          
          setBankInfo({
            bank: bankData.bank_name || "Bank Syariah Indonesia (BSI)",
            accountNumber: bankData.bank_account_number || "7171234567890",
            accountName: bankData.bank_account_name || "MEDIA PONDOK JAWA TIMUR",
          });
        }

        // 3. Check if payment record already exists
        const { data: existingPayment, error: paymentError } = await supabase
          .from('payments')
          .select('*')
          .eq('user_id', user.id)
          .eq('pesantren_claim_id', claim.id)
          .maybeSingle();

        if (paymentError && paymentError.code !== 'PGRST116') throw paymentError;

        if (existingPayment) {
          setPaymentId(existingPayment.id);
          setUniqueCode(existingPayment.unique_code);
          setTotalAmount(existingPayment.total_amount);
          setPaymentStatus(existingPayment.status);
        } else {
          // Generate new unique code and create payment record
          const newUniqueCode = Math.floor(Math.random() * 900) + 100;
          const newTotalAmount = fetchedBaseAmount + newUniqueCode;
          
          const { data: newPayment, error: insertError } = await supabase
            .from('payments')
            .insert({
              user_id: user.id,
              pesantren_claim_id: claim.id,
              base_amount: fetchedBaseAmount,
              unique_code: newUniqueCode,
              total_amount: newTotalAmount,
              status: 'pending_payment',
            })
            .select()
            .single();

          if (insertError) throw insertError;

          setPaymentId(newPayment.id);
          setUniqueCode(newUniqueCode);
          setTotalAmount(newTotalAmount);
        }

      } catch (error: any) {
        console.error('Error initializing payment:', error);
        toast({
          title: "Error",
          description: "Gagal memuat data pembayaran",
          variant: "destructive",
        });
      } finally {
        setIsInitializing(false);
      }
    };

    initializePayment();
  }, [user, toast]);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(bankInfo.accountNumber);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
    toast({
      title: "Disalin!",
      description: "Nomor rekening telah disalin",
    });
  };

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(totalAmount.toString());
    setCopiedAmount(true);
    setTimeout(() => setCopiedAmount(false), 2000);
    toast({
      title: "Disalin!",
      description: "Nominal tagihan telah disalin",
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File terlalu besar",
          description: "Ukuran file maksimal adalah 350KB.",
          variant: "destructive",
        });
        return;
      }

      setProofFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!senderName.trim()) {
      toast({
        title: "Nama pengirim diperlukan",
        description: "Masukkan nama sesuai rekening pengirim",
        variant: "destructive",
      });
      return;
    }

    if (!proofFile) {
      toast({
        title: "Bukti transfer diperlukan",
        description: "Upload bukti transfer untuk diverifikasi",
        variant: "destructive",
      });
      return;
    }

    if (!paymentId || !user) {
      toast({
        title: "Error",
        description: "Data pembayaran tidak ditemukan",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Upload proof file to storage
      const fileExt = proofFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('payment-proofs')
        .upload(fileName, proofFile);

      if (uploadError) throw uploadError;

      // Update payment record
      const { error: updateError } = await supabase
        .from('payments')
        .update({
          proof_file_url: fileName,
          status: 'pending_verification',
        })
        .eq('id', paymentId);

      if (updateError) throw updateError;

      setPaymentStatus('pending_verification');
      
      toast({
        title: "Bukti Pembayaran Terkirim!",
        description: "Menunggu konfirmasi dari Admin Pusat",
      });
      
      onPaymentSubmitted?.();
    } catch (error: any) {
      console.error('Submit error:', error);
      toast({
        title: "Gagal mengirim",
        description: error.message || "Terjadi kesalahan",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID").format(amount);
  };

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
          <p className="text-muted-foreground">Memuat data pembayaran...</p>
        </div>
      </div>
    );
  }

  // Already submitted payment proof - waiting verification
  if (paymentStatus === 'pending_verification') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Aktivasi NIP/NIAM</h1>
          <p className="text-slate-500">Menunggu verifikasi pembayaran</p>
        </div>

        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileCheck className="w-10 h-10 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-amber-800 mb-3">
              Menunggu Verifikasi
            </h2>
            <p className="text-amber-700 max-w-md mx-auto">
              Bukti pembayaran Anda sedang diverifikasi oleh Admin Pusat. 
              Proses ini membutuhkan waktu 1x24 jam kerja.
            </p>
            <Badge className="mt-4 bg-amber-200 text-amber-800">
              Status: Pending Verification
            </Badge>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Aktivasi NIP/NIAM</h1>
        <p className="text-slate-500">Lengkapi pembayaran untuk mendapatkan ID resmi</p>
      </div>

      {/* Info Banner */}
      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Apa itu NIP & NIAM?</strong>
          <ul className="mt-2 space-y-1 text-sm">
            <li>• <strong>NIP</strong> (Nomor Induk Pesantren) - Identitas resmi lembaga pesantren Anda</li>
            <li>• <strong>NIAM</strong> (Nomor Induk Anggota Media) - Identitas personal untuk setiap kru media</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Pesantren Info */}
      {claimData && (
        <Card className="bg-slate-50 border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Building2 className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Pesantren:</p>
                <p className="font-semibold text-foreground">{claimData.pesantren_name}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Amount Card */}
      <Card className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-sm opacity-90 mb-2">Total Tagihan Aktivasi</p>
            <div className="flex items-center justify-center gap-2">
              <p className="text-3xl font-bold">Rp {formatCurrency(totalAmount)},-</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyAmount}
                className="h-8 w-8 p-0 hover:bg-white/20"
              >
                {copiedAmount ? <Check className="h-4 w-4 text-white" /> : <Copy className="h-4 w-4 text-white/80" />}
              </Button>
            </div>
            <div className="flex justify-center gap-4 mt-2 text-sm opacity-80">
              <span>Biaya Aktivasi: Rp {formatCurrency(baseAmount)}</span>
              <span>+</span>
              <span>Kode Unik: {uniqueCode}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warning Note */}
      <Alert className="bg-amber-50 border-amber-200">
        <Sparkles className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800 text-sm">
          ⚠️ <strong>PENTING:</strong> Transfer <strong>TEPAT</strong> sesuai nominal hingga 3 digit terakhir. 
          Perbedaan nominal akan menghambat proses verifikasi.
        </AlertDescription>
      </Alert>

      {/* Bank Info */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CreditCard className="h-5 w-5 text-emerald-600" />
            Rekening Tujuan
          </CardTitle>
          <CardDescription>Transfer ke rekening MPJ Pusat berikut</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{bankInfo.bank}</p>
              <p className="text-xs text-muted-foreground">Transfer ke rekening berikut</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Nomor Rekening</p>
                <p className="text-lg font-mono font-bold text-foreground">{bankInfo.accountNumber}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyAccount}
                className="h-8 px-2"
              >
                {copiedAccount ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-1">a.n. {bankInfo.accountName}</p>
          </div>
        </CardContent>
      </Card>

      {/* Upload Form */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Upload className="h-5 w-5 text-emerald-600" />
            Upload Bukti Transfer
          </CardTitle>
          <CardDescription>Unggah bukti transfer untuk verifikasi pembayaran</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="senderName">Nama Pengirim</Label>
            <Input
              id="senderName"
              placeholder="Nama sesuai rekening pengirim"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Bukti Transfer (Maks. 350KB)</Label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                proofPreview ? "border-emerald-500 bg-emerald-50" : "border-slate-300"
              }`}>
                {proofPreview ? (
                  <div className="space-y-3">
                    <img 
                      src={proofPreview} 
                      alt="Preview" 
                      className="max-h-40 mx-auto rounded-lg object-contain"
                    />
                    <p className="text-sm text-emerald-600 font-medium truncate px-4">
                      {proofFile?.name}
                    </p>
                  </div>
                ) : (
                  <div className="py-4">
                    <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                    <p className="text-sm text-muted-foreground">Klik atau drag file ke sini</p>
                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG (Maks. 350KB)</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isLoading || !senderName.trim() || !proofFile}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Mengirim...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Kirim Bukti Pembayaran
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AktivasiNIPNIAM;
