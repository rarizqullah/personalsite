'use client';

import { useState, useEffect } from 'react';
import HeroWrapper from '@/components/HeroWrapper';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import Sentinel from '@/components/Sentinel';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Force static generation for optimal performance
export const dynamic = 'force-static';

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: [] as string[]
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  // Load entries from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('journal-entries');
      if (saved) {
        const parsedEntries = JSON.parse(saved);
        setEntries(parsedEntries);
      }
    } catch (error) {
      console.error('Error loading journal entries:', error);
    }
  }, []);

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('journal-entries', JSON.stringify(entries));
    }
  }, [entries]);

  const handleSave = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      return;
    }

    const now = new Date().toISOString();

    if (editingId) {
      setEntries(prev => prev.map(entry => 
        entry.id === editingId 
          ? { ...entry, ...formData, updatedAt: now }
          : entry
      ));
      setEditingId(null);
    } else {
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        ...formData,
        createdAt: now,
        updatedAt: now
      };
      setEntries(prev => [newEntry, ...prev]);
    }

    setFormData({ title: '', content: '', tags: [] });
    setIsWriting(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <HeroWrapper>
      <main className="hero min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <PageHeader 
          title="Journal"
          subtitle="Personal Reflections & Thoughts"
        />

        <section className="w-full pb-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
              <button
                onClick={() => setIsWriting(true)}
                className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Tulis Jurnal Baru
              </button>
            </div>

            {/* Writing Form */}
            {isWriting && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">
                  {editingId ? 'Edit Jurnal' : 'Jurnal Baru'}
                </h3>
                
                <div className="space-y-4">
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Judul jurnal..."
                    className="w-full p-3 border rounded-lg"
                  />
                  
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Isi jurnal..."
                    rows={6}
                    className="w-full p-3 border rounded-lg"
                  />
                  
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      disabled={!formData.title.trim() || !formData.content.trim()}
                      className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 disabled:opacity-50"
                    >
                      {editingId ? 'Update' : 'Simpan'}
                    </button>
                    <button
                      onClick={() => {
                        setIsWriting(false);
                        setEditingId(null);
                        setFormData({ title: '', content: '', tags: [] });
                      }}
                      className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Journal Entries */}
            <div className="space-y-6">
              {entries.map((entry) => (
                <article
                  key={entry.id}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <h3 className="text-xl font-bold mb-2">{entry.title}</h3>
                  <p className="text-gray-700 mb-4">{entry.content}</p>
                  <time className="text-sm text-gray-500">
                    {formatDate(entry.createdAt)}
                  </time>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Sentinel context="habits" />
        <Footer />
      </main>
    </HeroWrapper>
  );
}
