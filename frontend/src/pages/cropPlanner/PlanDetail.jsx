import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle, FiClock, FiMapPin, FiPlusCircle } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import PageHeader from '@/components/ui/PageHeader';
import { ACTIVITY_CATEGORIES, CROP_PLANS } from '@/data/mock/cropPlanner';
import { cn } from '@/utils/cn';

export default function PlanDetail() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const [toggled, setToggled] = useState({});

  const plan = useMemo(() => CROP_PLANS.find((p) => p.id === planId) || CROP_PLANS[0], [planId]);

  const doneCount = plan.activities.filter((a) => (toggled[a.name] ?? a.status) === 'done').length;

  function toggle(name, status) {
    setToggled((prev) => ({ ...prev, [name]: status === 'done' ? 'pending' : 'done' }));
  }

  return (
    <PageTransition>
      <PageHeader title={`${plan.crop} Plan`} subtitle={`${plan.id} · ${plan.variety} · ${plan.field}`} showBack />

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <Card variant="soft">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 text-3xl" aria-hidden="true">
                  {plan.emoji}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-gray-900">{plan.crop}</h3>
                  <p className="mt-0.5 text-sm text-gray-500">
                    {plan.variety} · {plan.area}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Badge variant="primary" className="capitalize">{plan.stage}</Badge>
                    <Badge variant="outline" className="capitalize">{plan.status}</Badge>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Progress</p>
                <p className="font-display text-xl font-bold text-primary-700">{plan.progress}%</p>
              </div>
            </div>

            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-gray-100">
              <div className="h-full rounded-full bg-primary-600" style={{ width: `${plan.progress}%` }} />
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-primary-50 p-3">
                <p className="flex items-center justify-center gap-1 text-sm font-bold text-gray-900"><FiClock aria-hidden="true" className="text-primary-600" /> Sown {plan.sowDate}</p>
                <p className="mt-1 text-[11px] text-gray-500">Sowing date</p>
              </div>
              <div className="rounded-xl bg-accent-50 p-3">
                <p className="flex items-center justify-center gap-1 text-sm font-bold text-gray-900">🚜 {plan.expectedHarvest}</p>
                <p className="mt-1 text-[11px] text-gray-500">Expected harvest</p>
              </div>
              <div className="rounded-xl bg-sky-50 p-3">
                <p className="flex items-center justify-center gap-1 text-sm font-bold text-gray-900"><FiMapPin aria-hidden="true" className="text-sky-600" /> {plan.field}</p>
                <p className="mt-1 text-[11px] text-gray-500">Field</p>
              </div>
            </div>
          </Card>

          <Card variant="soft">
            <div className="flex items-center justify-between">
              <p className="font-display text-base font-bold text-gray-900">Activity schedule</p>
              <p className="text-xs text-gray-500">{doneCount}/{plan.activities.length} completed</p>
            </div>
            <ol className="mt-4 space-y-2">
              {plan.activities.map((activity) => {
                const cat = ACTIVITY_CATEGORIES.find((c) => c.key === activity.category) || ACTIVITY_CATEGORIES[5];
                const isDone = (toggled[activity.name] ?? activity.status) === 'done';
                return (
                  <li key={activity.name}>
                    <button
                      type="button"
                      onClick={() => toggle(activity.name, activity.status)}
                      aria-pressed={isDone}
                      className="focus-ring flex w-full items-center gap-3 rounded-xl border border-gray-100 p-3 text-left transition hover:border-primary-300"
                    >
                      <span
                        className={cn(
                          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs transition',
                          isDone ? 'border-primary-600 bg-primary-600 text-white' : 'border-gray-300 text-transparent'
                        )}
                        aria-hidden="true"
                      >
                        <FiCheckCircle />
                      </span>
                      <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg', cat.color)} aria-hidden="true">
                        {cat.emoji}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={cn('block text-sm font-semibold', isDone ? 'text-gray-400 line-through' : 'text-gray-800')}>
                          {activity.name}
                        </span>
                        <span className="block text-xs text-gray-500">{activity.note}</span>
                      </span>
                      <span className="shrink-0 text-[11px] font-bold text-gray-500">{activity.date}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card variant="tinted">
            <p className="font-display text-sm font-bold text-gray-900">Planner tips</p>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>• Mark tasks done as you finish them — your dashboard updates automatically.</li>
              <li>• Wheat third irrigation falls on 14 Jan — check rain forecast first.</li>
              <li>• Keep the weed control spray before the second irrigation.</li>
            </ul>
          </Card>
          <Card variant="flat">
            <Button fullWidth leftIcon={FiPlusCircle} onClick={() => navigate('/dashboard/crop-planner/new')}>
              Start another plan
            </Button>
            <Link to="/dashboard/crop-planner" className="focus-ring mt-3 flex items-center justify-center gap-1 rounded-xl py-2 text-xs font-semibold text-primary-600 transition hover:bg-primary-50">
              <FiArrowLeft aria-hidden="true" /> Back to planner
            </Link>
          </Card>
        </aside>
      </div>
    </PageTransition>
  );
}