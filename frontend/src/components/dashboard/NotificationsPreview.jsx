import { FiBell, FiCloudDrizzle, FiShoppingBag, FiTrendingUp, FiTruck } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import { NOTIFICATIONS } from '@/data/mock/dashboard';
import { cn } from '@/utils/cn';

const TYPE_ICONS = {
  weather: FiCloudDrizzle,
  price: FiTrendingUp,
  order: FiTruck,
  tip: FiBell,
};

const TYPE_STYLES = {
  weather: 'bg-sky-50 text-sky-600',
  price: 'bg-accent-50 text-accent-600',
  order: 'bg-primary-50 text-primary-600',
  tip: 'bg-violet-50 text-violet-600',
};

export default function NotificationsPreview() {
  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <Card variant="soft" className="flex h-full flex-col">
      <SectionHeader title="Notifications" subtitle={`${unreadCount} unread`} to="/dashboard/notifications" />

      <ul className="flex-1 space-y-2.5">
        {NOTIFICATIONS.map((note) => {
          const Icon = TYPE_ICONS[note.type] || FiBell;
          return (
            <li
              key={note.id}
              className={cn(
                'flex items-start gap-3 rounded-xl border p-3',
                note.unread ? 'border-primary-200 bg-primary-50/50' : 'border-gray-100 bg-white'
              )}
            >
              <span className={cn('mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-base', TYPE_STYLES[note.type])}>
                <Icon aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-gray-900">{note.title}</p>
                  {note.unread && (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-primary-500" aria-label="Unread notification" />
                  )}
                </div>
                <p className="mt-0.5 text-xs leading-relaxed text-gray-600">{note.text}</p>
                <p className="mt-1 text-[10px] font-medium text-gray-400">{note.time}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
        <FiShoppingBag aria-hidden="true" />
        You&apos;re all caught up on market updates
      </p>
    </Card>
  );
}