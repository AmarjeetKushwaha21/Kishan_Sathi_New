import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { FiAward, FiCompass, FiFilter, FiTrendingUp } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ChartCard from '@/components/ui/ChartCard';
import MandiHeader from '@/components/mandi/MandiHeader';
import { useMandiPrice, getCropEmoji } from '@/context/MandiPriceContext';
import { fetchMandiComparison } from '@/services/mandiService';
import { formatINR } from '@/utils/format';
import { cn } from '@/utils/cn';

const STATE_COLORS = ['#16a34a', '#0ea5e9', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];

const TOOLTIP_STYLE = {
  borderRadius: 12,
  border: '1px solid #e0f2fe',
  fontSize: 12,
  boxShadow: '0 6px 24px -6px rgba(14, 165, 233, 0.18)',
};

const COMPARE_CROPS = [
  'Wheat',
  'Paddy(Common)',
  'Potato',
  'Onion',
  'Tomato',
  'Mustard',
  'Maize',
  'Cotton',
  'Soyabean',
  'Bengal Gram(Gram)',
  'Garlic',
];

export default function Comparison() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCrop = searchParams.get('c') || 'Wheat';

  const [activeCrop, setActiveCrop] = useState(initialCrop);
  const [comparisonRows, setComparisonRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchMandiComparison(activeCrop)
      .then((data) => {
        if (data.comparison) setComparisonRows(data.comparison);
      })
      .catch((err) => console.warn('Compare fetch error:', err.message))
      .finally(() => setLoading(false));
  }, [activeCrop]);

  const chartData = useMemo(() => {
    return comparisonRows.map((r) => ({
      name: r.state,
      mandi: r.market,
      modal: r.modalPrice,
      min: r.minPrice,
      max: r.maxPrice,
    }));
  }, [comparisonRows]);

  const bestStateRow = comparisonRows.length > 0 ? comparisonRows[0] : null;

  return (
    <PageTransition>
      <MandiHeader
        title="Inter-State Mandi Price Comparison"
        subtitle={`Live comparison of ${activeCrop} rates across major agricultural states`}
        showBack
        status="Govt Agmarknet"
      />

      {/* Crop Selector Card */}
      <Card variant="soft" className="p-4 sm:p-5">
        <p className="mb-2.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
          <FiFilter aria-hidden="true" /> Select Crop to Compare Across States
        </p>
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {COMPARE_CROPS.map((crop) => (
            <button
              key={crop}
              type="button"
              aria-pressed={activeCrop === crop}
              onClick={() => {
                setActiveCrop(crop);
                setSearchParams({ c: crop });
              }}
              className={cn(
                'focus-ring flex shrink-0 items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition',
                activeCrop === crop
                  ? 'border-primary-600 bg-primary-600 text-white shadow-soft'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300'
              )}
            >
              <span>{getCropEmoji(crop)}</span> {crop}
            </button>
          ))}
        </div>
      </Card>

      {loading ? (
        <div className="mt-12 flex flex-col items-center justify-center py-10 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-3 border-primary-600 border-t-transparent" />
          <p className="mt-3 text-xs font-medium text-gray-500">Comparing state mandis for {activeCrop}...</p>
        </div>
      ) : (
        <>
          {/* Highest Paying State Banner */}
          {bestStateRow && (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-primary-50 p-4 sm:p-5">
              <div className="flex items-center gap-3.5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-2xl text-white shadow-soft">
                  <FiAward />
                </span>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                    Highest Paying Market for {activeCrop}
                  </span>
                  <p className="font-display text-lg font-bold text-gray-900 sm:text-xl">
                    {bestStateRow.state} · <span className="text-primary-700">{bestStateRow.market}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Prevailing rate: <strong className="text-emerald-700">{formatINR(bestStateRow.modalPrice)} / quintal</strong>
                  </p>
                </div>
              </div>
              <Badge variant="success" size="md" className="gap-1.5 font-bold">
                <FiTrendingUp /> Top Mandi Rate
              </Badge>
            </div>
          )}

          {/* Chart & Table Comparison */}
          <div className="mt-6 grid gap-6 lg:grid-cols-12">
            {/* Chart */}
            <div className="lg:col-span-6">
              <ChartCard
                title={`State-wise Rates (${activeCrop})`}
                subtitle="Today's modal price across major state APMCs (₹/quintal)"
              >
                <ResponsiveContainer width="100%" height={290}>
                  <BarChart data={chartData} margin={{ top: 12, right: 12, bottom: 20, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 11, fill: '#4b5563', fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: '#6b7280' }}
                      axisLine={false}
                      tickLine={false}
                      domain={['auto', 'auto']}
                      tickFormatter={(v) => `₹${v}`}
                    />
                    <Tooltip
                      contentStyle={TOOLTIP_STYLE}
                      formatter={(value, name, item) => [
                        `${formatINR(value)} /qtl (${item.payload.mandi})`,
                        'Modal Rate',
                      ]}
                      cursor={{ fill: 'rgba(22, 163, 74, 0.06)' }}
                    />
                    <Bar dataKey="modal" radius={[6, 6, 0, 0]} maxBarSize={48}>
                      {chartData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={STATE_COLORS[idx % STATE_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            {/* State Table */}
            <div className="lg:col-span-6">
              <Card variant="soft" className="h-full overflow-hidden p-0">
                <div className="border-b border-gray-100 bg-white/70 px-4 py-3.5">
                  <h3 className="font-display text-sm font-bold text-gray-900">
                    Detailed Multi-State Price Breakdown
                  </h3>
                  <p className="text-xs text-gray-500">Live APMC Mandi Rates reported to Ministry of Agriculture</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[340px] text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 bg-primary-50/40 text-left text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        <th className="px-4 py-2.5">State & Mandi</th>
                        <th className="px-4 py-2.5 text-right">Modal Rate</th>
                        <th className="px-4 py-2.5 text-right">Day's Range</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {comparisonRows.map((r, idx) => (
                        <tr key={r.id || idx} className="hover:bg-primary-50/20">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span
                                className="h-2.5 w-2.5 rounded-full"
                                style={{ backgroundColor: STATE_COLORS[idx % STATE_COLORS.length] }}
                              />
                              <div>
                                <p className="font-bold text-gray-900">{r.state}</p>
                                <p className="text-xs text-gray-500">{r.market}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <p className="font-display text-base font-bold text-gray-900">
                              {formatINR(r.modalPrice)}
                            </p>
                            <span className="text-[10px] font-medium text-gray-400">per quintal</span>
                          </td>
                          <td className="px-4 py-3 text-right text-xs text-gray-500">
                            {formatINR(r.minPrice)} – {formatINR(r.maxPrice)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </div>
        </>
      )}

      <p className="mt-8 text-center text-xs text-gray-400">
        Prices reflect daily wholesale arrivals across APMCs in India. Source: Directorate of Marketing & Inspection, Ministry of Agriculture.
      </p>
    </PageTransition>
  );
}