import StatCard from '@/components/ui/StatCard';
import { getIcon } from './dashboardIcons';
import { STATS } from '@/data/mock/dashboard';

export default function StatCards() {
  return (
    <section aria-label="Farm statistics" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {STATS.map((stat) => (
        <StatCard
          key={stat.id}
          icon={getIcon(stat.icon)}
          label={stat.label}
          value={stat.value}
          trend={stat.trend}
          color={stat.color}
        />
      ))}
    </section>
  );
}