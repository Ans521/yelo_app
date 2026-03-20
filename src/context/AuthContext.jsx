import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getRefreshToken, setRefreshToken, clearRefreshToken } from '../services/tokenService';
import { setupApiInterceptors, refreshTokens } from '../services/authApi';
import { getFcmToken } from '../../App';
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessTokenState] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [fcmToken, setFcmToken] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const token = await getFcmToken();
      if (cancelled) return;
      if (token) {
        setFcmToken(token);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const setTokens = useCallback(async (newAccessToken, newRefreshToken, userData) => {
    setIsGuest(false);
    setAccessTokenState(newAccessToken || null);
    if (newRefreshToken) {
      await setRefreshToken(newRefreshToken);
    }
    if (userData != null) setUser(userData);
  }, []);

  const logout = useCallback(async () => {
    await clearRefreshToken();
    setAccessTokenState(null);
    setIsAuthenticated(false);
    setIsGuest(false);
  }, []);

  const loginAsGuest = useCallback(() => {
    setIsGuest(true);
    setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    setupApiInterceptors({
      getAccessToken: () => accessToken,
      setAccessToken: setAccessTokenState,
      onLogout: logout,
    });
  }, [accessToken, logout]);

  useEffect(() => {
    let cancelled = false;
    async function restoreSession() {
      const refresh = await getRefreshToken();
      if (cancelled) return;
      if (!refresh) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }
      try {
        const data = await refreshTokens(refresh);
        if (cancelled) return;
        if (data?.accessToken) {
          setIsGuest(false);
          setAccessTokenState(data.accessToken);
          if (data.refreshToken) await setRefreshToken(data.refreshToken);
          setIsAuthenticated(true);
        } else {
          await clearRefreshToken();
        }
      } catch {
        if (!cancelled) {
          await clearRefreshToken();
          setIsAuthenticated(false);
        }
      }
      if (!cancelled) setIsLoading(false);
    }

    restoreSession();
    return () => { cancelled = true; };
  }, []);

  const setAuthenticated = useCallback((value) => {
    setIsAuthenticated(Boolean(value));
  }, []);

  const value = {
    accessToken,
    isAuthenticated,
    isGuest,
    isLoading,
    user,
    location,
    setTokens,
    setAuthenticated,
    logout,
    loginAsGuest,
    setLocation,
    fcmToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
