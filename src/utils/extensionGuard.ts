'use client';

// Type definitions for browser extension objects
interface ExtendedWindow extends Window {
  BinanceChain?: unknown;
  binance?: unknown;
  ethereum?: {
    isMetaMask?: boolean;
    isTrust?: boolean;
    isCoinbaseWallet?: boolean;
    [key: string]: unknown;
  };
  WalletConnect?: unknown;
}

// Utility to detect and handle browser extension interference
export class ExtensionGuard {
  private static detectedExtensions = new Set<string>();
  
  // Detect common wallet extensions that might cause conflicts
  static detectExtensions(): string[] {
    if (typeof window === 'undefined') return [];
    
    const extendedWindow = window as ExtendedWindow;
    const extensions: string[] = [];
    
    // Check for common extension indicators
    const extensionChecks = [
      { name: 'Binance', check: () => extendedWindow.BinanceChain || extendedWindow.binance },
      { name: 'MetaMask', check: () => extendedWindow.ethereum?.isMetaMask },
      { name: 'Trust Wallet', check: () => extendedWindow.ethereum?.isTrust },
      { name: 'Coinbase', check: () => extendedWindow.ethereum?.isCoinbaseWallet },
      { name: 'WalletConnect', check: () => extendedWindow.WalletConnect },
    ];
    
    extensionChecks.forEach(({ name, check }) => {
      try {
        if (check()) {
          extensions.push(name);
          this.detectedExtensions.add(name);
        }
      } catch (error) {
        // Silently handle detection errors
        console.debug(`Extension detection error for ${name}:`, error);
      }
    });
    
    return extensions;
  }
  
  // Prevent extension script injection errors
  static preventExtensionErrors(): void {
    if (typeof window === 'undefined') return;
    
    // Add global error handler for extension-related errors
    const originalConsoleError = console.error;
    console.error = (...args: unknown[]) => {
      // Filter out common extension-related errors
      const errorString = args.join(' ').toLowerCase();
      const isExtensionError = [
        'chrome-extension://',
        'moz-extension://',
        'safari-extension://',
        'extension context invalidated',
        'binanceinjectedprovider',
        'metamask',
        'ethereum provider',
      ].some(pattern => errorString.includes(pattern));
      
      if (!isExtensionError) {
        originalConsoleError.apply(console, args);
      }
    };
    
    // Prevent extension script errors from bubbling up
    window.addEventListener('error', (event) => {
      const isExtensionError = event.filename && (
        event.filename.includes('chrome-extension://') ||
        event.filename.includes('moz-extension://') ||
        event.filename.includes('safari-extension://') ||
        event.message?.toLowerCase().includes('binance') ||
        event.message?.toLowerCase().includes('metamask')
      );
      
      if (isExtensionError) {
        event.preventDefault();
        event.stopPropagation();
        console.debug('Extension error prevented:', event.message);
        return false;
      }
    }, true);
    
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
      ].some(pattern => errorString.includes(pattern));
      
      if (isExtensionError) {
        event.preventDefault();
        console.debug('Extension promise rejection prevented:', event.reason);
      }
    });
  }
  
  // Clean up extension-related global variables
  static cleanupExtensionGlobals(): void {
    if (typeof window === 'undefined') return;
    
    try {
      // Create defensive wrappers for common extension globals
      const createSafeWrapper = (obj: unknown) => {
        return new Proxy(obj || {}, {
          get(target, prop) {
            try {
              return (target as Record<string | symbol, unknown>)[prop];
            } catch (error) {
              console.debug(`Safe wrapper prevented error accessing ${String(prop)}:`, error);
              return null;
            }
          },
          set(target, prop, value) {
            try {
              (target as Record<string | symbol, unknown>)[prop] = value;
              return true;
            } catch (error) {
              console.debug(`Safe wrapper prevented error setting ${String(prop)}:`, error);
              return false;
            }
          }
        });
      };
      
      // Wrap potentially problematic extension globals
      const extendedWindow = window as ExtendedWindow;
      
      if (extendedWindow.BinanceChain) {
        extendedWindow.BinanceChain = createSafeWrapper(extendedWindow.BinanceChain);
      }
      
      if (extendedWindow.ethereum) {
        extendedWindow.ethereum = createSafeWrapper(extendedWindow.ethereum) as ExtendedWindow['ethereum'];
      }
      
    } catch (error) {
      console.debug('Extension cleanup error:', error);
    }
  }
  
  // Initialize all protection mechanisms
  static initialize(): void {
    if (typeof window === 'undefined') return;
    
    // Run on next tick to ensure DOM is ready
    setTimeout(() => {
      this.preventExtensionErrors();
      this.cleanupExtensionGlobals();
      this.detectExtensions();
    }, 0);
  }
}
