# Structure Analysis Report

Generated on: 2025-09-11  
Branch: chore/cleanup-structure-20250911

## Current Structure Analysis

### Current Folder Structure
```
src/
├── app/                   # Next.js App Router (preserved as-is)
│   ├── api/              # API routes (protected)
│   ├── habits/           # Habits feature route
│   ├── cookie-test/      # Cookie test route
│   ├── demo/             # Demo route
│   ├── privacy/          # Privacy policy route
│   ├── terms/            # Terms route
│   └── test-images/      # Test images route
├── components/           # All React components (needs reorganization)
│   ├── blog/            # Blog-specific components
│   └── habits/          # Habits-specific components
├── data/                # Static data files
├── styles/              # CSS files (needs reorganization)
├── types/               # TypeScript type definitions
└── utils/               # Utility functions (needs renaming to `lib/`)
```

### Target Structure (Proposed)
```
src/
├── app/                 # Next.js App Router (no changes)
│   ├── (site)/         # Route group for main site
│   │   ├── page.tsx    # Home page
│   │   ├── habits/     # Move from root app/
│   │   ├── demo/       # Move from root app/
│   │   └── resources/  # Rename from test-images
│   ├── (legal)/        # Route group for legal pages
│   │   ├── privacy/    # Move from root app/
│   │   └── terms/      # Move from root app/
│   └── api/            # API routes (unchanged)
├── components/
│   ├── ui/             # Atomic UI components
│   ├── sections/       # Page sections (Hero, Footer, etc.)
│   ├── composite/      # Complex composed components
│   └── features/       # Feature-specific components
│       ├── blog/       # Blog components
│       └── habits/     # Habits components
├── lib/                # Renamed from utils/
├── hooks/              # Custom React hooks (new)
├── config/             # App configuration (new)
├── styles/
│   ├── globals.css     # Global styles
│   └── components/     # Component-specific styles
├── types/              # TypeScript definitions (unchanged)
└── data/               # Static data (unchanged)
```

## Reorganization Plan

### Phase 1: Utility Functions (utils → lib)
- Rename `utils/` to `lib/` for better convention
- Move files: `utils/*` → `lib/*`

### Phase 2: Component Organization
**Current components to reorganize:**

**Move to `components/ui/` (Atomic UI):**
- `Container.tsx` - Layout container
- `ImageButton.tsx` - Reusable image button
- `ThemeToggle.tsx` - Theme switcher
- `Sentinel.tsx` - Utility component

**Move to `components/sections/` (Page Sections):**
- `ProfileHeader.tsx` - Main profile section
- `Footer.tsx` - Site footer
- `HeroMotionClient.tsx` - Hero section with animation
- `HeroWrapper.tsx` - Hero section wrapper

**Move to `components/composite/` (Complex Components):**
- `AdvancedTechCarousel.tsx` - Advanced tech carousel
- `CookieConsent.tsx` - Cookie consent banner

**Move to `components/features/` (Feature-specific):**
- `blog/*` → `components/features/blog/`
- `habits/*` → `components/features/habits/`

### Phase 3: CSS Organization
**Current CSS files:**
- `advanced-carousel-clean.css` - Move to components/
- `advanced-carousel.css` - Move to components/
- `blog.css` - Move to features/blog/
- `habits.css` - Move to features/habits/
- `image-button.css` - Move to components/ or convert to module
- `interactive-carousel.css` - Remove (component removed)
- `learning-hub.css` - Remove (component removed)
- `multi-row-carousel.css` - Remove (component removed)
- `page-navigation.css` - Remove (component removed)
- `tech-carousel.css` - Move to components/

### Phase 4: Route Organization (Optional)
**Using route groups for better organization:**
- `app/(site)/` - Main site pages (pathless)
- `app/(legal)/` - Legal pages (pathless)

## Path Alias Configuration

### Proposed tsconfig.json paths:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@app/*": ["src/app/*"],
      "@components/*": ["src/components/*"],
      "@ui/*": ["src/components/ui/*"],
      "@sections/*": ["src/components/sections/*"],
      "@composite/*": ["src/components/composite/*"],
      "@features/*": ["src/components/features/*"],
      "@lib/*": ["src/lib/*"],
      "@hooks/*": ["src/hooks/*"],
      "@styles/*": ["src/styles/*"],
      "@types/*": ["src/types/*"],
      "@config/*": ["src/config/*"],
      "@data/*": ["src/data/*"]
    }
  }
}
```

## Decision Rationale

### Why this structure?
1. **Separation of Concerns**: UI components separated by complexity level
2. **Feature Grouping**: Related components grouped together
3. **Path Clarity**: Clear import paths with aliases
4. **Next.js Best Practices**: Route groups for organization without URL changes
5. **Scalability**: Structure supports growth and new features

### What stays the same?
- All Next.js special files (`layout.tsx`, `page.tsx`, etc.)
- API routes structure
- Public assets location
- Configuration files

### Risks and Mitigations
1. **Import Path Changes**: Automated codemod to update all imports
2. **CSS Module Conflicts**: Careful CSS file migration with testing
3. **Route Changes**: Route groups are pathless, no URL changes

## Implementation Strategy

1. **Start with utils → lib rename** (safest change)
2. **Gradual component migration** with automated import fixes
3. **CSS reorganization** after component moves
4. **Route groups** as final optional step
5. **Verify build and functionality** at each step

## Files Preserved (Protected)

### Next.js Essential Files:
- `app/layout.tsx`, `app/page.tsx`
- All `layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx` in routes
- `next.config.ts`, `tsconfig.json`, `tailwind.config.js`
- `package.json`, `.eslintrc.*`

### Working Components:
- `AdvancedTechCarousel.tsx` (used in main page)
- `ProfileHeader.tsx` (likely used in layout)
- `Footer.tsx` (likely used in layout)
- `ThemeProvider.tsx` (likely used in layout)

### Public Assets:
- All SVG icons currently used
- Next.js essential assets (favicon, manifest, etc.)
