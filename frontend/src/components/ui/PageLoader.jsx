import Spinner from './Spinner';
import Logo from './Logo';

export default function PageLoader({ label = 'Loading…' }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen flex-col items-center justify-center gap-5 bg-primary-50/50"
    >
      <Logo size="lg" />
      <Spinner size="md" label={label} />
      <p className="text-sm font-medium text-gray-500">{label}</p>
    </div>
  );
}