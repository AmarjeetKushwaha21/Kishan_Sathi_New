import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import { cn } from '@/utils/cn';

export default function ProfileMenuLink({ to, icon: Icon, label, description, tone = 'primary' }) {
  const tones = {
    primary: 'bg-primary-50 text-primary-600',
    accent: 'bg-accent-50 text-accent-600',
    sky: 'bg-sky-50 text-sky-600',
    violet: 'bg-violet-50 text-violet-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    indigo: 'bg-indigo-50 text-indigo-600',
  };

  return (
    <Link
      to={to}
      className="focus-ring group flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-soft transition hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-card"
    >
      <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xl', tones[tone])} aria-hidden="true">
        <Icon />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-display text-sm font-bold text-gray-900">{label}</p>
        {description && <p className="truncate text-xs text-gray-500">{description}</p>}
      </div>
      <FiChevronRight className="shrink-0 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-primary-500" aria-hidden="true" />
    </Link>
  );
}