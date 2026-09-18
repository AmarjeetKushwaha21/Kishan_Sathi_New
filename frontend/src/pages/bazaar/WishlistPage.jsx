import { useNavigate } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import EmptyState from '@/components/ui/EmptyState';
import ProductCard from '@/components/store/ProductCard';
import StoreHeader from '@/components/store/StoreHeader';
import { useStore } from '@/context/StoreContext';

export default function WishlistPage() {
  const { products, wishlist } = useStore();
  const navigate = useNavigate();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <PageTransition>
      <StoreHeader title={`My Wishlist (${items.length})`} />

      {items.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} compact />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-white p-6 shadow-soft">
          <EmptyState
            icon={FiHeart}
            title="Your wishlist is empty"
            description="Tap the heart on any product to save it here for later."
            action
            actionLabel="Browse products"
            onAction={() => navigate('/dashboard/bazaar')}
          />
        </div>
      )}
    </PageTransition>
  );
}