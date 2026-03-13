import { Leaf, FlaskConical, Truck, RotateCcw } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const props = [
  { icon: Leaf, title: '100% Organic & Natural', desc: 'No chemicals, no fillers, ever' },
  { icon: FlaskConical, title: 'Third-Party Lab Tested', desc: 'Purity & potency guaranteed' },
  { icon: Truck, title: 'Fast & Free Shipping', desc: 'Free delivery on orders over ₹499' },
  { icon: RotateCcw, title: '30-Day Money Back', desc: 'Not satisfied? Full refund, no questions' },
];

const ValueProps = () => {
  const ref = useScrollReveal();
  return (
    <section className="py-16 lg:py-20 bg-primary" ref={ref}>
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {props.map((prop, i) => (
            <div key={prop.title} className="scroll-reveal text-center" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-foreground/10 mb-4">
                <prop.icon size={28} className="text-honey" />
              </div>
              <h3 className="font-subheading font-semibold text-primary-foreground text-sm lg:text-base mb-1">
                {prop.title}
              </h3>
              <p className="text-primary-foreground/70 text-xs lg:text-sm">{prop.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
