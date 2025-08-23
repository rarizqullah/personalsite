'use client';

import { useState, useRef, useEffect } from 'react';

interface CodeBlock {
  language: string;
  code: string;
  title?: string;
}

interface JournalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entry: {
    title: string;
    content: string;
    tags: string[];
    codeBlocks: CodeBlock[];
  }) => void;
  editingEntry?: {
    id: string;
    title: string;
    content: string;
    tags: string[];
    codeBlocks?: CodeBlock[];
  } | null;
}

export default function JournalForm({ 
  isOpen, 
  onClose, 
  onSave, 
  editingEntry 
}: JournalFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: [] as string[],
    codeBlocks: [] as CodeBlock[]
  });
  const [tagInput, setTagInput] = useState('');
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [newCodeBlock, setNewCodeBlock] = useState<CodeBlock>({
    language: 'javascript',
    code: '',
    title: ''
  });

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  // Reset form when modal opens/closes or editing entry changes
  useEffect(() => {
    if (isOpen) {
      if (editingEntry) {
        setFormData({
          title: editingEntry.title,
          content: editingEntry.content,
          tags: editingEntry.tags,
          codeBlocks: editingEntry.codeBlocks || []
        });
      } else {
        setFormData({
          title: '',
          content: '',
          tags: [],
          codeBlocks: []
        });
      }
      // Focus title input after modal animation
      setTimeout(() => titleRef.current?.focus(), 100);
    }
  }, [isOpen, editingEntry]);

  const handleSave = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      return;
    }
    onSave(formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({ title: '', content: '', tags: [], codeBlocks: [] });
    setTagInput('');
    setShowCodeEditor(false);
    setNewCodeBlock({ language: 'javascript', code: '', title: '' });
    onClose();
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

  const addCodeBlock = () => {
    if (newCodeBlock.code.trim()) {
      setFormData(prev => ({
        ...prev,
        codeBlocks: [...prev.codeBlocks, { ...newCodeBlock }]
      }));
      setNewCodeBlock({ language: 'javascript', code: '', title: '' });
      setShowCodeEditor(false);
    }
  };

  const removeCodeBlock = (index: number) => {
    setFormData(prev => ({
      ...prev,
      codeBlocks: prev.codeBlocks.filter((_, i) => i !== index)
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSave();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="journal-modal-overlay" onClick={handleClose}>
      <div 
        className="journal-modal" 
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="journal-modal__header">
          <h2 className="journal-modal__title">
            {editingEntry ? '📝 Edit Journal Entry' : '✍️ New Journal Entry'}
          </h2>
          <button
            onClick={handleClose}
            className="journal-modal__close"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="journal-modal__content">
          {/* Title Input */}
          <div className="journal-form-group">
            <label className="journal-form-label">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              ref={titleRef}
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter a compelling title..."
              className="journal-form-input"
              required
            />
          </div>

          {/* Content Textarea */}
          <div className="journal-form-group">
            <label className="journal-form-label">
              Content <span className="text-red-400">*</span>
            </label>
            <textarea
              ref={contentRef}
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Share your thoughts, experiences, and insights..."
              rows={8}
              className="journal-form-textarea"
              required
            />
            <div className="journal-form-hint">
              {formData.content.length} characters
            </div>
          </div>

          {/* Tags Section */}
          <div className="journal-form-group">
            <label className="journal-form-label">Tags</label>
            
            {/* Existing Tags */}
            {formData.tags.length > 0 && (
              <div className="journal-form-tags">
                {formData.tags.map((tag, index) => (
                  <span key={index} className="journal-form-tag">
                    #{tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="journal-form-tag__remove"
                      type="button"
                      aria-label={`Remove tag ${tag}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Tag Input */}
            <div className="journal-form-tag-input">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Add tags (press Enter)"
                className="journal-form-input"
              />
              <button
                onClick={addTag}
                type="button"
                className="journal-form-tag-add-btn"
                disabled={!tagInput.trim()}
              >
                Add
              </button>
            </div>
          </div>

          {/* Code Blocks Section */}
          <div className="journal-form-group">
            <div className="flex items-center justify-between mb-3">
              <label className="journal-form-label">Code Snippets</label>
              <button
                onClick={() => setShowCodeEditor(!showCodeEditor)}
                className="journal-form-code-toggle"
                type="button"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Add Code
              </button>
            </div>

            {/* Existing Code Blocks */}
            {formData.codeBlocks.length > 0 && (
              <div className="space-y-3 mb-4">
                {formData.codeBlocks.map((block, index) => (
                  <div key={index} className="journal-form-code-preview">
                    <div className="journal-form-code-preview__header">
                      <span className="journal-form-code-preview__language">
                        {block.language}
                      </span>
                      {block.title && (
                        <span className="journal-form-code-preview__title">
                          {block.title}
                        </span>
                      )}
                      <button
                        onClick={() => removeCodeBlock(index)}
                        className="journal-form-code-preview__remove"
                        aria-label="Remove code block"
                      >
                        ×
                      </button>
                    </div>
                    <pre className="journal-form-code-preview__code">
                      <code>{block.code.substring(0, 100)}{block.code.length > 100 ? '...' : ''}</code>
                    </pre>
                  </div>
                ))}
              </div>
            )}

            {/* Code Editor */}
            {showCodeEditor && (
              <div className="journal-form-code-editor">
                <div className="journal-form-code-editor__header">
                  <select
                    value={newCodeBlock.language}
                    onChange={(e) => setNewCodeBlock(prev => ({ ...prev, language: e.target.value }))}
                    className="journal-form-code-select"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="css">CSS</option>
                    <option value="html">HTML</option>
                    <option value="bash">Bash</option>
                    <option value="sql">SQL</option>
                    <option value="json">JSON</option>
                  </select>
                  <input
                    type="text"
                    value={newCodeBlock.title}
                    onChange={(e) => setNewCodeBlock(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Code title (optional)"
                    className="journal-form-code-title"
                  />
                </div>
                <textarea
                  value={newCodeBlock.code}
                  onChange={(e) => setNewCodeBlock(prev => ({ ...prev, code: e.target.value }))}
                  placeholder="Paste your code here..."
                  rows={6}
                  className="journal-form-code-textarea"
                />
                <div className="journal-form-code-editor__actions">
                  <button
                    onClick={addCodeBlock}
                    disabled={!newCodeBlock.code.trim()}
                    className="journal-form-code-save"
                  >
                    Add Code Block
                  </button>
                  <button
                    onClick={() => setShowCodeEditor(false)}
                    className="journal-form-code-cancel"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="journal-modal__footer">
          <div className="journal-modal__actions">
            <button
              onClick={handleClose}
              className="journal-modal__btn journal-modal__btn--secondary"
              type="button"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!formData.title.trim() || !formData.content.trim()}
              className="journal-modal__btn journal-modal__btn--primary"
              type="button"
            >
              {editingEntry ? 'Update Entry' : 'Create Entry'}
            </button>
          </div>
          <div className="journal-modal__shortcuts">
            <span className="journal-modal__shortcut">
              <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to save
            </span>
            <span className="journal-modal__shortcut">
              <kbd>Esc</kbd> to cancel
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
