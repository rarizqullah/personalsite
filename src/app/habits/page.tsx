'use client';

import { useState, useEffect, useMemo } from 'react';
import HeroWrapper from '@/components/HeroWrapper';
import Footer from '@/components/Footer';
import Sentinel from '@/components/Sentinel';
import JournalCard, { JournalEntry } from '@/components/habits/journal-card-new';
import SearchFilterBar, { SearchFilters } from '@/components/habits/search-filter-bar';
import LoadingSkeleton from '@/components/habits/loading-skeleton';
import JournalForm from '@/components/habits/journal-form';
import LearningProgress from '@/components/habits/learning-progress';
import { JOURNALS } from '@/data/habits';

interface CodeBlock {
  language: string;
  code: string;
  title?: string;
}

// Force static generation for optimal performance
export const dynamic = 'force-static';

export default function HabitsPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    tags: [],
    sortBy: 'date',
    sortOrder: 'desc'
  });

  // Load entries from localStorage on component mount
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const savedEntries = localStorage.getItem('habits-journal-entries');
      if (savedEntries) {
        const parsedEntries = JSON.parse(savedEntries);
        // Add reading time and bookmark status if missing
        const entriesWithMetadata = parsedEntries.map((entry: JournalEntry) => ({
          ...entry,
          readingTime: entry.readingTime || calculateReadingTime(entry.content),
          isBookmarked: entry.isBookmarked || false,
          codeBlocks: entry.codeBlocks || []
        }));
        setEntries(entriesWithMetadata);
      } else {
        // Use JOURNALS data directly with proper mapping
        const demoEntries: JournalEntry[] = JOURNALS.map(journal => ({
          id: journal.id,
          title: journal.title,
          content: journal.content,
          tags: journal.tags,
          createdAt: journal.createdAt,
          updatedAt: journal.updatedAt,
          readingTime: journal.readingTime || calculateReadingTime(journal.content),
          isBookmarked: journal.isBookmarked || false,
          codeBlocks: journal.codeBlocks || []
        }));
        setEntries(demoEntries);
      }
      setIsLoading(false);
    }, 800); // Simulate loading time
    
    return () => clearTimeout(timer);
  }, []);

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    if (entries.length > 0 && !isLoading) {
      localStorage.setItem('habits-journal-entries', JSON.stringify(entries));
    }
  }, [entries, isLoading]);

  const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const calculateStats = (entries: JournalEntry[]) => {
    const now = new Date();
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const entriesThisWeek = entries.filter(entry => 
      new Date(entry.createdAt) >= startOfWeek
    ).length;
    
    const entriesThisMonth = entries.filter(entry => 
      new Date(entry.createdAt) >= startOfMonth
    ).length;

    return {
      total: entries.length,
      thisWeek: entriesThisWeek,
      thisMonth: entriesThisMonth
    };
  };

  // Filter and sort entries
  const filteredEntries = useMemo(() => {
    const filtered = entries.filter(entry => {
      const matchesQuery = !filters.query || 
        entry.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        entry.content.toLowerCase().includes(filters.query.toLowerCase()) ||
        entry.tags.some(tag => tag.toLowerCase().includes(filters.query.toLowerCase()));
      
      const matchesTags = filters.tags.length === 0 || 
        filters.tags.some(filterTag => entry.tags.includes(filterTag));
      
      return matchesQuery && matchesTags;
    });

    // Sort entries
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'readingTime':
          comparison = (a.readingTime || 0) - (b.readingTime || 0);
          break;
        case 'date':
        default:
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }
      
      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [entries, filters]);

  // Get all available tags
  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    entries.forEach(entry => {
      entry.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [entries]);

  const handleSaveEntry = (entryData: {
    title: string;
    content: string;
    tags: string[];
    codeBlocks: CodeBlock[];
  }) => {
    const now = new Date().toISOString();

    if (editingEntry) {
      setEntries(prev => prev.map(entry => 
        entry.id === editingEntry.id 
          ? { 
              ...entry, 
              ...entryData,
              readingTime: calculateReadingTime(entryData.content),
              updatedAt: now 
            }
          : entry
      ));
      setEditingEntry(null);
    } else {
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        ...entryData,
        createdAt: now,
        updatedAt: now,
        readingTime: calculateReadingTime(entryData.content),
        isBookmarked: false
      };
      setEntries(prev => [newEntry, ...prev]);
    }

    setShowForm(false);
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setShowForm(true);
  };

  const handleDeleteEntry = (id: string) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setEntries(prev => prev.filter(entry => entry.id !== id));
    }
  };

  const handleBookmarkEntry = (id: string) => {
    console.log('Bookmark clicked for entry:', id);
    setEntries(prev => {
      const updated = prev.map(entry => 
        entry.id === id 
          ? { ...entry, isBookmarked: !entry.isBookmarked }
          : entry
      );
      console.log('Updated entries:', updated.find(e => e.id === id));
      return updated;
    });
  };

  const handleNewEntry = () => {
    setEditingEntry(null);
    setShowForm(true);
  };

  // Calculate statistics for display
  const stats = calculateStats(entries);

  return (
    <HeroWrapper>
      <main className="hero min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <div className="habits-hero-section">
          <div className="habits-hero-content">
            <h1 className="habits-hero-title">
              <span className="habits-title-main">Habits</span>
              <button 
                onClick={handleNewEntry}
                className="habits-title-button"
                aria-label="Create new entry"
              >
                Journal
              </button>
            </h1>
            <p className="habits-hero-subtitle">
              Track your daily habits and create meaningful entries to document your growth journey
            </p>
          </div>
        </div>

        {/* Main Content */}
        <section className="w-full pb-32">
          <div className="max-w-[800px] mx-auto px-8">
            
            {/* Learning Progress */}
            {!isLoading && (
              <LearningProgress
                totalEntries={stats.total}
                entriesThisWeek={stats.thisWeek}
                entriesThisMonth={stats.thisMonth}
              />
            )}
            
            {/* Search & Filter Bar */}
            {!isLoading && (
              <SearchFilterBar
                filters={filters}
                onFiltersChange={setFilters}
                availableTags={availableTags}
                totalResults={filteredEntries.length}
              />
            )}

            {/* Loading State */}
            {isLoading && <LoadingSkeleton count={6} />}

            {/* Journal Cards Grid */}
            {!isLoading && (
              <div className="journal-cards-grid">
                {filteredEntries.map((entry, index) => (
                  <JournalCard
                    key={entry.id}
                    entry={entry}
                    onEdit={handleEditEntry}
                    onDelete={handleDeleteEntry}
                    onBookmark={handleBookmarkEntry}
                    index={index}
                  />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && filteredEntries.length === 0 && entries.length > 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">
                  No entries found
                </h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => setFilters({
                    query: '',
                    tags: [],
                    sortBy: 'date',
                    sortOrder: 'desc'
                  })}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* First Time Empty State */}
            {!isLoading && entries.length === 0 && (
              <div className="text-center py-20">
                <div className="text-8xl mb-6">📔</div>
                <h3 className="text-2xl font-bold text-gray-200 mb-3">
                  Start Your Learning Journal
                </h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Document your learning experiences, code snippets, and insights. 
                  Build a personal knowledge base that grows with you.
                </p>
                <button
                  onClick={handleNewEntry}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105"
                >
                  Create Your First Entry
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Journal Form Modal */}
        <JournalForm
          isOpen={showForm}
          onClose={() => {
            setShowForm(false);
            setEditingEntry(null);
          }}
          onSave={handleSaveEntry}
          editingEntry={editingEntry}
        />
        
        <Sentinel context="habits" />
        <Footer />
      </main>
    </HeroWrapper>
  );
}
