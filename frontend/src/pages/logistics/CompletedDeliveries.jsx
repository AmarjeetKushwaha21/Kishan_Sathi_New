import { Link } from 'react-router-dom';
import { FiCheckCircle, FiClock, FiRepeat, FiTruck } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import LogisticsHeader from '@/components/logistics/LogisticsHeader';
import DeliveryCard from '@/components/logistics/DeliveryCard';
import { useLogistics } from '@/context/LogisticsContext';

export default function CompletedDeliveries() {
  const { completed, deliveries } = useLogistics();

  const totalFare = deliveries.reduce((sum, d) => sum + d.amount, 0);
  const activeCount = deliveries.filter((d) => d.status === 'in-transit' || d.status === 'scheduled').length;

  if (completed.length === 0) {
    return (
      <PageTransition>
        <LogisticsHeader title="Completed Deliveries" showBack />
        <EmptyState title="No completed deliveries" description="Once a pickup is delivered, it will appear here." />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <LogisticsHeader title="Completed Deliveries" subtitle={`${completed.length} deliveries delivered so far`} showBack />

      <div className="grid gap-4 sm:grid-cols-3">
        <Card variant="soft" className="flex items-center gap-3 p-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-xl text-primary-600"><FiCheckCircle aria-hidden="true" /></span>
          <div>
            <p className="font-display text-xl font-bold text-gray-900">{completed.length}</p>
            <p className="text-xs text-gray-500">Delivered</p>
          </div>
        </Card>
        <Card variant="soft" className="flex items-center gap-3 p-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-50 text-xl text-accent-600"><FiClock aria-hidden="true" /></span>
          <div>
            <p className="font-display text-xl font-bold text-gray-900">{activeCount}</p>
            <p className="text-xs text-gray-500">In transit</p>
          </div>
        </Card>
        <Card variant="soft" className="flex items-center gap-3 p-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-xl text-emerald-600"><FiTruck aria-hidden="true" /></span>
          <div>
            <p className="font-display text-xl font-bold text-gray-900">{deliveries.length}</p>
            <p className="text-xs text-gray-500">Total trips</p>
          </div>
        </Card>
      </div>

      <div className="mt-5 space-y-3">
        {completed.map((d) => (
          <DeliveryCard key={d.id} delivery={d} />
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-primary-200 bg-primary-50/60 p-4 text-center">
        <p className="text-sm text-gray-600">
          Spent <strong className="font-display text-lg font-bold text-primary-700">{totalFare ? `₹${totalFare.toLocaleString('en-IN')}` : '₹0'}</strong> on logistics across all trips.
        </p>
        <Link to="/dashboard/logistics" className="focus-ring mt-3 inline-block rounded-xl">
          <Button size="sm" leftIcon={FiRepeat}>Book another pickup</Button>
        </Link>
        <Badge variant="outline" className="ml-2">5% cashback on UPI payments</Badge>
      </div>
    </PageTransition>
  );
}