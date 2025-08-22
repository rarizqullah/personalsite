'use client';

import { useState, useEffect } from 'react';
import HeroWrapper from '@/components/HeroWrapper';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import Sentinel from '@/components/Sentinel';
import { JOURNALS } from '@/data/habits';

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

export default function HabitsPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: [] as string[]
  });
  const [tagInput, setTagInput] = useState('');

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('habits-journal-entries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    } else {
      // Convert JOURNALS data to demo entries
      const demoEntries: JournalEntry[] = JOURNALS.map(journal => ({
        id: journal.id,
        title: journal.title,
        content: journal.excerpt,
        tags: journal.tags,
        createdAt: new Date(journal.date).toISOString(),
        updatedAt: new Date(journal.date).toISOString()
      }));
      setEntries(demoEntries);
    }
  }, []);

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('habits-journal-entries', JSON.stringify(entries));
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
    setTagInput('');
  };

  const handleEdit = (entry: JournalEntry) => {
    setFormData({
      title: entry.title,
      content: entry.content,
      tags: entry.tags
    });
    setEditingId(entry.id);
    setIsWriting(true);
  };

  const handleDelete = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
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

  const handleCancel = () => {
    setFormData({ title: '', content: '', tags: [] });
    setTagInput('');
    setIsWriting(false);
    setEditingId(null);
  };

  return (
    <HeroWrapper>
      <main className="hero min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <PageHeader 
          title="Journal"
          subtitle="Personal Reflections & Thoughts"
        />

        {/* Journaling Section */}
        <section className="w-full pb-20">
          <div className="max-w-4xl mx-auto px-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="text-center">
                
               
              </div>
              <button
                onClick={() => setIsWriting(true)}
                className="journal-add-btn-minimal"
                title="Tulis Jurnal Baru"
                aria-label="Tulis jurnal baru"
              >
                <svg 
                  className="journal-add-icon-minimal" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Writing Form */}
          {isWriting && (
            <div className="max-w-4xl mx-auto px-4 mb-8">
              <div className="journal-form-card">
                <div className="journal-form-card__header">
                  <h3 className="journal-form-card__title">
                    {editingId ? '📝 Edit Jurnal' : '✍️ Jurnal Baru'}
                  </h3>
                  <p className="journal-form-card__subtitle">
                    {editingId ? 'Perbarui jurnal Anda' : 'Tulis dan simpan momen berharga hari ini'}
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Title Input */}
                  <div className="journal-form-group">
                    <label className="journal-form-label">
                      Judul
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Masukkan judul jurnal..."
                      className="journal-form-input"
                    />
                  </div>

                  {/* Content Textarea */}
                  <div className="journal-form-group">
                    <label className="journal-form-label">
                      Isi Jurnal
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Ceritakan hari mu..."
                      rows={6}
                      className="journal-form-input journal-form-textarea"
                    />
                  </div>

                  {/* Tags Section */}
                  <div className="journal-form-group">
                    <label className="journal-form-label">
                      Tags
                    </label>
                    
                    {/* Tags Display */}
                    <div className="journal-form-tags">
                      {formData.tags.map((tag, index) => (
                        <span key={index} className="journal-form-tag">
                          {tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="journal-form-tag-remove"
                            type="button"
                            aria-label={`Hapus tag ${tag}`}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>

                    {/* Tag Input */}
                    <div className="journal-form-tag-input-wrapper">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                        placeholder="Tambahkan tag..."
                        className="journal-form-tag-input"
                      />
                      <button
                        onClick={addTag}
                        type="button"
                        className="journal-form-tag-add"
                      >
                        Tambah
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="journal-form-actions">
                    <button
                      onClick={handleSave}
                      disabled={!formData.title.trim() || !formData.content.trim()}
                      className="journal-form-btn journal-form-btn--primary"
                      type="button"
                    >
                      {editingId ? '💾 Update Jurnal' : '💝 Simpan Jurnal'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="journal-form-btn journal-form-btn--secondary"
                      type="button"
                    >
                      ❌ Batal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Journal Cards Grid */}
          <div className="max-w-4xl mx-auto px-4">
            <div className="journal-grid">
              {entries.map((entry, index) => (
                <article
                  key={entry.id}
                  className="journal-card"
                  style={{ 
                    contentVisibility: 'auto',
                    containIntrinsicSize: '350px',
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  {/* Content */}
                  <div className="journal-card__content journal-card__content--full">
                    <h3 className="journal-card__title">
                      {entry.title}
                    </h3>
                    
                    <p className="journal-card__excerpt">
                      {entry.content}
                    </p>

                    {/* Tags */}
                    {entry.tags.length > 0 && (
                      <div className="journal-card__tags">
                        {entry.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="journal-card__tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Date */}
                    <time className="journal-card__date" dateTime={entry.createdAt}>
                      {formatDate(entry.createdAt)}
                    </time>
                  </div>

                  {/* Action Buttons */}
                  <div className="journal-card__actions">
                    <button
                      onClick={() => handleEdit(entry)}
                      className="journal-card__action journal-card__action--edit"
                      title="Edit entry"
                      type="button"
                      aria-label={`Edit journal entry: ${entry.title}`}
                    >
                      <svg className="journal-card__action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="journal-card__action journal-card__action--delete"
                      title="Delete entry"
                      type="button"
                      aria-label={`Delete journal entry: ${entry.title}`}
                    >
                      <svg className="journal-card__action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Empty State */}
            {entries.length === 0 && !isWriting && (
              <div className="journal-empty">
                <div className="journal-empty__icon" role="img" aria-label="Empty journal">📔</div>
                <h3 className="journal-empty__title">
                  Belum Ada Jurnal
                </h3>
                <p className="journal-empty__description">
                  Mulai menulis jurnal pertama Anda untuk mendokumentasikan perjalanan hidup
                </p>
                <button
                  onClick={() => setIsWriting(true)}
                  className="journal-empty__cta"
                  type="button"
                >
                  Mulai Menulis
                </button>
              </div>
            )}
          </div>
        </section>
        
        <Sentinel context="habits" />
        <Footer />
      </main>
    </HeroWrapper>
  );
}
