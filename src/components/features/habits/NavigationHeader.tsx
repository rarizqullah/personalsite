'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface NavigationHeaderProps {
  activeTab: 'blog' | 'journal';
  onTabChange: (tab: 'blog' | 'journal') => void;
  onNewEntry?: () => void;
}

export default function NavigationHeader({ activeTab, onTabChange, onNewEntry }: NavigationHeaderProps) {
  return (
    <div className="navigation-header-container">
      {/* Blog & Artikel (Left) */}
      <div className="nav-section nav-left">
        <button
          onClick={() => onTabChange('blog')}
          className={`nav-button ${activeTab === 'blog' ? 'active' : ''}`}
        >
          <ChevronLeftIcon className="nav-arrow left" />
          <span>Blog & Artikel</span>
        </button>
      </div>

      {/* Learning Hub (Center) */}
      <div className="nav-section nav-center">
        {onNewEntry ? (
          <button
            onClick={onNewEntry}
            className="nav-title-button"
            aria-label="Create new entry"
          >
            <h1 className="nav-title">Learning Hub</h1>
          </button>
        ) : (
          <h1 className="nav-title">Learning Hub</h1>
        )}
      </div>

      {/* Journaling (Right) */}
      <div className="nav-section nav-right">
        <button
          onClick={() => onTabChange('journal')}
          className={`nav-button ${activeTab === 'journal' ? 'active' : ''}`}
        >
          <span>Journaling</span>
          <ChevronRightIcon className="nav-arrow right" />
        </button>
      </div>
    </div>
  );
}
