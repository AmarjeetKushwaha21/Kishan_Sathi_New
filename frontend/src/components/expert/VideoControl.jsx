import { cn } from '@/utils/cn';

export default function VideoControl({ icon: Icon, label, active = false, danger = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        'focus-ring flex h-12 w-12 items-center justify-center rounded-full text-xl text-white transition',
        danger ? 'bg-red-500 shadow-lg hover:bg-red-600' : active ? 'bg-white/25 backdrop-blur' : 'bg-white/15 backdrop-blur hover:bg-white/25',
        danger && 'h-14 w-14'
      )}
    >
      <Icon aria-hidden="true" />
    </button>
  );
}