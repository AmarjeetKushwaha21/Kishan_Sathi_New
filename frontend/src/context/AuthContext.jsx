import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import authService from '@/api/authService';
import { STORAGE_KEYS } from '@/constants/app';

const AuthContext = createContext(null);

function readStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.user) || localStorage.getItem('kishanSathiUser');
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function readStoredSession() {
  try {
    const storedToken = localStorage.getItem(STORAGE_KEYS.token) || localStorage.getItem('kishanSathiToken');
    const storedUser = readStoredUser();
    if (storedToken && storedUser) {
      return { token: storedToken, user: storedUser };
    }
    return { token: null, user: null };
  } catch {
    return { token: null, user: null };
  }
}

export function AuthProvider({ children }) {
  const [session] = useState(() => readStoredSession());
  const [user, setUser] = useState(session.user);
  const [token, setToken] = useState(session.token);
  const [initializing, setInitializing] = useState(true);

  const clearStorage = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.token);
    localStorage.removeItem(STORAGE_KEYS.refreshToken);
    localStorage.removeItem(STORAGE_KEYS.user);
    localStorage.removeItem('kishanSathiToken');
    localStorage.removeItem('kishanSathiUser');
    setToken(null);
    setUser(null);
  }, []);

  const persistSession = useCallback((newSession) => {
    const accessToken = newSession.accessToken || newSession.token || newSession.data?.token;
    const userProfile = newSession.user || newSession.data?.user;

    if (accessToken) {
      localStorage.setItem(STORAGE_KEYS.token, accessToken);
      localStorage.setItem('kishanSathiToken', accessToken);
      setToken(accessToken);
    }
    if (newSession.refreshToken || newSession.data?.refreshToken) {
      localStorage.setItem(STORAGE_KEYS.refreshToken, newSession.refreshToken || newSession.data?.refreshToken);
    }
    if (userProfile) {
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(userProfile));
      localStorage.setItem('kishanSathiUser', JSON.stringify(userProfile));
      setUser(userProfile);
    }
    return { token: accessToken, user: userProfile };
  }, []);

  // On initial load, verify stored token with GET /api/auth/me
  useEffect(() => {
    let isMounted = true;

    async function verifyExistingAuth() {
      const storedToken = localStorage.getItem(STORAGE_KEYS.token) || localStorage.getItem('kishanSathiToken');
      if (!storedToken) {
        if (isMounted) {
          clearStorage();
          setInitializing(false);
        }
        return;
      }

      try {
        const resp = await authService.getCurrentUser();
        if (isMounted) {
          const verifiedUser = resp.user || resp.data?.user;
          if (verifiedUser) {
            setUser(verifiedUser);
            setToken(storedToken);
            localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(verifiedUser));
            localStorage.setItem('kishanSathiUser', JSON.stringify(verifiedUser));
          } else {
            clearStorage();
          }
        }
      } catch (err) {
        // Token is invalid, expired, or backend user not found
        if (isMounted) {
          clearStorage();
        }
      } finally {
        if (isMounted) {
          setInitializing(false);
        }
      }
    }

    verifyExistingAuth();

    return () => {
      isMounted = false;
    };
  }, [clearStorage]);

  const login = useCallback(
    async (credentials) => {
      const resp = await authService.login(credentials);
      const sessionData = resp.data || resp;
      const user = sessionData.user || resp.user;
      const token = sessionData.token || resp.token || resp.accessToken;
      persistSession({ token, user });
      return { token, user };
    },
    [persistSession]
  );

  const loginFarmer = useCallback(
    async (credentials) => {
      const result = await login(credentials);
      if (result.user?.role !== 'farmer') {
        clearStorage();
        throw new Error('This account is registered as a Company / Buyer. Please use the Company Login.');
      }
      return result;
    },
    [login, clearStorage]
  );

  const loginCompany = useCallback(
    async (credentials) => {
      const result = await login(credentials);
      if (result.user?.role !== 'company') {
        clearStorage();
        throw new Error('This account is registered as a Farmer. Please use the Farmer Login.');
      }
      return result;
    },
    [login, clearStorage]
  );

  const registerFarmer = useCallback(
    async (payload) => {
      const resp = await authService.registerFarmer(payload);
      const sessionData = resp.data || resp;
      if (sessionData.token) {
        persistSession(sessionData);
      }
      return sessionData;
    },
    [persistSession]
  );

  const registerCompany = useCallback(
    async (payload) => {
      const resp = await authService.registerCompany(payload);
      const sessionData = resp.data || resp;
      if (sessionData.token) {
        persistSession(sessionData);
      }
      return sessionData;
    },
    [persistSession]
  );

  const verifyOtp = useCallback(
    async (payload) => {
      const resp = await authService.verifyOtp(payload);
      const sessionData = resp.data || resp;
      if (sessionData.token) {
        persistSession(sessionData);
      }
      return sessionData;
    },
    [persistSession]
  );

  const resendOtp = useCallback((payload) => authService.resendOtp(payload), []);

  const forgotPassword = useCallback((payload) => authService.forgotPassword(payload), []);

  const logout = useCallback(async () => {
    const wasCompany = user?.role?.toLowerCase() === 'company';
    try {
      await authService.logout();
    } catch {
      // Ignore network errors during logout
    } finally {
      clearStorage();
      window.location.href = wasCompany ? '/login/company' : '/login/farmer';
    }
  }, [user, clearStorage]);

  const isCompany = useMemo(() => user?.role?.toLowerCase() === 'company', [user]);
  const isFarmer = useMemo(() => user?.role?.toLowerCase() === 'farmer', [user]);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      isCompany,
      isFarmer,
      initializing,
      loading: initializing,
      login,
      loginFarmer,
      loginCompany,
      register: registerFarmer,
      registerFarmer,
      registerCompany,
      verifyOtp,
      resendOtp,
      forgotPassword,
      logout,
    }),
    [
      user,
      token,
      isCompany,
      isFarmer,
      initializing,
      login,
      loginFarmer,
      loginCompany,
      registerFarmer,
      registerCompany,
      verifyOtp,
      resendOtp,
      forgotPassword,
      logout,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}