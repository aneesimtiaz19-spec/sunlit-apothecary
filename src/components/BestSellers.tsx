import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { products as allProducts } from '@/data/products';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const filters = ['All', 'Immunity', 'Digestion', 'Stress Relief', 'Skin & Glow'];

const bestSellerProducts = allProducts.slice(0, 8);

const BestSellers = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const ref = useScrollReveal();

  const filtered = activeFilter === 'All'
    ? bestSellerProducts
    : bestSellerProducts.filter(p => p.concern.includes(activeFilter));

  return (
    <section id="bestsellers" className="py-20 lg:py-28 bg-muted/40" ref={ref}>
      <div className="container">
        <div className="text-center mb-10 scroll-reveal">
          <p className="font-accent text-sm uppercase tracking-[0.2em] text-accent mb-3">Customer Favorites</p>
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-foreground mb-3">
            Our Best Sellers
          </h2>
          <p className="text-muted-foreground font-subheading">Loved by thousands, backed by nature</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 scroll-reveal">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === f
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card text-muted-foreground hover:bg-primary/10 border border-border'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {filtered.map((product, i) => (
            <Link
              to={`/product/${product.slug}`}
              key={product.id}
              className="scroll-reveal group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              {/* Image area */}
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
                {/* Hover actions */}
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

        <div className="text-center mt-12 scroll-reveal">
          <Link to="/shop" className="inline-flex items-center gap-2 text-primary font-medium hover:underline underline-offset-4">
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
