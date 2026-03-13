import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SocialProofTicker from '@/components/SocialProofTicker';
import CategoryShowcase from '@/components/CategoryShowcase';
import BestSellers from '@/components/BestSellers';
import ValueProps from '@/components/ValueProps';
import StorySection from '@/components/StorySection';
import ShopByConcern from '@/components/ShopByConcern';
import PromoBanner from '@/components/PromoBanner';
import Testimonials from '@/components/Testimonials';
import BlogSection from '@/components/BlogSection';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />
      <main>
        <HeroSection />
        <SocialProofTicker />
        <CategoryShowcase />
        <BestSellers />
        <ValueProps />
        <StorySection />
        <ShopByConcern />
        <PromoBanner />
        <Testimonials />
        <BlogSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
