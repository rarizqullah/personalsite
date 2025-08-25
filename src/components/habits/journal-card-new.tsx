'use client';

import { useState, useEffect, useRef } from 'react';
import { JournalCardProps } from '@/types/journal';
import JournalRenderer from './JournalRenderer';
import ContextMenu from './ContextMenu';

export default function JournalCard({ 
  entry, 
  canEdit = true,
  canDelete = true,
  onEdit, 
  onDelete, 
  onBookmark,
  index 
}: JournalCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean;
    position: { x: number; y: number };
  }>({
    isOpen: false,
    position: { x: 0, y: 0 }
  });
  
  // Long press handling
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    
    // Cleanup long press timer on unmount
    return () => {
      clearTimeout(timer);
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, [index]);

  const calculateReadingTime = (blocks: { type: string; content: string }[]): number => {
    if (!blocks || blocks.length === 0) return 1;
    
    const totalWords = blocks.reduce((acc, block) => {
      if (block.type === 'paragraph') {
        const words = block.content.trim().split(/\s+/).filter((word: string) => word.length > 0);
        return acc + words.length;
      }
      return acc;
    }, 0);
    
    const wordsPerMinute = 200;
    return Math.max(1, Math.ceil(totalWords / wordsPerMinute));
  };

  const getPreviewText = (blocks: { type: string; content: string }[]): string => {
    if (!blocks || blocks.length === 0) return 'No content available';
    
    const firstParagraph = blocks.find(block => block.type === 'paragraph');
    if (!firstParagraph) return 'No content available';
    
    return firstParagraph.content.length > 120 
      ? `${firstParagraph.content.substring(0, 120)}...`
      : firstParagraph.content;
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    setContextMenu({
      isOpen: true,
      position: { x: event.clientX, y: event.clientY }
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Shift+F10 untuk membuka context menu (accessibility)
    if (event.shiftKey && event.key === 'F10') {
      event.preventDefault();
      const rect = event.currentTarget.getBoundingClientRect();
      setContextMenu({
        isOpen: true,
        position: { 
          x: rect.left + rect.width / 2, 
          y: rect.top + rect.height / 2 
        }
      });
    }
  };

  const handleLongPress = () => {
    // Untuk mobile long press, kita bisa implementasi dengan touch events
    // Sementara ini kita gunakan context menu biasa
    const rect = document.querySelector('.journal-card-simple')?.getBoundingClientRect();
    if (rect) {
      setContextMenu({
        isOpen: true,
        position: { 
          x: rect.left + rect.width / 2, 
          y: rect.top + rect.height / 2 
        }
      });
    }
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    longPressTimer.current = setTimeout(() => {
      // Trigger haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
      
      const touch = event.touches[0];
      setContextMenu({
        isOpen: true,
        position: { x: touch.clientX, y: touch.clientY }
      });
    }, 500); // 500ms long press
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleTouchMove = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const readingTime = calculateReadingTime(entry.blocks);

  return (
    <>
      <div 
        className={`journal-card-wrapper ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <article 
          className="journal-card-simple"
          onContextMenu={handleContextMenu}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          tabIndex={0}
        >
          {/* Card Title */}
          <div className="card-title-section">
            <h3 className="card-title-simple">{entry.title}</h3>
            <div className="card-actions-inline">
              {onBookmark && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookmark(entry.id);
                  }}
                  className={`bookmark-btn-simple ${entry.isBookmarked ? 'bookmarked' : ''}`}
                  aria-label={entry.isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                >
                  {entry.isBookmarked ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  )}
                </button>
              )}
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="expand-btn-simple"
                aria-label={isExpanded ? "Collapse" : "Read more"}
              >
                <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Mobile fallback menu button */}
              <button
                onClick={handleLongPress}
                className="mobile-menu-btn"
                aria-label="Open menu"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Card Description */}
          <p className="card-description-simple">
            {getPreviewText(entry.blocks)}
          </p>

          {/* Card Meta Info Row */}
          <div className="card-meta-row">
            <div className="card-date-simple">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
              </svg>
              <span>{new Date(entry.createdAt).toLocaleDateString('en-GB', { 
                day: '2-digit', 
                month: '2-digit', 
                year: 'numeric' 
              })}</span>
            </div>

            <div className="reading-time-simple">
              <span>{readingTime} min read</span>
            </div>
          </div>

          {/* Tags */}
          {entry.tags && entry.tags.length > 0 && (
            <div className="card-tags-simple">
              {entry.tags.slice(0, 3).map((tag, tagIndex) => (
                <span key={tagIndex} className="tag-pill-simple">
                  {tag}
                </span>
              ))}
              {entry.tags.length > 3 && (
                <span className="tag-more-simple">
                  +{entry.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Expanded Content dengan Justify Text */}
          {isExpanded && (
            <div className="expanded-content-simple journal-expand-justify">
              <JournalRenderer blocks={entry.blocks} />
            </div>
          )}
        </article>
      </div>

      {/* Context Menu */}
      <ContextMenu
        isOpen={contextMenu.isOpen}
        onClose={() => setContextMenu({ ...contextMenu, isOpen: false })}
        position={contextMenu.position}
        canEdit={canEdit}
        canDelete={canDelete}
        onEdit={() => onEdit(entry.id)}
        onDelete={() => onDelete(entry.id)}
      />
    </>
  );
}
