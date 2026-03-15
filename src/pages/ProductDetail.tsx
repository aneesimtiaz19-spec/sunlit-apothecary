import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Minus, Plus, Truck, RotateCcw, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { getProductBySlug, products } from '@/data/products';
import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import Footer from '@/components/Footer';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'how-to-use'>('description');
  const [showReviews, setShowReviews] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <AnnouncementBar />
        <Navbar />
        <div className="container py-20 text-center">
          <p className="text-6xl mb-4">🌿</p>
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity">
            Browse All Products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const reviews = [
    { name: 'Priya S.', location: 'Mumbai', rating: 5, text: 'Absolutely love this product! Been using it for 3 months and can feel the difference.', date: '2 weeks ago', verified: true },
    { name: 'Rahul M.', location: 'Delhi', rating: 5, text: 'Great quality, arrived well-packaged. Will definitely buy again.', date: '1 month ago', verified: true },
    { name: 'Sneha K.', location: 'Bangalore', rating: 4, text: 'Good product overall. Takes some time to see results but worth the wait.', date: '1 month ago', verified: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />

      {/* Breadcrumb */}
      <div className="container pt-6 pb-4">
        <nav className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="container pb-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-muted/30 rounded-3xl flex items-center justify-center border border-border overflow-hidden">
              <span className="text-[120px] lg:text-[160px]">{product.emoji}</span>
              {product.badge && (
                <span className={`absolute top-5 left-5 ${product.badgeColor} text-primary-foreground text-xs font-accent font-semibold px-3 py-1.5 rounded-full`}>
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="absolute top-5 right-5 bg-terracotta text-terracotta-foreground text-xs font-accent font-semibold px-3 py-1.5 rounded-full">
                  -{discount}%
                </span>
              )}
            </div>
            {/* Thumbnail row placeholder */}
            <div className="flex gap-3">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className={`flex-1 aspect-square rounded-xl border-2 flex items-center justify-center bg-muted/20 cursor-pointer transition-all hover:border-primary ${i === 0 ? 'border-primary' : 'border-border'}`}>
                  <span className="text-2xl">{product.emoji}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <p className="font-accent text-sm uppercase tracking-[0.2em] text-accent mb-2">{product.category}</p>
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className={i < Math.round(product.rating) ? "fill-honey text-honey" : "text-muted"} />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviews.toLocaleString()} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-heading font-bold text-foreground">₹{product.price}</span>
              <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice}</span>
              <span className="bg-terracotta/10 text-terracotta text-sm font-semibold px-2.5 py-0.5 rounded-full">
                Save ₹{product.originalPrice - product.price}
              </span>
            </div>

            {/* Short description */}
            <p className="text-muted-foreground leading-relaxed mb-6">{product.benefit}</p>

            {/* Size */}
            <div className="mb-6">
              <p className="text-sm font-medium text-foreground mb-2">Size: <span className="text-muted-foreground font-normal">{product.size}</span></p>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-medium text-foreground">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button className="flex-1 bg-primary text-primary-foreground rounded-full py-3.5 font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity text-sm lg:text-base">
                <ShoppingBag size={18} />
                Add to Cart — ₹{product.price * quantity}
              </button>
              <button className="p-3.5 rounded-full border border-border text-muted-foreground hover:text-terracotta hover:border-terracotta transition-colors" aria-label="Add to wishlist">
                <Heart size={18} />
              </button>
            </div>

            {/* Stock */}
            {product.stockCount < 50 && (
              <p className="text-sm text-terracotta font-medium mb-4">
                🔥 Only {product.stockCount} left in stock — order soon!
              </p>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 py-6 border-t border-border">
              <div className="flex flex-col items-center text-center gap-1.5">
                <Truck size={20} className="text-primary" />
                <span className="text-xs text-muted-foreground">Free Shipping 499+</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5">
                <RotateCcw size={20} className="text-primary" />
                <span className="text-xs text-muted-foreground">30-Day Returns</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5">
                <Shield size={20} className="text-primary" />
                <span className="text-xs text-muted-foreground">Lab Tested</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-t border-border pt-6 space-y-4">
              {(['description', 'ingredients', 'how-to-use'] as const).map(tab => (
                <div key={tab} className="border-b border-border pb-4">
                  <button
                    onClick={() => setActiveTab(activeTab === tab ? activeTab : tab)}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <span className="font-subheading font-semibold text-foreground capitalize">
                      {tab === 'how-to-use' ? 'How to Use' : tab}
                    </span>
                    {activeTab === tab ? <ChevronUp size={18} className="text-muted-foreground" /> : <ChevronDown size={18} className="text-muted-foreground" />}
                  </button>
                  {activeTab === tab && (
                    <div className="mt-3 text-sm text-muted-foreground leading-relaxed animate-fade-in-up">
                      {tab === 'description' && <p>{product.description}</p>}
                      {tab === 'ingredients' && (
                        <ul className="list-disc list-inside space-y-1">
                          {product.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                        </ul>
                      )}
                      {tab === 'how-to-use' && <p>{product.howToUse}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-muted/40 py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">Customer Reviews</h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className="fill-honey text-honey" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product.rating} out of 5 — {product.reviews.toLocaleString()} reviews</span>
              </div>
            </div>
            <button
              onClick={() => setShowReviews(!showReviews)}
              className="text-sm font-medium text-primary hover:underline"
            >
              {showReviews ? 'Hide Reviews' : 'Show All Reviews'}
            </button>
          </div>

          <div className={`grid md:grid-cols-3 gap-4 ${!showReviews ? '' : ''}`}>
            {reviews.map((review, i) => (
              <div key={i} className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} className={j < review.rating ? "fill-honey text-honey" : "text-muted"} />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.location} • {review.date}</p>
                  </div>
                  {review.verified && (
                    <span className="text-[10px] font-accent text-primary bg-primary/10 px-2 py-0.5 rounded-full">✓ Verified</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16">
          <div className="container">
            <h2 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-8 text-center">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map(p => (
                <Link
                  key={p.id}
                  to={`/product/${p.slug}`}
                  className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-square bg-muted/50 flex items-center justify-center">
                    <span className="text-5xl lg:text-6xl group-hover:scale-110 transition-transform duration-300">{p.emoji}</span>
                    {p.badge && (
                      <span className={`absolute top-3 left-3 ${p.badgeColor} text-primary-foreground text-[10px] font-accent font-semibold px-2.5 py-1 rounded-full`}>
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-0.5 mb-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={11} className="fill-honey text-honey" />
                      ))}
                    </div>
                    <h3 className="font-subheading font-semibold text-foreground text-sm leading-tight mb-1">{p.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-foreground text-sm">₹{p.price}</span>
                      <span className="text-xs text-muted-foreground line-through">₹{p.originalPrice}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetail;
