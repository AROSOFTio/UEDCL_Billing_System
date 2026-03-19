import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  fetchAuthenticatedUser,
  loginRequest,
  logoutRequest,
  registerRequest,
} from '../services/authService';
import { clearStoredToken, getStoredToken, setStoredToken } from '../services/api';

const AuthContext = createContext(null);

function normalizeUser(rawUser) {
  if (!rawUser) {
    return null;
  }

  return {
    id: rawUser.id,
    name: rawUser.name,
    email: rawUser.email,
    phone: rawUser.phone,
    status: rawUser.status,
    role: rawUser.role?.slug,
    roleLabel: rawUser.role?.name,
    customer: rawUser.customer || null,
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => getStoredToken());
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    async function bootstrapAuth() {
      const storedToken = getStoredToken();

      if (!storedToken) {
        setAuthLoading(false);
        return;
      }

      try {
        const response = await fetchAuthenticatedUser();
        setUser(normalizeUser(response.data));
        setToken(storedToken);
      } catch (error) {
        clearStoredToken();
        setToken(null);
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    }

    bootstrapAuth();
  }, []);

  const login = async ({ email, password, role }) => {
    const response = await loginRequest({
      email,
      password,
      device_name: 'uedcl-web-client',
    });
    const normalizedUser = normalizeUser(response.data);

    if (role && normalizedUser?.role !== role) {
      throw new Error(`This account belongs to ${normalizedUser?.roleLabel || 'a different role'}.`);
    }

    setStoredToken(response.token);
    setToken(response.token);
    setUser(normalizedUser);

    return normalizedUser;
  };

  const logout = async () => {
    try {
      if (getStoredToken()) {
        await logoutRequest();
      }
    } catch (error) {
      // Ignore transport failures and clear the local session anyway.
    }

    clearStoredToken();
    setToken(null);
    setUser(null);
  };

  const register = async (payload) => {
    const response = await registerRequest(payload);
    const normalizedUser = normalizeUser(response.data);

    setStoredToken(response.token);
    setToken(response.token);
    setUser(normalizedUser);

    return normalizedUser;
  };

  const refreshUser = async () => {
    const response = await fetchAuthenticatedUser();
    const normalizedUser = normalizeUser(response.data);
    setUser(normalizedUser);
    return normalizedUser;
  };

  const value = useMemo(
    () => ({
      user,
      token,
      authLoading,
      isAuthenticated: Boolean(user && token),
      login,
      logout,
      register,
      refreshUser,
    }),
    [authLoading, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider.');
  }

  return context;
}
