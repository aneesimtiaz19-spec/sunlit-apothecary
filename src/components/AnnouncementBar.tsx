import { useState } from 'react';
import { X } from 'lucide-react';

const messages = [
  "🌿 FREE Shipping on Orders Over ₹499",
  "🍃 100% Natural & Lab-Tested Ingredients",
  "⏰ Limited Time: 20% OFF Your First Order — Use Code HEAL20",
];

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative bg-primary overflow-hidden" style={{ height: 40 }}>
      <div className="flex items-center h-full">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...messages, ...messages, ...messages].map((msg, i) => (
            <span
              key={i}
              className="text-primary-foreground text-sm font-accent mx-12 inline-block"
            >
              {msg}
            </span>
          ))}
        </div>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/70 hover:text-primary-foreground transition-colors z-10"
        aria-label="Dismiss announcement"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default AnnouncementBar;
