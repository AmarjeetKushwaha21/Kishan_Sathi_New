export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="focus-ring sr-only z-[100] rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      Skip to main content
    </a>
  );
}