import { FiBarChart2 } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import WeatherHeader from '@/components/weather/WeatherHeader';
import {
  HourlyTempChart,
  HourlyHumidityChart,
  HourlyRainChart,
  WeeklyTempChart,
  WeeklyRainChart,
  WeeklyWindChart,
  WeeklyUVChart,
} from '@/components/weather/WeatherChartsSection';

export default function WeatherCharts() {
  return (
    <PageTransition>
      <WeatherHeader
        title="Weather Charts"
        subtitle="Visual trends for the next 24 hours and 7 days"
        showBack
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <HourlyTempChart />
        <HourlyHumidityChart />
        <HourlyRainChart />
        <WeeklyTempChart />
        <WeeklyRainChart />
        <WeeklyWindChart />
        <WeeklyUVChart />
      </div>

      <p className="mt-6 flex items-center gap-2 text-xs text-gray-400">
        <FiBarChart2 aria-hidden="true" /> Charts auto-refresh with the forecast every 30 minutes.
      </p>
    </PageTransition>
  );
}