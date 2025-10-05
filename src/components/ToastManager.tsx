import React, { createContext, useCallback, useContext, useState } from 'react';
import { ToastMessage } from '../types';
import { v4 as uuid } from 'uuid';

interface ToastContextValue {
  push: (msg: Omit<ToastMessage, 'id'>) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToasts = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToasts must be used inside provider');
  return ctx;
};

export const ToastProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const push = useCallback((msg: Omit<ToastMessage, 'id'>) => {
    const full: ToastMessage = { id: uuid(), ...msg };
    setMessages(prev => [...prev, full]);
    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.id !== full.id));
    }, 4200);
  }, []);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="toast-container" aria-live="polite" aria-atomic="true">
        {messages.map(m => (
          <div key={m.id} className={`toast ${m.type}`} role="status">
            <strong style={{ display: 'block', marginBottom: 4 }}>{m.title}</strong>
            {m.message && <div style={{ fontSize: '0.8rem' }}>{m.message}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
