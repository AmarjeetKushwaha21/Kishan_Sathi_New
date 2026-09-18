import { FiCreditCard, FiDroplet, FiDownload, FiFileText, FiMap, FiShield, FiTag, FiUser } from 'react-icons/fi';

import Badge from '@/components/ui/Badge';
import { cn } from '@/utils/cn';

const TYPE_ICONS = {
  'Land record': FiMap,
  Identity: FiUser,
  Tax: FiFileText,
  'Soil test': FiDroplet,
  Bank: FiCreditCard,
  Insurance: FiShield,
  Dealer: FiTag,
};

const STATUS_BADGE = {
  verified: { variant: 'primary', label: 'Verified' },
  pending: { variant: 'accent', label: 'Pending' },
  expired: { variant: 'danger', label: 'Expired' },
};

export default function DocumentRow({ document: doc }) {
  const Icon = TYPE_ICONS[doc.type] || FiFileText;
  const badge = STATUS_BADGE[doc.status] || STATUS_BADGE.pending;

  return (
    <div className="flex items-center gap-3 rounded-xl bg-white px-3 py-3 shadow-soft">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-lg text-primary-600" aria-hidden="true">
        <Icon />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-gray-900">{doc.name}</p>
        <p className="truncate text-[11px] text-gray-400">{doc.type} · {doc.ref} · {doc.updated}</p>
      </div>
      <Badge variant={badge.variant} size="sm" className={cn(doc.status === 'expired' && 'opacity-80')}>{badge.label}</Badge>
      <button
        type="button"
        aria-label={`Download ${doc.name}`}
        className="focus-ring flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-primary-300 hover:text-primary-600"
      >
        <FiDownload aria-hidden="true" />
      </button>
    </div>
  );
}