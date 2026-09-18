import {
  FiActivity,
  FiDroplet,
  FiEye,
  FiSun,
  FiThermometer,
  FiWind,
} from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import WeatherHeader from '@/components/weather/WeatherHeader';
import CurrentWeatherHero from '@/components/weather/CurrentWeatherHero';
import MetricTile from '@/components/weather/MetricTile';
import HourlyStrip from '@/components/weather/HourlyStrip';
import WeatherAlertCard from '@/components/weather/WeatherAlertCard';
import { WeekAtAGlance } from '@/components/weather/ForecastWeek';
import { RainStatTile } from '@/components/weather/RainSummary';
import { useWeather } from '@/context/WeatherContext';

export default function CurrentWeather() {
  const { current, hourly, alerts, rain, convert, unitSymbol } = useWeather();
  const nextHours = hourly.slice(0, 12);
  const activeAlerts = alerts.filter((a) => a.severity !== 'info').slice(0, 2);

  return (
    <PageTransition>
      <WeatherHeader title="Current Weather" subtitle="Live conditions for your farm" />

      <CurrentWeatherHero />

      <section aria-label="Current metrics" className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <MetricTile
          icon={FiThermometer}
          label="Temperature"
          value={`${convert(current.temp)}°${unitSymbol}`}
          sub={`Feels ${convert(current.feelsLike)}° · H ${convert(current.high)}° / L ${convert(current.low)}°`}
          color="sky"
        />
        <MetricTile
          icon={FiDroplet}
          label="Humidity"
          value={`${current.humidity}%`}
          sub={`Dew point ${current.dewPoint}°C`}
          color="primary"
        />
        <MetricTile
          icon={FiWind}
          label="Wind"
          value={`${current.windSpeed} km/h`}
          sub={`${current.windDir} · gust ${current.windGust} km/h`}
          color="accent"
        />
        <MetricTile
          icon={FiSun}
          label="UV Index"
          value={`${current.uvIndex} · ${current.uvCategory}`}
          sub="High exposure risk"
          color="accent"
        />
        <MetricTile
          icon={FiActivity}
          label="Pressure"
          value={`${current.pressure} hPa`}
          sub="Steady"
          color="violet"
        />
        <MetricTile
          icon={FiEye}
          label="Visibility"
          value={`${current.visibility} km`}
          sub="Clear"
          color="rose"
        />
      </section>

      <section aria-label="Hourly forecast" className="mt-6">
        <Card variant="soft">
          <SectionHeader
            title="Next 12 hours"
            subtitle="Hourly temperature, rain, humidity and wind"
            to="/dashboard/weather/hourly"
            linkLabel="Full hourly"
          />
          <HourlyStrip hours={nextHours} highlightNow />
        </Card>
      </section>

      <section aria-label="Weather alerts" className="mt-6">
        <SectionHeader
          title="Active alerts"
          subtitle={`${alerts.filter((a) => a.severity === 'warning').length} warnings · ${alerts.filter((a) => a.severity === 'advisory').length} advisories`}
          to="/dashboard/weather/alerts"
          linkLabel="All alerts"
        />
        <div className="grid gap-4 lg:grid-cols-2">
          {activeAlerts.map((alert) => (
            <WeatherAlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      </section>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_360px]">
        <section aria-label="7 day forecast">
          <SectionHeader
            title="7 day forecast"
            subtitle="High / low and rain chance"
            to="/dashboard/weather/7day"
            linkLabel="Full forecast"
          />
          <WeekAtAGlance />
        </section>

        <section aria-label="Rain prediction">
          <SectionHeader
            title="Rain this week"
            subtitle={`${rain.summary.rainyDays} rainy days ahead`}
            to="/dashboard/weather/rain"
            linkLabel="Rain details"
          />
          <div className="space-y-3">
            <RainStatTile
              icon={FiDroplet}
              label="Expected rainfall"
              value={`${rain.summary.totalRain} mm`}
              sub={`Heaviest on ${rain.summary.heaviestDay}`}
              color="sky"
            />
            <RainStatTile
              icon={FiActivity}
              label="Next rain"
              value={rain.summary.nextRain}
              sub={`Last rain ${rain.summary.lastRain}`}
              color="primary"
            />
          </div>
        </section>
      </div>
    </PageTransition>
  );
}