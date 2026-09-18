import { FiAlertTriangle, FiBell } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import WeatherHeader from '@/components/weather/WeatherHeader';
import WeatherAlertCard from '@/components/weather/WeatherAlertCard';
import { useWeather } from '@/context/WeatherContext';

export default function WeatherAlerts() {
  const { alerts } = useWeather();
  const warnings = alerts.filter((a) => a.severity === 'warning').length;
  const advisories = alerts.filter((a) => a.severity === 'advisory').length;
  const info = alerts.filter((a) => a.severity === 'info').length;

  return (
    <PageTransition>
      <WeatherHeader title="Weather Alerts" subtitle="Official warnings for Ludhiana district" showBack />

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: 'Warnings', value: warnings, variant: 'danger' },
          { label: 'Advisories', value: advisories, variant: 'accent' },
          { label: 'Info bulletins', value: info, variant: 'primary' },
        ].map((item) => (
          <Card key={item.label} variant="soft" className="p-4 text-center">
            <p className="font-display text-3xl font-bold text-gray-900">{item.value}</p>
            <Badge variant={item.variant} size="sm" className="mt-1">{item.label}</Badge>
          </Card>
        ))}
      </div>

      {alerts.length > 0 ? (
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {alerts.map((alert) => (
            <WeatherAlertCard key={alert.id} alert={alert} detailed />
          ))}
        </div>
      ) : (
        <Card variant="soft" className="mt-6">
          <EmptyState icon={FiBell} title="No active alerts" description="Your area is currently clear of weather warnings." />
        </Card>
      )}

      <Card variant="tinted" className="mt-6">
        <p className="flex items-start gap-2.5 text-sm leading-relaxed text-gray-600">
          <FiAlertTriangle className="mt-0.5 shrink-0 text-accent-500" aria-hidden="true" />
          Alerts are sourced from IMD bulletins and the Punjab Agriculture Department. Always verify critical decisions with your local agriculture officer.
        </p>
      </Card>
    </PageTransition>
  );
}