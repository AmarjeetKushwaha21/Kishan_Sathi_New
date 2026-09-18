import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBookOpen, FiCamera, FiSearch, FiShield } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import DiseaseHeader from '@/components/disease/DiseaseHeader';
import SymptomList from '@/components/disease/SymptomList';
import DiseaseFactBar from '@/components/disease/DiseaseFactBar';
import { DISEASE_CATEGORIES, DISEASE_LIBRARY } from '@/data/mock/diseaseDetection';
import { cn } from '@/utils/cn';

export default function Treatments() {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(DISEASE_LIBRARY[0].id);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DISEASE_LIBRARY.filter((d) => {
      if (category !== 'all' && d.cropKey !== category) return false;
      if (q) {
        const haystack = `${d.name} ${d.crop} ${d.symptoms.join(' ')}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [category, query]);

  const selected = DISEASE_LIBRARY.find((d) => d.id === selectedId) || DISEASE_LIBRARY[0];

  return (
    <PageTransition>
      <DiseaseHeader title="Treatment Library" subtitle="Remedies for common crop diseases and pests" />

      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {DISEASE_CATEGORIES.map((item) => (
            <button
              key={item.key}
              type="button"
              aria-pressed={category === item.key}
              onClick={() => setCategory(item.key)}
              className={cn(
                'focus-ring shrink-0 rounded-xl border px-3 py-2 text-xs font-semibold transition',
                category === item.key
                  ? 'border-primary-600 bg-primary-600 text-white shadow-soft'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <label className="relative block lg:w-72">
          <FiSearch aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search symptoms or names…"
            aria-label="Search treatment library"
            className="input-base w-full !pl-9"
          />
        </label>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[320px_1fr]">
        <Card variant="soft">
          <p className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-800">
            <FiBookOpen aria-hidden="true" className="text-primary-600" />
            {filtered.length} conditions found
          </p>
          {filtered.length === 0 ? (
            <EmptyState
              compact
              icon={FiShield}
              title="Nothing matches"
              description="Try another crop or search term."
            />
          ) : (
            <ul className="space-y-2">
              {filtered.map((d) => (
                <li key={d.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(d.id)}
                    className={cn(
                      'focus-ring flex w-full items-center gap-3 rounded-xl border p-3 text-left transition',
                      selectedId === d.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200 bg-white hover:border-primary-300'
                    )}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 text-xl" aria-hidden="true">
                      {d.emoji}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-gray-800">{d.name}</span>
                      <span className="block text-xs text-gray-500">{d.crop}</span>
                    </span>
                    <Badge size="sm" variant={d.severity === 'high' || d.severity === 'critical' ? 'danger' : 'accent'} className="capitalize">
                      {d.severity}
                    </Badge>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {selected && (
          <Card variant="soft" className="p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 text-2xl" aria-hidden="true">
                  {selected.emoji}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-gray-900">{selected.name}</h3>
                  <p className="text-sm text-gray-500">{selected.crop}</p>
                </div>
              </div>
              <Badge size="md" variant={selected.severity === 'high' || selected.severity === 'critical' ? 'danger' : 'accent'} className="capitalize">
                {selected.severity} severity
              </Badge>
            </div>

            <div className="mt-5">
              <DiseaseFactBar disease={selected} />
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <div>
                <SymptomList type="symptoms" items={selected.symptoms} />
              </div>
              <div>
                <SymptomList type="causes" items={selected.causes} />
              </div>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <div>
                <SymptomList type="treatment" items={selected.treatment} />
              </div>
              <div>
                <SymptomList type="prevent" items={selected.prevent} />
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-primary-100 bg-primary-50/50 p-4 text-sm text-gray-700">
              <strong className="text-primary-800">Weather trigger:</strong> {selected.weatherTrigger} ·{' '}
              <strong className="text-primary-800">Act:</strong> {selected.window}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/dashboard/disease-detection" className="focus-ring rounded-xl">
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-primary-600 px-4 py-2 text-xs font-bold text-white shadow-soft transition hover:bg-primary-700">
                  <FiCamera aria-hidden="true" /> Scan a leaf
                </span>
              </Link>
              <Link to="/dashboard/consultation" className="focus-ring rounded-xl">
                <span className="inline-flex items-center gap-1.5 rounded-xl border border-primary-300 bg-white px-4 py-2 text-xs font-bold text-primary-700 transition hover:bg-primary-50">
                  Ask an expert
                </span>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </PageTransition>
  );
}