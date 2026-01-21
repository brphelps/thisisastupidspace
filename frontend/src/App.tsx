import React from 'react';
import './App.css';

interface BlogPost {
  id: number;
  title: string;
  date: string;
  content: string;
}

const posts: BlogPost[] = [
  {
    id: 1,
    title: "Welcome to This Stupid Space",
    date: "January 21, 2026",
    content: "This is the first post on this stupid blog. Welcome to this stupid space where I write about stupid things. Stay tuned for more stupidity."
  },
  {
    id: 2,
    title: "Why I Started This Blog",
    date: "January 20, 2026",
    content: "Sometimes you just need a space to put your thoughts, even if those thoughts are stupid. This is that space. No pretense, no polish, just raw stupid content."
  },
  {
    id: 3,
    title: "Hello World",
    date: "January 19, 2026",
    content: "Every blog needs a hello world post. This is mine. It's stupid, but it's here."
  }
];

function App() {
  return (
    <div className="blog">
      <header className="blog-header">
        <h1>This Is A Stupid Space</h1>
        <p className="blog-tagline">A blog for stupid thoughts</p>
      </header>

      <main className="blog-content">
        {posts.map(post => (
          <article key={post.id} className="blog-post">
            <h2 className="post-title">{post.title}</h2>
            <time className="post-date">{post.date}</time>
            <p className="post-content">{post.content}</p>
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
