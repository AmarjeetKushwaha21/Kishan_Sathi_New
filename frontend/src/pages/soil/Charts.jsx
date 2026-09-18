import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import PageTransition from '@/components/ui/PageTransition';
import ChartCard from '@/components/ui/ChartCard';
import SoilHeader from '@/components/soil/SoilHeader';
import { useSoilTest } from '@/context/SoilTestContext';

const TOOLTIP_STYLE = {
  borderRadius: 12,
  border: '1px solid #e0f2fe',
  fontSize: 12,
  boxShadow: '0 6px 24px -6px rgba(14, 165, 233, 0.18)',
};

export default function Charts() {
  const { latestReport: report, reports } = useSoilTest();

  const npkData = [
    { name: 'Nitrogen', value: report.nitrogen.value, fill: '#16a34a' },
    { name: 'Phosphorus', value: report.phosphorus.value, fill: '#f59e0b' },
    { name: 'Potassium', value: report.potassium.value, fill: '#6366f1' },
  ];

  const microData = report.micronutrients.map((m) => ({ name: m.name.split(' (')[0], value: m.value }));

  const history = [...reports].reverse();
  const scoreData = history.map((r) => ({ date: r.testedAt, score: r.score }));
  const ocData = history.map((r) => ({ date: r.testedAt, oc: r.organicCarbon }));
  const phData = history.map((r) => ({ date: r.testedAt, ph: r.ph }));

  return (
    <PageTransition>
      <SoilHeader title="Soil Charts" subtitle="Visual trends across tests and nutrients" showBack />

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Macro nutrients" subtitle="Latest test — kg/ha (N, P, K)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={npkData} margin={{ top: 8, right: 8, bottom: 0, left: -14 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value) => [`${value} kg/ha`, 'Level']} cursor={{ fill: 'rgba(22, 163, 74, 0.06)' }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={60}>
                {npkData.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Micronutrients" subtitle="Latest test — mg/kg (Zn, Fe, Mn, Cu, B)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={microData} margin={{ top: 8, right: 8, bottom: 0, left: -14 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value) => [`${value} mg/kg`, 'Level']} cursor={{ fill: 'rgba(14, 165, 233, 0.06)' }} />
              <Bar dataKey="value" fill="#0ea5e9" radius={[6, 6, 0, 0]} maxBarSize={44} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Soil health score trend" subtitle="Overall health over your recent tests">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={scoreData} margin={{ top: 8, right: 8, bottom: 0, left: -14 }}>
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#16a34a" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#16a34a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} domain={[50, 100]} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value) => [`${value}`, 'Score']} />
              <Area type="monotone" dataKey="score" stroke="#16a34a" strokeWidth={3} fill="url(#scoreGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Organic carbon trend" subtitle="Percent organic carbon across tests">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ocData} margin={{ top: 8, right: 8, bottom: 0, left: -14 }}>
              <defs>
                <linearGradient id="ocGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} domain={[0.5, 0.9]} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value) => [`${value}%`, 'Organic carbon']} />
              <Area type="monotone" dataKey="oc" stroke="#f59e0b" strokeWidth={3} fill="url(#ocGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="pH trend" subtitle="Soil pH movement over recent tests">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={phData} margin={{ top: 8, right: 8, bottom: 0, left: -14 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} domain={[6, 7.5]} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value) => [`${value} pH`, 'pH']} />
              <Line type="monotone" dataKey="ph" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4, fill: '#0ea5e9' }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </PageTransition>
  );
}