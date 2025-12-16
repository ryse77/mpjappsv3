import { 
  User, 
  Users, 
  Award,
  TrendingUp,
  Activity,
  Star,
  Zap,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AreaChart,
  Area,
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

const userEngagement = [
  { day: "Sen", active: 2100, logins: 1800 },
  { day: "Sel", active: 2300, logins: 2000 },
  { day: "Rab", active: 2450, logins: 2100 },
  { day: "Kam", active: 2200, logins: 1900 },
  { day: "Jum", active: 2600, logins: 2200 },
  { day: "Sab", active: 1800, logins: 1500 },
  { day: "Min", active: 1500, logins: 1200 },
];

const roleDistribution = [
  { name: "Koordinator", value: 340, color: "#10B981" },
  { name: "Crew", value: 8500, color: "#3B82F6" },
  { name: "Regional Admin", value: 56, color: "#8B5CF6" },
  { name: "Super Admin", value: 8, color: "#EF4444" },
];

const levelDistribution = [
  { level: "Muhibbin", count: 3200, xpRange: "0-500" },
  { level: "Murid", count: 2800, xpRange: "501-1500" },
  { level: "Santri", count: 1800, xpRange: "1501-3000" },
  { level: "Ustadz", count: 650, xpRange: "3001-5000" },
  { level: "Kyai", count: 50, xpRange: "5001+" },
];

const topUsers = [
  { id: 1, name: "Ahmad Fauzi", pesantren: "PP Tebuireng", xp: 8500, level: "Kyai", badges: 12 },
  { id: 2, name: "Muhammad Rizki", pesantren: "PP Darul Ulum", xp: 7200, level: "Kyai", badges: 10 },
  { id: 3, name: "Fatimah Zahra", pesantren: "PP Al-Falah", xp: 6800, level: "Ustadz", badges: 9 },
  { id: 4, name: "Abdul Rahman", pesantren: "PP Nurul Jadid", xp: 5900, level: "Ustadz", badges: 8 },
  { id: 5, name: "Siti Aisyah", pesantren: "PP Mambaul Hikam", xp: 5200, level: "Ustadz", badges: 7 },
  { id: 6, name: "Hasan Basri", pesantren: "PP Darussalam", xp: 4800, level: "Santri", badges: 6 },
  { id: 7, name: "Nur Hidayah", pesantren: "PP Al-Hidayah", xp: 4200, level: "Santri", badges: 5 },
  { id: 8, name: "Umar Faruq", pesantren: "PP Sunan Drajat", xp: 3900, level: "Santri", badges: 5 },
];

const recentActivities = [
  { id: 1, user: "Ahmad Fauzi", action: "Mendapat badge Contributor", xp: "+500", time: "5 menit lalu" },
  { id: 2, user: "Fatimah Zahra", action: "Login streak 7 hari", xp: "+100", time: "15 menit lalu" },
  { id: 3, user: "Muhammad Rizki", action: "Upload konten baru", xp: "+50", time: "30 menit lalu" },
  { id: 4, user: "Siti Aisyah", action: "Mengikuti event Kopdar", xp: "+200", time: "1 jam lalu" },
  { id: 5, user: "Abdul Rahman", action: "Naik level ke Ustadz", xp: "+1000", time: "2 jam lalu" },
];

const UserLevel = () => {
  const totalUsers = 8904;
  const activeToday = 2600;
  const avgXP = 1250;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
          <User className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Report Level User</h1>
          <p className="text-sm text-slate-500">Monitoring aktivitas dan engagement individual</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                <Users className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">{totalUsers.toLocaleString()}</div>
                <div className="text-sm text-slate-500">Total User</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <Activity className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">{activeToday.toLocaleString()}</div>
                <div className="text-sm text-slate-500">Aktif Hari Ini</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">{avgXP.toLocaleString()}</div>
                <div className="text-sm text-slate-500">Rata-rata XP</div>
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
                <div className="text-2xl font-bold text-slate-800">50</div>
                <div className="text-sm text-slate-500">Level Kyai</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Engagement */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-500" />
              Aktivitas Harian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={userEngagement}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#94A3B8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" />
                <Tooltip />
                <Area type="monotone" dataKey="active" stroke="#F59E0B" strokeWidth={2} fill="url(#colorActive)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Role Distribution */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              Distribusi Role
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={roleDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {roleDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {roleDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-slate-600">{item.name}: {item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Level Distribution */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" />
            Distribusi Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={levelDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="level" tick={{ fontSize: 12 }} stroke="#94A3B8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" />
              <Tooltip />
              <Bar dataKey="count" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Users */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              Top Users by XP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead className="text-center">Level</TableHead>
                    <TableHead className="text-right">XP</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topUsers.slice(0, 5).map((user, index) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium text-slate-500">{index + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-7 h-7">
                            <AvatarFallback className="text-xs bg-amber-100 text-amber-700">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{user.name}</p>
                            <p className="text-xs text-slate-400">{user.pesantren}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary" className={
                          user.level === 'Kyai' ? 'bg-purple-100 text-purple-700' :
                          user.level === 'Ustadz' ? 'bg-amber-100 text-amber-700' :
                          'bg-slate-100 text-slate-600'
                        }>
                          {user.level}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium text-amber-600">
                        {user.xp.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-600" />
              Aktivitas Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs bg-amber-100 text-amber-700">
                        {activity.user.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-slate-700">{activity.user}</p>
                      <p className="text-xs text-slate-500">{activity.action}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-emerald-600">{activity.xp}</span>
                    <p className="text-xs text-slate-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserLevel;
