import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { FiTruck } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import RecHeader from '@/components/recommendation/RecHeader';
import DemandCard from '@/components/recommendation/DemandCard';
import { useRecommendation } from '@/context/RecommendationContext';
import { formatINR } from '@/utils/format';

const TOOLTIP_STYLE = {
  borderRadius: 12,
  border: '1px solid #dcfce7',
  fontSize: 12,
  boxShadow: '0 6px 24px -6px rgba(22, 101, 52, 0.18)',
};

export default function MarketDemand() {
  const { result } = useRecommendation();
  const crops = result.recommendations;
  const highDemand = crops.filter((c) => c.demandScore >= 9).length;
  const avgPrice = crops.length
    ? Math.round(crops.reduce((s, c) => s + c.pricePerQuintal, 0) / crops.length)
    : 0;

  const chartData = crops.map((c) => ({ name: c.name, price: c.pricePerQuintal }));

  return (
    <PageTransition>
      <RecHeader title="Market Demand" subtitle="Prices, demand and buyer outlook" showBack />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
        <Card variant="soft" className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">High-demand crops</p>
          <p className="mt-1 font-display text-xl font-bold text-primary-700">{highDemand} of {crops.length}</p>
        </Card>
        <Card variant="soft" className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Avg mandi price</p>
          <p className="mt-1 font-display text-xl font-bold text-gray-900">{formatINR(avgPrice)}/qtl</p>
        </Card>
        <Card variant="soft" className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Best priced</p>
          <p className="mt-1 font-display text-xl font-bold text-accent-600">
            {crops.reduce((best, c) => (c.pricePerQuintal > best.pricePerQuintal ? c : best), crops[0]).name}
          </p>
        </Card>
      </div>

      <Card variant="soft" className="mt-6">
        <h3 className="mb-1 px-1 font-display text-base font-semibold text-gray-900">Mandi price comparison</h3>
        <p className="mb-4 px-1 text-xs text-gray-500">Reference price per quintal (₹)</p>
        <div className="h-72 w-full" role="img" aria-label="Bar chart comparing mandi prices per quintal across recommended crops">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}`} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value) => [formatINR(value), 'Price / quintal']} cursor={{ fill: 'rgba(245, 158, 11, 0.08)' }} />
              <Bar dataKey="price" fill="#f59e0b" radius={[6, 6, 0, 0]} maxBarSize={44} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {crops.map((crop, index) => (
          <DemandCard key={crop.key} crop={crop} highlight={index === 0} />
        ))}
      </div>

      <Card variant="tinted" className="mt-6">
        <p className="flex items-start gap-2.5 text-sm leading-relaxed text-gray-600">
          <FiTruck className="mt-0.5 shrink-0 text-primary-600" aria-hidden="true" />
          Demand outlook is based on recent mandi activity and seasonal trends. Prices move with supply —
          check live rates in Market Prices before selling.
        </p>
      </Card>
    </PageTransition>
  );
}