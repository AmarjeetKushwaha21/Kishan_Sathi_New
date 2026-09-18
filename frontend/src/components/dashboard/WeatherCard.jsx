import { FiDroplet, FiMapPin, FiNavigation, FiRefreshCw, FiThermometer, FiUmbrella, FiWind } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import { weatherIcon } from './dashboardIcons';
import { useWeather } from '@/context/WeatherContext';
import { cn } from '@/utils/cn';

export default function WeatherCard() {
  const {
    current,
    weekly,
    activeLocation,
    convert,
    unitSymbol,
    loading,
    isLocating,
    isLiveLocation,
    refreshWeather,
    detectCurrentLocation,
  } = useWeather();

  const CurrentIcon = weatherIcon(current?.conditionKey || 'partly-cloudy');

  const details = [
    { key: 'humidity', label: 'Humidity', value: `${current?.humidity ?? 65}%`, icon: FiDroplet },
    { key: 'wind', label: 'Wind', value: `${current?.windSpeed ?? 12} km/h ${current?.windDir ?? 'NW'}`, icon: FiWind },
    { key: 'rain', label: 'Rain chance', value: `${current?.rainProbability ?? 10}%`, icon: FiUmbrella },
    { key: 'uv', label: 'UV Index', value: `${current?.uvIndex ?? 6} (${current?.uvCategory ?? 'Mod'})`, icon: FiThermometer },
  ];

  // 5-day forecast slice
  const fiveDayForecast = (weekly || []).slice(0, 5);

  return (
    <Card variant="soft" className="flex h-full flex-col">
      <div className="flex items-center justify-between pb-1">
        <SectionHeader
          title="Weather Today"
          subtitle={
            <span className="inline-flex items-center gap-1 text-xs text-gray-500">
              <FiMapPin className="text-sky-500" aria-hidden="true" />
              <span className="font-semibold text-gray-700">
                {activeLocation?.name || 'Your Location'}
                {activeLocation?.district && activeLocation.district !== activeLocation.name ? `, ${activeLocation.district}` : ''}
              </span>
              {isLiveLocation && (
                <span className="ml-1 rounded-full bg-emerald-100 px-1.5 py-0.2 text-[10px] font-bold text-emerald-700">
                  GPS
                </span>
              )}
            </span>
          }
          to="/dashboard/weather"
          linkLabel="Full forecast"
        />

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={detectCurrentLocation}
            disabled={isLocating}
            title="Detect GPS Location"
            className="rounded-lg p-1 text-gray-400 hover:bg-sky-50 hover:text-sky-600 disabled:opacity-50"
          >
            <FiNavigation className={cn('text-sm', isLocating && 'animate-spin text-sky-600')} />
          </button>
          <button
            type="button"
            onClick={refreshWeather}
            disabled={loading}
            title="Refresh Live Weather"
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
          >
            <FiRefreshCw className={cn('text-sm', loading && 'animate-spin text-primary-600')} />
          </button>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-4">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 text-3xl text-white shadow-soft">
          <CurrentIcon aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="flex items-baseline gap-1">
            <span className="font-display text-4xl font-bold text-gray-900">
              {convert(current?.temp ?? 28)}°
            </span>
            <span className="text-xs font-semibold text-gray-400">{unitSymbol}</span>
            <span className="ml-1 text-sm text-gray-500">feels {convert(current?.feelsLike ?? 30)}°</span>
          </p>
          <p className="text-sm font-medium text-gray-600">{current?.condition || 'Clear Sky'}</p>
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-2.5">
        {details.map(({ key, label, value, icon: Icon }) => (
          <div key={key} className="flex items-center gap-2.5 rounded-xl bg-primary-50/60 p-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-sm text-sky-600 shadow-soft">
              <Icon aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <dt className="truncate text-[10px] font-medium uppercase tracking-wide text-gray-500">{label}</dt>
              <dd className="truncate text-xs font-semibold text-gray-900">{value}</dd>
            </div>
          </div>
        ))}
      </dl>

      <div className="mt-auto pt-4">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">5-day forecast</p>
        <ul className="flex justify-between gap-1 rounded-xl border border-gray-100 p-2">
          {fiveDayForecast.map((day, index) => {
            const DayIcon = weatherIcon(day.conditionKey);
            return (
              <li
                key={day.day + index}
                className={cn(
                  'flex flex-1 flex-col items-center gap-1 rounded-lg px-1 py-2 text-center',
                  index === 0 && 'bg-primary-50'
                )}
              >
                <span className="text-[10px] font-semibold text-gray-500">{day.day}</span>
                <DayIcon className={cn('text-base', index === 0 ? 'text-sky-500' : 'text-gray-400')} aria-hidden="true" />
                <span className="text-xs font-bold text-gray-900">{convert(day.high)}°</span>
                <span className="text-[10px] text-gray-400">{day.rain}%</span>
              </li>
            );
          })}
        </ul>
        <div className="mt-2 flex items-center justify-between text-[10px] text-gray-400">
          <span>Updated {current?.updatedAt || 'Live'}</span>
          <span className="flex items-center gap-1">
            <FiRefreshCw aria-hidden="true" /> Auto-refreshes every 20 min
          </span>
        </div>
      </div>
    </Card>
  );
}