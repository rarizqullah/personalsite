'use client';

import { useState } from 'react';

interface FloatingActionButtonProps {
  onNewEntry: () => void;
  onExport?: () => void;
}

export default function FloatingActionButton({ 
  onNewEntry, 
  onExport 
}: FloatingActionButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNewEntry = () => {
    setIsExpanded(false);
    onNewEntry();
  };

  const handleExport = () => {
    setIsExpanded(false);
    onExport?.();
  };

  return (
    <>
      {/* Backdrop */}
      {isExpanded && (
        <div 
          className="fab-backdrop"
          onClick={() => setIsExpanded(false)}
          aria-hidden="true"
        />
      )}

      {/* FAB Container */}
      <div className={`fab-container ${isExpanded ? 'expanded' : ''}`}>
        {/* Secondary Actions */}
        <div className="fab-menu">
          {onExport && (
            <button
              onClick={handleExport}
              className="fab-menu-item"
              aria-label="Export entries"
            >
              <div className="fab-menu-item__icon">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                  />
                </svg>
              </div>
              <span className="fab-menu-item__label">Export</span>
            </button>
          )}

          <button
            onClick={handleNewEntry}
            className="fab-menu-item fab-menu-item--primary"
            aria-label="Write new journal entry"
          >
            <div className="fab-menu-item__icon">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                />
              </svg>
            </div>
            <span className="fab-menu-item__label">Write</span>
          </button>
        </div>

        {/* Main FAB */}
        <button
          onClick={toggleExpanded}
          className={`fab ${isExpanded ? 'fab--expanded' : ''}`}
          aria-label={isExpanded ? 'Close menu' : 'Open actions menu'}
          aria-expanded={isExpanded}
        >
          <div className="fab__icon">
            <svg 
              className={`fab__icon-main ${isExpanded ? 'rotated' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
              />
            </svg>
          </div>
          
          {/* Ripple Effect */}
          <div className="fab__ripple" />
        </button>

        {/* Quick Action Tooltip */}
        {!isExpanded && (
          <div className="fab-tooltip">
            <span>New Entry</span>
            <div className="fab-tooltip__arrow" />
          </div>
        )}
      </div>
    </>
  );
}
