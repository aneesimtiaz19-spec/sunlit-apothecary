import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X, Leaf } from 'lucide-react';

const navLinks = [
  { label: 'Shop All', href: '/shop' },
  { label: 'Herbs & Supplements', href: '/shop' },
  { label: 'Teas & Infusions', href: '/shop' },
  { label: 'Skincare', href: '/shop' },
  { label: 'Bundles', href: '/shop' },
  { label: 'Blog', href: '#' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/95 backdrop-blur-md shadow-md'
            : 'bg-transparent'
        }`}
      >
        <div className="container flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Leaf className="text-primary transition-transform duration-300 group-hover:rotate-12" size={28} />
            <span className="font-heading text-xl lg:text-2xl font-bold text-foreground tracking-tight">
              Herb & Heal
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3 lg:gap-4">
            <button className="text-muted-foreground hover:text-primary transition-colors hidden sm:block" aria-label="Search">
              <Search size={20} />
            </button>
            <button className="text-muted-foreground hover:text-primary transition-colors hidden sm:block" aria-label="Account">
              <User size={20} />
            </button>
            <button className="text-muted-foreground hover:text-primary transition-colors hidden sm:block" aria-label="Wishlist">
              <Heart size={20} />
            </button>
            <button className="text-muted-foreground hover:text-primary transition-colors relative" aria-label="Cart">
              <ShoppingBag size={20} />
              <span className="absolute -top-1.5 -right-1.5 bg-terracotta text-terracotta-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                2
              </span>
            </button>
            <button
              className="lg:hidden text-foreground ml-1"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-sm animate-fade-in-up">
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center mb-12">
              <a href="/" className="flex items-center gap-2">
                <Leaf className="text-primary" size={28} />
                <span className="font-heading text-xl font-bold">Herb & Heal</span>
              </a>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <a
                  key={link}
                  href="#"
                  className="text-2xl font-heading font-semibold text-foreground hover:text-primary transition-colors"
                  style={{ animationDelay: `${i * 0.05}s` }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link}
                </a>
              ))}
            </div>
            <div className="mt-auto flex items-center gap-6 pb-8">
              <Search size={22} className="text-muted-foreground" />
              <User size={22} className="text-muted-foreground" />
              <Heart size={22} className="text-muted-foreground" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
