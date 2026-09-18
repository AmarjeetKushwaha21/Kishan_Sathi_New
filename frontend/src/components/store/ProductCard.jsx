import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiShield, FiCheck } from 'react-icons/fi';

import Badge from '@/components/ui/Badge';
import RatingStars from '@/components/ui/RatingStars';
import QuantityStepper from './QuantityStepper';
import { useStore } from '@/context/StoreContext';
import { STORE_CATEGORIES } from '@/data/mock/store';
import { formatINR } from '@/utils/format';
import { cn } from '@/utils/cn';

export default function ProductCard({ product, compact = false }) {
  const { addToCart, updateQty, toggleWishlist, isWishlisted, cartItems } = useStore();
  const [added, setAdded] = useState(false);
  const category = STORE_CATEGORIES.find((c) => c.key === product.categoryKey);
  const wishlisted = isWishlisted(product.id);
  const cartLine = cartItems.find((item) => item.productId === product.id);
  const outOfStock = product.stock <= 0;
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  function handleAdd() {
    if (outOfStock) return;
    addToCart(product.id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 900);
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-card">
      <Link
        to={`/dashboard/bazaar/product/${product.id}`}
        className="focus-ring relative block"
        aria-label={`View ${product.name}`}
      >
        {product.image ? (
          <div
            className={cn(
              'relative w-full overflow-hidden bg-gray-50 dark:bg-gray-800',
              compact ? 'h-36 sm:h-40' : 'h-40 sm:h-48'
            )}
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div
            className={cn(
              'flex items-center justify-center overflow-hidden bg-gradient-to-br transition group-hover:scale-105',
              compact ? 'h-32 text-5xl sm:h-36' : 'h-36 text-6xl sm:h-40',
              category?.tint || 'bg-primary-50'
            )}
          >
            <span aria-hidden="true">{product.emoji}</span>
          </div>
        )}

        {product.badge && (
          <Badge variant={product.organic ? 'primary' : 'accent'} size="sm" className="absolute left-3 top-3 shadow-soft">
            {product.badge}
          </Badge>
        )}
        {product.organic && !product.badge && (
          <Badge variant="primary" size="sm" className="absolute left-3 top-3 shadow-soft">
            Organic
          </Badge>
        )}
        {discount > 0 && !outOfStock && (
          <span className="absolute right-3 top-3 rounded-full bg-red-500 px-2 py-0.5 text-[11px] font-bold text-white shadow-soft">
            {discount}% off
          </span>
        )}
        {outOfStock && (
          <span className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[1px]">
            <span className="rounded-full bg-gray-900 px-4 py-1.5 text-xs font-bold text-white">Out of stock</span>
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{category?.label}</p>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-gray-900">
          <Link to={`/dashboard/bazaar/product/${product.id}`} className="focus-ring rounded-md hover:text-primary-700">
            {product.name}
          </Link>
        </h3>

        <div className="mt-1.5 flex items-center gap-1.5">
          <RatingStars rating={product.rating} />
          <span className="text-[11px] text-gray-400">({product.reviews})</span>
        </div>

        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="font-display text-lg font-bold text-gray-900">{formatINR(product.price)}</span>
          <span className="text-xs text-gray-400">/{product.unit}</span>
          {product.oldPrice && (
            <span className="text-xs text-gray-400 line-through">{formatINR(product.oldPrice)}</span>
          )}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-3">
          {cartLine ? (
            <div className="flex flex-1 items-center justify-between rounded-xl bg-primary-50/70 py-1 pl-3 pr-1">
              <span className="text-xs font-semibold text-primary-700">In cart</span>
              <QuantityStepper size="sm" value={cartLine.qty} onChange={(q) => updateQty(product.id, q)} />
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAdd}
              disabled={outOfStock}
              className="focus-ring flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary-600 py-2 text-xs font-semibold text-white transition hover:bg-primary-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {added ? (
                <>
                  <FiCheck aria-hidden="true" /> Added
                </>
              ) : (
                <>
                  <FiShoppingCart aria-hidden="true" /> Add
                </>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            aria-pressed={wishlisted}
            className={cn(
              'focus-ring flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition',
              wishlisted
                ? 'border-red-200 bg-red-50 text-red-500'
                : 'border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-400'
            )}
          >
            <FiHeart className={cn(wishlisted && 'fill-current')} aria-hidden="true" />
          </button>
        </div>

        {!outOfStock && (
          <p className="mt-2.5 flex items-center gap-1 text-[10px] text-gray-400">
            <FiShield aria-hidden="true" />
            {product.stock <= 10 ? `Only ${product.stock} left in stock` : 'Genuine product · Fast delivery'}
          </p>
        )}
      </div>
    </article>
  );
}