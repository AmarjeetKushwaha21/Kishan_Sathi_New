import { cn } from '@/utils/cn';

const TONE = {
  high: { stroke: '#16a34a', text: 'text-primary-600' },
  mid: { stroke: '#f59e0b', text: 'text-accent-600' },
  low: { stroke: '#f43f5e', text: 'text-rose-500' },
};

export default function ScoreRing({ score, size = 96, stroke = 8, label }) {
  const tone = score >= 80 ? TONE.high : score >= 60 ? TONE.mid : TONE.low;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={tone.stroke}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn('font-display font-bold leading-none', tone.text, size > 72 ? 'text-2xl' : 'text-base')}>
          {score}
        </span>
        <span className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">{label || '%'}</span>
      </div>
    </div>
  );
}