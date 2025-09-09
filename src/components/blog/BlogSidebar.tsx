'use client';

import Link from 'next/link';
import { BlogPost, BlogCategory } from '@/types/blog';

interface BlogSidebarProps {
  recentPosts: BlogPost[];
  categories: BlogCategory[];
  currentCategory?: string;
}

export default function BlogSidebar({ recentPosts, categories, currentCategory }: BlogSidebarProps) {
  return (
    <aside className="blog-sidebar" role="complementary" aria-label="Blog sidebar">
      {/* Recent Posts */}
      <section className="sidebar-section" aria-labelledby="recent-posts-heading">
        <h3 id="recent-posts-heading" className="sidebar-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14,2 14,8 20,8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          Pos-pos Terbaru
        </h3>
        <div className="recent-posts">
          {recentPosts.length > 0 ? (
            recentPosts.slice(0, 5).map((post) => (
              <RecentPostItem key={post.id} post={post} />
            ))
          ) : (
            <div className="sidebar-empty">
              <p>Belum ada artikel terbaru</p>
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="sidebar-section" aria-labelledby="categories-heading">
        <h3 id="categories-heading" className="sidebar-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
          Kategori
        </h3>
        <div className="categories-list" role="list">
          <Link
            href="/habits"
            className={`category-link ${!currentCategory ? 'active' : ''}`}
            role="listitem"
          >
            <span className="category-name">Semua Artikel</span>
            <span className="category-count">
              ({categories.reduce((sum, cat) => sum + cat.count, 0)})
            </span>
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/habits?category=${category.slug}`}
              className={`category-link ${currentCategory === category.slug ? 'active' : ''}`}
              role="listitem"
              title={category.description}
            >
              <span className="category-name">{category.name}</span>
              <span className="category-count">({category.count})</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Blog Info */}
      <section className="sidebar-section sidebar-info">
        <h3 className="sidebar-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          Tentang Blog
        </h3>
        <div className="sidebar-info-content">
          <p className="sidebar-info-text">
            Kumpulan artikel teknologi terkini yang dikurasi khusus untuk pengembang. 
            Artikel diperbarui otomatis setiap 10 menit.
          </p>
          <div className="sidebar-stats">
            <div className="stat-item">
              <span className="stat-number">{categories.reduce((sum, cat) => sum + cat.count, 0)}</span>
              <span className="stat-label">Total Artikel</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{categories.length}</span>
              <span className="stat-label">Kategori</span>
            </div>
          </div>
        </div>
      </section>
    </aside>
  );
}

interface RecentPostItemProps {
  post: BlogPost;
}

function RecentPostItem({ post }: RecentPostItemProps) {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) return 'Kemarin';
      if (diffDays <= 7) return `${diffDays} hari lalu`;
      
      return date.toLocaleDateString('id-ID', {
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Tanggal tidak valid';
    }
  };

  return (
    <article className="recent-post-item">
      <Link 
        href={post.source.originalUrl}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="recent-post-link"
        title={post.title}
      >
        <div className="recent-post-content">
          <h4 className="recent-post-title">{post.title}</h4>
          <div className="recent-post-meta">
            <time dateTime={post.publishedAt} className="recent-post-date">
              {formatDate(post.publishedAt)}
            </time>
            <span className="recent-post-category">{post.category}</span>
          </div>
        </div>
        <div className="recent-post-arrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </Link>
    </article>
  );
}
