import { Link } from 'react-router-dom';
import { FiCheckCircle, FiClock, FiDownload } from 'react-icons/fi';

import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { useMarketplace } from '@/context/MarketplaceContext';
import { formatINR } from '@/utils/format';

function BuyerLink({ deal }) {
  const to =
    deal.buyerType === 'company'
      ? `/dashboard/marketplace/company/${deal.buyerId}`
      : `/dashboard/marketplace/buyer/${deal.buyerId}`;
  return (
    <Link to={to} className="focus-ring rounded-md font-semibold text-gray-900 hover:text-primary-700">
      {deal.buyerName}
    </Link>
  );
}

export default function DealCard({ deal }) {
  const { markDealPaid } = useMarketplace();
  const paid = deal.paymentStatus === 'received';

  return (
    <article className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 text-2xl dark:from-primary-900/40 dark:to-accent-900/40" aria-hidden="true">
            {deal.emoji}
          </span>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {deal.crop} · {deal.variety}
            </p>
            <p className="text-xs text-gray-500">
              To <BuyerLink deal={deal} /> · {deal.quantity} qtl
            </p>
          </div>
        </div>
        <Badge variant={paid ? 'primary' : 'accent'}>{paid ? 'Payment received' : 'Payment pending'}</Badge>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-xl bg-primary-50/60 px-3.5 py-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Deal value</p>
          <p className="font-display text-lg font-bold text-gray-900">{formatINR(deal.total)}</p>
        </div>
        <div className="text-right text-xs text-gray-500">
          <p>{formatINR(deal.pricePerQuintal)}/qtl</p>
          <p className="text-[11px]">{formatINR(deal.commission)} commission</p>
        </div>
      </div>

      {paid ? (
        <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-primary-600">
          <FiCheckCircle aria-hidden="true" /> Settled on {new Date(`${deal.dealDate}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
        </p>
      ) : (
        <div className="mt-3 flex items-center gap-2">
          <Button size="sm" onClick={() => markDealPaid(deal.id)} leftIcon={FiDownload} className="flex-1">
            Mark payment received
          </Button>
          <span className="inline-flex items-center gap-1 text-xs text-gray-400">
            <FiClock aria-hidden="true" /> Awaiting settlement
          </span>
        </div>
      )}
    </article>
  );
}