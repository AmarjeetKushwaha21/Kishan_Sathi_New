import { FiAlertTriangle, FiDownload, FiFileText, FiTrendingUp, FiUsers } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import StatCard from '@/components/ui/StatCard';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminTabs from '@/components/admin/AdminTabs';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import { useAdmin } from '@/context/AdminContext';

export default function AdminReports() {
  const { reports, issues } = useAdmin();
  const generated = reports.filter((r) => r.status === 'generated').length;
  const openIssues = issues.filter((i) => i.status === 'open').length;
  const highPriority = issues.filter((i) => i.priority === 'high').length;

  const issueColumns = [
    { key: 'id', label: 'ID', className: 'text-gray-400' },
    { key: 'from', label: 'Reported by', render: (r) => <span className="font-bold text-gray-900">{r.from}</span> },
    { key: 'subject', label: 'Subject', render: (r) => <span className="text-gray-600">{r.subject}</span> },
    { key: 'priority', label: 'Priority', render: (r) => <StatusBadge status={r.priority} /> },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'date', label: 'Date', className: 'text-gray-500' },
  ];

  return (
    <PageTransition>
      <AdminHeader title="Reports" subtitle="Generated reports and open issues" showBack status={`${generated} generated`} />
      <AdminTabs />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={FiFileText} label="Reports" value={`${reports.length}`} color="primary" />
        <StatCard icon={FiTrendingUp} label="Generated" value={`${generated}`} color="sky" />
        <StatCard icon={FiAlertTriangle} label="Open issues" value={`${openIssues}`} color="accent" />
        <StatCard icon={FiUsers} label="High priority" value={`${highPriority}`} color="violet" />
      </div>

      <div className="mt-6 grid items-start gap-4 sm:grid-cols-2">
        {reports.map((r) => (
          <Card key={r.id} variant="soft" className="p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-lg text-primary-600" aria-hidden="true">
                <FiFileText />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="truncate font-display text-sm font-bold text-gray-900">{r.title}</h4>
                  <Badge variant="outline" size="sm">{r.type}</Badge>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">{r.summary}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">{r.date}</span>
                  <button
                    type="button"
                    aria-label={`Download ${r.title}`}
                    className="focus-ring inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-[11px] font-bold text-gray-600 transition hover:border-primary-300 hover:text-primary-600"
                  >
                    <FiDownload aria-hidden="true" /> Download
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <h3 className="mb-3 mt-8 text-[11px] font-bold uppercase tracking-wider text-gray-400">Open issues & complaints</h3>
      <DataTable columns={issueColumns} rows={issues} />
    </PageTransition>
  );
}