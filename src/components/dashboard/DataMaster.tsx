import { useState } from "react";
import { AlertTriangle, CheckCircle, Clock, Shield, Eye, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PesantrenData {
  id: string;
  namaPesantren: string;
  regional: string;
  status: string;
  pendingDays: number;
  namaPengasuh: string;
  email: string;
  noHp: string;
  alamat: string;
  jumlahSantri: number;
  tanggalDaftar: string;
}

const pesantrenData: PesantrenData[] = [
  {
    id: "MPJ-001",
    namaPesantren: "PP Al Hikmah",
    regional: "Malang Raya",
    status: "active",
    pendingDays: 0,
    namaPengasuh: "KH. Ahmad Fauzi",
    email: "alhikmah@email.com",
    noHp: "081234567890",
    alamat: "Jl. Raya Malang No. 123",
    jumlahSantri: 450,
    tanggalDaftar: "2024-01-15",
  },
  {
    id: "MPJ-002",
    namaPesantren: "PP Nurul Jadid",
    regional: "Probolinggo Raya",
    status: "active",
    pendingDays: 0,
    namaPengasuh: "KH. Muhammad Hasan",
    email: "nuruljadid@email.com",
    noHp: "082345678901",
    alamat: "Jl. Paiton No. 45",
    jumlahSantri: 1200,
    tanggalDaftar: "2024-01-20",
  },
  {
    id: "MPJ-003",
    namaPesantren: "PP Salafiyah Syafi'iyah",
    regional: "Situbondo",
    status: "pending",
    pendingDays: 5,
    namaPengasuh: "KH. Abdul Hamid",
    email: "salafiyah@email.com",
    noHp: "083456789012",
    alamat: "Jl. Situbondo Raya No. 78",
    jumlahSantri: 800,
    tanggalDaftar: "2024-12-08",
  },
  {
    id: "MPJ-004",
    namaPesantren: "PP Darul Ulum",
    regional: "Jombang",
    status: "active",
    pendingDays: 0,
    namaPengasuh: "KH. Cholil Bisri",
    email: "darululum@email.com",
    noHp: "084567890123",
    alamat: "Jl. Rejoso Peterongan",
    jumlahSantri: 950,
    tanggalDaftar: "2024-02-10",
  },
  {
    id: "MPJ-005",
    namaPesantren: "PP Lirboyo",
    regional: "Kediri Raya",
    status: "active",
    pendingDays: 0,
    namaPengasuh: "KH. Anwar Manshur",
    email: "lirboyo@email.com",
    noHp: "085678901234",
    alamat: "Jl. Lirboyo Kediri",
    jumlahSantri: 1500,
    tanggalDaftar: "2024-01-05",
  },
  {
    id: "MPJ-006",
    namaPesantren: "PP Sidogiri",
    regional: "Sidoarjo-Pasuruan",
    status: "pending",
    pendingDays: 4,
    namaPengasuh: "KH. Nawawi Abdul Jalil",
    email: "sidogiri@email.com",
    noHp: "086789012345",
    alamat: "Jl. Sidogiri Pasuruan",
    jumlahSantri: 2000,
    tanggalDaftar: "2024-12-09",
  },
  {
    id: "MPJ-007",
    namaPesantren: "PP Tebuireng",
    regional: "Jombang",
    status: "pending",
    pendingDays: 2,
    namaPengasuh: "KH. Salahuddin Wahid",
    email: "tebuireng@email.com",
    noHp: "087890123456",
    alamat: "Jl. Tebuireng Jombang",
    jumlahSantri: 1800,
    tanggalDaftar: "2024-12-11",
  },
  {
    id: "MPJ-008",
    namaPesantren: "PP Bahrul Ulum",
    regional: "Jombang",
    status: "active",
    pendingDays: 0,
    namaPengasuh: "KH. Hasib Wahab",
    email: "bahrululum@email.com",
    noHp: "088901234567",
    alamat: "Jl. Tambakberas Jombang",
    jumlahSantri: 700,
    tanggalDaftar: "2024-03-01",
  },
  {
    id: "MPJ-009",
    namaPesantren: "PP Miftahul Ulum",
    regional: "Madura Raya",
    status: "pending",
    pendingDays: 7,
    namaPengasuh: "KH. Moh. Tidjani Djauhari",
    email: "miftahululum@email.com",
    noHp: "089012345678",
    alamat: "Jl. Pamekasan Madura",
    jumlahSantri: 600,
    tanggalDaftar: "2024-12-06",
  },
  {
    id: "MPJ-010",
    namaPesantren: "PP Mambaul Ma'arif",
    regional: "Jember-Lumajang",
    status: "active",
    pendingDays: 0,
    namaPengasuh: "KH. Sofyan Tsauri",
    email: "mambaulm@email.com",
    noHp: "080123456789",
    alamat: "Jl. Denanyar Jember",
    jumlahSantri: 550,
    tanggalDaftar: "2024-02-25",
  },
];

const DataMaster = () => {
  const [data, setData] = useState(pesantrenData);
  const [selectedPesantren, setSelectedPesantren] = useState<PesantrenData | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleViewDetail = (item: PesantrenData) => {
    setSelectedPesantren(item);
    setIsDetailOpen(true);
  };

  const handleApprove = (id: string) => {
    setData(
      data.map((item) =>
        item.id === id ? { ...item, status: "active", pendingDays: 0 } : item
      )
    );
    setIsDetailOpen(false);
    toast.success("Approve berhasil!", {
      description: `Pesantren ${id} telah diaktifkan.`,
    });
  };

  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return (
        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
          <CheckCircle className="h-3 w-3" />
          Aktif
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-medium px-2 py-1 rounded-full">
        <Clock className="h-3 w-3" />
        Pending
      </span>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Database Seluruh Jatim</h1>
        <p className="text-slate-500">Kelola data pesantren se-Jawa Timur</p>
      </div>

      {/* Warning Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-amber-800">Perhatian!</p>
          <p className="text-sm text-amber-700">
            Terdapat {data.filter((d) => d.pendingDays > 3).length} pesantren dengan status pending lebih dari 3 hari.
            Segera lakukan validasi atau approve jika diperlukan.
          </p>
        </div>
      </div>

      <Card className="bg-white border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-600" />
            Data Pesantren
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="text-slate-600">ID</TableHead>
                  <TableHead className="text-slate-600">Nama Pesantren</TableHead>
                  <TableHead className="text-slate-600">Regional</TableHead>
                  <TableHead className="text-slate-600">Status Akun</TableHead>
                  <TableHead className="text-slate-600">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow
                    key={item.id}
                    className={cn(
                      "border-slate-100",
                      item.pendingDays > 3 && "bg-red-50"
                    )}
                  >
                    <TableCell className="font-mono text-slate-700">
                      {item.id}
                    </TableCell>
                    <TableCell className="font-medium text-slate-800">
                      {item.namaPesantren}
                    </TableCell>
                    <TableCell className="text-slate-600">{item.regional}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(item.status)}
                        {item.pendingDays > 3 && (
                          <span className="text-xs text-red-600 font-medium">
                            ({item.pendingDays} hari)
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetail(item)}
                          className="text-slate-600"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Lihat Detail
                        </Button>
                        {item.status === "pending" && item.pendingDays > 3 && (
                          <Button
                            size="sm"
                            onClick={() => handleApprove(item.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                          >
                            Approve
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Shield className="h-5 w-5 text-emerald-600" />
              Detail Pesantren
            </DialogTitle>
          </DialogHeader>
          {selectedPesantren && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">ID Pesantren</p>
                  <p className="font-mono font-medium text-slate-800">{selectedPesantren.id}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  {getStatusBadge(selectedPesantren.status)}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-slate-500">Nama Pesantren</p>
                <p className="font-semibold text-slate-800">{selectedPesantren.namaPesantren}</p>
              </div>
              
              <div>
                <p className="text-sm text-slate-500">Nama Pengasuh</p>
                <p className="font-medium text-slate-800">{selectedPesantren.namaPengasuh}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="text-slate-800">{selectedPesantren.email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">No HP/WhatsApp</p>
                  <p className="text-slate-800">{selectedPesantren.noHp}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-slate-500">Alamat</p>
                <p className="text-slate-800">{selectedPesantren.alamat}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Regional</p>
                  <p className="font-medium text-slate-800">{selectedPesantren.regional}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Jumlah Santri</p>
                  <p className="font-medium text-slate-800">{selectedPesantren.jumlahSantri}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Tanggal Daftar</p>
                  <p className="text-slate-800">{selectedPesantren.tanggalDaftar}</p>
                </div>
              </div>

              {selectedPesantren.status === "pending" && (
                <div className="pt-4 border-t flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsDetailOpen(false)}
                  >
                    Tutup
                  </Button>
                  <Button
                    onClick={() => handleApprove(selectedPesantren.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DataMaster;
