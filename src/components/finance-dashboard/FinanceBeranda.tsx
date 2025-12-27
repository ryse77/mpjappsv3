import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Clock, CheckCircle, XCircle } from "lucide-react";

const FinanceBeranda = () => {
  // Dummy stats for MVP
  const stats = {
    totalIncome: 15750000,
    pendingTransactions: 5,
    approvedToday: 12,
    rejectedToday: 2,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card className="bg-gradient-to-r from-emerald-800 to-emerald-600 text-white border-0">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">Finance Gatekeeper</h2>
          <p className="text-white/80">
            Selamat datang di pusat verifikasi pembayaran. Anda adalah penjaga gerbang aktivasi akun pesantren.
          </p>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Pemasukan
            </CardTitle>
            <DollarSign className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(stats.totalIncome)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Bulan ini</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Menunggu Verifikasi
            </CardTitle>
            <Clock className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.pendingTransactions}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Perlu tindakan</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Disetujui Hari Ini
            </CardTitle>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.approvedToday}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Akun diaktifkan</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ditolak Hari Ini
            </CardTitle>
            <XCircle className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.rejectedToday}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Pembayaran invalid</p>
          </CardContent>
        </Card>
      </div>

      {/* Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Peran Gatekeeper</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">1. Verifikasi Pembayaran:</strong> Periksa bukti transfer yang dikirim oleh pesantren.
          </p>
          <p>
            <strong className="text-foreground">2. Aktivasi Akun:</strong> Setelah pembayaran valid, klik "Terima" untuk mengaktifkan akun pesantren.
          </p>
          <p>
            <strong className="text-foreground">3. Penolakan:</strong> Jika bukti tidak valid, klik "Tolak" dan berikan alasan yang jelas.
          </p>
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-amber-800 dark:text-amber-200 font-medium">
              ⚠️ Anda adalah satu-satunya yang dapat mengaktifkan akun baru. Pastikan verifikasi dilakukan dengan teliti.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceBeranda;
