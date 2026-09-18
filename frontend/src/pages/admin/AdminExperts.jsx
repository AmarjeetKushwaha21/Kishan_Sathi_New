import { FiAward, FiStar, FiUser, FiVideo } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Badge from '@/components/ui/Badge';
import StatCard from '@/components/ui/StatCard';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminTabs from '@/components/admin/AdminTabs';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import { useAdmin } from '@/context/AdminContext';

export default function AdminExperts() {
  const { experts } = useAdmin();
  const verified = experts.filter((e) => e.status === 'verified').length;
  const pending = experts.filter((e) => e.status === 'pending').length;
  const consultations = experts.reduce((s, e) => s + e.consultations, 0);

  const columns = [
    { key: 'id', label: 'ID', className: 'text-gray-400' },
    { key: 'name', label: 'Expert', render: (r) => <span className="font-bold text-gray-900">{r.name}</span> },
    { key: 'specialty', label: 'Specialty', render: (r) => <Badge variant="outline">{r.specialty}</Badge> },
    { key: 'experience', label: 'Exp', render: (r) => <span className="text-gray-600">{r.experience} yrs</span> },
    { key: 'rating', label: 'Rating', render: (r) => <span className="inline-flex items-center gap-1 font-semibold text-gray-700"><FiStar className="text-accent-500" aria-hidden="true" /> {r.rating}</span> },
    { key: 'consultations', label: 'Consultations', render: (r) => <span className="font-semibold text-gray-700">{r.consultations}</span> },
    { key: 'fee', label: 'Fee', className: 'text-gray-500' },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  ];

  return (
    <PageTransition>
      <AdminHeader title="Experts" subtitle="Verified agri-advisors and specialists" showBack status={`${verified} verified`} />
      <AdminTabs />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={FiAward} label="Total experts" value={`${experts.length}`} color="primary" />
        <StatCard icon={FiVideo} label="Consultations" value={consultations.toLocaleString('en-IN')} color="accent" />
        <StatCard icon={FiUser} label="Pending" value={`${pending}`} color="sky" />
        <StatCard icon={FiStar} label="Avg rating" value={(experts.reduce((s, e) => s + e.rating, 0) / experts.length).toFixed(1)} color="violet" />
      </div>

      <div className="mt-5">
        <DataTable
          columns={columns}
          rows={experts}
          actions={(row) =>
            row.status === 'pending' ? (
              <div className="flex justify-end gap-2">
                <span className="rounded-lg bg-primary-50 px-2.5 py-1.5 text-[11px] font-bold text-primary-700">Approve</span>
                <span className="rounded-lg bg-red-50 px-2.5 py-1.5 text-[11px] font-bold text-red-600">Reject</span>
              </div>
            ) : (
              <span className="text-[11px] font-semibold text-gray-400">{row.id}</span>
            )
          }
        />
      </div>
    </PageTransition>
  );
}