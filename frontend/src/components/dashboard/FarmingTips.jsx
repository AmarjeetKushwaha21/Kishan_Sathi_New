import { FiAlertTriangle, FiZap } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import SectionHeader from '@/components/ui/SectionHeader';
import { FARMING_TIPS } from '@/data/mock/dashboard';
import { cn } from '@/utils/cn';

const PRIORITY_STYLES = {
  high: { badge: 'danger', dot: 'bg-red-500' },
  medium: { badge: 'accent', dot: 'bg-accent-500' },
  low: { badge: 'primary', dot: 'bg-primary-500' },
};

export default function FarmingTips() {
  return (
    <Card variant="soft" className="flex h-full flex-col">
      <SectionHeader
        title="Today's Farming Tips"
        subtitle="Personalised for your farm"
        icon={FiZap}
        to="/dashboard/ai-assistant"
        linkLabel="Ask AI"
      />

      <ul className="flex-1 space-y-3">
        {FARMING_TIPS.map((tip) => {
          const { badge } = PRIORITY_STYLES[tip.priority];
          return (
            <li key={tip.id} className="flex items-start gap-3 rounded-xl bg-primary-50/50 p-3.5">
              <span className="mt-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-base text-accent-600 shadow-soft">
                <FiAlertTriangle aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-gray-900">{tip.title}</p>
                  <Badge variant={badge} size="sm">
                    {tip.tag}
                  </Badge>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-gray-600">{tip.text}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 flex items-center gap-1.5 text-[11px] text-gray-400">
        <span className={cn('h-1.5 w-1.5 rounded-full', PRIORITY_STYLES.high.dot)} aria-hidden="true" />
        Tip priority based on weather, soil and crop stage
      </p>
    </Card>
  );
}