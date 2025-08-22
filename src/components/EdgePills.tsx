'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface PageNavigationProps {
  show: boolean;
  context: 'home' | 'habits' | 'learn';
}

interface NavItem {
  href: string;
  label: string;
  icon: string;
  desc: string;
  color: string;
  gradient: string;
}

interface NavConfig {
  prev?: NavItem;
  next?: NavItem;
}

const navigationConfig: Record<PageNavigationProps['context'], NavConfig> = {
  home: {
    next: { 
      href: '/habits', 
      label: 'Habits', 
      icon: '→', 
      desc: 'Art & Journaling',
      color: '',
      gradient: ''
    },
  },
  habits: {
    prev: { 
      href: '/', 
      label: 'Home', 
      icon: '←', 
      desc: 'Back to main',
      color: '',
      gradient: ''
    },
    next: { 
      href: '/learn', 
      label: 'Learn', 
      icon: '→', 
      desc: 'Notes & Learning',
      color: '',
      gradient: ''
    },
  },
  learn: {
    prev: { 
      href: '/habits', 
      label: 'Habits', 
      icon: '←', 
      desc: 'Art & Journaling',
      color: '',
      gradient: ''
    },
  },
};

export default function PageNavigation({ show, context }: PageNavigationProps) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const config = useMemo(() => navigationConfig[context], [context]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    // Show navigation at the bottom of page content, not on scroll
    setIsVisible(show);
  }, [show]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      if (e.key === 'ArrowLeft' && config.prev) router.push(config.prev.href);
      if (e.key === 'ArrowRight' && config.next) router.push(config.next.href);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [config.prev, config.next, router]);

  const containerClass = `
    w-full max-w-none flex justify-between items-center
    py-4 mt-8 pt-8 border-t border-[var(--border)]
    ${isVisible ? 'opacity-100' : 'opacity-0'}
    ${reduceMotion ? 'transition-none' : 'transition-opacity duration-300'}
  `;

  const navItemClass = `
    group flex items-center gap-2 px-3 py-2 rounded-md
    text-sm text-[var(--muted)] hover:text-[var(--text)]
    hover:bg-[var(--surface)] transition-all duration-200 ease-out
    focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-2
  `;

  if (!config.prev && !config.next) return null;

  return (
    <nav role="navigation" aria-label="Page navigation" className={containerClass}>
      {/* Previous Page */}
      {config.prev ? (
        <Link
          prefetch
          href={config.prev.href}
          aria-label={`Previous: ${config.prev.label}`}
          className={navItemClass}
        >
          <span>{config.prev.icon}</span>
          <span>{config.prev.label}</span>
        </Link>
      ) : (
        <div></div>
      )}

      {/* Next Page */}
      {config.next ? (
        <Link
          prefetch
          href={config.next.href}
          aria-label={`Next: ${config.next.label}`}
          className={navItemClass}
        >
          <span>{config.next.label}</span>
          <span>{config.next.icon}</span>
        </Link>
      ) : (
        <div></div>
      )}
    </nav>
  );
}
