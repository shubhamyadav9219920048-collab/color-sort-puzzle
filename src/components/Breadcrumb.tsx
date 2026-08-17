import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { soundEngine } from '../lib/sound';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`w-full py-2.5 px-3 sm:px-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm ${className}`}
    >
      <ol 
        className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs font-medium text-slate-400"
        itemScope 
        itemType="https://schema.org/BreadcrumbList"
      >
        {/* Root Home Item */}
        <li 
          itemProp="itemListElement" 
          itemScope 
          itemType="https://schema.org/ListItem" 
          className="flex items-center gap-1.5"
        >
          <Link
            to="/"
            onClick={() => soundEngine.playSelect()}
            className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-500 rounded px-1 py-0.5"
            itemProp="item"
          >
            <Home className="w-3.5 h-3.5" aria-hidden="true" />
            <span itemProp="name">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>

        {items.map((item, index) => {
          const position = index + 2;
          const isLast = index === items.length - 1 || item.current;

          return (
            <li 
              key={index} 
              itemProp="itemListElement" 
              itemScope 
              itemType="https://schema.org/ListItem"
              className="flex items-center gap-1.5"
            >
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" aria-hidden="true" />
              {isLast || !item.href ? (
                <span 
                  className="font-bold text-cyan-300 px-1 py-0.5" 
                  aria-current="page"
                  itemProp="name"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  onClick={() => soundEngine.playSelect()}
                  className="text-slate-400 hover:text-cyan-400 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-500 rounded px-1 py-0.5"
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              )}
              <meta itemProp="position" content={position.toString()} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
