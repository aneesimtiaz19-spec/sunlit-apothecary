import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products, categories, concerns } from '@/data/products';
import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import Footer from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const collectionData = [
  { name: 'Herbs & Supplements', emoji: '🌿', description: 'Potent adaptogens and botanicals for whole-body wellness', bg: 'bg-primary/10', border: 'border-primary/20' },
  { name: 'Teas & Infusions', emoji: '🍵', description: 'Hand-blended herbal teas for calm, clarity, and comfort', bg: 'bg-sage/20', border: 'border-sage/30' },
  { name: 'Skincare', emoji: '🧴', description: 'Plant-powered formulas for radiant, healthy skin', bg: 'bg-honey/20', border: 'border-honey/30' },
  { name: 'Aromatherapy', emoji: '🌸', description: 'Essential oils and blends for mind-body balance', bg: 'bg-primary/8', border: 'border-primary/15' },
  { name: 'Bundles', emoji: '🎁', description: 'Curated sets for complete wellness routines', bg: 'bg-terracotta/10', border: 'border-terracotta/20' },
];

const concernData = [
  { name: 'Immunity', emoji: '🛡️', color: 'from-primary/20 to-sage/20' },
  { name: 'Stress Relief', emoji: '🧘', color: 'from-sage/20 to-primary/10' },
  { name: 'Digestion', emoji: '🌱', color: 'from-honey/20 to-primary/10' },
  { name: 'Skin & Glow', emoji: '✨', color: 'from-honey/15 to-terracotta/10' },
  { name: 'Better Sleep', emoji: '🌙', color: 'from-primary/15 to-sage/15' },
  { name: 'Mental Clarity', emoji: '🧠', color: 'from-sage/15 to-honey/15' },
  { name: 'Energy', emoji: '⚡', color: 'from-terracotta/15 to-honey/20' },
  { name: 'Joint & Muscle', emoji: '💪', color: 'from-primary/10 to-sage/20' },
];

const Collections = () => {
  const ref = useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />

      {/* Breadcrumb */}
      <div className="container pt-6 pb-2">
        <nav className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">Collections</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="container pb-12" ref={ref}>
        <div className="text-center scroll-reveal">
          <p className="font-accent text-sm uppercase tracking-[0.2em] text-accent mb-3">Curated for You</p>
          <h1 className="text-3xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Our Collections
          </h1>
          <p className="text-muted-foreground font-subheading max-w-2xl mx-auto">
            Explore our carefully curated collections of herbal remedies, wellness teas, and natural skincare — each crafted to nurture your well-being.
          </p>
          <div className="w-16 h-0.5 bg-accent mx-auto mt-6" />
        </div>
      </div>

      {/* Category Collections */}
      <section className="container pb-20">
        <div className="grid gap-6 md:gap-8">
          {collectionData.map((col, i) => {
            const count = products.filter(p => p.category === col.name).length;
            const preview = products.filter(p => p.category === col.name).slice(0, 4);

            return (
              <Link
                to={`/shop?category=${encodeURIComponent(col.name)}`}
                key={col.name}
                className={`scroll-reveal group relative rounded-2xl border ${col.border} ${col.bg} p-6 lg:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl">{col.emoji}</span>
                      <div>
                        <h2 className="text-xl lg:text-2xl font-heading font-bold text-foreground">
                          {col.name}
                        </h2>
                        <span className="text-sm text-muted-foreground">{count} products</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground font-subheading mt-1 mb-4 max-w-lg">
                      {col.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                      Shop Collection <ArrowRight size={16} />
                    </span>
                  </div>

                  {/* Product Preview */}
                  <div className="flex gap-3 flex-shrink-0">
                    {preview.map(p => (
                      <div
                        key={p.id}
                        className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl bg-card border border-border flex items-center justify-center text-3xl lg:text-4xl group-hover:scale-105 transition-transform"
                      >
                        {p.emoji}
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Shop by Concern */}
      <section className="bg-card border-y border-border py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-12 scroll-reveal">
            <p className="font-accent text-sm uppercase tracking-[0.2em] text-accent mb-3">Targeted Solutions</p>
            <h2 className="text-2xl lg:text-4xl font-heading font-bold text-foreground mb-3">
              Shop by Concern
            </h2>
            <p className="text-muted-foreground font-subheading max-w-xl mx-auto">
              Find the perfect natural remedy for your specific health goals
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
            {concernData.map((concern, i) => {
              const count = products.filter(p => p.concern.includes(concern.name)).length;
              return (
                <Link
                  to={`/shop?concern=${encodeURIComponent(concern.name)}`}
                  key={concern.name}
                  className={`scroll-reveal group bg-gradient-to-br ${concern.color} rounded-2xl p-5 lg:p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50`}
                  style={{ transitionDelay: `${i * 0.04}s` }}
                >
                  <span className="text-4xl lg:text-5xl block mb-3 group-hover:scale-110 transition-transform duration-300">
                    {concern.emoji}
                  </span>
                  <h3 className="font-subheading font-semibold text-foreground text-sm lg:text-base mb-1">
                    {concern.name}
                  </h3>
                  <span className="text-xs text-muted-foreground">{count} products</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Banner */}
      <section className="container py-16 lg:py-24">
        <div className="scroll-reveal bg-primary rounded-3xl p-8 lg:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-8 text-6xl">🌿</div>
            <div className="absolute bottom-4 right-8 text-6xl">🍃</div>
            <div className="absolute top-1/2 left-1/4 text-4xl">✨</div>
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl lg:text-4xl font-heading font-bold text-primary-foreground mb-3">
              Not sure where to start?
            </h2>
            <p className="text-primary-foreground/80 font-subheading max-w-lg mx-auto mb-6">
              Browse our best sellers — trusted by thousands for their quality, purity, and results.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Shop All Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Collections;
