import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { DISEASES, DISEASE_STATS, PEST_ALERTS, SAMPLE_IMAGES, SEED_SCANS } from '@/data/mock/diseaseDetection';

const DiseaseContext = createContext(null);

const STORAGE_KEY = 'ks_disease_scans';

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : SEED_SCANS;
  } catch {
    return SEED_SCANS;
  }
}

function findDisease(diseaseId) {
  return DISEASES.find((d) => d.id === diseaseId) || DISEASES[0];
}

export function DiseaseProvider({ children }) {
  const [scans, setScans] = useState(readStorage);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scans));
    } catch {
      // storage unavailable — ignore
    }
  }, [scans]);

  const scanImage = useCallback(
    async ({ cropKey, sampleId, field, diseaseId }) => {
      if (scanning) return null;
      setError(null);
      setResult(null);
      setScanning(true);
      setProgress(0);

      await new Promise((resolve) => setTimeout(resolve, 600));

      const interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + Math.floor(Math.random() * 18) + 8;
          return Math.min(next, 100);
        });
      }, 320);

      await new Promise((resolve) => setTimeout(resolve, 3400));
      clearInterval(interval);
      setProgress(100);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const selected =
        typeof diseaseId === 'string' && diseaseId
          ? findDisease(diseaseId)
          : SAMPLE_IMAGES.find((s) => s.id === sampleId)
            ? DISEASES.find((d) => d.cropKey === (SAMPLE_IMAGES.find((s) => s.id === sampleId).cropKey))
            : DISEASES.find((d) => d.cropKey === cropKey) || DISEASES[0];

      const scanRecord = {
        id: `SC-${Date.now().toString().slice(-4)}`,
        crop: selected.crop,
        cropKey: selected.cropKey,
        diseaseId: selected.id,
        confidence: selected.confidence,
        date: 'Just now',
        field: field || 'North Field · 3.5 acres',
        emoji: selected.emoji,
      };

      setScans((prev) => [scanRecord, ...prev]);
      setResult(selected);
      setScanning(false);
      return selected;
    },
    [scanning]
  );

  const resetScan = useCallback(() => {
    setResult(null);
    setProgress(0);
    setError(null);
    setScanning(false);
  }, []);

  const value = useMemo(
    () => ({
      scans,
      result,
      scanning,
      progress,
      error,
      diseases: DISEASES,
      stats: DISEASE_STATS,
      alerts: PEST_ALERTS,
      samples: SAMPLE_IMAGES,
      scanImage,
      resetScan,
    }),
    [scans, result, scanning, progress, error, scanImage, resetScan]
  );

  return <DiseaseContext.Provider value={value}>{children}</DiseaseContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDisease() {
  const ctx = useContext(DiseaseContext);
  if (!ctx) throw new Error('useDisease must be used within a DiseaseProvider');
  return ctx;
}
