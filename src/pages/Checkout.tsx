import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Truck, Lock, CreditCard, Minus, Plus, X, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import Footer from '@/components/Footer';
import { products } from '@/data/products';

interface CartItem {
  productId: string;
  quantity: number;
}

const initialCart: CartItem[] = [
  { productId: '1', quantity: 2 },
  { productId: '2', quantity: 1 },
  { productId: '3', quantity: 1 },
];

const Checkout = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState(initialCart);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [step, setStep] = useState<'cart' | 'shipping' | 'payment'>('cart');
  const [shipping, setShipping] = useState({ name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '' });

  const cartItems = cart.map(c => ({ ...c, product: products.find(p => p.id === c.productId)! })).filter(c => c.product);
  const subtotal = cartItems.reduce((sum, c) => sum + c.product.price * c.quantity, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.15) : 0;
  const shippingCost = subtotal >= 499 ? 0 : 49;
  const total = subtotal - discount + shippingCost;

  const updateQty = (productId: string, delta: number) => {
    setCart(prev => prev.map(c => c.productId === productId ? { ...c, quantity: Math.max(1, c.quantity + delta) } : c));
  };

  const removeItem = (productId: string) => {
    setCart(prev => prev.filter(c => c.productId !== productId));
  };

  const applyCoupon = () => {
    if (coupon.toLowerCase() === 'heal20' || coupon.toLowerCase() === 'heal15') {
      setCouponApplied(true);
      toast({ title: 'Coupon Applied! 🎉', description: '15% discount has been applied to your order.' });
    } else {
      toast({ title: 'Invalid Coupon', description: 'Please check the code and try again.', variant: 'destructive' });
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Order Placed! 🌿', description: 'Thank you! You\'ll receive a confirmation email shortly.' });
  };

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />

      <div className="container py-8 lg:py-12">
        {/* Back */}
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft size={16} /> Continue Shopping
        </Link>

        <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-8">Checkout</h1>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-10">
          {['Cart', 'Shipping', 'Payment'].map((s, i) => {
            const stepIndex = ['cart', 'shipping', 'payment'].indexOf(step);
            return (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  i <= stepIndex ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>{i + 1}</div>
                <span className={`text-sm font-medium hidden sm:block ${i <= stepIndex ? 'text-foreground' : 'text-muted-foreground'}`}>{s}</span>
                {i < 2 && <div className={`w-8 lg:w-16 h-px ${i < stepIndex ? 'bg-primary' : 'bg-border'}`} />}
              </div>
            );
          })}
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🛒</p>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Your Cart is Empty</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
            <Link to="/shop" className="inline-flex bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main */}
            <div className="lg:col-span-2">
              {step === 'cart' && (
                <div className="space-y-4">
                  {cartItems.map(({ product, quantity }) => (
                    <div key={product.id} className="flex gap-4 p-4 bg-card rounded-2xl border border-border">
                      <div className="w-20 h-20 rounded-xl bg-muted/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-3xl">{product.emoji}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link to={`/product/${product.slug}`} className="font-subheading font-semibold text-foreground text-sm hover:text-primary transition-colors">{product.name}</Link>
                            <p className="text-xs text-muted-foreground mt-0.5">{product.size}</p>
                          </div>
                          <button onClick={() => removeItem(product.id)} className="text-muted-foreground hover:text-terracotta transition-colors p-1">
                            <X size={16} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-border rounded-full">
                            <button onClick={() => updateQty(product.id, -1)} className="p-1.5 text-muted-foreground hover:text-foreground"><Minus size={14} /></button>
                            <span className="w-8 text-center text-sm font-medium text-foreground">{quantity}</span>
                            <button onClick={() => updateQty(product.id, 1)} className="p-1.5 text-muted-foreground hover:text-foreground"><Plus size={14} /></button>
                          </div>
                          <div className="text-right">
                            <p className="font-heading font-bold text-foreground text-sm">₹{product.price * quantity}</p>
                            {quantity > 1 && <p className="text-[10px] text-muted-foreground">₹{product.price} each</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Coupon */}
                  <div className="flex gap-2 pt-2">
                    <div className="relative flex-1">
                      <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Coupon code (try HEAL20)"
                        value={coupon}
                        onChange={e => setCoupon(e.target.value)}
                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                    <button onClick={applyCoupon} className="px-5 py-3 rounded-xl bg-secondary text-foreground font-medium text-sm hover:bg-secondary/80 transition-colors">
                      Apply
                    </button>
                  </div>

                  <button onClick={() => setStep('shipping')} className="w-full bg-primary text-primary-foreground py-3.5 rounded-full font-medium hover:opacity-90 transition-opacity mt-4">
                    Proceed to Shipping
                  </button>
                </div>
              )}

              {step === 'shipping' && (
                <div>
                  <h2 className="text-xl font-heading font-bold text-foreground mb-6">Shipping Details</h2>
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                        <input type="text" required value={shipping.name} onChange={e => setShipping({ ...shipping, name: e.target.value })} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Ananya Sharma" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                        <input type="email" required value={shipping.email} onChange={e => setShipping({ ...shipping, email: e.target.value })} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="you@example.com" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
                      <input type="tel" required value={shipping.phone} onChange={e => setShipping({ ...shipping, phone: e.target.value })} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Address</label>
                      <input type="text" required value={shipping.address} onChange={e => setShipping({ ...shipping, address: e.target.value })} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="123 Green Lane, Apt 4B" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">City</label>
                        <input type="text" required value={shipping.city} onChange={e => setShipping({ ...shipping, city: e.target.value })} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Mumbai" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">State</label>
                        <input type="text" required value={shipping.state} onChange={e => setShipping({ ...shipping, state: e.target.value })} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Maharashtra" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">PIN Code</label>
                        <input type="text" required value={shipping.pincode} onChange={e => setShipping({ ...shipping, pincode: e.target.value })} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="400001" />
                      </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button onClick={() => setStep('cart')} className="px-6 py-3 rounded-full border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors">Back</button>
                      <button onClick={() => setStep('payment')} className="flex-1 bg-primary text-primary-foreground py-3.5 rounded-full font-medium hover:opacity-90 transition-opacity">Continue to Payment</button>
                    </div>
                  </div>
                </div>
              )}

              {step === 'payment' && (
                <form onSubmit={handlePlaceOrder}>
                  <h2 className="text-xl font-heading font-bold text-foreground mb-6">Payment</h2>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      {['UPI', 'Card', 'COD'].map(method => (
                        <label key={method} className="flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border border-border bg-card cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                          <input type="radio" name="payment" value={method} defaultChecked={method === 'UPI'} className="sr-only" />
                          <CreditCard size={16} className="text-primary" />
                          <span className="text-sm font-medium text-foreground">{method}</span>
                        </label>
                      ))}
                    </div>

                    <div className="bg-muted/30 rounded-xl p-6 text-center border border-border">
                      <Lock size={24} className="text-primary mx-auto mb-2" />
                      <p className="text-sm text-foreground font-medium">Secure Payment</p>
                      <p className="text-xs text-muted-foreground mt-1">Your payment information is encrypted and secure.</p>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={() => setStep('shipping')} className="px-6 py-3 rounded-full border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors">Back</button>
                      <button type="submit" className="flex-1 bg-terracotta text-terracotta-foreground py-3.5 rounded-full font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                        <Lock size={16} /> Place Order — ₹{total.toLocaleString()}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
                <h3 className="font-heading font-bold text-foreground mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4 pb-4 border-b border-border">
                  {cartItems.map(({ product, quantity }) => (
                    <div key={product.id} className="flex items-center gap-3">
                      <span className="text-lg">{product.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">{product.name}</p>
                        <p className="text-[10px] text-muted-foreground">×{quantity}</p>
                      </div>
                      <p className="text-xs font-medium text-foreground">₹{product.price * quantity}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">₹{subtotal.toLocaleString()}</span></div>
                  {couponApplied && <div className="flex justify-between text-primary"><span>Discount (15%)</span><span>-₹{discount}</span></div>}
                  <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-foreground">{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span></div>
                </div>
                <div className="flex justify-between pt-4 mt-4 border-t border-border">
                  <span className="font-heading font-bold text-foreground">Total</span>
                  <span className="font-heading font-bold text-foreground text-lg">₹{total.toLocaleString()}</span>
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    { icon: Shield, text: '100% Secure Checkout' },
                    { icon: Truck, text: 'Free shipping on ₹499+' },
                  ].map(({ icon: Icon, text }, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon size={12} className="text-primary" /> {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
