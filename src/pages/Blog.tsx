import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  emoji: string;
  featured: boolean;
}

const blogPosts: BlogPost[] = [
  { id: '1', slug: 'ashwagandha-benefits', title: 'Ashwagandha: The Complete Guide to Nature\'s Stress Buster', excerpt: 'Discover how this powerful adaptogen has been used for over 3,000 years to reduce cortisol, boost energy, and improve sleep quality.', category: 'Ayurveda', readTime: '8 min', date: 'Mar 10, 2025', emoji: '🌿', featured: true },
  { id: '2', slug: 'golden-milk-recipe', title: 'The Perfect Golden Milk Recipe for Better Sleep', excerpt: 'Learn how to make the ultimate turmeric latte with our step-by-step recipe, plus the science behind why it helps you sleep.', category: 'Recipes', readTime: '5 min', date: 'Mar 5, 2025', emoji: '✨', featured: true },
  { id: '3', slug: 'immunity-boosting-herbs', title: '7 Herbs That Naturally Boost Your Immune System', excerpt: 'From Tulsi to Giloy, explore the most effective herbs for strengthening your body\'s natural defenses this season.', category: 'Wellness Tips', readTime: '6 min', date: 'Feb 28, 2025', emoji: '🛡️', featured: true },
  { id: '4', slug: 'morning-wellness-routine', title: 'Build a 10-Minute Ayurvedic Morning Routine', excerpt: 'Start your day with intention. This simple routine combines ancient wisdom with modern habits for optimal wellness.', category: 'Lifestyle', readTime: '4 min', date: 'Feb 20, 2025', emoji: '🌅', featured: false },
  { id: '5', slug: 'triphala-guide', title: 'Triphala: The Three-Fruit Formula for Digestive Health', excerpt: 'Everything you need to know about the most famous Ayurvedic formulation and how to use it for optimal gut health.', category: 'Ayurveda', readTime: '7 min', date: 'Feb 15, 2025', emoji: '🌱', featured: false },
  { id: '6', slug: 'herbal-teas-benefits', title: 'Herbal Teas: Which One is Right for You?', excerpt: 'A comprehensive guide to choosing the right herbal tea based on your health goals — from sleep to immunity.', category: 'Wellness Tips', readTime: '5 min', date: 'Feb 10, 2025', emoji: '🍵', featured: false },
  { id: '7', slug: 'natural-skincare-routine', title: 'The Ultimate Natural Skincare Routine Using Herbs', excerpt: 'Ditch the chemicals and embrace nature. Build a glowing skincare routine with Neem, Aloe, and Turmeric.', category: 'Skincare', readTime: '6 min', date: 'Feb 5, 2025', emoji: '🧴', featured: false },
  { id: '8', slug: 'sustainable-wellness', title: 'Why Sustainable Wellness Matters More Than Ever', excerpt: 'Explore how choosing ethically sourced, eco-friendly products makes a difference for your health and the planet.', category: 'Lifestyle', readTime: '4 min', date: 'Jan 28, 2025', emoji: '🌍', featured: false },
  { id: '9', slug: 'brahmi-brain-health', title: 'Brahmi for Brain Health: What Science Says', excerpt: 'A deep dive into the research behind Brahmi (Bacopa monnieri) and its proven effects on memory and focus.', category: 'Ayurveda', readTime: '7 min', date: 'Jan 20, 2025', emoji: '🧠', featured: false },
];

const categories = ['All', 'Ayurveda', 'Recipes', 'Wellness Tips', 'Lifestyle', 'Skincare'];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = blogPosts.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = blogPosts.filter(p => p.featured);

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />

      {/* Hero */}
      <section className="py-16 lg:py-24">
        <div className="container text-center max-w-2xl mx-auto">
          <p className="font-accent text-sm uppercase tracking-[0.2em] text-accent mb-4">The Healing Journal</p>
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">Tips, Guides & Ancient Wisdom</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Explore our collection of articles on Ayurveda, natural wellness, herbal recipes, and sustainable living.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="pb-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-6">
            {featured.map((post, i) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className={`group relative rounded-2xl overflow-hidden border border-border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
              >
                <div className={`bg-muted/40 flex items-center justify-center ${i === 0 ? 'h-48 lg:h-full lg:min-h-[400px]' : 'h-40'}`}>
                  <span className={`${i === 0 ? 'text-[80px] lg:text-[120px]' : 'text-[60px]'} group-hover:scale-110 transition-transform duration-300`}>{post.emoji}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-accent uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded-full">{post.category}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
                  </div>
                  <h3 className={`font-heading font-bold text-foreground mb-2 leading-tight group-hover:text-primary transition-colors ${i === 0 ? 'text-xl lg:text-2xl' : 'text-lg'}`}>{post.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-1 mt-4 text-sm font-medium text-primary">
                    Read Article <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16 lg:py-24 bg-muted/40">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
            <h2 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">All Articles</h2>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2.5 rounded-full border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 w-full sm:w-60"
                />
              </div>
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-xs font-accent px-3.5 py-2 rounded-full transition-all ${
                      activeCategory === cat
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(post => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="bg-muted/30 h-40 flex items-center justify-center">
                    <span className="text-[50px] group-hover:scale-110 transition-transform duration-300">{post.emoji}</span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-accent uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded-full">{post.category}</span>
                      <span className="text-[10px] text-muted-foreground">{post.date}</span>
                    </div>
                    <h3 className="font-subheading font-semibold text-foreground text-sm leading-tight mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
                      <span className="text-xs font-medium text-primary flex items-center gap-1">Read More <ArrowRight size={12} /></span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">📝</p>
              <p className="text-muted-foreground">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Blog;
