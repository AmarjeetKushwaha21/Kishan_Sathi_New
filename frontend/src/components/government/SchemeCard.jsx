import { FiAward, FiBookmark, FiCalendar, FiCheckCircle, FiFileText, FiInfo, FiMapPin, FiSend } from 'react-icons/fi';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { useGovernment } from '@/context/GovernmentContext';
import { cn } from '@/utils/cn';

const CATEGORY_BADGE_VARIANTS = {
  Subsidies: 'primary',
  'Agricultural Loans': 'accent',
  'Crop Insurance': 'sky',
  'Farm Equipment': 'primary',
  Irrigation: 'sky',
  Seeds: 'primary',
  Fertilizers: 'accent',
  'Farmer Benefits': 'primary',
  'Other Agricultural Support': 'default',
};

export default function SchemeCard({ scheme, onViewDetails, onApply }) {
  const { isSchemeSaved, toggleSaveScheme } = useGovernment();
  const saved = isSchemeSaved(scheme.id);
  const badgeVariant = CATEGORY_BADGE_VARIANTS[scheme.category] || 'primary';

  return (
    <Card
      variant="soft"
      className="group flex h-full flex-col justify-between border border-gray-200/80 bg-white p-5 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-primary-300 hover:shadow-card"
    >
      <div>
        {/* Top Badges & Save Button */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant={badgeVariant} size="sm" className="font-semibold">
              {scheme.category}
            </Badge>
            {scheme.state && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                <FiMapPin className="text-[10px]" aria-hidden="true" />
                {scheme.state}
              </span>
            )}
            <span className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600">
              <FiFileText className="text-[10px]" aria-hidden="true" />
              {scheme.requiredDocuments?.length || 3} Docs
            </span>
          </div>

          <button
            type="button"
            onClick={() => toggleSaveScheme(scheme.id)}
            aria-label={saved ? 'Remove from saved' : 'Save scheme'}
            title={saved ? 'Remove from saved' : 'Save scheme'}
            className={cn(
              'focus-ring flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition',
              saved
                ? 'bg-amber-500 text-white shadow-soft hover:bg-amber-600'
                : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-700'
            )}
          >
            <FiBookmark className={cn('text-sm', saved && 'fill-current')} />
          </button>
        </div>

        {/* Scheme Name */}
        <h3 className="mt-3 font-display text-base font-bold leading-snug text-gray-900 group-hover:text-primary-700">
          {scheme.name}
        </h3>

        {/* Short Description */}
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-600">
          {scheme.shortDescription || scheme.description}
        </p>

        {/* Benefits Highlight Box */}
        <div className="mt-3.5 rounded-xl border border-primary-100 bg-primary-50/50 p-3 text-xs text-gray-800">
          <p className="flex items-center gap-1.5 font-bold text-primary-800">
            <FiAward className="text-sm text-primary-600" aria-hidden="true" />
            Benefit Highlight
          </p>
          <p className="mt-1 font-semibold text-primary-950">
            {scheme.benefitAmount || scheme.benefits}
          </p>
        </div>

        {/* Eligibility Indicator */}
        <div className="mt-3 flex items-start gap-1.5 text-[11px] text-gray-500">
          <FiCheckCircle className="mt-0.5 shrink-0 text-emerald-600" aria-hidden="true" />
          <span className="line-clamp-1">
            <strong>Eligibility:</strong> {scheme.eligibility?.[0] || 'All active farmers with cultivable land'}
          </span>
        </div>

        {/* Application Status & Deadline */}
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-2.5 text-[11px]">
          <span className="inline-flex items-center gap-1 font-medium text-gray-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            {scheme.applicationStatus || 'Open'}
          </span>
          {scheme.deadline && (
            <span className="inline-flex items-center gap-1 text-gray-400">
              <FiCalendar aria-hidden="true" />
              {scheme.deadline}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex items-center gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          fullWidth
          onClick={() => onViewDetails(scheme)}
          leftIcon={FiInfo}
          className="text-xs font-semibold"
        >
          View Details
        </Button>
        <Button
          type="button"
          variant="primary"
          size="sm"
          fullWidth
          onClick={() => onApply(scheme)}
          leftIcon={FiSend}
          className="text-xs font-semibold shadow-soft"
        >
          Apply Now
        </Button>
      </div>
    </Card>
  );
}
