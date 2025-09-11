import { MetadataRoute } from 'next';
import { fetchRSSFeeds } from '@/lib/rssParser';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rarizqullah.vercel.app';
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/habits`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/demo`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    }
  ];

  // Dynamic blog posts - external links don't need to be in sitemap
  // but we can add API endpoint
  try {
    const posts = await fetchRSSFeeds();
    const blogPages = [
      {
        url: `${baseUrl}/api/blog`,
        lastModified: new Date(),
        changeFrequency: 'hourly' as const,
        priority: 0.7,
      }
    ];

    // Add category pages if needed
    const categories = [...new Set(posts.map(post => post.category))];
    const categoryPages = categories.map(category => ({
      url: `${baseUrl}/habits?category=${category.toLowerCase().replace(/\s+/g, '-')}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.6,
    }));

    return [...staticPages, ...blogPages, ...categoryPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}
