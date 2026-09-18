import { useState } from 'react';
import { FiCheckCircle, FiEye, FiUser } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import StatCard from '@/components/ui/StatCard';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminTabs from '@/components/admin/AdminTabs';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import { useAdmin } from '@/context/AdminContext';

export default function AdminFarmers() {
  const { farmers } = useAdmin();
  const [view, setView] = useState('all');

  const filtered = view === 'all' ? farmers : farmers.filter((f) => f.status === view || (view === 'verified' ? f.verified : true));
  const verifiedCount = farmers.filter((f) => f.verified).length;
  const pendingCount = farmers.filter((f) => !f.verified).length;

  const tabs = [
    { id: 'all', label: `All (${farmers.length})` },
    { id: 'verified', label: `Verified (${verifiedCount})` },
    { id: 'pending', label: `Pending (${pendingCount})` },
  ];

  const columns = [
    { key: 'id', label: 'ID', className: 'text-gray-400' },
    { key: 'name', label: 'Farmer', render: (r) => <span className="font-bold text-gray-900">{r.name}</span> },
    { key: 'location', label: 'Location', render: (r) => <span className="text-gray-500">{r.village} · {r.district}</span> },
    { key: 'landArea', label: 'Land', render: (r) => <span className="font-semibold text-gray-700">{r.landArea}</span> },
    { key: 'verified', label: 'KYC', render: (r) => (r.verified ? <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600"><FiCheckCircle aria-hidden="true" /> Verified</span> : <span className="text-xs font-semibold text-accent-600">Pending</span>) },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'lastActive', label: 'Last active', className: 'text-gray-500' },
  ];

  return (
    <PageTransition>
      <AdminHeader title="Farmers" subtitle="Verified grower accounts on the platform" showBack status={`${farmers.length} farmers`} />
      <AdminTabs />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={FiUser} label="Total farmers" value={`${farmers.length}`} color="primary" />
        <StatCard icon={FiCheckCircle} label="KYC verified" value={`${verifiedCount}`} color="sky" />
        <StatCard icon={FiUser} label="KYC pending" value={`${pendingCount}`} color="accent" />
        <StatCard icon={FiUser} label="Active" value={`${farmers.filter((f) => f.status === 'active').length}`} color="violet" />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setView(t.id)}
            className={`focus-ring rounded-full border px-3.5 py-2 text-xs font-bold transition ${view === t.id ? 'border-primary-600 bg-primary-600 text-white shadow-soft' : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-5">
        <DataTable
          columns={columns}
          rows={filtered}
          actions={() => (
            <button type="button" aria-label="View farmer" className="focus-ring flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-primary-300 hover:text-primary-600">
              <FiEye aria-hidden="true" />
            </button>
          )}
        />
      </div>
    </PageTransition>
  );
}