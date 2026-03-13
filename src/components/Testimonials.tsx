import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const reviews = [
  { name: 'Priya Sharma', location: 'Mumbai', text: 'The Ashwagandha powder has completely transformed my sleep quality. I feel calmer and more focused throughout the day. Absolute game changer!', product: 'Ashwagandha Root Powder', rating: 5 },
  { name: 'Arjun Patel', location: 'Ahmedabad', text: 'I was skeptical at first, but the Immunity Booster Tea is incredible. My whole family drinks it daily now. Haven\'t had a cold in months!', product: 'Immunity Booster Tea', rating: 5 },
  { name: 'Sneha Reddy', location: 'Hyderabad', text: 'Beautiful packaging, amazing quality. The turmeric golden milk mix is my nightly ritual now. So soothing and the taste is perfect.', product: 'Turmeric Golden Milk Mix', rating: 5 },
  { name: 'Vikram Singh', location: 'Delhi', text: 'Herb & Heal is the only brand I trust for herbal supplements. Pure, effective, and the customer service is exceptional.', product: 'Brahmi Memory Capsules', rating: 5 },
  { name: 'Ananya Desai', location: 'Pune', text: 'The Chamomile Sleep Tea changed my life. As someone who struggled with insomnia for years, this is a natural blessing.', product: 'Chamomile Sleep Tea', rating: 5 },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const ref = useScrollReveal();

  const next = () => setCurrent((prev) => (prev + 1) % reviews.length);
  const prev = () => setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);

  const getVisible = () => {
    const indices = [];
    for (let i = -1; i <= 1; i++) {
      indices.push((current + i + reviews.length) % reviews.length);
    }
    return indices;
  };

  return (
    <section className="py-20 lg:py-28 bg-background" ref={ref}>
      <div className="container">
        <div className="text-center mb-14 scroll-reveal">
          <p className="font-accent text-sm uppercase tracking-[0.2em] text-accent mb-3">Testimonials</p>
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-foreground mb-3">
            What Our Community Says
          </h2>
          <p className="text-muted-foreground font-subheading">Real stories from real people</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="fill-honey text-honey" />
              ))}
            </div>
            <span className="font-heading font-bold text-foreground">4.9</span>
            <span className="text-muted-foreground text-sm">out of 5 — Based on 12,847 reviews</span>
          </div>
        </div>

        {/* Cards */}
        <div className="relative">
          <div className="hidden lg:grid grid-cols-3 gap-6 scroll-reveal">
            {getVisible().map((idx) => {
              const review = reviews[idx];
              return (
                <div key={idx} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex mb-3">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} size={14} className="fill-honey text-honey" />
                    ))}
                  </div>
                  <p className="text-foreground text-sm leading-relaxed mb-4 line-clamp-4">"{review.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-heading font-bold text-primary text-sm">
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.location} · Verified ✓</p>
                    </div>
                  </div>
                  <p className="text-xs text-accent mt-3 font-medium">Purchased: {review.product}</p>
                </div>
              );
            })}
          </div>

          {/* Mobile single card */}
          <div className="lg:hidden scroll-reveal">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-honey text-honey" />
                ))}
              </div>
              <p className="text-foreground text-sm leading-relaxed mb-4">"{reviews[current].text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-heading font-bold text-primary text-sm">
                  {reviews[current].name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{reviews[current].name}</p>
                  <p className="text-xs text-muted-foreground">{reviews[current].location} · Verified ✓</p>
                </div>
              </div>
            </div>
          </div>

          {/* Nav arrows */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors" aria-label="Previous">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-1.5">
              {reviews.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-primary' : 'bg-border'}`} aria-label={`Go to review ${i + 1}`} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors" aria-label="Next">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
