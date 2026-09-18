import { FiPackage } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import SectionHeader from '@/components/ui/SectionHeader';
import { ORDERS } from '@/data/mock/dashboard';

const STATUS_STYLES = {
  delivered: { variant: 'primary', label: 'Delivered' },
  transit: { variant: 'accent', label: 'In Transit' },
  placed: { variant: 'outline', label: 'Placed' },
};

export default function OrdersSummary() {
  return (
    <Card variant="soft" className="flex h-full flex-col">
      <SectionHeader title="Recent Orders" subtitle="Your latest buy & sell activity" to="/dashboard/bazaar/my-orders" />

      <ul className="flex-1 space-y-3">
        {ORDERS.map((order) => {
          const status = STATUS_STYLES[order.statusKey];
          return (
            <li key={order.id} className="flex items-center gap-3 rounded-xl border border-gray-100 p-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-lg text-primary-600">
                <FiPackage aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-gray-900">
                    {order.crop} · {order.qty}
                  </p>
                  <Badge variant={status.variant} size="sm">
                    {status.label}
                  </Badge>
                </div>
                <p className="mt-0.5 truncate text-xs text-gray-500">
                  {order.buyer} · {order.date}
                </p>
              </div>
              <p className="shrink-0 text-sm font-bold text-gray-900">{order.amount}</p>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 rounded-lg bg-primary-50/60 px-3 py-2 text-[11px] text-gray-500">
        ₹29,400 payment is being processed for order {ORDERS[0].id}.
      </p>
    </Card>
  );
}