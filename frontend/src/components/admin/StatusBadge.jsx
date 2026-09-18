import Badge from '@/components/ui/Badge';

const STATUS_MAP = {
  active: { variant: 'primary', label: 'Active' },
  verified: { variant: 'primary', label: 'Verified' },
  delivered: { variant: 'primary', label: 'Delivered' },
  shipped: { variant: 'sky' },
  placed: { variant: 'sky' },
  open: { variant: 'sky' },
  generated: { variant: 'primary', label: 'Generated' },
  resolved: { variant: 'primary', label: 'Resolved' },
  deal: { variant: 'accent', label: 'Deal' },
  pending: { variant: 'accent', label: 'Pending' },
  inactive: { variant: 'default', label: 'Inactive' },
  draft: { variant: 'default', label: 'Draft' },
  cancelled: { variant: 'default', label: 'Cancelled' },
  closed: { variant: 'default', label: 'Closed' },
  suspended: { variant: 'danger', label: 'Suspended' },
  banned: { variant: 'danger', label: 'Banned' },
  'out-of-stock': { variant: 'danger', label: 'Out of stock' },
  refunded: { variant: 'danger', label: 'Refunded' },
  expired: { variant: 'danger', label: 'Expired' },
  high: { variant: 'danger', label: 'High' },
  medium: { variant: 'accent', label: 'Medium' },
  low: { variant: 'sky', label: 'Low' },
};

const SKY_BADGE = 'bg-sky-100 text-sky-700';

export default function StatusBadge({ status }) {
  const meta = STATUS_MAP[status];
  if (!meta) return <Badge variant="default">{status}</Badge>;
  if (meta.variant === 'sky') return <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${SKY_BADGE}`}>{meta.label || status}</span>;
  return <Badge variant={meta.variant} size="sm">{meta.label || status}</Badge>;
}