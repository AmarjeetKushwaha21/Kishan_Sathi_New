import { useEffect, useState } from 'react';
import { FiBell, FiCheckCircle, FiClock, FiTruck, FiShoppingBag, FiInfo } from 'react-icons/fi';
import companyService from '../services/companyService';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    companyService.getNotifications().then(setNotifications);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const filtered = notifications.filter((n) => {
    if (activeFilter === 'all') return true;
    return n.type === activeFilter;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'bid':
        return <FiCheckCircle className="text-green-600 dark:text-green-400" />;
      case 'order':
        return <FiShoppingBag className="text-blue-600 dark:text-blue-400" />;
      case 'logistics':
        return <FiTruck className="text-amber-600 dark:text-amber-400" />;
      default:
        return <FiInfo className="text-purple-600 dark:text-purple-400" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col justify-between gap-4 border-b border-gray-200 pb-5 dark:border-gray-800 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Notifications Center
          </h1>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
            Real-time updates regarding your procurement bids, shipments, and market notices.
          </p>
        </div>

        <button
          type="button"
          onClick={markAllRead}
          className="text-xs font-bold text-primary-600 hover:text-primary-700 dark:text-primary-400"
        >
          Mark all as read
        </button>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 text-xs font-semibold">
        {['all', 'bid', 'order', 'listing', 'logistics'].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActiveFilter(f)}
            className={`rounded-xl px-3.5 py-1.5 capitalize transition ${
              activeFilter === f
                ? 'bg-primary-600 text-white shadow-soft'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 dark:bg-gray-850 dark:border-gray-800 dark:text-gray-300'
            }`}
          >
            {f === 'all' ? 'All Alerts' : f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((n) => (
          <div
            key={n.id}
            className={`flex items-start gap-4 rounded-2xl border p-4 shadow-sm transition ${
              n.read
                ? 'border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900'
                : 'border-primary-200 bg-primary-50/40 dark:border-primary-900/60 dark:bg-primary-950/30'
            }`}
          >
            <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm dark:bg-gray-800">
              {getIcon(n.type)}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white">
                  {n.title}
                </h3>
                <span className="text-[10px] text-gray-400">{n.time}</span>
              </div>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">{n.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
