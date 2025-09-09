# Learning Hub - Blog & Journaling Feature

## 📋 Overview

Fitur Learning Hub menggabungkan agregasi blog teknologi otomatis dengan sistem journaling personal. Halaman ini menampilkan artikel terkini dari berbagai RSS feeds teknologi dan memungkinkan pengguna untuk mendokumentasikan perjalanan belajar mereka.

## ✨ Fitur Utama

### 🔗 Blog Agregation
- **Auto-update RSS/Atom feeds** dari sumber terpercaya seperti Dev.to
- **ISR (Incremental Static Regeneration)** dengan revalidasi setiap 10 menit
- **Normalisasi data** dari berbagai format RSS/Atom
- **De-duplication** untuk mencegah artikel duplikat
- **Thumbnail extraction** dari media:content dan enclosure
- **Reading time estimation** berdasarkan jumlah kata

### 🎨 UI/UX
- **Tab navigation** antara Blog dan Journaling
- **Responsive design** dengan grid layout yang adaptif
- **Sidebar** dengan pos terbaru dan daftar kategori
- **Loading states** dengan skeleton placeholders
- **Error boundary** dengan recovery options
- **Scroll to top** button dengan smooth animation
- **Dark/Light mode** support dengan CSS custom properties

### 📊 SEO & Performance
- **JSON-LD structured data** untuk ItemList dan NewsArticle
- **Meta tags** lengkap (Open Graph, Twitter Cards)
- **Canonical URLs** dan robots meta
- **Sitemap generation** otomatis
- **Preconnect** untuk external RSS domains
- **Next.js Image optimization** dengan lazy loading
- **Critical CSS** untuk LCP < 2.0s target

### ♿ Accessibility
- **Semantic HTML** dengan proper landmarks (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`)
- **Skip-to-content** navigation
- **Alt text** untuk semua gambar
- **ARIA labels** untuk interaktif elements
- **Focus management** dan keyboard navigation
- **Screen reader** friendly content structure

### 🔒 Security & Compliance
- **External link safety** dengan `rel="nofollow noopener noreferrer"`
- **Content sanitization** untuk menghindari XSS
- **Rate limiting** pada RSS fetch requests
- **Error handling** yang aman tanpa expose sensitive data
- **CSP headers** untuk additional security

## 🏗 Arsitektur Teknis

### 📁 Struktur File
```
src/
├── app/
│   ├── habits/
│   │   ├── layout.tsx          # Metadata dan layout
│   │   └── page.tsx            # Main page component
│   └── api/
│       └── blog/
│           └── route.ts        # RSS aggregation API
├── components/
│   └── blog/
│       ├── BlogList.tsx        # Blog posts list
│       ├── BlogSidebar.tsx     # Sidebar dengan recent & categories
│       ├── ScrollToTop.tsx     # Scroll to top button
│       ├── BlogFooter.tsx      # Footer dengan credits
│       └── BlogErrorBoundary.tsx # Error handling
├── types/
│   └── blog.ts                 # TypeScript interfaces
├── utils/
│   ├── rssParser.ts           # RSS parsing & normalization
│   └── jsonLD.ts              # SEO structured data
└── styles/
    └── blog.css               # Blog-specific styles
```

### 🔄 Data Flow
1. **RSS Fetching**: API route mengambil data dari multiple RSS feeds
2. **Normalization**: Data dinormalisasi ke format BlogPost interface
3. **De-duplication**: Mencegah artikel duplikat berdasarkan title/URL
4. **Caching**: ISR caching selama 10 menit dengan stale-while-revalidate
5. **Client Rendering**: React component merender data dengan loading states
6. **Error Handling**: Graceful degradation jika RSS feeds tidak tersedia

### 📡 RSS Feeds Sources
- Dev.to JavaScript: `https://dev.to/feed/tag/javascript`
- Dev.to React: `https://dev.to/feed/tag/react`
- Dev.to TypeScript: `https://dev.to/feed/tag/typescript`
- Dev.to Next.js: `https://dev.to/feed/tag/nextjs`
- Dev.to Web Development: `https://dev.to/feed/tag/webdev`

## 🚀 Performance Optimizations

### ⚡ Loading Performance
- **Priority loading** untuk artikel pertama (eager loading)
- **Lazy loading** untuk artikel berikutnya
- **Image optimization** dengan Next.js Image component
- **Preconnect** ke RSS domains untuk DNS optimization
- **Bundle splitting** untuk code yang tidak critical

### 💾 Caching Strategy
- **ISR**: 10 menit revalidation pada API level
- **Browser caching**: Cache-Control headers pada API responses
- **CDN caching**: Optimal untuk static assets
- **Memory caching**: Client-side state management

### 📱 Mobile Performance
- **Responsive images** dengan srcset generation
- **Touch-friendly** UI elements
- **Reduced motion** support untuk accessibility
- **Offline-first** approach dengan service worker ready

## 🎨 Styling & Theming

### 🌙 Theme Support
CSS menggunakan custom properties untuk theming:
```css
:root {
  --bg: #FAF7F2;
  --surface: #FFFFFF;
  --text: #0B0F19;
  --muted: #64748B;
  --brand: #39363683;
}

.dark {
  --bg: #0B0F19;
  --surface: #1E293B;
  --text: #F1F5F9;
  --muted: #94A3B8;
  --brand: #3B82F6;
}
```

### 🎨 Design System
- **Typography**: Cormorant Garamond untuk headings, system fonts untuk body
- **Color palette**: Blue/Purple gradients dengan neutral grays
- **Spacing**: 8px grid system
- **Border radius**: Consistent 12-24px untuk modern look
- **Shadows**: Layered shadows dengan backdrop blur

## 📊 Monitoring & Analytics

### 🔍 Error Tracking
- **Error boundary** untuk React errors
- **API error handling** dengan fallback responses
- **Network error** detection dan retry mechanisms
- **Performance monitoring** dengan Web Vitals

### 📈 SEO Metrics
- **Core Web Vitals**: Target LCP < 2.0s, FID < 100ms, CLS < 0.1
- **Lighthouse score**: Target 95+ untuk Performance, Accessibility, SEO
- **Search visibility**: Proper meta tags dan structured data

## 🔧 Configuration

### 🌐 Environment Variables
```bash
NEXT_PUBLIC_SITE_URL=https://rarizqullah.vercel.app
```

### ⚙️ RSS Feed Configuration
Edit `src/utils/rssParser.ts` untuk menambah/mengubah RSS feeds:
```typescript
const RSS_FEEDS = [
  {
    url: 'https://example.com/feed.xml',
    name: 'Example Blog',
    category: 'Example',
    description: 'Example description'
  }
];
```

## 🚦 Development Workflow

### 🧪 Testing
```bash
# Run development server
bun run dev

# Test RSS API
curl http://localhost:3000/api/blog

# Test specific category
curl "http://localhost:3000/api/blog?category=javascript"
```

### 📦 Build & Deploy
```bash
# Build for production
bun run build

# Preview production build
bun run preview
```

## 🐛 Troubleshooting

### ❗ Common Issues

1. **RSS Feed Timeout**
   - Check network connectivity
   - Verify RSS feed URLs are accessible
   - Monitor API response times

2. **CORS Errors**
   - RSS feeds are fetched server-side, so no CORS issues
   - If using client-side fetch, consider proxy

3. **Performance Issues**
   - Check image optimization settings
   - Monitor bundle size
   - Verify ISR caching is working

4. **SEO Issues**
   - Validate JSON-LD with Google's Rich Results Test
   - Check meta tags with social media debuggers
   - Monitor search console for errors

## 📚 References

- [Next.js ISR Documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
- [RSS/Atom Feed Specification](https://www.rssboard.org/rss-specification)
- [Web Content Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Schema.org Documentation](https://schema.org/)
- [Core Web Vitals](https://web.dev/vitals/)
