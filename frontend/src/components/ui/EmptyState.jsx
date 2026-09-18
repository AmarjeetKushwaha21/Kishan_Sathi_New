import { motion } from 'framer-motion';
import { FiInbox } from 'react-icons/fi';

import Button from './Button';
import { cn } from '@/utils/cn';

export default function EmptyState({
  icon: Icon = FiInbox,
  title,
  description,
  action,
  actionLabel,
  onAction,
  compact = false,
  className,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white/70 px-6 text-center dark:border-gray-700 dark:bg-gray-900/60',
        compact ? 'gap-2 py-8' : 'gap-3 py-14',
        className
      )}
    >
      <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 text-3xl text-primary-600 shadow-soft dark:from-primary-900/40 dark:to-accent-900/40 dark:text-primary-300">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-primary-500/10 dark:ring-primary-300/10"
        />
        <Icon aria-hidden="true" className="drop-shadow-sm" />
      </span>
      <h3 className="font-display text-lg font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      {description && (
        <p className="max-w-sm text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}
      {action && actionLabel && (
        <Button variant="outline" size="sm" className="mt-2" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}