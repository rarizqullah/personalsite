import { XMLParser } from 'fast-xml-parser';
import { BlogPost, RSSFeedItem } from '@/types/blog';

const RSS_FEEDS = [
  {
    url: 'https://dev.to/feed/tag/javascript',
    name: 'Dev.to JavaScript',
    category: 'JavaScript',
    description: 'Latest JavaScript articles from Dev.to'
  },
  {
    url: 'https://dev.to/feed/tag/react',
    name: 'Dev.to React',
    category: 'React',
    description: 'Latest React articles from Dev.to'
  },
  {
    url: 'https://dev.to/feed/tag/typescript',
    name: 'Dev.to TypeScript',
    category: 'TypeScript',
    description: 'Latest TypeScript articles from Dev.to'
  },
  {
    url: 'https://dev.to/feed/tag/nextjs',
    name: 'Dev.to Next.js',
    category: 'Next.js',
    description: 'Latest Next.js articles from Dev.to'
  },
  {
    url: 'https://dev.to/feed/tag/webdev',
    name: 'Dev.to Web Development',
    category: 'Web Development',
    description: 'Latest Web Development articles from Dev.to'
  }
];

export async function fetchRSSFeeds(): Promise<BlogPost[]> {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
    parseAttributeValue: false,
    parseTagValue: true,
    trimValues: true
  });

  const allPosts: BlogPost[] = [];
  
  for (const feed of RSS_FEEDS) {
    try {
      const response = await fetch(feed.url, {
        next: { revalidate: 600 }, // 10 minutes ISR
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; BlogAggregator/1.0)'
        }
      });
      
      if (!response.ok) {
        console.warn(`Failed to fetch ${feed.name}: ${response.status}`);
        continue;
      }
      
      const xmlData = await response.text();
      const parsedData = parser.parse(xmlData);
      
      const items = parsedData?.rss?.channel?.item || parsedData?.feed?.entry || [];
      const posts = Array.isArray(items) ? items : [items];
      
      for (const item of posts) {
        try {
          const post = normalizeRSSItem(item, feed);
          if (post && !isDuplicate(post, allPosts)) {
            allPosts.push(post);
          }
        } catch (error) {
          console.error(`Error processing item from ${feed.name}:`, error);
        }
      }
    } catch (error) {
      console.error(`Error fetching ${feed.name}:`, error);
    }
  }
  
  return allPosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 50); // Limit to 50 posts
}

function normalizeRSSItem(item: RSSFeedItem, feed: typeof RSS_FEEDS[0]): BlogPost | null {
  if (!item.title || !item.link) return null;
  
  try {
    const publishedAt = item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString();
    const title = cleanText(item.title);
    const description = item.description || item['content:encoded'] || '';
    const excerpt = cleanText(description).substring(0, 300) + '...';
    
    // Extract thumbnail
    let thumbnail;
    const mediaContent = item['media:content']?.[0]?.$?.url;
    const enclosureUrl = item.enclosure?.$?.url;
    
    if (mediaContent || enclosureUrl) {
      const imageUrl = mediaContent || enclosureUrl;
      if (imageUrl && (imageUrl.includes('.jpg') || imageUrl.includes('.png') || imageUrl.includes('.jpeg') || imageUrl.includes('.webp'))) {
        thumbnail = {
          url: imageUrl,
          alt: title,
        };
      }
    }
    
    return {
      id: item.guid || generateId(item.link),
      title,
      excerpt,
      publishedAt,
      category: feed.category,
      tags: [feed.category.toLowerCase().replace(/\s+/g, '-')],
      source: {
        name: feed.name,
        url: feed.url,
        originalUrl: item.link
      },
      thumbnail,
      readingTime: calculateReadingTime(excerpt),
      slug: generateSlug(title)
    };
  } catch (error) {
    console.error('Error normalizing RSS item:', error);
    return null;
  }
}

function cleanText(text: string): string {
  if (!text) return '';
  
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&[#\w]+;/g, ' ') // Remove HTML entities
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

function generateId(url: string): string {
  try {
    return Buffer.from(url).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, 16);
  } catch {
    return Math.random().toString(36).substring(2, 18);
  }
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 100);
}

function calculateReadingTime(text: string): number {
  if (!text) return 1;
  
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).filter(word => word.length > 0).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

function isDuplicate(post: BlogPost, existingPosts: BlogPost[]): boolean {
  return existingPosts.some(existing => 
    existing.title.toLowerCase() === post.title.toLowerCase() || 
    existing.source.originalUrl === post.source.originalUrl ||
    existing.id === post.id
  );
}

export function getBlogCategories(posts: BlogPost[]) {
  const categoryMap = new Map<string, { count: number; description: string }>();
  
  posts.forEach(post => {
    const existing = categoryMap.get(post.category);
    categoryMap.set(post.category, {
      count: (existing?.count || 0) + 1,
      description: existing?.description || `Artikel tentang ${post.category}`
    });
  });

  return Array.from(categoryMap.entries()).map(([name, data]) => ({
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    count: data.count,
    description: data.description
  }));
}

export function filterPostsByCategory(posts: BlogPost[], categorySlug?: string) {
  if (!categorySlug) return posts;
  
  return posts.filter(post => 
    post.category.toLowerCase().replace(/\s+/g, '-') === categorySlug
  );
}

export function generateBlogPostNavigation(posts: BlogPost[], currentPostId: string) {
  const currentIndex = posts.findIndex(post => post.id === currentPostId);
  
  if (currentIndex === -1) return {};
  
  const previous = currentIndex > 0 ? posts[currentIndex - 1] : undefined;
  const next = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : undefined;
  
  return {
    previous: previous ? {
      title: previous.title,
      slug: previous.slug,
      url: previous.source.originalUrl
    } : undefined,
    next: next ? {
      title: next.title,
      slug: next.slug,
      url: next.source.originalUrl
    } : undefined
  };
}
