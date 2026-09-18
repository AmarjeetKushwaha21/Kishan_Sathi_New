import { FiCheckCircle, FiClock, FiDroplet } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import { cn } from '@/utils/cn';

export default function FertilizerCard({ item, highlight = false }) {
  return (
    <Card variant="soft" className={cn('p-4 sm:p-5', highlight && 'border-2 border-primary-200 bg-primary-50/40')}>
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-2xl" aria-hidden="true">
          {item.emoji || '🌾'}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-base font-bold text-gray-900">{item.crop}</p>
          <p className="text-xs text-gray-500">{item.advice}</p>
        </div>
        {item.cost != null && (
          <span className="text-right">
            <span className="block font-display text-lg font-bold text-gray-900">₹{item.cost}</span>
            <span className="block text-[10px] text-gray-400">est. cost</span>
          </span>
        )}
      </div>

      <dl className="mt-4 space-y-2 rounded-xl bg-white p-3 shadow-soft">
        <div className="flex items-start gap-2 text-sm">
          <FiDroplet className="mt-0.5 shrink-0 text-sky-500" aria-hidden="true" />
          <div><dt className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Dosage</dt><dd className="text-gray-700">{item.dosage}</dd></div>
        </div>
        <div className="flex items-start gap-2 text-sm">
          <FiClock className="mt-0.5 shrink-0 text-accent-500" aria-hidden="true" />
          <div><dt className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Timing</dt><dd className="text-gray-700">{item.timing}</dd></div>
        </div>
        <div className="flex items-start gap-2 text-sm">
          <FiCheckCircle className="mt-0.5 shrink-0 text-primary-600" aria-hidden="true" />
          <div><dt className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Why</dt><dd className="text-gray-700">{item.reason}</dd></div>
        </div>
      </dl>
    </Card>
  );
}