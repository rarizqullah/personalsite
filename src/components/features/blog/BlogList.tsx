'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';

interface BlogListProps {
  posts: BlogPost[];
  loading?: boolean;
}

export default function BlogList({ posts, loading = false }: BlogListProps) {
  if (loading) {
    return <BlogListSkeleton />;
  }

  if (posts.length === 0) {
    return (
      <div className="blog-empty">
        <div className="blog-empty-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14,2 14,8 20,8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10,9 9,9 8,9" />
          </svg>
        </div>
        <h3 className="blog-empty-title">Belum Ada Artikel</h3>
        <p className="blog-empty-description">
          Artikel sedang dimuat atau belum tersedia. Silakan coba lagi nanti.
        </p>
      </div>
    );
  }

  return (
    <div className="blog-list">
      {posts.map((post, index) => (
        <BlogCard key={post.id} post={post} priority={index < 3} />
      ))}
    </div>
  );
}

interface BlogCardProps {
  post: BlogPost;
  priority?: boolean;
}

function BlogCard({ post, priority = false }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Tanggal tidak valid';
    }
  };

  return (
    <article className="blog-card" itemScope itemType="https://schema.org/NewsArticle">
      <div className="blog-card-content">
        {post.thumbnail && (
          <div className="blog-card-thumbnail">
            <Image
              src={post.thumbnail.url}
              alt={post.thumbnail.alt}
              width={300}
              height={200}
              className="blog-thumbnail-image"
              loading={priority ? 'eager' : 'lazy'}
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 300px, 300px"
            />
          </div>
        )}
        
        <div className="blog-card-body">
          <div className="blog-card-meta">
            <span className="blog-category" itemProp="articleSection">
              {post.category}
            </span>
            <time 
              dateTime={post.publishedAt} 
              className="blog-date"
              itemProp="datePublished"
            >
              {formatDate(post.publishedAt)}
            </time>
          </div>
          
          <h2 className="blog-card-title" itemProp="headline">
            <Link 
              href={post.source.originalUrl}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="blog-title-link"
              itemProp="url"
            >
              {post.title}
            </Link>
          </h2>
          
          <p className="blog-card-excerpt" itemProp="description">
            {post.excerpt}
          </p>
          
          <div className="blog-card-footer">
            <div className="blog-source">
              <span className="blog-source-label">Sumber:</span>
              <span className="blog-source-name" itemProp="publisher">
                {post.source.name}
              </span>
            </div>
            <div className="blog-meta-info">
              <span className="blog-reading-time">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12,6 12,12 16,14" />
                </svg>
                {post.readingTime} menit
              </span>
              <Link
                href={post.source.originalUrl}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="blog-read-more"
              >
                Baca Selengkapnya
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function BlogListSkeleton() {
  return (
    <div className="blog-list">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="blog-card blog-card-skeleton">
          <div className="blog-card-content">
            <div className="blog-card-thumbnail">
              <div className="skeleton skeleton-image"></div>
            </div>
            <div className="blog-card-body">
              <div className="blog-card-meta">
                <div className="skeleton skeleton-category"></div>
                <div className="skeleton skeleton-date"></div>
              </div>
              <div className="skeleton skeleton-title"></div>
              <div className="skeleton skeleton-excerpt"></div>
              <div className="skeleton skeleton-excerpt short"></div>
              <div className="blog-card-footer">
                <div className="skeleton skeleton-source"></div>
                <div className="skeleton skeleton-reading-time"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
