import { useState } from 'react';
import { FiArrowDownLeft, FiArrowUpRight, FiClock, FiTrendingUp } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Timeline from '@/components/marketplace/Timeline';
import MarketplaceHeader from '@/components/marketplace/MarketplaceHeader';
import { useMarketplace } from '@/context/MarketplaceContext';
import { formatINR } from '@/utils/format';
import { cn } from '@/utils/cn';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'IN', label: 'Received' },
  { key: 'OUT', label: 'Spent' },
];

export default function TransactionHistory() {
  const { transactions, wallet } = useMarketplace();
  const [filter, setFilter] = useState('all');

  const visible = filter === 'all' ? transactions : transactions.filter((t) => t.type === filter);
  const incoming = transactions.filter((t) => t.type === 'IN' && t.status === 'Success').reduce((s, t) => s + t.amount, 0);
  const spent = transactions.filter((t) => t.type === 'OUT' && t.status === 'Success').reduce((s, t) => s + t.amount, 0);

  const ledgerTimeline = visible.map((tx) => ({
    id: tx.id,
    title: tx.description,
    description: `${tx.reference} · ${tx.category}`,
    date: tx.date,
    status: tx.status === 'Success' ? 'done' : 'current',
  }));

  return (
    <PageTransition>
      <MarketplaceHeader title="Transaction History" subtitle="Wallet ledger across all your deals" />

      <section aria-label="Wallet summary" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Card variant="soft" className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Available balance</p>
          <p className="mt-1 font-display text-xl font-bold text-primary-700">{formatINR(wallet.balance)}</p>
        </Card>
        <Card variant="soft" className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Total received</p>
          <p className="mt-1 flex items-center gap-1 font-display text-xl font-bold text-gray-900">
            <FiArrowDownLeft className="text-primary-600" aria-hidden="true" /> {formatINR(incoming)}
          </p>
        </Card>
        <Card variant="soft" className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Total spent</p>
          <p className="mt-1 flex items-center gap-1 font-display text-xl font-bold text-gray-900">
            <FiArrowUpRight className="text-red-500" aria-hidden="true" /> {formatINR(spent)}
          </p>
        </Card>
        <Card variant="soft" className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Pending</p>
          <p className="mt-1 flex items-center gap-1 font-display text-xl font-bold text-accent-600">
            <FiClock aria-hidden="true" /> {formatINR(wallet.pending)}
          </p>
        </Card>
      </section>

      <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Filter transactions">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            role="tab"
            aria-selected={filter === f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              'focus-ring shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition',
              filter === f.key ? 'bg-primary-600 text-white shadow-soft' : 'bg-white text-gray-500 hover:bg-primary-50 hover:text-primary-700'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card variant="soft">
          <Timeline title="Recent transactions" items={ledgerTimeline} />
        </Card>

        <div className="space-y-4">
          <Card variant="tinted">
            <h3 className="mb-3 flex items-center gap-2 font-display text-base font-semibold text-gray-900">
              <FiTrendingUp className="text-primary-600" aria-hidden="true" /> All entries
            </h3>
            <ul className="divide-y divide-gray-100">
              {visible.map((tx) => (
                <li key={tx.id} className="flex items-center gap-3 py-3">
                  <span
                    className={cn(
                      'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm',
                      tx.type === 'IN' ? 'bg-primary-50 text-primary-600' : 'bg-red-50 text-red-500'
                    )}
                  >
                    {tx.type === 'IN' ? <FiArrowDownLeft aria-hidden="true" /> : <FiArrowUpRight aria-hidden="true" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">{tx.category}</p>
                    <p className="truncate text-xs text-gray-400">{tx.reference} · {tx.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={cn('text-sm font-bold', tx.type === 'IN' ? 'text-primary-700' : 'text-red-500')}>
                      {tx.type === 'IN' ? '+' : '−'}{formatINR(tx.amount)}
                    </p>
                    <Badge variant={tx.status === 'Success' ? 'primary' : 'accent'} size="sm">
                      {tx.status}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}