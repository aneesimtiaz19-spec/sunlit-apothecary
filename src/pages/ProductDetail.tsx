import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Heart, ShoppingBag, Star, Minus, Plus, Truck, RotateCcw, Shield,
  ChevronDown, ChevronUp, Check, Leaf, Award, Droplets, ThumbsUp,
  Clock, Package, Users
} from 'lucide-react';
import { getProductBySlug, products } from '@/data/products';
import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import Footer from '@/components/Footer';
import { Progress } from '@/components/ui/progress';

type PurchaseType = 'one-time' | 'subscribe';

const mockReviews = [
  { id: 1, name: 'Priya Sharma', location: 'Mumbai', rating: 5, title: 'Life-changing product!', text: 'I\'ve been using this for 3 months now and the difference is incredible. I feel more energetic, sleep better, and my overall wellbeing has improved dramatically. Highly recommend to everyone!', date: '2 weeks ago', verified: true, helpful: 42 },
  { id: 2, name: 'Rahul Mehta', location: 'Delhi', rating: 5, title: 'Best quality I\'ve found', text: 'After trying many brands, this is by far the best. The quality is exceptional, packaging is eco-friendly, and the results speak for themselves. My whole family uses it now.', date: '3 weeks ago', verified: true, helpful: 38 },
  { id: 3, name: 'Sneha Kulkarni', location: 'Bangalore', rating: 4, title: 'Great product, slow shipping', text: 'Product quality is top-notch and I can already see improvements after 6 weeks. Only giving 4 stars because shipping took a bit longer than expected, but overall very satisfied.', date: '1 month ago', verified: true, helpful: 24 },
  { id: 4, name: 'Arjun Patel', location: 'Ahmedabad', rating: 5, title: 'Worth every penny', text: 'Was hesitant about the price but this is genuinely worth it. The purity is unmatched and you can taste the quality. Using it daily and loving the results!', date: '1 month ago', verified: true, helpful: 31 },
  { id: 5, name: 'Meera Nair', location: 'Kochi', rating: 5, title: 'My daily essential now', text: 'Started this as an experiment and now I can\'t imagine my routine without it. The natural ingredients make all the difference. Thank you Herb & Heal!', date: '2 months ago', verified: true, helpful: 19 },
  { id: 6, name: 'Vikram Singh', location: 'Jaipur', rating: 3, title: 'Decent but expected more', text: 'It\'s a good product but I expected faster results. The taste is nice and packaging is premium. I\'ll continue using it for a few more weeks before making my final judgment.', date: '2 months ago', verified: true, helpful: 12 },
];

const ratingBreakdown = [
  { stars: 5, percentage: 78 },
  { stars: 4, percentage: 14 },
  { stars: 3, percentage: 5 },
  { stars: 2, percentage: 2 },
  { stars: 1, percentage: 1 },
];

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState<PurchaseType>('one-time');
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [reviewFilter, setReviewFilter] = useState<number | null>(null);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [wishlisted, setWishlisted] = useState(false);

  const filteredReviews = useMemo(() => {
    if (!reviewFilter) return mockReviews;
    return mockReviews.filter(r => r.rating === reviewFilter);
  }, [reviewFilter]);

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
  const subscribePrice = Math.round(product.price * 0.8);
  const currentPrice = purchaseType === 'subscribe' ? subscribePrice : product.price;

  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.concern.some(c => product.concern.includes(c))))
    .slice(0, 4);

  const faqs = [
    { q: `What are the key benefits of ${product.name}?`, a: product.description },
    { q: 'How should I take this product?', a: product.howToUse },
    { q: 'Are there any side effects?', a: 'Our products are made from 100% natural ingredients and are generally well-tolerated. However, we recommend consulting your healthcare practitioner before starting any new supplement, especially if pregnant, nursing, or on medication.' },
    { q: 'How long before I see results?', a: 'Most customers notice improvements within 2-4 weeks of consistent daily use. For best results, we recommend using the product for at least 8-12 weeks.' },
    { q: 'Is this product third-party tested?', a: 'Yes! Every batch is rigorously tested by independent labs for purity, potency, and safety. We maintain the highest quality standards in the industry.' },
  ];

  const benefits = [
    { icon: Leaf, title: '100% Natural', desc: 'Pure, organic ingredients sourced from trusted farms' },
    { icon: Award, title: 'Lab Tested', desc: 'Third-party verified for purity and potency' },
    { icon: Droplets, title: 'No Additives', desc: 'Free from fillers, preservatives, and artificial colors' },
    { icon: Shield, title: 'GMP Certified', desc: 'Manufactured in GMP-certified facilities' },
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
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-primary transition-colors">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>
      </div>

      {/* ============ HERO PRODUCT SECTION ============ */}
      <section className="container pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* LEFT — Images */}
          <div className="lg:sticky lg:top-28 lg:self-start space-y-4">
            {/* Main image */}
            <div className="relative aspect-square bg-muted/30 rounded-3xl flex items-center justify-center border border-border overflow-hidden group">
              <span className="text-[120px] lg:text-[180px] group-hover:scale-105 transition-transform duration-500">{product.emoji}</span>
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
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className={`absolute bottom-5 right-5 p-3 rounded-full border transition-all ${wishlisted ? 'bg-terracotta border-terracotta text-terracotta-foreground' : 'bg-card/80 backdrop-blur border-border text-muted-foreground hover:text-terracotta hover:border-terracotta'}`}
                aria-label="Add to wishlist"
              >
                <Heart size={18} className={wishlisted ? 'fill-current' : ''} />
              </button>
            </div>
            {/* Thumbnails */}
            <div className="flex gap-3">
              {[0, 1, 2, 3].map(i => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIdx(i)}
                  className={`flex-1 aspect-square rounded-xl border-2 flex items-center justify-center bg-muted/20 cursor-pointer transition-all hover:border-primary ${i === selectedImageIdx ? 'border-primary ring-2 ring-primary/20' : 'border-border'}`}
                >
                  <span className="text-2xl">{product.emoji}</span>
                </button>
              ))}
            </div>

            {/* Trust strip under image */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-card rounded-2xl border border-border">
              <div className="flex items-center gap-2.5">
                <Truck size={18} className="text-primary shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-foreground">Free Shipping</p>
                  <p className="text-[10px] text-muted-foreground">On orders ₹499+</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw size={18} className="text-primary shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-foreground">30-Day Returns</p>
                  <p className="text-[10px] text-muted-foreground">Hassle-free</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Shield size={18} className="text-primary shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-foreground">Lab Tested</p>
                  <p className="text-[10px] text-muted-foreground">100% pure</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Product details */}
          <div className="flex flex-col">
            <p className="font-accent text-sm uppercase tracking-[0.2em] text-accent mb-2">{product.category}</p>
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-foreground mb-2 leading-tight">{product.name}</h1>
            <p className="text-lg text-muted-foreground mb-4">{product.benefit}</p>

            {/* Rating summary */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} className={i < Math.round(product.rating) ? "fill-honey text-honey" : "text-muted"} />
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">{product.rating}</span>
              <a href="#reviews" className="text-sm text-primary hover:underline font-medium">
                ({product.reviews.toLocaleString()} reviews)
              </a>
            </div>

            {/* Purchase Options */}
            <div className="space-y-3 mb-6">
              <p className="text-sm font-semibold text-foreground uppercase tracking-wide">Purchase Options</p>

              {/* One-time */}
              <button
                onClick={() => setPurchaseType('one-time')}
                className={`w-full p-4 rounded-2xl border-2 transition-all text-left flex items-center justify-between ${purchaseType === 'one-time' ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground/30'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${purchaseType === 'one-time' ? 'border-primary' : 'border-muted-foreground/40'}`}>
                    {purchaseType === 'one-time' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">One-Time Purchase</p>
                    <p className="text-xs text-muted-foreground">Buy once, no commitment</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-heading font-bold text-foreground text-lg">₹{product.price}</p>
                  <p className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</p>
                </div>
              </button>

              {/* Subscribe */}
              <button
                onClick={() => setPurchaseType('subscribe')}
                className={`w-full p-4 rounded-2xl border-2 transition-all text-left flex items-center justify-between relative overflow-hidden ${purchaseType === 'subscribe' ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground/30'}`}
              >
                <span className="absolute top-0 right-0 bg-terracotta text-terracotta-foreground text-[10px] font-accent font-bold px-3 py-0.5 rounded-bl-xl">SAVE 20%</span>
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${purchaseType === 'subscribe' ? 'border-primary' : 'border-muted-foreground/40'}`}>
                    {purchaseType === 'subscribe' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Subscribe & Save</p>
                    <p className="text-xs text-muted-foreground">Delivered every 30 days · Cancel anytime</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-heading font-bold text-primary text-lg">₹{subscribePrice}</p>
                  <p className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</p>
                </div>
              </button>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center border border-border rounded-full bg-card">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 text-muted-foreground hover:text-foreground transition-colors" aria-label="Decrease quantity">
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-semibold text-foreground">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 text-muted-foreground hover:text-foreground transition-colors" aria-label="Increase quantity">
                  <Plus size={16} />
                </button>
              </div>
              <button className="flex-1 bg-primary text-primary-foreground rounded-full py-4 font-semibold flex items-center justify-center gap-2.5 hover:opacity-90 transition-opacity text-base shadow-lg shadow-primary/20">
                <ShoppingBag size={20} />
                Add to Cart — ₹{currentPrice * quantity}
              </button>
            </div>

            {/* Stock urgency */}
            {product.stockCount < 100 && (
              <div className="flex items-center gap-2 mb-6 p-3 bg-terracotta/10 rounded-xl">
                <Clock size={14} className="text-terracotta" />
                <p className="text-sm text-terracotta font-medium">
                  🔥 Only {product.stockCount} left in stock — order soon!
                </p>
              </div>
            )}

            {/* Subscription perks */}
            {purchaseType === 'subscribe' && (
              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20 mb-6 space-y-2">
                <p className="text-sm font-semibold text-foreground">Subscriber Perks:</p>
                {['20% off every order', 'Free shipping always', 'Cancel or pause anytime', 'Priority customer support'].map((perk, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check size={14} className="text-primary" />
                    <span className="text-sm text-muted-foreground">{perk}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Size & details */}
            <div className="mb-6 p-4 bg-card rounded-2xl border border-border">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Size</p>
                  <p className="font-semibold text-foreground">{product.size}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Category</p>
                  <p className="font-semibold text-foreground">{product.category}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Concerns</p>
                  <p className="font-semibold text-foreground">{product.concern.join(', ')}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Availability</p>
                  <p className="font-semibold text-primary">{product.inStock ? 'In Stock ✓' : 'Out of Stock'}</p>
                </div>
              </div>
            </div>

            {/* Accordion sections */}
            <div className="space-y-0 border-t border-border">
              {[
                { key: 'desc', title: 'Product Description', content: <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p> },
                { key: 'ingredients', title: 'Ingredients', content: (
                  <div className="space-y-2">
                    {product.ingredients.map((ing, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-sm">
                        <Leaf size={14} className="text-primary shrink-0" />
                        <span className="text-muted-foreground">{ing}</span>
                      </div>
                    ))}
                  </div>
                )},
                { key: 'howto', title: 'How to Use', content: (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Package size={14} className="text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{product.howToUse}</p>
                  </div>
                )},
              ].map(section => {
                const isOpen = openFaq === undefined; // use separate state
                return (
                  <AccordionItem key={section.key} title={section.title}>
                    {section.content}
                  </AccordionItem>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY YOU'LL LOVE IT ============ */}
      <section className="py-16 lg:py-20 bg-card border-y border-border">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-accent text-sm uppercase tracking-[0.2em] text-accent mb-2">Why Choose This Product</p>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground">Why You'll Love It</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-background border border-border hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <b.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-subheading font-semibold text-foreground mb-1.5">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ REVIEWS SECTION ============ */}
      <section id="reviews" className="py-16 lg:py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-[340px_1fr] gap-10 lg:gap-16">
            {/* Left — Rating Summary */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="font-accent text-sm uppercase tracking-[0.2em] text-accent mb-2">Customer Reviews</p>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-1">{product.rating} out of 5</h2>
              <p className="text-sm text-muted-foreground mb-4">Based on {product.reviews.toLocaleString()} reviews</p>

              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={22} className="fill-honey text-honey" />
                ))}
              </div>

              {/* Rating bars */}
              <div className="space-y-2.5 mb-8">
                {ratingBreakdown.map(({ stars, percentage }) => (
                  <button
                    key={stars}
                    onClick={() => setReviewFilter(reviewFilter === stars ? null : stars)}
                    className={`w-full flex items-center gap-3 group transition-opacity ${reviewFilter && reviewFilter !== stars ? 'opacity-40' : ''}`}
                  >
                    <span className="text-sm font-medium text-foreground w-3">{stars}</span>
                    <Star size={12} className="fill-honey text-honey" />
                    <div className="flex-1">
                      <Progress value={percentage} className="h-2.5 bg-muted" />
                    </div>
                    <span className="text-xs text-muted-foreground w-8 text-right">{percentage}%</span>
                  </button>
                ))}
              </div>

              {reviewFilter && (
                <button onClick={() => setReviewFilter(null)} className="text-sm text-primary hover:underline font-medium">
                  Clear filter
                </button>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="p-3 rounded-xl bg-card border border-border text-center">
                  <ThumbsUp size={18} className="text-primary mx-auto mb-1" />
                  <p className="text-lg font-heading font-bold text-foreground">96%</p>
                  <p className="text-[10px] text-muted-foreground">Recommend</p>
                </div>
                <div className="p-3 rounded-xl bg-card border border-border text-center">
                  <Users size={18} className="text-primary mx-auto mb-1" />
                  <p className="text-lg font-heading font-bold text-foreground">{product.reviews.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground">Happy Customers</p>
                </div>
              </div>
            </div>

            {/* Right — Review Cards */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing {Math.min(visibleReviews, filteredReviews.length)} of {filteredReviews.length} reviews
                </p>
              </div>

              <div className="space-y-4">
                {filteredReviews.slice(0, visibleReviews).map(review => (
                  <div key={review.id} className="p-6 bg-card rounded-2xl border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-heading font-bold text-primary text-sm">
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{review.name}</p>
                          <p className="text-xs text-muted-foreground">{review.location} · {review.date}</p>
                        </div>
                      </div>
                      {review.verified && (
                        <span className="flex items-center gap-1 text-[11px] font-accent text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                          <Check size={10} />
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14} className={i < review.rating ? "fill-honey text-honey" : "text-muted"} />
                      ))}
                    </div>
                    <h4 className="font-subheading font-semibold text-foreground mb-1.5">{review.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{review.text}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <ThumbsUp size={12} />
                      <span>{review.helpful} people found this helpful</span>
                    </div>
                  </div>
                ))}
              </div>

              {visibleReviews < filteredReviews.length && (
                <button
                  onClick={() => setVisibleReviews(prev => prev + 3)}
                  className="mt-6 w-full py-3 border border-border rounded-full text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  Load More Reviews
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-16 lg:py-20 bg-card border-y border-border">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <p className="font-accent text-sm uppercase tracking-[0.2em] text-accent mb-2">Got Questions?</p>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-border">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left"
                >
                  <span className="font-subheading font-semibold text-foreground pr-4">{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={18} className="text-muted-foreground shrink-0" /> : <ChevronDown size={18} className="text-muted-foreground shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="pb-5 text-sm text-muted-foreground leading-relaxed animate-fade-in-up">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ RELATED PRODUCTS ============ */}
      {relatedProducts.length > 0 && (
        <section className="py-16 lg:py-20 bg-background">
          <div className="container">
            <div className="text-center mb-10">
              <p className="font-accent text-sm uppercase tracking-[0.2em] text-accent mb-2">Complete Your Routine</p>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground">You May Also Like</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map(p => (
                <Link
                  key={p.id}
                  to={`/product/${p.slug}`}
                  className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-square bg-muted/30 flex items-center justify-center">
                    <span className="text-5xl lg:text-6xl group-hover:scale-110 transition-transform duration-300">{p.emoji}</span>
                    {p.badge && (
                      <span className={`absolute top-3 left-3 ${p.badgeColor} text-primary-foreground text-[10px] font-accent font-semibold px-2.5 py-1 rounded-full`}>
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-0.5 mb-1.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={11} className={j < Math.round(p.rating) ? "fill-honey text-honey" : "text-muted"} />
                      ))}
                      <span className="text-[10px] text-muted-foreground ml-1">({p.reviews})</span>
                    </div>
                    <h3 className="font-subheading font-semibold text-foreground text-sm leading-tight mb-1.5">{p.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{p.benefit}</p>
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

/* ---- Accordion Item sub-component ---- */
const AccordionItem = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left">
        <span className="font-subheading font-semibold text-foreground">{title}</span>
        {open ? <ChevronUp size={18} className="text-muted-foreground" /> : <ChevronDown size={18} className="text-muted-foreground" />}
      </button>
      {open && (
        <div className="pb-5 animate-fade-in-up">
          {children}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
