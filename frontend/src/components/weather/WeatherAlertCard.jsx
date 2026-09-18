import { FiCheckCircle, FiClock, FiCloudLightning, FiCloudRain, FiDroplet, FiMapPin, FiSun, FiThermometer, FiWind } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { cn } from '@/utils/cn';

const TYPE_ICON = {
  rain: FiCloudRain,
  storm: FiCloudLightning,
  humidity: FiDroplet,
  wind: FiWind,
  uv: FiSun,
  heat: FiThermometer,
  fog: FiCloudRain,
};

const SEVERITY_STYLES = {
  warning: {
    badge: 'danger',
    bar: 'bg-red-500',
    ring: 'border-red-100',
    chip: 'bg-red-50 text-red-600',
  },
  advisory: {
    badge: 'accent',
    bar: 'bg-accent-500',
    ring: 'border-accent-100',
    chip: 'bg-accent-50 text-accent-700',
  },
  info: {
    badge: 'primary',
    bar: 'bg-sky-500',
    ring: 'border-sky-100',
    chip: 'bg-sky-50 text-sky-600',
  },
};

export default function WeatherAlertCard({ alert, detailed = false }) {
  const Icon = TYPE_ICON[alert.type] || FiCloudRain;
  const style = SEVERITY_STYLES[alert.severity] || SEVERITY_STYLES.info;

  return (
    <Card variant="soft" className={cn('relative overflow-hidden', style.ring)}>
      <span aria-hidden="true" className={cn('absolute inset-y-0 left-0 w-1.5', style.bar)} />
      <div className="flex items-start gap-3 pl-1.5">
        <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg', style.chip)}>
          <Icon aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-base font-bold text-gray-900">{alert.title}</h3>
            <Badge variant={style.badge} size="sm">{alert.severity}</Badge>
          </div>
          <p className={cn('mt-1 text-sm leading-relaxed text-gray-600', !detailed && 'line-clamp-2')}>{alert.description}</p>

          <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-gray-400">
            <span className="inline-flex items-center gap-1"><FiClock aria-hidden="true" /> {alert.validFrom} → {alert.validTo}</span>
            <span className="inline-flex items-center gap-1"><FiMapPin aria-hidden="true" /> {alert.district}</span>
            <span className="inline-flex items-center gap-1">{alert.source} · issued {alert.issuedAt}</span>
          </p>

          {detailed && alert.actions?.length > 0 && (
            <ul className="mt-3 space-y-1.5 rounded-xl bg-primary-50/60 p-3">
              {alert.actions.map((action) => (
                <li key={action} className="flex items-start gap-2 text-sm text-gray-700">
                  <FiCheckCircle className="mt-0.5 shrink-0 text-primary-600" aria-hidden="true" />
                  {action}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Card>
  );
}