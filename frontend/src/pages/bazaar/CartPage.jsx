import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiShoppingCart, FiTag, FiTrash2, FiTruck } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import QuantityStepper from '@/components/store/QuantityStepper';
import StoreHeader from '@/components/store/StoreHeader';
import { useStore } from '@/context/StoreContext';
import { STORE_CATEGORIES } from '@/data/mock/store';
import { formatINR } from '@/utils/format';

const VALID_COUPONS = {
  KISAN10: { label: '10% off', percent: 0.1, cap: 200 },
  SATHI50: { label: '₹50 off', flat: 50 },
};

function PriceRow({ label, value, bold = false, hint }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className={bold ? 'font-semibold text-gray-900' : 'text-gray-500'}>
        {label}
        {hint && <span className="ml-1 text-xs text-primary-600">{hint}</span>}
      </span>
      <span className={bold ? 'font-display text-base font-bold text-gray-900' : 'text-gray-700'}>{value}</span>
    </div>
  );
}

export default function CartPage() {
  const {
    cartItems,
    updateQty,
    removeFromCart,
    subtotal,
    deliveryFee,
    gst,
    cartTotal,
    delivery,
    cartCount,
  } = useStore();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState('');
  const [applied, setApplied] = useState(null);
  const [couponError, setCouponError] = useState('');

  const discount = applied
    ? applied.flat
      ? Math.min(applied.flat, cartTotal)
      : Math.min(Math.round(subtotal * applied.percent), applied.cap)
    : 0;
  const grandTotal = cartTotal - discount;

  function applyCoupon() {
    const code = coupon.trim().toUpperCase();
    if (applied) {
      setApplied(null);
      setCoupon('');
      setCouponError('');
      return;
    }
    const match = VALID_COUPONS[code];
    if (!match) {
      setCouponError('Invalid coupon code. Try KISAN10 or SATHI50.');
      return;
    }
    setCouponError('');
    setApplied({ code, ...match });
  }

  if (cartItems.length === 0) {
    return (
      <PageTransition>
        <StoreHeader title="My Cart" />
        <div className="rounded-2xl bg-white p-6 shadow-soft">
          <EmptyState
            icon={FiShoppingCart}
            title="Your cart is empty"
            description="Add seeds, fertilisers and tools to start your order."
            action
            actionLabel="Go to store"
            onAction={() => navigate('/dashboard/bazaar')}
          />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <StoreHeader title={`My Cart (${cartCount})`} />

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {cartItems.map(({ product, qty }) => {
            const category = STORE_CATEGORIES.find((c) => c.key === product.categoryKey);
            return (
              <Card key={product.id} variant="soft" className="flex flex-wrap items-center gap-4 p-4 sm:flex-nowrap sm:p-5">
                <Link
                  to={`/dashboard/bazaar/product/${product.id}`}
                  className="focus-ring flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gray-100 text-4xl dark:bg-gray-800"
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
                </Link>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{category?.label}</p>
                  <Link
                    to={`/dashboard/bazaar/product/${product.id}`}
                    className="focus-ring mt-0.5 block truncate rounded-md text-sm font-semibold text-gray-900 hover:text-primary-700"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-0.5 text-sm text-gray-500">
                    <span className="font-bold text-gray-900">{formatINR(product.price)}</span>
                    <span className="text-xs text-gray-400"> /{product.unit}</span>
                    {product.oldPrice && (
                      <span className="ml-2 text-xs text-gray-400 line-through">{formatINR(product.oldPrice)}</span>
                    )}
                  </p>
                </div>

                <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:flex-col sm:items-end">
                  <QuantityStepper value={qty} onChange={(q) => updateQty(product.id, q)} />
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">{formatINR(product.price * qty)}</span>
                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      aria-label={`Remove ${product.name} from cart`}
                      className="focus-ring flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-400 transition hover:border-red-200 hover:text-red-500"
                    >
                      <FiTrash2 aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}

          <Link
            to="/dashboard/bazaar"
            className="focus-ring inline-flex items-center gap-1.5 rounded-xl px-2 py-2 text-sm font-semibold text-primary-600 hover:text-primary-700"
          >
            <FiArrowRight aria-hidden="true" /> Continue shopping
          </Link>
        </div>

        <Card variant="soft" className="lg:sticky lg:top-24">
          <h3 className="mb-3 font-display text-base font-semibold text-gray-900">Price Details</h3>

          <div className="border-b border-gray-100 pb-2">
            <PriceRow label={`Subtotal (${cartCount} items)`} value={formatINR(subtotal)} />
            <PriceRow
              label="Delivery"
              value={deliveryFee === 0 ? <span className="font-semibold text-primary-600">FREE</span> : formatINR(deliveryFee)}
              hint={deliveryFee > 0 ? `Add ${formatINR(delivery.freeAbove - subtotal)} for free delivery` : 'Free above ₹999'}
            />
            <PriceRow label="GST (5%)" value={formatINR(gst)} />
            {applied && (
              <PriceRow
                label={`Coupon ${applied.code} applied`}
                value={<span className="font-semibold text-primary-600">- {formatINR(discount)}</span>}
              />
            )}
          </div>

          <PriceRow label="Total amount" value={formatINR(grandTotal)} bold />

          <div className="mt-4">
            <label htmlFor="coupon" className="mb-1.5 block text-xs font-semibold text-gray-600">
              Apply coupon
            </label>
            <div className="flex gap-2">
              <input
                id="coupon"
                value={coupon}
                onChange={(event) => {
                  setCoupon(event.target.value);
                  if (applied) {
                    setApplied(null);
                    setCouponError('');
                  }
                }}
                placeholder={applied ? `${applied.code} applied` : 'e.g. KISAN10'}
                disabled={Boolean(applied)}
                className="input-base w-full uppercase disabled:bg-primary-50 disabled:text-primary-700"
              />
              <Button
                type="button"
                size="md"
                variant={applied ? 'outline' : 'secondary'}
                onClick={applyCoupon}
                leftIcon={applied ? FiCheckCircle : FiTag}
              >
                {applied ? 'Remove' : 'Apply'}
              </Button>
            </div>
            {couponError ? (
              <p className="mt-1.5 text-xs font-medium text-red-600">{couponError}</p>
            ) : (
              <p className="mt-1.5 text-[11px] text-gray-400">Try KISAN10 (10% off) or SATHI50 (₹50 off)</p>
            )}
          </div>

          <Link to="/dashboard/bazaar/checkout" className="focus-ring mt-4 block rounded-xl">
            <Button size="lg" fullWidth>
              Proceed to Checkout
              <FiArrowRight aria-hidden="true" />
            </Button>
          </Link>

          <div className="mt-4 space-y-2 text-xs text-gray-500">
            <p className="flex items-center gap-2"><FiTruck aria-hidden="true" className="text-primary-600" /> Usually delivered in {delivery.etaDays} days</p>
            <p className="flex items-center gap-2"><FiTag aria-hidden="true" className="text-primary-600" /> Free delivery on orders above ₹999</p>
          </div>
        </Card>
      </div>
    </PageTransition>
  );
}