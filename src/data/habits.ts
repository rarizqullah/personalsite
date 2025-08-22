export type ArtItem = {
  id: string;
  title: string;
  medium: "Ink" | "Digital" | "Watercolor" | "Pencil";
  date: string;          // ISO
  thumbnail: string;     // gunakan placeholder berbasis data URL atau /placeholder.svg
  notes?: string;
};

export type JournalEntry = {
  id: string;
  date: string;          // ISO
  title: string;
  excerpt: string;
  tags: string[];
};

export const ART_ITEMS: ArtItem[] = [
  {
    id: "art-001",
    title: "Line Study — Morning Rhythm",
    medium: "Ink",
    date: "2024-12-05",
    thumbnail: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=600&fit=crop&auto=format&q=80",
    notes: "Gesture 5-minute warmups"
  },
  {
    id: "art-002",
    title: "City Corners",
    medium: "Digital",
    date: "2025-01-14",
    thumbnail: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=600&fit=crop&auto=format&q=80",
    notes: "Urban architectural study"
  },
  {
    id: "art-003",
    title: "Silent Greens",
    medium: "Watercolor",
    date: "2025-03-02",
    thumbnail: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=600&fit=crop&auto=format&q=80",
    notes: "Natural light exploration"
  },
  {
    id: "art-004",
    title: "Portrait — Study #7",
    medium: "Pencil",
    date: "2025-05-19",
    thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop&auto=format&q=80",
    notes: "Character expression study"
  },
  {
    id: "art-005",
    title: "Abstract Harmony",
    medium: "Digital",
    date: "2025-06-12",
    thumbnail: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=600&fit=crop&auto=format&q=80",
    notes: "Color theory practice"
  },
  {
    id: "art-006",
    title: "Nature's Whisper",
    medium: "Watercolor",
    date: "2025-07-08",
    thumbnail: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=600&fit=crop&auto=format&q=80",
    notes: "Botanical illustration"
  },
  {
    id: "art-007",
    title: "Minimalist Forms",
    medium: "Ink",
    date: "2025-08-15",
    thumbnail: "https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?w=400&h=600&fit=crop&auto=format&q=80",
    notes: "Geometric composition"
  },
  {
    id: "art-008",
    title: "Digital Dreams",
    medium: "Digital",
    date: "2025-08-20",
    thumbnail: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=600&fit=crop&auto=format&q=80",
    notes: "Surreal landscape study"
  }
];

export const JOURNALS: JournalEntry[] = [
  {
    id: "jr-001",
    date: "2025-02-11",
    title: "Getting comfortable with constraints",
    excerpt: "Fokus pada batasan waktu 30 menit ternyata mendorong keputusan komposisi yang lebih berani.",
    tags: ["process", "habit"]
  },
  {
    id: "jr-002",
    date: "2025-04-08",
    title: "Ink lines & breathing",
    excerpt: "Tarikan garis mengikuti ritme napas menghasilkan tekstur yang lebih hidup.",
    tags: ["ink", "mindfulness"]
  },
  {
    id: "jr-003",
    date: "2025-07-02",
    title: "Color notes: muted emerald",
    excerpt: "Palet emerald lembut + ivory untuk nuansa editorial premium.",
    tags: ["color", "study"]
  }
];
