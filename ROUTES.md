# Routes Documentation

## Current Route Structure

### Public Routes
- `/` - Home page (`src/app/page.tsx`)
- `/habits` - Habits tracker (`src/app/habits/page.tsx`)
- `/demo` - Demo page (`src/app/demo/page.tsx`)
- `/privacy` - Privacy policy (`src/app/privacy/page.tsx`)
- `/terms` - Terms of service (`src/app/terms/page.tsx`)
- `/cookie-test` - Cookie testing (`src/app/cookie-test/page.tsx`)
- `/test-images` - Image testing (`src/app/test-images/page.tsx`)

### API Routes
- `/api/blog` - Blog API handler (`src/app/api/blog/route.ts`)

### Special Files
- `src/app/layout.tsx` - Root layout
- `src/app/globals.css` - Global styles
- `src/app/favicon.ico` - Favicon
- `src/app/robots.ts` - Robots.txt generator
- `src/app/sitemap.ts` - Sitemap generator

## Route-specific Layouts
- `src/app/habits/layout.tsx` - Habits section layout

## Protected Files (Do Not Move)

### Next.js App Router Files
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/*/page.tsx`
- `src/app/*/layout.tsx`
- `src/app/*/loading.tsx` (if exists)
- `src/app/*/error.tsx` (if exists)
- `src/app/*/not-found.tsx` (if exists)
- `src/app/*/template.tsx` (if exists)

### API Routes
- `src/app/api/**/*` (all API handlers)

### Metadata Files
- `src/app/favicon.ico`
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- Any `src/app/**/opengraph-image.*`
- Any `src/app/**/twitter-image.*`
- Any `src/app/**/icon.*`
- Any `src/app/**/apple-icon.*`

## Post-Migration Verification Checklist

### Routes to Test
- [ ] Home page loads correctly
- [ ] Habits page renders and functions
- [ ] Demo page works
- [ ] Privacy page displays
- [ ] Terms page displays
- [ ] Cookie test page functions
- [ ] Test images page works
- [ ] API blog endpoint responds

### Navigation to Verify
- [ ] Internal links work
- [ ] Theme toggle functions
- [ ] Mobile navigation (if exists)
- [ ] Footer links work

### Assets to Verify
- [ ] All SVG icons load
- [ ] Favicon displays
- [ ] Images render correctly
- [ ] CSS styles apply correctly

### Functionality to Test
- [ ] Theme switching works
- [ ] Cookie functionality (if used)
- [ ] Any interactive components
- [ ] Form submissions (if any)
- [ ] API calls work

## Notes
- All routes maintain the same URL structure after reorganization
- Route groups are pathless and don't affect URLs
- Only internal file organization changes, not public URLs
