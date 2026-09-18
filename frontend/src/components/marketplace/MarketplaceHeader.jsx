import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiTrendingDown, FiTrendingUp } from 'react-icons/fi';

import { useMarketplace } from '@/context/MarketplaceContext';
import { formatINR } from '@/utils/format';

export default function MarketplaceHeader({ title, showBack = false, subtitle }) {
  const { wallet } = useMarketplace();
  const navigate = useNavigate();

  return (
    <div className="mb-5 flex flex-wrap items-center gap-3">
      {showBack && (
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-lg text-gray-600 transition hover:text-primary-600"
        >
          <FiArrowLeft aria-hidden="true" />
        </button>
      )}

      <div className="min-w-0 flex-1">
        <h2 className="truncate font-display text-lg font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="truncate text-xs text-gray-500">{subtitle}</p>}
      </div>

      <div className="flex shrink-0 items-center gap-2.5 rounded-2xl border border-gray-200 bg-white px-4 py-2 shadow-soft">
        <div className="text-right">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Wallet</p>
          <p className="font-display text-sm font-bold text-primary-700">{formatINR(wallet.balance)}</p>
        </div>
        <div className="flex flex-col gap-1 text-xs">
          {wallet.pending > 0 && (
            <span className="inline-flex items-center gap-1 font-semibold text-accent-600" title="Pending">
              <FiTrendingUp aria-hidden="true" /> {formatINR(wallet.pending)}
            </span>
          )}
          <span className="inline-flex items-center gap-1 font-semibold text-primary-600" title="Net balance">
            <FiTrendingDown aria-hidden="true" /> Net
          </span>
        </div>
      </div>
    </div>
  );
}