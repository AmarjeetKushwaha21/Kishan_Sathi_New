import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiArrowRight, FiBellOff, FiCheckSquare, FiEye, FiTrash2 } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import NotificationHeader from '@/components/notifications/NotificationHeader';
import NotificationCard from '@/components/notifications/NotificationCard';
import { CategoryIcon, CategoryDot } from '@/components/notifications/CategoryIcon';
import { useNotification } from '@/context/NotificationContext';
import { categoryLabel, formatTimeAgo } from '@/data/mock/notifications';

export default function NotificationDetails() {
  const { notificationId } = useParams();
  const navigate = useNavigate();
  const { getNotification, toggleRead, removeNotification, notifications } = useNotification();
  const notification = getNotification(notificationId);

  useEffect(() => {
    if (notification && !notification.read) toggleRead(notification.id);
  }, [notification, toggleRead]);

  if (!notification) {
    return (
      <PageTransition>
        <NotificationHeader showBack />
        <EmptyState title="Notification not found" description="This notification may have been removed or cleared." action actionLabel="Back to notifications" onAction={() => navigate('/dashboard/notifications')} />
      </PageTransition>
    );
  }

  const related = notifications.filter((n) => n.category === notification.category && n.id !== notification.id).slice(0, 3);

  return (
    <PageTransition>
      <NotificationHeader title="Notification" subtitle={categoryLabel(notification.category)} showBack />

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_360px]">
        <Card variant="soft" className="p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CategoryIcon category={notification.category} />
              <div>
                <Badge variant="outline" size="sm" className="gap-1">
                  <CategoryDot category={notification.category} /> {categoryLabel(notification.category)}
                </Badge>
                <p className="mt-1.5 text-[11px] font-semibold text-gray-400">{formatTimeAgo(notification.minutesAgo)}</p>
              </div>
            </div>
            {notification.read ? (
              <Badge variant="primary" size="sm" className="gap-1"><FiCheckSquare aria-hidden="true" /> Read</Badge>
            ) : (
              <Badge variant="accent" size="sm" className="gap-1">New</Badge>
            )}
          </div>

          <h3 className="mt-5 font-display text-xl font-bold text-gray-900">{notification.title}</h3>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-gray-600">{notification.body}</p>

          {notification.action && (
            <div className="mt-6">
              <Link to={notification.action.to} className="focus-ring rounded-xl">
                <Button rightIcon={FiArrowRight}>{notification.action.label}</Button>
              </Link>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4">
            <Button variant="outline" size="sm" leftIcon={notification.read ? FiBellOff : FiCheckSquare} onClick={() => toggleRead(notification.id)}>
              {notification.read ? 'Mark as unread' : 'Mark as read'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="!text-red-600 hover:!bg-red-50"
              leftIcon={FiTrash2}
              onClick={() => removeNotification(notification.id)}
            >
              Delete
            </Button>
            <span className="ml-auto hidden text-[11px] text-gray-400 sm:block">
              You will see <FiEye className="mr-0.5 inline" aria-hidden="true" />read state update in the list.
            </span>
          </div>
        </Card>

        {related.length > 0 && (
          <section aria-label="More notifications">
            <div className="mb-2.5 px-1">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-400">More from {categoryLabel(notification.category)}</h3>
            </div>
            <div className="space-y-3">
              {related.map((n) => (
                <NotificationCard key={n.id} notification={n} />
              ))}
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  );
}