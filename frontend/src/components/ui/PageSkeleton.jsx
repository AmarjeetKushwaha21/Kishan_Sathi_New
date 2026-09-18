import { motion } from 'framer-motion';

import Skeleton, { SkeletonText } from '@/components/ui/Skeleton';

export default function PageSkeleton() {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <span className="sr-only">Loading page…</span>

      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <SkeletonText className="w-40" />
          <SkeletonText className="w-24" />
        </div>
        <Skeleton className="h-10 w-10 rounded-xl" />
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
          >
            <Skeleton className="mb-3 h-8 w-8 rounded-lg" />
            <SkeletonText className="mb-2 w-1/2" />
            <SkeletonText className="w-3/4" />
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 lg:col-span-2">
          <SkeletonText className="mb-4 w-1/3" />
          <Skeleton className="h-48 w-full" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <SkeletonText className="w-1/2" />
                  <SkeletonText className="w-2/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}