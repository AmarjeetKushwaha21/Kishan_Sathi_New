import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { FiAward, FiFilter } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ChartCard from '@/components/ui/ChartCard';
import MandiHeader from '@/components/mandi/MandiHeader';
import TrendBadge from '@/components/mandi/TrendBadge';
import { useMandiPrice } from '@/context/MandiPriceContext';
import { buildTodayPrices } from '@/data/mock/mandiPrices';
import { formatINR } from '@/utils/format';
import { cn } from '@/utils/cn';

const COLORS = ['#16a34a', '#f59e0b', '#0ea5e9', '#8b5cf6'];

const TOOLTIP_STYLE = {
  borderRadius: 12,
  border: '1px solid #e0f2fe',
  fontSize: 12,
  boxShadow: '0 6px 24px -6px rgba(14, 165, 233, 0.18)',
};

export default function Comparison() {
  const { commodities, compare, toggleCompare, selectedMandi, getHistory } = useMandiPrice();

  const allToday = useMemo(() => buildTodayPrices(), []);
  const rows = useMemo(
    () => allToday.filter((r) => r.mandiId === selectedMandi.id && compare.includes(r.commodityKey)),
    [allToday, selectedMandi.id, compare]
  );

  const chartData = rows.map((r) => ({ name: r.commodity, modal: r.modal, min: r.min, max: r.max, changePct: r.changePct }));

  const historyData = useMemo(() => {
    if (compare.length === 0) return [];
    const base = getHistory(compare[0]);
    return base.map((point, i) => {
      const row = { date: point.date };
      compare.forEach((key, idx) => {
        row[`p${idx}`] = getHistory(key)[i].price;
      });
      return row;
    });
  }, [compare, getHistory]);

  const bestValue = rows.length
    ? rows.reduce((max, r) => (r.changePct > max.changePct ? r : max), rows[0])
    : null;

  const compareCommodities = commodities.filter((c) => compare.includes(c.key));

  return (
    <PageTransition>
      <MandiHeader
        title="Compare Prices"
        subtitle={`Commodities at ${selectedMandi.short} mandi · today`}
        showBack
        status={`${compare.length}/4 selected`}
      />

      <Card variant="soft" className="p-4">
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
          <FiFilter aria-hidden="true" /> Pick up to 4 commodities
        </p>
        <div className="flex flex-wrap gap-2">
          {commodities.map((c) => (
            <button
              key={c.key}
              type="button"
              aria-pressed={compare.includes(c.key)}
              onClick={() => toggleCompare(c.key)}
              className={cn(
                'focus-ring flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition',
                compare.includes(c.key)
                  ? 'border-primary-600 bg-primary-600 text-white shadow-soft'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
              )}
            >
              <span aria-hidden="true">{c.emoji}</span> {c.name}
            </button>
          ))}
        </div>
      </Card>

      {rows.length === 0 ? (
        <Card variant="soft" className="mt-6 p-8 text-center">
          <p className="text-sm text-gray-500">Select at least one commodity above to start comparing.</p>
        </Card>
      ) : (
        <>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <ChartCard title="Modal price comparison" subtitle={`Today's modal rate (${selectedMandi.short})`}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: -6 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value) => [formatINR(value), 'Modal price']} cursor={{ fill: 'rgba(22, 163, 74, 0.06)' }} />
                  <Bar dataKey="modal" radius={[6, 6, 0, 0]} maxBarSize={56}>
                    {chartData.map((row, idx) => (
                      <Cell key={row.name} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Historical trend" subtitle="24-week modal price for selected commodities">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historyData} margin={{ top: 8, right: 8, bottom: 0, left: -6 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value, name) => [formatINR(value), name]} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  {compareCommodities.map((c, idx) => (
                    <Line
                      key={c.key}
                      type="monotone"
                      dataKey={`p${idx}`}
                      name={c.name}
                      stroke={COLORS[idx % COLORS.length]}
                      strokeWidth={3}
                      dot={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <Card variant="soft" className="mt-6 overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <caption className="sr-only">Mandi price comparison across commodities</caption>
                <thead>
                  <tr className="border-b border-gray-200 bg-primary-50/50 text-left text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                    <th scope="col" className="px-4 py-3">Commodity</th>
                    <th scope="col" className="px-4 py-3 text-right">Min</th>
                    <th scope="col" className="px-4 py-3 text-right">Modal</th>
                    <th scope="col" className="px-4 py-3 text-right">Max</th>
                    <th scope="col" className="px-4 py-3 text-right">Change</th>
                    <th scope="col" className="px-4 py-3 text-right">Pick</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, idx) => (
                    <tr key={row.id} className="border-b border-gray-100 last:border-0">
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-2 font-semibold text-gray-800">
                          <span aria-hidden="true">{row.emoji}</span> {row.commodity}
                          <span className="text-xs font-normal text-gray-400">{row.unit}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-gray-500">{formatINR(row.min)}</td>
                      <td className="px-4 py-3 text-right font-bold text-gray-900">{formatINR(row.modal)}</td>
                      <td className="px-4 py-3 text-right text-gray-500">{formatINR(row.max)}</td>
                      <td className="px-4 py-3 text-right"><TrendBadge changePct={row.changePct} /></td>
                      <td className="px-4 py-3 text-right">
                        {bestValue && row.id === bestValue.id ? (
                          <Badge variant="outline" size="sm" className="gap-1">
                            <FiAward aria-hidden="true" /> Best pick
                          </Badge>
                        ) : (
                          <span className="text-[11px] text-gray-400">{COLORS[idx % COLORS.length]}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {bestValue && (
              <p className="border-t border-gray-100 bg-accent-50/50 px-4 py-3 text-xs text-gray-600">
                <strong className="font-bold text-accent-700">Best value:</strong> {bestValue.emoji} {bestValue.commodity} —
                strongest trend today with a {bestValue.changePct >= 0 ? '+' : ''}{(bestValue.changePct * 100).toFixed(1)}% move.
              </p>
            )}
          </Card>
        </>
      )}
    </PageTransition>
  );
}