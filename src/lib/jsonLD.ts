import { BlogPost } from '@/types/blog';

export function generateBlogListJsonLD(posts: BlogPost[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Learning Hub - Artikel Teknologi Terkini',
    description: 'Kumpulan artikel teknologi terkini yang dikurasi khusus untuk pengembang',
    url: '/habits',
    numberOfItems: posts.length,
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'NewsArticle',
        '@id': post.source.originalUrl,
        headline: post.title,
        description: post.excerpt,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        author: {
          '@type': 'Organization',
          name: post.source.name
        },
        publisher: {
          '@type': 'Organization',
          name: post.source.name
        },
        url: post.source.originalUrl,
        articleSection: post.category,
        keywords: post.tags.join(', '),
        ...(post.thumbnail && {
          image: {
            '@type': 'ImageObject',
            url: post.thumbnail.url,
            caption: post.thumbnail.alt
          }
        }),
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': post.source.originalUrl
        }
      }
    }))
  };
}

export function generateWebsiteJsonLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Website',
    name: 'Rafi Rizqullah - Personal Site',
    description: 'Personal website featuring technology blog aggregation and learning journal',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://rarizqullah.vercel.app',
    author: {
      '@type': 'Person',
      name: 'Rafi Rizqullah',
      url: 'https://github.com/rarizqullah'
    },
    publisher: {
      '@type': 'Person',
      name: 'Rafi Rizqullah'
    },
    inLanguage: 'id-ID',
    copyrightYear: new Date().getFullYear(),
    genre: ['Technology', 'Web Development', 'Programming'],
    keywords: 'blog teknologi, web development, javascript, react, nextjs, programming'
  };
}

export function generateBreadcrumbJsonLD(items: Array<{name: string; url: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function generatePersonJsonLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Rafi Rizqullah',
    givenName: 'Rafi',
    familyName: 'Rizqullah',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://rarizqullah.vercel.app',
    sameAs: [
      'https://github.com/rarizqullah',
      'https://linkedin.com/in/rarizqullah'
    ],
    jobTitle: 'Software Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance'
    },
    knowsAbout: [
      'Web Development',
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'Software Engineering'
    ],
    alumniOf: {
      '@type': 'Organization',
      name: 'University'
    }
  };
}
