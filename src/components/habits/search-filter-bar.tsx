'use client';

import { useState, useEffect, useCallback } from 'react';

export interface SearchFilters {
  query: string;
  tags: string[];
  sortBy: 'date' | 'title' | 'readingTime';
  sortOrder: 'asc' | 'desc';
}

interface SearchFilterBarProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  availableTags: string[];
  totalResults: number;
}

export default function SearchFilterBar({
  filters,
  onFiltersChange,
  availableTags,
  totalResults
}: SearchFilterBarProps) {
  const [localQuery, setLocalQuery] = useState(filters.query);
  const [showTagDropdown, setShowTagDropdown] = useState(false);

  // Debounced search
  const debounceSearch = useCallback(
    (query: string) => {
      const timer = setTimeout(() => {
        onFiltersChange({ ...filters, query });
      }, 300);
      
      return () => clearTimeout(timer);
    },
    [filters, onFiltersChange]
  );

  useEffect(() => {
    if (localQuery !== filters.query) {
      const cleanup = debounceSearch(localQuery);
      return cleanup;
    }
  }, [localQuery, filters.query, debounceSearch]);

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    
    onFiltersChange({ ...filters, tags: newTags });
  };

  const clearAllFilters = () => {
    setLocalQuery('');
    onFiltersChange({
      query: '',
      tags: [],
      sortBy: 'date',
      sortOrder: 'desc'
    });
  };

  const hasActiveFilters = filters.query || filters.tags.length > 0;

  return (
    <div className="search-filter-bar">
      <div className="search-filter-bar__container">
        {/* Search Input */}
        <div className="search-input-wrapper">
          <div className="search-input">
            <svg 
              className="search-input__icon" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
            <input
              type="text"
              placeholder="Search journal entries..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              className="search-input__field"
            />
            {localQuery && (
              <button
                onClick={() => setLocalQuery('')}
                className="search-input__clear"
                aria-label="Clear search"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="filter-controls">
          {/* Tags Filter - Only filter option */}
          <div className="filter-dropdown-wrapper">
            <button
              onClick={() => setShowTagDropdown(!showTagDropdown)}
              className={`filter-button ${filters.tags.length > 0 ? 'active' : ''}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Tags
              {filters.tags.length > 0 && (
                <span className="filter-button__badge">{filters.tags.length}</span>
              )}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showTagDropdown && (
              <div className="filter-dropdown">
                <div className="filter-dropdown__header">
                  <span className="text-sm font-medium">Filter by tags</span>
                  {filters.tags.length > 0 && (
                    <button
                      onClick={() => onFiltersChange({ ...filters, tags: [] })}
                      className="text-xs text-blue-400 hover:text-blue-300"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <div className="filter-dropdown__content">
                  {availableTags.map((tag) => (
                    <label key={tag} className="filter-checkbox">
                      <input
                        type="checkbox"
                        checked={filters.tags.includes(tag)}
                        onChange={() => handleTagToggle(tag)}
                        className="filter-checkbox__input"
                      />
                      <span className="filter-checkbox__label">#{tag}</span>
                      <span className="filter-checkbox__count">
                        {/* You can add tag count here if needed */}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="clear-filters-button"
              aria-label="Clear all filters"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="active-filters">
          <div className="active-filters__container">
            <span className="active-filters__label">
              {totalResults} result{totalResults !== 1 ? 's' : ''} found
            </span>
            
            <div className="active-filters__list">
              {filters.query && (
                <span className="active-filter-pill">
                  Search: &ldquo;{filters.query}&rdquo;
                  <button
                    onClick={() => {
                      setLocalQuery('');
                      onFiltersChange({ ...filters, query: '' });
                    }}
                    className="active-filter-pill__remove"
                  >
                    ×
                  </button>
                </span>
              )}
              
              {filters.tags.map((tag) => (
                <span key={tag} className="active-filter-pill">
                  #{tag}
                  <button
                    onClick={() => handleTagToggle(tag)}
                    className="active-filter-pill__remove"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Click outside handler for tag dropdown */}
      {showTagDropdown && (
        <div 
          className="fixed inset-0 z-50" 
          onClick={() => setShowTagDropdown(false)}
        />
      )}
    </div>
  );
}
