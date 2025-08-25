import { JournalBlock, ParagraphBlock, CodeBlock } from '@/types/journal';

// Utility untuk generate ID unik
export function generateBlockId(): string {
  return `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Factory functions untuk membuat block baru
export function createParagraphBlock(content: string = ''): ParagraphBlock {
  const now = new Date().toISOString();
  return {
    id: generateBlockId(),
    type: 'paragraph',
    content,
    createdAt: now,
    updatedAt: now
  };
}

export function createCodeBlock(content: string = '', title?: string, language: string = 'plaintext'): CodeBlock {
  const now = new Date().toISOString();
  return {
    id: generateBlockId(),
    type: 'code',
    content,
    title,
    language,
    createdAt: now,
    updatedAt: now
  };
}

// Validation functions
export function validateJournalBlocks(blocks: JournalBlock[]): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (blocks.length === 0) {
    errors.push('At least one block is required');
  }
  
  // Check for unique IDs
  const ids = blocks.map(block => block.id);
  const uniqueIds = new Set(ids);
  if (ids.length !== uniqueIds.size) {
    errors.push('All block IDs must be unique');
  }
  
  // Validate individual blocks
  blocks.forEach((block, index) => {
    if (!block.id) {
      errors.push(`Block at index ${index} is missing ID`);
    }
    
    if (block.type === 'code' && block.content.trim().length === 0) {
      errors.push(`Code block at index ${index} cannot be empty`);
    }
    
    if (!block.createdAt || !block.updatedAt) {
      errors.push(`Block at index ${index} is missing timestamp`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Utility untuk mengupdate block
export function updateBlock(blocks: JournalBlock[], blockId: string, updates: Partial<JournalBlock>): JournalBlock[] {
  return blocks.map(block => 
    block.id === blockId 
      ? { ...block, ...updates, updatedAt: new Date().toISOString() }
      : block
  );
}

// Utility untuk menambah block
export function insertBlock(blocks: JournalBlock[], afterBlockId: string | null, newBlock: JournalBlock): JournalBlock[] {
  if (afterBlockId === null) {
    // Insert at beginning
    return [newBlock, ...blocks];
  }
  
  const index = blocks.findIndex(block => block.id === afterBlockId);
  if (index === -1) {
    // If block not found, append at end
    return [...blocks, newBlock];
  }
  
  return [
    ...blocks.slice(0, index + 1),
    newBlock,
    ...blocks.slice(index + 1)
  ];
}

// Utility untuk menghapus block
export function removeBlock(blocks: JournalBlock[], blockId: string): JournalBlock[] {
  return blocks.filter(block => block.id !== blockId);
}

// Utility untuk mengubah urutan block
export function moveBlock(blocks: JournalBlock[], blockId: string, direction: 'up' | 'down'): JournalBlock[] {
  const currentIndex = blocks.findIndex(block => block.id === blockId);
  if (currentIndex === -1) return blocks;
  
  const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
  if (newIndex < 0 || newIndex >= blocks.length) return blocks;
  
  const newBlocks = [...blocks];
  const [movedBlock] = newBlocks.splice(currentIndex, 1);
  newBlocks.splice(newIndex, 0, movedBlock);
  
  return newBlocks;
}

// Utility untuk konversi tipe block
export function convertBlockType(blocks: JournalBlock[], blockId: string, newType: 'paragraph' | 'code'): JournalBlock[] {
  return blocks.map(block => {
    if (block.id !== blockId) return block;
    
    const now = new Date().toISOString();
    
    if (newType === 'paragraph' && block.type === 'code') {
      return {
        id: block.id,
        type: 'paragraph',
        content: block.content,
        createdAt: block.createdAt,
        updatedAt: now
      } as ParagraphBlock;
    }
    
    if (newType === 'code' && block.type === 'paragraph') {
      return {
        id: block.id,
        type: 'code',
        content: block.content,
        title: '',
        language: 'plaintext',
        createdAt: block.createdAt,
        updatedAt: now
      } as CodeBlock;
    }
    
    return block;
  });
}

// Calculate reading time from blocks
export function calculateReadingTimeFromBlocks(blocks: JournalBlock[]): number {
  const totalWords = blocks.reduce((acc, block) => {
    if (block.type === 'paragraph') {
      const words = block.content.trim().split(/\s+/).filter(word => word.length > 0);
      return acc + words.length;
    }
    return acc;
  }, 0);
  
  const wordsPerMinute = 200;
  return Math.max(1, Math.ceil(totalWords / wordsPerMinute));
}
