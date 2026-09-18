import { useState } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';
import bidService from '../services/bidService';

export default function PlaceBidModal({ crop, onClose, onBidPlaced }) {
  const [bidAmount, setBidAmount] = useState(crop?.expectedPrice || '');
  const [quantity, setQuantity] = useState(crop?.quantity || 100);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!crop) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const newBid = await bidService.placeBid({
        cropId: crop.id,
        cropName: crop.crop,
        farmerName: crop.farmer,
        location: crop.location,
        bidAmount,
        quantity,
        unit: crop.unit || 'Quintal',
      });
      setSuccess(true);
      if (onBidPlaced) onBidPlaced(newBid);
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch {
      // ignore
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = Number(bidAmount) * Number(quantity);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-900 sm:p-7">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
              Procurement Bid
            </span>
            <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">
              Place Bid for {crop.crop}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {success ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-2xl text-primary-600 dark:bg-primary-950 dark:text-primary-400">
              <FiCheck />
            </div>
            <p className="mt-3 font-display text-base font-bold text-gray-900 dark:text-white">
              Bid Submitted Successfully!
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              The farmer has been notified and can accept your offer.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="rounded-xl bg-gray-50 p-3 text-xs dark:bg-gray-800/60">
              <p className="font-semibold text-gray-900 dark:text-white">
                Farmer: <span className="font-normal text-gray-600 dark:text-gray-300">{crop.farmer}</span>
              </p>
              <p className="mt-0.5 font-semibold text-gray-900 dark:text-white">
                Location: <span className="font-normal text-gray-600 dark:text-gray-300">{crop.location}</span>
              </p>
              <p className="mt-0.5 font-semibold text-gray-900 dark:text-white">
                Expected Price: <span className="font-bold text-primary-700 dark:text-primary-300">₹{crop.expectedPrice}/Q</span>
              </p>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Your Offer Price (₹ per Quintal)
              </label>
              <input
                type="number"
                required
                min={500}
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="focus-ring w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Quantity Required ({crop.unit || 'Quintal'})
              </label>
              <input
                type="number"
                required
                min={1}
                max={crop.quantity || 5000}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="focus-ring w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div className="rounded-xl border border-primary-200 bg-primary-50/50 p-3 text-xs text-primary-900 dark:border-primary-900 dark:bg-primary-950/40 dark:text-primary-200">
              <div className="flex items-center justify-between font-bold">
                <span>Estimated Total Commitment:</span>
                <span className="text-sm text-primary-700 dark:text-primary-300">
                  ₹{Number.isNaN(total) ? '0' : total.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                Payment held securely in corporate escrow until quality inspection at mandi pickup.
              </p>
            </div>

            <div className="flex gap-2.5 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 rounded-xl border border-gray-200 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-1/2 rounded-xl bg-primary-600 py-2.5 text-xs font-semibold text-white shadow-soft hover:bg-primary-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Placing Bid…' : 'Submit Bid'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
