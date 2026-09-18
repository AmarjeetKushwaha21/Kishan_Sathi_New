import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { NOTIFICATION_SEED } from '@/data/mock/notifications';

const NOTIFICATIONS_KEY = 'ks_notifications';

function load() {
  try {
    const stored = JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY));
    if (stored !== null && stored !== undefined) return stored;
  } catch {
    // ignore corrupt storage
  }
  return NOTIFICATION_SEED;
}

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(load);

  useEffect(() => {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
  }, [notifications]);

  const sorted = useMemo(
    () => [...notifications].sort((a, b) => a.minutesAgo - b.minutesAgo),
    [notifications]
  );

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);

  const toggleRead = useCallback((id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const markCategoryRead = useCallback((category) => {
    setNotifications((prev) => prev.map((n) => (n.category === category ? { ...n, read: true } : n)));
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const getNotification = useCallback((id) => sorted.find((n) => n.id === id), [sorted]);

  const value = useMemo(
    () => ({
      notifications: sorted,
      unreadCount,
      hasUnread: unreadCount > 0,
      toggleRead,
      markAllRead,
      markCategoryRead,
      removeNotification,
      clearAll,
      getNotification,
    }),
    [sorted, unreadCount, toggleRead, markAllRead, markCategoryRead, removeNotification, clearAll, getNotification]
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used within a NotificationProvider');
  return ctx;
}