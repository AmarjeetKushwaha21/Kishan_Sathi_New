import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { cn } from '@/utils/cn';

export default function AchievementCard({ achievement }) {
  return (
    <Card variant="soft" className={cn('p-4', achievement.locked && 'opacity-80')}>
      <div className="flex items-start gap-3">
        <span
          className={cn(
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl',
            achievement.locked ? 'bg-gray-100 grayscale' : 'bg-accent-50'
          )}
          aria-hidden="true"
        >
          {achievement.icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-display text-sm font-bold text-gray-900">{achievement.title}</h4>
            <Badge variant={achievement.locked ? 'default' : 'accent'} size="sm">+{achievement.points} pts</Badge>
          </div>
          <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{achievement.desc}</p>
        </div>
      </div>

      {!achievement.locked ? (
        <p className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-primary-600">
          <span aria-hidden="true">✓</span> Unlocked {achievement.unlocked}
        </p>
      ) : (
        <div className="mt-3">
          <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-accent-500"
              style={{ width: `${achievement.progress ? Math.round((achievement.progress / 5) * 100) : 0}%` }}
              aria-hidden="true"
            />
          </div>
          <p className="mt-1.5 text-[11px] font-semibold text-gray-400">
            {achievement.progress ? `${achievement.progress}/5 progress` : 'Locked'}
          </p>
        </div>
      )}
    </Card>
  );
}