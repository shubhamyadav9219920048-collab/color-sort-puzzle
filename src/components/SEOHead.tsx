import React, { useEffect } from 'react';

export interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'game';
  ogImage?: string;
  schemaJson?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords = 'color sort puzzle, water sort puzzle, liquid sort game, bottle sort online, free puzzle games, brain training games',
  canonicalUrl,
  ogType = 'website',
  ogImage = '/favicon.svg',
  schemaJson,
}) => {
  useEffect(() => {
    // 1. Update Document Title
    const formattedTitle = title.includes('Color Sort') ? title : `${title} | Color Sort Puzzle 3D`;
    document.title = formattedTitle;

    // Helper to create or update meta tag
    const setMetaTag = (attrName: 'name' | 'property', attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // 3. Open Graph Tags
    const fullCanonical = canonicalUrl 
      ? (canonicalUrl.startsWith('http') ? canonicalUrl : `https://colorsortpuzzle3d.com${canonicalUrl}`)
      : window.location.href;

    setMetaTag('property', 'og:title', formattedTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', fullCanonical);
    setMetaTag('property', 'og:image', ogImage.startsWith('http') ? ogImage : `https://colorsortpuzzle3d.com${ogImage}`);
    setMetaTag('property', 'og:site_name', 'Color Sort Puzzle 3D');

    // 4. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', formattedTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage.startsWith('http') ? ogImage : `https://colorsortpuzzle3d.com${ogImage}`);

    // 5. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonical);

    // 6. Structured Data / Schema.org JSON-LD
    let scriptTag = document.getElementById('dynamic-seo-schema') as HTMLScriptElement | null;
    if (schemaJson) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'dynamic-seo-schema';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(schemaJson);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Optional cleanup on unmount if needed
    };
  }, [title, description, keywords, canonicalUrl, ogType, ogImage, schemaJson]);

  return null;
};
