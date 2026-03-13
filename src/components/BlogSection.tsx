import { Clock, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const posts = [
  { title: '10 Ayurvedic Herbs for Everyday Wellness', excerpt: 'Discover the ancient herbs that can transform your daily routine and boost your natural immunity.', category: 'Ayurveda', readTime: '5 min', emoji: '🌿' },
  { title: 'Golden Milk: The Ultimate Nighttime Ritual', excerpt: 'Learn how to make the perfect turmeric latte that promotes deep sleep and reduces inflammation.', category: 'Recipes', readTime: '3 min', emoji: '🥛' },
  { title: 'Understanding Adaptogens: A Beginner\'s Guide', excerpt: 'What are adaptogens, how do they work, and which ones are right for your body type?', category: 'Wellness Tips', readTime: '7 min', emoji: '📚' },
];

const BlogSection = () => {
  const ref = useScrollReveal();
  return (
    <section className="py-20 lg:py-28 bg-muted/30" ref={ref}>
      <div className="container">
        <div className="text-center mb-14 scroll-reveal">
          <p className="font-accent text-sm uppercase tracking-[0.2em] text-accent mb-3">Learn & Grow</p>
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-foreground mb-3">The Healing Journal</h2>
          <p className="text-muted-foreground font-subheading">Tips, guides & ancient wisdom for modern wellness</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 scroll-reveal">
          {posts.map((post, i) => (
            <a
              key={post.title}
              href="#"
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="aspect-video bg-muted/50 flex items-center justify-center">
                <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{post.emoji}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-accent uppercase tracking-wider text-accent">{post.category}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-foreground text-lg mb-2 leading-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-3 group-hover:gap-2 transition-all">
                  Read Article <ArrowRight size={14} />
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-10 scroll-reveal">
          <a href="#" className="inline-flex items-center gap-2 text-primary font-medium hover:underline underline-offset-4">
            Explore All Articles →
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
