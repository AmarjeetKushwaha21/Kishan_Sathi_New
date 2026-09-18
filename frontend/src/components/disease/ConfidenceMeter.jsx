import { FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

import { cn } from '@/utils/cn';

function tone(confidence) {
  if (confidence >= 90) return { bar: 'bg-primary-600', ring: 'text-primary-600', label: 'Very confident' };
  if (confidence >= 80) return { bar: 'bg-accent-500', ring: 'text-accent-600', label: 'High confidence' };
  return { bar: 'bg-amber-500', ring: 'text-amber-600', label: 'Moderate confidence' };
}

export default function ConfidenceMeter({ confidence }) {
  const { bar, ring, label } = tone(confidence);
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1.5 text-xs font-semibold text-gray-600">
          <FiCheckCircle aria-hidden="true" className={ring} />
          Model confidence
        </p>
        <p className={cn('text-sm font-bold', ring)}>{confidence}% · {label}</p>
      </div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-gray-100" role="presentation">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${confidence}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={cn('h-full rounded-full', bar)}
        />
      </div>
    </div>
  );
}