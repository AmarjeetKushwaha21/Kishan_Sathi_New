import { useMemo, useState } from 'react';
import { FiClock, FiFileText, FiFilter, FiInfo, FiLayers } from 'react-icons/fi';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { useGovernment } from '@/context/GovernmentContext';
import { cn } from '@/utils/cn';

const STATUS_FILTERS = [
  { key: 'all', label: 'All Applications' },
  { key: 'Approved', label: 'Approved' },
  { key: 'Under Review', label: 'Under Review' },
  { key: 'Submitted', label: 'Submitted' },
  { key: 'Draft', label: 'Draft' },
  { key: 'Rejected', label: 'Rejected' },
];

const STATUS_BADGE_STYLES = {
  Approved: { variant: 'primary', label: 'Approved & Active' },
  'Under Review': { variant: 'accent', label: 'Under Review' },
  Submitted: { variant: 'sky', label: 'Submitted' },
  Draft: { variant: 'default', label: 'Draft' },
  Rejected: { variant: 'danger', label: 'Rejected' },
};

export default function MyApplicationsSection({ onSelectTimeline, onBrowseSchemes }) {
  const { applications } = useGovernment();
  const [statusFilter, setStatusFilter] = useState('all');

  const safeApplications = useMemo(
    () => (Array.isArray(applications) ? applications : []),
    [applications]
  );

  const filteredApps = useMemo(() => {
    if (statusFilter === 'all') return safeApplications;
    return safeApplications.filter((app) => app.status === statusFilter);
  }, [safeApplications, statusFilter]);

  const counts = useMemo(
    () => ({
      all: safeApplications.length,
      Approved: safeApplications.filter((a) => a.status === 'Approved').length,
      'Under Review': safeApplications.filter((a) => a.status === 'Under Review').length,
      Submitted: safeApplications.filter((a) => a.status === 'Submitted').length,
      Draft: safeApplications.filter((a) => a.status === 'Draft').length,
      Rejected: safeApplications.filter((a) => a.status === 'Rejected').length,
    }),
    [safeApplications]
  );

  return (
    <div className="space-y-4">
      {/* Status Filter Tabs */}
      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
        {STATUS_FILTERS.map((tab) => {
          const count = counts[tab.key] ?? 0;
          const active = statusFilter === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setStatusFilter(tab.key)}
              className={cn(
                'focus-ring flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition',
                active
                  ? 'border-primary-600 bg-primary-600 text-white shadow-soft'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
              )}
            >
              <span>{tab.label}</span>
              <span
                className={cn(
                  'flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold',
                  active ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Applications List */}
      {filteredApps.length === 0 ? (
        <EmptyState
          icon={FiFileText}
          title="No applications found"
          description="You don't have any government scheme applications in this status."
          action={Boolean(onBrowseSchemes)}
          actionLabel="Explore Schemes"
          onAction={onBrowseSchemes}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredApps.map((app) => {
            const statusConfig = STATUS_BADGE_STYLES[app.status] || STATUS_BADGE_STYLES.Submitted;
            const completedCount = app.timeline?.filter((t) => t.completed).length || 1;
            const totalCount = app.timeline?.length || 4;
            const progressPercent = Math.round((completedCount / totalCount) * 100);

            return (
              <Card
                key={app.id}
                variant="soft"
                className="flex flex-col justify-between border border-gray-200/80 bg-white p-5 shadow-soft transition hover:border-primary-300 hover:shadow-card"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <Badge variant={statusConfig.variant} size="sm">
                          {app.statusLabel || app.status}
                        </Badge>
                        <span className="font-mono text-[11px] font-bold text-gray-500">
                          {app.trackingId}
                        </span>
                      </div>
                      <h4 className="mt-2 font-display text-sm font-bold text-gray-900 line-clamp-1">
                        {app.schemeName}
                      </h4>
                    </div>
                  </div>

                  <p className="mt-1 text-xs text-gray-500">
                    Applied on <strong className="text-gray-700">{app.appliedDate}</strong> ·{' '}
                    <span className="text-primary-700 font-semibold">{app.amount}</span>
                  </p>

                  {/* Progress Bar */}
                  <div className="mt-3.5">
                    <div className="flex items-center justify-between text-[11px] font-medium text-gray-500">
                      <span>Progress Stage ({completedCount}/{totalCount})</span>
                      <span className="font-bold text-gray-700">{progressPercent}%</span>
                    </div>
                    <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-500',
                          app.status === 'Approved'
                            ? 'bg-emerald-500'
                            : app.status === 'Rejected'
                              ? 'bg-red-500'
                              : 'bg-primary-600'
                        )}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {app.remarks && (
                    <p className="mt-3 line-clamp-2 rounded-xl bg-gray-50 p-2.5 text-[11px] leading-relaxed text-gray-600">
                      <strong>Latest Update:</strong> {app.remarks}
                    </p>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-end gap-2 border-t border-gray-100 pt-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onSelectTimeline(app)}
                    leftIcon={FiClock}
                    className="text-xs font-semibold"
                  >
                    View Progress Timeline
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
