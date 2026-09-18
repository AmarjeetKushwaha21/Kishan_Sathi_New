import { FiAlertTriangle, FiCheckCircle, FiCloudRain, FiDroplet, FiMapPin } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import Timeline from '@/components/marketplace/Timeline';
import { useWeather } from '@/context/WeatherContext';
import { cn } from '@/utils/cn';

export function RainStatTile({ icon: Icon, label, value, sub, color = 'sky' }) {
  const colorMap = {
    sky: 'bg-sky-50 text-sky-600',
    primary: 'bg-primary-50 text-primary-600',
    accent: 'bg-accent-50 text-accent-600',
    rose: 'bg-rose-50 text-rose-500',
  };
  return (
    <Card variant="soft" className="flex items-center gap-4 p-4 sm:p-5">
      <span className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl', colorMap[color])}>
        <Icon aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</p>
        <p className="font-display text-xl font-bold text-gray-900">{value}</p>
        {sub && <p className="mt-0.5 text-xs text-gray-400">{sub}</p>}
      </div>
    </Card>
  );
}

export function SoilMoistureCard() {
  const { rain } = useWeather();
  const { soil } = rain;

  return (
    <Card variant="tinted">
      <h3 className="flex items-center gap-2 font-display text-base font-semibold text-gray-900">
        <FiDroplet className="text-sky-500" aria-hidden="true" /> Soil moisture
      </h3>
      <div className="mt-4 flex items-end justify-between">
        <p className="font-display text-4xl font-bold text-gray-900">{soil.moisture}%</p>
        <p className="text-xs text-gray-500">Capacity {soil.capacity}% · {soil.trend}</p>
      </div>
      <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-400 to-sky-600 transition-all"
          style={{ width: `${Math.min(100, (soil.moisture / soil.fieldCapacity) * 100)}%` }}
        />
      </div>
      <p className="mt-2 text-[11px] text-gray-400">
        Field capacity {soil.fieldCapacity}% · last rain {soil.lastRain}
      </p>
    </Card>
  );
}

export function RainWindows() {
  const { rain } = useWeather();

  const timeline = rain.windows.map((window) => ({
    id: window.time,
    title: window.title,
    description: `${window.time} · ${window.probability}% probability`,
    date: null,
    status: window.probability >= 75 ? 'current' : window.probability >= 50 ? 'upcoming' : 'upcoming',
  }));

  return (
    <Card variant="soft">
      <Timeline title="Rainfall windows" items={timeline} />
    </Card>
  );
}

const INSIGHT_STYLES = {
  good: { icon: FiCheckCircle, chip: 'bg-primary-50 text-primary-700', label: 'Good news' },
  caution: { icon: FiMapPin, chip: 'bg-accent-50 text-accent-700', label: 'Caution' },
  warning: { icon: FiAlertTriangle, chip: 'bg-red-50 text-red-600', label: 'Heads up' },
};

export function RainInsights() {
  const { rain } = useWeather();

  return (
    <Card variant="soft">
      <h3 className="mb-4 flex items-center gap-2 font-display text-base font-semibold text-gray-900">
        <FiCloudRain className="text-sky-500" aria-hidden="true" /> Farm-ready insights
      </h3>
      <ul className="space-y-3">
        {rain.insights.map((insight) => {
          const style = INSIGHT_STYLES[insight.type] || INSIGHT_STYLES.caution;
          const Icon = style.icon;
          return (
            <li key={insight.text} className="flex items-start gap-3">
              <span className={cn('mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm', style.chip)}>
                <Icon aria-hidden="true" />
              </span>
              <p className="text-sm leading-relaxed text-gray-600">{insight.text}</p>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}