import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { FiBarChart2, FiTrendingUp, FiUsers, FiZap } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import StatCard from '@/components/ui/StatCard';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminTabs from '@/components/admin/AdminTabs';
import AdminChartCard from '@/components/admin/AdminChartCard';
import DataTable from '@/components/admin/DataTable';
import { ANALYTICS_CHANNELS, ANALYTICS_REGIONS, ANALYTICS_RETENTION, REVENUE_TREND, USER_GROWTH } from '@/data/mock/admin';
import { TOOLTIP_STYLE, AXIS_TICK, GRID_STROKE } from '@/components/admin/chartTheme';
import { formatINR } from '@/utils/format';

export default function AdminAnalytics() {
  const regionColumns = [
    { key: 'region', label: 'Region', render: (r) => <span className="font-bold text-gray-900">{r.region}</span> },
    { key: 'sales', label: 'Sales', render: (r) => <span className="font-semibold text-gray-700">{formatINR(r.sales)}</span> },
    { key: 'orders', label: 'Orders', className: 'text-gray-500' },
    { key: 'share', label: 'Share', render: (r) => (
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-100">
          <div className="h-full rounded-full bg-primary-500" style={{ width: `${r.share}%` }} aria-hidden="true" />
        </div>
        <span className="text-xs font-semibold text-gray-600">{r.share}%</span>
      </div>
    ) },
  ];

  return (
    <PageTransition>
      <AdminHeader title="Analytics" subtitle="Growth, retention and acquisition insights" showBack status="Live" />
      <AdminTabs />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={FiTrendingUp} label="Revenue growth" value="+14.2%" trend="vs last year" color="primary" />
        <StatCard icon={FiUsers} label="User growth" value="+29%" trend="vs last quarter" color="sky" />
        <StatCard icon={FiZap} label="Retention (W8)" value="50%" trend="-2pts WoW" trendDirection="down" color="accent" />
        <StatCard icon={FiBarChart2} label="Avg order value" value="₹229" trend="+5.5%" color="violet" />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <AdminChartCard title="Revenue trend" subtitle="Monthly, last 12 months">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={REVENUE_TREND} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                <XAxis dataKey="month" tick={AXIS_TICK} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => `₹${Math.round(v / 1000)}k`} tick={AXIS_TICK} axisLine={false} tickLine={false} width={52} />
                <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => formatINR(v)} labelStyle={{ fontWeight: 700, color: '#111827' }} />
                <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </AdminChartCard>

        <AdminChartCard title="User growth" subtitle="Total users vs farmers">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={USER_GROWTH} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                <XAxis dataKey="month" tick={AXIS_TICK} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => `${Math.round(v / 1000)}k`} tick={AXIS_TICK} axisLine={false} tickLine={false} width={44} />
                <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={{ fontWeight: 700, color: '#111827' }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="users" name="Users" fill="#16a34a" radius={[6, 6, 0, 0]} maxBarSize={26} />
                <Bar dataKey="farmers" name="Farmers" fill="#f59e0b" radius={[6, 6, 0, 0]} maxBarSize={26} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AdminChartCard>

        <AdminChartCard title="User retention" subtitle="8-week cohort retention">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ANALYTICS_RETENTION} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                <XAxis dataKey="week" tick={AXIS_TICK} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={AXIS_TICK} axisLine={false} tickLine={false} width={44} />
                <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => `${v}%`} labelStyle={{ fontWeight: 700, color: '#111827' }} />
                <Line type="monotone" dataKey="retention" name="Retention" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </AdminChartCard>

        <AdminChartCard title="Acquisition channels" subtitle="Where new users come from">
          <div className="flex h-60 flex-col items-center justify-center">
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={ANALYTICS_CHANNELS} dataKey="value" nameKey="name" innerRadius={46} outerRadius={76} paddingAngle={3} strokeWidth={0}>
                    {ANALYTICS_CHANNELS.map((c) => (
                      <Cell key={c.name} fill={c.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1.5">
              {ANALYTICS_CHANNELS.map((c) => (
                <p key={c.name} className="flex items-center gap-1.5 text-xs text-gray-600">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c.color }} aria-hidden="true" />
                  {c.name} · {c.value}%
                </p>
              ))}
            </div>
          </div>
        </AdminChartCard>
      </div>

      <h3 className="mb-3 mt-8 text-[11px] font-bold uppercase tracking-wider text-gray-400">Region performance</h3>
      <DataTable columns={regionColumns} rows={ANALYTICS_REGIONS} />
    </PageTransition>
  );
}