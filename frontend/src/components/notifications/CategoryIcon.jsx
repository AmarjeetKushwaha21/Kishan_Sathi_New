import { FiCloudLightning, FiMessageSquare, FiShoppingBag, FiTrendingUp, FiVolume2 } from 'react-icons/fi';

import { cn } from '@/utils/cn';

const CATEGORY_META = {
  weather: { icon: FiCloudLightning, soft: 'bg-sky-100 text-sky-600', solid: 'bg-sky-500' },
  order: { icon: FiShoppingBag, soft: 'bg-emerald-100 text-emerald-600', solid: 'bg-emerald-500' },
  offer: { icon: FiTrendingUp, soft: 'bg-violet-100 text-violet-600', solid: 'bg-violet-500' },
  message: { icon: FiMessageSquare, soft: 'bg-indigo-100 text-indigo-600', solid: 'bg-indigo-500' },
  announcement: { icon: FiVolume2, soft: 'bg-amber-100 text-amber-600', solid: 'bg-amber-500' },
};

export function CategoryIcon({ category, className, size = 'text-xl' }) {
  const meta = CATEGORY_META[category] || CATEGORY_META.announcement;
  const Icon = meta.icon;
  return (
    <span
      className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl', meta.soft, size, className)}
      aria-hidden="true"
    >
      <Icon />
    </span>
  );
}

export function CategoryDot({ category, className }) {
  const meta = CATEGORY_META[category] || CATEGORY_META.announcement;
  return <span className={cn('h-2 w-2 shrink-0 rounded-full', meta.solid, className)} aria-hidden="true" />;
}