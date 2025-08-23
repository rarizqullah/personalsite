export default function LoadingSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="journal-grid">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="journal-card-skeleton">
          <div className="journal-card-skeleton__header">
            <div className="journal-card-skeleton__title-line" />
            <div className="journal-card-skeleton__meta">
              <div className="journal-card-skeleton__date" />
              <div className="journal-card-skeleton__reading-time" />
            </div>
          </div>
          
          <div className="journal-card-skeleton__content">
            <div className="journal-card-skeleton__text-line" />
            <div className="journal-card-skeleton__text-line" />
            <div className="journal-card-skeleton__text-line journal-card-skeleton__text-line--short" />
          </div>
          
          <div className="journal-card-skeleton__tags">
            <div className="journal-card-skeleton__tag" />
            <div className="journal-card-skeleton__tag" />
            <div className="journal-card-skeleton__tag journal-card-skeleton__tag--small" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SearchSkeleton() {
  return (
    <div className="search-skeleton">
      <div className="search-skeleton__bar" />
      <div className="search-skeleton__filters">
        <div className="search-skeleton__filter-chip" />
        <div className="search-skeleton__filter-chip" />
        <div className="search-skeleton__filter-chip" />
      </div>
    </div>
  );
}
