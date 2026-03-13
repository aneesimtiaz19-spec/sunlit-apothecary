import { useScrollReveal } from '@/hooks/useScrollReveal';

const categories = [
  { name: 'Herbal Powders', emoji: '🌿', bg: 'bg-primary/10' },
  { name: 'Wellness Teas', emoji: '🍵', bg: 'bg-sage/20' },
  { name: 'Supplements', emoji: '💊', bg: 'bg-honey/20' },
  { name: 'Natural Skincare', emoji: '🧴', bg: 'bg-primary/8' },
  { name: 'Curated Bundles', emoji: '🎁', bg: 'bg-terracotta/10' },
  { name: 'Aromatherapy', emoji: '🌸', bg: 'bg-sage/15' },
];

const CategoryShowcase = () => {
  const ref = useScrollReveal();

  return (
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute -top-20 right-0 w-72 h-72 bg-sage/10 rounded-full blur-3xl" />
      <div className="container relative z-10">
        <div className="text-center mb-14 scroll-reveal">
          <p className="font-accent text-sm uppercase tracking-[0.2em] text-accent mb-3">Shop by Category</p>
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Explore Our Collections
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, i) => (
            <a
              key={cat.name}
              href="#"
              className={`scroll-reveal group flex flex-col items-center gap-4 p-6 rounded-2xl ${cat.bg} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                {cat.emoji}
              </div>
              <span className="font-subheading font-medium text-foreground text-center text-sm">
                {cat.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
