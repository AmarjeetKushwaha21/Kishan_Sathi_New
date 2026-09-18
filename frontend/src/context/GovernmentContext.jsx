import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import CENTRAL_SCHEMES_DATA from '@/data/centralSchemes.json';
import STATE_SCHEMES_DATA from '@/data/stateSchemes.json';
import APPLICATIONS_DATA from '@/data/applications.json';

const GovernmentContext = createContext(null);

const STORAGE_KEY_APPLICATIONS = 'ks_gov_applications';
const STORAGE_KEY_SAVED = 'ks_gov_saved_schemes';
const STORAGE_KEY_STATE = 'ks_gov_selected_state';

export const SCHEME_CATEGORIES = [
  'All Categories',
  'Subsidies',
  'Agricultural Loans',
  'Crop Insurance',
  'Farm Equipment',
  'Irrigation',
  'Seeds',
  'Fertilizers',
  'Farmer Benefits',
  'Other Agricultural Support',
];

export const INDIAN_STATES = [
  'Uttar Pradesh',
  'Bihar',
  'Maharashtra',
  'Punjab',
  'Haryana',
  'Karnataka',
  'Andhra Pradesh',
  'Madhya Pradesh',
  'Rajasthan',
  'Tamil Nadu',
  'Gujarat',
  'West Bengal',
];

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed !== null && parsed !== undefined ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function GovernmentProvider({ children }) {
  const [centralSchemes] = useState(CENTRAL_SCHEMES_DATA);
  const [stateSchemes] = useState(STATE_SCHEMES_DATA);
  const [applications, setApplications] = useState(() =>
    readStorage(STORAGE_KEY_APPLICATIONS, APPLICATIONS_DATA)
  );
  const [savedSchemeIds, setSavedSchemeIds] = useState(() =>
    readStorage(STORAGE_KEY_SAVED, ['CS-001', 'CS-002', 'SS-PB-001'])
  );
  const [selectedState, setSelectedState] = useState(() =>
    readStorage(STORAGE_KEY_STATE, 'Punjab')
  );

  // Sync applications to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(applications));
    } catch {
      // storage unavailable
    }
  }, [applications]);

  // Sync saved schemes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(savedSchemeIds));
    } catch {
      // storage unavailable
    }
  }, [savedSchemeIds]);

  // Sync state selection to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify(selectedState));
    } catch {
      // storage unavailable
    }
  }, [selectedState]);

  const toggleSaveScheme = useCallback((schemeId) => {
    setSavedSchemeIds((prev) => {
      if (prev.includes(schemeId)) {
        return prev.filter((id) => id !== schemeId);
      }
      return [...prev, schemeId];
    });
  }, []);

  const isSchemeSaved = useCallback(
    (schemeId) => savedSchemeIds.includes(schemeId),
    [savedSchemeIds]
  );

  const applyScheme = useCallback((scheme, formData) => {
    const today = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const timeNow = new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const newAppId = `APP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const trackingCode = `${scheme.id.startsWith('CS') ? 'CEN' : 'STA'}-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const newApplication = {
      id: newAppId,
      schemeId: scheme.id,
      schemeName: scheme.name,
      schemeType: scheme.state ? 'State' : 'Central',
      state: scheme.state || undefined,
      category: scheme.category,
      applicantName: formData.farmerName || 'Farmer',
      appliedDate: today,
      status: 'Submitted',
      statusLabel: 'Submitted (Under Scrutiny)',
      trackingId: trackingCode,
      amount: scheme.benefitAmount || scheme.benefits,
      remarks: `Application successfully submitted with ${formData.documentsCount || 3} verified documents. Awaiting departmental verification.`,
      timeline: [
        {
          title: 'Application Initiated',
          date: `${today}, ${timeNow}`,
          completed: true,
          description: `Applicant details for ${formData.farmerName || 'Farmer'} registered.`,
        },
        {
          title: 'Application Submitted',
          date: `${today}, ${timeNow}`,
          completed: true,
          current: true,
          description: `Ref #${trackingCode} acknowledged on official portal.`,
        },
        {
          title: 'Document & Field Verification',
          date: 'Expected in 3-5 working days',
          completed: false,
          description: 'Nodal officer will verify uploaded certificates and land records.',
        },
        {
          title: 'Departmental Sanction',
          date: 'Pending Verification',
          completed: false,
          description: 'Sanction order and benefit calculation.',
        },
        {
          title: 'Direct Benefit Transfer (DBT)',
          date: 'Pending Sanction',
          completed: false,
          description: 'Fund transfer to Aadhaar linked bank account.',
        },
      ],
    };

    setApplications((prev) => [newApplication, ...prev]);
    return newApplication;
  }, []);

  const value = useMemo(
    () => ({
      centralSchemes,
      stateSchemes,
      applications,
      savedSchemeIds,
      selectedState,
      categories: SCHEME_CATEGORIES,
      statesList: INDIAN_STATES,
      setSelectedState,
      toggleSaveScheme,
      isSchemeSaved,
      applyScheme,
    }),
    [
      centralSchemes,
      stateSchemes,
      applications,
      savedSchemeIds,
      selectedState,
      toggleSaveScheme,
      isSchemeSaved,
      applyScheme,
    ]
  );

  return <GovernmentContext.Provider value={value}>{children}</GovernmentContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGovernment() {
  const context = useContext(GovernmentContext);
  if (!context) {
    throw new Error('useGovernment must be used within a GovernmentProvider');
  }
  return context;
}
