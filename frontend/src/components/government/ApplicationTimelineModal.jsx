import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCheck, FiClock, FiFileText, FiMapPin, FiX } from 'react-icons/fi';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

const STATUS_BADGE_MAP = {
  Approved: 'primary',
  'Under Review': 'accent',
  Submitted: 'sky',
  Draft: 'default',
  Rejected: 'danger',
};

export default function ApplicationTimelineModal({ application, isOpen, onClose }) {
  const modalRef = useRef(null);

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

  if (!isOpen || !application) return null;

  const badgeVariant = STATUS_BADGE_MAP[application.status] || 'default';

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

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          ref={modalRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="timeline-modal-title"
          className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white shadow-2xl outline-none"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-start justify-between border-b border-gray-100 bg-white/95 px-6 py-5 backdrop-blur">
            <div className="pr-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={badgeVariant} size="sm">
                  {application.status}
                </Badge>
                <span className="font-mono text-xs font-bold text-gray-500">
                  {application.trackingId}
                </span>
                {application.state && (
                  <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                    <FiMapPin aria-hidden="true" /> {application.state}
                  </span>
                )}
              </div>
              <h2 id="timeline-modal-title" className="mt-1 font-display text-lg font-bold text-gray-900">
                {application.schemeName}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="focus-ring flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            >
              <FiX className="text-lg" />
            </button>
          </div>

          {/* Body */}
          <div className="space-y-6 p-6">
            {/* Quick Details Card */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-gray-500">Applicant</p>
                  <p className="font-semibold text-gray-900">{application.applicantName}</p>
                </div>
                <div>
                  <p className="text-gray-500">Applied Date</p>
                  <p className="font-semibold text-gray-900">{application.appliedDate}</p>
                </div>
                <div className="col-span-2 border-t border-gray-200 pt-2">
                  <p className="text-gray-500">Benefit / Amount</p>
                  <p className="font-bold text-primary-700">{application.amount}</p>
                </div>
              </div>

              {application.remarks && (
                <div className="mt-3 rounded-xl border border-primary-100 bg-white p-3 text-gray-700">
                  <strong className="block text-primary-800">Status Remarks:</strong>
                  <p className="mt-0.5 leading-relaxed">{application.remarks}</p>
                </div>
              )}
            </div>

            {/* Timeline Tree */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-display text-sm font-bold text-gray-900">
                <FiClock className="text-primary-600" />
                Progress Milestones Timeline
              </h3>

              <div className="relative pl-6">
                {/* Vertical Line */}
                <div
                  className="absolute bottom-4 left-2.5 top-3 w-0.5 bg-gray-200"
                  aria-hidden="true"
                />

                <div className="space-y-6">
                  {application.timeline?.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-4">
                      {/* Node Bullet */}
                      <span
                        className={`absolute -left-6 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ring-4 ring-white ${
                          step.completed
                            ? 'bg-emerald-600 text-white shadow-soft'
                            : step.current
                              ? 'bg-accent-500 text-white animate-pulse'
                              : 'bg-gray-200 text-gray-500'
                        }`}
                        aria-hidden="true"
                      >
                        {step.completed ? <FiCheck /> : idx + 1}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <p
                            className={`text-sm font-bold ${
                              step.completed || step.current ? 'text-gray-900' : 'text-gray-400'
                            }`}
                          >
                            {step.title}
                          </p>
                          <span className="text-[11px] text-gray-400 font-medium">
                            {step.date}
                          </span>
                        </div>
                        {step.description && (
                          <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
                            {step.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 flex justify-end border-t border-gray-100 bg-white/95 px-6 py-4 backdrop-blur">
            <Button type="button" variant="primary" onClick={onClose} size="sm">
              Close Timeline
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
