'use client';

import { useEffect, useState } from 'react';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Initialize theme after hydration
    function getInitialTheme() {
      try {
        const stored = localStorage.getItem('theme');
        if (stored && (stored === 'dark' || stored === 'light')) {
          return stored;
        }
      } catch {
        // localStorage not available
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    function applyTheme(theme: string) {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
    
    // Only apply theme after component mounts to avoid hydration mismatch
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);
    
  }, []);

  // Don't render children until after hydration to avoid mismatch
  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}
