import { FiRefreshCw, FiSunrise, FiSunset, FiUmbrella } from 'react-icons/fi';

import Badge from '@/components/ui/Badge';
import { weatherIcon } from './weatherIcons';
import { useWeather } from '@/context/WeatherContext';

export default function CurrentWeatherHero() {
  const { current, convert, unitSymbol, activeLocation } = useWeather();
  const CurrentIcon = weatherIcon(current.conditionKey);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-sky-600 to-primary-700 p-6 text-white shadow-soft sm:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-accent-300/20 blur-2xl"
      />

      <div className="relative">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-sky-100">
              {activeLocation.name} · {activeLocation.district}
            </p>
            <p className="mt-0.5 text-xs text-sky-200">
              Updated {current.updatedAt} · {current.station}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="accent">{current.uvCategory} UV {current.uvIndex}</Badge>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
              <FiUmbrella aria-hidden="true" /> {current.rainProbability}% rain
            </span>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-5">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white/15 text-5xl shadow-inner">
            <CurrentIcon aria-hidden="true" />
          </span>
          <div>
            <p className="flex items-baseline gap-2">
              <span className="font-display text-6xl font-bold leading-none sm:text-7xl">
                {convert(current.temp)}°
              </span>
              <span className="text-lg font-semibold text-sky-100">{unitSymbol}</span>
            </p>
            <p className="mt-1 text-lg font-medium">{current.condition}</p>
            <p className="text-sm text-sky-100">
              H {convert(current.high)}° · L {convert(current.low)}° · feels like {convert(current.feelsLike)}°
            </p>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-sky-100">Humidity</dt>
            <dd className="font-display text-lg font-bold">{current.humidity}%</dd>
          </div>
          <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-sky-100">Wind</dt>
            <dd className="font-display text-lg font-bold">{current.windSpeed} <span className="text-xs font-medium">km/h</span></dd>
            <dd className="text-[11px] text-sky-100">{current.windDir} · gust {current.windGust} km/h</dd>
          </div>
          <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
            <dt className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-sky-100">
              <FiSunrise aria-hidden="true" /> Sunrise
            </dt>
            <dd className="font-display text-lg font-bold">{current.sunrise}</dd>
          </div>
          <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
            <dt className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-sky-100">
              <FiSunset aria-hidden="true" /> Sunset
            </dt>
            <dd className="font-display text-lg font-bold">{current.sunset}</dd>
          </div>
        </dl>

        <p className="mt-4 flex items-center gap-1.5 text-[11px] text-sky-200">
          <FiRefreshCw aria-hidden="true" /> Auto-refreshes every 30 minutes
        </p>
      </div>
    </div>
  );
}