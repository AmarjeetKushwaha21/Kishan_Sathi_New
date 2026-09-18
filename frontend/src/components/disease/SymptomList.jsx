import { FiActivity, FiAlertTriangle, FiCheckCircle, FiShield } from 'react-icons/fi';

import { cn } from '@/utils/cn';

const ICONS = {
  symptoms: FiActivity,
  causes: FiAlertTriangle,
  treatment: FiCheckCircle,
  prevent: FiShield,
};

const STYLES = {
  symptoms: { icon: 'text-amber-600' },
  causes: { icon: 'text-red-500' },
  treatment: { icon: 'text-primary-600' },
  prevent: { icon: 'text-sky-600' },
};

export default function SymptomList({ type, items }) {
  const Icon = ICONS[type] || FiActivity;
  const { icon } = STYLES[type] || STYLES.symptoms;
  const title = { symptoms: 'Symptoms you may see', causes: 'Likely causes', treatment: 'Recommended treatment', prevent: 'Prevention tips' }[type];

  return (
    <div>
      <h4 className={cn('flex items-center gap-2 font-display text-sm font-bold text-gray-900')}>
        <Icon aria-hidden="true" className={cn('text-base', icon)} />
        {title}
      </h4>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}