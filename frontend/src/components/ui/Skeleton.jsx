import { cn } from '@/utils/cn';

export default function Skeleton({ className }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative block overflow-hidden rounded-xl bg-gray-200/70 dark:bg-gray-800',
        className
      )}
    >
      <span className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/10" />
    </span>
  );
}

export function SkeletonText({ className }) {
  return <Skeleton className={cn('h-3 rounded-md', className)} />;
}

export function SkeletonCircle({ className }) {
  return <Skeleton className={cn('h-10 w-10 rounded-full', className)} />;
}

export function SkeletonCard({ className }) {
  return (
    <div className={cn('rounded-2xl border border-gray-100 bg-white p-5 dark:bg-gray-900', className)}>
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <div className="flex-1 space-y-2">
          <SkeletonText className="w-1/3" />
          <SkeletonText className="w-2/3" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <SkeletonText className="w-full" />
        <SkeletonText className="w-4/5" />
      </div>
    </div>
  );
}