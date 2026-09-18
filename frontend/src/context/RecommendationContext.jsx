import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { generateRecommendation, SEED_RESULT } from '@/data/mock/aiRecommendation';

const RecommendationContext = createContext(null);

function readStorage() {
  try {
    const raw = localStorage.getItem('ks_ai_recommendation');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function RecommendationProvider({ children }) {
  const [result, setResult] = useState(readStorage() || SEED_RESULT);
  const [loading, setLoading] = useState(false);

  const generate = useCallback(async (input) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1600));
    const next = generateRecommendation(input);
    try {
      localStorage.setItem('ks_ai_recommendation', JSON.stringify(next));
    } catch {
      // storage unavailable — ignore
    }
    setResult(next);
    setLoading(false);
    return next;
  }, []);

  const reset = useCallback(() => {
    setResult(SEED_RESULT);
  }, []);

  const value = useMemo(
    () => ({ result, loading, generate, reset }),
    [result, loading, generate, reset]
  );

  return <RecommendationContext.Provider value={value}>{children}</RecommendationContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRecommendation() {
  const ctx = useContext(RecommendationContext);
  if (!ctx) throw new Error('useRecommendation must be used within a RecommendationProvider');
  return ctx;
}