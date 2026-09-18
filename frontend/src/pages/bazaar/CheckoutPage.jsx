import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiCheckCircle, FiCreditCard, FiDollarSign, FiMapPin, FiSmartphone, FiTruck, FiZap } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import StoreHeader from '@/components/store/StoreHeader';
import EmptyState from '@/components/ui/EmptyState';
import { useStore } from '@/context/StoreContext';
import { useFarmer } from '@/context/FarmerContext';
import { formatINR } from '@/utils/format';
import { cn } from '@/utils/cn';

const PAYMENT_METHODS = [
  { key: 'cod', label: 'Cash on Delivery', icon: FiDollarSign, hint: 'Pay in cash when your order arrives' },
  { key: 'upi', label: 'UPI', icon: FiSmartphone, hint: 'GPay, PhonePe, Paytm & more' },
  { key: 'card', label: 'Credit / Debit Card', icon: FiCreditCard, hint: 'Visa, Mastercard, RuPay' },
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, subtotal, deliveryFee, gst, cartTotal, delivery, placeOrder } = useStore();
  const { profile } = useFarmer();
  const [payment, setPayment] = useState('upi');
  const [serverError, setServerError] = useState(null);
  const [placing, setPlacing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: profile?.fullName || 'Farmer',
      phone: profile?.phone?.replace(/\D/g, '').slice(-10) || '',
      line1: profile?.village ? `${profile.village}, Ludhiana` : 'Village Gaddowal, Ludhiana',
      city: profile?.district || 'Ludhiana',
      state: profile?.state || 'Punjab',
      pincode: profile?.pincode || '141116',
    },
  });

  if (cartItems.length === 0) {
    return (
      <PageTransition>
        <StoreHeader title="Checkout" />
        <div className="rounded-2xl bg-white p-6 shadow-soft">
          <EmptyState
            icon={FiCheckCircle}
            title="Nothing to check out"
            description="Your cart is empty. Add some products first."
            action
            actionLabel="Go to store"
            onAction={() => navigate('/dashboard/bazaar')}
          />
        </div>
      </PageTransition>
    );
  }

  async function onSubmit(data) {
    setServerError(null);
    setPlacing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      const order = placeOrder({
        address: {
          name: data.name,
          phone: `+91 ${data.phone}`,
          line1: data.line1,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
        },
        payment: PAYMENT_METHODS.find((m) => m.key === payment)?.label,
      });
      navigate(`/dashboard/bazaar/order-success/${order.id}`, { replace: true });
    } catch (error) {
      setServerError(error.message);
    } finally {
      setPlacing(false);
    }
  }

  return (
    <PageTransition>
      <StoreHeader title="Checkout" showBack />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid items-start gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card variant="soft">
            <h3 className="mb-4 flex items-center gap-2 font-display text-base font-semibold text-gray-900">
              <FiMapPin className="text-primary-600" aria-hidden="true" />
              Delivery Address
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Full name" required autoComplete="name" error={errors.name?.message}
                {...register('name', { required: 'Name is required', minLength: { value: 3, message: 'Enter a valid name' } })} />
              <Input label="Mobile number" inputMode="numeric" required autoComplete="tel" error={errors.phone?.message}
                {...register('phone', { required: 'Mobile number is required', pattern: { value: /^[0-9]{10}$/, message: 'Enter a valid 10-digit number' } })} />
              <Input label="Address" className="sm:col-span-2" required autoComplete="street-address" error={errors.line1?.message}
                {...register('line1', { required: 'Address is required' })} />
              <Input label="City" required error={errors.city?.message}
                {...register('city', { required: 'City is required' })} />
              <Input label="State" required error={errors.state?.message}
                {...register('state', { required: 'State is required' })} />
              <Input label="PIN code" inputMode="numeric" required autoComplete="postal-code" error={errors.pincode?.message}
                {...register('pincode', { required: 'PIN code is required', pattern: { value: /^[0-9]{6}$/, message: 'Enter a valid 6-digit PIN' } })} />
            </div>
          </Card>

          <Card variant="soft">
            <h3 className="mb-4 flex items-center gap-2 font-display text-base font-semibold text-gray-900">
              <FiCreditCard className="text-primary-600" aria-hidden="true" />
              Payment Method
            </h3>
            <div role="radiogroup" aria-label="Payment method" className="space-y-2.5">
              {PAYMENT_METHODS.map((method) => {
                const selected = payment === method.key;
                return (
                  <button
                    key={method.key}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setPayment(method.key)}
                    className={cn(
                      'focus-ring flex w-full items-center gap-3 rounded-2xl border-2 p-4 text-left transition',
                      selected ? 'border-primary-500 bg-primary-50/50' : 'border-gray-200 bg-white hover:border-primary-200'
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg',
                        selected ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-500'
                      )}
                    >
                      <method.icon aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-gray-900">{method.label}</span>
                      <span className="block text-xs text-gray-500">{method.hint}</span>
                    </span>
                    <span
                      className={cn(
                        'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2',
                        selected ? 'border-primary-600' : 'border-gray-300'
                      )}
                      aria-hidden="true"
                    >
                      {selected && <span className="h-2.5 w-2.5 rounded-full bg-primary-600" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        <Card variant="soft" className="lg:sticky lg:top-24">
          <h3 className="mb-3 font-display text-base font-semibold text-gray-900">Order Summary</h3>

          <ul className="max-h-56 space-y-2.5 overflow-y-auto pr-1">
            {cartItems.map(({ product, qty }) => (
              <li key={product.id} className="flex items-center gap-3 text-sm">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-10 w-10 shrink-0 rounded-xl object-cover ring-1 ring-black/5"
                  />
                ) : (
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-xl" aria-hidden="true">
                    {product.emoji}
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium text-gray-900">{product.name}</span>
                  <span className="block text-xs text-gray-500">Qty {qty}</span>
                </span>
                <span className="shrink-0 font-semibold text-gray-900">{formatINR(product.price * qty)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t border-gray-100 pt-3">
            <div className="flex justify-between py-1 text-sm text-gray-500">
              <span>Subtotal</span><span>{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between py-1 text-sm text-gray-500">
              <span>Delivery</span>
              <span className={deliveryFee === 0 ? 'font-semibold text-primary-600' : ''}>{deliveryFee === 0 ? 'FREE' : formatINR(deliveryFee)}</span>
            </div>
            <div className="flex justify-between py-1 text-sm text-gray-500">
              <span>GST (5%)</span><span>{formatINR(gst)}</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-gray-100 pt-3 font-display text-base font-bold text-gray-900">
              <span>Total</span><span>{formatINR(cartTotal)}</span>
            </div>
          </div>

          {serverError && <Alert variant="error" className="mt-3">{serverError}</Alert>}

          <Button type="submit" size="lg" fullWidth loading={placing} leftIcon={FiZap} className="mt-4">
            {placing ? 'Placing order…' : `Place Order · ${formatINR(cartTotal)}`}
          </Button>

          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-gray-400">
            <FiTruck aria-hidden="true" /> Delivered in {delivery.etaDays} days · Easy 7-day returns
          </p>
          <Link to="/dashboard/bazaar/cart" className="focus-ring mt-3 block rounded-xl">
            <Button variant="ghost" fullWidth>Back to cart</Button>
          </Link>
        </Card>
      </form>
    </PageTransition>
  );
}