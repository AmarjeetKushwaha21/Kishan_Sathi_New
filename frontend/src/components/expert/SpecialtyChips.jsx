import { cn } from '@/utils/cn';

export default function SpecialtyChips({ specialties, selected, onSelect }) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
      {specialties.map((s) => (
        <button
          key={s}
          type="button"
          aria-pressed={selected === s}
          onClick={() => onSelect(s)}
          className={cn(
            'focus-ring shrink-0 rounded-xl border px-3 py-2 text-xs font-semibold transition',
            selected === s ? 'border-primary-600 bg-primary-600 text-white shadow-soft' : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
          )}
        >
          {s}
        </button>
      ))}
    </div>
  );
}