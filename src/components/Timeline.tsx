import { JournalEntry } from '@/data/habits';

interface TimelineProps {
  entries: JournalEntry[];
}

export default function Timeline({ entries }: TimelineProps) {
  // Sort entries by date (newest first)
  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[var(--border)]" aria-hidden="true" />
      
      <div className="space-y-8">
        {sortedEntries.map((entry) => (
          <article key={entry.id} className="relative flex items-start gap-6">
            {/* Dot on timeline */}
            <div className="flex-shrink-0 w-8 h-8 bg-[var(--brand)] rounded-full border-2 border-[var(--surface)] flex items-center justify-center">
              <div className="w-2 h-2 bg-[var(--surface)] rounded-full" />
            </div>
            
            {/* Content */}
            <div className="flex-grow min-w-0">
              <header className="mb-2">
                <time 
                  dateTime={entry.date}
                  className="text-sm text-[var(--muted)] font-medium"
                >
                  {formatDate(entry.date)}
                </time>
                <h3 className="text-lg font-medium text-[var(--text)] mt-1">
                  {entry.title}
                </h3>
              </header>
              
              <p className="text-[var(--muted)] mb-3">
                {entry.excerpt}
              </p>
              
              {entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--accent)] bg-opacity-20 text-[var(--text)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
