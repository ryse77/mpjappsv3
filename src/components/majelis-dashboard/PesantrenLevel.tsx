import { 
  Building2, 
  Users, 
  Award,
  TrendingUp,
  CheckCircle,
  Clock,
  Star,
  FileText
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const badgeDistribution = [
  { name: "Basic", value: 180, color: "#94A3B8" },
  { name: "Gold", value: 120, color: "#F59E0B" },
  { name: "Platinum", value: 40, color: "#8B5CF6" },
];

const profileCompletion = [
  { category: "Logo & Map", completed: 285, total: 340 },
  { category: "SK Kolektif", completed: 162, total: 340 },
  { category: "Profil Lengkap", completed: 198, total: 340 },
  { category: "Media Sosial", completed: 245, total: 340 },
];

const topPesantren = [
  { id: 1, name: "PP Tebuireng", regional: "Jombang", members: 45, badge: "Platinum", xp: 12500 },
  { id: 2, name: "PP Darul Ulum", regional: "Jombang", members: 38, badge: "Platinum", xp: 11200 },
  { id: 3, name: "PP Al-Falah", regional: "Surabaya", members: 32, badge: "Gold", xp: 8900 },
  { id: 4, name: "PP Nurul Jadid", regional: "Probolinggo", members: 28, badge: "Gold", xp: 7800 },
  { id: 5, name: "PP Mambaul Hikam", regional: "Blitar", members: 25, badge: "Gold", xp: 6500 },
  { id: 6, name: "PP Darussalam", regional: "Kediri", members: 22, badge: "Basic", xp: 4200 },
  { id: 7, name: "PP Al-Hidayah", regional: "Malang", members: 20, badge: "Basic", xp: 3800 },
  { id: 8, name: "PP Sunan Drajat", regional: "Lamongan", members: 18, badge: "Gold", xp: 5600 },
];

const activityByRegion = [
  { region: "Surabaya", active: 52, inactive: 10 },
  { region: "Malang", active: 38, inactive: 7 },
  { region: "Jember", active: 28, inactive: 4 },
  { region: "Kediri", active: 22, inactive: 6 },
  { region: "Jombang", active: 20, inactive: 2 },
];

const PesantrenLevel = () => {
  const totalPesantren = 340;
  const activePesantren = 280;
  const pendingVerification = 38;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
          <Building2 className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Report Level Pesantren</h1>
          <p className="text-sm text-slate-500">Monitoring performa dan status per lembaga</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">{totalPesantren}</div>
                <div className="text-sm text-slate-500">Total Pesantren</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">{activePesantren}</div>
                <div className="text-sm text-slate-500">Aktif</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">{pendingVerification}</div>
                <div className="text-sm text-slate-500">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Award className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">40</div>
                <div className="text-sm text-slate-500">Platinum</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Badge Distribution */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              Distribusi Badge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={badgeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {badgeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-2">
              {badgeDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-slate-600">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity by Region */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              Aktivitas per Regional
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={activityByRegion}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="region" tick={{ fontSize: 11 }} stroke="#94A3B8" />
                <YAxis tick={{ fontSize: 11 }} stroke="#94A3B8" />
                <Tooltip />
                <Bar dataKey="active" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Aktif" />
                <Bar dataKey="inactive" fill="#E2E8F0" radius={[4, 4, 0, 0]} name="Tidak Aktif" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Profile Completion */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-600" />
            Kelengkapan Profil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profileCompletion.map((item) => (
              <div key={item.category} className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">{item.category}</span>
                  <span className="text-sm text-slate-500">{item.completed}/{item.total}</span>
                </div>
                <Progress value={(item.completed / item.total) * 100} className="h-2" />
                <p className="text-xs text-slate-400 mt-1">
                  {Math.round((item.completed / item.total) * 100)}% lengkap
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Pesantren Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" />
            Top Pesantren by XP
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Nama Pesantren</TableHead>
                  <TableHead>Regional</TableHead>
                  <TableHead className="text-center">Members</TableHead>
                  <TableHead className="text-center">Badge</TableHead>
                  <TableHead className="text-right">XP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPesantren.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium text-slate-500">{index + 1}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-slate-600">{item.regional}</TableCell>
                    <TableCell className="text-center">{item.members}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className={
                        item.badge === 'Platinum' ? 'bg-purple-100 text-purple-700' :
                        item.badge === 'Gold' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-600'
                      }>
                        {item.badge}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium text-purple-600">
                      {item.xp.toLocaleString()}
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

export default PesantrenLevel;
