import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  Eye, 
  Calendar, 
  ChevronRight, 
  ChevronLeft, 
  ArrowRight, 
  Share2, 
  Bookmark, 
  Sparkles, 
  User, 
  HelpCircle, 
  CheckCircle2, 
  Tag, 
  Flame,
  ArrowUp
} from 'lucide-react';
import { BLOG_ARTICLES, getArticleBySlug, getArticlesByCategory } from '../data/blogArticles';
import { TableOfContents, TocItem } from '../components/TableOfContents';
import { ShareButtons } from '../components/ShareButtons';
import { RelatedArticles } from '../components/RelatedArticles';
import { AdSlot } from '../components/AdSlot';
import { RecentPostsWidget, PopularPostsWidget } from '../components/RecentPostsWidget';
import { UserProgress } from '../types';
import { toggleFavoriteItem, isItemFavorited } from '../lib/storage';
import { soundEngine } from '../lib/sound';

export interface ArticleDetailPageProps {
  userProgress: UserProgress;
  onUpdateProgress: (progress: UserProgress) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  userProgress,
  onUpdateProgress,
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const article = getArticleBySlug(slug || '');

  // Scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Schema.org Article Structured Data injection
  useEffect(() => {
    if (!article) return;

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.summary,
      image: article.featuredImage,
      author: {
        '@type': 'Person',
        name: article.author.name,
        jobTitle: article.author.role,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Color Sort Puzzle 3D',
        logo: {
          '@type': 'ImageObject',
          url: 'https://colorsortpuzzle3d.com/favicon.svg',
        },
      },
      datePublished: article.publishedDate,
      dateModified: article.publishedDate,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://colorsortpuzzle3d.com/blog/${article.slug}`,
      },
      keywords: article.tags.join(', '),
      wordCount: 1000,
    };

    const scriptId = 'article-schema-jsonld';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(schemaData);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-black text-white">Article Not Found</h1>
        <p className="text-sm text-slate-400 mt-2 max-w-md">
          The requested article could not be found or may have moved.
        </p>
        <Link
          to="/blog"
          className="mt-6 px-6 py-3 rounded-2xl bg-cyan-500 text-slate-950 font-black text-xs hover:bg-cyan-400 transition-all shadow-lg"
        >
          Return to Blog Hub
        </Link>
      </div>
    );
  }

  // Related articles (same category or next ones)
  const relatedArticles = getArticlesByCategory(article.category).filter((a) => a.id !== article.id);
  const currentIndex = BLOG_ARTICLES.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? BLOG_ARTICLES[currentIndex - 1] : null;
  const nextArticle = currentIndex < BLOG_ARTICLES.length - 1 ? BLOG_ARTICLES[currentIndex + 1] : null;

  const isFavorited = isItemFavorited(userProgress, `article-${article.id}`);

  const handleToggleFavorite = () => {
    const { updatedProgress } = toggleFavoriteItem(userProgress, {
      id: `article-${article.id}`,
      type: 'article',
      title: article.title,
      category: article.category,
      link: `/blog/${article.slug}`,
    });
    onUpdateProgress(updatedProgress);
  };

  // Extract headings from markdown content for Table of Contents
  const tocItems: TocItem[] = [];
  const lines = article.content.split('\n');
  lines.forEach((line) => {
    if (line.startsWith('## ')) {
      const title = line.replace('## ', '').trim();
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      tocItems.push({ id, title, level: 2 });
    } else if (line.startsWith('### ')) {
      const title = line.replace('### ', '').trim();
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      tocItems.push({ id, title, level: 3 });
    }
  });

  // Render markdown line by line nicely
  const renderContent = (content: string) => {
    const paragraphs = content.split('\n\n');
    return paragraphs.map((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // H2
      if (trimmed.startsWith('## ')) {
        const text = trimmed.replace('## ', '');
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return (
          <h2
            key={idx}
            id={id}
            className="text-xl sm:text-2xl font-black text-white mt-10 mb-4 pb-2 border-b border-slate-800 flex items-center gap-2.5 scroll-mt-24"
          >
            <span className="w-2 h-6 rounded-full bg-cyan-400 inline-block" />
            <span>{text}</span>
          </h2>
        );
      }

      // H3
      if (trimmed.startsWith('### ')) {
        const text = trimmed.replace('### ', '');
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return (
          <h3
            key={idx}
            id={id}
            className="text-lg sm:text-xl font-bold text-cyan-300 mt-6 mb-3 scroll-mt-24"
          >
            {text}
          </h3>
        );
      }

      // Blockquote
      if (trimmed.startsWith('> ')) {
        const quoteText = trimmed.replace(/^> /gm, '');
        return (
          <blockquote
            key={idx}
            className="my-6 p-4 sm:p-5 rounded-2xl bg-cyan-950/40 border-l-4 border-cyan-400 text-slate-200 italic text-sm sm:text-base leading-relaxed"
          >
            {quoteText}
          </blockquote>
        );
      }

      // Bullet List
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const items = trimmed.split('\n').filter((l) => l.startsWith('- ') || l.startsWith('* '));
        return (
          <ul key={idx} className="my-4 space-y-2 text-sm sm:text-base text-slate-300 pl-2">
            {items.map((item, itemIdx) => {
              const text = item.replace(/^[-*] /, '');
              return (
                <li key={itemIdx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
                  <span className="leading-relaxed">{parseInlineMarkdown(text)}</span>
                </li>
              );
            })}
          </ul>
        );
      }

      // Numbered List
      if (/^\d+\.\s/.test(trimmed)) {
        const items = trimmed.split('\n').filter((l) => /^\d+\.\s/.test(l));
        return (
          <ol key={idx} className="my-4 space-y-2.5 text-sm sm:text-base text-slate-300 pl-1">
            {items.map((item, itemIdx) => {
              const text = item.replace(/^\d+\.\s/, '');
              return (
                <li key={itemIdx} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 border border-slate-700">
                    {itemIdx + 1}
                  </span>
                  <span className="leading-relaxed">{parseInlineMarkdown(text)}</span>
                </li>
              );
            })}
          </ol>
        );
      }

      // Standard Paragraph
      return (
        <p key={idx} className="my-4 text-sm sm:text-base text-slate-300 leading-relaxed">
          {parseInlineMarkdown(trimmed)}
        </p>
      );
    });
  };

  // Helper for bold and inline codes
  const parseInlineMarkdown = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono text-xs">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-900 z-50">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Article Header & Hero Section */}
      <header className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 pt-8 pb-12 border-b border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-6 flex-wrap">
            <Link to="/" onClick={() => soundEngine.playSelect()} className="hover:text-cyan-400">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/blog" onClick={() => soundEngine.playSelect()} className="hover:text-cyan-400">
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              to={`/blog/category/${article.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              onClick={() => soundEngine.playSelect()}
              className="hover:text-cyan-400"
            >
              {article.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-cyan-400 font-bold truncate max-w-xs">{article.title}</span>
          </nav>

          {/* Category badge & Reading info */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 text-xs font-black uppercase tracking-wider border border-cyan-500/30">
              {article.category}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              {article.readingTimeMinutes} min read (1,000+ words)
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              {new Date(article.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            {article.title}
          </h1>

          {/* Subtitle / Key Takeaway */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl mb-6">
            {article.subtitle}
          </p>

          {/* Author Card & Share Actions Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 font-black text-sm flex items-center justify-center shadow-lg">
                {article.author.name[0]}
              </div>
              <div>
                <div className="text-sm font-bold text-white">{article.author.name}</div>
                <div className="text-xs text-slate-400">{article.author.role}</div>
              </div>
            </div>

            {/* Share / Save buttons */}
            <ShareButtons
              title={article.title}
              description={article.summary}
              isFavorited={isFavorited}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>
        </div>
      </header>

      {/* Main Layout (Article body + Sticky Sidebar) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Content (8 cols) */}
          <main className="lg:col-span-8 flex flex-col">
            {/* Featured Image */}
            <div className="w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl mb-8">
              <img
                src={article.featuredImage}
                alt={article.title}
                loading="eager"
                className="w-full max-h-[460px] object-cover"
              />
            </div>

            {/* Mobile Table of Contents */}
            <div className="lg:hidden mb-8">
              <TableOfContents items={tocItems} />
            </div>

            {/* Article Content Render */}
            <div className="prose prose-invert max-w-none prose-headings:font-black prose-a:text-cyan-400">
              {renderContent(article.content)}
            </div>

            {/* In-Article AdSense Banner */}
            <AdSlot slotId="article-mid-content" label="Sponsored Educational Content" />

            {/* Interactive FAQ Accordion */}
            {article.faqs && article.faqs.length > 0 && (
              <section className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                  <HelpCircle className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-xl font-black text-white">Frequently Asked Questions</h2>
                </div>

                <div className="divide-y divide-slate-800/80">
                  {article.faqs.map((faqItem, i) => {
                    const isOpen = openFaqIndex === i;
                    return (
                      <div key={i} className="py-3.5 first:pt-1 last:pb-0">
                        <button
                          onClick={() => {
                            soundEngine.playSelect();
                            setOpenFaqIndex(isOpen ? null : i);
                          }}
                          className="w-full text-left flex items-center justify-between gap-3 text-sm font-bold text-white hover:text-cyan-300 transition-colors"
                        >
                          <span>{faqItem.question}</span>
                          <span className={`text-cyan-400 text-lg transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                            +
                          </span>
                        </button>
                        {isOpen && (
                          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed animate-in fade-in duration-200">
                            {faqItem.answer}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Tags Pill Cloud */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-cyan-400" /> Tags:
              </span>
              {article.tags.map((tag, i) => (
                <Link
                  key={i}
                  to={`/search?q=${encodeURIComponent(tag)}`}
                  onClick={() => soundEngine.playSelect()}
                  className="px-3 py-1 rounded-xl bg-slate-900 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-800 text-xs font-medium transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            {/* Author Bio Box */}
            <div className="mt-8 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 font-black text-xl flex items-center justify-center shrink-0 shadow-lg">
                {article.author.name[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-white">{article.author.name}</h3>
                  <span className="px-2 py-0.5 rounded-lg bg-cyan-500/10 text-[10px] font-bold text-cyan-400 border border-cyan-500/20">
                    {article.author.role}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Specialized researcher and logic puzzle architect dedicated to educational game design, spatial reasoning theory, and accessible web experiences.
                </p>
              </div>
            </div>

            {/* Next / Previous Article Navigation */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevArticle ? (
                <Link
                  to={`/blog/${prevArticle.slug}`}
                  onClick={() => soundEngine.playSelect()}
                  className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 text-left flex flex-col justify-between group transition-all"
                >
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 group-hover:text-cyan-400 flex items-center gap-1">
                    <ChevronLeft className="w-3.5 h-3.5" /> Previous Article
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 mt-1 line-clamp-2">
                    {prevArticle.title}
                  </h4>
                </Link>
              ) : <div />}

              {nextArticle ? (
                <Link
                  to={`/blog/${nextArticle.slug}`}
                  onClick={() => soundEngine.playSelect()}
                  className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 text-right flex flex-col justify-between group transition-all"
                >
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 group-hover:text-cyan-400 flex items-center justify-end gap-1">
                    Next Article <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 mt-1 line-clamp-2">
                    {nextArticle.title}
                  </h4>
                </Link>
              ) : <div />}
            </div>

            {/* Related Articles Component */}
            <div className="mt-12">
              <RelatedArticles articles={relatedArticles.length > 0 ? relatedArticles : BLOG_ARTICLES.filter(a => a.id !== article.id)} />
            </div>
          </main>

          {/* Sticky Sidebar (4 cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            {/* Desktop Table of Contents */}
            <div className="hidden lg:block sticky top-24 space-y-6">
              <TableOfContents items={tocItems} />

              {/* Play Game Widget */}
              <div className="p-5 rounded-3xl bg-gradient-to-br from-cyan-950/80 to-slate-900 border border-cyan-500/40 shadow-xl space-y-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Apply This Strategy</span>
                <h3 className="text-base font-black text-white">Ready to Sort Some Water?</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Test the exact techniques discussed in this guide across 500 solvable stages!
                </p>
                <Link
                  to="/play"
                  onClick={() => soundEngine.playSelect()}
                  className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-transform active:scale-95 shadow-md"
                >
                  <span>Play Online Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Popular Posts */}
              <PopularPostsWidget limit={4} />

              {/* Sidebar Ad */}
              <AdSlot slotId="article-sidebar-sticky" format="rectangle" label="Advertisement" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
