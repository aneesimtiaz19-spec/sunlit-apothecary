import storyFarm from '@/assets/story-farm.jpg';
import storyHarvest from '@/assets/story-harvest.jpg';
import { Check, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const StorySection = () => {
  const ref = useScrollReveal();

  return (
    <section className="py-20 lg:py-28 bg-background" ref={ref}>
      <div className="container space-y-20 lg:space-y-28">
        {/* Block 1 */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center scroll-reveal">
          <div className="rounded-3xl overflow-hidden shadow-xl">
            <img src={storyFarm} alt="Organic herbal powders in wooden bowls" className="w-full h-[350px] lg:h-[450px] object-cover" loading="lazy" />
          </div>
          <div>
            <span className="font-accent text-sm uppercase tracking-[0.2em] text-accent">Our Story</span>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mt-3 mb-5 leading-tight">
              From Farm to Your Family
            </h2>
            <p className="text-muted-foreground font-subheading leading-relaxed mb-6">
              Every herb in our collection is ethically sourced from organic farms across India.
              We work directly with local farmers to bring you the purest, most potent botanicals —
              no middlemen, no compromise.
            </p>
            <a href="#" className="inline-flex items-center gap-2 text-primary font-medium hover:underline underline-offset-4">
              Learn Our Story <ArrowRight size={18} />
            </a>
          </div>
        </div>

        {/* Block 2 */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center scroll-reveal">
          <div className="lg:order-2 rounded-3xl overflow-hidden shadow-xl">
            <img src={storyHarvest} alt="Hands harvesting fresh herbs from organic garden" className="w-full h-[350px] lg:h-[450px] object-cover" loading="lazy" />
          </div>
          <div className="lg:order-1">
            <span className="font-accent text-sm uppercase tracking-[0.2em] text-accent">What Sets Us Apart</span>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mt-3 mb-6 leading-tight">
              The Herb & Heal Difference
            </h2>
            <div className="space-y-4">
              {[
                'Small-batch, handcrafted formulations',
                'Eco-friendly, recyclable packaging',
                'Guided by Ayurvedic wisdom, backed by modern science',
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={14} className="text-primary" />
                  </div>
                  <span className="text-muted-foreground">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
