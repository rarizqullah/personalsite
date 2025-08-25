export type ArtItem = {
  id: string;
  title: string;
  medium: "Ink" | "Digital" | "Watercolor" | "Pencil";
  date: string;          // ISO
  thumbnail: string;     // gunakan placeholder berbasis data URL atau /placeholder.svg
  notes?: string;
};

// Import new types
import { JournalEntry } from '../types/journal';

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
    createdAt: "2025-01-14T10:00:00.000Z",
    updatedAt: "2025-01-14T10:00:00.000Z",
    title: "API Integration with Fetch",
    blocks: [
      {
        id: "block_001_1",
        type: 'paragraph',
        content: "Implementing proper error handling and loading states when fetching data from REST APIs. Important to handle edge cases like network failures, timeout errors, and malformed responses.",
        createdAt: "2025-01-14T10:00:00.000Z",
        updatedAt: "2025-01-14T10:00:00.000Z"
      },
      {
        id: "block_001_2",
        type: 'code',
        title: "API Error Handling Pattern",
        language: "javascript",
        content: `async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error('Fetch error:', error);
    return { data: null, error: error.message };
  }
}`,
        createdAt: "2025-01-14T10:01:00.000Z",
        updatedAt: "2025-01-14T10:01:00.000Z"
      },
      {
        id: "block_001_3",
        type: 'paragraph',
        content: "Always wrap API calls in try-catch blocks and provide meaningful user feedback. Learned about async/await patterns and how to structure API service layers for maintainable code.",
        createdAt: "2025-01-14T10:02:00.000Z",
        updatedAt: "2025-01-14T10:02:00.000Z"
      }
    ],
    tags: ["API", "JavaScript", "Error Handling"],
    isBookmarked: true
  },
  {
    id: "jr-002", 
    createdAt: "2025-01-12T14:30:00.000Z",
    updatedAt: "2025-01-12T14:30:00.000Z",
    title: "CSS Grid Layout Mastery",
    blocks: [
      {
        id: "block_002_1",
        type: 'code',
        title: "Responsive Grid Layout",
        language: "css",
        content: `.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  grid-template-areas: 
    "header header header"
    "sidebar main aside"
    "footer footer footer";
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-areas: 
      "header"
      "main"
      "sidebar" 
      "aside"
      "footer";
  }
}`,
        createdAt: "2025-01-12T14:30:00.000Z",
        updatedAt: "2025-01-12T14:30:00.000Z"
      },
      {
        id: "block_002_2",
        type: 'paragraph',
        content: "Creating responsive layouts with CSS Grid. The power of grid-template-areas makes complex layouts much more readable and maintainable.",
        createdAt: "2025-01-12T14:31:00.000Z",
        updatedAt: "2025-01-12T14:31:00.000Z"
      },
      {
        id: "block_002_3",
        type: 'paragraph',
        content: "Grid is perfect for 2D layouts while Flexbox excels at 1D arrangements. Understanding the difference between implicit and explicit grids was a game-changer for complex responsive designs.",
        createdAt: "2025-01-12T14:32:00.000Z",
        updatedAt: "2025-01-12T14:32:00.000Z"
      }
    ],
    tags: ["CSS", "Grid", "Responsive Design"],
    isBookmarked: false
  },
  {
    id: "jr-003",
    createdAt: "2025-01-10T16:45:00.000Z", 
    updatedAt: "2025-01-10T16:45:00.000Z",
    title: "Building My First React Hook",
    blocks: [
      {
        id: "block_003_1",
        type: 'paragraph',
        content: "Learning about custom hooks and state management in React. Discovered how to create reusable logic with useState and useEffect.",
        createdAt: "2025-01-10T16:45:00.000Z",
        updatedAt: "2025-01-10T16:45:00.000Z"
      },
      {
        id: "block_003_2",
        type: 'paragraph', 
        content: "The key insight was understanding the rules of hooks and how they enable component reuse. Custom hooks allow us to extract component logic into reusable functions, making our code more modular and testable.",
        createdAt: "2025-01-10T16:46:00.000Z",
        updatedAt: "2025-01-10T16:46:00.000Z"
      },
      {
        id: "block_003_3",
        type: 'code',
        title: "Custom useLocalStorage Hook",
        language: "javascript",
        content: `import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  return [storedValue, setValue];
}`,
        createdAt: "2025-01-10T16:47:00.000Z",
        updatedAt: "2025-01-10T16:47:00.000Z"
      },
      {
        id: "block_003_4",
        type: 'paragraph',
        content: "This hook demonstrates the power of composition in React. By encapsulating localStorage logic, we can reuse it across multiple components while maintaining consistent error handling.",
        createdAt: "2025-01-10T16:48:00.000Z",
        updatedAt: "2025-01-10T16:48:00.000Z"
      }
    ],
    tags: ["React", "Hooks", "JavaScript"],
    isBookmarked: true
  }
];
