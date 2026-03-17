import { Link } from 'react-router-dom';
import { BadgePercent, Truck, Gift, CalendarClock, ShoppingCart, UserPlus, Settings, ChevronRight } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import { products } from '@/data/products';
import subscriptionHero from '@/assets/subscription-hero.jpg';

const benefits = [
  {
    icon: BadgePercent,
    title: 'Serious Savings, On Repeat',
    description: 'Get 20% off every monthly order or save even more with larger plans. Simple savings for your wellness routine.',
  },
  {
    icon: Gift,
    title: 'Perks With Purpose',
    description: 'Unlock milestone rewards, early product access, and exclusive offers designed to elevate your experience.',
  },
  {
    icon: Truck,
    title: 'Shipping You Can Count On',
    description: 'Enjoy free ground shipping with every subscription order, delivered right when you need it most.',
  },
  {
    icon: CalendarClock,
    title: 'Fast, Flexible Scheduling',
    description: 'Pause, change, or cancel your subscription anytime. Wellness on your terms has never been easier.',
  },
];

const steps = [
  {
    icon: ShoppingCart,
    title: 'Choose Your Products',
    description: 'Browse our collection and select the Subscribe & Save option before adding to cart.',
  },
  {
    icon: CalendarClock,
    title: 'Pick Your Schedule',
    description: 'Select the delivery frequency that serves you best — every 30, 60, or 90 days.',
  },
  {
    icon: UserPlus,
    title: 'Create Your Account',
    description: 'Sign up with your email to manage your subscription and track your deliveries.',
  },
  {
    icon: Settings,
    title: 'Update Anytime',
    description: 'Manage your subscription to update, pause, cancel, or add products to your next shipment.',
  },
];

const faqs = [
  {
    q: 'Do I save money with a subscription?',
    a: 'Yes! Subscribers save 20% on every order, plus enjoy exclusive perks like free shipping and early access to new products.',
  },
  {
    q: 'How do I manage or cancel my subscription?',
    a: 'You can easily manage, pause, or cancel your subscription at any time by logging into your account. You have full control—it\'s hassle-free!',
  },
  {
    q: 'Can I change the delivery frequency or product selection?',
    a: 'Absolutely! Our subscriptions are flexible. You can adjust the delivery schedule or swap products anytime to suit your needs.',
  },
  {
    q: 'Will I get reminders before my subscription renews?',
    a: 'Yes, we\'ll send you a reminder email before your next order ships, so you\'re always in control of your deliveries.',
  },
  {
    q: 'What if I need to skip a delivery?',
    a: 'No problem! You can skip a shipment or reschedule it directly from your account. We\'re here to keep your wellness routine flexible.',
  },
];

const subscriberFavorites = products.slice(0, 4);

const Subscription = () => {
  const benefitsRef = useScrollReveal();
  const faqRef = useScrollReveal();
  const habitRef = useScrollReveal();
  const favoritesRef = useScrollReveal();
  const stepsRef = useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={subscriptionHero}
            alt="Herbal supplements collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
        </div>
        <div className="container relative z-10 py-20 lg:py-32">
          <div className="max-w-lg">
            <h1 className="text-4xl lg:text-6xl font-heading font-bold text-primary-foreground mb-6 leading-tight">
              Benefits of Subscription
            </h1>
            <p className="text-lg text-primary-foreground/85 leading-relaxed mb-8">
              Enjoy ongoing savings, member perks, and free shipping—the smartest way to reach your wellness goals.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-all hover:scale-[1.02]"
            >
              Start Subscribing <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-28 bg-background" ref={benefitsRef}>
        <div className="container scroll-reveal">
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-foreground text-center mb-4 max-w-3xl mx-auto leading-tight">
            Flexible, convenient, and rewarding plans tailored to meet your lifestyle.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="text-center p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <b.icon size={28} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground text-lg mb-2">{b.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-muted/40" ref={faqRef}>
        <div className="container scroll-reveal">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground text-center mb-12">
              Subscription FAQs
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="text-center mt-8">
              <Link to="/contact" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
                View All FAQs <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Health is Habit Section */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground" ref={habitRef}>
        <div className="container scroll-reveal">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl lg:text-5xl font-heading font-bold mb-6 leading-tight">
                Health is Habit
              </h2>
              <p className="text-primary-foreground/80 leading-relaxed mb-4">
                Wellness isn't a quick fix—it's built through daily consistency. Sticking to your supplement routine is the key to long-term benefits, but life gets busy.
              </p>
              <p className="text-primary-foreground/80 leading-relaxed">
                A subscription makes it effortless, ensuring you never miss a dose, never run out, and never have to think twice. <strong className="text-primary-foreground">Stay on track, save time, and focus on what matters—your health.</strong>
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-primary-foreground/10">
                <div className="w-full h-full flex items-center justify-center text-[120px]">
                  🌿
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-accent/20 blur-2xl" />
              <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full bg-secondary/20 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Subscriber Favorites */}
      <section className="py-20 lg:py-28 bg-background" ref={favoritesRef}>
        <div className="container scroll-reveal">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground text-center mb-4">
            Subscriber Favorites
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Our most-loved products by subscribers. Start your wellness journey with these tried-and-true picks.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {subscriberFavorites.map((product) => {
              const subPrice = (product.price * 0.8).toFixed(2);
              return (
                <Link
                  key={product.id}
                  to={`/product/${product.slug}`}
                  className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all"
                >
                  <div className="aspect-square bg-muted flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                    {product.emoji}
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">{product.benefit}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-primary">₹{subPrice}</span>
                      <span className="text-sm text-muted-foreground line-through">₹{product.price}</span>
                    </div>
                    <span className="inline-block mt-2 text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                      Subscribe & Save 20%
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-medium hover:opacity-90 transition-all"
            >
              Shop All Products <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Steps to Subscription */}
      <section className="py-20 lg:py-28 bg-muted/40" ref={stepsRef}>
        <div className="container scroll-reveal">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground text-center mb-16">
            Steps to Subscription
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px border-t-2 border-dashed border-border" />
                )}
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-5 relative z-10 shadow-lg">
                  <step.icon size={24} />
                </div>
                <span className="text-xs font-accent uppercase tracking-widest text-muted-foreground mb-2 block">
                  Step {i + 1}
                </span>
                <h3 className="font-heading font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Subscription;
