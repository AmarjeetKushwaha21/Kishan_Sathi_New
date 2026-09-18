import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { FiAward, FiCalendar, FiDollarSign, FiTrendingUp } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import StatCard from '@/components/ui/StatCard';
import FarmerHeader from '@/components/farmer/FarmerHeader';
import SectionCard from '@/components/farmer/SectionCard';
import { useFarmer } from '@/context/FarmerContext';
import { formatINR } from '@/utils/format';

const TOOLTIP_STYLE = {
  borderRadius: '12px',
  border: '1px solid #dcfce7',
  boxShadow: '0 6px 24px -6px rgba(22, 101, 52, 0.18)',
  fontSize: '12px',
};

export default function CropHistory() {
  const { crops } = useFarmer();

  const chartData = useMemo(() => {
    const bySeason = {};
    crops.forEach((c) => {
      bySeason[c.season] = bySeason[c.season] || { season: c.season, profit: 0, revenue: 0 };
      bySeason[c.season].profit += c.profit;
      bySeason[c.season].revenue += c.revenue;
    });
    return Object.values(bySeason).map((s) => ({ ...s, label: s.season.replace(' 2025-26', '').replace(' 2025', '').replace(' 2024-25', '') }));
  }, [crops]);

  const totals = useMemo(
    () => ({
      revenue: crops.reduce((s, c) => s + c.revenue, 0),
      profit: crops.reduce((s, c) => s + c.profit, 0),
      seasons: new Set(crops.map((c) => c.season)).size,
      top: [...crops].sort((a, b) => b.profit - a.profit)[0],
    }),
    [crops]
  );

  return (
    <PageTransition>
      <FarmerHeader title="Crop History" subtitle={`${totals.seasons} seasons · ${crops.length} harvests`} showBack />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={FiDollarSign} label="Total revenue" value={formatINR(totals.revenue)} color="primary" />
        <StatCard icon={FiTrendingUp} label="Total profit" value={formatINR(totals.profit)} color="accent" />
        <StatCard icon={FiCalendar} label="Seasons" value={`${totals.seasons}`} color="sky" />
        <StatCard icon={FiAward} label="Top crop" value={totals.top.crop} color="violet" />
      </div>

      <SectionCard title="Profit by season" icon={FiTrendingUp} className="mt-5">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="profitFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `₹${Math.round(v / 1000)}k`} tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={56} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => formatINR(v)} labelStyle={{ fontWeight: 700, color: '#111827' }} />
              <Bar dataKey="profit" name="Profit" fill="url(#profitFill)" radius={[8, 8, 0, 0]} maxBarSize={56}>
                {chartData.map((entry, i) => (
                  <Cell key={entry.season} fill={i === chartData.length - 1 ? '#d97706' : undefined} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      <h3 className="mb-3 mt-8 text-[11px] font-bold uppercase tracking-wider text-gray-400">Harvest records</h3>
      <div className="space-y-4">
        {crops.map((c) => (
          <Card key={c.id} variant="soft" className="p-4 sm:p-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary" size="sm">{c.season}</Badge>
              <h4 className="font-display text-base font-bold text-gray-900">{c.crop}</h4>
              <span className="ml-auto text-xs text-gray-400">{c.area} acres</span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 rounded-xl bg-white p-3 text-xs shadow-soft sm:grid-cols-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Yield</p>
                <p className="mt-0.5 text-sm font-bold text-gray-900">{c.yield}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Price</p>
                <p className="mt-0.5 text-sm font-bold text-gray-900">{c.price}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Revenue</p>
                <p className="mt-0.5 text-sm font-bold text-gray-900">{formatINR(c.revenue)}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Profit</p>
                <p className="mt-0.5 text-sm font-bold text-primary-700">{formatINR(c.profit)}</p>
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-500">{c.notes}</p>
          </Card>
        ))}
      </div>
    </PageTransition>
  );
}