import { cn } from '@/utils/cn';

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', className }) {
  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', 'max-w-2xl', className)}>
      {eyebrow && (
        <span className="mb-3 inline-block rounded-full bg-primary-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-700">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-3 text-base text-gray-600">{subtitle}</p>}
    </div>
  );
}