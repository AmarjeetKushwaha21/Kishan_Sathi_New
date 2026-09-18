import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiActivity,
  FiAlertTriangle,
  FiCheckCircle,
  FiCamera,
  FiFileText,
  FiShield,
} from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import StatCard from '@/components/ui/StatCard';
import Alert from '@/components/ui/Alert';
import DiseaseHeader from '@/components/disease/DiseaseHeader';
import UploadZone from '@/components/disease/UploadZone';
import PestAlertCard from '@/components/disease/PestAlertCard';
import ScanHistoryRow from '@/components/disease/ScanHistoryRow';
import { useDisease } from '@/context/DiseaseContext';
import { CROPS, REMEDY_STEPS } from '@/data/mock/diseaseDetection';
import { cn } from '@/utils/cn';

const GRADIENT_HEX = {
  'from-amber-400': '#fbbf24',
  'to-orange-500': '#f97316',
  'from-emerald-400': '#34d399',
  'to-green-600': '#16a34a',
  'from-red-400': '#f87171',
  'to-rose-600': '#e11d48',
  'from-yellow-400': '#facc15',
  'to-amber-600': '#d97706',
};

function samplePreviewUrl(gradient) {
  const [fromClass, toClass] = gradient.split(' ');
  const from = GRADIENT_HEX[fromClass] || '#16a34a';
  const to = GRADIENT_HEX[toClass] || '#22c55e';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="400" height="300" fill="url(#g)"/><text x="200" y="160" font-size="72" text-anchor="middle" fill="rgba(255,255,255,0.9)">🌿</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const FIELD_OPTIONS = [
  { key: 'North Field · 3.5 acres', label: 'North Field · 3.5 acres' },
  { key: 'South Field · 2 acres', label: 'South Field · 2 acres' },
  { key: 'East Paddy Plot', label: 'East Paddy Plot' },
  { key: 'Greenhouse Block B', label: 'Greenhouse Block B' },
];

export default function DetectNow() {
  const navigate = useNavigate();
  const { stats, alerts, samples, scans, scanImage, scanning, error } = useDisease();
  const [preview, setPreview] = useState(null);
  const [sampleId, setSampleId] = useState(null);
  const [cropKey, setCropKey] = useState('wheat');
  const [field, setField] = useState(FIELD_OPTIONS[0].key);

  async function handleAnalyse() {
    if (scanning) return;
    await scanImage({ cropKey, field, sampleId });
    navigate('/dashboard/disease-detection/result');
  }

  function pickSample(sample) {
    setSampleId(sample.id);
    setCropKey(sample.cropKey);
    setPreview(samplePreviewUrl(sample.gradient));
  }

  return (
    <PageTransition>
      <DiseaseHeader
        title="Disease Detection"
        subtitle="Scan a leaf with AI and get treatment in seconds"
        status={`${stats.scansThisMonth} scans this month`}
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard icon={FiCamera} label="Scans this month" value={stats.scansThisMonth} trend="+2 vs last month" color="primary" />
        <StatCard icon={FiActivity} label="Fields affected" value={stats.affectedFields} trend="1 resolved" trendDirection="down" color="accent" />
        <StatCard icon={FiCheckCircle} label="Resolved cases" value={stats.resolvedCases} trend="75% success" color="sky" />
        <StatCard icon={FiAlertTriangle} label="Active alerts" value={stats.activeAlerts} trend="2 for your region" color="violet" />
      </div>

      {error && (
        <div className="mt-5">
          <Alert variant="error" title="Scan failed" onClose={() => {}}>
            Something went wrong while analysing the image. Please try again.
          </Alert>
        </div>
      )}

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_360px]">
        <section aria-label="Upload leaf image">
          <Card variant="soft">
            <SectionHeader title="Upload a leaf photo" subtitle="Clear, well-lit photos give the most accurate result" />
            <UploadZone preview={preview} onSelect={setPreview} onAnalyse={handleAnalyse} disabled={scanning} />

            <div className="mt-6">
              <SectionHeader title="Scan details" subtitle="Tell us where this leaf is from" />
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-gray-600">Crop</span>
                  <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
                    {CROPS.map((crop) => (
                      <button
                        key={crop.key}
                        type="button"
                        aria-pressed={cropKey === crop.key}
                        onClick={() => setCropKey(crop.key)}
                        className={cn(
                          'focus-ring flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition',
                          cropKey === crop.key
                            ? 'border-primary-600 bg-primary-600 text-white shadow-soft'
                            : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
                        )}
                      >
                        <span aria-hidden="true">{crop.emoji}</span> {crop.label}
                      </button>
                    ))}
                  </div>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-gray-600">Field location</span>
                  <select
                    value={field}
                    onChange={(event) => setField(event.target.value)}
                    className="input-base w-full"
                  >
                    {FIELD_OPTIONS.map((option) => (
                      <option key={option.key} value={option.key}>{option.label}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          </Card>
        </section>

        <section aria-label="Sample images">
          <Card variant="tinted">
            <SectionHeader title="Try a sample leaf" subtitle="No photo handy? Analyse one of these" />
            <div className="space-y-3">
              {samples.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => pickSample(sample)}
                  className={cn(
                    'focus-ring group flex w-full items-center gap-3 rounded-xl border bg-white p-3 text-left transition hover:border-primary-400',
                    sampleId === sample.id ? 'border-primary-600 ring-2 ring-primary-500/20' : 'border-gray-200'
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-xl text-white', sample.gradient)}
                  >
                    {sample.emoji}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-gray-800">{sample.label}</span>
                    <span className="block text-xs text-gray-500">{sample.cropKey === 'paddy' ? 'Rice' : sample.cropKey[0].toUpperCase() + sample.cropKey.slice(1)} · sample image</span>
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </section>
      </div>

      <section aria-label="How it works" className="mt-6">
        <Card variant="flat">
          <SectionHeader title="How the AI detects disease" subtitle="4 simple steps" />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {REMEDY_STEPS.map((step, index) => (
              <li key={step.title} className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{step.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      </section>

      <section aria-label="Active alerts" className="mt-6">
        <SectionHeader
          title="Pest & disease alerts"
          subtitle="For your region and crops"
          to="/dashboard/disease-detection/alerts"
          linkLabel="All alerts"
        />
        <div className="grid gap-4 lg:grid-cols-2">
          {alerts.filter((a) => a.active).slice(0, 2).map((alert) => (
            <PestAlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      </section>

      <section aria-label="Recent scans" className="mt-6">
        <SectionHeader
          title="Recent scans"
          subtitle="Your latest AI detections"
          to="/dashboard/disease-detection/history"
          linkLabel="Full history"
        />
        <div className="space-y-3">
          {scans.slice(0, 3).map((scan) => (
            <ScanHistoryRow key={scan.id} scan={scan} />
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 p-5 text-white shadow-card">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-lg" aria-hidden="true">
              <FiShield />
            </span>
            <div>
              <p className="font-display text-sm font-bold">Need the full treatment library?</p>
              <p className="text-xs text-primary-100">Browse remedies for every crop on your farm.</p>
            </div>
          </div>
          <Link to="/dashboard/disease-detection/treatments" className="focus-ring rounded-xl">
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-bold text-primary-700 transition hover:bg-primary-50">
              <FiFileText aria-hidden="true" /> Open library
            </span>
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}