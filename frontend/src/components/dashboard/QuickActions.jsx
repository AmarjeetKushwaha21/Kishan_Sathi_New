import { Link } from 'react-router-dom';

import SectionHeader from '@/components/ui/SectionHeader';
import { getIcon } from './dashboardIcons';
import { QUICK_ACTIONS } from '@/data/mock/dashboard';

const COLOR_STYLES = {
  primary: 'bg-primary-50 text-primary-600 group-hover:bg-primary-600',
  sky: 'bg-sky-50 text-sky-600 group-hover:bg-sky-600',
  accent: 'bg-accent-50 text-accent-600 group-hover:bg-accent-600',
  violet: 'bg-violet-50 text-violet-600 group-hover:bg-violet-600',
};

export default function QuickActions() {
  return (
    <section aria-labelledby="quick-actions-title">
      <SectionHeader title="Quick Actions" subtitle="Jump straight into what you need" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {QUICK_ACTIONS.map(({ label, to, icon, color }) => {
          const Icon = getIcon(icon);
          return (
            <Link
              key={to}
              to={to}
              className="focus-ring group flex flex-col items-center gap-2.5 rounded-2xl border border-primary-100 bg-white p-5 text-center shadow-soft transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-card"
            >
              <span className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl transition ${COLOR_STYLES[color]}`}>
                <Icon aria-hidden="true" className="group-hover:text-white" />
              </span>
              <span className="text-xs font-semibold text-gray-700">{label}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}