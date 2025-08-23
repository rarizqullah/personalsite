'use client';

import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  codeBlocks?: CodeBlock[];
  readingTime?: number;
  isBookmarked?: boolean;
}

interface CodeBlock {
  language: string;
  code: string;
  title?: string;
}

interface JournalCardProps {
  entry: JournalEntry;
  onEdit: (entry: JournalEntry) => void;
  onDelete: (id: string) => void;
  onBookmark: (id: string) => void;
  index: number;
}

export default function JournalCard({ 
  entry, 
  onEdit, 
  onDelete, 
  onBookmark, 
  index 
}: JournalCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [copyStates, setCopyStates] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const copyToClipboard = async (code: string, blockIndex: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStates(prev => ({ ...prev, [blockIndex]: true }));
      setTimeout(() => {
        setCopyStates(prev => ({ ...prev, [blockIndex]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const readingTime = calculateReadingTime(entry.content);

  return (
    <div 
      className={`journal-card-wrapper ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <article className="journal-card-simple">
        {/* Card Title */}
        <div className="card-title-section">
          <h3 className="card-title-simple">{entry.title}</h3>
          <div className="card-actions-inline">
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log('Bookmark button clicked:', entry.id, 'Current bookmark status:', entry.isBookmarked);
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
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log('Expand button clicked:', entry.id, 'Current expanded state:', isFlipped);
                setIsFlipped(!isFlipped);
              }}
              className="expand-btn-simple"
              aria-label={isFlipped ? "Collapse" : "Read more"}
            >
              <svg className={`w-4 h-4 transition-transform ${isFlipped ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Card Description */}
        <p className="card-description-simple">
          {entry.content.length > 120 
            ? `${entry.content.substring(0, 120)}...` 
            : entry.content
          }
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

          {entry.codeBlocks && entry.codeBlocks.length > 0 && (
            <div className="code-blocks-indicator">
              <span>{entry.codeBlocks.length} code blocks</span>
            </div>
          )}

          <div className="reading-time-simple">
            <span>{readingTime} min read</span>
          </div>
        </div>

        {/* Tags */}
        {entry.tags.length > 0 && (
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

        {/* Expanded Content */}
        {isFlipped && (
          <div className="expanded-content-simple">
            <div className="full-content">
              <p className="expanded-text">
                {entry.content}
              </p>

              {entry.codeBlocks && entry.codeBlocks.length > 0 && (
                <div className="code-blocks-section">
                  <h4 className="code-blocks-title">Code Snippets:</h4>
                  {entry.codeBlocks.map((block, blockIndex) => (
                    <div key={blockIndex} className="code-block-simple">
                      <div className="code-block-header-simple">
                        <span className="code-language-simple">{block.language}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(block.code, blockIndex);
                          }}
                          className="copy-code-btn-simple"
                        >
                          {copyStates[blockIndex] ? (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Copied!
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                      <SyntaxHighlighter
                        language={block.language.toLowerCase()}
                        style={oneDark}
                        customStyle={{
                          margin: 0,
                          borderRadius: '0 0 8px 8px',
                          fontSize: '13px',
                        }}
                      >
                        {block.code}
                      </SyntaxHighlighter>
                    </div>
                  ))}
                </div>
              )}

              <div className="expanded-actions-simple">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(entry);
                  }}
                  className="expanded-action-btn edit"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm('Are you sure you want to delete this entry?')) {
                      onDelete(entry.id);
                    }
                  }}
                  className="expanded-action-btn delete"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
