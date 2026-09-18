import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiCheckCircle, FiClock, FiPlusCircle, FiTruck } from 'react-icons/fi';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import StatCard from '@/components/ui/StatCard';
import Badge from '@/components/ui/Badge';
import PageHeader from '@/components/ui/PageHeader';
import { ACTIVITY_CATEGORIES, CROP_PLANS, PLANNER_CHART, PLANNER_STATS, SEASONS } from '@/data/mock/cropPlanner';
import { cn } from '@/utils/cn';

const TOOLTIP_STYLE = {
  borderRadius: 12,
  border: '1px solid #dcfce7',
  fontSize: 12,
  boxShadow: '0 6px 24px -6px rgba(22, 101, 52, 0.18)',
};

export default function CropPlanner() {
  const [season, setSeason] = useState('all');

  const filtered = useMemo(
    () => (season === 'all' ? CROP_PLANS : CROP_PLANS.filter((plan) => plan.season === season)),
    [season]
  );

  const upcoming = useMemo(
    () =>
      CROP_PLANS.flatMap((plan) =>
        plan.activities
          .filter((a) => a.status === 'pending')
          .slice(0, 2)
          .map((a) => ({ ...a, plan }))
      )
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, 5),
    []
  );

  return (
    <PageTransition>
      <PageHeader title="Crop Planner" subtitle="Sowing, irrigation, fertilizer and harvest schedules" />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard icon={FiCalendar} label="Active plans" value={PLANNER_STATS.activePlans} trend="2 seasons" color="primary" />
        <StatCard icon={FiClock} label="Tasks this week" value={PLANNER_STATS.tasksThisWeek} trend="3 high priority" color="accent" />
        <StatCard icon={FiCheckCircle} label="Completed tasks" value={PLANNER_STATS.completedTasks} trend="92% on time" color="sky" />
        <StatCard icon={FiTruck} label="Next harvest" value="15 Apr" trend="Wheat · North Field" color="violet" />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {[{ key: 'all', label: 'All seasons' }, ...SEASONS].map((item) => (
            <button
              key={item.key}
              type="button"
              aria-pressed={season === item.key}
              onClick={() => setSeason(item.key)}
              className={cn(
                'focus-ring shrink-0 rounded-xl border px-3.5 py-2 text-xs font-semibold transition',
                season === item.key
                  ? 'border-primary-600 bg-primary-600 text-white shadow-soft'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <Link to="/dashboard/crop-planner/new" className="focus-ring rounded-xl">
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-primary-600 px-4 py-2.5 text-xs font-bold text-white shadow-soft transition hover:bg-primary-700">
            <FiPlusCircle aria-hidden="true" /> New crop plan
          </span>
        </Link>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {filtered.map((plan) => {
          const doneCount = plan.activities.filter((a) => a.status === 'done').length;
          return (
            <Link key={plan.id} to={`/dashboard/crop-planner/${plan.id}`} className="focus-ring block rounded-2xl">
              <Card variant="soft" className="flex h-full flex-col p-5 hover:border-primary-200">
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 text-2xl" aria-hidden="true">
                    {plan.emoji}
                  </span>
                  <Badge variant="primary" className="capitalize">{plan.status}</Badge>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-gray-900">{plan.crop}</h3>
                <p className="text-xs text-gray-500">
                  {plan.variety} · {plan.field} · {plan.area}
                </p>
                <p className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-primary-50 px-2.5 py-1 text-[11px] font-semibold text-primary-700">
                  {plan.stage}
                </p>

                <div className="mt-4">
                  <div className="flex justify-between text-[11px] font-semibold text-gray-500">
                    <span>Progress</span>
                    <span>{plan.progress}%</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full rounded-full bg-primary-600" style={{ width: `${plan.progress}%` }} />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-[11px] text-gray-500">
                  <span>👨‍🌾 Sown {plan.sowDate}</span>
                  <span>🚜 {plan.expectedHarvest}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-gray-500">
                  <span>{doneCount}/{plan.activities.length} tasks done</span>
                  <span className="font-semibold text-primary-600">Open plan →</span>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_340px]">
        <Card variant="soft">
          <SectionHeader title="Upcoming tasks" subtitle="Next actions across all plans" />
          <ul className="space-y-3">
            {upcoming.map((task) => {
              const cat = ACTIVITY_CATEGORIES.find((c) => c.key === task.category) || ACTIVITY_CATEGORIES[5];
              return (
                <li key={`${task.plan.id}-${task.name}`} className="flex items-center gap-3 rounded-xl border border-gray-100 p-3">
                  <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg', cat.color)} aria-hidden="true">
                    {cat.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-800">{task.name}</p>
                    <p className="text-xs text-gray-500">
                      {task.plan.crop} · {task.plan.field} · {task.note}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-lg bg-gray-100 px-2.5 py-1 text-[11px] font-bold text-gray-600">
                    {task.date}
                  </span>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card variant="soft">
          <SectionHeader title="Workload by month" subtitle="Scheduled tasks per month" />
          <div className="h-52 w-full" role="img" aria-label="Bar chart of planned tasks by month">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PLANNER_CHART} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: '#f0fdf4' }} />
                <Bar dataKey="tasks" name="Tasks" fill="#16a34a" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </PageTransition>
  );
}