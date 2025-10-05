import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface AccessibilityContextValue {
  highContrast: boolean;
  fontScale: number; // 1, 1.1, 1.25, 1.4
  toggleContrast: () => void;
  setFontScale: (scale: number) => void;
}

const AccessibilityContext = createContext<AccessibilityContextValue | undefined>(undefined);

const CONTRAST_KEY = 'acc_contrast';
const FONTSCALE_KEY = 'acc_fontscale';

export const AccessibilityProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [highContrast, setHighContrast] = useState<boolean>(() => localStorage.getItem(CONTRAST_KEY) === '1');
  const [fontScale, setFontScaleState] = useState<number>(() => parseFloat(localStorage.getItem(FONTSCALE_KEY) || '1'));

  useEffect(() => {
    document.body.classList.toggle('high-contrast', highContrast);
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', fontScale.toString());
  }, [fontScale]);

  const toggleContrast = useCallback(() => {
    setHighContrast(prev => {
      const next = !prev; localStorage.setItem(CONTRAST_KEY, next ? '1' : '0'); return next; });
  }, []);

  const setFontScale = useCallback((scale: number) => {
    setFontScaleState(scale); localStorage.setItem(FONTSCALE_KEY, scale.toString());
  }, []);

  return (
    <AccessibilityContext.Provider value={{ highContrast, fontScale, toggleContrast, setFontScale }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error('useAccessibility must be within AccessibilityProvider');
  return ctx;
};
