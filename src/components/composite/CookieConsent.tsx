'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsent = localStorage.getItem('cookie-consent');
    const savedPreferences = localStorage.getItem('cookie-preferences');
    
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
    
    if (!hasConsent) {
      // Show banner after a brief delay to avoid flash
      setTimeout(() => {
        setShowBanner(true);
        setTimeout(() => setIsVisible(true), 100);
      }, 1500);
    }
  }, []);

  const closeBanner = () => {
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  const acceptAll = () => {
    const allPreferences = {
      essential: true,
      analytics: true,
      marketing: true
    };
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-preferences', JSON.stringify(allPreferences));
    setPreferences(allPreferences);
    closeBanner();
  };

  const savePreferences = () => {
    localStorage.setItem('cookie-consent', 'custom');
    localStorage.setItem('cookie-preferences', JSON.stringify(preferences));
    closeBanner();
  };

  const handlePreferenceChange = (key: keyof typeof preferences) => {
    if (key === 'essential') return; // Essential cookies cannot be disabled
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeBanner}
      />
      
      {/* Modal */}
      <div 
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-300 ease-out ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        role="dialog"
        aria-labelledby="cookie-settings-title"
        aria-modal="true"
      >
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-[90vw] max-w-md mx-4">
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4">
            <h2 id="cookie-settings-title" className="text-xl font-semibold text-[color:var(--text)]">
              Cookies settings
            </h2>
            <button
              onClick={closeBanner}
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
            {!showPreferences ? (
              <>
                <p className="text-sm text-[color:var(--muted)] leading-relaxed mb-6">
                  We use cookies and similar technologies to help personalise content, tailor and measure ads, and provide a better experience. You can opt in to the use of these technologies. Read our{' '}
                  <a 
                    href="/privacy" 
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Cookie Policy
                  </a>
                  .
                </p>
                
                <div className="flex gap-3">
                  <button
                    onClick={acceptAll}
                    className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => setShowPreferences(true)}
                    className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Preferences
                  </button>
                </div>
              </>
            ) : (
              <>
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
                      <p className="text-xs text-[color:var(--muted)]">Help us understand site usage</p>
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
                      <p className="text-xs text-[color:var(--muted)]">Used for targeted advertising</p>
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
                    onClick={() => setShowPreferences(false)}
                    className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={savePreferences}
                    className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Save preferences
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
