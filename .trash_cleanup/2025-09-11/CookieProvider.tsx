'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieContextType {
  preferences: CookiePreferences;
  hasConsent: boolean;
  updatePreferences: (prefs: CookiePreferences) => void;
  showCookieSettings: () => void;
  hideCookieSettings: () => void;
  isSettingsVisible: boolean;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

const defaultPreferences: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false
};

export function CookieProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [hasConsent, setHasConsent] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookie-consent');
    const savedPreferences = localStorage.getItem('cookie-preferences');
    
    if (savedConsent) {
      setHasConsent(true);
    }
    
    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences));
      } catch {
        setPreferences(defaultPreferences);
      }
    }
  }, []);

  const updatePreferences = (prefs: CookiePreferences) => {
    setPreferences(prefs);
    localStorage.setItem('cookie-preferences', JSON.stringify(prefs));
    localStorage.setItem('cookie-consent', 'custom');
    setHasConsent(true);
  };

  const showCookieSettings = () => {
    setIsSettingsVisible(true);
  };

  const hideCookieSettings = () => {
    setIsSettingsVisible(false);
  };

  return (
    <CookieContext.Provider value={{
      preferences,
      hasConsent,
      updatePreferences,
      showCookieSettings,
      hideCookieSettings,
      isSettingsVisible
    }}>
      {children}
    </CookieContext.Provider>
  );
}

export function useCookies() {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookies must be used within a CookieProvider');
  }
  return context;
}
