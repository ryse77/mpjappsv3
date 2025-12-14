import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Eye, CheckCircle, XCircle, UserCheck, Image, ZoomIn, X, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Pendaftar {
  id: number;
  tanggal: string;
  namaPesantren: string;
  namaMedia: string;
  kecamatan: string;
  pengasuh: string;
  alamat: string;
  email: string;
  noHp: string;
  nominal: string;
  buktiTransfer: string;
  status: "pending" | "approved" | "rejected";
}

// Generate more dummy data for pagination demo
const generateDummyData = (): Pendaftar[] => {
  const baseData = [
    { namaPesantren: "PP Al Hikmah", namaMedia: "@alhikmah_official", kecamatan: "Lowokwaru", pengasuh: "KH. Ahmad Fauzi" },
    { namaPesantren: "PP Nurul Jadid", namaMedia: "@nuruljadid_mlg", kecamatan: "Sukun", pengasuh: "KH. Mahmud Hasan" },
    { namaPesantren: "PP Darul Ulum", namaMedia: "@darulum_malang", kecamatan: "Blimbing", pengasuh: "KH. Zainal Abidin" },
    { namaPesantren: "PP Al Falah", namaMedia: "@alfalah_media", kecamatan: "Kedungkandang", pengasuh: "KH. Ridwan Nawawi" },
    { namaPesantren: "PP Miftahul Huda", namaMedia: "@miftahulhuda_id", kecamatan: "Klojen", pengasuh: "KH. Syamsul Arifin" },
    { namaPesantren: "PP Raudlatul Ulum", namaMedia: "@raudlatululum", kecamatan: "Singosari", pengasuh: "KH. Abdullah Faqih" },
    { namaPesantren: "PP Bahrul Maghfiroh", namaMedia: "@bahrul_id", kecamatan: "Pakis", pengasuh: "KH. Gus Baha" },
    { namaPesantren: "PP Salafiyah Syafiiyah", namaMedia: "@salafiyah_mlg", kecamatan: "Gondanglegi", pengasuh: "KH. Hasyim Asyari" },
    { namaPesantren: "PP Al Ittihad", namaMedia: "@alittihad_media", kecamatan: "Turen", pengasuh: "KH. Wahid Hasyim" },
    { namaPesantren: "PP Nurul Huda", namaMedia: "@nurulhuda_malang", kecamatan: "Bululawang", pengasuh: "KH. Idris Marzuqi" },
  ];

  const statuses: Array<"pending" | "approved" | "rejected"> = ["pending", "approved", "rejected"];
  const data: Pendaftar[] = [];

  for (let i = 0; i < 50; i++) {
    const base = baseData[i % baseData.length];
    const day = 14 - (i % 14);
    const nominal = Math.random() > 0.5 ? 50 : 20;
    const uniqueCode = Math.floor(Math.random() * 900) + 100;

    data.push({
      id: i + 1,
      tanggal: `${day < 10 ? '0' + day : day} Dec 2024`,
      namaPesantren: i < 10 ? base.namaPesantren : `${base.namaPesantren} ${Math.floor(i / 10) + 1}`,
      namaMedia: i < 10 ? base.namaMedia : `${base.namaMedia}${Math.floor(i / 10) + 1}`,
      kecamatan: base.kecamatan,
      pengasuh: base.pengasuh,
      alamat: `Jl. Raya No. ${i + 1}, Malang`,
      email: `pesantren${i + 1}@gmail.com`,
      noHp: `08123456${String(i).padStart(4, '0')}`,
      nominal: `Rp ${nominal}.${uniqueCode}`,
      buktiTransfer: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
      status: i < 15 ? "pending" : statuses[i % 3],
    });
  }

  return data;
};

const dummyData = generateDummyData();

const ValidasiPendaftar = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Pendaftar[]>([]);
  const [filteredData, setFilteredData] = useState<Pendaftar[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPendaftar, setSelectedPendaftar] = useState<Pendaftar | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const { toast } = useToast();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(dummyData);
      setFilteredData(dummyData);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const filtered = data.filter(
      (item) =>
        item.namaPesantren.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.namaMedia.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchQuery, data]);

  // Pagination calculations
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalItems);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (value: string) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1);
  };

  const getVisiblePages = () => {
    const pages: number[] = [];
    const maxVisible = 3;
    
    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, 3);
      } else if (currentPage >= totalPages - 1) {
        pages.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(currentPage - 1, currentPage, currentPage + 1);
      }
    }
    return pages;
  };

  const handlePeriksaClick = (pendaftar: Pendaftar) => {
    setSelectedPendaftar(pendaftar);
    setDialogOpen(true);
  };

  const handleApprove = () => {
    if (selectedPendaftar) {
      setData((prev) =>
        prev.map((item) =>
          item.id === selectedPendaftar.id ? { ...item, status: "approved" as const } : item
        )
      );
      toast({
        title: "Data Approved!",
        description: `Pendaftaran ${selectedPendaftar.namaPesantren} telah disetujui`,
        className: "bg-sidebar text-sidebar-foreground",
      });
      setDialogOpen(false);
    }
  };

  const handleReject = () => {
    if (selectedPendaftar) {
      setData((prev) =>
        prev.map((item) =>
          item.id === selectedPendaftar.id ? { ...item, status: "rejected" as const } : item
        )
      );
      toast({
        title: "Data Ditolak",
        description: `Pendaftaran ${selectedPendaftar.namaPesantren} telah ditolak`,
        variant: "destructive",
      });
      setDialogOpen(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500 text-white">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-500 text-white">Ditolak</Badge>;
      default:
        return <Badge className="bg-accent text-accent-foreground">Pending</Badge>;
    }
  };

  const pendingCount = data.filter((d) => d.status === "pending").length;

  if (loading) {
    return (
      <Card className="bg-card shadow-sm border-0">
        <CardHeader>
          <Skeleton className="h-8 w-64" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <UserCheck className="w-7 h-7 text-sidebar" />
            Validasi Pendaftar
          </h1>
          <p className="text-muted-foreground mt-1">
            {pendingCount} pendaftaran menunggu validasi
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Cari nama pesantren atau media..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Table Card */}
      <Card className="bg-card shadow-sm border-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold text-foreground">Tanggal</TableHead>
                  <TableHead className="font-semibold text-foreground">Nama Pesantren</TableHead>
                  <TableHead className="font-semibold text-foreground">Nama Media</TableHead>
                  <TableHead className="font-semibold text-foreground hidden sm:table-cell">Nominal</TableHead>
                  <TableHead className="font-semibold text-foreground">Status</TableHead>
                  <TableHead className="font-semibold text-foreground text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item, index) => (
                  <TableRow 
                    key={item.id} 
                    className={`${index % 2 === 0 ? "bg-card" : "bg-muted/30"} hover:bg-muted/50 transition-colors`}
                  >
                    <TableCell className="text-muted-foreground text-sm">{item.tanggal}</TableCell>
                    <TableCell className="font-medium text-foreground">{item.namaPesantren}</TableCell>
                    <TableCell className="text-sidebar font-medium">{item.namaMedia}</TableCell>
                    <TableCell className="text-foreground hidden sm:table-cell">{item.nominal}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePeriksaClick(item)}
                        className="border-sidebar text-sidebar hover:bg-sidebar hover:text-sidebar-foreground min-h-[44px]"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">Periksa</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {paginatedData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Tidak ada data ditemukan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls */}
          <div className="border-t border-border px-4 py-3">
            {/* Mobile: Simple Prev/Next */}
            <div className="flex sm:hidden items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {startIndex + 1}-{endIndex} dari {totalItems}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="min-h-[44px] min-w-[44px]"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="min-h-[44px] min-w-[44px]"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Desktop: Full Controls */}
            <div className="hidden sm:flex items-center justify-between">
              {/* Left: Showing entries */}
              <span className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{endIndex} of {totalItems} entries
              </span>

              {/* Center: Rows per page */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Rows per page:</span>
                <Select value={String(rowsPerPage)} onValueChange={handleRowsPerPageChange}>
                  <SelectTrigger className="w-[70px] h-9 bg-card">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card z-50">
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Right: Page buttons */}
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-9"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                
                {currentPage > 2 && totalPages > 4 && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(1)}
                      className="h-9 w-9 p-0"
                    >
                      1
                    </Button>
                    {currentPage > 3 && <span className="px-2 text-muted-foreground">...</span>}
                  </>
                )}

                {getVisiblePages().map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className={`h-9 w-9 p-0 ${currentPage === page ? "bg-sidebar text-sidebar-foreground hover:bg-sidebar/90" : ""}`}
                  >
                    {page}
                  </Button>
                ))}

                {currentPage < totalPages - 1 && totalPages > 4 && (
                  <>
                    {currentPage < totalPages - 2 && <span className="px-2 text-muted-foreground">...</span>}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(totalPages)}
                      className="h-9 w-9 p-0"
                    >
                      {totalPages}
                    </Button>
                  </>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-9"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg bg-card max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-sidebar flex items-center gap-2">
              <UserCheck className="w-5 h-5" />
              Detail Pendaftar
            </DialogTitle>
          </DialogHeader>

          {selectedPendaftar && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Nama Pesantren</p>
                  <p className="font-medium text-foreground">{selectedPendaftar.namaPesantren}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Nama Pengasuh</p>
                  <p className="font-medium text-foreground">{selectedPendaftar.pengasuh}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Nama Media</p>
                  <p className="font-medium text-sidebar">{selectedPendaftar.namaMedia}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Kecamatan</p>
                  <p className="font-medium text-foreground">{selectedPendaftar.kecamatan}</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Alamat Lengkap</p>
                <p className="font-medium text-foreground">{selectedPendaftar.alamat}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground break-all">{selectedPendaftar.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">No. HP / WhatsApp</p>
                  <a 
                    href={`https://wa.me/${selectedPendaftar.noHp.replace(/^0/, '62')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-sidebar hover:underline"
                  >
                    {selectedPendaftar.noHp}
                  </a>
                </div>
              </div>

              {/* Payment Section */}
              <div className="border-t border-border pt-4 mt-4">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  Bukti Pembayaran
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Nominal Transfer</p>
                    <p className="font-bold text-lg text-accent">{selectedPendaftar.nominal}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Status</p>
                    {getStatusBadge(selectedPendaftar.status)}
                  </div>
                </div>

                {/* Transfer Proof Image */}
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Bukti Transfer</p>
                  <div 
                    className="relative group cursor-pointer rounded-lg overflow-hidden border border-border"
                    onClick={() => setImageModalOpen(true)}
                  >
                    <img
                      src={selectedPendaftar.buktiTransfer}
                      alt="Bukti Transfer"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 flex-col sm:flex-row">
            <Button
              variant="outline"
              onClick={handleReject}
              className="border-red-500 text-red-500 hover:bg-red-50 min-h-[44px] w-full sm:w-auto"
              disabled={selectedPendaftar?.status !== "pending"}
            >
              <XCircle className="w-4 h-4 mr-1" />
              Tolak
            </Button>
            <Button
              onClick={handleApprove}
              className="bg-sidebar hover:bg-sidebar/90 text-sidebar-foreground min-h-[44px] w-full sm:w-auto"
              disabled={selectedPendaftar?.status !== "pending"}
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Full Image Modal */}
      <Dialog open={imageModalOpen} onOpenChange={setImageModalOpen}>
        <DialogContent className="max-w-3xl bg-card p-2">
          <button
            onClick={() => setImageModalOpen(false)}
            className="absolute top-3 right-3 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          {selectedPendaftar && (
            <img
              src={selectedPendaftar.buktiTransfer}
              alt="Bukti Transfer - Full View"
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ValidasiPendaftar;
