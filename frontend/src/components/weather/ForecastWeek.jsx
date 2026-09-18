import { FiDroplet, FiSun, FiUmbrella, FiWind } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { weatherIcon } from './weatherIcons';
import { useWeather } from '@/context/WeatherContext';
import { cn } from '@/utils/cn';

function UVBadge({ uvIndex }) {
  const tone =
    uvIndex >= 8 ? 'danger' : uvIndex >= 6 ? 'accent' : uvIndex >= 3 ? 'primary' : 'default';
  return <Badge variant={tone}>{uvIndex} UV</Badge>;
}

export function ForecastDayCard({ day }) {
  const { convert, unitSymbol } = useWeather();
  const DayIcon = weatherIcon(day.conditionKey);

  return (
    <Card variant="soft" className="flex flex-wrap items-center gap-4">
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-2xl text-sky-500">
        <DayIcon aria-hidden="true" />
      </span>

      <div className="min-w-[120px] flex-1">
        <p className="font-display text-base font-bold text-gray-900">{day.day}</p>
        <p className="text-xs text-gray-500">{day.date}</p>
        <p className="mt-0.5 text-sm text-gray-600">{day.condition}</p>
      </div>

      <div className="text-right">
        <p className="font-display text-lg font-bold text-gray-900">{convert(day.high)}°</p>
        <p className="text-xs text-gray-400">{convert(day.low)}°{unitSymbol}</p>
      </div>

      <dl className="grid grid-cols-3 gap-2">
        <div className="flex items-center gap-1.5 rounded-xl bg-primary-50/60 px-2.5 py-1.5">
          <FiUmbrella className="text-sky-500" aria-hidden="true" />
          <div><dt className="sr-only">Rain chance</dt><dd className="text-xs font-semibold text-gray-800">{day.rain}%</dd></div>
        </div>
        <div className="flex items-center gap-1.5 rounded-xl bg-primary-50/60 px-2.5 py-1.5">
          <FiDroplet className="text-sky-500" aria-hidden="true" />
          <div><dt className="sr-only">Humidity</dt><dd className="text-xs font-semibold text-gray-800">{day.humidity}%</dd></div>
        </div>
        <div className="flex items-center gap-1.5 rounded-xl bg-primary-50/60 px-2.5 py-1.5">
          <FiWind className="text-sky-500" aria-hidden="true" />
          <div><dt className="sr-only">Wind</dt><dd className="text-xs font-semibold text-gray-800">{day.wind}</dd></div>
        </div>
      </dl>

      <div className="flex items-center gap-2">
        <UVBadge uvIndex={day.uvIndex} />
        <span className="hidden items-center gap-1 text-[11px] text-gray-400 lg:inline-flex">
          <FiSun className="text-accent-500" aria-hidden="true" /> {day.sunrise}
        </span>
      </div>
    </Card>
  );
}

export function WeekAtAGlance({ className }) {
  const { weekly, convert, unitSymbol } = useWeather();

  return (
    <div className={cn('rounded-2xl border border-gray-100 bg-white p-2 shadow-soft', className)}>
      <ul className="flex justify-between gap-1">
        {weekly.map((day, index) => {
          const DayIcon = weatherIcon(day.conditionKey);
          return (
            <li
              key={day.day}
              className={cn(
                'flex flex-1 flex-col items-center gap-1 rounded-xl px-1 py-2.5 text-center',
                index === 0 && 'bg-sky-50'
              )}
            >
              <span className="text-[10px] font-semibold text-gray-500">{day.day}</span>
              <DayIcon className={cn('text-lg', index === 0 ? 'text-sky-500' : 'text-gray-400')} aria-hidden="true" />
              <span className="font-display text-sm font-bold text-gray-900">{convert(day.high)}°</span>
              <span className="text-[10px] text-gray-400">{convert(day.low)}°{unitSymbol}</span>
              <span className="inline-flex items-center gap-0.5 text-[10px] text-gray-400">
                <FiUmbrella aria-hidden="true" /> {day.rain}%
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}