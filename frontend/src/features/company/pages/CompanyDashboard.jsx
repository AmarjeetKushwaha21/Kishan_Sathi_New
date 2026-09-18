import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiDollarSign,
  FiShoppingBag,
  FiClock,
  FiCheckCircle,
  FiTrendingUp,
  FiArrowRight,
  FiEye,
  FiPlusCircle,
  FiBell,
} from 'react-icons/fi';
import companyService from '../services/companyService';
import cropService from '../services/cropService';
import bidService from '../services/bidService';
import orderService from '../services/orderService';
import PlaceBidModal from '../components/PlaceBidModal';

export default function CompanyDashboard() {
  const [stats, setStats] = useState(null);
  const [recentCrops, setRecentCrops] = useState([]);
  const [activeBids, setActiveBids] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [marketTrends, setMarketTrends] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedCropForBid, setSelectedCropForBid] = useState(null);

  useEffect(() => {
    companyService.getDashboardStats().then(setStats);
    cropService.getCrops().then((list) => setRecentCrops(list.slice(0, 4)));
    bidService.getBids().then((bids) => setActiveBids(bids.slice(0, 4)));
    orderService.getOrders().then((orders) => setRecentOrders(orders.slice(0, 4)));
    companyService.getMarketOverview().then(setMarketTrends);
    companyService.getNotifications().then((notifs) => setNotifications(notifs.slice(0, 3)));
  }, []);

  const getBidStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300';
      case 'accepted':
        return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/50 dark:text-green-300';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getOrderStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
      case 'delivered':
        return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/50 dark:text-green-300';
      case 'shipped':
      case 'processing':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300';
      case 'pending':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Title & Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-gray-200 pb-5 dark:border-gray-800 sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-950/60 dark:text-primary-300">
            <span>Corporate Procurement Operations</span>
          </div>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Company Dashboard
          </h1>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
            Manage procurement, purchases and your agricultural supply chain.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/company/crops"
            className="focus-ring inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-xs font-semibold text-white shadow-soft transition hover:bg-primary-700 sm:text-sm"
          >
            <FiPlusCircle className="text-sm" />
            <span>Procure New Crops</span>
          </Link>
        </div>
      </div>

      {/* 5 Statistics Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
            <span className="text-xs font-semibold">Total Purchases</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-950/60 dark:text-primary-300">
              <FiDollarSign className="text-base" />
            </div>
          </div>
          <p className="mt-2 font-display text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
            {stats?.totalPurchases || '₹12.8L'}
          </p>
          <p className="mt-1 text-[11px] text-primary-700 dark:text-primary-400">
            Verified Procurement Volume
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
            <span className="text-xs font-semibold">Active Bids</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300">
              <FiClock className="text-base" />
            </div>
          </div>
          <p className="mt-2 font-display text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
            {stats?.activeBids ?? 18}
          </p>
          <p className="mt-1 text-[11px] text-blue-600 dark:text-blue-400">
            Pending Farmer Acceptance
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
            <span className="text-xs font-semibold">Pending Orders</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-300">
              <FiShoppingBag className="text-base" />
            </div>
          </div>
          <p className="mt-2 font-display text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
            {stats?.pendingOrders ?? 7}
          </p>
          <p className="mt-1 text-[11px] text-amber-600 dark:text-amber-400">
            In Processing / Transit
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
            <span className="text-xs font-semibold">Completed Orders</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-green-600 dark:bg-green-950/60 dark:text-green-300">
              <FiCheckCircle className="text-base" />
            </div>
          </div>
          <p className="mt-2 font-display text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
            {stats?.completedOrders ?? 42}
          </p>
          <p className="mt-1 text-[11px] text-green-600 dark:text-green-400">
            Delivered & Settled
          </p>
        </div>

        <div className="col-span-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:col-span-1">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
            <span className="text-xs font-semibold">Total Spending</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-300">
              <FiTrendingUp className="text-base" />
            </div>
          </div>
          <p className="mt-2 font-display text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
            {stats?.totalSpending || '₹9.6L'}
          </p>
          <p className="mt-1 text-[11px] text-purple-600 dark:text-purple-400">
            Fiscal Year To Date
          </p>
        </div>
      </div>

      {/* Grid: Recent Crop Listings & Market Overview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Recent Crop Listings */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
            <div>
              <h2 className="font-display text-base font-bold text-gray-900 dark:text-white">
                Recent Crop Listings
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Freshly listed harvests available for corporate procurement
              </p>
            </div>
            <Link
              to="/company/crops"
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              <span>View All</span>
              <FiArrowRight />
            </Link>
          </div>

          <div className="mt-4 divide-y divide-gray-100 dark:divide-gray-800">
            {recentCrops.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-3 py-3 sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.crop}
                    className="h-12 w-12 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white">
                      {item.crop}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.farmer} • {item.location}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      Qty: <strong>{item.quantity} {item.unit}</strong> • Status:{' '}
                      <span className="text-primary-600 dark:text-primary-400">{item.availableDate}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <div className="text-right">
                    <p className="font-display text-sm font-bold text-gray-900 dark:text-white">
                      ₹{item.expectedPrice}/Q
                    </p>
                    <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                      {item.grade}
                    </span>
                  </div>

                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSelectedCropForBid(item)}
                      className="focus-ring rounded-xl bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white shadow-soft hover:bg-primary-700"
                    >
                      Place Bid
                    </button>
                    <Link
                      to="/company/crops"
                      className="focus-ring rounded-xl border border-gray-200 p-1.5 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                      title="View Details"
                    >
                      <FiEye className="text-sm" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Market Overview */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="border-b border-gray-100 pb-3 dark:border-gray-800">
            <h2 className="font-display text-base font-bold text-gray-900 dark:text-white">
              Market Overview
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Mandi prices & procurement demand signals (Demo)
            </p>
          </div>

          <div className="mt-4 space-y-3">
            {marketTrends.map((t) => (
              <div
                key={t.crop}
                className="rounded-xl border border-gray-100 bg-gray-50/70 p-3 dark:border-gray-800 dark:bg-gray-800/40"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white">{t.crop}</h3>
                  <span
                    className={`font-semibold text-xs ${
                      t.trendDirection === 'up'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-500 dark:text-red-400'
                    }`}
                  >
                    {t.trend}
                  </span>
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[11px] text-gray-600 dark:text-gray-300">
                  <span>Price: <strong>{t.price}</strong></span>
                  <span className="text-primary-700 dark:text-primary-400">{t.demand}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: Active Bids & Recent Purchase Orders */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Active Bids */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
            <div>
              <h2 className="font-display text-base font-bold text-gray-900 dark:text-white">
                Active Bids
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Latest offers submitted to verified growers
              </p>
            </div>
            <Link
              to="/company/bids"
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              <span>View All</span>
              <FiArrowRight />
            </Link>
          </div>

          <div className="mt-4 divide-y divide-gray-100 dark:divide-gray-800">
            {activeBids.map((bid) => (
              <div
                key={bid.id}
                className="flex items-center justify-between py-3 text-xs"
              >
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{bid.crop}</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Farmer: {bid.farmer} • {bid.quantity} {bid.unit}
                  </p>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500">Date: {bid.date}</p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-gray-900 dark:text-white">₹{bid.bidAmount}/Q</p>
                  <span
                    className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold ${getBidStatusBadge(
                      bid.status
                    )}`}
                  >
                    {bid.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Purchase Orders */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
            <div>
              <h2 className="font-display text-base font-bold text-gray-900 dark:text-white">
                Recent Purchase Orders
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Track status of active procurement contracts
              </p>
            </div>
            <Link
              to="/company/orders"
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              <span>View All</span>
              <FiArrowRight />
            </Link>
          </div>

          <div className="mt-4 divide-y divide-gray-100 dark:divide-gray-800">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-3 text-xs"
              >
                <div>
                  <span className="font-mono text-[11px] font-bold text-primary-600 dark:text-primary-400">
                    #{order.id}
                  </span>
                  <h3 className="font-bold text-gray-900 dark:text-white">{order.crop}</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {order.farmer} • Qty: {order.quantity} {order.unit}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-gray-900 dark:text-white">{order.amount}</p>
                  <span
                    className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold ${getOrderStatusBadge(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notification Preview */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-950/60 dark:text-primary-300">
              <FiBell className="text-sm" />
            </div>
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white sm:text-base">
              Company Alerts & Updates
            </h2>
          </div>
          <Link
            to="/company/notifications"
            className="text-xs font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            All Notifications →
          </Link>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="rounded-xl border border-gray-100 bg-gray-50/80 p-3 dark:border-gray-800 dark:bg-gray-800/40"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                {n.title}
              </span>
              <p className="mt-1 text-xs text-gray-800 dark:text-gray-200">{n.description}</p>
              <p className="mt-1 text-[10px] text-gray-400">{n.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Place Bid Modal */}
      {selectedCropForBid && (
        <PlaceBidModal
          crop={selectedCropForBid}
          onClose={() => setSelectedCropForBid(null)}
          onBidPlaced={() => {
            bidService.getBids().then((bids) => setActiveBids(bids.slice(0, 4)));
          }}
        />
      )}
    </div>
  );
}
