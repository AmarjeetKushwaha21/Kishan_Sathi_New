import { FiDroplet, FiUmbrella, FiWind } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import WeatherHeader from '@/components/weather/WeatherHeader';
import HourlyStrip from '@/components/weather/HourlyStrip';
import { HourlyTempChart, HourlyHumidityChart, HourlyRainChart } from '@/components/weather/WeatherChartsSection';
import { weatherIcon } from '@/components/weather/weatherIcons';
import { useWeather } from '@/context/WeatherContext';

export default function HourlyForecast() {
  const { hourly, convert, unitSymbol } = useWeather();

  return (
    <PageTransition>
      <WeatherHeader title="Hourly Forecast" subtitle="Next 24 hours in detail" showBack />

      <Card variant="soft">
        <h3 className="mb-4 font-display text-base font-semibold text-gray-900">Hour by hour</h3>
        <HourlyStrip hours={hourly} highlightNow />
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <HourlyTempChart />
        <HourlyHumidityChart />
        <HourlyRainChart />
      </div>

      <Card variant="soft" className="mt-6 p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <caption className="sr-only">Hourly weather details</caption>
            <thead>
              <tr className="border-b border-gray-100 text-[11px] uppercase tracking-wider text-gray-400">
                <th scope="col" className="px-5 py-3 font-semibold">Time</th>
                <th scope="col" className="px-5 py-3 font-semibold">Condition</th>
                <th scope="col" className="px-5 py-3 font-semibold">Temp</th>
                <th scope="col" className="px-5 py-3 font-semibold">Feels like</th>
                <th scope="col" className="px-5 py-3 font-semibold">Rain</th>
                <th scope="col" className="px-5 py-3 font-semibold">Humidity</th>
                <th scope="col" className="px-5 py-3 font-semibold">Wind</th>
              </tr>
            </thead>
            <tbody>
              {hourly.map((hour) => {
                const Icon = weatherIcon(hour.conditionKey);
                return (
                  <tr key={hour.time} className="border-b border-gray-50 last:border-0 hover:bg-primary-50/40">
                    <td className="px-5 py-2.5 font-semibold text-gray-900">{hour.time}</td>
                    <td className="px-5 py-2.5">
                      <span className="inline-flex items-center gap-2 text-gray-600">
                        <Icon className="text-sky-500" aria-hidden="true" /> {hour.condition}
                      </span>
                    </td>
                    <td className="px-5 py-2.5 font-display font-bold text-gray-900">{convert(hour.temp)}°{unitSymbol}</td>
                    <td className="px-5 py-2.5 text-gray-600">{convert(hour.feelsLike)}°{unitSymbol}</td>
                    <td className="px-5 py-2.5">
                      <span className="inline-flex items-center gap-1 font-semibold text-sky-600">
                        <FiUmbrella aria-hidden="true" /> {hour.rain}%
                      </span>
                    </td>
                    <td className="px-5 py-2.5">
                      <span className="inline-flex items-center gap-1 text-gray-600">
                        <FiDroplet aria-hidden="true" /> {hour.humidity}%
                      </span>
                    </td>
                    <td className="px-5 py-2.5">
                      <span className="inline-flex items-center gap-1 text-gray-600">
                        <FiWind aria-hidden="true" /> {hour.wind} km/h
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </PageTransition>
  );
}