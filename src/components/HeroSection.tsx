import heroImage from '@/assets/hero-lifestyle.jpg';
import { ArrowRight, CheckCircle } from 'lucide-react';

const trustBadges = [
  '100% Organic',
  'Lab Tested',
  '50,000+ Happy Customers',
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Decorative blob */}
      <div className="absolute top-20 -left-32 w-96 h-96 bg-sage/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-0 w-64 h-64 bg-honey/15 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-120px)] py-12 lg:py-0">
          {/* Left Content */}
          <div className="order-2 lg:order-1 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-[1.1] text-foreground mb-6">
              Nature's Pharmacy,{' '}
              <span className="text-primary">Delivered</span> to Your Door
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground font-subheading leading-relaxed mb-8 max-w-lg">
              Discover handpicked, sustainably sourced herbs, teas, and natural
              wellness essentials crafted for your mind, body & soul.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="#bestsellers"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-medium text-base hover:opacity-90 transition-all hover:scale-[1.02] hover:shadow-lg"
              >
                🌿 Shop Best Sellers
              </a>
              <a
                href="#concerns"
                className="inline-flex items-center gap-2 border-2 border-primary text-primary px-7 py-3.5 rounded-xl font-medium text-base hover:bg-primary hover:text-primary-foreground transition-all"
              >
                Take the Wellness Quiz <ArrowRight size={18} />
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-4 lg:gap-6">
              {trustBadges.map((badge) => (
                <div key={badge} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CheckCircle size={16} className="text-primary" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Woman enjoying herbal tea surrounded by fresh herbs in warm golden light"
                className="w-full h-[400px] lg:h-[600px] object-cover"
                loading="eager"
              />
              {/* Floating decorative leaf */}
              <div className="absolute top-6 right-6 text-4xl animate-float">🍃</div>
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-4 -left-4 lg:-left-8 bg-card rounded-2xl shadow-xl p-4 border border-border animate-slide-in-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sage/30 rounded-full flex items-center justify-center text-lg">⭐</div>
                <div>
                  <p className="font-heading font-bold text-foreground text-lg">4.9/5</p>
                  <p className="text-xs text-muted-foreground">12,000+ Reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
