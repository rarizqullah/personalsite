'use client';

import { useEffect, useState } from 'react';

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
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-3 bg-[var(--surface)] border border-[var(--border)] rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      
    </button>
  );
}
