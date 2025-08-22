'use client';

import { useEffect, useState } from 'react';
import PageNavigation from './EdgePills';

interface SentinelProps {
  context: "home" | "habits" | "learn";
}

export default function Sentinel({ context }: SentinelProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Simply show the navigation always
    setShow(true);
  }, []);

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <PageNavigation show={show} context={context} />
    </div>
  );
}
