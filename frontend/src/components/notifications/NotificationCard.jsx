import { useNavigate } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import { CategoryIcon } from '@/components/notifications/CategoryIcon';
import { useNotification } from '@/context/NotificationContext';
import { formatTimeAgo } from '@/data/mock/notifications';
import { cn } from '@/utils/cn';

export default function NotificationCard({ notification }) {
  const navigate = useNavigate();
  const { toggleRead } = useNotification();

  function open() {
    if (!notification.read) toggleRead(notification.id);
    navigate(`/dashboard/notifications/${notification.id}`);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      open();
    }
  }

  return (
    <Card
      variant="soft"
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={handleKeyDown}
      className={cn(
        'cursor-pointer p-3.5 transition hover:-translate-y-0.5 hover:shadow-card focus-visible:ring-4 focus-visible:ring-primary-500/30 sm:p-4',
        !notification.read && 'border-l-4 border-l-primary-500'
      )}
    >
      <div className="flex items-start gap-3">
        <CategoryIcon category={notification.category} />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h4 className={cn('font-display text-sm', notification.read ? 'font-semibold text-gray-600' : 'font-bold text-gray-900')}>
              {notification.title}
            </h4>
            <FiChevronRight className="mt-0.5 shrink-0 text-gray-300" aria-hidden="true" />
          </div>
          <p className={cn('mt-0.5 line-clamp-2 text-xs leading-relaxed', notification.read ? 'text-gray-400' : 'text-gray-500')}>
            {notification.body}
          </p>
          <p className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-gray-500">
            <span className={cn('h-1.5 w-1.5 rounded-full', notification.read ? 'bg-gray-300' : 'bg-primary-500')} aria-hidden="true" />
            {formatTimeAgo(notification.minutesAgo)}
            {!notification.read && <span className="font-bold text-primary-600">New</span>}
          </p>
        </div>
      </div>
    </Card>
  );
}