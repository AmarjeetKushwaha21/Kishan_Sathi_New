import { FiBox, FiDollarSign, FiPackage, FiTag } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Badge from '@/components/ui/Badge';
import StatCard from '@/components/ui/StatCard';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminTabs from '@/components/admin/AdminTabs';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import { useAdmin } from '@/context/AdminContext';
import { formatINR } from '@/utils/format';
import { cn } from '@/utils/cn';

export default function AdminProducts() {
  const { products } = useAdmin();
  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const totalSold = products.reduce((s, p) => s + p.sold, 0);
  const lowStock = products.filter((p) => p.stock > 0 && p.stock < 30).length;

  const columns = [
    { key: 'id', label: 'ID', className: 'text-gray-400' },
    { key: 'name', label: 'Product', render: (r) => <span className="font-bold text-gray-900">{r.name}</span> },
    { key: 'category', label: 'Category', render: (r) => <Badge variant="outline">{r.category}</Badge> },
    { key: 'price', label: 'Price', render: (r) => <span className="font-semibold text-gray-900">{formatINR(r.price)}</span> },
    { key: 'stock', label: 'Stock', render: (r) => (
      <span className={cn('font-semibold', r.stock === 0 ? 'text-red-600' : r.stock < 30 ? 'text-accent-600' : 'text-gray-700')}>
        {r.stock}
      </span>
    ) },
    { key: 'sold', label: 'Sold', className: 'text-gray-500' },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  ];

  return (
    <PageTransition>
      <AdminHeader title="Products" subtitle="Bazaar catalogue and inventory" showBack status={`${products.length} products`} />
      <AdminTabs />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={FiBox} label="Products" value={`${products.length}`} color="primary" />
        <StatCard icon={FiPackage} label="Units in stock" value={totalStock.toLocaleString('en-IN')} color="sky" />
        <StatCard icon={FiTag} label="Units sold" value={totalSold.toLocaleString('en-IN')} color="accent" />
        <StatCard icon={FiDollarSign} label="Low stock" value={`${lowStock}`} color="violet" />
      </div>

      <div className="mt-5">
        <DataTable columns={columns} rows={products} />
      </div>
    </PageTransition>
  );
}