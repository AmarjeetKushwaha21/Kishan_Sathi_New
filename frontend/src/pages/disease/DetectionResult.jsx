import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiActivity,
  FiAlertTriangle,
  FiCheckCircle,
  FiCpu,
  FiRefreshCw,
  FiShield,
  FiThermometer,
} from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Alert from '@/components/ui/Alert';
import DiseaseHeader from '@/components/disease/DiseaseHeader';
import ConfidenceMeter from '@/components/disease/ConfidenceMeter';
import SymptomList from '@/components/disease/SymptomList';
import DiseaseFactBar from '@/components/disease/DiseaseFactBar';
import { useDisease } from '@/context/DiseaseContext';
import { AI_STEPS } from '@/data/mock/diseaseDetection';
import { cn } from '@/utils/cn';

const STEP_ICONS = {
  upload: '📤',
  leaf: '🍃',
  db: '🗄️',
  plan: '🧪',
};

function ScanningState({ progress }) {
  const stepIndex = Math.min(Math.floor(progress / 25), AI_STEPS.length - 1);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-lg">
      <Card variant="soft" className="text-center">
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-primary-200/60" aria-hidden="true" />
          <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-3xl text-white shadow-card">
            <FiCpu className="animate-float" aria-hidden="true" />
          </span>
        </div>
        <h3 className="mt-5 font-display text-lg font-bold text-gray-900">AI is analysing your leaf…</h3>
        <p className="mt-1 text-sm text-gray-500">Please keep this screen open. Results take a few seconds.</p>

        <div className="mx-auto mt-6 h-2.5 max-w-xs overflow-hidden rounded-full bg-gray-100" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
          <motion.div
            animate={{ width: `${progress}%` }}
            className="h-full rounded-full bg-primary-600 transition-all duration-300"
          />
        </div>
        <p className="mt-2 text-xs font-bold text-primary-700">{progress}% complete</p>

        <ol className="mt-6 space-y-2 text-left">
          {AI_STEPS.map((step, index) => (
            <li
              key={step.label}
              className={cn(
                'flex items-center gap-3 rounded-xl border px-4 py-2.5 text-sm transition',
                index < stepIndex
                  ? 'border-primary-200 bg-primary-50 text-primary-700'
                  : index === stepIndex
                    ? 'border-primary-300 bg-white text-gray-800'
                    : 'border-gray-200 bg-white text-gray-400'
              )}
            >
              <span aria-hidden="true">{STEP_ICONS[step.icon]}</span>
              <span className="flex-1 font-medium">{step.label}</span>
              {index < stepIndex && <FiCheckCircle className="text-primary-600" aria-hidden="true" />}
              {index === stepIndex && (
                <span className="flex gap-1" aria-hidden="true">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary-600" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary-600" style={{ animationDelay: '150ms' }} />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary-600" style={{ animationDelay: '300ms' }} />
                </span>
              )}
            </li>
          ))}
        </ol>
      </Card>
    </motion.div>
  );
}

function ResultView({ disease, onRescan }) {
  const [copied, setCopied] = useState(false);
  const severityTone =
    disease.severity === 'critical' || disease.severity === 'high'
      ? { badge: 'danger', ring: 'border-red-300 bg-red-50', text: 'text-red-700' }
      : { badge: 'accent', ring: 'border-accent-300 bg-accent-50', text: 'text-accent-700' };

  return (
    <motion.div key={disease.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Alert
        variant={disease.severity === 'critical' || disease.severity === 'high' ? 'warning' : 'success'}
        title={disease.severity === 'critical' ? 'Action needed today' : disease.severity === 'high' ? 'Act within the next few days' : 'Condition is manageable'}
      >
        {disease.yieldLoss} of yield can be saved if you follow the treatment within <strong>{disease.window.toLowerCase()}</strong>.
      </Alert>

      <Card variant="soft" className="mt-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 text-3xl" aria-hidden="true">
              {disease.emoji}
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-lg font-bold text-gray-900">{disease.name}</h3>
                <Badge size="sm" variant={severityTone.badge} className="capitalize">{disease.severity} severity</Badge>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {disease.crop} · detected on your upload
              </p>
            </div>
          </div>
          <div className="w-full sm:w-64">
            <ConfidenceMeter confidence={disease.confidence} />
          </div>
        </div>

        <div className="mt-5">
          <DiseaseFactBar disease={disease} />
        </div>

        <div className="mt-5 rounded-xl border border-primary-100 bg-primary-50/50 p-4">
          <p className="flex items-center gap-2 text-xs font-semibold text-primary-700">
            <FiThermometer aria-hidden="true" /> Favourable weather condition
          </p>
          <p className="mt-1 text-sm text-gray-700">{disease.weatherTrigger}</p>
        </div>
      </Card>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card variant="flat">
          <SymptomList type="symptoms" items={disease.symptoms} />
        </Card>
        <Card variant="flat">
          <SymptomList type="causes" items={disease.causes} />
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card variant="flat" className={cn('border', severityTone.ring)}>
          <SymptomList type="treatment" items={disease.treatment} />
        </Card>
        <Card variant="flat">
          <SymptomList type="prevent" items={disease.prevent} />
        </Card>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button leftIcon={FiRefreshCw} onClick={onRescan}>Scan another leaf</Button>
        <Link to="/dashboard/disease-detection/treatments" className="focus-ring rounded-xl">
          <Button variant="outline" leftIcon={FiActivity}>Full treatment library</Button>
        </Link>
        <Button
          variant="ghost"
          leftIcon={FiShield}
          onClick={() => {
            navigator.clipboard?.writeText(disease.name).catch(() => {});
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
        >
          {copied ? 'Copied!' : 'Copy result'}
        </Button>
      </div>

      <p className="mt-4 flex items-center gap-1.5 text-[11px] text-gray-400">
        <FiAlertTriangle aria-hidden="true" />
        AI suggestion only — confirm with an agronomist for field-scale treatment.
      </p>
    </motion.div>
  );
}

export default function DetectionResult() {
  const { result, scanning, progress, resetScan } = useDisease();
  const navigate = useNavigate();

  function handleRescan() {
    resetScan();
    navigate('/dashboard/disease-detection');
  }

  return (
    <PageTransition>
      <DiseaseHeader
        title="Detection Result"
        subtitle="AI diagnosis for your leaf"
        showBack={!scanning && !result}
        status={scanning ? 'Scanning…' : result ? 'Complete' : 'No scan yet'}
      />

      <AnimatePresence mode="wait">
        {scanning ? (
          <ScanningState key="scanning" progress={progress} />
        ) : result ? (
          <ResultView key={result.id} disease={result} onRescan={handleRescan} />
        ) : (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-lg">
            <Card variant="soft" className="text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-3xl text-primary-600" aria-hidden="true">
                <FiCpu />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-gray-900">No scan yet</h3>
              <p className="mx-auto mt-1 max-w-sm text-sm text-gray-500">
                Upload a leaf photo or pick a sample to get an instant AI diagnosis with treatment steps.
              </p>
              <div className="mt-5">
                <Link to="/dashboard/disease-detection" className="focus-ring rounded-xl">
                  <Button>Start a scan</Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}