import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  role: 'admin' | 'advogado' | null;
  login: (user: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('auth') === 'true';
  });

  const [role, setRole] = useState<'admin' | 'advogado' | null>(() => {
    return localStorage.getItem('role') as 'admin' | 'advogado' | null;
  });

  const login = (user: string, password: string) => {
    if (user === 'admin@gmail.com' && password === '1234') {
      localStorage.setItem('auth', 'true');
      localStorage.setItem('role', 'admin');
      setIsAuthenticated(true);
      setRole('admin');
      return true;
    } else if (user === 'gustavoprado82@gmail.com' && password === '1234') {
      localStorage.setItem('auth', 'true');
      localStorage.setItem('role', 'advogado');
      setIsAuthenticated(true);
      setRole('advogado');
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
