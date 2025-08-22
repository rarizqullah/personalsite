# Personal Website Documentation

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx                 # Root layout with theme support
│   ├── page.tsx                   # Home page
│   ├── habits/
│   │   └── page.tsx              # Art & Journaling page
│   ├── journal/
│   │   └── page.tsx              # Journal entries page
│   └── learn/
│       └── page.tsx              # Learning resources page
├── components/                    # All reusable components
│   ├── EdgePills.tsx             # Smart scroll navigation
│   ├── Sentinel.tsx              # IntersectionObserver wrapper
│   ├── HeroWrapper.tsx           # Hero section wrapper
│   ├── PageHeader.tsx            # Page header component
│   ├── Card.tsx                  # Generic content cards
│   ├── Timeline.tsx              # Journal timeline
│   ├── Footer.tsx                # Site footer
│   ├── ThemeProvider.tsx         # Dark/light theme
│   ├── ThemeToggle.tsx           # Theme switcher
│   ├── TechStackItem.tsx         # Tech stack display
│   ├── ExtensionProtection.tsx   # Browser extension protection
│   └── ExtensionErrorBoundary.tsx # Error boundary for extensions
├── data/
│   ├── habits.ts                 # Art & journal data
│   └── learn.ts                  # Learning resources data
└── utils/
    └── extensionGuard.ts         # Extension protection utilities
```

## 🚀 Key Features

### Smart Navigation
- **EdgePills**: Navigation appears when scrolling 30% down
- **Keyboard support**: ← → arrow keys
- **Accessibility**: Full ARIA labels and screen reader support
- **Responsive**: Adapts to mobile/desktop
- **Contextual**: Shows relevant prev/next pages

### Theme System
- **Dark/Light mode**: Automatic system preference detection
- **Smooth transitions**: CSS custom properties
- **Consistent colors**: CSS variables throughout

### Pages Overview

#### 🏠 Home Page (`/`)
- Hero section with tech stack
- Animated intro with staggered animations
- Navigation to Habits page

#### 🎨 Habits Page (`/habits`)
- **Art Section**: Gallery with medium badges (Ink/Digital/Watercolor/Pencil)
- **Journal Timeline**: Chronological entries with tags
- Navigation: Home ← → Learn

#### 📖 Journal Page (`/journal`)
- Expanded journal entries
- Category filtering
- Reading progress tracking

#### 📚 Learn Page (`/learn`)
- **Reading List**: Books with status (Queued/Reading/Done)
- **Concepts**: Deep-dive topics with time estimates
- **Resources**: Curated links (Articles/Videos/Repos/Tools)
- Navigation: Habits ← → Home

## 🎨 Design System

### Colors & Gradients
- **Home**: Blue/Cyan gradient (🏠)
- **Habits**: Purple/Pink gradient (🎨)
- **Learn**: Emerald/Teal gradient (📚)
- **Journal**: Amber/Orange gradient (📖)

### Components Style
- **Cards**: Glassmorphism with backdrop blur
- **Buttons**: Hover animations with scale effects
- **Typography**: Cormorant font for headings
- **Spacing**: Consistent 4px grid system

## 🛡️ Performance & Security

### Extension Protection
- Browser extension interference detection
- Graceful degradation for animations
- Error boundaries for stability

### Optimization
- **Static generation**: All pages pre-rendered
- **Image optimization**: Next.js Image component
- **Bundle size**: Minimal client-side JavaScript
- **Performance**: Lighthouse score optimized

## 🔧 Development

### Scripts
```bash
npm run dev        # Development server
npm run build      # Production build
npm run start      # Production server
npm run lint       # ESLint check
```

### Data Management
- Static JSON data in `/data` folder
- TypeScript interfaces for type safety
- Easy to replace with API calls later

### Adding New Pages
1. Create page in `src/app/[page-name]/page.tsx`
2. Add navigation config in `EdgePills.tsx`
3. Update `Sentinel.tsx` context types
4. Add gradient theme in CSS

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md/lg)
- **Desktop**: > 1024px (xl)

### Mobile Optimizations
- Touch-friendly navigation
- Compact layouts
- Safe area insets
- Reduced animations (respects `prefers-reduced-motion`)

## 🌟 Best Practices

### Code Organization
- **Components**: Single responsibility, reusable
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind CSS with custom properties
- **Performance**: Lazy loading and code splitting

### Accessibility
- **WCAG AA**: Compliant color contrast
- **Keyboard navigation**: Full support
- **Screen readers**: ARIA labels and semantic HTML
- **Focus management**: Visible focus indicators

### SEO
- **Metadata**: Dynamic page titles and descriptions
- **Structured data**: JSON-LD markup
- **Performance**: Core Web Vitals optimized
- **Static generation**: Fast loading

## 🚀 Deployment

This site is optimized for:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- Any static hosting provider

### Build Output
- Static HTML/CSS/JS
- Optimized images and assets
- Service worker ready
- Progressive Web App compatible
