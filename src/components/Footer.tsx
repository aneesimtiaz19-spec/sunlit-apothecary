import { Link } from 'react-router-dom';
import { Leaf, Instagram, Facebook, Youtube, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Leaf size={24} className="text-honey" />
              <span className="font-heading text-xl font-bold">Herb & Heal</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm mb-6 leading-relaxed">
              Bringing nature's healing power to your everyday life.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Youtube, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" aria-label="Social link">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-accent text-sm uppercase tracking-wider text-honey mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {['Shop All', 'Best Sellers', 'New Arrivals', 'Gift Cards', 'Bundles & Kits'].map(link => (
                <li key={link}><a href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-accent text-sm uppercase tracking-wider text-honey mb-4">Help & Support</h4>
            <ul className="space-y-2.5">
              {['Contact Us', 'FAQs', 'Shipping & Delivery', 'Returns & Refunds', 'Track Your Order'].map(link => (
                <li key={link}><a href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-accent text-sm uppercase tracking-wider text-honey mb-4">About</h4>
            <ul className="space-y-2.5">
              {['Our Story', 'Ingredients Glossary', 'Blog', 'Wholesale Inquiries', 'Affiliate Program'].map(link => (
                <li key={link}><a href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-accent text-sm uppercase tracking-wider text-honey mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Mail size={14} className="text-honey" /> hello@herbandheal.store
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Phone size={14} className="text-honey" /> +91-XXXX-XXXXXX
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <MapPin size={14} className="text-honey" /> Mumbai, India
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/50">© 2025 Herb & Heal. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-primary-foreground/50">
            <a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Refund Policy</a>
          </div>
          <p className="text-xs text-primary-foreground/50">Made with 💚 in India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
