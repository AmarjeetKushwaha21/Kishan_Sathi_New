import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import {
  ACHIEVEMENTS,
  BANK_DETAILS,
  CROP_HISTORY,
  DOCUMENTS,
  FARM_DETAILS,
  FARMER_IDENTITY,
  LAND_PARCELS,
  SETTINGS_SECTIONS,
} from '@/data/mock/farmerProfile';
import { useAuth } from '@/context/AuthContext';

const STORAGE_KEY = 'ks_farmer_profile';

function defaultSettings() {
  const settings = {};
  SETTINGS_SECTIONS.forEach((section) => {
    section.items.forEach((item) => {
      settings[item.key] = item.value;
    });
  });
  return settings;
}

function load() {
  const defaults = { profile: FARMER_IDENTITY, settings: defaultSettings() };
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored && typeof stored === 'object') {
      return {
        profile: { ...defaults.profile, ...(stored.profile || {}) },
        settings: { ...defaults.settings, ...(stored.settings || {}) },
      };
    }
  } catch {
    // ignore corrupt storage
  }
  return defaults;
}

const FarmerContext = createContext(null);

export function FarmerProvider({ children }) {
  const [{ profile, settings }, setState] = useState(load);
  const { user } = useAuth();

  // Dynamically synchronize active profile with authenticated user
  const activeProfile = useMemo(() => {
    if (!user) return profile;
    const userName = user.fullName || user.name || profile.fullName;
    const firstName = user.firstName || userName.split(' ')[0];
    const lastName = user.lastName || userName.split(' ').slice(1).join(' ') || '';
    return {
      ...profile,
      id: user.id || user._id || profile.id,
      fullName: userName,
      name: userName,
      firstName,
      lastName,
      phone: user.phone || profile.phone,
      email: user.email || profile.email,
    };
  }, [profile, user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ profile, settings }));
    try {
      const hasToken = Boolean(localStorage.getItem('ks_access_token'));
      if (!hasToken || !user) return;

      const rawUser = localStorage.getItem('ks_user');
      const currentUser = rawUser ? JSON.parse(rawUser) : {};
      localStorage.setItem(
        'ks_user',
        JSON.stringify({
          ...currentUser,
          id: activeProfile.id,
          fullName: activeProfile.fullName,
          name: activeProfile.fullName,
          firstName: activeProfile.firstName,
          lastName: activeProfile.lastName,
          phone: activeProfile.phone,
          email: activeProfile.email,
          role: user.role || 'farmer',
        })
      );
    } catch {
      // ignore
    }
  }, [profile, settings, user, activeProfile]);


  const updateProfile = useCallback((patch) => {
    setState((prev) => ({ ...prev, profile: { ...prev.profile, ...patch } }));
  }, []);

  const setSetting = useCallback((key, value) => {
    setState((prev) => ({ ...prev, settings: { ...prev.settings, [key]: value } }));
  }, []);

  const resetProfile = useCallback(() => {
    setState({ profile: FARMER_IDENTITY, settings: defaultSettings() });
  }, []);

  const landStats = useMemo(() => {
    const owned = LAND_PARCELS.filter((l) => l.ownership === 'Owned').reduce((s, l) => s + l.size, 0);
    const leased = LAND_PARCELS.filter((l) => l.ownership === 'Leased').reduce((s, l) => s + l.size, 0);
    const total = LAND_PARCELS.reduce((s, l) => s + l.size, 0);
    return { total, owned, leased, count: LAND_PARCELS.length };
  }, []);

  const value = useMemo(
    () => ({
      profile: activeProfile,
      updateProfile,
      settings,
      setSetting,
      resetProfile,
      farm: FARM_DETAILS,
      lands: LAND_PARCELS,
      landStats,
      documents: DOCUMENTS,
      bank: BANK_DETAILS,
      crops: CROP_HISTORY,
      achievements: ACHIEVEMENTS,
    }),
    [activeProfile, settings, updateProfile, setSetting, resetProfile, landStats]
  );

  return <FarmerContext.Provider value={value}>{children}</FarmerContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFarmer() {
  const ctx = useContext(FarmerContext);
  if (!ctx) throw new Error('useFarmer must be used within a FarmerProvider');
  return ctx;
}