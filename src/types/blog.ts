export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  source: {
    name: string;
    url: string;
    originalUrl: string;
  };
  thumbnail?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  readingTime: number;
  slug: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  count: number;
  description?: string;
}

export interface RSSFeedItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  category?: string;
  guid?: string;
  'media:content'?: Array<{ $: { url: string; type?: string } }>;
  enclosure?: { $: { url: string; type?: string } };
  'content:encoded'?: string;
  author?: string;
}

export interface BlogSidebarProps {
  recentPosts: BlogPost[];
  categories: BlogCategory[];
}

export interface BlogListProps {
  posts: BlogPost[];
  categories: BlogCategory[];
  currentCategory?: string;
}

export interface BlogPostNavigation {
  previous?: {
    title: string;
    slug: string;
    url: string;
  };
  next?: {
    title: string;
    slug: string;
    url: string;
  };
}

export interface BlogMetadata {
  title: string;
  description: string;
  canonical: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
    type: string;
    image?: string;
  };
  jsonLD: Record<string, unknown>;
}
