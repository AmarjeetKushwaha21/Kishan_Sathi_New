import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiHeart, FiShoppingCart } from 'react-icons/fi';

import { useStore } from '@/context/StoreContext';
import { cn } from '@/utils/cn';

export default function StoreHeader({ title, showBack = false, right }) {
  const { cartCount, wishlist } = useStore();
  const navigate = useNavigate();

  return (
    <div className="mb-5 flex items-center gap-3">
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
      <h2 className="min-w-0 flex-1 truncate font-display text-lg font-bold text-gray-900">{title}</h2>

      <div className="flex shrink-0 items-center gap-2">
        {right}
        <Link
          to="/dashboard/bazaar/wishlist"
          aria-label={`Wishlist, ${wishlist.length} items`}
          className="focus-ring relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-lg text-gray-600 transition hover:border-red-200 hover:text-red-500"
        >
          <FiHeart aria-hidden="true" />
          {wishlist.length > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              {wishlist.length}
            </span>
          )}
        </Link>
        <Link
          to="/dashboard/bazaar/cart"
          aria-label={`Cart, ${cartCount} items`}
          className={cn(
            'focus-ring relative flex h-10 w-10 items-center justify-center rounded-xl text-lg text-white shadow-soft transition hover:bg-primary-700',
            cartCount > 0 ? 'bg-primary-600' : 'bg-primary-400'
          )}
        >
          <FiShoppingCart aria-hidden="true" />
          {cartCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-400 px-1 text-[10px] font-bold text-primary-950">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}