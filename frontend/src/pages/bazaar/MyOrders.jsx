import { Link } from 'react-router-dom';
import { FiChevronRight, FiPackage } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import StoreHeader from '@/components/store/StoreHeader';
import { useStore } from '@/context/StoreContext';
import { formatINR } from '@/utils/format';

const STATUS_STYLES = {
  placed: { variant: 'accent', label: 'Placed' },
  transit: { variant: 'primary', label: 'In Transit' },
  delivered: { variant: 'outline', label: 'Delivered' },
};

export default function MyOrders() {
  const { orders } = useStore();

  return (
    <PageTransition>
      <StoreHeader title={`My Orders (${orders.length})`} />

      {orders.length === 0 ? (
        <div className="rounded-2xl bg-white p-6 shadow-soft">
          <EmptyState
            icon={FiPackage}
            title="No orders yet"
            description="Your placed orders will appear here with live tracking."
          />
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = STATUS_STYLES[order.statusKey] || STATUS_STYLES.placed;
            const date = new Date(`${order.date}T00:00:00`);
            return (
              <Card key={order.id} variant="soft" className="p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">{order.id}</span>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>
                  <span className="text-xs text-gray-400">
                    {date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>

                <ul className="mt-3 space-y-2 border-t border-gray-100 pt-3">
                  {order.items.map((item) => (
                    <li key={item.productId} className="flex items-center justify-between gap-3 text-sm">
                      <span className="min-w-0 truncate text-gray-700">
                        {item.name}
                        <span className="text-gray-400"> × {item.qty}</span>
                      </span>
                      <span className="shrink-0 font-semibold text-gray-900">{formatINR(item.price * item.qty)}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-3">
                  <div className="text-sm">
                    <span className="text-gray-500">Total · </span>
                    <span className="font-bold text-gray-900">{formatINR(order.total)}</span>
                    <span className="ml-2 text-xs text-gray-400">({order.payment})</span>
                  </div>
                  <Link
                    to={`/dashboard/bazaar/order-success/${order.id}`}
                    className="focus-ring inline-flex items-center gap-1 rounded-xl text-sm font-semibold text-primary-600 hover:text-primary-700"
                  >
                    View details <FiChevronRight aria-hidden="true" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </PageTransition>
  );
}