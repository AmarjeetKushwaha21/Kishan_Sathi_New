import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiAlertTriangle, FiBell, FiInfo, FiLayers } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import EmptyState from '@/components/ui/EmptyState';
import DiseaseHeader from '@/components/disease/DiseaseHeader';
import PestAlertCard from '@/components/disease/PestAlertCard';
import { useDisease } from '@/context/DiseaseContext';
import { cn } from '@/utils/cn';

const FILTERS = [
  { key: 'all', label: 'All alerts' },
  { key: 'warning', label: 'Warnings' },
  { key: 'advisory', label: 'Advisories' },
  { key: 'info', label: 'Info' },
];

const FILTER_ICONS = { all: FiLayers, warning: FiAlertTriangle, advisory: FiBell, info: FiInfo };

export default function PestAlerts() {
  const navigate = useNavigate();
  const { alerts } = useDisease();
  const [filter, setFilter] = useState('all');
  const safeAlerts = useMemo(() => (Array.isArray(alerts) ? alerts.filter(Boolean) : []), [alerts]);

  const filtered = useMemo(
    () => (filter === 'all' ? safeAlerts : safeAlerts.filter((a) => a?.severity === filter)),
    [safeAlerts, filter]
  );

  const counts = useMemo(
    () => ({
      all: safeAlerts.length,
      warning: safeAlerts.filter((a) => a?.severity === 'warning').length,
      advisory: safeAlerts.filter((a) => a?.severity === 'advisory').length,
      info: safeAlerts.filter((a) => a?.severity === 'info').length,
    }),
    [safeAlerts]
  );

  return (
    <PageTransition>
      <DiseaseHeader title="Pest & Disease Alerts" subtitle="Regional early warnings for your crops" />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {FILTERS.map((item) => {
          const Icon = FILTER_ICONS[item.key] || FiInfo;
          return (
            <button
              key={item.key}
              type="button"
              aria-pressed={filter === item.key}
              onClick={() => setFilter(item.key)}
              className={cn(
                'focus-ring flex items-center gap-2 rounded-2xl border p-4 text-left transition',
                filter === item.key
                  ? 'border-primary-600 bg-primary-600 text-white shadow-soft'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300'
              )}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black/5 text-lg" aria-hidden="true">
                <Icon className={filter === item.key ? 'text-white' : 'text-primary-600'} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold">{item.label}</span>
                <span className={cn('block text-[11px]', filter === item.key ? 'text-primary-100' : 'text-gray-400')}>
                  {counts[item.key] ?? 0} active
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <section className="mt-6">
        <SectionHeader
          title={`${filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)} alerts`}
          subtitle="Based on weather, trap data and local outbreaks"
        />
        {filtered.length === 0 ? (
          <EmptyState
            icon={FiInfo}
            title="No alerts here"
            description="Nothing to worry about for this category right now. Check back after the next weather update."
            actionLabel="New scan"
            action
            onAction={() => navigate('/dashboard/disease-detection')}
          />
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {filtered.map((alert) => (
              <PestAlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        )}
      </section>

      <Card variant="tinted" className="mt-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-display text-sm font-bold text-gray-900">Subscribe to instant alerts</p>
            <p className="mt-0.5 text-xs text-gray-500">
              Get SMS & WhatsApp warnings when a disease risk crosses the threshold for your fields.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-primary-600 px-4 py-2 text-xs font-bold text-white shadow-soft">
              <FiBell aria-hidden="true" /> SMS active
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-accent-100 px-4 py-2 text-xs font-bold text-accent-700">
              WhatsApp pending
            </span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link to="/dashboard/settings" className="focus-ring rounded-xl">
            <span className="inline-flex items-center rounded-xl border border-primary-300 bg-white px-4 py-2 text-xs font-bold text-primary-700 transition hover:bg-primary-50">
              Manage alert preferences
            </span>
          </Link>
        </div>
      </Card>
    </PageTransition>
  );
}