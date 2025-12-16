import { 
  MapPin, 
  Users, 
  Building2, 
  TrendingUp,
  Calendar,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const regionalPerformance = [
  { name: "Malang Raya", members: 2500, pesantren: 45, events: 12, growth: 15.2 },
  { name: "Surabaya", members: 3200, pesantren: 62, events: 18, growth: 22.5 },
  { name: "Jember", members: 1800, pesantren: 32, events: 8, growth: 8.3 },
  { name: "Kediri", members: 1500, pesantren: 28, events: 6, growth: -2.1 },
  { name: "Madiun", members: 1200, pesantren: 22, events: 5, growth: 5.7 },
  { name: "Probolinggo", members: 980, pesantren: 18, events: 4, growth: 12.4 },
  { name: "Blitar", members: 850, pesantren: 15, events: 3, growth: 3.2 },
  { name: "Mojokerto", members: 720, pesantren: 14, events: 4, growth: 9.8 },
];

const monthlyTrend = [
  { month: "Jan", malang: 2100, surabaya: 2800, jember: 1500 },
  { month: "Feb", malang: 2200, surabaya: 2900, jember: 1550 },
  { month: "Mar", malang: 2280, surabaya: 2950, jember: 1620 },
  { month: "Apr", malang: 2350, surabaya: 3050, jember: 1680 },
  { month: "May", malang: 2420, surabaya: 3120, jember: 1750 },
  { month: "Jun", malang: 2500, surabaya: 3200, jember: 1800 },
];

const recentEvents = [
  { id: 1, name: "Kopdar Media Surabaya", regional: "Surabaya", participants: 120, date: "2024-01-20", status: "upcoming" },
  { id: 2, name: "Workshop Desain", regional: "Malang Raya", participants: 85, date: "2024-01-15", status: "completed" },
  { id: 3, name: "Pelatihan Video", regional: "Jember", participants: 45, date: "2024-01-18", status: "upcoming" },
  { id: 4, name: "Gathering Tahunan", regional: "Kediri", participants: 200, date: "2024-01-10", status: "completed" },
];

const RegionalLevel = () => {
  const totalMembers = regionalPerformance.reduce((sum, r) => sum + r.members, 0);
  const totalPesantren = regionalPerformance.reduce((sum, r) => sum + r.pesantren, 0);
  const totalEvents = regionalPerformance.reduce((sum, r) => sum + r.events, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
          <MapPin className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Report Level Regional</h1>
          <p className="text-sm text-slate-500">Monitoring performa dan aktivitas per wilayah</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">{regionalPerformance.length}</div>
                <div className="text-sm text-slate-500">Wilayah Aktif</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">{totalMembers.toLocaleString()}</div>
                <div className="text-sm text-slate-500">Total Member</div>
              </div>
            </div>
          </CardContent>
        </Card>
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
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">{totalEvents}</div>
                <div className="text-sm text-slate-500">Total Event</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Distribution */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-500" />
              Distribusi Member per Regional
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={regionalPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="#94A3B8" />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={90} stroke="#94A3B8" />
                <Tooltip />
                <Bar dataKey="members" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Growth Trend */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              Trend Pertumbuhan Top 3 Regional
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94A3B8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" />
                <Tooltip />
                <Line type="monotone" dataKey="surabaya" stroke="#3B82F6" strokeWidth={2} name="Surabaya" />
                <Line type="monotone" dataKey="malang" stroke="#10B981" strokeWidth={2} name="Malang" />
                <Line type="monotone" dataKey="jember" stroke="#8B5CF6" strokeWidth={2} name="Jember" />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-xs text-slate-600">Surabaya</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-600">Malang</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-xs text-slate-600">Jember</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regional Performance Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Performa Regional</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Regional</TableHead>
                  <TableHead className="text-right">Members</TableHead>
                  <TableHead className="text-right">Pesantren</TableHead>
                  <TableHead className="text-right">Events</TableHead>
                  <TableHead className="text-right">Growth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {regionalPerformance.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-right">{item.members.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{item.pesantren}</TableCell>
                    <TableCell className="text-right">{item.events}</TableCell>
                    <TableCell className="text-right">
                      <span className={`inline-flex items-center gap-1 ${item.growth >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                        {item.growth >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {Math.abs(item.growth)}%
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Events */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-600" />
            Event Regional Terbaru
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">{event.name}</p>
                    <p className="text-sm text-slate-500">{event.regional} • {event.participants} peserta</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={event.status === 'upcoming' ? 'default' : 'secondary'} className={
                    event.status === 'upcoming' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' : 'bg-slate-100 text-slate-600'
                  }>
                    {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                  </Badge>
                  <p className="text-xs text-slate-400 mt-1">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegionalLevel;
