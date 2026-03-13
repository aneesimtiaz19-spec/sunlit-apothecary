import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const ref = useScrollReveal();

  return (
    <section className="py-20 lg:py-24 bg-gradient-to-br from-honey/20 via-background to-sage/15 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(45,90,61,0.06),transparent)]" />
      <div className="container relative z-10 scroll-reveal">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Get 15% Off Your First Order
          </h2>
          <p className="text-muted-foreground font-subheading mb-8">
            Join 50,000+ wellness enthusiasts. Receive exclusive offers, new arrivals, and herbal wisdom straight to your inbox.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
              required
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-medium hover:opacity-90 transition-all hover:scale-[1.02] whitespace-nowrap"
            >
              Join the Community 🌿
            </button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
