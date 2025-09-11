'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Container from '@ui/Container';

// components/Footer.tsx
export default function Footer() {
  const year = new Date().getFullYear();
  
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
    <Container>
      <footer className="siteFooter bg-[color:var(--bg)] text-[color:var(--muted)] border-t border-[color:var(--border)]" aria-label="Footer">
        <p className="copyright">Copyright © {year} rafirisqullahputra. All Rights Reserved</p>
        <nav className="social flex items-center gap-3 flex-wrap" aria-label="Social and legal links">
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
          <span className="dot">•</span>
          <Link 
            href="/terms" 
            className="text-[color:var(--muted)] hover:underline"
          >
            Terms of Service
          </Link>
          <span className="dot">•</span>
          <Link 
            href="/privacy" 
            className="text-[color:var(--muted)] hover:underline"
          >
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </Container>
  );
}
