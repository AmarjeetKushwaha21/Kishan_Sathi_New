import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { DELIVERY, PRODUCTS, STORE_CATEGORIES, STORE_SEED_ORDERS } from '@/data/mock/store';

const StoreContext = createContext(null);

const KEYS = {
  wishlist: 'ks_store_wishlist',
  cart: 'ks_store_cart',
  orders: 'ks_store_orders',
};

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

const PRICE_RANGES = [
  { key: 'all', label: 'All prices', min: 0, max: Infinity },
  { key: 'under-500', label: 'Under ₹500', min: 0, max: 500 },
  { key: '500-1500', label: '₹500 – ₹1,500', min: 500, max: 1500 },
  { key: '1500-5000', label: '₹1,500 – ₹5,000', min: 1500, max: 5000 },
  { key: '5000+', label: '₹5,000 & above', min: 5000, max: Infinity },
];

const SORT_OPTIONS = [
  { key: 'featured', label: 'Featured' },
  { key: 'popular', label: 'Most Popular' },
  { key: 'price-asc', label: 'Price: Low to High' },
  { key: 'price-desc', label: 'Price: High to Low' },
  { key: 'rating', label: 'Top Rated' },
];

const INITIAL_FILTERS = {
  category: 'all',
  search: '',
  sort: 'featured',
  priceRange: 'all',
  minRating: 0,
  inStock: false,
  organic: false,
};

function defaultCart() {
  const stored = readStorage(KEYS.cart, []);
  return Array.isArray(stored) ? stored : [];
}

export function StoreProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => readStorage(KEYS.wishlist, []));
  const [cart, setCart] = useState(defaultCart);
  const [orders, setOrders] = useState(() => readStorage(KEYS.orders, STORE_SEED_ORDERS));
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  useEffect(() => {
    localStorage.setItem(KEYS.wishlist, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(KEYS.cart, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(KEYS.orders, JSON.stringify(orders));
  }, [orders]);

  const toggleWishlist = useCallback((productId) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }, []);

  const isWishlisted = useCallback((productId) => wishlist.includes(productId), [wishlist]);

  const addToCart = useCallback((productId, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { productId, qty }];
    });
  }, []);

  const updateQty = useCallback((productId, qty) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((item) => item.productId !== productId)
        : prev.map((item) => (item.productId === productId ? { ...item, qty } : item))
    );
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartItems = useMemo(
    () =>
      cart
        .map((item) => ({ ...item, product: PRODUCTS.find((p) => p.id === item.productId) }))
        .filter((item) => item.product),
    [cart]
  );

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0),
    [cartItems]
  );

  const deliveryFee = subtotal === 0 || subtotal >= DELIVERY.freeAbove ? 0 : DELIVERY.fee;
  const gst = Math.round(subtotal * DELIVERY.gstRate);
  const cartTotal = subtotal + deliveryFee + gst;

  const placeOrder = useCallback(
    ({ address, payment }) => {
      const order = {
        id: `KS-ORD-${Date.now()}`,
        date: new Date().toISOString().slice(0, 10),
        status: 'Placed',
        statusKey: 'placed',
        items: cartItems.map(({ productId, qty, product }) => ({
          productId,
          qty,
          name: product.name,
          price: product.price,
        })),
        subtotal,
        delivery: deliveryFee,
        gst,
        total: cartTotal,
        address,
        payment,
      };
      setOrders((prev) => [order, ...prev]);
      clearCart();
      return order;
    },
    [cartItems, subtotal, deliveryFee, gst, cartTotal, clearCart]
  );

  const filteredProducts = useMemo(() => {
    const range = PRICE_RANGES.find((r) => r.key === filters.priceRange) || PRICE_RANGES[0];
    const query = filters.search.trim().toLowerCase();

    let result = PRODUCTS.filter((product) => {
      if (filters.category !== 'all' && product.categoryKey !== filters.category) return false;
      if (query) {
        const haystack = `${product.name} ${product.brand} ${product.seller} ${product.categoryKey} ${product.description}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      if (product.price < range.min || product.price > range.max) return false;
      if (filters.minRating && product.rating < filters.minRating) return false;
      if (filters.inStock && product.stock <= 0) return false;
      if (filters.organic && !product.organic) return false;
      return true;
    });

    switch (filters.sort) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        result = [...result].sort((a, b) => b.reviews - a.reviews);
        break;
      case 'featured':
      default:
        result = [...result].sort((a, b) => Number(b.featured) - Number(a.featured) || b.reviews - a.reviews);
    }

    return result;
  }, [filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.priceRange !== 'all') count += 1;
    if (filters.minRating > 0) count += 1;
    if (filters.inStock) count += 1;
    if (filters.organic) count += 1;
    if (filters.category !== 'all') count += 1;
    return count;
  }, [filters]);

  const categoryCounts = useMemo(() => {
    const counts = { all: PRODUCTS.length };
    STORE_CATEGORIES.forEach((cat) => {
      counts[cat.key] = PRODUCTS.filter((p) => p.categoryKey === cat.key).length;
    });
    return counts;
  }, []);

  const value = useMemo(
    () => ({
      products: PRODUCTS,
      categories: STORE_CATEGORIES,
      categoryCounts,
      filters,
      setFilters,
      resetFilters: () => setFilters(INITIAL_FILTERS),
      filteredProducts,
      activeFilterCount,
      sortOptions: SORT_OPTIONS,
      priceRanges: PRICE_RANGES,
      wishlist,
      toggleWishlist,
      isWishlisted,
      cartItems,
      cartCount,
      subtotal,
      deliveryFee,
      gst,
      cartTotal,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      orders,
      placeOrder,
      delivery: DELIVERY,
    }),
    [
      categoryCounts,
      filters,
      filteredProducts,
      activeFilterCount,
      wishlist,
      toggleWishlist,
      isWishlisted,
      cartItems,
      cartCount,
      subtotal,
      deliveryFee,
      gst,
      cartTotal,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      orders,
      placeOrder,
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}