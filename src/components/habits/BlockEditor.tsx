'use client';

import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { JournalBlock, ParagraphBlock, CodeBlock } from '@/types/journal';
import { 
  createParagraphBlock, 
  createCodeBlock, 
  insertBlock, 
  removeBlock, 
  moveBlock, 
  convertBlockType,
  updateBlock 
} from '@/utils/blockUtils';

interface BlockEditorProps {
  blocks: JournalBlock[];
  onBlocksChange: (blocks: JournalBlock[]) => void;
}

interface SlashMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: 'paragraph' | 'code') => void;
  position: { top: number; left: number };
}

function SlashMenu({ isOpen, onClose, onSelect, position }: SlashMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="slash-menu"
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        zIndex: 1000,
      }}
    >
      <div className="slash-menu-item" onClick={() => onSelect('paragraph')}>
        <span className="slash-menu-icon">📝</span>
        <div>
          <div className="slash-menu-title">Paragraph</div>
          <div className="slash-menu-desc">Plain text with formatting</div>
        </div>
      </div>
      <div className="slash-menu-item" onClick={() => onSelect('code')}>
        <span className="slash-menu-icon">💻</span>
        <div>
          <div className="slash-menu-title">Code Block</div>
          <div className="slash-menu-desc">Syntax-highlighted code</div>
        </div>
      </div>
    </div>
  );
}

interface BlockMenuProps {
  isOpen: boolean;
  onClose: () => void;
  blockType: 'paragraph' | 'code';
  canMoveUp: boolean;
  canMoveDown: boolean;
  onConvert: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
  position: { top: number; left: number };
}

function BlockMenu({ 
  isOpen, 
  onClose, 
  blockType, 
  canMoveUp, 
  canMoveDown,
  onConvert,
  onMoveUp,
  onMoveDown,
  onDelete,
  position 
}: BlockMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="block-menu"
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        zIndex: 1000,
      }}
    >
      <div className="block-menu-item" onClick={() => { onConvert(); onClose(); }}>
        <span>🔄</span>
        Convert to {blockType === 'paragraph' ? 'Code' : 'Paragraph'}
      </div>
      {canMoveUp && (
        <div className="block-menu-item" onClick={() => { onMoveUp(); onClose(); }}>
          <span>⬆️</span>
          Move Up
        </div>
      )}
      {canMoveDown && (
        <div className="block-menu-item" onClick={() => { onMoveDown(); onClose(); }}>
          <span>⬇️</span>
          Move Down
        </div>
      )}
      <div className="block-menu-item delete" onClick={() => { onDelete(); onClose(); }}>
        <span>🗑️</span>
        Delete Block
      </div>
    </div>
  );
}

export default function BlockEditor({ blocks, onBlocksChange }: BlockEditorProps) {
  const [slashMenu, setSlashMenu] = useState<{
    isOpen: boolean;
    position: { top: number; left: number };
    afterBlockId: string | null;
  }>({
    isOpen: false,
    position: { top: 0, left: 0 },
    afterBlockId: null
  });

  const [blockMenu, setBlockMenu] = useState<{
    isOpen: boolean;
    position: { top: number; left: number };
    blockId: string;
  }>({
    isOpen: false,
    position: { top: 0, left: 0 },
    blockId: ''
  });

  const handleAddBlock = (afterBlockId: string | null, type: 'paragraph' | 'code') => {
    const newBlock = type === 'paragraph' 
      ? createParagraphBlock() 
      : createCodeBlock();
    
    const updatedBlocks = insertBlock(blocks, afterBlockId, newBlock);
    onBlocksChange(updatedBlocks);
    setSlashMenu({ isOpen: false, position: { top: 0, left: 0 }, afterBlockId: null });
  };

  const handleBlockUpdate = (blockId: string, updates: Partial<JournalBlock>) => {
    const updatedBlocks = updateBlock(blocks, blockId, updates);
    onBlocksChange(updatedBlocks);
  };

  const handleBlockDelete = (blockId: string) => {
    if (blocks.length <= 1) {
      alert('At least one block is required');
      return;
    }
    
    if (confirm('Are you sure you want to delete this block?')) {
      const updatedBlocks = removeBlock(blocks, blockId);
      onBlocksChange(updatedBlocks);
    }
  };

  const handleBlockMove = (blockId: string, direction: 'up' | 'down') => {
    const updatedBlocks = moveBlock(blocks, blockId, direction);
    onBlocksChange(updatedBlocks);
  };

  const handleBlockConvert = (blockId: string) => {
    const block = blocks.find(b => b.id === blockId);
    if (!block) return;
    
    const newType = block.type === 'paragraph' ? 'code' : 'paragraph';
    const updatedBlocks = convertBlockType(blocks, blockId, newType);
    onBlocksChange(updatedBlocks);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>, blockId: string) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const newBlock = createParagraphBlock();
      const updatedBlocks = insertBlock(blocks, blockId, newBlock);
      onBlocksChange(updatedBlocks);
      
      // Focus on new block after state update
      setTimeout(() => {
        const newBlockElement = document.querySelector(`[data-block-id="${newBlock.id}"] textarea`);
        if (newBlockElement) {
          (newBlockElement as HTMLTextAreaElement).focus();
        }
      }, 0);
    }
  };

  const handleSlashCommand = (e: KeyboardEvent<HTMLTextAreaElement>, blockId: string) => {
    const textarea = e.target as HTMLTextAreaElement;
    const block = blocks.find(b => b.id === blockId) as ParagraphBlock;
    
    if (e.key === '/' && block && block.content === '' && block.type === 'paragraph') {
      e.preventDefault();
      const rect = textarea.getBoundingClientRect();
      setSlashMenu({
        isOpen: true,
        position: { top: rect.bottom + 4, left: rect.left },
        afterBlockId: blockId
      });
    }
  };

  const handleBlockMenu = (e: React.MouseEvent, blockId: string) => {
    if (e.shiftKey && e.button === 0) { // Shift+click
      e.preventDefault();
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      setBlockMenu({
        isOpen: true,
        position: { top: rect.top, left: rect.right + 8 },
        blockId
      });
    }
  };

  const renderBlock = (block: JournalBlock, index: number) => {

    return (
      <div key={block.id} className="block-editor-item" data-block-id={block.id}>
        {/* Add Block Button (Top) */}
        <div className="add-block-button-container top">
          <button
            className="add-block-button"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setSlashMenu({
                isOpen: true,
                position: { top: rect.bottom + 4, left: rect.left },
                afterBlockId: index === 0 ? null : blocks[index - 1].id
              });
            }}
          >
            <span>+</span>
          </button>
        </div>

        {/* Block Content */}
        <div 
          className={`block-editor-content ${block.type}`}
          onMouseDown={(e) => handleBlockMenu(e, block.id)}
        >
          {block.type === 'paragraph' ? (
            <textarea
              value={(block as ParagraphBlock).content}
              onChange={(e) => handleBlockUpdate(block.id, { content: e.target.value })}
              onKeyDown={(e) => {
                handleKeyDown(e, block.id);
                handleSlashCommand(e, block.id);
              }}
              placeholder="Type '/' for commands or start writing..."
              className="paragraph-editor"
              rows={Math.max(2, (block as ParagraphBlock).content.split('\n').length)}
            />
          ) : (
            <div className="code-editor">
              <div className="code-editor-header">
                <input
                  type="text"
                  value={(block as CodeBlock).title || ''}
                  onChange={(e) => handleBlockUpdate(block.id, { title: e.target.value })}
                  placeholder="Code block title (optional)"
                  className="code-title-input"
                />
                <select
                  value={(block as CodeBlock).language || 'plaintext'}
                  onChange={(e) => handleBlockUpdate(block.id, { language: e.target.value })}
                  className="code-language-select"
                >
                  <option value="plaintext">Plain Text</option>
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="css">CSS</option>
                  <option value="html">HTML</option>
                  <option value="json">JSON</option>
                  <option value="bash">Bash</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="sql">SQL</option>
                </select>
              </div>
              <textarea
                value={(block as CodeBlock).content}
                onChange={(e) => handleBlockUpdate(block.id, { content: e.target.value })}
                placeholder="Enter your code here..."
                className="code-content-editor"
                rows={Math.max(4, (block as CodeBlock).content.split('\n').length + 1)}
                style={{ fontFamily: 'Monaco, "Lucida Console", monospace' }}
              />
            </div>
          )}
        </div>

        {/* Add Block Button (Bottom) - only show on last block */}
        {index === blocks.length - 1 && (
          <div className="add-block-button-container bottom">
            <button
              className="add-block-button"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setSlashMenu({
                  isOpen: true,
                  position: { top: rect.bottom + 4, left: rect.left },
                  afterBlockId: block.id
                });
              }}
            >
              <span>+</span>
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="block-editor">
      <div className="block-editor-instructions">
        <p><strong>Editor Tips:</strong></p>
        <ul>
          <li>Press <kbd>Enter</kbd> in paragraph to create new paragraph below</li>
          <li>Type <kbd>/</kbd> in empty paragraph for block menu</li>
          <li>Use <kbd>Shift+Click</kbd> on any block for options menu</li>
          <li>Click <kbd>+</kbd> buttons to add blocks at specific positions</li>
        </ul>
      </div>

      <div className="blocks-container">
        {blocks.map((block, index) => (
          <React.Fragment key={block.id}>
            {renderBlock(block, index)}
          </React.Fragment>
        ))}
      </div>

      {/* Slash Menu */}
      <SlashMenu
        isOpen={slashMenu.isOpen}
        onClose={() => setSlashMenu({ ...slashMenu, isOpen: false })}
        onSelect={(type) => handleAddBlock(slashMenu.afterBlockId, type)}
        position={slashMenu.position}
      />

      {/* Block Menu */}
      <BlockMenu
        isOpen={blockMenu.isOpen}
        onClose={() => setBlockMenu({ ...blockMenu, isOpen: false })}
        blockType={blocks.find(b => b.id === blockMenu.blockId)?.type || 'paragraph'}
        canMoveUp={blocks.findIndex(b => b.id === blockMenu.blockId) > 0}
        canMoveDown={blocks.findIndex(b => b.id === blockMenu.blockId) < blocks.length - 1}
        onConvert={() => handleBlockConvert(blockMenu.blockId)}
        onMoveUp={() => handleBlockMove(blockMenu.blockId, 'up')}
        onMoveDown={() => handleBlockMove(blockMenu.blockId, 'down')}
        onDelete={() => handleBlockDelete(blockMenu.blockId)}
        position={blockMenu.position}
      />
    </div>
  );
}
