import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HelpCircle, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import Footer from '@/components/Footer';

const contactInfo = [
  { icon: Mail, label: 'Email Us', value: 'hello@herbandheal.store', desc: 'We reply within 24 hours' },
  { icon: Phone, label: 'Call Us', value: '+91-XXXX-XXXXXX', desc: 'Mon-Sat, 9AM-6PM IST' },
  { icon: MapPin, label: 'Visit Us', value: 'Mumbai, Maharashtra, India', desc: 'By appointment only' },
  { icon: Clock, label: 'Support Hours', value: 'Mon–Sat: 9AM–6PM', desc: 'Sunday: Closed' },
];

const faqs = [
  { q: 'How long does shipping take?', a: 'Standard shipping takes 3-5 business days. Express shipping (1-2 days) is available for an additional charge.' },
  { q: 'What is your return policy?', a: 'We offer a 30-day money-back guarantee on all products. If you\'re not satisfied, contact us for a full refund.' },
  { q: 'Are your products lab tested?', a: 'Yes! Every batch is third-party lab tested for purity, potency, and safety. Certificates are available on request.' },
  { q: 'Do you ship internationally?', a: 'Currently we ship across India. International shipping is coming soon — join our newsletter to be notified!' },
  { q: 'How do I track my order?', a: 'Once shipped, you\'ll receive a tracking link via email and SMS. You can also check your order status in your account.' },
];

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Message Sent! 🌿', description: 'We\'ll get back to you within 24 hours.' });
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />

      {/* Hero */}
      <section className="py-16 lg:py-24">
        <div className="container text-center max-w-2xl mx-auto">
          <p className="font-accent text-sm uppercase tracking-[0.2em] text-accent mb-4">Get in Touch</p>
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">We'd Love to Hear From You</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Have a question, suggestion, or just want to say hello? Our wellness team is here to help.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="pb-16">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((c, i) => (
              <div key={i} className="bg-card rounded-2xl p-6 border border-border text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <c.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-subheading font-semibold text-foreground text-sm mb-1">{c.label}</h3>
                <p className="text-foreground font-medium text-sm">{c.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Quick Help */}
      <section className="pb-16 lg:pb-24">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                      placeholder="Ananya Sharma"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
                  <select
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                    required
                  >
                    <option value="">Select a topic</option>
                    <option value="order">Order Inquiry</option>
                    <option value="product">Product Question</option>
                    <option value="wholesale">Wholesale / Partnership</option>
                    <option value="feedback">Feedback / Suggestion</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            </div>

            {/* Quick Help */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-6">Quick Help</h2>
              <div className="space-y-3 mb-8">
                {[
                  { icon: Package, label: 'Track Your Order', desc: 'Check your order status and delivery updates' },
                  { icon: HelpCircle, label: 'FAQs', desc: 'Find answers to common questions' },
                  { icon: MessageCircle, label: 'Live Chat', desc: 'Chat with our wellness experts' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-md transition-shadow cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center flex-shrink-0">
                      <item.icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-subheading font-semibold text-foreground text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mini Map Placeholder */}
              <div className="rounded-2xl overflow-hidden border border-border bg-muted/30 h-48 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={32} className="text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">Mumbai, India</p>
                  <p className="text-xs text-muted-foreground">Map coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 lg:py-24 bg-muted/40">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <p className="font-accent text-sm uppercase tracking-[0.2em] text-accent mb-3">Common Questions</p>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-subheading font-semibold text-foreground text-sm pr-4">{faq.q}</span>
                  <span className="text-muted-foreground text-lg flex-shrink-0">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 -mt-1">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
