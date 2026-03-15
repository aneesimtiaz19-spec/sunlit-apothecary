import { Link, useParams } from 'react-router-dom';
import { Clock, ArrowLeft, Share2, Heart, Facebook, Twitter } from 'lucide-react';
import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';

const blogData: Record<string, { title: string; category: string; readTime: string; date: string; emoji: string; content: string[] }> = {
  'ashwagandha-benefits': {
    title: 'Ashwagandha: The Complete Guide to Nature\'s Stress Buster',
    category: 'Ayurveda', readTime: '8 min', date: 'Mar 10, 2025', emoji: '🌿',
    content: [
      'Ashwagandha (Withania somnifera) is one of the most important herbs in Ayurveda, used for over 3,000 years as a natural remedy for stress, energy, and vitality. Its name literally means "smell of the horse," referring to both its unique aroma and its ability to provide the strength and stamina of a stallion.',
      'Modern research has validated many of these traditional uses. Studies show that Ashwagandha can reduce cortisol levels by up to 30%, significantly lowering stress and anxiety. It\'s classified as an adaptogen — a natural substance that helps the body adapt to stress and promotes balance.',
      'Beyond stress relief, Ashwagandha has been shown to improve sleep quality, boost testosterone levels in men, enhance muscle strength and recovery, and support cognitive function. It\'s truly one of nature\'s most versatile healing herbs.',
      'How to use Ashwagandha: The most common form is root powder, which can be mixed with warm milk (traditionally called "Ashwagandha Ksheerapaka"). Start with 1/4 teaspoon and gradually increase to 1/2 teaspoon daily. Best taken before bed for sleep benefits, or in the morning for energy.',
      'Quality matters: Look for KSM-66 or Sensoril branded extracts, which are the most clinically studied forms. Always choose organic, third-party tested products to ensure purity and potency. At Herb & Heal, every batch of our Ashwagandha is lab-verified for heavy metals and contaminants.',
    ]
  },
  'golden-milk-recipe': {
    title: 'The Perfect Golden Milk Recipe for Better Sleep',
    category: 'Recipes', readTime: '5 min', date: 'Mar 5, 2025', emoji: '✨',
    content: [
      'Golden Milk, or Haldi Doodh, has been a staple of Indian households for centuries. This warming, anti-inflammatory drink combines turmeric with complementary spices for a delicious bedtime ritual that promotes deep, restorative sleep.',
      'The Recipe: Heat 1 cup of milk (dairy or plant-based). Add 1 tsp of our Turmeric Golden Milk Mix, a pinch of black pepper (enhances curcumin absorption by 2000%), 1/2 tsp of coconut oil, and sweetener to taste. Whisk until frothy and golden.',
      'The Science: Curcumin, the active compound in turmeric, has powerful anti-inflammatory and antioxidant properties. When combined with the tryptophan in warm milk, it creates a natural sleep-promoting combination that helps regulate your circadian rhythm.',
      'Pro Tips: Use Lakadong turmeric (the variety with the highest curcumin content). Always include black pepper or fat to enhance absorption. Make a paste in advance for quick preparation. Drink 30 minutes before bed for optimal results.',
    ]
  },
};

const fallbackContent = {
  title: 'Article Coming Soon',
  category: 'Blog', readTime: '5 min', date: '2025', emoji: '📝',
  content: ['This article is currently being written. Check back soon for the full content! In the meantime, browse our other articles for wellness tips, Ayurvedic wisdom, and herbal recipes.']
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogData[slug || ''] || fallbackContent;

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />

      <article className="py-12 lg:py-20">
        <div className="container max-w-3xl">
          {/* Back */}
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          {/* Header */}
          <div className="text-center mb-10">
            <span className="text-6xl mb-4 block">{post.emoji}</span>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-xs font-accent uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded-full">{post.category}</span>
              <span className="text-xs text-muted-foreground">{post.date}</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground leading-tight">{post.title}</h1>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {post.content.map((para, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-6 text-base">{para}</p>
            ))}
          </div>

          {/* Share */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-border">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Share:</span>
              {[Facebook, Twitter, Share2].map((Icon, i) => (
                <button key={i} className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                  <Icon size={16} />
                </button>
              ))}
            </div>
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-terracotta transition-colors">
              <Heart size={16} /> Save Article
            </button>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-primary/5 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">Ready to Try These Herbs?</h3>
            <p className="text-sm text-muted-foreground mb-4">Explore our lab-tested, organic herbal products.</p>
            <Link to="/shop" className="inline-flex bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium text-sm hover:opacity-90 transition-opacity">
              Shop Now 🌿
            </Link>
          </div>
        </div>
      </article>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default BlogPost;
