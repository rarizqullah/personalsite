'use client';

import { useState, useEffect, useMemo } from 'react';
import HeroWrapper from '@/components/HeroWrapper';
import Footer from '@/components/Footer';
import Sentinel from '@/components/Sentinel';
import JournalCard from '@/components/habits/journal-card-new';
import { JournalEntry } from '@/types/journal';
import { BlogPost, BlogCategory } from '@/types/blog';
import SearchFilterBar, { SearchFilters } from '@/components/habits/search-filter-bar';
import JournalForm from '@/components/habits/journal-form';
import LearningProgress from '@/components/habits/learning-progress';
import BlogList from '@/components/blog/BlogList';
import BlogSidebar from '@/components/blog/BlogSidebar';
import ScrollToTop from '@/components/blog/ScrollToTop';
import BlogErrorBoundary from '@/components/blog/BlogErrorBoundary';
import NavigationHeader from '@/components/habits/NavigationHeader';
import { generateBlogListJsonLD, generateWebsiteJsonLD } from '@/utils/jsonLD';
import { JOURNALS } from '@/data/habits';

// Force static generation for optimal performance  
export const dynamic = 'force-static';

export default function HabitsPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [activeTab, setActiveTab] = useState<'blog' | 'journal'>('blog');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogCategories, setBlogCategories] = useState<BlogCategory[]>([]);
  const [blogLoading, setBlogLoading] = useState(true);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    tags: [],
    sortBy: 'date',
    sortOrder: 'desc'
  });

  // Load entries from localStorage on component mount
  useEffect(() => {
    const loadEntries = () => {
      try {
        const savedEntries = localStorage.getItem('habits-journal-entries');
        if (savedEntries) {
          const parsedEntries = JSON.parse(savedEntries);
          // Migrate old format to new format if necessary
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const entriesWithMetadata = parsedEntries.map((entry: any) => {
            if (entry.content && !entry.blocks) {
              // Convert old format to new format
              return {
                ...entry,
                blocks: [{ type: 'paragraph', content: entry.content }],
                readingTime: entry.readingTime || calculateReadingTime([{ type: 'paragraph', content: entry.content }]),
                isBookmarked: entry.isBookmarked || false
              };
            }
            return {
              ...entry,
              readingTime: entry.readingTime || calculateReadingTime(entry.blocks || []),
              isBookmarked: entry.isBookmarked || false
            };
          });
          setEntries(entriesWithMetadata);
        } else {
          // Use JOURNALS data directly (already in new format)
          setEntries(JOURNALS);
        }
      } catch (error) {
        console.error('Error loading entries:', error);
        // Fallback to JOURNALS data if localStorage fails
        setEntries(JOURNALS);
      }
    };

    // Load immediately without delay using requestIdleCallback for better performance
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      requestIdleCallback(loadEntries);
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      setTimeout(loadEntries, 0);
    }
  }, []);

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('habits-journal-entries', JSON.stringify(entries));
    }
  }, [entries]);

  // Fetch blog posts
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setBlogLoading(true);
        const response = await fetch('/api/blog');
        if (response.ok) {
          const data = await response.json();
          setBlogPosts(data.posts || []);
          setBlogCategories(data.categories || []);
        } else {
          console.warn('Failed to fetch blog posts:', response.status);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setBlogLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const calculateReadingTime = (blocks: { type: string; content: string }[]): number => {
    if (!blocks || blocks.length === 0) return 1;
    
    const totalWords = blocks.reduce((acc, block) => {
      if (block.type === 'paragraph') {
        const words = block.content.trim().split(/\s+/).filter(word => word.length > 0);
        return acc + words.length;
      }
      return acc;
    }, 0);
    
    const wordsPerMinute = 200;
    return Math.max(1, Math.ceil(totalWords / wordsPerMinute));
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
        entry.blocks.some(block => 
          block.type === 'paragraph' && 
          block.content.toLowerCase().includes(filters.query.toLowerCase())
        ) ||
        (entry.tags || []).some(tag => tag.toLowerCase().includes(filters.query.toLowerCase()));
      
      const matchesTags = filters.tags.length === 0 || 
        filters.tags.some(filterTag => (entry.tags || []).includes(filterTag));
      
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
      (entry.tags || []).forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [entries]);

  const handleSaveEntry = (entry: JournalEntry) => {
    if (editingEntry) {
      // Update existing entry
      setEntries(prev => prev.map(e => 
        e.id === editingEntry.id ? entry : e
      ));
      setEditingEntry(null);
    } else {
      // Add new entry
      setEntries(prev => [entry, ...prev]);
    }
    setShowForm(false);
  };

  const handleEditEntry = (id: string) => {
    const entry = entries.find(e => e.id === id);
    if (entry) {
      setEditingEntry(entry);
      setShowForm(true);
    }
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

  // Generate JSON-LD for SEO
  const blogJsonLD = useMemo(() => {
    if (blogPosts.length > 0) {
      return generateBlogListJsonLD(blogPosts);
    }
    return null;
  }, [blogPosts]);

  const websiteJsonLD = useMemo(() => generateWebsiteJsonLD(), []);

  return (
    <>
      {/* JSON-LD Structured Data */}
      {blogJsonLD && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLD) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLD) }}
      />
      
      <HeroWrapper>
      
      <main className="hero min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <div data-anim="subtitle">
          <div className="hero-paragraph">
            <div className="habits-intro-section">
              <p className="habits-page-subtitle">
                Jelajahi artikel terkini dari dunia teknologi dan dokumentasikan perjalanan belajar Anda. Setiap langkah dalam perjalanan pengembangan diri adalah investasi berharga untuk masa depan yang lebih baik.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Header */}
        <NavigationHeader 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onNewEntry={handleNewEntry}
        />

        {/* Main Content */}
        <div className="habits-main-content">

          {/* Blog Content */}
          {activeTab === 'blog' && (
            <BlogErrorBoundary>
              <div className="blog-layout">
                <div className="blog-main">
                  <header className="blog-header">
                    <h2 className="blog-section-title">Artikel & Inspirasi Terkini</h2>
                    <p className="blog-section-subtitle">
                      Kumpulan artikel pilihan dari berbagai sumber terpercaya untuk pengembang
                    </p>
                  </header>

                  <BlogList posts={blogPosts} loading={blogLoading} />
                </div>

                <BlogSidebar 
                  recentPosts={blogPosts.slice(0, 5)}
                  categories={blogCategories}
                />
              </div>
            </BlogErrorBoundary>
          )}

          {/* Journal Content */}
          {activeTab === 'journal' && (
            <div className="journal-container max-w-[800px] mx-auto px-8">
              {/* Learning Progress */}
              <LearningProgress
                totalEntries={stats.total}
                entriesThisWeek={stats.thisWeek}
                entriesThisMonth={stats.thisMonth}
              />
              
              {/* Search & Filter Bar */}
              <SearchFilterBar
                filters={filters}
                onFiltersChange={setFilters}
                availableTags={availableTags}
                totalResults={filteredEntries.length}
              />

              {/* Journal Cards Grid */}
              <div className="journal-cards-grid">
                {filteredEntries.map((entry, index) => (
                  <JournalCard
                    key={entry.id}
                    entry={entry}
                    canEdit={true}
                    canDelete={true}
                    onEdit={handleEditEntry}
                    onDelete={handleDeleteEntry}
                    onBookmark={handleBookmarkEntry}
                    index={index}
                  />
                ))}
              </div>

              {/* Empty State */}
              {filteredEntries.length === 0 && entries.length > 0 && (
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
              {entries.length === 0 && (
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
          )}

        {/* Journal Form Modal */}
        {showForm && (
          <JournalForm
            onSubmit={handleSaveEntry}
            onCancel={() => {
              setShowForm(false);
              setEditingEntry(null);
            }}
            initialEntry={editingEntry || undefined}
          />
        )}
        
        </div>
        
        <ScrollToTop />
        <Sentinel context="habits" />
        
        {/* Footer Section */}
        <div className="mt-16 mb-8">
          <Footer />
        </div>
      </main>
      </HeroWrapper>
    </>
  );
}
