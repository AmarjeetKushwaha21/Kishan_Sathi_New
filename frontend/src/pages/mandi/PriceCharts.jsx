import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import PageTransition from '@/components/ui/PageTransition';
import ChartCard from '@/components/ui/ChartCard';
import MandiHeader from '@/components/mandi/MandiHeader';
import CommodityChips from '@/components/mandi/CommodityChips';
import { useMandiPrice } from '@/context/MandiPriceContext';
import { MANDIS } from '@/data/mock/mandiPrices';
import { cn } from '@/utils/cn';
import { formatINR } from '@/utils/format';

const COLORS = ['#16a34a', '#f59e0b', '#0ea5e9', '#8b5cf6'];

const TOOLTIP_STYLE = {
  borderRadius: 12,
  border: '1px solid #e0f2fe',
  fontSize: 12,
  boxShadow: '0 6px 24px -6px rgba(14, 165, 233, 0.18)',
};

export default function PriceCharts() {
  const { commodities, getMandiHistory, getHistory } = useMandiPrice();
  const [params] = useSearchParams();
  const [selected, setSelected] = useState(() => {
    const fromUrl = params.get('c');
    return commodities.some((c) => c.key === fromUrl) ? fromUrl : commodities[0].key;
  });
  const [mandiIds, setMandiIds] = useState(() => ['m1', 'm2', 'm3']);

  useEffect(() => {
    const fromUrl = params.get('c');
    if (fromUrl && commodities.some((c) => c.key === fromUrl)) setSelected(fromUrl);
  }, [params, commodities]);

  const commodity = commodities.find((c) => c.key === selected);
  const selectedMandis = mandiIds.map((id) => MANDIS.find((m) => m.id === id)).filter(Boolean);

  const lineData = useMemo(() => {
    const mandis = mandiIds.map((id) => MANDIS.find((m) => m.id === id)).filter(Boolean);
    if (mandis.length === 0) return [];
    const base = getHistory(selected);
    return base.map((point, i) => {
      const row = { date: point.date };
      mandis.forEach((m, idx) => {
        row[`price${idx}`] = getMandiHistory(m.id, selected)[i].price;
      });
      return row;
    });
  }, [selected, mandiIds, getHistory, getMandiHistory]);

  const volumeData = useMemo(() => {
    const main = mandiIds.map((id) => MANDIS.find((m) => m.id === id)).find(Boolean) || MANDIS[0];
    return getMandiHistory(main.id, selected).map((p) => ({ date: p.date, volume: p.volume }));
  }, [selected, mandiIds, getMandiHistory]);

  function toggleMandi(id) {
    setMandiIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id].slice(-4)
    );
  }

  return (
    <PageTransition>
      <MandiHeader title="Price Charts" subtitle="Trends for the last 24 weeks" showBack status={commodity.name} />

      <CommodityChips commodities={commodities} selected={selected} onSelect={setSelected} />

      <div className="mt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Compare mandis (max 4)</p>
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {MANDIS.map((m, i) => (
            <button
              key={m.id}
              type="button"
              aria-pressed={mandiIds.includes(m.id)}
              onClick={() => toggleMandi(m.id)}
              className={cn(
                'focus-ring flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition',
                mandiIds.includes(m.id)
                  ? 'border-primary-600 bg-primary-600 text-white shadow-soft'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
              )}
            >
              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} aria-hidden="true" />
              {m.short} · {m.distance} km
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ChartCard
          title="Modal price trend"
          subtitle={`${commodity.name} (${commodity.unit}) — weekly modal rate per mandi`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData} margin={{ top: 8, right: 8, bottom: 0, left: -6 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value, name) => [formatINR(value), name]} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              {selectedMandis.map((m, idx) => (
                <Line
                  key={m.id}
                  type="monotone"
                  dataKey={`price${idx}`}
                  name={m.short}
                  stroke={COLORS[idx % COLORS.length]}
                  strokeWidth={3}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Weekly arrivals"
          subtitle={`${commodity.name} — quantity (qtl) in ${selectedMandis[0]?.short || 'Ludhiana'}`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={volumeData} margin={{ top: 8, right: 8, bottom: 0, left: -14 }}>
              <defs>
                <linearGradient id="volGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#16a34a" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#16a34a" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value) => [`${value} qtl`, 'Arrivals']} cursor={{ fill: 'rgba(22, 163, 74, 0.06)' }} />
              <Bar dataKey="volume" fill="url(#volGradient)" radius={[5, 5, 0, 0]} maxBarSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <p className="mt-6 text-center text-xs text-gray-400">
        Tap a mandi chip to add or remove its line. Data resets every morning at 7 AM.
      </p>
    </PageTransition>
  );
}