'use client';

import { useEffect } from 'react';
import { ExtensionGuard } from '@/utils/extensionGuard';

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
              message.toLowerCase().includes('cannot read properties of null')
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
