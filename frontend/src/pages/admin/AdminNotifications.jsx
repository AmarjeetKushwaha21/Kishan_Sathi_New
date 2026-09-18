import { useMemo, useState } from 'react';
import { FiCheckSquare, FiFileText, FiSettings, FiShoppingCart, FiUsers } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import AdminHeader from '@/components/admin/AdminHeader';
import { useAdmin } from '@/context/AdminContext';
import { formatTimeAgo } from '@/data/mock/notifications';
import { cn } from '@/utils/cn';

const CATEGORY_META = {
  system: { label: 'System', icon: FiSettings, soft: 'bg-gray-100 text-gray-600', dot: 'bg-gray-500' },
  order: { label: 'Orders', icon: FiShoppingCart, soft: 'bg-emerald-100 text-emerald-600', dot: 'bg-emerald-500' },
  user: { label: 'Users', icon: FiUsers, soft: 'bg-sky-100 text-sky-600', dot: 'bg-sky-500' },
  report: { label: 'Reports', icon: FiFileText, soft: 'bg-accent-100 text-accent-600', dot: 'bg-accent-500' },
};

export default function AdminNotifications() {
  const { notifications, unreadCount, toggleRead, markAllRead } = useAdmin();
  const [filter, setFilter] = useState('all');

  const categories = useMemo(() => ['all', ...new Set(notifications.map((n) => n.category))], [notifications]);

  const filtered = filter === 'all' ? notifications : notifications.filter((n) => n.category === filter);

  return (
    <PageTransition>
      <AdminHeader
        title="Notifications"
        subtitle={unreadCount ? `${unreadCount} unread` : 'All caught up'}
        showBack
        status="Admin feed"
      />

      {unreadCount > 0 && (
        <button
          type="button"
          onClick={markAllRead}
          className="focus-ring mb-4 inline-flex items-center gap-1.5 rounded-xl border border-primary-300 bg-white px-3.5 py-2 text-xs font-bold text-primary-700 transition hover:bg-primary-50"
        >
          <FiCheckSquare aria-hidden="true" /> Mark all read
        </button>
      )}

      <div className="no-scrollbar mb-5 flex gap-2 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={cn(
              'focus-ring shrink-0 rounded-full border px-3.5 py-2 text-xs font-bold capitalize transition',
              filter === c ? 'border-primary-600 bg-primary-600 text-white shadow-soft' : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No notifications" description="New admin notifications will appear here." />
      ) : (
        <div className="space-y-3">
          {filtered.map((n) => {
            const meta = CATEGORY_META[n.category] || CATEGORY_META.system;
            const Icon = meta.icon;
            return (
              <Card
                key={n.id}
                variant="soft"
                className={cn('flex items-start gap-3 p-4', !n.read && 'border-l-4 border-l-primary-500')}
              >
                <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-lg', meta.soft)} aria-hidden="true">
                  <Icon />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className={cn('font-display text-sm', n.read ? 'font-semibold text-gray-600' : 'font-bold text-gray-900')}>{n.title}</h4>
                    <Badge variant="outline" size="sm">{meta.label}</Badge>
                    {!n.read && <Badge variant="accent" size="sm">New</Badge>}
                  </div>
                  <p className={cn('mt-1 text-xs leading-relaxed', n.read ? 'text-gray-400' : 'text-gray-600')}>{n.body}</p>
                  <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-gray-400">
                    <span className={cn('h-1.5 w-1.5 rounded-full', n.read ? 'bg-gray-300' : 'bg-primary-500')} aria-hidden="true" />
                    {formatTimeAgo(n.minutesAgo)}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleRead(n.id)}
                  aria-label={n.read ? 'Mark as unread' : 'Mark as read'}
                  className="focus-ring shrink-0 rounded-lg px-2 py-1 text-[11px] font-bold text-primary-600 transition hover:bg-primary-50"
                >
                  {n.read ? 'Unread' : 'Read'}
                </button>
              </Card>
            );
          })}
        </div>
      )}
    </PageTransition>
  );
}