'use client';

import { useEffect } from 'react';
import { ExtensionGuard } from '@/lib/extensionGuard';

export default function ExtensionProtection() {
  useEffect(() => {
    // Initialize extension protection
    ExtensionGuard.initialize();
    
    // Additional runtime protection
    const protectFromExtensions = () => {
      if (typeof window === 'undefined') return;
      
      try {
        // Add additional error handling for extension-related issues
        const originalOnError = window.onerror;
        window.onerror = (message, source, lineno, colno, error) => {
          // Check if this is an extension error
          const isExtensionError = 
            (typeof source === 'string' && (
              source.includes('chrome-extension://') ||
              source.includes('moz-extension://') ||
              source.includes('safari-extension://')
            )) ||
            (typeof message === 'string' && (
              message.toLowerCase().includes('binance') ||
              message.toLowerCase().includes('cannot read properties of null') ||
              message.toLowerCase().includes('reading \'type\'') ||
              message.toLowerCase().includes('binanceinjectedprovider') ||
              message.toLowerCase().includes('metamask') ||
              message.toLowerCase().includes('ethereum')
            ));
          
          if (isExtensionError) {
            console.debug('Extension error prevented:', message, source);
            return true; // Prevent error from bubbling up
          }
          
          // Let non-extension errors through
          if (originalOnError) {
            return originalOnError(message, source, lineno, colno, error);
          }
          return false;
        };
        
        // Handle unhandled promise rejections from extensions
        window.addEventListener('unhandledrejection', (event) => {
          const errorString = String(event.reason).toLowerCase();
          const isExtensionError = [
            'chrome-extension',
            'moz-extension', 
            'safari-extension',
            'binance',
            'metamask',
            'ethereum',
            'injected provider',
            'cannot read properties of null',
            'reading \'type\'',
            'binanceinjectedprovider',
          ].some(pattern => errorString.includes(pattern));
          
          if (isExtensionError) {
            event.preventDefault();
            console.debug('Extension promise rejection prevented:', event.reason);
          }
        });
        
      } catch (error) {
        console.debug('Extension protection initialization error:', error);
      }
    };
    
    protectFromExtensions();
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  return null;
}
