import { FiActivity, FiCloudRain, FiDroplet, FiUmbrella } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import WeatherHeader from '@/components/weather/WeatherHeader';
import { RainStatTile, SoilMoistureCard, RainWindows, RainInsights } from '@/components/weather/RainSummary';
import { useWeather } from '@/context/WeatherContext';
import { cn } from '@/utils/cn';

const INTENSITY_STYLES = {
  None: 'bg-gray-50 text-gray-500',
  Light: 'bg-sky-50 text-sky-600',
  Moderate: 'bg-accent-50 text-accent-700',
  Heavy: 'bg-red-50 text-red-600',
};

export default function RainPrediction() {
  const { rain } = useWeather();

  return (
    <PageTransition>
      <WeatherHeader title="Rain Prediction" subtitle="Rainfall outlook and irrigation guidance" showBack />

      <section aria-label="Rain summary" className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <RainStatTile
          icon={FiCloudRain}
          label="Week rainfall"
          value={`${rain.summary.totalRain} mm`}
          sub={`Heaviest on ${rain.summary.heaviestDay}`}
          color="sky"
        />
        <RainStatTile
          icon={FiUmbrella}
          label="Rainy days"
          value={`${rain.summary.rainyDays} of 7`}
          sub="Friday → Sunday"
          color="primary"
        />
        <RainStatTile
          icon={FiActivity}
          label="Next rain"
          value={rain.summary.nextRain}
          sub={`Last rain ${rain.summary.lastRain}`}
          color="accent"
        />
        <RainStatTile
          icon={FiDroplet}
          label="Flood risk"
          value={rain.summary.floodRisk}
          sub={`Drought risk ${rain.summary.droughtRisk}`}
          color="rose"
        />
      </section>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_360px]">
        <Card variant="soft" className="p-4 sm:p-5">
          <h3 className="mb-4 px-1 font-display text-base font-semibold text-gray-900">Daily rainfall (mm)</h3>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
            {rain.daily.map((day) => (
              <div key={day.day} className="rounded-2xl border border-gray-100 p-3 text-center shadow-soft">
                <p className="text-xs font-semibold text-gray-500">{day.day}</p>
                <p className="mt-1 font-display text-lg font-bold text-gray-900">{day.amount} mm</p>
                <span className={cn('mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold', INTENSITY_STYLES[day.intensity])}>
                  {day.intensity}
                </span>
                <p className="mt-1.5 text-[11px] text-sky-600">{day.probability}% chance</p>
              </div>
            ))}
          </div>
        </Card>

        <SoilMoistureCard />
      </div>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-2">
        <RainWindows />
        <RainInsights />
      </div>

      <Card variant="tinted" className="mt-6">
        <h3 className="mb-3 font-display text-base font-semibold text-gray-900">Irrigation advice</h3>
        <ul className="space-y-2.5">
          {rain.irrigationAdvice.map((advice) => (
            <li key={advice} className="flex items-start gap-2.5 text-sm leading-relaxed text-gray-700">
              <FiDroplet className="mt-0.5 shrink-0 text-sky-500" aria-hidden="true" />
              {advice}
            </li>
          ))}
        </ul>
      </Card>
    </PageTransition>
  );
}