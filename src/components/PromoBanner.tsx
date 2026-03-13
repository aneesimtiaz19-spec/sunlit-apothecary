import { useState, useEffect } from 'react';
import { Gift } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const PromoBanner = () => {
  const ref = useScrollReveal();
  const [time, setTime] = useState({ h: 2, m: 14, s: 36 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 0; m = 0; s = 0; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-primary via-primary to-sage/60 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(168,198,134,0.15),transparent)]" />
      <div className="container relative z-10 scroll-reveal">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-honey/20 text-honey font-accent text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            Limited Edition
          </span>
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-primary-foreground mb-4 leading-tight">
            The Ultimate Wellness Starter Kit
          </h2>
          <p className="text-primary-foreground/80 font-subheading text-lg mb-6">
            5 best-selling products in one beautiful bundle — Save 35%
          </p>
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-3xl lg:text-4xl font-heading font-bold text-honey">₹1,499</span>
            <span className="text-primary-foreground/50 line-through text-lg">₹2,299</span>
          </div>

          {/* Countdown */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <p className="text-primary-foreground/70 text-sm mr-2">Offer ends in:</p>
            {[pad(time.h), pad(time.m), pad(time.s)].map((v, i) => (
              <div key={i} className="bg-primary-foreground/10 backdrop-blur rounded-lg px-3 py-2 min-w-[48px]">
                <span className="font-heading font-bold text-primary-foreground text-xl">{v}</span>
              </div>
            ))}
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-all hover:scale-[1.02] hover:shadow-xl"
          >
            <Gift size={20} /> Grab the Bundle
          </a>
          <p className="text-primary-foreground/50 text-sm mt-4">Only 23 left in stock</p>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
