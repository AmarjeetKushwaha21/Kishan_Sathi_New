import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiFilePlus, FiMapPin, FiPlusCircle, FiSearch } from 'react-icons/fi';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import StatCard from '@/components/ui/StatCard';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import PageHeader from '@/components/ui/PageHeader';
import { FIELD_REPORTS, FIELD_REPORT_STATS, REPORT_CHART, REPORT_TYPES, UPCOMING_TASKS } from '@/data/mock/fieldReports';
import { cn } from '@/utils/cn';

const TYPE_BADGE = {
  'field-visit': 'primary',
  irrigation: 'sky',
  fertilizer: 'accent',
  'pest-check': 'danger',
  'disease-check': 'violet',
  soil: 'outline',
};

const TYPE_LABEL = {
  'field-visit': 'Field visit',
  irrigation: 'Irrigation',
  fertilizer: 'Fertilizer',
  'pest-check': 'Pest check',
  'disease-check': 'Disease scan',
  soil: 'Soil',
};

const TOOLTIP_STYLE = {
  borderRadius: 12,
  border: '1px solid #dcfce7',
  fontSize: 12,
  boxShadow: '0 6px 24px -6px rgba(22, 101, 52, 0.18)',
};

export default function FieldReports() {
  const [type, setType] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FIELD_REPORTS.filter((report) => {
      if (type !== 'all' && report.type !== type) return false;
      if (q) {
        const haystack = `${report.title} ${report.field} ${report.crop} ${report.summary}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [type, query]);

  return (
    <PageTransition>
      <PageHeader title="Field Reports" subtitle="Crop health and activity logs across your farm" />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard icon={FiCalendar} label="Total reports" value={FIELD_REPORT_STATS.totalReports} trend="+6 this month" color="primary" />
        <StatCard icon={FiFilePlus} label="This month" value={FIELD_REPORT_STATS.thisMonth} trend="On track" color="accent" />
        <StatCard icon={FiMapPin} label="Fields monitored" value={FIELD_REPORT_STATS.fieldsMonitored} trend="All active" color="sky" />
        <StatCard icon={FiCalendar} label="Open tasks" value={FIELD_REPORT_STATS.openTasks} trend="2 due this week" color="violet" />
      </div>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_340px]">
        <section aria-label="Reports list">
          <Card variant="soft" className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="no-scrollbar flex gap-2 overflow-x-auto">
              {REPORT_TYPES.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  aria-pressed={type === item.key}
                  onClick={() => setType(item.key)}
                  className={cn(
                    'focus-ring shrink-0 rounded-xl border px-3 py-2 text-xs font-semibold transition',
                    type === item.key
                      ? 'border-primary-600 bg-primary-600 text-white shadow-soft'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <label className="relative block sm:w-56">
                <FiSearch aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search reports…"
                  aria-label="Search field reports"
                  className="input-base w-full !pl-9"
                />
              </label>
              <Link to="/dashboard/field-reports/new" className="focus-ring shrink-0 rounded-xl">
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-primary-600 px-3.5 py-2.5 text-xs font-bold text-white shadow-soft transition hover:bg-primary-700">
                  <FiPlusCircle aria-hidden="true" /> New
                </span>
              </Link>
            </div>
          </Card>

          {filtered.length === 0 ? (
            <EmptyState
              icon={FiCalendar}
              title="No reports match"
              description="Try a different type or search term."
              actionLabel="New report"
              action
              onAction={() => {
                window.location.href = '/dashboard/field-reports/new';
              }}
            />
          ) : (
            <div className="space-y-3">
              {filtered.map((report) => (
                <Link key={report.id} to={`/dashboard/field-reports/${report.id}`} className="focus-ring block rounded-2xl">
                  <Card variant="soft" className="p-4 hover:border-primary-200">
                    <div className="flex items-start gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 text-xl" aria-hidden="true">
                        {report.emoji}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display text-sm font-bold text-gray-900">{report.title}</h3>
                          <Badge size="sm" variant={TYPE_BADGE[report.type] || 'outline'}>
                            {TYPE_LABEL[report.type]}
                          </Badge>
                        </div>
                        <p className="mt-1 line-clamp-2 text-sm text-gray-600">{report.summary}</p>
                        <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-gray-500">
                          <span className="inline-flex items-center gap-1"><FiMapPin aria-hidden="true" /> {report.field}</span>
                          <span>{report.crop}</span>
                          <span>{report.date}</span>
                          <span>{report.agent}</span>
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>

        <aside className="space-y-4">
          <Card variant="soft">
            <SectionHeader title="Monthly activity" subtitle="Field visits vs pest checks" />
            <div className="h-44 w-full" role="img" aria-label="Area chart of field reports per month">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={REPORT_CHART} margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
                  <defs>
                    <linearGradient id="frField" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#16a34a" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#16a34a" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="frPest" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Area type="monotone" dataKey="field" name="Field visits" stroke="#16a34a" strokeWidth={2.5} fill="url(#frField)" />
                  <Area type="monotone" dataKey="pest" name="Pest checks" stroke="#f59e0b" strokeWidth={2.5} fill="url(#frPest)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card variant="tinted">
            <SectionHeader title="Upcoming tasks" subtitle="From your crop planner" to="/dashboard/crop-planner" linkLabel="Planner" />
            <ul className="space-y-3">
              {UPCOMING_TASKS.map((task) => (
                <li key={task.id} className="flex items-start gap-3">
                  <span className={cn('mt-1 h-2 w-2 shrink-0 rounded-full', task.priority === 'high' ? 'bg-red-500' : 'bg-accent-500')} aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-800">{task.title}</p>
                    <p className="text-xs text-gray-500">{task.field} · {task.due}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
            <p className="font-display text-sm font-bold">Missing a log?</p>
            <p className="mt-1 text-xs text-primary-100">Add a field visit, irrigation or pest check in under a minute.</p>
            <Link to="/dashboard/field-reports/new" className="focus-ring mt-4 inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-bold text-primary-700 transition hover:bg-primary-50">
              <FiPlusCircle aria-hidden="true" /> New report
            </Link>
          </Card>
        </aside>
      </div>
    </PageTransition>
  );
}