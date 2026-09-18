import { useMemo, useState } from 'react';
import { FiBell, FiCheckCircle, FiClock } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import NotificationHeader from '@/components/notifications/NotificationHeader';
import CategoryFilter from '@/components/notifications/CategoryFilter';
import NotificationCard from '@/components/notifications/NotificationCard';
import { useNotification } from '@/context/NotificationContext';
import { groupNotifications, NOTIFICATION_CATEGORIES } from '@/data/mock/notifications';

export default function NotificationCenter() {
  const { notifications, unreadCount, markAllRead, clearAll } = useNotification();
  const [filter, setFilter] = useState('all');

  const counts = useMemo(() => {
    const map = {};
    NOTIFICATION_CATEGORIES.forEach((c) => {
      const items = notifications.filter((n) => n.category === c.id);
      map[c.id] = { total: items.length, unread: items.filter((n) => !n.read).length };
    });
    return map;
  }, [notifications]);

  const filtered = useMemo(
    () => (filter === 'all' ? notifications : notifications.filter((n) => n.category === filter)),
    [notifications, filter]
  );

  const groups = useMemo(() => groupNotifications(filtered), [filtered]);
  const weatherUnread = counts.weather?.unread || 0;

  return (
    <PageTransition>
      <NotificationHeader
        subtitle={unreadCount ? `${unreadCount} unread · ${notifications.length} total` : 'You are all caught up'}
        unreadCount={unreadCount}
        onMarkAllRead={markAllRead}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Card variant="soft" className="flex items-center gap-3 p-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-xl text-primary-600"><FiBell aria-hidden="true" /></span>
          <div>
            <p className="font-display text-xl font-bold text-gray-900">{notifications.length}</p>
            <p className="text-xs text-gray-500">Total notifications</p>
          </div>
        </Card>
        <Card variant="soft" className="flex items-center gap-3 p-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-50 text-xl text-accent-600"><FiClock aria-hidden="true" /></span>
          <div>
            <p className="font-display text-xl font-bold text-gray-900">{unreadCount}</p>
            <p className="text-xs text-gray-500">Unread</p>
          </div>
        </Card>
        <Card variant="soft" className="flex items-center gap-3 p-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-xl text-sky-600"><FiCheckCircle aria-hidden="true" /></span>
          <div>
            <p className="font-display text-xl font-bold text-gray-900">{weatherUnread}</p>
            <p className="text-xs text-gray-500">Weather alerts unread</p>
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <CategoryFilter active={filter} counts={counts} onChange={setFilter} />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title={filter === 'all' ? 'No notifications yet' : 'Nothing here'}
          description={filter === 'all' ? 'Weather alerts, order updates, offers and messages will appear here.' : 'No notifications in this category right now.'}
        />
      ) : (
        <div className="space-y-6">
          {groups.map(([label, items]) => (
            <section key={label} aria-label={label}>
              <div className="mb-2.5 flex items-center gap-2 px-1">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{label}</h3>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-500">{items.length}</span>
              </div>
              <div className="space-y-3">
                {items.map((n) => (
                  <NotificationCard key={n.id} notification={n} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {notifications.length > 0 && (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3">
          <p className="text-xs text-gray-500">
            Notifications are saved on this device. Tap any card to open full details.
          </p>
          <button
            type="button"
            onClick={() => {
              clearAll();
              setFilter('all');
            }}
            className="focus-ring rounded-lg px-2 py-1 text-xs font-bold text-red-600 transition hover:bg-red-50"
          >
            Clear all notifications
          </button>
        </div>
      )}
    </PageTransition>
  );
}