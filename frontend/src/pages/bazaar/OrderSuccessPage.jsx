import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiCheckCircle, FiHome, FiPackage, FiTruck } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { useStore } from '@/context/StoreContext';
import { formatINR } from '@/utils/format';

export default function OrderSuccessPage() {
  const { orderId } = useParams();
  const { orders, delivery } = useStore();
  const navigate = useNavigate();
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <PageTransition>
        <Card variant="soft">
          <EmptyState
            icon={FiPackage}
            title="Order not found"
            description="We couldn't find that order. Check your order history instead."
            action
            actionLabel="My Orders"
            onAction={() => navigate('/dashboard/bazaar/my-orders')}
          />
        </Card>
      </PageTransition>
    );
  }

  const eta = new Date();
  eta.setDate(eta.getDate() + delivery.etaDays);

  return (
    <PageTransition>
      <div className="mx-auto max-w-2xl">
        <Card variant="soft" className="text-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 text-4xl text-primary-600"
          >
            <FiCheckCircle aria-hidden="true" />
          </motion.div>

          <h1 className="mt-5 font-display text-2xl font-bold text-gray-900">Order placed successfully!</h1>
          <p className="mt-2 text-sm text-gray-500">
            Thank you for shopping with Kishan Sathi. Your order is being prepared.
          </p>

          <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-2">
            <Badge variant="primary">
              <FiPackage aria-hidden="true" /> {order.id}
            </Badge>
            <Badge variant="accent">
              <FiCalendar aria-hidden="true" /> Expected by {eta.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </Badge>
          </div>
        </Card>

        <Card variant="soft" className="mt-5">
          <h2 className="mb-3 font-display text-base font-semibold text-gray-900">Order summary</h2>
          <ul className="space-y-2.5">
            {order.items.map((item) => (
              <li key={item.productId} className="flex items-center justify-between gap-3 text-sm">
                <span className="min-w-0">
                  <span className="block truncate font-medium text-gray-900">{item.name}</span>
                  <span className="block text-xs text-gray-500">Qty {item.qty}</span>
                </span>
                <span className="shrink-0 font-semibold text-gray-900">{formatINR(item.price * item.qty)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t border-gray-100 pt-3 text-sm">
            <div className="flex justify-between py-1 text-gray-500"><span>Subtotal</span><span>{formatINR(order.subtotal)}</span></div>
            <div className="flex justify-between py-1 text-gray-500"><span>Delivery</span><span>{order.delivery === 0 ? 'FREE' : formatINR(order.delivery)}</span></div>
            <div className="flex justify-between py-1 text-gray-500"><span>GST (5%)</span><span>{formatINR(order.gst)}</span></div>
            <div className="mt-2 flex justify-between border-t border-gray-100 pt-3 font-display text-base font-bold text-gray-900">
              <span>Total paid</span><span>{formatINR(order.total)}</span>
            </div>
          </div>
        </Card>

        <Card variant="soft" className="mt-5">
          <h2 className="mb-3 flex items-center gap-2 font-display text-base font-semibold text-gray-900">
            <FiTruck className="text-primary-600" aria-hidden="true" /> Delivery details
          </h2>
          <p className="text-sm font-medium text-gray-900">{order.address.name} · {order.address.phone}</p>
          <p className="mt-0.5 text-sm text-gray-500">
            {order.address.line1}, {order.address.city}, {order.address.state} - {order.address.pincode}
          </p>
          <p className="mt-1 text-sm text-gray-500">Payment: {order.payment}</p>
        </Card>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link to="/dashboard/bazaar/my-orders" className="focus-ring flex-1 rounded-xl">
            <Button fullWidth leftIcon={FiPackage}>
              Track my orders
            </Button>
          </Link>
          <Link to="/dashboard/bazaar" className="focus-ring flex-1 rounded-xl">
            <Button variant="outline" fullWidth leftIcon={FiHome}>
              Continue shopping
            </Button>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}