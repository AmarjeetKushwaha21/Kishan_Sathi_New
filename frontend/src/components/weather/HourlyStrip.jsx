import { FiDroplet, FiUmbrella, FiWind } from 'react-icons/fi';

import { weatherIcon } from './weatherIcons';
import { useWeather } from '@/context/WeatherContext';
import { cn } from '@/utils/cn';

export default function HourlyStrip({ hours, highlightNow = false }) {
  const { convert, unitSymbol } = useWeather();

  return (
    <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
      {hours.map((hour, index) => {
        const HourIcon = weatherIcon(hour.conditionKey);
        return (
          <div
            key={`${hour.time}-${index}`}
            className={cn(
              'flex w-[86px] shrink-0 flex-col items-center gap-1.5 rounded-2xl border p-3 text-center transition',
              highlightNow && index === 0
                ? 'border-sky-300 bg-sky-50 shadow-soft'
                : 'border-gray-100 bg-white shadow-soft'
            )}
          >
            <span className="text-[11px] font-semibold text-gray-500">{hour.time}</span>
            <HourIcon
              className={cn('text-xl', highlightNow && index === 0 ? 'text-sky-500' : 'text-gray-400')}
              aria-hidden="true"
            />
            <span className="font-display text-sm font-bold text-gray-900">
              {convert(hour.temp)}°<span className="text-[10px] font-medium text-gray-400">{unitSymbol}</span>
            </span>
            <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-gray-400">
              <FiUmbrella aria-hidden="true" /> {hour.rain}%
            </span>
            <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-gray-400">
              <FiDroplet aria-hidden="true" /> {hour.humidity}%
            </span>
            <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-gray-400">
              <FiWind aria-hidden="true" /> {hour.wind}
            </span>
          </div>
        );
      })}
    </div>
  );
}