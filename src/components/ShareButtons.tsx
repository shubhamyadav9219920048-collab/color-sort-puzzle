import React, { useState } from 'react';
import { 
  Share2, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Link as LinkIcon, 
  Check, 
  MessageCircle,
  Bookmark
} from 'lucide-react';
import { soundEngine } from '../lib/sound';

export interface ShareButtonsProps {
  title: string;
  url?: string;
  description?: string;
  isFavorited?: boolean;
  onToggleFavorite?: () => void;
  className?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({
  title,
  url,
  description = '',
  isFavorited = false,
  onToggleFavorite,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://colorsortpuzzle3d.com');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description);

  const handleCopyLink = () => {
    soundEngine.playSelect();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl);
      }
    } catch (e) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleNativeShare = async () => {
    soundEngine.playSelect();
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text: description || title,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1.5">
        <Share2 className="w-3.5 h-3.5 text-cyan-400" />
        Share:
      </span>

      {/* Twitter / X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => soundEngine.playSelect()}
        className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-700/60 hover:border-cyan-500/40 transition-all active:scale-95 flex items-center justify-center"
        aria-label="Share on X (Twitter)"
        title="Share on X (Twitter)"
      >
        <Twitter className="w-4 h-4" />
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => soundEngine.playSelect()}
        className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-blue-500/20 text-slate-300 hover:text-blue-400 border border-slate-700/60 hover:border-blue-500/40 transition-all active:scale-95 flex items-center justify-center"
        aria-label="Share on Facebook"
        title="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => soundEngine.playSelect()}
        className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-indigo-500/20 text-slate-300 hover:text-indigo-400 border border-slate-700/60 hover:border-indigo-500/40 transition-all active:scale-95 flex items-center justify-center"
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => soundEngine.playSelect()}
        className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 border border-slate-700/60 hover:border-emerald-500/40 transition-all active:scale-95 flex items-center justify-center"
        aria-label="Share on WhatsApp"
        title="Share on WhatsApp"
      >
        <MessageCircle className="w-4 h-4" />
      </a>

      {/* Copy Link Button */}
      <button
        onClick={handleCopyLink}
        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 active:scale-95 ${
          copied
            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700/60'
        }`}
        aria-label="Copy article link"
        title="Copy article link"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <LinkIcon className="w-3.5 h-3.5" />}
        <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
      </button>

      {/* Native Web Share API */}
      {typeof navigator !== 'undefined' && navigator.share && (
        <button
          onClick={handleNativeShare}
          className="p-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition-all active:scale-95 flex items-center justify-center"
          aria-label="Share with device apps"
          title="Share via device apps"
        >
          <Share2 className="w-4 h-4" />
        </button>
      )}

      {/* Optional Bookmark / Favorite Button */}
      {onToggleFavorite && (
        <button
          onClick={() => {
            soundEngine.playSelect();
            onToggleFavorite();
          }}
          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 active:scale-95 ml-auto ${
            isFavorited
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700/60'
          }`}
          aria-label={isFavorited ? 'Remove from saved' : 'Save article'}
          title={isFavorited ? 'Saved to your favorites' : 'Save for later'}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isFavorited ? 'fill-amber-400 text-amber-400' : ''}`} />
          <span>{isFavorited ? 'Saved' : 'Save'}</span>
        </button>
      )}
    </div>
  );
};
