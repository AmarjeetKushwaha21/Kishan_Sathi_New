import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import {
  CATEGORIES,
  COMMODITIES,
  COMPARE_SEED,
  FAVORITE_SEED,
  MANDIS,
  buildTodayPrices,
  getHistory,
  getMandiHistory,
} from '@/data/mock/mandiPrices';

const FAVORITES_KEY = 'ks_mandi_favorites';
const TODAY_PRICE_ALL = buildTodayPrices();

function loadFavorites() {
  try {
    const stored = JSON.parse(localStorage.getItem(FAVORITES_KEY));
    if (Array.isArray(stored) && stored.length > 0) return stored;
  } catch {
    // ignore corrupt storage
  }
  return FAVORITE_SEED;
}

const MandiPriceContext = createContext(null);

export function MandiPriceProvider({ children }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('modal-desc');
  const [selectedMandiId, setSelectedMandiId] = useState(MANDIS[0].id);
  const [favorites, setFavorites] = useState(loadFavorites);
  const [compare, setCompare] = useState(COMPARE_SEED);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const filteredCommodities = useMemo(() => {
    const q = search.trim().toLowerCase();
    return COMMODITIES.filter((c) => {
      if (category !== 'All' && c.category !== category) return false;
      if (q && !`${c.name} ${c.category}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [search, category]);

  const todayPrices = useMemo(() => {
    const rows = buildTodayPrices().filter((r) => {
      if (r.mandiId !== selectedMandiId) return false;
      return filteredCommodities.some((c) => c.key === r.commodityKey);
    });
    return rows.sort((a, b) => {
      if (sort === 'modal-asc') return a.modal - b.modal;
      if (sort === 'modal-desc') return b.modal - a.modal;
      return b.changePct - a.changePct;
    });
  }, [selectedMandiId, filteredCommodities, sort]);

  const bestPriceMap = useMemo(() => {
    const map = {};
    COMMODITIES.forEach((c) => {
      const rows = TODAY_PRICE_ALL.filter((r) => r.commodityKey === c.key);
      const best = rows.reduce((max, r) => (r.modal > max.modal ? r : max), rows[0]);
      map[c.key] = best;
    });
    return map;
  }, []);

  const selectedMandi = MANDIS.find((m) => m.id === selectedMandiId) || MANDIS[0];
  const selectedCommodities = filteredCommodities;

  const toggleFavorite = useCallback((mandiId) => {
    setFavorites((prev) => (prev.includes(mandiId) ? prev.filter((id) => id !== mandiId) : [...prev, mandiId]));
  }, []);

  const isFavorite = useCallback((mandiId) => favorites.includes(mandiId), [favorites]);

  const toggleCompare = useCallback((commodityKey) => {
    setCompare((prev) =>
      prev.includes(commodityKey) ? prev.filter((key) => key !== commodityKey) : [...prev, commodityKey].slice(-4)
    );
  }, []);

  const value = useMemo(
    () => ({
      mandis: MANDIS,
      categories: CATEGORIES,
      commodities: COMMODITIES,
      search,
      setSearch,
      category,
      setCategory,
      sort,
      setSort,
      selectedMandiId,
      setSelectedMandiId,
      selectedMandi,
      favorites,
      toggleFavorite,
      isFavorite,
      compare,
      toggleCompare,
      filteredCommodities: selectedCommodities,
      todayPrices,
      bestPriceMap,
      getHistory,
      getMandiHistory,
    }),
    [
      search,
      category,
      sort,
      selectedMandiId,
      selectedMandi,
      favorites,
      toggleFavorite,
      isFavorite,
      compare,
      toggleCompare,
      selectedCommodities,
      todayPrices,
      bestPriceMap,
    ]
  );

  return <MandiPriceContext.Provider value={value}>{children}</MandiPriceContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMandiPrice() {
  const ctx = useContext(MandiPriceContext);
  if (!ctx) throw new Error('useMandiPrice must be used within a MandiPriceProvider');
  return ctx;
}