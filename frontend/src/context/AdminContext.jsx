import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import {
  ADMIN_COMPANIES,
  ADMIN_EXPERTS,
  ADMIN_FARMERS,
  ADMIN_ISSUES,
  ADMIN_LISTINGS,
  ADMIN_NOTIFICATIONS,
  ADMIN_ORDERS,
  ADMIN_PRODUCTS,
  ADMIN_REPORTS,
  ADMIN_SETTINGS,
  ADMIN_USERS,
} from '@/data/mock/admin';

const NOTIFICATIONS_KEY = 'ks_admin_notifications';

function load() {
  try {
    const stored = JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY));
    if (stored !== null && stored !== undefined) return stored;
  } catch {
    // ignore corrupt storage
  }
  return ADMIN_NOTIFICATIONS;
}

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
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

  const value = useMemo(
    () => ({
      users: ADMIN_USERS,
      farmers: ADMIN_FARMERS,
      companies: ADMIN_COMPANIES,
      experts: ADMIN_EXPERTS,
      products: ADMIN_PRODUCTS,
      orders: ADMIN_ORDERS,
      listings: ADMIN_LISTINGS,
      reports: ADMIN_REPORTS,
      issues: ADMIN_ISSUES,
      settings: ADMIN_SETTINGS,
      notifications: sorted,
      unreadCount,
      toggleRead,
      markAllRead,
    }),
    [sorted, unreadCount, toggleRead, markAllRead]
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within an AdminProvider');
  return ctx;
}