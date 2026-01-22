const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const POSTS_DIR = path.join(__dirname, '../../posts');
const OUTPUT_FILE = path.join(__dirname, '../src/posts.generated.ts');

function generatePosts() {
  // Check if posts directory exists
  if (!fs.existsSync(POSTS_DIR)) {
    console.log('No posts directory found, creating empty posts file');
    writePostsFile([]);
    return;
  }

  // Read all markdown files
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));

  const posts = files.map(filename => {
    const filePath = path.join(POSTS_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
      slug: filename.replace('.md', ''),
      title: data.title || 'Untitled',
      date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
      author: data.author || '',
      tags: data.tags || [],
      summary: data.summary || '',
      draft: data.draft || false,
      content: marked(content),
    };
  });

  // Sort by date descending (newest first), filter out drafts in production
  const sortedPosts = posts
    .filter(p => !p.draft || process.env.NODE_ENV !== 'production')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  writePostsFile(sortedPosts);
  console.log(`Generated ${sortedPosts.length} posts`);
}

function writePostsFile(posts) {
  const content = `// This file is auto-generated. Do not edit manually.
// Run "npm run generate-posts" to regenerate.

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
  summary: string;
  draft: boolean;
  content: string;
}

export const posts: BlogPost[] = ${JSON.stringify(posts, null, 2)};
`;

  fs.writeFileSync(OUTPUT_FILE, content);
}

generatePosts();
