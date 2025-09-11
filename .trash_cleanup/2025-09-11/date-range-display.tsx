'use client';

interface DateRangeDisplayProps {
  startDate: string;
  endDate: string;
  entryCount: number;
}

export default function DateRangeDisplay({ 
  startDate, 
  endDate, 
  entryCount 
}: DateRangeDisplayProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="date-range-display">
      <div className="date-range-icon">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <span className="date-range-text">
        {formatDate(startDate)} - {formatDate(endDate)}
      </span>
      <span className="entry-count-badge">
        {entryCount} entr{entryCount !== 1 ? 'ies' : 'y'}
      </span>
    </div>
  );
}
