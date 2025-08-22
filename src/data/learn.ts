export type ReadingItem = { 
  id: string; 
  title: string; 
  link?: string; 
  note?: string; 
  status: "Queued" | "Reading" | "Done"; 
};

export type Concept = { 
  id: string; 
  topic: string; 
  summary: string; 
  estReadMin: number; 
};

export type Resource = { 
  id: string; 
  label: string; 
  url?: string; 
  kind: "Article" | "Video" | "Repo" | "Tool"; 
};

export const READING_LIST: ReadingItem[] = [
  { id: "rd-001", title: "Designing for Motion (notes)", status: "Queued", note: "Motion kecil, meaningful, hemat energi." },
  { id: "rd-002", title: "Image Performance in Next.js", status: "Reading", note: "Optimasi <Image>, ukuran responsif, preload terukur." },
  { id: "rd-003", title: "A11y for Interactive UI", status: "Done", note: "Focus ring, roles, ARIA yang hemat." }
];

export const CONCEPT_DIVES: Concept[] = [
  { id: "cp-001", topic: "IntersectionObserver Patterns", summary: "Trigger UI tanpa event scroll; hemat reflow.", estReadMin: 6 },
  { id: "cp-002", topic: "Reduced Motion Strategy", summary: "Fallback non-animasi ketika user memilih minimal motion.", estReadMin: 4 },
  { id: "cp-003", topic: "SSG-First Mentality", summary: "Hindari client code kecuali perlu; jadikan data statis.", estReadMin: 5 }
];

export const RESOURCES: Resource[] = [
  { id: "rs-001", label: "Accessible Nav Patterns", kind: "Article" },
  { id: "rs-002", label: "Framer Motion — Performance Notes", kind: "Article" },
  { id: "rs-003", label: "Next.js Image basics", kind: "Article" },
  { id: "rs-004", label: "Minimal Card UI", kind: "Repo" }
];
