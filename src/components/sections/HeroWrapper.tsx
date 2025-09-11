'use client';

import nextDynamic from 'next/dynamic';

const HeroMotionClient = nextDynamic(() => import('@sections/HeroMotionClient'), {
  ssr: false,
});

interface HeroWrapperProps {
  children: React.ReactNode;
}

export default function HeroWrapper({ children }: HeroWrapperProps) {
  return (
    <>
      {children}
      <HeroMotionClient />
    </>
  );
}
