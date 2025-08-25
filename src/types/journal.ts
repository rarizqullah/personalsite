// Journal Block Base Types
type BlockBase = {
  id: string;
  type: "paragraph" | "code";
  createdAt: string;
  updatedAt: string;
};

export interface ParagraphBlock extends BlockBase {
  type: "paragraph";
  content: string; // markdown/plain, mendukung newline
}

export interface CodeBlock extends BlockBase {
  type: "code";
  title?: string; // opsional
  language?: string; // mis. "ts","js","bash"
  content: string; // kode mentah
}

export type JournalBlock = ParagraphBlock | CodeBlock;

// Updated Journal Entry
export interface JournalEntry {
  id: string;
  title: string;
  blocks: JournalBlock[]; // urutan fleksibel, minimal 1
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  readingTime?: number;
  isBookmarked?: boolean;
}

// Component Props
export interface JournalCardProps {
  entry: JournalEntry;
  canEdit?: boolean;
  canDelete?: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onBookmark?: (id: string) => void;
  index: number;
}

export interface JournalRendererProps {
  blocks: JournalBlock[];
}
