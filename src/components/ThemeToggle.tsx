'use client';

import { useEffect, useState } from 'react';
import ImageButton from './ImageButton';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Get initial theme
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
    
    setTheme(getInitialTheme());
  }, []);

  const toggleTheme = () => {
    if (!mounted) return;
    
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Apply theme to document
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Save to localStorage
    try {
      localStorage.setItem('theme', newTheme);
    } catch {
      // Handle localStorage errors
    }
  };

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <button 
        className="fixed top-4 right-4 z-50 p-3 bg-[var(--surface)] border border-[var(--border)] rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        disabled
        aria-label="Loading theme toggle"
      >
        <span className="w-5 h-5 block"></span>
      </button>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <ImageButton
        onClick={toggleTheme}
        variant="icon-only"
        size="md"
        className="bg-[var(--surface)] shadow-lg hover:shadow-xl rounded-full"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        icon={
          theme === 'dark' ? (
            // Sun icon for light mode
            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            // Moon icon for dark mode
            <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )
        }
      />
    </div>
  );
}
