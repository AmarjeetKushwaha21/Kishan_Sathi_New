import { FiAward, FiStar } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import FarmerHeader from '@/components/farmer/FarmerHeader';
import AchievementCard from '@/components/farmer/AchievementCard';
import { useFarmer } from '@/context/FarmerContext';

export default function Achievements() {
  const { achievements } = useFarmer();
  const unlocked = achievements.filter((a) => !a.locked);
  const points = unlocked.reduce((s, a) => s + a.points, 0);
  const nextTierAt = 1500;
  const progress = Math.min(100, Math.round((points / nextTierAt) * 100));

  return (
    <PageTransition>
      <FarmerHeader title="Achievements" subtitle={`${unlocked.length} of ${achievements.length} badges unlocked`} showBack status={`${points} pts`} />

      <Card variant="tinted" className="p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-100 text-xl text-accent-600" aria-hidden="true">
            <FiStar />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">Sathi points earned</p>
            <p className="font-display text-2xl font-bold text-gray-900">{points.toLocaleString('en-IN')}</p>
          </div>
          <p className="hidden text-right text-xs text-gray-500 sm:block">
            Platinum at {nextTierAt.toLocaleString('en-IN')} pts
            <br />
            <span className="font-bold text-accent-600">{nextTierAt - points} to go</span>
          </p>
        </div>
        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-accent-100">
          <div className="h-full rounded-full bg-accent-500 transition-all" style={{ width: `${progress}%` }} aria-hidden="true" />
        </div>
      </Card>

      <div className="mt-6 grid items-start gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((a) => (
          <AchievementCard key={a.id} achievement={a} />
        ))}
      </div>

      <p className="mt-6 flex items-center gap-1.5 text-xs text-gray-400">
        <FiAward className="text-accent-500" aria-hidden="true" /> Points unlock rewards like priority mandi slots and discounted soil testing.
      </p>
    </PageTransition>
  );
}