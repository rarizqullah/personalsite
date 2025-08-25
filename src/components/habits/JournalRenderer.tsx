'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { JournalRendererProps, JournalBlock } from '@/types/journal';

export default function JournalRenderer({ blocks }: JournalRendererProps) {
  const renderBlock = (block: JournalBlock, index: number) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p 
            key={index} 
            className="journal-paragraph-block"
            style={{ textAlign: 'justify' }}
          >
            {block.content}
          </p>
        );
      
      case 'code':
        return (
          <div key={index} className="journal-code-block">
            {block.title && (
              <div className="code-block-title">
                <h4>{block.title}</h4>
                <span className="code-language">{block.language}</span>
              </div>
            )}
            <SyntaxHighlighter
              language={(block.language || 'text').toLowerCase()}
              style={oneDark}
              customStyle={{
                margin: 0,
                borderRadius: block.title ? '0 0 8px 8px' : '8px',
                fontSize: '13px',
              }}
            >
              {block.content}
            </SyntaxHighlighter>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="journal-blocks-container">
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
}
