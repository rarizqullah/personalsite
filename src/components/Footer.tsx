'use client';

import { useEffect } from 'react';

// components/Footer.tsx
export default function Footer() {
  const year = new Date().getFullYear(); // dibekukan saat build (SSG)
  
  useEffect(() => {
    // Ensure theme is applied after hydration
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
    
    const theme = getInitialTheme();
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);
  
  const handleThemeToggle = () => {
    const root = document.documentElement;
    const currentTheme = root.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    try {
      localStorage.setItem('theme', newTheme);
    } catch {
      console.log('Could not save theme to localStorage');
    }
  };
  
  return (
    <footer className="siteFooter bg-[color:var(--bg)] text-[color:var(--muted)] border-t border-[color:var(--border)]" aria-label="Footer">
      <p className="copyright">© {year} Rafi Risqullah Putra</p>
      <nav className="social flex items-center gap-2 flex-wrap" aria-label="Social links">
        <a
          href="https://www.linkedin.com/in/rafirisqullahputra"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[color:var(--muted)] hover:underline"
        >
          LinkedIn
        </a>
        <span aria-hidden="true" className="dot text-[color:var(--muted)] opacity-50">·</span>
        <a
          href="https://github.com/rarizqullah"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[color:var(--muted)] hover:underline"
        >
          GitHub
        </a>
        <span aria-hidden="true" className="dot text-[color:var(--muted)] opacity-50">·</span>
        <span
          role="button"
          tabIndex={0}
          aria-label="Toggle theme"
          className="text-[color:var(--muted)] hover:underline cursor-pointer"
          onClick={handleThemeToggle}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleThemeToggle();
            }
          }}
        >
          Theme
        </span>
      </nav>
    </footer>
  );
}
