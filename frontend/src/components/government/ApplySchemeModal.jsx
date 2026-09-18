import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FiCheckCircle,
  FiUploadCloud,
  FiFileText,
  FiArrowRight,
  FiArrowLeft,
  FiCheck,
  FiShield,
  FiX,
  FiCopy,
} from 'react-icons/fi';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import { useAuth } from '@/context/AuthContext';
import { useFarmer } from '@/context/FarmerContext';
import { useGovernment } from '@/context/GovernmentContext';

export default function ApplySchemeModal({ scheme, isOpen, onClose, onSuccess }) {
  const { user } = useAuth();
  const { profile } = useFarmer();
  const { applyScheme } = useGovernment();

  const [step, setStep] = useState(1);
  const [submittedApp, setSubmittedApp] = useState(null);
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    farmerName: user?.fullName || user?.name || profile?.fullName || 'Farmer',
    phone: user?.phone || profile?.phone || '',
    aadhaarLast4: '4921',
    landArea: '3.5',
    surveyNumber: '84/2A',
    village: profile?.village || 'Village Gaddowal',
    district: 'Ludhiana',
    crop: 'Wheat',
    bankAccount: 'XXXX XXXX 4921',
    ifsc: 'SBIN0001234',
    uploadedDocs: {
      aadhaar: true,
      landRecord: true,
      bankPassbook: true,
      sowingCert: false,
    },
    termsAccepted: true,
  });

  if (!isOpen || !scheme) return null;

  function handleToggleDoc(docKey) {
    setFormData((prev) => ({
      ...prev,
      uploadedDocs: {
        ...prev.uploadedDocs,
        [docKey]: !prev.uploadedDocs[docKey],
      },
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const docCount = Object.values(formData.uploadedDocs).filter(Boolean).length;
    const newApp = applyScheme(scheme, {
      ...formData,
      documentsCount: docCount,
    });
    setSubmittedApp(newApp);
    setStep(4);
    if (onSuccess) onSuccess(newApp);
  }

  function handleCopyId(id) {
    navigator.clipboard?.writeText(id).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (step !== 4) onClose();
          }}
          aria-hidden="true"
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          role="dialog"
          aria-modal="true"
          className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl outline-none"
        >
          {/* Top Step Header */}
          <div className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 px-6 py-4 backdrop-blur sm:px-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary-700">
                  Online Scheme Application
                </p>
                <h2 className="mt-0.5 font-display text-base font-bold text-gray-900 sm:text-lg">
                  {scheme.name}
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

            {/* Stepper Indicator */}
            {step < 4 && (
              <div className="mt-4 flex items-center justify-between">
                {[
                  { num: 1, label: 'Applicant & Land' },
                  { num: 2, label: 'Documents' },
                  { num: 3, label: 'Review & Submit' },
                ].map((s) => (
                  <div key={s.num} className="flex flex-1 items-center">
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition ${
                          step === s.num
                            ? 'bg-primary-600 text-white ring-4 ring-primary-100'
                            : step > s.num
                              ? 'bg-emerald-600 text-white'
                              : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {step > s.num ? <FiCheck /> : s.num}
                      </span>
                      <span
                        className={`hidden text-xs font-semibold sm:inline ${
                          step === s.num ? 'text-primary-800' : 'text-gray-500'
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                    {s.num < 3 && (
                      <div
                        className={`mx-2 h-0.5 flex-1 ${
                          step > s.num ? 'bg-emerald-500' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Step 1: Farmer & Land Details */}
          {step === 1 && (
            <div className="space-y-4 p-6 sm:p-8">
              <div className="rounded-2xl bg-primary-50/70 p-4 border border-primary-100">
                <p className="text-xs text-primary-800 font-medium">
                  <strong>Pre-filled from Farmer Profile:</strong> Please verify your personal and field details for scheme subsidy disbursement.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Farmer Full Name"
                  value={formData.farmerName}
                  onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
                  required
                />
                <Input
                  label="Registered Mobile Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
                <Input
                  label="Aadhaar Last 4 Digits"
                  value={formData.aadhaarLast4}
                  maxLength={4}
                  onChange={(e) => setFormData({ ...formData, aadhaarLast4: e.target.value })}
                  required
                />
                <Input
                  label="Cultivable Land Area (Acres)"
                  type="number"
                  step="0.1"
                  value={formData.landArea}
                  onChange={(e) => setFormData({ ...formData, landArea: e.target.value })}
                  required
                />
                <Input
                  label="Survey / Khasra Number"
                  value={formData.surveyNumber}
                  onChange={(e) => setFormData({ ...formData, surveyNumber: e.target.value })}
                  required
                />
                <Input
                  label="Village / Gram Panchayat"
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  required
                />
                <Input
                  label="District"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  required
                />
                <Input
                  label="Primary Crop"
                  value={formData.crop}
                  onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                  required
                />
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  rightIcon={FiArrowRight}
                  onClick={() => setStep(2)}
                >
                  Continue to Documents
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Documents Verification Checklist */}
          {step === 2 && (
            <div className="space-y-5 p-6 sm:p-8">
              <div>
                <h3 className="font-display text-base font-bold text-gray-900">
                  Required Documents Checklist
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Verify or upload the documents required for {scheme.name}.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    key: 'aadhaar',
                    title: 'Aadhaar Card (Front & Back)',
                    desc: 'Proof of Identity & Address (Auto-linked with eKYC)',
                    verified: formData.uploadedDocs.aadhaar,
                  },
                  {
                    key: 'landRecord',
                    title: 'Land Ownership Document (Khasra / Jamabandi / 7/12)',
                    desc: 'Verified by State Revenue Department Portal',
                    verified: formData.uploadedDocs.landRecord,
                  },
                  {
                    key: 'bankPassbook',
                    title: 'Bank Passbook / Cancelled Cheque (DBT Enabled)',
                    desc: 'SBI Account ending in XXXX 4921',
                    verified: formData.uploadedDocs.bankPassbook,
                  },
                  {
                    key: 'sowingCert',
                    title: 'Crop Sowing / Dealer Quotation Document',
                    desc: 'Certified by Village Agriculture Worker',
                    verified: formData.uploadedDocs.sowingCert,
                  },
                ].map((doc) => (
                  <div
                    key={doc.key}
                    onClick={() => handleToggleDoc(doc.key)}
                    className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition ${
                      doc.verified
                        ? 'border-emerald-200 bg-emerald-50/50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${
                          doc.verified ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        <FiFileText />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{doc.title}</p>
                        <p className="text-xs text-gray-500">{doc.desc}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {doc.verified ? (
                        <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">
                          <FiCheckCircle className="text-sm" /> Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-200">
                          <FiUploadCloud className="text-sm" /> Click to Attach
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-between gap-3 pt-4 border-t border-gray-100">
                <Button
                  type="button"
                  variant="outline"
                  leftIcon={FiArrowLeft}
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  rightIcon={FiArrowRight}
                  onClick={() => setStep(3)}
                >
                  Proceed to Review
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Submit */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-8">
              <div>
                <h3 className="font-display text-base font-bold text-gray-900">
                  Review & Final Submission
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Please review your details before final submission on the portal.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-4 space-y-3 text-xs">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Scheme Name</span>
                  <span className="font-bold text-gray-900 text-right">{scheme.name}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Benefit Highlight</span>
                  <span className="font-bold text-primary-700 text-right">
                    {scheme.benefitAmount || scheme.benefits}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Applicant Name</span>
                  <span className="font-semibold text-gray-800">{formData.farmerName}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Land & Location</span>
                  <span className="font-semibold text-gray-800">
                    {formData.landArea} Acres (Khasra #{formData.surveyNumber}), {formData.village},{' '}
                    {formData.district}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Direct DBT Bank</span>
                  <span className="font-semibold text-gray-800">
                    SBI (A/c #{formData.bankAccount})
                  </span>
                </div>
              </div>

              <label className="flex items-start gap-2.5 rounded-xl border border-primary-200 bg-primary-50/50 p-3.5 text-xs text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                  required
                  className="mt-0.5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span>
                  I declare that all the information provided above is true to the best of my knowledge.
                  I authorize the Agriculture Department to verify my land records and Aadhaar eKYC.
                </span>
              </label>

              <div className="mt-6 flex justify-between gap-3 pt-4 border-t border-gray-100">
                <Button
                  type="button"
                  variant="outline"
                  leftIcon={FiArrowLeft}
                  onClick={() => setStep(2)}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  leftIcon={FiShield}
                  className="shadow-soft"
                  disabled={!formData.termsAccepted}
                >
                  Submit Application
                </Button>
              </div>
            </form>
          )}

          {/* Step 4: Submission Success Confirmation */}
          {step === 4 && submittedApp && (
            <div className="space-y-6 p-6 text-center sm:p-8">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 text-4xl text-emerald-600 shadow-card">
                <FiCheckCircle />
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-gray-900">
                  Application Submitted Successfully!
                </h3>
                <p className="mt-1.5 text-sm text-gray-600">
                  Your application for <strong className="text-gray-900">{scheme.name}</strong> has been registered.
                </p>
              </div>

              <div className="mx-auto max-w-md rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 text-left shadow-soft">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Application Reference / Tracking ID
                </p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="font-mono text-lg font-bold text-gray-900">
                    {submittedApp.trackingId}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyId(submittedApp.trackingId)}
                    className="focus-ring flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-emerald-700 shadow-soft hover:bg-emerald-100"
                  >
                    <FiCopy /> {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p className="mt-2 text-[11px] text-emerald-700">
                  Application ID: <strong className="font-mono">{submittedApp.id}</strong> · Status:{' '}
                  <Badge variant="sky" size="sm">
                    {submittedApp.status}
                  </Badge>
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4 text-xs text-gray-600 text-left space-y-1.5">
                <p className="font-bold text-gray-800">What happens next?</p>
                <p>1. SMS confirmation has been dispatched to +91 {formData.phone}.</p>
                <p>2. Physical document scrutiny will be completed within 3 to 5 business days.</p>
                <p>3. You can track real-time progress under the <strong>&ldquo;My Applications&rdquo;</strong> section anytime.</p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => {
                    onClose();
                    setStep(1);
                  }}
                  className="shadow-soft"
                >
                  View in My Applications
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
