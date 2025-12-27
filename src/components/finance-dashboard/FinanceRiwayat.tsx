import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { History, Search, CheckCircle, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Transaction {
  id: string;
  nama_pesantren: string;
  region: string;
  payment_type: "new" | "renewal";
  amount: number;
  status: "approved" | "rejected";
  processed_at: string;
  processed_by: string;
  reject_reason?: string;
}

// Dummy transaction history
const dummyTransactions: Transaction[] = [
  {
    id: "1",
    nama_pesantren: "Pesantren Al-Falah",
    region: "Kediri",
    payment_type: "new",
    amount: 250000,
    status: "approved",
    processed_at: "2024-01-15T14:30:00",
    processed_by: "Finance Admin",
  },
  {
    id: "2",
    nama_pesantren: "Pesantren Miftahul Huda",
    region: "Blitar",
    payment_type: "new",
    amount: 250000,
    status: "approved",
    processed_at: "2024-01-15T13:45:00",
    processed_by: "Finance Admin",
  },
  {
    id: "3",
    nama_pesantren: "Pesantren An-Nur",
    region: "Sidoarjo",
    payment_type: "renewal",
    amount: 150000,
    status: "rejected",
    processed_at: "2024-01-15T12:20:00",
    processed_by: "Finance Admin",
    reject_reason: "Bukti transfer tidak jelas",
  },
  {
    id: "4",
    nama_pesantren: "Pesantren Darussalam",
    region: "Gresik",
    payment_type: "new",
    amount: 250000,
    status: "approved",
    processed_at: "2024-01-15T11:00:00",
    processed_by: "Finance Admin",
  },
  {
    id: "5",
    nama_pesantren: "Pesantren Al-Mubarok",
    region: "Lamongan",
    payment_type: "new",
    amount: 250000,
    status: "approved",
    processed_at: "2024-01-14T16:30:00",
    processed_by: "Finance Admin",
  },
  {
    id: "6",
    nama_pesantren: "Pesantren Baitul Hikmah",
    region: "Mojokerto",
    payment_type: "renewal",
    amount: 150000,
    status: "rejected",
    processed_at: "2024-01-14T15:15:00",
    processed_by: "Finance Admin",
    reject_reason: "Nominal tidak sesuai",
  },
  {
    id: "7",
    nama_pesantren: "Pesantren Raudlatul Ulum",
    region: "Pasuruan",
    payment_type: "new",
    amount: 250000,
    status: "approved",
    processed_at: "2024-01-14T14:00:00",
    processed_by: "Finance Admin",
  },
  {
    id: "8",
    nama_pesantren: "Pesantren Al-Khoiriyah",
    region: "Probolinggo",
    payment_type: "new",
    amount: 250000,
    status: "approved",
    processed_at: "2024-01-14T10:45:00",
    processed_by: "Finance Admin",
  },
];

const FinanceRiwayat = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [transactions] = useState<Transaction[]>(dummyTransactions);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredTransactions = transactions.filter(t =>
    t.nama_pesantren.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const approvedCount = transactions.filter(t => t.status === "approved").length;
  const rejectedCount = transactions.filter(t => t.status === "rejected").length;
  const totalApproved = transactions
    .filter(t => t.status === "approved")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-emerald-800 to-emerald-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 rounded-lg">
              <History className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Riwayat Transaksi</h2>
              <p className="text-white/80 text-sm">
                Catatan semua verifikasi pembayaran
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Disetujui</p>
                <p className="text-2xl font-bold text-foreground">{approvedCount}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ditolak</p>
                <p className="text-2xl font-bold text-foreground">{rejectedCount}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Diterima</p>
                <p className="text-xl font-bold text-foreground">{formatCurrency(totalApproved)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle>Daftar Transaksi</CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari pesantren..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pesantren</TableHead>
                  <TableHead className="hidden md:table-cell">Wilayah</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead>Nominal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Waktu</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{transaction.nama_pesantren}</p>
                        {transaction.reject_reason && (
                          <p className="text-xs text-red-500 mt-1">
                            Alasan: {transaction.reject_reason}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {transaction.region}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={transaction.payment_type === "new" ? "default" : "secondary"}
                        className={transaction.payment_type === "new" ? "bg-blue-500" : ""}
                      >
                        {transaction.payment_type === "new" ? "Baru" : "Perpanjang"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={transaction.status === "approved" ? "default" : "destructive"}
                        className={transaction.status === "approved" ? "bg-green-500" : ""}
                      >
                        {transaction.status === "approved" ? "Disetujui" : "Ditolak"}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                      {formatDate(transaction.processed_at)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceRiwayat;
