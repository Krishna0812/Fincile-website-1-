import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MarkdownContent from '@/components/MarkdownContent';
import NotFound from './NotFound';
import { SITE_URL, useSeoMeta, breadcrumbSchema, combineSchemas } from '@/lib/seo';
import { formatPostDate, getMarkdownPost, type MarkdownPost } from '@/lib/posts';

function articleSchema(post: MarkdownPost, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'Fincile', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Fincile' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${path}` },
  };
}

function PostView({ post }: { post: MarkdownPost }) {
  const path = `/blog/${post.slug}`;
  useSeoMeta({
    title: post.seoTitle,
    description: post.description,
    path,
    ogTitle: post.seoTitle,
    ogType: 'article',
    structuredData: combineSchemas(
      articleSchema(post, path),
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: post.title },
      ]),
    ),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <div className="flex items-center gap-2 text-xs text-text-secondary mb-8">
            <Link to="/" className="hover:text-teal transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-teal transition-colors">Blog</Link>
          </div>

          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-navy leading-tight mb-5" style={{ textWrap: 'balance' }}>
              {post.title}
            </h1>
            <div className="text-sm text-text-secondary">
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            </div>
          </div>

          <article>
            <MarkdownContent source={post.body} />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = slug ? getMarkdownPost(slug) : undefined;
  return post ? <PostView post={post} /> : <NotFound />;
}
