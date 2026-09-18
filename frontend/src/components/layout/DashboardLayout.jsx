import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiBell, FiMenu } from 'react-icons/fi';

import Sidebar, { SidebarContent } from '@/components/layout/Sidebar';
import BottomNav from '@/components/layout/BottomNav';
import Avatar from '@/components/ui/Avatar';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useAuth } from '@/context/AuthContext';
import { useFarmer } from '@/context/FarmerContext';
import { useNotification } from '@/context/NotificationContext';
import { cn } from '@/utils/cn';

const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/dashboard/field-reports': 'Field Reports',
  '/dashboard/field-reports/new': 'New Field Report',
  '/dashboard/crop-planner': 'Crop Planner',
  '/dashboard/crop-planner/new': 'New Crop Plan',
  '/dashboard/market-prices': "Today's Prices",
  '/dashboard/market-prices/history': 'Historical Prices',
  '/dashboard/market-prices/charts': 'Price Charts',
  '/dashboard/market-prices/nearby': 'Nearby Mandis',
  '/dashboard/market-prices/favorites': 'Favourite Markets',
  '/dashboard/market-prices/compare': 'Compare Prices',
  '/dashboard/consultation': 'Expert List',
  '/dashboard/consultation/expert': 'Expert Profile',
  '/dashboard/consultation/book': 'Book Appointment',
  '/dashboard/consultation/calendar': 'Appointment Calendar',
  '/dashboard/consultation/video': 'Video Call',
  '/dashboard/consultation/chat': 'Expert Chat',
  '/dashboard/consultation/history': 'Consultation History',
  '/dashboard/consultation/ratings': 'Ratings & Reviews',
  '/dashboard/weather': 'Current Weather',
  '/dashboard/weather/hourly': 'Hourly Forecast',
  '/dashboard/weather/7day': '7 Day Forecast',
  '/dashboard/weather/alerts': 'Weather Alerts',
  '/dashboard/weather/rain': 'Rain Prediction',
  '/dashboard/weather/charts': 'Weather Charts',
  '/dashboard/ai-assistant': 'AI Sathi',
  '/dashboard/ai-assistant/advisories': 'Agro Advisories',
  '/dashboard/disease-detection': 'Disease Detection',
  '/dashboard/disease-detection/history': 'Scan History',
  '/dashboard/disease-detection/treatments': 'Treatment Library',
  '/dashboard/disease-detection/alerts': 'Pest Alerts',
  '/dashboard/recommendation': 'Crop Recommendation',
  '/dashboard/recommendation/result': 'Recommendation Result',
  '/dashboard/recommendation/crops': 'Suitable Crops',
  '/dashboard/recommendation/profit': 'Profit Prediction',
  '/dashboard/recommendation/demand': 'Market Demand',
  '/dashboard/recommendation/weather': 'Weather Compatibility',
  '/dashboard/recommendation/soil': 'Soil Compatibility',
  '/dashboard/bazaar': 'Agriculture Store',
  '/dashboard/bazaar/wishlist': 'Wishlist',
  '/dashboard/bazaar/cart': 'My Cart',
  '/dashboard/bazaar/checkout': 'Checkout',
  '/dashboard/bazaar/order-success': 'Order Confirmed',
  '/dashboard/bazaar/my-orders': 'My Orders',
  '/dashboard/marketplace': 'Marketplace',
  '/dashboard/marketplace/listings': 'My Listings',
  '/dashboard/marketplace/sell': 'Sell Crop',
  '/dashboard/marketplace/crop': 'Crop Details',
  '/dashboard/marketplace/offers': 'Buyer Offers',
  '/dashboard/marketplace/deals': 'Accepted Deals',
  '/dashboard/marketplace/transactions': 'Transactions',
  '/dashboard/marketplace/company': 'Company Profile',
  '/dashboard/marketplace/buyer': 'Buyer Profile',
  '/dashboard/soil': 'Book Soil Test',
  '/dashboard/soil/lab': 'Lab Selection',
  '/dashboard/soil/appointment': 'Appointment',
  '/dashboard/soil/report': 'Soil Report',
  '/dashboard/soil/nutrients': 'Nutrients',
  '/dashboard/soil/ph': 'pH Analysis',
  '/dashboard/soil/fertilizer': 'Fertilizer Recommendation',
  '/dashboard/soil/history': 'Soil Test History',
  '/dashboard/soil/charts': 'Soil Charts',
  '/dashboard/logistics': 'Book a Pickup',
  '/dashboard/logistics/track': 'Track Delivery',
  '/dashboard/logistics/vehicle': 'Vehicle Details',
  '/dashboard/logistics/driver': 'Driver Details',
  '/dashboard/logistics/timeline': 'Delivery Timeline',
  '/dashboard/logistics/completed': 'Completed Deliveries',
  '/dashboard/logistics/map': 'Delivery Map',
  '/dashboard/notifications': 'Notification Center',
  '/dashboard/profile': 'My Profile',
  '/dashboard/profile/edit': 'Edit Profile',
  '/dashboard/profile/farm': 'Farm Details',
  '/dashboard/profile/land': 'Land Details',
  '/dashboard/profile/documents': 'Documents',
  '/dashboard/profile/bank': 'Bank Details',
  '/dashboard/profile/crops': 'Crop History',
  '/dashboard/profile/achievements': 'Achievements',
  '/dashboard/profile/settings': 'Settings',
  '/dashboard/admin': 'Admin Dashboard',
  '/dashboard/admin/users': 'Admin · Users',
  '/dashboard/admin/farmers': 'Admin · Farmers',
  '/dashboard/admin/companies': 'Admin · Companies',
  '/dashboard/admin/experts': 'Admin · Experts',
  '/dashboard/admin/products': 'Admin · Products',
  '/dashboard/admin/orders': 'Admin · Orders',
  '/dashboard/admin/marketplace': 'Admin · Marketplace',
  '/dashboard/admin/reports': 'Admin · Reports',
  '/dashboard/admin/analytics': 'Admin · Analytics',
  '/dashboard/admin/notifications': 'Admin · Notifications',
  '/dashboard/admin/settings': 'Admin · Settings',
  '/dashboard/central-schemes': 'Central Government Schemes',
  '/dashboard/state-schemes': 'State Government Schemes',
  '/dashboard/orders': 'My Orders',
  '/dashboard/settings': 'Settings',
};

export default function DashboardLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const { user } = useAuth();
  const { profile } = useFarmer();
  const { unreadCount } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!drawerOpen) return undefined;
    const handleKey = (e) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    const timer = setTimeout(() => drawerRef.current?.focus(), 50);
    return () => {
      document.removeEventListener('keydown', handleKey);
      clearTimeout(timer);
    };
  }, [drawerOpen]);

  const todayLabel = useMemo(
    () =>
      new Date().toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    []
  );
  const title = useMemo(() => {
    if (PAGE_TITLES[location.pathname]) return PAGE_TITLES[location.pathname];
    if (location.pathname.startsWith('/dashboard/bazaar/')) {
      if (location.pathname.includes('/product/')) return 'Product Details';
      if (location.pathname.includes('/order-success/')) return 'Order Confirmed';
      return 'Agriculture Store';
    }
    if (location.pathname.startsWith('/dashboard/marketplace/')) {
      if (location.pathname.includes('/offers/')) return 'Offer Details';
      if (location.pathname.includes('/crop/')) return 'Crop Details';
      if (location.pathname.includes('/company/')) return 'Company Profile';
      if (location.pathname.includes('/buyer/')) return 'Buyer Profile';
      return 'Marketplace';
    }
    if (location.pathname.startsWith('/dashboard/weather/')) return 'Weather';
    if (location.pathname.startsWith('/dashboard/disease-detection/')) return 'Disease Detection';
    if (location.pathname.startsWith('/dashboard/recommendation/')) return 'Crop Recommendation';
    if (location.pathname.startsWith('/dashboard/field-reports/')) return 'Field Reports';
    if (location.pathname.startsWith('/dashboard/crop-planner/')) return 'Crop Planner';
    if (location.pathname.startsWith('/dashboard/ai-assistant/')) return 'AI Sathi';
    if (location.pathname.startsWith('/dashboard/soil/')) return 'Soil Testing';
    if (location.pathname.startsWith('/dashboard/market-prices/')) return 'Mandi Prices';
    if (location.pathname.startsWith('/dashboard/consultation/')) return 'Expert Consultation';
    if (location.pathname.startsWith('/dashboard/logistics/')) return 'Logistics';
    if (location.pathname.startsWith('/dashboard/notifications/')) return 'Notification';
    if (location.pathname.startsWith('/dashboard/profile/')) return 'Farmer Profile';
    if (location.pathname.startsWith('/dashboard/admin/')) return 'Admin';
    return 'Kishan Sathi';
  }, [location.pathname]);

  const displayName = user?.fullName || user?.name || profile?.fullName || 'Farmer';
  const displayRole = user?.role || profile?.role || 'Farmer';

  return (
    <div className="flex min-h-screen bg-primary-50/40">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur">
          <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open sidebar"
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-xl text-xl text-gray-700 lg:hidden"
              >
                <FiMenu aria-hidden="true" />
              </button>
              <div className="min-w-0">
                <p className="hidden text-[11px] font-medium uppercase tracking-wider text-gray-500 sm:block">
                  {todayLabel}
                </p>
                <h1 className="truncate font-display text-lg font-bold text-gray-900" aria-live="polite">
                  {title}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => navigate('/dashboard/notifications')}
                aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
                className="focus-ring relative flex h-10 w-10 items-center justify-center rounded-xl text-xl text-gray-600 transition hover:bg-primary-50 hover:text-primary-700"
              >
                <FiBell aria-hidden="true" />
                {unreadCount > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-white"
                  >
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
              <Link
                to="/dashboard/profile"
                className="focus-ring flex items-center gap-2.5 rounded-xl bg-primary-50/70 p-1.5 pr-3 transition hover:bg-primary-100/80"
                aria-label="View profile"
              >
                <Avatar name={displayName} size="sm" />
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold leading-tight text-gray-900">
                    {displayName}
                  </p>
                  <p className="text-[11px] leading-tight text-gray-500">{displayRole}</p>
                </div>
              </Link>
            </div>
          </div>
        </header>

        <main
          id="main-content"
          className={cn('flex-1 px-4 pb-28 pt-5 sm:px-6 lg:pb-10 lg:pt-6')}
        >
          <Outlet />
        </main>
      </div>

      <BottomNav />

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Sidebar navigation"
              tabIndex={-1}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl outline-none lg:hidden"
            >
              <SidebarContent onClose={() => setDrawerOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}