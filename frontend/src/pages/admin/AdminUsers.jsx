import { useMemo, useState } from 'react';
import { FiEye, FiUsers } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Badge from '@/components/ui/Badge';
import StatCard from '@/components/ui/StatCard';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminTabs from '@/components/admin/AdminTabs';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import { useAdmin } from '@/context/AdminContext';
import { cn } from '@/utils/cn';

const ROLE_BADGE = {
  Farmer: 'bg-primary-100 text-primary-800',
  Company: 'bg-accent-100 text-accent-800',
  Expert: 'bg-sky-100 text-sky-700',
  Driver: 'bg-violet-100 text-violet-700',
  Admin: 'bg-gray-900 text-white',
};

export default function AdminUsers() {
  const { users } = useAdmin();
  const [role, setRole] = useState('All');
  const [search, setSearch] = useState('');

  const roles = useMemo(() => ['All', ...new Set(users.map((u) => u.role))], [users]);

  const filtered = users.filter((u) => {
    const matchesRole = role === 'All' || u.role === role;
    const q = search.trim().toLowerCase();
    const matchesSearch = !q || u.name.toLowerCase().includes(q) || u.phone.includes(q) || u.id.toLowerCase().includes(q);
    return matchesRole && matchesSearch;
  });

  const activeCount = users.filter((u) => u.status === 'active').length;
  const pendingCount = users.filter((u) => u.status === 'pending').length;
  const bannedCount = users.filter((u) => u.status === 'banned').length;

  const columns = [
    { key: 'id', label: 'ID', className: 'text-gray-400' },
    { key: 'name', label: 'Name', render: (r) => <span className="font-bold text-gray-900">{r.name}</span> },
    { key: 'role', label: 'Role', render: (r) => <Badge variant="default" className={ROLE_BADGE[r.role]}>{r.role}</Badge> },
    { key: 'phone', label: 'Phone', className: 'text-gray-500' },
    { key: 'joined', label: 'Joined', className: 'text-gray-500' },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  ];

  return (
    <PageTransition>
      <AdminHeader title="Users" subtitle={`${users.length} registered accounts`} showBack status={`${activeCount} active`} />
      <AdminTabs />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={FiUsers} label="Total users" value={`${users.length}`} color="primary" />
        <StatCard icon={FiUsers} label="Active" value={`${activeCount}`} color="sky" />
        <StatCard icon={FiUsers} label="Pending" value={`${pendingCount}`} color="accent" />
        <StatCard icon={FiUsers} label="Banned" value={`${bannedCount}`} color="violet" />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {roles.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={cn(
              'focus-ring rounded-full border px-3.5 py-2 text-xs font-bold transition',
              role === r ? 'border-primary-600 bg-primary-600 text-white shadow-soft' : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
            )}
          >
            {r}
          </button>
        ))}
        <input
          type="search"
          aria-label="Search users"
          placeholder="Search name, phone or ID…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-base ml-auto w-full max-w-xs !py-2 text-sm"
        />
      </div>

      <div className="mt-5">
        <DataTable
          columns={columns}
          rows={filtered}
          actions={() => (
            <button type="button" aria-label="View user" className="focus-ring flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-primary-300 hover:text-primary-600">
              <FiEye aria-hidden="true" />
            </button>
          )}
        />
      </div>
    </PageTransition>
  );
}