import { cn } from '@/utils/cn';

export default function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'focus-ring relative h-6 w-11 shrink-0 rounded-full transition-colors',
        checked ? 'bg-primary-600' : 'bg-gray-300'
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all',
          checked ? 'left-[22px]' : 'left-0.5'
        )}
      />
    </button>
  );
}