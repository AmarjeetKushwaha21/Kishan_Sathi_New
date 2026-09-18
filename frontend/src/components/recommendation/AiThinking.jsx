import { FiCpu } from 'react-icons/fi';

import Card from '@/components/ui/Card';

export default function AiThinking({ label = 'AI Sathi is analysing your farm…' }) {
  return (
    <Card variant="tinted" className="mx-auto max-w-md text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-primary-600 text-3xl text-white shadow-soft">
        <FiCpu className="animate-pulse" aria-hidden="true" />
      </span>
      <p className="mt-4 font-display text-lg font-bold text-gray-900">{label}</p>
      <div className="mt-4 flex items-center justify-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary-500"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      <p className="mt-4 text-xs text-gray-500">Matching soil, season, water and market data…</p>
    </Card>
  );
}