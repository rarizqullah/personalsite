import { NextResponse } from 'next/server';
import { fetchRSSFeeds, getBlogCategories, filterPostsByCategory } from '@/utils/rssParser';

export const revalidate = 600; // 10 minutes

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');
    
    const allPosts = await fetchRSSFeeds();
    const categories = getBlogCategories(allPosts);
    
    let posts = category ? filterPostsByCategory(allPosts, category) : allPosts;
    
    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (!isNaN(limitNum) && limitNum > 0) {
        posts = posts.slice(0, limitNum);
      }
    }
    
    return NextResponse.json({
      posts,
      categories,
      total: posts.length,
      lastUpdated: new Date().toISOString(),
      meta: {
        totalPosts: allPosts.length,
        totalCategories: categories.length,
        currentCategory: category || null
      }
    }, {
      headers: {
        'Cache-Control': 's-maxage=600, stale-while-revalidate=300',
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error in blog API:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch blog posts',
        message: error instanceof Error ? error.message : 'Unknown error',
        posts: [],
        categories: [],
        total: 0,
        lastUpdated: new Date().toISOString()
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
