import { FiBriefcase, FiCheckCircle, FiStar, FiUsers } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import StatCard from '@/components/ui/StatCard';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminTabs from '@/components/admin/AdminTabs';
import StatusBadge from '@/components/admin/StatusBadge';
import { useAdmin } from '@/context/AdminContext';

export default function AdminCompanies() {
  const { companies } = useAdmin();
  const verified = companies.filter((c) => c.status === 'active').length;
  const pending = companies.filter((c) => c.status === 'pending').length;
  const avgRating = (companies.reduce((s, c) => s + c.rating, 0) / companies.length).toFixed(1);

  return (
    <PageTransition>
      <AdminHeader title="Companies" subtitle="Registered agri-businesses and buyers" showBack status={`${companies.length} companies`} />
      <AdminTabs />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={FiBriefcase} label="Total companies" value={`${companies.length}`} color="primary" />
        <StatCard icon={FiCheckCircle} label="Active" value={`${verified}`} color="sky" />
        <StatCard icon={FiUsers} label="Pending approval" value={`${pending}`} color="accent" />
        <StatCard icon={FiStar} label="Avg rating" value={avgRating} color="violet" />
      </div>

      <div className="mt-6 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {companies.map((c) => (
          <Card key={c.id} variant="soft" className="p-4">
            <div className="flex items-start justify-between gap-2">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-lg text-primary-600" aria-hidden="true">
                <FiBriefcase />
              </span>
              <StatusBadge status={c.status} />
            </div>
            <h4 className="mt-3 font-display text-base font-bold text-gray-900">{c.name}</h4>
            <p className="text-xs text-gray-500">{c.sector}</p>
            <p className="mt-1 text-xs text-gray-400">{c.location}</p>

            <div className="mt-3 flex items-center justify-between rounded-xl bg-white px-3 py-2 text-xs shadow-soft">
              <span className="text-gray-500"><strong className="text-gray-900">{c.listings}</strong> listings</span>
              <span className="inline-flex items-center gap-1 font-semibold text-gray-700"><FiStar className="text-accent-500" aria-hidden="true" /> {c.rating}</span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              <Badge variant="outline" size="sm">{c.id}</Badge>
              <Badge variant="default" size="sm">{c.sector.split(' ')[0]}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </PageTransition>
  );
}