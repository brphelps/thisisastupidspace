import React, { useState, useEffect } from 'react';
import './App.css';
import { posts } from './posts.generated';

function App() {
  const [accessibleMode, setAccessibleMode] = useState(() => {
    const saved = localStorage.getItem('accessible-mode');
    return saved === 'true';
  });

  const [selectedSlug, setSelectedSlug] = useState<string>(() => {
    // Check URL hash first, otherwise default to latest post
    if (window.location.hash) {
      const slug = window.location.hash.slice(1);
      if (posts.some(p => p.slug === slug)) {
        return slug;
      }
    }
    return posts[0]?.slug || '';
  });

  useEffect(() => {
    localStorage.setItem('accessible-mode', String(accessibleMode));
  }, [accessibleMode]);

  useEffect(() => {
    // Handle browser back/forward navigation
    const handleHashChange = () => {
      const slug = window.location.hash.slice(1);
      if (slug && posts.some(p => p.slug === slug)) {
        setSelectedSlug(slug);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const selectPost = (slug: string) => {
    setSelectedSlug(slug);
    window.history.pushState(null, '', `#${slug}`);
  };

  const selectedPost = posts.find(p => p.slug === selectedSlug) || posts[0];

  return (
    <div className={`blog ${accessibleMode ? 'accessible' : ''}`}>
      <button
        className="theme-toggle"
        onClick={() => setAccessibleMode(!accessibleMode)}
        aria-label={accessibleMode ? 'Switch to chillwave theme' : 'Switch to accessible theme'}
      >
        {accessibleMode ? 'Chillwave' : 'Accessible'}
      </button>
      <header className="blog-header">
        <h1>This Is A Stupid Space</h1>
        <p className="blog-tagline">A blog for stupid thoughts</p>
      </header>

      <div className="blog-layout">
        <aside className="blog-sidebar">
          <nav>
            <h2 className="sidebar-title">Posts</h2>
            <ul className="post-list">
              {posts.map(post => (
                <li key={post.slug}>
                  <button
                    className={`post-link ${post.slug === selectedSlug ? 'active' : ''}`}
                    onClick={() => selectPost(post.slug)}
                  >
                    <span className="post-link-title">{post.title}</span>
                    <span className="post-link-date">{post.date}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="blog-content">
          {selectedPost && (
            <article id={selectedPost.slug} className="blog-post">
              <h2 className="post-title">{selectedPost.title}</h2>
              <time className="post-date">{selectedPost.date}</time>
              <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />
            </article>
          )}
        </main>
      </div>

      <footer className="blog-footer">
        <p>&copy; 2026 This Is A Stupid Space</p>
      </footer>
    </div>
  );
}

export default App;
