export type ReadingItem = { 
  id: string; 
  title: string; 
  author?: string;
  link?: string; 
  note?: string; 
  status: "Queued" | "Reading" | "Done"; 
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  progress?: number;
  dateAdded?: string;
  estimatedTime?: string;
  tags?: string[];
  category?: string;
  color?: string;
  thickness?: number;
};

export type Concept = { 
  id: string; 
  topic: string; 
  summary: string; 
  estReadMin: number; 
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  author?: string;
  status?: "Queued" | "Reading" | "Done";
  dateAdded?: string;
  tags?: string[];
  category?: string;
  color?: string;
  thickness?: number;
};

export type Resource = { 
  id: string; 
  label: string; 
  url?: string; 
  kind: "Article" | "Video" | "Repo" | "Tool"; 
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  author?: string;
  status?: "Queued" | "Reading" | "Done";
  dateAdded?: string;
  tags?: string[];
  category?: string;
  color?: string;
  thickness?: number;
};

export const READING_LIST: ReadingItem[] = [
  { 
    id: "rd-001", 
    title: "Designing for Motion", 
    author: "Val Head",
    status: "Queued", 
    note: "Motion kecil, meaningful, hemat energi.", 
    difficulty: "Intermediate",
    dateAdded: "2024-01-15",
    estimatedTime: "3 hours",
    tags: ["design", "animation", "ui"],
    category: "Design",
    color: 'bg-purple-500',
    thickness: 35
  },
  { 
    id: "rd-002", 
    title: "Image Performance in Next.js", 
    author: "Next.js Team",
    status: "Reading", 
    note: "Optimasi <Image>, ukuran responsif, preload terukur.",
    difficulty: "Advanced",
    progress: 65,
    dateAdded: "2024-01-10",
    estimatedTime: "2 hours",
    tags: ["nextjs", "performance", "images"],
    category: "Technical",
    color: 'bg-blue-600',
    thickness: 42
  },
  { 
    id: "rd-003", 
    title: "A11y for Interactive UI", 
    author: "Sarah Drasner",
    status: "Done", 
    note: "Focus ring, roles, ARIA yang hemat.",
    difficulty: "Beginner",
    progress: 100,
    dateAdded: "2024-01-05",
    estimatedTime: "1.5 hours",
    tags: ["accessibility", "a11y", "ui"],
    category: "Design",
    color: 'bg-green-500',
    thickness: 28
  },
  { 
    id: "rd-004", 
    title: "TypeScript Deep Dive", 
    author: "Basarat Syed",
    status: "Reading", 
    note: "Advanced patterns dan best practices TypeScript untuk production apps.",
    difficulty: "Advanced",
    progress: 30,
    dateAdded: "2024-01-20",
    estimatedTime: "8 hours",
    tags: ["typescript", "programming", "patterns"],
    category: "Technical",
    color: 'bg-indigo-600',
    thickness: 48
  },
  { 
    id: "rd-005", 
    title: "Design Systems Handbook", 
    author: "Marco Suarez",
    status: "Queued", 
    note: "Systematic approach untuk building consistent design systems.",
    difficulty: "Intermediate",
    dateAdded: "2024-01-22",
    estimatedTime: "4 hours",
    tags: ["design-system", "ui", "consistency"],
    category: "Design",
    color: 'bg-pink-500',
    thickness: 38
  },
  { 
    id: "rd-006", 
    title: "React Performance Optimization", 
    author: "Kent C. Dodds",
    status: "Done", 
    note: "Memo, useMemo, useCallback, dan teknik optimasi React lainnya.",
    difficulty: "Intermediate",
    progress: 100,
    dateAdded: "2023-12-28",
    estimatedTime: "3.5 hours",
    tags: ["react", "performance", "optimization"],
    category: "Technical",
    color: 'bg-cyan-500',
    thickness: 33
  }
];

export const CONCEPT_DIVES: Concept[] = [
  { 
    id: "cp-001", 
    topic: "IntersectionObserver Patterns", 
    summary: "Trigger UI tanpa event scroll; hemat reflow.", 
    estReadMin: 6,
    difficulty: "Advanced",
    author: "MDN Contributors",
    status: "Queued",
    dateAdded: "2024-01-20",
    tags: ["javascript", "performance", "api"],
    category: "Technical",
    color: 'bg-orange-500',
    thickness: 25
  },
  { 
    id: "cp-002", 
    topic: "Reduced Motion Strategy", 
    summary: "Fallback non-animasi ketika user memilih minimal motion.", 
    estReadMin: 4,
    difficulty: "Intermediate",
    author: "Tatiana Mac",
    status: "Reading",
    dateAdded: "2024-01-18",
    tags: ["accessibility", "css", "motion"],
    category: "Design",
    color: 'bg-teal-500',
    thickness: 22
  },
  { 
    id: "cp-003", 
    topic: "SSG-First Mentality", 
    summary: "Hindari client code kecuali perlu; jadikan data statis.", 
    estReadMin: 5,
    difficulty: "Intermediate",
    author: "Vercel Team",
    status: "Done",
    dateAdded: "2024-01-12",
    tags: ["ssg", "nextjs", "performance"],
    category: "Technical",
    color: 'bg-emerald-500',
    thickness: 30
  },
  { 
    id: "cp-004", 
    topic: "Advanced CSS Grid Techniques", 
    summary: "Grid areas, subgrid, dan layout patterns modern dengan CSS Grid.", 
    estReadMin: 8,
    difficulty: "Advanced",
    author: "Jen Simmons",
    status: "Queued",
    dateAdded: "2024-01-25",
    tags: ["css", "grid", "layout"],
    category: "Design",
    color: 'bg-rose-500',
    thickness: 27
  },
  { 
    id: "cp-005", 
    topic: "Web Performance Metrics", 
    summary: "LCP, FID, CLS - understanding dan optimizing Core Web Vitals.", 
    estReadMin: 7,
    difficulty: "Intermediate",
    author: "Google DevRel",
    status: "Reading",
    dateAdded: "2024-01-14",
    tags: ["performance", "metrics", "web-vitals"],
    category: "Technical",
    color: 'bg-amber-500',
    thickness: 31
  }
];

export const RESOURCES: Resource[] = [
  { 
    id: "rs-001", 
    label: "Accessible Nav Patterns", 
    kind: "Article",
    difficulty: "Beginner",
    author: "A11y Project",
    status: "Queued",
    dateAdded: "2024-01-25",
    tags: ["accessibility", "navigation"],
    category: "Resources",
    color: 'bg-lime-500',
    thickness: 18
  },
  { 
    id: "rs-002", 
    label: "Framer Motion — Performance Notes", 
    kind: "Article",
    difficulty: "Advanced",
    author: "Framer Team",
    status: "Reading",
    dateAdded: "2024-01-22",
    tags: ["animation", "performance", "react"],
    category: "Resources",
    color: 'bg-violet-500',
    thickness: 24
  },
  { 
    id: "rs-003", 
    label: "Next.js Image basics", 
    kind: "Article",
    difficulty: "Beginner",
    author: "Next.js Docs",
    status: "Done",
    dateAdded: "2024-01-15",
    tags: ["nextjs", "images", "optimization"],
    category: "Resources",
    color: 'bg-sky-500',
    thickness: 20
  },
  { 
    id: "rs-004", 
    label: "Minimal Card UI", 
    kind: "Repo",
    difficulty: "Intermediate",
    author: "GitHub Community",
    status: "Queued",
    dateAdded: "2024-01-20",
    tags: ["ui", "components", "css"],
    category: "Resources",
    color: 'bg-fuchsia-500',
    thickness: 26
  },
  { 
    id: "rs-005", 
    label: "React Hook Patterns", 
    kind: "Video",
    difficulty: "Intermediate",
    author: "React Conf",
    status: "Queued",
    dateAdded: "2024-01-28",
    tags: ["react", "hooks", "patterns"],
    category: "Resources",
    color: 'bg-red-500',
    thickness: 21
  },
  { 
    id: "rs-006", 
    label: "Figma Dev Mode Guide", 
    kind: "Tool",
    difficulty: "Beginner",
    author: "Figma Team",
    status: "Done",
    dateAdded: "2024-01-08",
    tags: ["figma", "design", "development"],
    category: "Resources",
    color: 'bg-slate-500',
    thickness: 19
  }
];
