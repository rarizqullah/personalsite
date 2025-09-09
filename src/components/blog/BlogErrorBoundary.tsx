'use client';

import { useState, useEffect } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default function BlogErrorBoundary({ children, fallback: Fallback }: ErrorBoundaryProps) {
  const [errorState, setErrorState] = useState<ErrorBoundaryState>({
    hasError: false,
    error: null
  });

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      if (error.filename?.includes('rss') || error.message?.toLowerCase().includes('blog')) {
        setErrorState({
          hasError: true,
          error: new Error(error.message)
        });
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason?.message?.toLowerCase().includes('blog') || 
          event.reason?.message?.toLowerCase().includes('fetch')) {
        setErrorState({
          hasError: true,
          error: event.reason
        });
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  const retry = () => {
    setErrorState({
      hasError: false,
      error: null
    });
    // Force reload by reloading the page
    window.location.reload();
  };

  if (errorState.hasError && errorState.error) {
    if (Fallback) {
      return <Fallback error={errorState.error} retry={retry} />;
    }

    return (
      <div className="blog-error-boundary">
        <div className="error-content">
          <div className="error-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <h3 className="error-title">Oops! Terjadi Kesalahan</h3>
          <p className="error-message">
            Gagal memuat artikel blog. Mungkin ada masalah dengan koneksi internet atau server RSS feeds.
          </p>
          <div className="error-actions">
            <button onClick={retry} className="error-retry-button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M3 21v-5h5" />
              </svg>
              Coba Lagi
            </button>
            <button 
              onClick={() => setErrorState({ hasError: false, error: null })}
              className="error-dismiss-button"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
