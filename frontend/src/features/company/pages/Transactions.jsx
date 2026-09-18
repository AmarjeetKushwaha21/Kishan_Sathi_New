import { useEffect, useState } from 'react';
import { FiCheckCircle, FiClock, FiDownload } from 'react-icons/fi';
import transactionService from '../services/transactionService';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    transactionService.getTransactions().then(setTransactions);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 border-b border-gray-200 pb-5 dark:border-gray-800 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Financial Transactions
          </h1>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
            Auditable settlement and escrow ledger for procurement orders.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert('Corporate statement export generated.')}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
        >
          <FiDownload className="text-sm" />
          <span>Export Ledger</span>
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-soft dark:border-gray-800 dark:bg-gray-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-gray-100 bg-gray-50/80 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:border-gray-800 dark:bg-gray-800/60">
              <tr>
                <th className="px-5 py-3.5">Transaction ID</th>
                <th className="px-5 py-3.5">Order Ref</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5">Payment Type</th>
                <th className="px-5 py-3.5">Channel / Method</th>
                <th className="px-5 py-3.5">Amount</th>
                <th className="px-5 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700 dark:divide-gray-800 dark:text-gray-300">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40">
                  <td className="px-5 py-4 font-mono font-bold text-gray-900 dark:text-white">
                    {txn.id}
                  </td>
                  <td className="px-5 py-4 font-mono font-semibold text-primary-600 dark:text-primary-400">
                    {txn.orderId}
                  </td>
                  <td className="px-5 py-4 text-gray-500 dark:text-gray-400">{txn.date}</td>
                  <td className="px-5 py-4 font-medium text-gray-900 dark:text-white">{txn.type}</td>
                  <td className="px-5 py-4 text-gray-500 dark:text-gray-400">{txn.method}</td>
                  <td className="px-5 py-4 font-display font-bold text-gray-900 dark:text-white">
                    {txn.amount}
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-[10px] font-bold text-green-700 dark:bg-green-950/60 dark:text-green-300">
                      <FiCheckCircle className="text-xs" />
                      <span>{txn.paymentStatus}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
