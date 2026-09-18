import { useMemo } from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { FiDollarSign, FiShoppingCart, FiUsers, FiZap } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import StatCard from '@/components/ui/StatCard';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminTabs from '@/components/admin/AdminTabs';
import AdminChartCard from '@/components/admin/AdminChartCard';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import { useAdmin } from '@/context/AdminContext';
import { ANALYTICS_REGIONS, CATEGORY_SPLIT, REVENUE_TREND, WEEKLY_ORDERS } from '@/data/mock/admin';
import { TOOLTIP_STYLE, AXIS_TICK, GRID_STROKE } from '@/components/admin/chartTheme';
import { formatINR } from '@/utils/format';

export default function AdminDashboard() {
  const { orders } = useAdmin();

  const totals = useMemo(() => {
    const revenue = REVENUE_TREND.reduce((s, m) => s + m.revenue, 0);
    const orderCount = REVENUE_TREND.reduce((s, m) => s + m.orders, 0);
    const last = REVENUE_TREND[REVENUE_TREND.length - 1];
    return {
      revenue,
      orderCount,
      monthOrders: last.orders,
      avgOrder: Math.round(last.revenue / last.orders),
    };
  }, []);

  const statProps = [
    { icon: FiDollarSign, label: 'Total revenue', value: formatINR(totals.revenue), trend: '+14.2%', color: 'primary' },
    { icon: FiShoppingCart, label: 'Orders (Aug)', value: totals.monthOrders.toLocaleString('en-IN'), trend: '+8.2%', color: 'accent' },
    { icon: FiUsers, label: 'Total orders', value: totals.orderCount.toLocaleString('en-IN'), trend: '+11.0%', color: 'sky' },
    { icon: FiZap, label: 'Avg order value', value: formatINR(totals.avgOrder), trend: '+5.5%', color: 'violet' },
  ];

  const orderColumns = [
    { key: 'id', label: 'Order' },
    { key: 'customer', label: 'Customer' },
    { key: 'amount', label: 'Amount', render: (r) => <span className="font-bold text-gray-900">{formatINR(r.amount)}</span> },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'date', label: 'Date', className: 'text-gray-500' },
  ];

  return (
    <PageTransition>
      <AdminHeader title="Admin Dashboard" subtitle="Platform overview · August 2026" status="Live" />
      <AdminTabs />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statProps.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <AdminChartCard title="Revenue trend" subtitle="Monthly revenue, last 12 months" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_TREND} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="adminRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                <XAxis dataKey="month" tick={AXIS_TICK} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => `₹${Math.round(v / 1000)}k`} tick={AXIS_TICK} axisLine={false} tickLine={false} width={52} />
                <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => formatINR(v)} labelStyle={{ fontWeight: 700, color: '#111827' }} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#16a34a" strokeWidth={2} fill="url(#adminRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </AdminChartCard>

        <AdminChartCard title="Category split" subtitle="Sales by category">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={CATEGORY_SPLIT} dataKey="value" nameKey="name" innerRadius={52} outerRadius={82} paddingAngle={3} strokeWidth={0}>
                  {CATEGORY_SPLIT.map((c) => (
                    <Cell key={c.name} fill={c.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => `${v} sales`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {CATEGORY_SPLIT.map((c) => (
              <p key={c.name} className="flex items-center gap-1.5 text-xs text-gray-600">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c.color }} aria-hidden="true" />
                {c.name}
              </p>
            ))}
          </div>
        </AdminChartCard>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <AdminChartCard title="Orders this week" subtitle="Daily order volume" className="lg:col-span-2">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_ORDERS} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                <XAxis dataKey="day" tick={AXIS_TICK} axisLine={false} tickLine={false} />
                <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} width={40} />
                <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={{ fontWeight: 700, color: '#111827' }} />
                <Bar dataKey="orders" name="Orders" fill="#16a34a" radius={[6, 6, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AdminChartCard>

        <AdminChartCard title="Top regions" subtitle="Sales share by mandi region">
          <div className="space-y-3">
            {ANALYTICS_REGIONS.map((r) => (
              <div key={r.region}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-700">{r.region}</span>
                  <span className="text-gray-400">{r.share}%</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full rounded-full bg-primary-500" style={{ width: `${r.share}%` }} aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </AdminChartCard>
      </div>

      <h3 className="mb-3 mt-8 text-[11px] font-bold uppercase tracking-wider text-gray-400">Recent orders</h3>
      <DataTable
        columns={orderColumns}
        rows={orders.slice(0, 5)}
        actions={(row) => <span className="text-[11px] font-semibold text-gray-400">{row.payment}</span>}
      />
    </PageTransition>
  );
}