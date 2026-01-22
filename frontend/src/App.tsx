import React from 'react';
import './App.css';
import { posts } from './posts.generated';

function App() {
  return (
    <div className="blog">
      <header className="blog-header">
        <h1>This Is A Stupid Space</h1>
        <p className="blog-tagline">A blog for stupid thoughts</p>
      </header>

      <main className="blog-content">
        {posts.map(post => (
          <article key={post.slug} className="blog-post">
            <h2 className="post-title">{post.title}</h2>
            <time className="post-date">{post.date}</time>
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        ))}
      </main>

      <footer className="blog-footer">
        <p>&copy; 2026 This Is A Stupid Space</p>
      </footer>
    </div>
  );
}

export default App;
