'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import HeroWrapper from '@/components/HeroWrapper';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import Sentinel from '@/components/Sentinel';
import LibraryShelf from '@/components/library/LibraryShelf';
import LibraryCardView from '@/components/library/LibraryCardView';
import LibrarySearchBar from '@/components/library/LibrarySearchBar';
import ReadingProgress from '@/components/library/ReadingProgress';
import LibraryTips from '@/components/library/LibraryTips';
import { READING_LIST, CONCEPT_DIVES, RESOURCES } from '@/data/learn';
import type { ReadingItem, Concept, Resource } from '@/data/learn';

// Force static generation for optimal performance
export const dynamic = 'force-static';

type BookSpineData = {
  id: string;
  title: string;
  category: string;
  status: 'Queued' | 'Reading' | 'Done';
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  color?: string;
  thickness?: number;
  author?: string;
  dateAdded?: string;
  estimatedTime?: string;
  tags?: string[];
  note?: string;
  progress?: number;
  summary?: string;
  estReadMin?: number;
  kind?: string;
  label?: string;
};

export default function LearnPage() {
  const [selectedBook, setSelectedBook] = useState<BookSpineData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    difficulty: ''
  });
  const [showTips, setShowTips] = useState(true);

  // Transform data for library shelves
  const transformToBookSpine = (item: ReadingItem | Concept | Resource, defaultCategory: string): BookSpineData => ({
    id: item.id,
    title: 'title' in item ? item.title : 'topic' in item ? item.topic : (item as Resource).label,
    category: item.category || defaultCategory,
    status: (item.status as 'Queued' | 'Reading' | 'Done') || 'Queued',
    difficulty: item.difficulty,
    color: item.color,
    thickness: item.thickness,
    author: item.author,
    dateAdded: item.dateAdded,
    estimatedTime: 'estimatedTime' in item ? item.estimatedTime : undefined,
    tags: item.tags,
    ...('note' in item && { note: item.note }),
    ...('progress' in item && { progress: item.progress }),
    ...('summary' in item && { summary: item.summary }),
    ...('estReadMin' in item && { estReadMin: item.estReadMin }),
    ...('kind' in item && { kind: item.kind }),
    ...('label' in item && { label: item.label })
  });

  const allBooks = useMemo(() => [
    ...READING_LIST.map(item => transformToBookSpine(item, 'Reading List')),
    ...CONCEPT_DIVES.map(item => transformToBookSpine(item, 'Concept Dives')),
    ...RESOURCES.map(item => transformToBookSpine(item, 'Resources'))
  ], []);

  // Filter and search logic
  const filteredBooks = useMemo(() => {
    return allBooks.filter(book => {
      const matchesSearch = !searchQuery || 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (book.author && book.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (book.tags && book.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesCategory = !filters.category || book.category === filters.category;
      const matchesStatus = !filters.status || book.status === filters.status;
      const matchesDifficulty = !filters.difficulty || book.difficulty === filters.difficulty;

      return matchesSearch && matchesCategory && matchesStatus && matchesDifficulty;
    });
  }, [allBooks, searchQuery, filters]);

  // Group books by category for shelves
  const booksByCategory = useMemo(() => {
    const grouped = filteredBooks.reduce((acc, book) => {
      const category = book.category || 'Other';
      if (!acc[category]) acc[category] = [];
      acc[category].push(book);
      return acc;
    }, {} as Record<string, BookSpineData[]>);

    return grouped;
  }, [filteredBooks]);

  const handleBookClick = (book: BookSpineData) => {
    setSelectedBook({
      ...book,
      dateAdded: book.dateAdded || new Date().toISOString().split('T')[0],
      estimatedTime: book.estimatedTime || `${book.estReadMin || 5} min read`
    });
  };

  const handleFilterChange = (newFilters: {
    category?: string;
    status?: string;
    difficulty?: string;
  }) => {
    setFilters({
      category: newFilters.category || '',
      status: newFilters.status || '',
      difficulty: newFilters.difficulty || ''
    });
  };

  const handleStatusChange = (id: string, status: string) => {
    // In a real app, this would update the database
    console.log(`Updating ${id} status to ${status}`);
  };

  const handleProgressUpdate = (id: string, progress: number) => {
    // In a real app, this would update the database
    console.log(`Updating ${id} progress to ${progress}%`);
  };

  const getTotalStats = () => {
    const total = allBooks.length;
    const reading = allBooks.filter(b => b.status === 'Reading').length;
    const done = allBooks.filter(b => b.status === 'Done').length;
    const queued = allBooks.filter(b => b.status === 'Queued').length;

    return { total, reading, done, queued };
  };

  const stats = getTotalStats();

  return (
    <HeroWrapper>
      <main className="hero min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <PageHeader 
          title="📚 Personal Library"
          subtitle="Knowledge Collection & Learning Journey"
        />

        {/* Library Stats */}
        <div className="w-full max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 text-center"
            >
              <div className="text-2xl font-bold text-[var(--brand)]">{stats.total}</div>
              <div className="text-sm text-[var(--muted)]">Total Books</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 text-center"
            >
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.reading}</div>
              <div className="text-sm text-blue-600 dark:text-blue-400">Reading</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-lg p-4 text-center"
            >
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.done}</div>
              <div className="text-sm text-emerald-600 dark:text-emerald-400">Completed</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-700 rounded-lg p-4 text-center"
            >
              <div className="text-2xl font-bold text-slate-600 dark:text-slate-400">{stats.queued}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Queued</div>
            </motion.div>
          </div>
        </div>

        {/* Search and Filter */}
        <LibrarySearchBar
          onSearch={setSearchQuery}
          onFilterChange={handleFilterChange}
          placeholder="Search books, authors, or topics..."
        />

        {/* Reading Progress */}
        <ReadingProgress
          totalBooks={allBooks.length}
          readBooks={allBooks.filter(book => book.status === 'Done').length}
          currentlyReading={allBooks.filter(book => book.status === 'Reading').length}
        />

        {/* Library Shelves */}
        <div className="w-full max-w-6xl mx-auto space-y-8">
          {Object.keys(booksByCategory).length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-medium text-[var(--text)] mb-2">No books found</h3>
              <p className="text-[var(--muted)]">Try adjusting your search or filters</p>
            </motion.div>
          ) : (
            Object.entries(booksByCategory).map(([category, books], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <LibraryShelf
                  books={books.map(book => ({
                    id: book.id,
                    title: book.title,
                    category: book.category,
                    status: book.status,
                    difficulty: book.difficulty,
                    color: book.color || 'bg-gray-500',
                    thickness: book.thickness || 30
                  }))}
                  shelfTitle={`${category} (${books.length} books)`}
                  onBookClick={(shelfBook) => {
                    const fullBook = books.find(b => b.id === shelfBook.id);
                    if (fullBook) handleBookClick(fullBook);
                  }}
                />
              </motion.div>
            ))
          )}
        </div>

        {/* Library Ambiance */}
        <div className="w-full max-w-4xl mx-auto mt-16 mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center space-y-4 p-8 bg-gradient-to-b from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl border border-amber-200 dark:border-amber-800"
          >
            <div className="text-4xl mb-2">📖</div>
            <p className="text-sm text-amber-700 dark:text-amber-300 italic">
              &ldquo;A library is not a luxury but one of the necessities of life.&rdquo;
            </p>
            <p className="text-xs text-amber-600 dark:text-amber-400">
              — Henry Ward Beecher
            </p>
          </motion.div>
        </div>
        
        {/* Library Card Modal */}
        {selectedBook && (
          <LibraryCardView
            card={{
              ...selectedBook,
              dateAdded: selectedBook.dateAdded || new Date().toISOString().split('T')[0],
              estimatedTime: selectedBook.estimatedTime || `${selectedBook.estReadMin || 5} min read`
            }}
            onClose={() => setSelectedBook(null)}
            onStatusChange={handleStatusChange}
            onProgressUpdate={handleProgressUpdate}
          />
        )}

        {/* Library Tips */}
        {showTips && (
          <LibraryTips onClose={() => setShowTips(false)} />
        )}
        
        <Sentinel context="learn" />
        <Footer />
      </main>
    </HeroWrapper>
  );
}
