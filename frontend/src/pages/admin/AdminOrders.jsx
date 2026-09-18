import { useMemo, useState } from 'react';
import { FiClock, FiCreditCard, FiShoppingCart, FiTruck } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import StatCard from '@/components/ui/StatCard';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminTabs from '@/components/admin/AdminTabs';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import { useAdmin } from '@/context/AdminContext';
import { formatINR } from '@/utils/format';
import { cn } from '@/utils/cn';

const STATUSES = ['all', 'placed', 'shipped', 'delivered', 'cancelled', 'refunded'];

export default function AdminOrders() {
  const { orders } = useAdmin();
  const [status, setStatus] = useState('all');

  const filtered = status === 'all' ? orders : orders.filter((o) => o.status === status);
  const totalRevenue = orders.filter((o) => o.status === 'delivered').reduce((s, o) => s + o.amount, 0);
  const inTransit = orders.filter((o) => o.status === 'placed' || o.status === 'shipped').length;
  const refunds = orders.filter((o) => o.status === 'refunded' || o.status === 'cancelled').length;

  const counts = useMemo(() => {
    const map = { all: orders.length };
    STATUSES.slice(1).forEach((s) => {
      map[s] = orders.filter((o) => o.status === s).length;
    });
    return map;
  }, [orders]);

  const columns = [
    { key: 'id', label: 'Order', render: (r) => <span className="font-bold text-gray-900">{r.id}</span> },
    { key: 'customer', label: 'Customer' },
    { key: 'items', label: 'Items', render: (r) => <span className="font-semibold text-gray-700">{r.items}</span> },
    { key: 'amount', label: 'Amount', render: (r) => <span className="font-bold text-gray-900">{formatINR(r.amount)}</span> },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'date', label: 'Date', className: 'text-gray-500' },
  ];

  return (
    <PageTransition>
      <AdminHeader title="Orders" subtitle="Buy & Sell Bazaar orders" showBack status={`${orders.length} this week`} />
      <AdminTabs />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={FiShoppingCart} label="Total orders" value={`${orders.length}`} color="primary" />
        <StatCard icon={FiCreditCard} label="Delivered revenue" value={formatINR(totalRevenue)} color="accent" />
        <StatCard icon={FiTruck} label="In transit" value={`${inTransit}`} color="sky" />
        <StatCard icon={FiClock} label="Cancelled / refunded" value={`${refunds}`} color="violet" />
      </div>

      <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
        {STATUSES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatus(s)}
            className={cn(
              'focus-ring shrink-0 rounded-full border px-3.5 py-2 text-xs font-bold capitalize transition',
              status === s ? 'border-primary-600 bg-primary-600 text-white shadow-soft' : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
            )}
          >
            {s} ({counts[s]})
          </button>
        ))}
      </div>

      <div className="mt-5">
        <DataTable columns={columns} rows={filtered} actions={(row) => <span className="text-[11px] font-semibold text-gray-400">{row.payment}</span>} />
      </div>
    </PageTransition>
  );
}