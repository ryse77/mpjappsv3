import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle, Eye, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PendingPayment {
  id: string;
  nama_pesantren: string;
  nama_pengasuh: string;
  region: string;
  payment_type: "new" | "renewal";
  amount: number;
  proof_url: string;
  submitted_at: string;
}

// Dummy data for MVP
const dummyPendingPayments: PendingPayment[] = [
  {
    id: "1",
    nama_pesantren: "Pesantren Al-Hikam",
    nama_pengasuh: "KH. Ahmad Fauzi",
    region: "Malang Raya",
    payment_type: "new",
    amount: 250000,
    proof_url: "/placeholder.svg",
    submitted_at: "2024-01-15T10:30:00",
  },
  {
    id: "2",
    nama_pesantren: "Pesantren Nurul Jadid",
    nama_pengasuh: "Gus Muhammad Ali",
    region: "Surabaya",
    payment_type: "new",
    amount: 250000,
    proof_url: "/placeholder.svg",
    submitted_at: "2024-01-15T09:15:00",
  },
  {
    id: "3",
    nama_pesantren: "Pesantren Darul Ulum",
    nama_pengasuh: "KH. Hasan Basri",
    region: "Jember",
    payment_type: "renewal",
    amount: 150000,
    proof_url: "/placeholder.svg",
    submitted_at: "2024-01-14T16:45:00",
  },
  {
    id: "4",
    nama_pesantren: "Pesantren Al-Amien",
    nama_pengasuh: "Nyai Fatimah",
    region: "Sumenep",
    payment_type: "new",
    amount: 250000,
    proof_url: "/placeholder.svg",
    submitted_at: "2024-01-14T14:20:00",
  },
  {
    id: "5",
    nama_pesantren: "Pesantren Langitan",
    nama_pengasuh: "KH. Abdullah Faqih",
    region: "Tuban",
    payment_type: "new",
    amount: 250000,
    proof_url: "/placeholder.svg",
    submitted_at: "2024-01-14T11:00:00",
  },
];

const FinanceVerifikasi = () => {
  const { toast } = useToast();
  const [pendingPayments, setPendingPayments] = useState<PendingPayment[]>(dummyPendingPayments);
  const [selectedPayment, setSelectedPayment] = useState<PendingPayment | null>(null);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showProofDialog, setShowProofDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

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

  const handleApprove = (payment: PendingPayment) => {
    setSelectedPayment(payment);
    setShowApproveDialog(true);
  };

  const handleReject = (payment: PendingPayment) => {
    setSelectedPayment(payment);
    setRejectReason("");
    setShowRejectDialog(true);
  };

  const handleViewProof = (payment: PendingPayment) => {
    setSelectedPayment(payment);
    setShowProofDialog(true);
  };

  const confirmApprove = () => {
    if (selectedPayment) {
      // Remove from list (simulate approval)
      setPendingPayments(prev => prev.filter(p => p.id !== selectedPayment.id));
      
      toast({
        title: "✅ Pembayaran Valid",
        description: `Akun ${selectedPayment.nama_pesantren} telah diaktifkan.`,
        className: "bg-green-50 border-green-200",
      });
    }
    setShowApproveDialog(false);
    setSelectedPayment(null);
  };

  const confirmReject = () => {
    if (selectedPayment && rejectReason.trim()) {
      // Remove from list (simulate rejection)
      setPendingPayments(prev => prev.filter(p => p.id !== selectedPayment.id));
      
      toast({
        title: "❌ Pembayaran Ditolak",
        description: `Akun ${selectedPayment.nama_pesantren} ditolak. Alasan: ${rejectReason}`,
        variant: "destructive",
      });
    }
    setShowRejectDialog(false);
    setSelectedPayment(null);
    setRejectReason("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-emerald-800 to-emerald-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 rounded-lg">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Verifikasi Pembayaran</h2>
              <p className="text-white/80 text-sm">
                {pendingPayments.length} pembayaran menunggu verifikasi
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" />
            Antrian Verifikasi
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingPayments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
              <p className="font-medium">Semua pembayaran telah diverifikasi!</p>
              <p className="text-sm">Tidak ada antrian saat ini.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pesantren</TableHead>
                    <TableHead className="hidden md:table-cell">Wilayah</TableHead>
                    <TableHead>Tipe</TableHead>
                    <TableHead>Nominal</TableHead>
                    <TableHead className="hidden md:table-cell">Waktu</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{payment.nama_pesantren}</p>
                          <p className="text-xs text-muted-foreground">{payment.nama_pengasuh}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {payment.region}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={payment.payment_type === "new" ? "default" : "secondary"}
                          className={payment.payment_type === "new" ? "bg-blue-500" : ""}
                        >
                          {payment.payment_type === "new" ? "Baru" : "Perpanjang"}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(payment.amount)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                        {formatDate(payment.submitted_at)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewProof(payment)}
                            className="h-8 px-2"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleApprove(payment)}
                            className="h-8 bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            <span className="hidden sm:inline">Terima</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(payment)}
                            className="h-8"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            <span className="hidden sm:inline">Tolak</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Approve Confirmation Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-green-600">Konfirmasi Aktivasi Akun</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin pembayaran dari <strong>{selectedPayment?.nama_pesantren}</strong> valid?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-800 dark:text-green-200">
                <strong>Dengan menyetujui:</strong>
              </p>
              <ul className="text-sm text-green-700 dark:text-green-300 mt-2 space-y-1">
                <li>• Status pembayaran akan berubah menjadi <strong>LUNAS</strong></li>
                <li>• Status akun akan berubah menjadi <strong>AKTIF</strong></li>
                <li>• Pesantren dapat mengakses dashboard mereka</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApproveDialog(false)}>
              Batal
            </Button>
            <Button onClick={confirmApprove} className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="w-4 h-4 mr-2" />
              Ya, Aktifkan Akun
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">Tolak Pembayaran</DialogTitle>
            <DialogDescription>
              Berikan alasan penolakan untuk <strong>{selectedPayment?.nama_pesantren}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Contoh: Bukti transfer tidak jelas, nominal tidak sesuai, dll."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Batal
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmReject}
              disabled={!rejectReason.trim()}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Tolak Pembayaran
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Proof Dialog */}
      <Dialog open={showProofDialog} onOpenChange={setShowProofDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Bukti Pembayaran</DialogTitle>
            <DialogDescription>
              {selectedPayment?.nama_pesantren} - {formatCurrency(selectedPayment?.amount || 0)}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <img 
                src={selectedPayment?.proof_url} 
                alt="Bukti Pembayaran"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProofDialog(false)}>
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FinanceVerifikasi;
