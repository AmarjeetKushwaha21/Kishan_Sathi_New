import { FiTrendingDown, FiTrendingUp } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import { MANDI_PRICES } from '@/data/mock/dashboard';

export default function MandiPriceSummary() {
  return (
    <Card variant="soft" className="flex h-full flex-col">
      <SectionHeader title="Mandi Price Summary" subtitle="Live rates from nearby markets" to="/dashboard/market-prices" />

      <div className="flex-1 overflow-x-auto">
        <table className="w-full min-w-[420px] text-left text-sm">
          <caption className="sr-only">Mandi prices for nearby markets</caption>
          <thead>
            <tr className="border-b border-gray-100 text-[11px] uppercase tracking-wider text-gray-500">
              <th scope="col" className="pb-2 pr-2 font-semibold">Crop</th>
              <th scope="col" className="pb-2 pr-2 font-semibold">Market</th>
              <th scope="col" className="pb-2 pr-2 text-right font-semibold">Price</th>
              <th scope="col" className="pb-2 text-right font-semibold">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {MANDI_PRICES.map((row) => (
              <tr key={row.crop}>
                <td className="py-3 pr-2 font-semibold text-gray-900">{row.crop}</td>
                <td className="py-3 pr-2 text-gray-500">{row.market}</td>
                <td className="py-3 pr-2 text-right font-bold text-gray-900">
                  ₹{row.price.toLocaleString('en-IN')}
                  <span className="ml-0.5 text-[10px] font-medium text-gray-400">{row.unit}</span>
                </td>
                <td className="py-3 text-right">
                  <span
                    className={
                      row.up
                        ? 'inline-flex items-center gap-1 text-xs font-semibold text-primary-600'
                        : 'inline-flex items-center gap-1 text-xs font-semibold text-red-500'
                    }
                  >
                    {row.up ? <FiTrendingUp aria-hidden="true" /> : <FiTrendingDown aria-hidden="true" />}
                    {row.change}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 rounded-lg bg-primary-50/60 px-3 py-2 text-[11px] text-gray-500">
        Tip: Ludhiana mandi is offering the best wheat rate today.
      </p>
    </Card>
  );
}