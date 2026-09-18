import { useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { FiShoppingBag, FiTag, FiTrendingUp, FiUsers } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import StatCard from '@/components/ui/StatCard';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminTabs from '@/components/admin/AdminTabs';
import AdminChartCard from '@/components/admin/AdminChartCard';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import { useAdmin } from '@/context/AdminContext';
import { TOOLTIP_STYLE } from '@/components/admin/chartTheme';

export default function AdminMarketplace() {
  const { listings } = useAdmin();
  const openCount = listings.filter((l) => l.status === 'open').length;
  const dealCount = listings.filter((l) => l.status === 'deal').length;
  const totalOffers = listings.reduce((s, l) => s + l.offers, 0);

  const statusSplit = useMemo(() => {
    const map = {};
    listings.forEach((l) => {
      map[l.status] = (map[l.status] || 0) + 1;
    });
    const colors = { open: '#16a34a', deal: '#f59e0b', closed: '#94a3b8' };
    return Object.entries(map).map(([name, value]) => ({ name, value, color: colors[name] || '#16a34a' }));
  }, [listings]);

  const columns = [
    { key: 'id', label: 'Listing', render: (r) => <span className="font-bold text-gray-900">{r.id}</span> },
    { key: 'crop', label: 'Crop', render: (r) => <span className="font-semibold text-gray-800">{r.crop}</span> },
    { key: 'quantity', label: 'Qty', className: 'text-gray-500' },
    { key: 'price', label: 'Price' },
    { key: 'farmer', label: 'Farmer' },
    { key: 'company', label: 'Company', className: 'text-gray-500' },
    { key: 'offers', label: 'Offers', render: (r) => <span className="font-bold text-gray-900">{r.offers}</span> },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  ];

  return (
    <PageTransition>
      <AdminHeader title="Marketplace" subtitle="Crop listings and buyer offers" showBack status={`${openCount} open`} />
      <AdminTabs />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={FiShoppingBag} label="Listings" value={`${listings.length}`} color="primary" />
        <StatCard icon={FiTag} label="Open" value={`${openCount}`} color="sky" />
        <StatCard icon={FiTrendingUp} label="Deals closed" value={`${dealCount}`} color="accent" />
        <StatCard icon={FiUsers} label="Offers made" value={`${totalOffers}`} color="violet" />
      </div>

      <AdminChartCard title="Listing status split" subtitle="Open, in deal and closed listings" className="mt-5">
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={statusSplit} dataKey="value" nameKey="name" innerRadius={48} outerRadius={76} paddingAngle={3} strokeWidth={0}>
                {statusSplit.map((s) => (
                  <Cell key={s.name} fill={s.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => `${v} listings`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </AdminChartCard>

      <div className="mt-5">
        <DataTable columns={columns} rows={listings} />
      </div>
    </PageTransition>
  );
}