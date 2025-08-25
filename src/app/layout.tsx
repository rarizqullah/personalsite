import type { Metadata } from "next";
import { Cormorant } from "next/font/google";
import "./globals.css";
import ExtensionErrorBoundary from '@/components/ExtensionErrorBoundary';
import ExtensionProtection from '@/components/ExtensionProtection';
import ThemeProvider from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
import '@/utils/binanceExtensionFix'; // Import Binance extension fix

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Riza Rizqullah - Co-Founder Heppo.Tech",
  description: "Co-Founder of Heppo.Tech dengan passion mengubah operasi manual menjadi automasi yang scalable. Fokus pada solusi end-to-end yang performant dan maintainable.",
  openGraph: {
    title: "Riza Rizqullah - Co-Founder Heppo.Tech",
    description: "Co-Founder of Heppo.Tech dengan passion mengubah operasi manual menjadi automasi yang scalable. Fokus pada solusi end-to-end yang performant dan maintainable.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Security-Policy" 
              content="script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com https://fonts.gstatic.com; object-src 'none'; base-uri 'self';" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Early extension error prevention
                  if (typeof window !== 'undefined') {
                    window.addEventListener('error', function(event) {
                      if (event.filename && event.filename.includes('chrome-extension://') && 
                          (event.message.includes('Cannot read properties of null') || 
                           event.message.includes('reading \\'type\\'') ||
                           event.message.includes('binance'))) {
                        event.preventDefault();
                        event.stopPropagation();
                        return false;
                      }
                    }, true);
                  }
                  
                  var stored = localStorage.getItem('theme');
                  var theme = 'light';
                  if (stored && (stored === 'dark' || stored === 'light')) {
                    theme = stored;
                  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    theme = 'dark';
                  }
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {
                  // Ignore errors
                }
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={`${cormorant.className} bg-[var(--bg)] text-[var(--text)]`}>
        <ThemeToggle />
        <ExtensionProtection />
        <ExtensionErrorBoundary>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </ExtensionErrorBoundary>
      </body>
    </html>
  );
}
