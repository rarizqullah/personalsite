import type { Metadata } from "next";
import { Cormorant } from "next/font/google";
import "./globals.css";
import { ExtensionErrorBoundary } from './components/ExtensionErrorBoundary';
import ExtensionProtection from './components/ExtensionProtection';

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
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={cormorant.className}>
        <ExtensionProtection />
        <ExtensionErrorBoundary>
          {children}
        </ExtensionErrorBoundary>
      </body>
    </html>
  );
}
