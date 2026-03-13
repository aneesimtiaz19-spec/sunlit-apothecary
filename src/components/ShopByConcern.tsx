import { useScrollReveal } from '@/hooks/useScrollReveal';

const concerns = [
  { emoji: '😴', label: 'Better Sleep', color: 'bg-primary/8' },
  { emoji: '🛡️', label: 'Immunity Boost', color: 'bg-sage/20' },
  { emoji: '🧠', label: 'Mental Clarity', color: 'bg-honey/15' },
  { emoji: '💆', label: 'Stress & Anxiety', color: 'bg-primary/10' },
  { emoji: '✨', label: 'Skin & Glow', color: 'bg-terracotta/8' },
  { emoji: '🏋️', label: 'Energy & Stamina', color: 'bg-sage/15' },
  { emoji: '🫁', label: 'Digestion', color: 'bg-honey/12' },
  { emoji: '💪', label: 'Joint & Muscle', color: 'bg-primary/6' },
];

const ShopByConcern = () => {
  const ref = useScrollReveal();

  return (
    <section id="concerns" className="py-20 lg:py-28 bg-muted/30" ref={ref}>
      <div className="container">
        <div className="text-center mb-14 scroll-reveal">
          <p className="font-accent text-sm uppercase tracking-[0.2em] text-accent mb-3">Personalized Wellness</p>
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-foreground mb-3">
            What Are You Looking to Heal?
          </h2>
          <p className="text-muted-foreground font-subheading">Find the right herbs for your wellness goals</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6">
          {concerns.map((c, i) => (
            <a
              key={c.label}
              href="#"
              className={`scroll-reveal group ${c.color} rounded-2xl p-6 lg:p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden`}
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              <div className="text-4xl lg:text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {c.emoji}
              </div>
              <span className="font-subheading font-semibold text-foreground text-sm lg:text-base">
                {c.label}
              </span>
              <div className="absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                <span className="text-primary-foreground font-medium text-sm">Shop Now →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByConcern;
