interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="mb-12 text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[var(--text)] mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg md:text-xl text-[var(--muted)] font-light max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </header>
  );
}
