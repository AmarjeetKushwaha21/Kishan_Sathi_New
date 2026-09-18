import { useEffect, useState } from 'react';
import { FiClock, FiCheckCircle, FiXCircle, FiAlertTriangle, FiTrash2 } from 'react-icons/fi';
import bidService from '../services/bidService';

export default function MyBids() {
  const [bids, setBids] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [viewBid, setViewBid] = useState(null);

  const fetchBids = () => {
    bidService.getBids().then(setBids);
  };

  useEffect(() => {
    fetchBids();
  }, []);

  const handleCancelBid = async (id) => {
    if (window.confirm('Are you sure you want to retract/cancel this procurement bid?')) {
      await bidService.cancelBid(id);
      fetchBids();
    }
  };

  const tabs = ['All', 'Active', 'Accepted', 'Rejected', 'Expired'];

  const filteredBids = bids.filter((b) => {
    if (activeTab === 'All') return true;
    return b.status.toLowerCase() === activeTab.toLowerCase();
  });

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300';
      case 'accepted':
        return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/50 dark:text-green-300';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-300';
      case 'cancelled':
        return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400';
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          My Procurement Bids
        </h1>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
          Track, modify, and manage bids placed across various mandi harvest listings.
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

      {/* Bids List */}
      <div className="space-y-3">
        {filteredBids.map((bid) => (
          <div
            key={bid.id}
            className="flex flex-col justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-soft dark:border-gray-800 dark:bg-gray-900 sm:flex-row sm:items-center"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-primary-600 dark:text-primary-400">
                  #{bid.id}
                </span>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${getStatusBadge(
                    bid.status
                  )}`}
                >
                  {bid.status}
                </span>
              </div>

              <h3 className="mt-1 font-display text-base font-bold text-gray-900 dark:text-white">
                {bid.crop}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Farmer: {bid.farmer} • Location: {bid.location}
              </p>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                Bid Placed: {bid.date} • Valid Until: {bid.validUntil}
              </p>
            </div>

            <div className="flex items-center justify-between gap-6 border-t border-gray-100 pt-3 sm:border-t-0 sm:pt-0">
              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                  Rate / Quintal
                </span>
                <p className="font-display text-base font-extrabold text-gray-900 dark:text-white">
                  ₹{bid.bidAmount}
                </p>
                <p className="text-xs text-primary-700 dark:text-primary-400 font-semibold">
                  Qty: {bid.quantity} {bid.unit} ({bid.totalValue})
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setViewBid(bid)}
                  className="rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Details
                </button>
                {bid.status.toLowerCase() === 'active' && (
                  <button
                    type="button"
                    onClick={() => handleCancelBid(bid.id)}
                    className="flex items-center gap-1 rounded-xl border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/30"
                  >
                    <FiTrash2 className="text-xs" />
                    <span>Cancel</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBids.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-200 p-12 text-center text-sm text-gray-500 dark:border-gray-800">
          No bids found under &ldquo;{activeTab}&rdquo; status.
        </div>
      )}

      {/* Bid Details Modal */}
      {viewBid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-900">
            <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">
              Bid #{viewBid.id} Summary
            </h3>
            <div className="mt-4 space-y-2 text-xs">
              <p><strong>Crop:</strong> {viewBid.crop}</p>
              <p><strong>Farmer:</strong> {viewBid.farmer} ({viewBid.location})</p>
              <p><strong>Offered Rate:</strong> ₹{viewBid.bidAmount} / Quintal</p>
              <p><strong>Volume:</strong> {viewBid.quantity} {viewBid.unit}</p>
              <p><strong>Total Value:</strong> {viewBid.totalValue}</p>
              <p><strong>Submission Date:</strong> {viewBid.date}</p>
              <p><strong>Expiry:</strong> {viewBid.validUntil}</p>
              <p><strong>Status:</strong> {viewBid.status}</p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setViewBid(null)}
                className="rounded-xl bg-primary-600 px-4 py-2 text-xs font-semibold text-white hover:bg-primary-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
