import { cn } from '@/utils/cn';

export default function CommodityChips({ commodities, selected, onSelect, limit = 10 }) {
  const list = commodities.slice(0, limit);
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
      {list.map((c) => (
        <button
          key={c.key}
          type="button"
          aria-pressed={selected === c.key}
          onClick={() => onSelect(c.key)}
          className={cn(
            'focus-ring flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition',
            selected === c.key ? 'border-primary-600 bg-primary-600 text-white shadow-soft' : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
          )}
        >
          <span aria-hidden="true">{c.emoji}</span>
          {c.name}
        </button>
      ))}
    </div>
  );
}