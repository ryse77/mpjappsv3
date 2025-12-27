import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Tag, Lock, Edit } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PriceSKU {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "registration" | "renewal" | "upgrade";
  is_active: boolean;
}

// Dummy pricing data
const pricingSKUs: PriceSKU[] = [
  {
    id: "1",
    name: "Pendaftaran Baru - Basic",
    description: "Biaya pendaftaran akun pesantren baru level Basic",
    price: 250000,
    category: "registration",
    is_active: true,
  },
  {
    id: "2",
    name: "Pendaftaran Baru - Silver",
    description: "Biaya pendaftaran akun pesantren baru level Silver",
    price: 500000,
    category: "registration",
    is_active: true,
  },
  {
    id: "3",
    name: "Pendaftaran Baru - Gold",
    description: "Biaya pendaftaran akun pesantren baru level Gold",
    price: 1000000,
    category: "registration",
    is_active: true,
  },
  {
    id: "4",
    name: "Perpanjangan Tahunan",
    description: "Biaya perpanjangan membership per tahun",
    price: 150000,
    category: "renewal",
    is_active: true,
  },
  {
    id: "5",
    name: "Upgrade ke Silver",
    description: "Biaya upgrade dari Basic ke Silver",
    price: 300000,
    category: "upgrade",
    is_active: true,
  },
  {
    id: "6",
    name: "Upgrade ke Gold",
    description: "Biaya upgrade dari Silver ke Gold",
    price: 600000,
    category: "upgrade",
    is_active: true,
  },
];

const FinanceHarga = () => {
  const { toast } = useToast();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleEditClick = () => {
    toast({
      title: "🔒 Fitur Terkunci",
      description: "Fitur ubah harga dikunci untuk keamanan saat ini.",
      variant: "destructive",
    });
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "registration":
        return <Badge className="bg-blue-500">Pendaftaran</Badge>;
      case "renewal":
        return <Badge className="bg-amber-500">Perpanjangan</Badge>;
      case "upgrade":
        return <Badge className="bg-purple-500">Upgrade</Badge>;
      default:
        return <Badge variant="secondary">{category}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-emerald-800 to-emerald-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 rounded-lg">
              <Tag className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Pengaturan Harga</h2>
              <p className="text-white/80 text-sm">
                Daftar SKU dan tarif layanan MPJ
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lock Notice */}
      <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-amber-600" />
            <div>
              <p className="font-medium text-amber-800 dark:text-amber-200">
                Mode Hanya-Baca
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Pengubahan harga memerlukan persetujuan Admin Pusat. Fitur edit akan segera hadir.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Daftar Harga (SKU)</CardTitle>
            <Button 
              variant="outline" 
              onClick={handleEditClick}
              className="gap-2"
              disabled
            >
              <Edit className="w-4 h-4" />
              Edit Harga
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama SKU</TableHead>
                  <TableHead className="hidden md:table-cell">Deskripsi</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pricingSKUs.map((sku) => (
                  <TableRow key={sku.id}>
                    <TableCell className="font-medium text-foreground">
                      {sku.name}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                      {sku.description}
                    </TableCell>
                    <TableCell>
                      {getCategoryBadge(sku.category)}
                    </TableCell>
                    <TableCell className="font-bold text-emerald-600">
                      {formatCurrency(sku.price)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={sku.is_active ? "default" : "secondary"} className={sku.is_active ? "bg-green-500" : ""}>
                        {sku.is_active ? "Aktif" : "Nonaktif"}
                      </Badge>
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

export default FinanceHarga;
