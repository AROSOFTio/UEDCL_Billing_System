import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { demoUsers, roleLabels } from '../utils/constants';

const AUTH_STORAGE_KEY = 'uedcl-auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(AUTH_STORAGE_KEY);

    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = async ({ email, password, role }) => {
    const matchedUser =
      demoUsers.find(
        (candidate) =>
          candidate.email === email &&
          candidate.password === password &&
          (!role || candidate.role === role),
      ) ||
      (email && password && role
        ? {
            name: 'Scaffold User',
            email,
            password,
            role,
            roleLabel: roleLabels[role],
          }
        : null);

    if (!matchedUser) {
      throw new Error('Invalid login details for the selected role.');
    }

    const normalizedUser = {
      name: matchedUser.name,
      email: matchedUser.email,
      role: matchedUser.role,
      roleLabel: roleLabels[matchedUser.role],
    };

    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(normalizedUser));
    setUser(normalizedUser);

    return normalizedUser;
  };

  const logout = () => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  };

  const register = async (payload) => payload;

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      register,
      isAuthenticated: Boolean(user),
    }),
    [user],
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
