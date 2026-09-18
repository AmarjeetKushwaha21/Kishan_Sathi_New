import { FiBarChart2 } from 'react-icons/fi';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import { CHART_CROP_DISTRIBUTION, CHART_PRICE_TREND, CHART_YIELD_COMPARISON } from '@/data/mock/dashboard';

const TOOLTIP_STYLE = {
  borderRadius: 12,
  border: '1px solid #dcfce7',
  fontSize: 12,
  boxShadow: '0 6px 24px -6px rgba(22, 101, 52, 0.18)',
};

function PriceTrendChart() {
  return (
    <Card variant="soft" className="lg:col-span-2">
      <SectionHeader title="Mandi Price Trend" subtitle="Wheat vs Paddy, per quintal (₹)" to="/dashboard/market-prices" />
      <div className="h-64 w-full sm:h-72" role="img" aria-label="Line chart comparing wheat and paddy prices over the last six months">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={CHART_PRICE_TREND} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
            <defs>
              <linearGradient id="wheatGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#16a34a" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#16a34a" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="paddyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}`} />
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value, name) => [`₹${value}`, name]} />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
            <Area type="monotone" dataKey="wheat" name="Wheat" stroke="#16a34a" strokeWidth={3} fill="url(#wheatGradient)" />
            <Area type="monotone" dataKey="paddy" name="Paddy" stroke="#f59e0b" strokeWidth={3} fill="url(#paddyGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function CropDistributionChart() {
  return (
    <Card variant="soft">
      <SectionHeader title="Crop Distribution" subtitle="Share of your farm area" to="/dashboard/crop-planner" />
      <div className="h-64 w-full sm:h-72" role="img" aria-label="Pie chart showing crop distribution across your farm">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={CHART_CROP_DISTRIBUTION}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              stroke="none"
            >
              {CHART_CROP_DISTRIBUTION.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value, name) => [`${value}%`, name]} />
            <Legend wrapperStyle={{ fontSize: 12 }} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function YieldComparisonChart() {
  return (
    <Card variant="soft" className="lg:col-span-3">
      <SectionHeader
        title="Season-wise Yield"
        subtitle="Actual vs target yield (tonnes)"
        icon={FiBarChart2}
        to="/dashboard/field-reports"
        linkLabel="All reports"
      />
      <div className="h-64 w-full sm:h-72" role="img" aria-label="Bar chart comparing actual and target yield across the last four seasons">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={CHART_YIELD_COMPARISON} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="season" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value, name) => [`${value} t`, name]} cursor={{ fill: 'rgba(22, 163, 74, 0.06)' }} />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
            <Bar dataKey="actual" name="Actual" fill="#16a34a" radius={[6, 6, 0, 0]} maxBarSize={36} />
            <Bar dataKey="target" name="Target" fill="#bbf7d0" radius={[6, 6, 0, 0]} maxBarSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default function ChartsSection() {
  return (
    <section aria-labelledby="charts-title" className="grid gap-5 lg:grid-cols-3">
      <PriceTrendChart />
      <CropDistributionChart />
      <YieldComparisonChart />
    </section>
  );
}