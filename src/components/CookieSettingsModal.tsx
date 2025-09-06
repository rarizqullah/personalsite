'use client';

import { useState } from 'react';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPreferences?: CookiePreferences;
  onSave: (preferences: CookiePreferences) => void;
}

export default function CookieSettingsModal({ 
  isOpen, 
  onClose, 
  initialPreferences = { essential: true, analytics: false, marketing: false },
  onSave 
}: CookieSettingsModalProps) {
  const [preferences, setPreferences] = useState<CookiePreferences>(initialPreferences);

  const handlePreferenceChange = (key: keyof CookiePreferences) => {
    if (key === 'essential') return; // Essential cookies cannot be disabled
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    onSave(preferences);
    onClose();
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true
    };
    setPreferences(allAccepted);
    onSave(allAccepted);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-300 ease-out"
        role="dialog"
        aria-labelledby="cookie-settings-title"
        aria-modal="true"
      >
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-[90vw] max-w-md mx-4">
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4">
            <h2 id="cookie-settings-title" className="text-xl font-semibold text-[color:var(--text)]">
              Cookie settings
            </h2>
            <button
              onClick={onClose}
              className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Content */}
          <div className="px-6 pb-6">
            <p className="text-sm text-[color:var(--muted)] leading-relaxed mb-6">
              Manage your cookie preferences. You can change these settings at any time. Learn more in our{' '}
              <a 
                href="/privacy" 
                className="text-blue-600 dark:text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
              .
            </p>
            
            <div className="space-y-4 mb-6">
              {/* Essential Cookies */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-[color:var(--text)]">Essential cookies</h3>
                  <p className="text-xs text-[color:var(--muted)]">Required for the website to function</p>
                </div>
                <div className="w-11 h-6 bg-blue-600 rounded-full flex items-center justify-end px-1">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              
              {/* Analytics Cookies */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-[color:var(--text)]">Analytics cookies</h3>
                  <p className="text-xs text-[color:var(--muted)]">Help us understand how visitors use our website</p>
                </div>
                <button
                  onClick={() => handlePreferenceChange('analytics')}
                  className={`relative w-11 h-6 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    preferences.analytics 
                      ? 'bg-blue-600' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div 
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ease-in-out ${
                      preferences.analytics ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              {/* Marketing Cookies */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-[color:var(--text)]">Marketing cookies</h3>
                  <p className="text-xs text-[color:var(--muted)]">Used for targeted advertising and personalization</p>
                </div>
                <button
                  onClick={() => handlePreferenceChange('marketing')}
                  className={`relative w-11 h-6 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    preferences.marketing 
                      ? 'bg-blue-600' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div 
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ease-in-out ${
                      preferences.marketing ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Save preferences
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-lg transition-colors"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
