import { FiCheck, FiClock } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { cn } from '@/utils/cn';

export default function PackageCard({ pkg, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(pkg.key)}
      aria-pressed={selected}
      className={cn('focus-ring w-full rounded-2xl text-left', selected && '-translate-y-0.5')}
    >
      <Card
        variant="soft"
        className={cn('relative transition', selected ? 'border-2 border-primary-500 bg-primary-50/40' : 'border-2 border-transparent hover:border-primary-200')}
      >
        {pkg.featured && (
          <Badge variant="accent" size="sm" className="absolute right-4 top-4">Most popular</Badge>
        )}
        <div className="flex items-start gap-3">
          <span className={cn('mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2', selected ? 'border-primary-600' : 'border-gray-300')} aria-hidden="true">
            {selected && <span className="h-2.5 w-2.5 rounded-full bg-primary-600" />}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-base font-bold text-gray-900">{pkg.name}</h3>
              <span className="font-display text-xl font-bold text-primary-700">₹{pkg.price}</span>
            </div>
            <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-gray-500">
              <FiClock aria-hidden="true" /> Report in {pkg.turnaround} days
            </p>
            <ul className="mt-3 space-y-1.5">
              {pkg.tests.map((test) => (
                <li key={test} className="flex items-start gap-2 text-sm text-gray-600">
                  <FiCheck className="mt-0.5 shrink-0 text-primary-600" aria-hidden="true" />
                  {test}
                </li>
              ))}
            </ul>
            <p className="mt-3 rounded-xl bg-white px-3 py-2 text-xs text-gray-500 shadow-soft">{pkg.bestFor}</p>
          </div>
        </div>
      </Card>
    </button>
  );
}