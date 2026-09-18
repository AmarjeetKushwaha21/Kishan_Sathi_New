import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiCamera, FiSearch } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import DiseaseHeader from '@/components/disease/DiseaseHeader';
import ScanHistoryRow from '@/components/disease/ScanHistoryRow';
import { useDisease } from '@/context/DiseaseContext';
import { cn } from '@/utils/cn';

const FILTERS = [
  { key: 'all', label: 'All scans' },
  { key: 'wheat', label: 'Wheat' },
  { key: 'paddy', label: 'Paddy' },
  { key: 'tomato', label: 'Tomato' },
  { key: 'maize', label: 'Maize' },
  { key: 'potato', label: 'Potato' },
];

export default function ScanHistory() {
  const navigate = useNavigate();
  const { scans, stats } = useDisease();
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const safeScans = useMemo(() => (Array.isArray(scans) ? scans.filter(Boolean) : []), [scans]);
  const scansThisMonth = stats?.scansThisMonth ?? 0;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return safeScans.filter((scan) => {
      if (!scan) return false;
      if (filter !== 'all' && scan.cropKey !== filter) return false;
      if (q) {
        const haystack = `${scan.crop ?? ''} ${scan.field ?? ''} ${scan.id ?? ''}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [safeScans, filter, query]);

  return (
    <PageTransition>
      <DiseaseHeader title="Scan History" subtitle={`${scansThisMonth} scans this month`} />

      <Card variant="soft" className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {FILTERS.map((item) => (
            <button
              key={item.key}
              type="button"
              aria-pressed={filter === item.key}
              onClick={() => setFilter(item.key)}
              className={cn(
                'focus-ring shrink-0 rounded-xl border px-3 py-2 text-xs font-semibold transition',
                filter === item.key
                  ? 'border-primary-600 bg-primary-600 text-white shadow-soft'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <label className="relative block sm:w-64">
          <FiSearch aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search scans…"
            aria-label="Search scans"
            className="input-base w-full !pl-9"
          />
        </label>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState
          icon={FiCamera}
          title="No scans found"
          description="We couldn't find any scans matching your filters. Try a different crop or search term."
          actionLabel="Scan a leaf"
          action
          onAction={() => navigate('/dashboard/disease-detection')}
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((scan) => (
            <ScanHistoryRow key={scan.id} scan={scan} />
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 p-5 text-white shadow-card">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-lg" aria-hidden="true">
            <FiCamera />
          </span>
          <div>
            <p className="font-display text-sm font-bold">Keep your crops protected</p>
            <p className="text-xs text-primary-100">Scan leaves weekly during the monsoon for early warning.</p>
          </div>
        </div>
        <Link to="/dashboard/disease-detection" className="focus-ring rounded-xl">
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-bold text-primary-700 transition hover:bg-primary-50">
            New scan
          </span>
        </Link>
      </div>
    </PageTransition>
  );
}