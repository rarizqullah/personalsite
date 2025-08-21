'use client';

import { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ExtensionErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Check if this is an extension-related error
    const isExtensionError = error.stack?.includes('chrome-extension://') ||
                            error.stack?.includes('moz-extension://') ||
                            error.message?.toLowerCase().includes('binance') ||
                            error.message?.toLowerCase().includes('ethereum') ||
                            error.message?.toLowerCase().includes('metamask');

    if (isExtensionError) {
      console.debug('Extension error caught by boundary:', error.message);
      // Don't show error UI for extension errors
      return { hasError: false };
    }

    // For non-extension errors, show error UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log extension errors for debugging but don't break the app
    const isExtensionError = error.stack?.includes('chrome-extension://') ||
                            error.stack?.includes('moz-extension://') ||
                            error.message?.toLowerCase().includes('binance') ||
                            error.message?.toLowerCase().includes('ethereum') ||
                            error.message?.toLowerCase().includes('metamask');

    if (isExtensionError) {
      console.debug('Extension error details:', {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
      });
      // Reset state to continue normal operation
      this.setState({ hasError: false });
      return;
    }

    // For real application errors, log them properly
    console.error('Application error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <p>Please refresh the page and try again.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
