import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learning Hub - Blog & Journaling | Personal Site',
  description: 'Jelajahi artikel teknologi terkini dan dokumentasikan perjalanan belajar Anda. Kumpulan artikel pilihan dari berbagai sumber terpercaya untuk pengembang.',
  keywords: [
    'blog teknologi',
    'artikel programming',
    'web development',
    'javascript',
    'react',
    'nextjs',
    'typescript',
    'journaling',
    'learning progress',
    'developer blog'
  ],
  openGraph: {
    title: 'Learning Hub - Blog & Journaling',
    description: 'Jelajahi artikel teknologi terkini dan dokumentasikan perjalanan belajar Anda',
    type: 'website',
    locale: 'id_ID',
    siteName: 'Rafi Rizqullah Personal Site'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learning Hub - Blog & Journaling',
    description: 'Jelajahi artikel teknologi terkini dan dokumentasikan perjalanan belajar Anda'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/habits'
  }
};

export default function HabitsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
