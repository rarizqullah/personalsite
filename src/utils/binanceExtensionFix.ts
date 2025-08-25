'use client';

/**
 * Specific fix for Binance Extension "Cannot read properties of null (reading 'type')" error
 * This utility provides targeted protection against the common Binance extension error
 */

export class BinanceExtensionFix {
  private static isInitialized = false;
  
  static initialize(): void {
    if (typeof window === 'undefined' || this.isInitialized) return;
    
    this.isInitialized = true;
    
    // Immediate protection on initialization
    this.setupErrorProtection();
    this.patchBinanceGlobals();
    this.preventExtensionInjection();
  }
  
  private static setupErrorProtection(): void {
    // Global error handler specifically for Binance extension errors
    const originalErrorHandler = window.onerror;
    window.onerror = (message, source, lineno, colno, error) => {
      const msgStr = String(message).toLowerCase();
      const sourceStr = String(source).toLowerCase();
      
      // Check for specific Binance extension error patterns
      const isBinanceError = (
        sourceStr.includes('chrome-extension://') &&
        (sourceStr.includes('egjidjbpglichdcondbcbdnbeeppgdph') || // Common Binance extension ID
         sourceStr.includes('binance')) &&
        (msgStr.includes('cannot read properties of null') ||
         msgStr.includes('reading \'type\'') ||
         msgStr.includes('binanceinjectedprovider'))
      );
      
      if (isBinanceError) {
        console.debug('[BinanceExtensionFix] Prevented Binance extension error:', message);
        return true; // Suppress the error
      }
      
      // Allow other errors to be handled normally
      if (originalErrorHandler) {
        return originalErrorHandler(message, source, lineno, colno, error);
      }
      return false;
    };
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      const reasonStr = String(event.reason).toLowerCase();
      
      if (reasonStr.includes('binance') || 
          reasonStr.includes('cannot read properties of null') ||
          reasonStr.includes('reading \'type\'')) {
        console.debug('[BinanceExtensionFix] Prevented Binance promise rejection:', event.reason);
        event.preventDefault();
      }
    });
  }
  
  private static patchBinanceGlobals(): void {
    // Create safe wrappers for Binance-related globals
    try {
      const extendedWindow = window as typeof window & {
        BinanceChain?: Record<string, unknown>;
        binance?: Record<string, unknown>;
      };
      
      // Patch BinanceChain if it exists or might be injected
      if (extendedWindow.BinanceChain || typeof extendedWindow.BinanceChain !== 'undefined') {
        extendedWindow.BinanceChain = new Proxy(extendedWindow.BinanceChain || {}, {
          get(target: Record<string, unknown>, prop: string | symbol) {
            try {
              const value = target[prop as string];
              // Return null safely for 'type' property that's causing the error
              if (prop === 'type' && value === null) {
                return undefined; // Return undefined instead of null
              }
              return value;
            } catch {
              console.debug('[BinanceExtensionFix] Safe access prevented error for property:', prop);
              return undefined;
            }
          }
        });
      }
      
      // Patch binance global if it exists
      if (extendedWindow.binance) {
        extendedWindow.binance = new Proxy(extendedWindow.binance, {
          get(target: Record<string, unknown>, prop: string | symbol) {
            try {
              const value = target[prop as string];
              if (prop === 'type' && value === null) {
                return undefined;
              }
              return value;
            } catch {
              console.debug('[BinanceExtensionFix] Safe access prevented error for binance property:', prop);
              return undefined;
            }
          }
        });
      }
    } catch (error) {
      console.debug('[BinanceExtensionFix] Global patching error (non-critical):', error);
    }
  }
  
  private static preventExtensionInjection(): void {
    // Monitor for extension script injection and prevent errors
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            
            // Check for Binance extension scripts
            if (element.tagName === 'SCRIPT') {
              const script = element as HTMLScriptElement;
              if (script.src && script.src.includes('chrome-extension://') && 
                  (script.src.includes('binance') || 
                   script.src.includes('egjidjbpglichdcondbcbdnbeeppgdph'))) {
                
                // Wrap the script execution in a try-catch
                const originalSrc = script.src;
                script.onerror = () => {
                  console.debug('[BinanceExtensionFix] Prevented extension script error:', originalSrc);
                };
              }
            }
          }
        });
      });
    });
    
    // Start observing
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
    
    // Clean up observer after a reasonable time
    setTimeout(() => {
      observer.disconnect();
    }, 30000); // Stop observing after 30 seconds
  }
}

// Auto-initialize when module loads
if (typeof window !== 'undefined') {
  // Delay initialization to ensure DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      BinanceExtensionFix.initialize();
    });
  } else {
    BinanceExtensionFix.initialize();
  }
}
