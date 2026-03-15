import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { products, categories, concerns, sortOptions } from '@/data/products';
import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import Footer from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeConcern, setActiveConcern] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const ref = useScrollReveal();

  const filtered = useMemo(() => {
    let result = [...products];

    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    if (activeConcern !== 'All') {
      result = result.filter(p => p.concern.includes(activeConcern));
    }

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'reviews': result.sort((a, b) => b.reviews - a.reviews); break;
    }

    return result;
  }, [activeCategory, activeConcern, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />

      {/* Breadcrumb */}
      <div className="container pt-6 pb-2">
        <nav className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">Shop All</span>
        </nav>
      </div>

      {/* Header */}
      <div className="container pb-8" ref={ref}>
        <div className="text-center scroll-reveal">
          <h1 className="text-3xl lg:text-5xl font-heading font-bold text-foreground mb-3">
            Our Collection
          </h1>
          <p className="text-muted-foreground font-subheading max-w-xl mx-auto">
            Handpicked, sustainably sourced herbs and wellness essentials for your mind, body & soul
          </p>
        </div>
      </div>

      <div className="container pb-20">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 scroll-reveal">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-medium hover:bg-muted transition-colors"
            >
              <SlidersHorizontal size={16} />
              Filters
              {(activeCategory !== 'All' || activeConcern !== 'All') && (
                <span className="bg-primary text-primary-foreground text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {(activeCategory !== 'All' ? 1 : 0) + (activeConcern !== 'All' ? 1 : 0)}
                </span>
              )}
            </button>
            <span className="text-sm text-muted-foreground">{filtered.length} products</span>
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-card border border-border rounded-full px-4 py-2 pr-8 text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {sortOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-card rounded-2xl border border-border p-6 mb-8 animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-subheading font-semibold text-foreground">Filters</h3>
              <button
                onClick={() => { setActiveCategory('All'); setActiveConcern('All'); }}
                className="text-sm text-primary hover:underline"
              >
                Clear all
              </button>
            </div>
            <div className="space-y-5">
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Category</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map(c => (
                    <button
                      key={c}
                      onClick={() => setActiveCategory(c)}
                      className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                        activeCategory === c
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-primary/10'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Concern</p>
                <div className="flex flex-wrap gap-2">
                  {concerns.map(c => (
                    <button
                      key={c}
                      onClick={() => setActiveConcern(c)}
                      className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                        activeConcern === c
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-primary/10'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Active filter tags */}
        {(activeCategory !== 'All' || activeConcern !== 'All') && (
          <div className="flex flex-wrap gap-2 mb-6">
            {activeCategory !== 'All' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                {activeCategory}
                <button onClick={() => setActiveCategory('All')}><X size={14} /></button>
              </span>
            )}
            {activeConcern !== 'All' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                {activeConcern}
                <button onClick={() => setActiveConcern('All')}><X size={14} /></button>
              </span>
            )}
          </div>
        )}

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🌿</p>
            <p className="text-lg font-subheading text-muted-foreground">No products found with these filters</p>
            <button
              onClick={() => { setActiveCategory('All'); setActiveConcern('All'); }}
              className="mt-4 text-primary hover:underline font-medium"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {filtered.map((product, i) => (
              <Link
                to={`/product/${product.slug}`}
                key={product.id}
                className="scroll-reveal group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ transitionDelay: `${i * 0.03}s` }}
              >
                {/* Image */}
                <div className="relative aspect-square bg-muted/50 flex items-center justify-center">
                  <span className="text-6xl lg:text-7xl group-hover:scale-110 transition-transform duration-300">
                    {product.emoji}
                  </span>
                  {product.badge && (
                    <span className={`absolute top-3 left-3 ${product.badgeColor} text-primary-foreground text-[10px] font-accent font-semibold px-2.5 py-1 rounded-full`}>
                      {product.badge}
                    </span>
                  )}
                  <button
                    className="absolute top-3 right-3 text-muted-foreground hover:text-terracotta transition-colors z-10"
                    aria-label="Add to wishlist"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Heart size={18} />
                  </button>
                  {/* Hover overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-foreground/60 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden lg:flex items-center justify-center gap-3">
                    <button
                      className="bg-primary text-primary-foreground rounded-full px-4 py-2 text-xs font-medium flex items-center gap-1.5 hover:opacity-90 transition-opacity"
                      onClick={(e) => e.preventDefault()}
                    >
                      <ShoppingBag size={14} /> Add to Cart
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-center gap-1 mb-1.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={12} className={j < Math.round(product.rating) ? "fill-honey text-honey" : "text-muted"} />
                    ))}
                    <span className="text-[11px] text-muted-foreground ml-1">{product.rating}</span>
                  </div>
                  <h3 className="font-subheading font-semibold text-foreground text-sm leading-tight mb-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">{product.benefit}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-foreground">₹{product.price}</span>
                    <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</span>
                  </div>
                  {/* Mobile add to cart */}
                  <button
                    className="lg:hidden mt-3 w-full bg-primary text-primary-foreground rounded-lg py-2 text-sm font-medium flex items-center justify-center gap-1.5"
                    onClick={(e) => e.preventDefault()}
                  >
                    <ShoppingBag size={14} /> Add to Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
