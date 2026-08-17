import React, { useEffect, useState } from 'react';
import { List, ChevronRight } from 'lucide-react';
import { soundEngine } from '../lib/sound';

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items, className = '' }) => {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || '');

  useEffect(() => {
    if (typeof window === 'undefined' || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0% -60% 0%', threshold: 0.1 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToHeading = (id: string) => {
    soundEngine.playSelect();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className={`p-5 rounded-3xl bg-slate-900/90 dark:bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col gap-3 ${className}`}
    >
      <div className="flex items-center gap-2 pb-2.5 border-b border-slate-800 text-xs font-black uppercase tracking-wider text-cyan-400">
        <List className="w-4 h-4" />
        <span>Table of Contents</span>
      </div>

      <ul className="flex flex-col gap-1.5 text-xs">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} className={`${item.level > 2 ? 'pl-3' : ''}`}>
              <button
                onClick={() => scrollToHeading(item.id)}
                className={`w-full text-left py-1.5 px-2.5 rounded-xl transition-all flex items-center justify-between group ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 font-bold border-l-2 border-cyan-400'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 font-medium'
                }`}
              >
                <span className="truncate">{item.title}</span>
                <ChevronRight
                  className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                    isActive ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
