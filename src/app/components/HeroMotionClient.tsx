'use client';

import { useEffect, useState } from 'react';

export default function HeroMotionClient() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    try {
      // Check if user prefers reduced motion
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handler);
      
      return () => mediaQuery.removeEventListener('change', handler);
    } catch (error) {
      console.debug('Media query setup error:', error);
      // Fallback to no animations if media query fails
      setPrefersReducedMotion(true);
    }
  }, []);

  useEffect(() => {
    // Don't run animations if not mounted or user prefers reduced motion
    if (!mounted || prefersReducedMotion) return;

    try {
      // Enhance existing static content with animations
      const titleElement = document.querySelector('[data-anim="title"]') as HTMLElement;
      const subtitleElement = document.querySelector('[data-anim="subtitle"]') as HTMLElement;
      const stackItems = document.querySelectorAll('[data-anim-index]');

      if (titleElement) {
        titleElement.style.opacity = '0';
        titleElement.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
          titleElement.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          titleElement.style.opacity = '1';
          titleElement.style.transform = 'translateY(0)';
        }, 150);
      }

      if (subtitleElement) {
        subtitleElement.style.opacity = '0';
        subtitleElement.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
          subtitleElement.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          subtitleElement.style.opacity = '1';
          subtitleElement.style.transform = 'translateY(0)';
        }, 350);
      }

      stackItems.forEach((item, index) => {
        const element = item as HTMLElement;
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          element.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, 550 + (index * 50)); // 50ms stagger as per requirements (≤60ms)
      });
    } catch (error) {
      console.debug('Animation setup error (possibly extension interference):', error);
      // Gracefully degrade - ensure content is visible even if animations fail
      try {
        const allElements = document.querySelectorAll('[data-anim="title"], [data-anim="subtitle"], [data-anim-index]');
        allElements.forEach((el) => {
          const element = el as HTMLElement;
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        });
      } catch (fallbackError) {
        console.debug('Fallback animation cleanup error:', fallbackError);
      }
    }
  }, [mounted, prefersReducedMotion]);

  return null; // This component enhances existing content, no visual output
}
