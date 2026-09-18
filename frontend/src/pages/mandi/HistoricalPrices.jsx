import { useMemo, useState } from 'react';
import { FiCalendar, FiTrendingDown, FiTrendingUp } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import MandiHeader from '@/components/mandi/MandiHeader';
import CommodityChips from '@/components/mandi/CommodityChips';
import { useMandiPrice } from '@/context/MandiPriceContext';
import { formatINR } from '@/utils/format';
import { cn } from '@/utils/cn';

export default function HistoricalPrices() {
  const { commodities, selectedMandi, getHistory } = useMandiPrice();
  const [selected, setSelected] = useState(commodities[0].key);
  const commodity = commodities.find((c) => c.key === selected);
  const history = useMemo(() => getHistory(selected), [getHistory, selected]);

  const summary = useMemo(() => {
    if (history.length === 0) return null;
    const latest = history[history.length - 1];
    const prev = history[history.length - 2];
    const prices = history.map((h) => h.price);
    return {
      latest,
      change: latest.price - prev.price,
      changePct: ((latest.price - prev.price) / prev.price) * 100,
      high: Math.max(...prices),
      low: Math.min(...prices),
      avg: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
      volAvg: Math.round(history.reduce((sum, h) => sum + h.volume, 0) / history.length),
    };
  }, [history]);

  return (
    <PageTransition>
      <MandiHeader title="Historical Prices" subtitle="24-week rate history per commodity" showBack status={`${selectedMandi.short}`} />

      <CommodityChips commodities={commodities} selected={selected} onSelect={setSelected} />

      {summary && (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
          <Card variant="soft" className="p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Latest ({history[history.length - 1].date})</p>
            <p className="mt-1 font-display text-xl font-bold text-gray-900">{formatINR(summary.latest.price)}</p>
            <span
              className={cn(
                'mt-1 inline-flex items-center gap-1 text-xs font-bold',
                summary.change >= 0 ? 'text-primary-600' : 'text-red-500'
              )}
            >
              {summary.change >= 0 ? <FiTrendingUp aria-hidden="true" /> : <FiTrendingDown aria-hidden="true" />}
              {summary.change >= 0 ? '+' : ''}{summary.change} ({summary.changePct >= 0 ? '+' : ''}{summary.changePct.toFixed(1)}%)
            </span>
          </Card>
          <Card variant="soft" className="p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">24-week high</p>
            <p className="mt-1 font-display text-xl font-bold text-primary-700">{formatINR(summary.high)}</p>
          </Card>
          <Card variant="soft" className="p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">24-week low</p>
            <p className="mt-1 font-display text-xl font-bold text-accent-600">{formatINR(summary.low)}</p>
          </Card>
          <Card variant="soft" className="p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Avg price / volume</p>
            <p className="mt-1 font-display text-xl font-bold text-gray-900">{formatINR(summary.avg)}</p>
            <p className="text-xs text-gray-400">~{summary.volAvg} qtl daily</p>
          </Card>
        </div>
      )}

      <Card variant="soft" className="mt-6">
        <h3 className="mb-4 flex items-center gap-2 font-display text-base font-semibold text-gray-900">
          <FiCalendar className="text-primary-600" aria-hidden="true" /> Weekly rates — {commodity.name} ({commodity.unit})
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm">
            <caption className="sr-only">Historical prices for the selected commodity</caption>
            <thead>
              <tr className="border-b border-gray-200 text-left text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                <th scope="col" className="py-2.5 pr-4">Week</th>
                <th scope="col" className="py-2.5 pr-4">Date</th>
                <th scope="col" className="py-2.5 pr-4 text-right">Modal price</th>
                <th scope="col" className="py-2.5 pr-4 text-right">Change</th>
                <th scope="col" className="py-2.5 text-right">Arrivals</th>
              </tr>
            </thead>
            <tbody>
              {[...history].reverse().map((h) => {
                const idx = history.indexOf(h);
                const prev = history[idx - 1];
                const change = prev ? h.price - prev.price : 0;
                const up = change >= 0;
                return (
                  <tr key={`${h.week}-${h.date}`} className="border-b border-gray-100 last:border-0">
                    <td className="py-2.5 pr-4 font-semibold text-gray-700">W-{h.week}</td>
                    <td className="py-2.5 pr-4 text-gray-500">{h.date}</td>
                    <td className="py-2.5 pr-4 text-right font-bold text-gray-900">{formatINR(h.price)}</td>
                    <td className="py-2.5 pr-4 text-right">
                      <Badge variant={up ? 'primary' : 'danger'} size="sm">
                        {up ? '+' : ''}{change}
                      </Badge>
                    </td>
                    <td className="py-2.5 text-right text-gray-500">~{h.volume} qtl</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="mt-4 text-center text-xs text-gray-400">Rates are weekly modal prices for {selectedMandi.short} mandi.</p>
    </PageTransition>
  );
}