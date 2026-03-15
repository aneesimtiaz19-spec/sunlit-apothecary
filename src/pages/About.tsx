import { Link } from 'react-router-dom';
import { Leaf, Heart, Shield, Users, Award, Globe, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import storyFarm from '@/assets/story-farm.jpg';
import storyHarvest from '@/assets/story-harvest.jpg';

const values = [
  { icon: Leaf, title: 'Pure & Natural', desc: 'Every product is crafted from 100% organic, ethically sourced ingredients — no chemicals, no fillers, ever.' },
  { icon: Shield, title: 'Lab Tested', desc: 'Each batch undergoes rigorous third-party testing for purity, potency, and safety before reaching you.' },
  { icon: Heart, title: 'Crafted with Care', desc: 'Small-batch, handcrafted formulations guided by Ayurvedic wisdom and backed by modern science.' },
  { icon: Globe, title: 'Sustainably Sourced', desc: 'We work directly with local farmers across India, ensuring fair trade and eco-friendly practices.' },
];

const milestones = [
  { year: '2018', title: 'The Seed is Planted', desc: 'Founded in a small kitchen in Mumbai with a passion for Ayurvedic wellness.' },
  { year: '2019', title: 'First 1,000 Customers', desc: 'Our Ashwagandha powder went viral, reaching wellness enthusiasts across India.' },
  { year: '2021', title: 'Farm Partnerships', desc: 'Partnered with 15+ organic farms in Rajasthan, Kerala, and Himachal Pradesh.' },
  { year: '2023', title: '50,000+ Happy Customers', desc: 'Expanded to 50+ products with a thriving community of wellness advocates.' },
  { year: '2025', title: 'Global Vision', desc: 'Bringing India\'s ancient herbal wisdom to the world, one product at a time.' },
];

const team = [
  { name: 'Ananya Sharma', role: 'Founder & CEO', emoji: '👩‍🔬', bio: 'Ayurveda practitioner with 15 years of experience in herbal medicine.' },
  { name: 'Dr. Vikram Patel', role: 'Head of R&D', emoji: '👨‍⚕️', bio: 'PhD in Pharmacognosy, passionate about validating traditional remedies.' },
  { name: 'Meera Joshi', role: 'Sustainability Lead', emoji: '🌍', bio: 'Dedicated to building ethical supply chains with local farming communities.' },
  { name: 'Arjun Nair', role: 'Head of Quality', emoji: '🔬', bio: 'Former pharma scientist ensuring every product meets the highest standards.' },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />

      {/* Hero */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container relative text-center max-w-3xl mx-auto">
          <p className="font-accent text-sm uppercase tracking-[0.2em] text-accent mb-4">Our Story</p>
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
            Rooted in Nature,<br />Driven by Purpose
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At Herb & Heal, we believe that nature holds the key to true wellness. We bridge the gap between 
            ancient Ayurvedic wisdom and modern science to bring you the purest herbal products — straight from 
            India's organic farms to your doorstep.
          </p>
        </div>
      </section>

      {/* Mission Split */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src={storyFarm} alt="Organic herb farm in India" className="w-full h-[400px] lg:h-[500px] object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground rounded-2xl p-6 shadow-lg hidden lg:block">
                <p className="text-3xl font-heading font-bold">50K+</p>
                <p className="text-sm font-medium">Happy Customers</p>
              </div>
            </div>
            <div>
              <p className="font-accent text-sm uppercase tracking-[0.2em] text-accent mb-3">Our Mission</p>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-6">
                From Farm to Your Family
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Every herb in our collection is ethically sourced from organic farms across India. We work 
                directly with local farmers to bring you the purest, most potent botanicals — no middlemen, 
                no compromise. Our mission is to make authentic Ayurvedic wellness accessible to everyone.
              </p>
              <div className="space-y-3">
                {['Direct partnerships with 15+ organic farms', 'Small-batch, handcrafted formulations', 'Eco-friendly, recyclable packaging', 'Guided by Ayurvedic wisdom, backed by modern science'].map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-primary flex-shrink-0" />
                    <span className="text-foreground text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-accent text-sm uppercase tracking-[0.2em] text-honey mb-3">What We Stand For</p>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon size={28} className="text-honey" />
                </div>
                <h3 className="font-subheading font-semibold text-lg mb-2">{v.title}</h3>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <p className="font-accent text-sm uppercase tracking-[0.2em] text-accent mb-3">Our Journey</p>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground">How We Grew</h2>
          </div>
          <div className="space-y-0">
            {milestones.map((m, i) => (
              <div key={i} className="relative flex gap-6 pb-10 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-accent text-xs font-bold flex-shrink-0">
                    {m.year}
                  </div>
                  {i < milestones.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
                </div>
                <div className="pt-2 pb-2">
                  <h3 className="font-subheading font-semibold text-foreground text-lg">{m.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24 bg-muted/40">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-accent text-sm uppercase tracking-[0.2em] text-accent mb-3">The People Behind the Plants</p>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground">Meet Our Team</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((t, i) => (
              <div key={i} className="bg-card rounded-2xl p-6 border border-border text-center hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 rounded-full bg-muted/60 flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">{t.emoji}</span>
                </div>
                <h3 className="font-subheading font-semibold text-foreground">{t.name}</h3>
                <p className="text-xs font-accent uppercase tracking-wider text-accent mt-1 mb-3">{t.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { num: '50,000+', label: 'Happy Customers' },
              { num: '50+', label: 'Natural Products' },
              { num: '15+', label: 'Farm Partners' },
              { num: '4.9/5', label: 'Average Rating' },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-3xl lg:text-4xl font-heading font-bold text-primary">{s.num}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-secondary/30">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">Ready to Start Your Wellness Journey?</h2>
          <p className="text-muted-foreground mb-8">Discover our handpicked collection of organic herbs, teas, and natural wellness essentials.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop" className="bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-medium hover:opacity-90 transition-opacity">
              Shop All Products
            </Link>
            <Link to="/contact" className="border border-border text-foreground px-8 py-3.5 rounded-full font-medium hover:bg-muted transition-colors">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default About;
