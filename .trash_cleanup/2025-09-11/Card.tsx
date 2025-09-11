import { ReactNode } from 'react';

interface CardProps {
  title: string;
  meta?: string;
  children: ReactNode;
  className?: string;
}

export default function Card({ title, meta, children, className = "" }: CardProps) {
  return (
    <article className={`bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6 hover:border-[var(--brand)] transition-colors ${className}`}>
      <header className="mb-4">
        <h3 className="text-lg font-medium text-[var(--text)] mb-1">
          {title}
        </h3>
        {meta && (
          <p className="text-sm text-[var(--muted)]">
            {meta}
          </p>
        )}
      </header>
      <div className="text-[var(--text)]">
        {children}
      </div>
    </article>
  );
}
