export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  articleCount?: number;
  color: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  categorySlug: string;
  tags: string[];
  readingTimeMinutes: number;
  publishedDate: string;
  updatedDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  featuredImage: string;
  summary: string;
  views: number;
  likes: number;
  isPopular?: boolean;
  isFeatured?: boolean;
  toc: { id: string; title: string; level: number }[];
  content: string; // Rich markdown-like structured text
  faqs?: { question: string; answer: string }[];
  relatedSlugs: string[];
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    id: 'color-sort-puzzle',
    name: 'Color Sort Puzzle',
    slug: 'color-sort-puzzle',
    description: 'Masterclass guides, mechanics analysis, bottleneck recovery, and advanced sorting algorithms.',
    iconName: 'Sparkles',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'brain-games',
    name: 'Brain Games',
    slug: 'brain-games',
    description: 'Scientific explorations of neuroplasticity, cognitive enhancement, and mental wellness through play.',
    iconName: 'Brain',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    id: 'puzzle-games',
    name: 'Puzzle Games',
    slug: 'puzzle-games',
    description: 'Deep dives into puzzle history, spatial reasoning puzzles, mechanics, and design philosophies.',
    iconName: 'Gamepad2',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'logic-games',
    name: 'Logic Games',
    slug: 'logic-games',
    description: 'Deductive reasoning, graph theory, decision trees, and systematic problem solving.',
    iconName: 'Cpu',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'iq-improvement',
    name: 'IQ Improvement',
    slug: 'iq-improvement',
    description: 'Practical routines and cognitive drills to sharpen fluid intelligence and pattern recognition.',
    iconName: 'Zap',
    color: 'from-rose-500 to-pink-600',
  },
  {
    id: 'memory-training',
    name: 'Memory Training',
    slug: 'memory-training',
    description: 'Techniques for expanding working memory capacity, visual recall, and multi-step foresight.',
    iconName: 'Layers',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'focus-improvement',
    name: 'Focus Improvement',
    slug: 'focus-improvement',
    description: 'Mindful gaming practices to overcome digital distractions and cultivate unbroken concentration.',
    iconName: 'Compass',
    color: 'from-violet-500 to-purple-600',
  },
  {
    id: 'relaxing-games',
    name: 'Relaxing Games',
    slug: 'relaxing-games',
    description: 'The psychology of flow states, stress relief through ASMR visuals, and mindful pacing.',
    iconName: 'Heart',
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: 'mobile-puzzle-games',
    name: 'Mobile Puzzle Games',
    slug: 'mobile-puzzle-games',
    description: 'Mobile game design trends, UI ergonomics, touchscreen mechanics, and pocket puzzle history.',
    iconName: 'Smartphone',
    color: 'from-teal-500 to-emerald-600',
  },
  {
    id: 'free-online-games',
    name: 'Free Online Games',
    slug: 'free-online-games',
    description: 'The web gaming revolution, browser physics engines, instant play, and accessible indie gaming.',
    iconName: 'Globe',
    color: 'from-yellow-500 to-amber-600',
  },
];
