import { useEffect, useState } from 'react';
import orderService from '../services/orderService';

export default function PurchaseOrders() {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    orderService.getOrders(activeTab).then(setOrders);
  }, [activeTab]);

  const tabs = ['All', 'Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const getStatusBadge = (status) => {
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
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          Purchase Orders
        </h1>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
          Legally binding procurement agreements with verified farmers and escrow security.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 border-b border-gray-200 pb-2 dark:border-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition ${
              activeTab === tab
                ? 'bg-primary-600 text-white shadow-soft'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders Table & Cards */}
      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex flex-col justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-soft dark:border-gray-800 dark:bg-gray-900 md:flex-row md:items-center"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-primary-600 dark:text-primary-400">
                  #{order.id}
                </span>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${getStatusBadge(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>
              <h3 className="mt-1 font-display text-base font-bold text-gray-900 dark:text-white">
                {order.crop}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Farmer: <strong className="text-gray-800 dark:text-gray-200">{order.farmer}</strong> • Mandi: {order.location}
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Ordered: {order.date} • Expected Delivery: {order.deliveryDate}
              </p>
            </div>

            <div className="flex items-center justify-between gap-6 border-t border-gray-100 pt-3 md:border-t-0 md:pt-0">
              <div className="text-left md:text-right">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                  Total Order Value
                </span>
                <p className="font-display text-lg font-extrabold text-primary-700 dark:text-primary-400">
                  {order.amount}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Volume: {order.quantity} {order.unit}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => alert(`Invoice for Order #${order.id} downloaded.`)}
                  className="rounded-xl border border-gray-200 px-3.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Invoice
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-200 p-12 text-center text-sm text-gray-500 dark:border-gray-800">
          No purchase orders found under &ldquo;{activeTab}&rdquo; status.
        </div>
      )}
    </div>
  );
}
