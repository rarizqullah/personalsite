# Personal Website - Performance-First Hero Page

## 📋 Overview

A high-performance personal website built with Next.js (App Router) featuring a single hero section. This project follows strict performance requirements as outlined in the PRD to achieve exceptional Core Web Vitals scores.

## 🎯 Key Features

- **Static Generation (SSG)**: Entire site is pre-rendered for optimal performance
- **Performance-First**: Built to achieve Lighthouse Performance score ≥95
- **Responsive Design**: Mobile-first approach (320px to 1440px+)
- **Smooth Animations**: Framer Motion with reduced-motion support
- **Accessibility**: Semantic HTML, proper contrast ratios, keyboard navigation
- **SEO Optimized**: Proper meta tags and Open Graph support

## 📊 Performance Targets

- **LCP**: ≤ 1.5s (Mobile 4G, CPU Throttle x4)
- **CLS**: ≤ 0.01
- **INP**: ≤ 200ms
- **First Contentful Paint**: ≤ 1.2s
- **JavaScript Bundle**: ≤ 60kB gzipped
- **Total Transfer**: ≤ 200kB gzipped

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Animations**: Framer Motion
- **Styling**: CSS Modules (vanilla CSS)
- **Fonts**: Cormorant via Google Fonts
- **Deployment**: Optimized for Vercel

## 📁 Project Structure

```
src/
  app/
    components/
      HeroWrapper.tsx      # Client wrapper for progressive enhancement
      HeroMotionClient.tsx # Animation client component
    layout.tsx             # Root layout with font loading
    page.tsx              # Main hero page (Server Component)
    globals.css           # Minimal global styles
```

## ⚡ Performance Architecture

- **Server Components**: Layout and page render statically
- **Client Components**: Only animation logic runs on client
- **Progressive Enhancement**: Content loads first, animations enhance later
- **Dynamic Imports**: Animation code loaded separately with `ssr: false`
- **Font Optimization**: Google Fonts with preconnect and display=swap

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Start production server:**
   ```bash
   npm start
   ```

## 📝 Content

- **Name**: Riza Rizqullah
- **Role**: Frontend / Full-stack Developer
- **Description**: Focused on modern web application development with cutting-edge technologies
- **Tech Stack**: Next.js, TypeScript, React, Node.js, PostgreSQL, MongoDB, TailwindCSS, Framer Motion, Vercel, Git, Docker, AWS

## ✅ Acceptance Criteria

- [x] Static rendering (`export const dynamic = 'force-static'`)
- [x] Google Fonts loaded with exact specified link tags
- [x] Semantic HTML structure (h1, p, ul/li)
- [x] Animations respect `prefers-reduced-motion`
- [x] Lighthouse Performance ≥95 target
- [x] Client JS bundle ≤60kB gzipped
- [x] No dependencies beyond Next.js/React/Framer Motion

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px+

## 🎨 Design Principles

- **Single-screen focus**: All content visible within 1-1.5 viewports
- **Clean typography**: Cormorant font with proper fallbacks
- **Minimal animations**: Subtle fade-in and slide effects
- **No distractions**: Focus purely on content presentation

## 🔧 Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📈 Monitoring

The site is optimized for monitoring with Web Vitals. Performance metrics can be tracked through:
- Chrome DevTools
- Lighthouse CI
- Vercel Analytics (if deployed)

## 🌐 Deployment

Optimized for Vercel deployment with automatic static optimization and edge caching.

---

Built with ❤️ focusing on performance, accessibility, and user experience.
