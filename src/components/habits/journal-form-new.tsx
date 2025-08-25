'use client'

import React, { useState } from 'react'
import { JournalEntry, JournalBlock } from '@/types/journal'
import { createParagraphBlock } from '@/utils/blockUtils'
import BlockEditor from './BlockEditor'

interface JournalFormProps {
  onSubmit: (entry: JournalEntry) => void
  onCancel: () => void
  initialEntry?: JournalEntry
}

export default function JournalForm({ onSubmit, onCancel, initialEntry }: JournalFormProps) {
  const [title, setTitle] = useState(initialEntry?.title || '')
  const [blocks, setBlocks] = useState<JournalBlock[]>(
    initialEntry?.blocks || [
      createParagraphBlock('')
    ]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (title.trim() === '') {
      alert('Please enter a title')
      return
    }

    // Filter out empty blocks
    const filteredBlocks = blocks.filter(block => {
      if (block.type === 'paragraph') {
        return block.content.trim() !== ''
      } else if (block.type === 'code') {
        return block.content.trim() !== ''
      }
      return true
    })

    if (filteredBlocks.length === 0) {
      alert('Please add some content')
      return
    }

    const now = new Date().toISOString()

    const entry: JournalEntry = {
      id: initialEntry?.id || crypto.randomUUID(),
      title: title.trim(),
      blocks: filteredBlocks.map(block => ({
        ...block,
        updatedAt: now
      })),
      createdAt: initialEntry?.createdAt || now,
      updatedAt: now
    }

    onSubmit(entry)
  }

  const handleReset = () => {
    setTitle('')
    setBlocks([createParagraphBlock('')])
  }

  return (
    <div className="journal-form-overlay">
      <div className="journal-form-container">
        <form onSubmit={handleSubmit} className="journal-form">
          <div className="form-header">
            <h2>{initialEntry ? 'Edit Journal Entry' : 'New Journal Entry'}</h2>
          </div>

          <div className="form-field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter journal title..."
              className="title-input"
              required
            />
          </div>

          <div className="form-field">
            <label>Content</label>
            <BlockEditor 
              blocks={blocks} 
              onBlocksChange={setBlocks}
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="cancel-button">
              Cancel
            </button>
            <button type="button" onClick={handleReset} className="reset-button">
              Reset
            </button>
            <button type="submit" className="submit-button">
              {initialEntry ? 'Update Entry' : 'Save Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
