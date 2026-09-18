import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiCheck, FiHeart, FiMapPin, FiRefreshCw, FiShield, FiShoppingCart, FiTruck, FiZap } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import RatingStars from '@/components/ui/RatingStars';
import QuantityStepper from '@/components/store/QuantityStepper';
import ProductCard from '@/components/store/ProductCard';
import StoreHeader from '@/components/store/StoreHeader';
import EmptyState from '@/components/ui/EmptyState';
import NotFound from '@/pages/NotFound';
import { useStore } from '@/context/StoreContext';
import { STORE_CATEGORIES } from '@/data/mock/store';
import { formatINR } from '@/utils/format';
import { cn } from '@/utils/cn';

const TABS = [
  { key: 'description', label: 'Description' },
  { key: 'highlights', label: 'Highlights' },
  { key: 'delivery', label: 'Delivery' },
];

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, updateQty, toggleWishlist, isWishlisted, cartItems, delivery } = useStore();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('description');
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === productId);
  if (!product) {
    return <NotFound />;
  }

  const category = STORE_CATEGORIES.find((c) => c.key === product.categoryKey);
  const outOfStock = product.stock <= 0;
  const wishlisted = isWishlisted(product.id);
  const cartLine = cartItems.find((item) => item.productId === product.id);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;
  const related = products.filter((p) => p.categoryKey === product.categoryKey && p.id !== product.id).slice(0, 4);

  function handleAdd() {
    if (outOfStock) return;
    addToCart(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  function handleBuyNow() {
    if (outOfStock) return;
    if (!cartLine) addToCart(product.id, qty);
    navigate('/dashboard/bazaar/checkout');
  }

  return (
    <PageTransition>
      <StoreHeader title="Product Details" showBack />

      <div className="grid gap-6 lg:grid-cols-2">
        <div
          className={cn(
            'relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl shadow-soft',
            product.image ? 'bg-gray-50 dark:bg-gray-800' : cn('bg-gradient-to-br text-9xl sm:text-[10rem]', category?.tint || 'bg-primary-50')
          )}
          aria-label={`${product.name} image`}
        >
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span aria-hidden="true">{product.emoji}</span>
          )}
          {product.badge && (
            <Badge variant="accent" className="absolute left-5 top-5">
              {product.badge}
            </Badge>
          )}
          {discount > 0 && !outOfStock && (
            <span className="absolute right-5 top-5 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-soft">
              {discount}% off
            </span>
          )}
          {product.organic && (
            <Badge variant="primary" className="absolute bottom-5 left-5">
              Organic
            </Badge>
          )}
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
            {category?.label} · {product.brand}
          </p>
          <h1 className="mt-1.5 font-display text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
            {product.name}
          </h1>

          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            <RatingStars rating={product.rating} size="md" />
            <span className="text-sm text-gray-500">·</span>
            <span className="text-sm text-gray-500">{product.reviews} reviews</span>
            <span className="text-sm text-gray-400">· Sold by {product.seller}</span>
          </div>

          <div className="mt-4 flex flex-wrap items-baseline gap-2.5">
            <span className="font-display text-3xl font-bold text-gray-900">{formatINR(product.price)}</span>
            <span className="text-sm text-gray-400">/{product.unit}</span>
            {product.oldPrice && (
              <span className="text-base text-gray-400 line-through">{formatINR(product.oldPrice)}</span>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {outOfStock ? (
              <Badge variant="danger">Out of stock</Badge>
            ) : product.stock <= 10 ? (
              <Badge variant="accent">Only {product.stock} left</Badge>
            ) : (
              <Badge variant="primary">
                <FiCheck aria-hidden="true" /> In stock
              </Badge>
            )}
            <Badge variant="outline">
              <FiTruck aria-hidden="true" /> Free delivery above {formatINR(delivery.freeAbove)}
            </Badge>
          </div>

          <div className="mt-5 rounded-2xl bg-primary-50/60 p-4 text-sm text-gray-600">
            <p className="line-clamp-3 leading-relaxed">{product.description}</p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <QuantityStepper value={cartLine?.qty || qty} onChange={(q) => (cartLine ? updateQty(product.id, q) : setQty(q))} size="lg" disabled={outOfStock} />
            <div className="flex flex-1 flex-col gap-2 sm:flex-row">
              <Button
                variant="outline"
                onClick={handleAdd}
                disabled={outOfStock}
                leftIcon={added ? FiCheck : FiShoppingCart}
                className="sm:flex-1"
              >
                {added ? 'Added!' : cartLine ? 'Add more' : 'Add to Cart'}
              </Button>
              <Button onClick={handleBuyNow} disabled={outOfStock} leftIcon={FiZap} className="sm:flex-1">
                Buy Now
              </Button>
            </div>
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              aria-pressed={wishlisted}
              className={cn(
                'focus-ring flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border text-lg transition',
                wishlisted ? 'border-red-200 bg-red-50 text-red-500' : 'border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-400'
              )}
            >
              <FiHeart className={cn(wishlisted && 'fill-current')} aria-hidden="true" />
            </button>
          </div>

          <ul className="mt-5 grid gap-2.5 text-xs text-gray-500 sm:grid-cols-2">
            <li className="flex items-center gap-2"><FiTruck className="shrink-0 text-primary-600" aria-hidden="true" /> Delivery in {delivery.etaDays} business days</li>
            <li className="flex items-center gap-2"><FiRefreshCw className="shrink-0 text-primary-600" aria-hidden="true" /> Easy 7-day returns</li>
            <li className="flex items-center gap-2"><FiShield className="shrink-0 text-primary-600" aria-hidden="true" /> Genuine products guaranteed</li>
            <li className="flex items-center gap-2"><FiMapPin className="shrink-0 text-primary-600" aria-hidden="true" /> Ships across India</li>
          </ul>
        </div>
      </div>

      <Card variant="soft" className="mt-8">
        <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-gray-100 pb-3" role="tablist" aria-label="Product information">
          {TABS.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                'focus-ring shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition',
                tab === t.key ? 'bg-primary-600 text-white shadow-soft' : 'text-gray-500 hover:bg-primary-50 hover:text-primary-700'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="pt-4" role="tabpanel">
          {tab === 'description' && (
            <div className="space-y-3">
              <p className="text-sm leading-relaxed text-gray-600">{product.description}</p>
              <p className="text-sm leading-relaxed text-gray-600">
                Trusted by farmers across the region, this product is sourced directly from certified manufacturers and
                carries full quality assurance. Apply exactly as per the label instructions for best results.
              </p>
            </div>
          )}
          {tab === 'highlights' && (
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {product.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl bg-primary-50/60 p-3 text-sm text-gray-700">
                  <FiCheck className="mt-0.5 shrink-0 text-primary-600" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          )}
          {tab === 'delivery' && (
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li className="flex items-start gap-2.5"><FiTruck className="mt-0.5 shrink-0 text-primary-600" aria-hidden="true" /> Estimated delivery in {delivery.etaDays} business days after dispatch.</li>
              <li className="flex items-start gap-2.5"><FiRefreshCw className="mt-0.5 shrink-0 text-primary-600" aria-hidden="true" /> 7-day easy return if the product is unused and packaging is intact.</li>
              <li className="flex items-start gap-2.5"><FiMapPin className="mt-0.5 shrink-0 text-primary-600" aria-hidden="true" /> Cash on delivery available on orders up to {formatINR(50000)}.</li>
            </ul>
          )}
        </div>
      </Card>

      <section className="mt-10" aria-labelledby="related-products-title">
        <h2 id="related-products-title" className="mb-4 font-display text-lg font-bold text-gray-900">
          More in {category?.label}
        </h2>
        {related.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} compact />
            ))}
          </div>
        ) : (
          <EmptyState icon={FiShoppingCart} title="No related products" description="Check out the full store for more options." />
        )}
      </section>

      <div className="mt-8">
        <Link to="/dashboard/bazaar" className="focus-ring rounded-xl">
          <Button variant="ghost" leftIcon={FiShoppingCart}>
            Continue shopping
          </Button>
        </Link>
      </div>
    </PageTransition>
  );
}