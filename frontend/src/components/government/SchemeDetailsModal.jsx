import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FiAlertCircle,
  FiAward,
  FiBookmark,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiFileText,
  FiInfo,
  FiMapPin,
  FiSend,
  FiX,
} from 'react-icons/fi';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { useGovernment } from '@/context/GovernmentContext';
import { cn } from '@/utils/cn';

export default function SchemeDetailsModal({ scheme, isOpen, onClose, onApply }) {
  const { isSchemeSaved, toggleSaveScheme } = useGovernment();
  const modalRef = useRef(null);
  const saved = scheme ? isSchemeSaved(scheme.id) : false;

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    const timer = setTimeout(() => modalRef.current?.focus(), 50);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !scheme) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          aria-hidden="true"
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          ref={modalRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="scheme-modal-title"
          className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl outline-none"
        >
          {/* Header Banner */}
          <div className="sticky top-0 z-10 flex items-start justify-between border-b border-gray-100 bg-white/95 px-6 py-5 backdrop-blur sm:px-8">
            <div className="min-w-0 flex-1 pr-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="primary" size="sm">
                  {scheme.category}
                </Badge>
                {scheme.state && (
                  <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                    <FiMapPin aria-hidden="true" />
                    {scheme.state}
                  </span>
                )}
                <span className="text-xs text-gray-500 font-medium">
                  {scheme.ministry || scheme.department || 'Govt. of India'}
                </span>
              </div>
              <h2 id="scheme-modal-title" className="mt-1.5 font-display text-xl font-bold text-gray-900 sm:text-2xl">
                {scheme.name}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleSaveScheme(scheme.id)}
                aria-label={saved ? 'Remove from saved' : 'Save scheme'}
                className={cn(
                  'focus-ring flex h-9 w-9 items-center justify-center rounded-xl transition',
                  saved
                    ? 'bg-amber-500 text-white shadow-soft'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                )}
              >
                <FiBookmark className={cn('text-base', saved && 'fill-current')} />
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="focus-ring flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200"
              >
                <FiX className="text-lg" />
              </button>
            </div>
          </div>

          {/* Content Body */}
          <div className="space-y-6 px-6 py-6 sm:px-8">
            {/* Quick Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-primary-50 via-primary-100/40 to-accent-50/50 p-4 border border-primary-100">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white shadow-soft">
                  <FiAward className="text-lg" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary-700">Key Benefit</p>
                  <p className="font-display text-sm font-bold text-gray-900 sm:text-base">
                    {scheme.benefitAmount || scheme.benefits}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium text-gray-600">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  {scheme.applicationStatus || 'Active & Accepting'}
                </span>
                {scheme.deadline && (
                  <span className="flex items-center gap-1 text-gray-500">
                    <FiCalendar aria-hidden="true" />
                    {scheme.deadline}
                  </span>
                )}
              </div>
            </div>

            {/* Overview / Description */}
            <div>
              <h3 className="font-display text-base font-bold text-gray-900">Scheme Overview</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">
                {scheme.shortDescription || scheme.description}
              </p>
              {scheme.benefits && (
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {scheme.benefits}
                </p>
              )}
            </div>

            {/* Eligibility Criteria */}
            {scheme.eligibility?.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 font-display text-base font-bold text-gray-900">
                  <FiCheckCircle className="text-emerald-600" aria-hidden="true" />
                  Who is Eligible?
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {scheme.eligibility.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ineligibility Criteria */}
            {scheme.ineligibility?.length > 0 && (
              <div className="rounded-2xl border border-red-100 bg-red-50/50 p-4 text-sm text-red-800">
                <h4 className="flex items-center gap-2 font-bold text-red-900">
                  <FiAlertCircle aria-hidden="true" /> Ineligible Categories
                </h4>
                <ul className="mt-2 space-y-1.5 text-xs text-red-700">
                  {scheme.ineligibility.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Required Documents */}
            {scheme.requiredDocuments?.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 font-display text-base font-bold text-gray-900">
                  <FiFileText className="text-primary-600" aria-hidden="true" />
                  Required Documents ({scheme.requiredDocuments.length})
                </h3>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {scheme.requiredDocuments.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50/70 p-3 text-xs font-semibold text-gray-800"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-xs text-primary-700">
                        {idx + 1}
                      </span>
                      <span className="truncate">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Application Process Roadmap */}
            {scheme.applicationProcess?.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 font-display text-base font-bold text-gray-900">
                  <FiClock className="text-accent-600" aria-hidden="true" />
                  Application Process
                </h3>
                <div className="mt-3 space-y-3">
                  {scheme.applicationProcess.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-3.5 shadow-soft"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-xs font-bold text-white shadow-soft">
                        {idx + 1}
                      </span>
                      <p className="text-xs leading-relaxed text-gray-700">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Important Information Box */}
            {scheme.importantInfo && (
              <div className="flex items-start gap-3 rounded-2xl border border-sky-100 bg-sky-50/60 p-4 text-xs text-sky-900">
                <FiInfo className="mt-0.5 text-base shrink-0 text-sky-600" aria-hidden="true" />
                <div>
                  <strong className="block font-bold">Important Note / Guidelines:</strong>
                  <p className="mt-0.5 leading-relaxed text-sky-800">{scheme.importantInfo}</p>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Bottom Actions */}
          <div className="sticky bottom-0 z-10 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 bg-white/95 px-6 py-4 backdrop-blur sm:px-8">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="text-sm font-semibold"
            >
              Close
            </Button>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => toggleSaveScheme(scheme.id)}
                leftIcon={FiBookmark}
                className={cn(saved && 'border-amber-400 text-amber-700 bg-amber-50')}
              >
                {saved ? 'Saved in Bookmarks' : 'Save Scheme'}
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={() => {
                  onClose();
                  onApply(scheme);
                }}
                leftIcon={FiSend}
                className="shadow-soft"
              >
                Apply Online Now
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
