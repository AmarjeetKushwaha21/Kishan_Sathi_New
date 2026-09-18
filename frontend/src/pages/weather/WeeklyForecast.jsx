import { FiSunrise, FiSunset } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import WeatherHeader from '@/components/weather/WeatherHeader';
import { ForecastDayCard } from '@/components/weather/ForecastWeek';
import { WeeklyTempChart, WeeklyWindChart, WeeklyUVChart } from '@/components/weather/WeatherChartsSection';
import { useWeather } from '@/context/WeatherContext';

export default function WeeklyForecast() {
  const { weekly } = useWeather();

  return (
    <PageTransition>
      <WeatherHeader title="7 Day Forecast" subtitle="Day by day outlook for your farm" showBack />

      <div className="space-y-3">
        {weekly.map((day) => (
          <ForecastDayCard key={day.day} day={day} />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1 rounded-2xl border border-gray-100 bg-white px-5 py-3 text-xs text-gray-500 shadow-soft">
        <span className="inline-flex items-center gap-1.5 font-semibold text-gray-700">
          <FiSunrise className="text-accent-500" aria-hidden="true" /> Sunrise {weekly[0].sunrise}
        </span>
        <span className="inline-flex items-center gap-1.5 font-semibold text-gray-700">
          <FiSunset className="text-accent-500" aria-hidden="true" /> Sunset {weekly[0].sunset}
        </span>
        <span className="ml-auto text-gray-400">Daylight shrinking ~1 min/day</span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <WeeklyTempChart />
        <WeeklyWindChart />
        <WeeklyUVChart />
      </div>
    </PageTransition>
  );
}