import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { FiTrendingUp } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import RecHeader from '@/components/recommendation/RecHeader';
import ProfitCard from '@/components/recommendation/ProfitCard';
import { useRecommendation } from '@/context/RecommendationContext';
import { formatINR } from '@/utils/format';

const TOOLTIP_STYLE = {
  borderRadius: 12,
  border: '1px solid #dcfce7',
  fontSize: 12,
  boxShadow: '0 6px 24px -6px rgba(22, 101, 52, 0.18)',
};

export default function ProfitPrediction() {
  const { result } = useRecommendation();
  const crops = result.recommendations;
  const avgProfit = crops.length
    ? Math.round(crops.reduce((s, c) => s + c.profit.profitPerAcre, 0) / crops.length)
    : 0;
  const best = crops[0];

  const chartData = crops.map((c) => ({
    name: c.name,
    profit: c.profit.profitPerAcre,
    margin: c.profit.margin,
  }));

  return (
    <PageTransition>
      <RecHeader title="Profit Prediction" subtitle="Estimated cost, revenue and return per acre" showBack />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <Card variant="soft" className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Avg profit / acre</p>
          <p className="mt-1 font-display text-xl font-bold text-primary-700">{formatINR(avgProfit)}</p>
        </Card>
        <Card variant="soft" className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Best return</p>
          <p className="mt-1 font-display text-xl font-bold text-gray-900">{best ? best.name : '—'}</p>
          <p className="text-xs text-gray-400">{best ? `${best.profit.margin}% ROI` : ''}</p>
        </Card>
        <Card variant="soft" className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Avg ROI</p>
          <p className="mt-1 flex items-center gap-1 font-display text-xl font-bold text-accent-600">
            <FiTrendingUp aria-hidden="true" /> {result.avgMargin}%
          </p>
        </Card>
        <Card variant="soft" className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Top investment</p>
          <p className="mt-1 font-display text-xl font-bold text-gray-900">
            {formatINR(Math.max(...crops.map((c) => c.profit.costPerAcre), 0))}
          </p>
          <p className="text-xs text-gray-400">highest upfront cost</p>
        </Card>
      </div>

      <Card variant="soft" className="mt-6">
        <h3 className="mb-1 px-1 font-display text-base font-semibold text-gray-900">Net profit per acre</h3>
        <p className="mb-4 px-1 text-xs text-gray-500">Projected profit after subtracting estimated input cost</p>
        <div className="h-72 w-full" role="img" aria-label="Bar chart of projected net profit per acre for each recommended crop">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value) => [formatINR(value), 'Profit / acre']} cursor={{ fill: 'rgba(22, 163, 74, 0.06)' }} />
              <Bar dataKey="profit" fill="#16a34a" radius={[6, 6, 0, 0]} maxBarSize={44} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {crops.map((crop, index) => (
          <ProfitCard key={crop.key} crop={crop} highlight={index === 0} />
        ))}
      </div>

      <Card variant="tinted" className="mt-6">
        <h3 className="mb-2 font-display text-base font-semibold text-gray-900">Assumptions</h3>
        <p className="text-xs leading-relaxed text-gray-500">
          Costs and yields use regional averages for a 1-acre plot. Actual returns depend on input prices, weather,
          and mandi rates at harvest. Use these figures for planning, not as guaranteed income.
        </p>
      </Card>
    </PageTransition>
  );
}