import { useMemo, useState } from 'react';
import { FiClock, FiStar, FiTrendingUp } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import ExpertHeader from '@/components/expert/ExpertHeader';
import AppointmentCard from '@/components/expert/AppointmentCard';
import { useExpert } from '@/context/ExpertContext';
import { cn } from '@/utils/cn';
import { formatINR } from '@/utils/format';

const FILTERS = ['All', 'Video', 'Chat', 'Phone'];

export default function ConsultationHistory() {
  const { completed } = useExpert();
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(
    () => (filter === 'All' ? completed : completed.filter((a) => a.type === filter.toLowerCase())),
    [completed, filter]
  );

  const stats = useMemo(() => {
    if (completed.length === 0) return null;
    const minutes = completed.reduce((sum, a) => sum + a.duration, 0);
    const spent = completed.reduce((sum, a) => sum + a.price, 0);
    const rated = completed.filter((a) => a.rating);
    const avgRating = rated.length ? rated.reduce((sum, a) => sum + a.rating, 0) / rated.length : 0;
    return { count: completed.length, minutes, spent, avgRating };
  }, [completed]);

  return (
    <PageTransition>
      <ExpertHeader title="Consultation History" subtitle="Your completed consultations and calls" showBack status={`${completed.length} total`} />

      {stats && (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
          <Card variant="soft" className="p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Consultations</p>
            <p className="mt-1 font-display text-xl font-bold text-gray-900">{stats.count}</p>
          </Card>
          <Card variant="soft" className="p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Time spent</p>
            <p className="mt-1 inline-flex items-center gap-1 font-display text-xl font-bold text-gray-900"><FiClock className="text-accent-500" aria-hidden="true" /> {stats.minutes} min</p>
          </Card>
          <Card variant="soft" className="p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Total spent</p>
            <p className="mt-1 font-display text-xl font-bold text-primary-700">{formatINR(stats.spent)}</p>
          </Card>
          <Card variant="soft" className="p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Avg rating given</p>
            <p className="mt-1 inline-flex items-center gap-1 font-display text-xl font-bold text-gray-900"><FiStar className="text-accent-500" aria-hidden="true" /> {stats.avgRating.toFixed(1)}</p>
          </Card>
        </div>
      )}

      <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              'focus-ring shrink-0 rounded-xl border px-3 py-2 text-xs font-semibold transition',
              filter === f ? 'border-primary-600 bg-primary-600 text-white shadow-soft' : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-5">
          <EmptyState
            icon={FiTrendingUp}
            title="No consultations yet"
            description="Book a video, chat or phone consultation with an expert to build your history."
          />
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {filtered.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      )}
    </PageTransition>
  );
}