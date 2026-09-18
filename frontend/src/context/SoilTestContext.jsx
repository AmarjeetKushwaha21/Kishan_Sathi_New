import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { BOOKING_SEED, LABS, SOIL_HISTORY, SOIL_REPORT, TEST_PACKAGES } from '@/data/mock/soilTest';

const SoilContext = createContext(null);

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable — ignore
  }
}

function nextReportId(existing) {
  const base = 100 + existing.length + 1;
  return `SR-2026-0${base}`;
}

export function SoilTestProvider({ children }) {
  const [selectedLabId, setSelectedLabId] = useState(LABS[0].id);
  const [selectedPackage, setSelectedPackage] = useState('standard');
  const [bookings, setBookings] = useState(() => readStorage('ks_soil_bookings', BOOKING_SEED));
  const [reports, setReports] = useState(() => readStorage('ks_soil_reports', [SOIL_REPORT, ...SOIL_HISTORY]));

  const latestReport = reports[0] || SOIL_REPORT;
  const selectedLab = LABS.find((lab) => lab.id === selectedLabId) || LABS[0];
  const selectedPackageInfo = TEST_PACKAGES.find((p) => p.key === selectedPackage) || TEST_PACKAGES[1];

  const bookAppointment = useCallback(
    ({ date, time, slot }) => {
      const id = `SB-${2842 + bookings.length + 1}`;
      const booking = {
        id,
        labName: selectedLab.name,
        package: selectedPackageInfo.name,
        date,
        time,
        slot,
        status: 'processing',
      };

      const reportId = nextReportId(reports);
      const newReport = {
        ...SOIL_REPORT,
        id: reportId,
        sampleId: `KS-${88921 + reports.length + 1}`,
        testedAt: date.replace('Sat, ', '').replace('Aug ', ''),
        package: selectedPackageInfo.name,
        labName: selectedLab.name,
        status: 'ready',
      };

      const nextBookings = [booking, ...bookings];
      const nextReports = [newReport, ...reports];
      setBookings(nextBookings);
      setReports(nextReports);
      writeStorage('ks_soil_bookings', nextBookings);
      writeStorage('ks_soil_reports', nextReports);
      return { booking, report: newReport };
    },
    [bookings, reports, selectedLab.name, selectedPackageInfo.name]
  );

  const value = useMemo(
    () => ({
      labs: LABS,
      packages: TEST_PACKAGES,
      bookings,
      reports,
      latestReport,
      selectedLabId,
      selectedLab,
      selectedPackage,
      selectedPackageInfo,
      setSelectedLabId,
      setSelectedPackage,
      bookAppointment,
    }),
    [
      bookings,
      reports,
      latestReport,
      selectedLabId,
      selectedLab,
      selectedPackage,
      selectedPackageInfo,
      bookAppointment,
    ]
  );

  return <SoilContext.Provider value={value}>{children}</SoilContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSoilTest() {
  const ctx = useContext(SoilContext);
  if (!ctx) throw new Error('useSoilTest must be used within a SoilTestProvider');
  return ctx;
}