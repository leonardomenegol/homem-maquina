import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { User, UserRole } from '../types';
import { v4 as uuid } from 'uuid';

interface CredentialsStored extends User { password: string; }

interface AuthContextValue {
  user: User | null;
  login: (name: string, role: UserRole, password: string) => boolean;
  logout: () => void;
  register: (data: { name: string; role: UserRole; password: string; email?: string; meta?: Record<string, any>; }) => { success: boolean; message?: string };
  usersCount: number;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<CredentialsStored[]>(() => {
    try {
      const raw = localStorage.getItem('auth_users_v1');
      return raw ? JSON.parse(raw) as CredentialsStored[] : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('auth_users_v1', JSON.stringify(users));
  }, [users]);

  const login = useCallback((name: string, role: UserRole, password: string) => {
    const found = users.find(u => u.role === role && u.name.toLowerCase() === name.toLowerCase());
    if (!found) return false;
    if (found.password !== password) return false;
    setUser({ id: found.id, name: found.name, role: found.role, email: found.email, meta: found.meta });
    return true;
  }, [users]);

  const logout = useCallback(() => setUser(null), []);

  const register = useCallback((data: { name: string; role: UserRole; password: string; email?: string; meta?: Record<string, any>; }) => {
    const exists = users.some(u => u.role === data.role && u.name.toLowerCase() === data.name.toLowerCase());
    if (exists) return { success: false, message: 'Usuário já existente para este perfil.' };
    const newUser: CredentialsStored = { id: uuid(), name: data.name, role: data.role, password: data.password, email: data.email, meta: data.meta };
    setUsers(prev => [...prev, newUser]);
    return { success: true };
  }, [users]);

  return (
    <AuthContext.Provider value={{ user, login, logout, register, usersCount: users.length }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
