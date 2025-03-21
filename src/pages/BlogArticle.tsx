
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlurredBackground from '@/components/BlurredBackground';
import { ArrowLeft, Calendar, User, Tag, Share2 } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import NotFound from './NotFound';

// Blog articles data
const BLOG_ARTICLES = {
  'ai-voice-protection': {
    title: 'How Tech Giant Protected Their AI Voice Model',
    author: 'Sarah Johnson',
    date: 'March 15, 2023',
    category: 'Case Study',
    image: 'public/lovable-uploads/f96640a3-0318-4563-8c2d-a76bf255d2d2.png',
    excerpt: 'A leading technology company faced unauthorized use of their AI voice technology. Our protection services helped them secure their intellectual property.',
    content: [
      {
        type: 'paragraph',
        text: 'A Fortune 500 technology company approached us with a significant challenge: their AI voice models, which had taken years and millions of dollars to develop, were being used without authorization across various platforms. The company was losing both revenue and brand control as their voice technology was being misappropriated for unapproved applications, including potential deepfakes.'
      },
      {
        type: 'heading',
        text: 'The Challenge'
      },
      {
        type: 'paragraph',
        text: 'The company needed a comprehensive solution that would allow them to maintain control over their AI voice models while still enabling legitimate use cases. They required a way to detect unauthorized uses across the internet, implement technical protection measures, and enforce their intellectual property rights effectively.'
      },
      {
        type: 'heading',
        text: 'Our Approach'
      },
      {
        type: 'paragraph',
        text: 'We implemented a multi-layered protection strategy for the client:'
      },
      {
        type: 'list',
        items: [
          'Digital fingerprinting technology that could identify the AI voice model\'s unique characteristics',
          'Automated scanning system that continuously monitored for unauthorized usage across platforms',
          'Machine learning algorithms to detect even slightly altered versions of the protected voice',
          'Legal toolkit with pre-drafted takedown notices and licensing templates',
          'Blockchain-based verification system for authorized partners'
        ]
      },
      {
        type: 'heading',
        text: 'The Results'
      },
      {
        type: 'paragraph',
        text: 'Within six months of implementation, our client saw a 92% reduction in unauthorized use of their AI voice models. The company was able to identify and take action against hundreds of infringement cases, while simultaneously establishing new revenue streams through a structured licensing program for approved partners.'
      },
      {
        type: 'paragraph',
        text: 'The protection system now serves as a crucial component of their AI asset management strategy, allowing them to confidently develop and deploy new voice models with built-in protection from the start.'
      },
    ]
  },
  'financial-ai-monetization': {
    title: 'Financial Services Firm Monetizes AI Investment',
    author: 'Michael Chen',
    date: 'January 22, 2023',
    category: 'Case Study',
    image: 'public/lovable-uploads/243c1d81-b0a1-4c10-9c7d-cafaaa0da6e4.png',
    excerpt: 'This case study explores how a financial services company created new revenue streams by licensing their proprietary AI algorithms.',
    content: [
      {
        type: 'paragraph',
        text: 'A mid-sized financial services firm had invested heavily in developing sophisticated AI algorithms for risk assessment and fraud detection. These proprietary algorithms gave them a competitive edge, but they realized there was potential to monetize this technology beyond their core business, without compromising their market position.'
      },
      {
        type: 'heading',
        text: 'The Challenge'
      },
      {
        type: 'paragraph',
        text: 'The firm needed to create a licensing structure that would allow other businesses in adjacent (non-competing) industries to utilize their AI technology, while maintaining strong protection of their intellectual property and ensuring their algorithms couldn\'t be reverse-engineered.'
      },
      {
        type: 'heading',
        text: 'Our Approach'
      },
      {
        type: 'paragraph',
        text: 'We developed a comprehensive monetization strategy:'
      },
      {
        type: 'list',
        items: [
          'Created a secure API layer that allowed controlled access to the AI algorithms without exposing the underlying code',
          'Developed tiered licensing models for different types of businesses and use cases',
          'Implemented advanced monitoring and usage tracking to ensure compliance with licensing terms',
          'Designed a white-labeling solution for enterprise clients who needed to integrate the technology seamlessly',
          'Provided technical documentation and support systems for licensees'
        ]
      },
      {
        type: 'heading',
        text: 'The Results'
      },
      {
        type: 'paragraph',
        text: 'Within the first year of implementation, the company generated $2.4 million in licensing revenue from their AI assets, with minimal impact on their IT resources due to our automated systems. The licensing program now contributes approximately 18% of their annual revenue and has opened doors to strategic partnerships that benefit their core business.'
      },
      {
        type: 'paragraph',
        text: 'Most importantly, the company maintained complete control of their intellectual property, with no incidents of unauthorized use or algorithm theft, thanks to the robust protection measures we implemented.'
      },
    ]
  },
  'media-content-authentication': {
    title: 'Media Company Authenticates AI Content',
    author: 'Emma Wilson',
    date: 'February 8, 2023',
    category: 'Case Study',
    image: 'public/lovable-uploads/b89f579d-2891-4c16-b3f4-4e2c1c215b7a.png',
    excerpt: 'Learn how a global media company used blockchain verification to authenticate AI-generated content and prevent unauthorized distribution.',
    content: [
      {
        type: 'paragraph',
        text: 'A global media company with extensive investments in AI-generated content creation was facing challenges with content authentication and distribution control. Their AI-created images, videos, and articles were being reproduced across the internet without attribution or licensing, causing significant revenue losses.'
      },
      {
        type: 'heading',
        text: 'The Challenge'
      },
      {
        type: 'paragraph',
        text: 'The company needed a reliable way to authenticate their AI-generated content, prove ownership, track usage across platforms, and enable authorized partners to verify the authenticity of content they licensed. Traditional digital rights management solutions weren\'t adequate for the unique challenges of AI-generated content.'
      },
      {
        type: 'heading',
        text: 'Our Approach'
      },
      {
        type: 'paragraph',
        text: 'We implemented a blockchain-based authentication and verification system:'
      },
      {
        type: 'list',
        items: [
          'Developed an immutable blockchain ledger that recorded the creation and ownership details of each piece of AI-generated content',
          'Created a verification API that allowed distribution partners to instantly check content authenticity',
          'Implemented invisible watermarking technology specifically designed for AI-generated media',
          'Built a dashboard that tracked content distribution and usage across the internet',
          'Automated the licensing and rights management process for legitimate partners'
        ]
      },
      {
        type: 'heading',
        text: 'The Results'
      },
      {
        type: 'paragraph',
        text: 'The authentication system achieved a 100% verification success rate, allowing the media company to conclusively prove ownership of their AI-generated content. Unauthorized distribution decreased by 78% within three months, and the simplified licensing process led to a 45% increase in legitimate licensing partnerships.'
      },
      {
        type: 'paragraph',
        text: 'Additionally, the blockchain provenance records provided the company with a legally defensible proof of creation and ownership, strengthening their position in several intellectual property disputes and helping them recover damages from unauthorized commercial uses of their content.'
      },
    ]
  }
};

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? BLOG_ARTICLES[slug as keyof typeof BLOG_ARTICLES] : null;
  
  if (!article) {
    return <NotFound />;
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BlurredBackground />
      <Navbar />
      
      <main className="pt-24 pb-16 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Back to all articles</span>
          </Link>
          
          <div className="mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">{article.title}</h1>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                <span>{article.category}</span>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden mb-10 shadow-lg">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-96 object-cover"
              />
            </div>
            
            <p className="text-xl text-muted-foreground mb-10">{article.excerpt}</p>
            
            <div className="prose prose-lg max-w-none">
              {article.content.map((item, index) => {
                if (item.type === 'paragraph') {
                  return <p key={index} className="mb-6">{item.text}</p>;
                } else if (item.type === 'heading') {
                  return <h2 key={index} className="text-2xl font-bold mt-10 mb-4">{item.text}</h2>;
                } else if (item.type === 'list') {
                  return (
                    <ul key={index} className="my-6 space-y-2">
                      {item.items.map((listItem, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>{listItem}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                return null;
              })}
            </div>
          </div>
          
          <div className="border-t border-border pt-8 mt-12">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">Share this case study:</p>
              <div className="flex space-x-4">
                <button className="p-2 bg-background rounded-full hover:bg-muted transition-colors">
                  <Share2 className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-16 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to protect your AI assets?</h3>
            <p className="text-muted-foreground mb-6">
              Our team can help you implement similar solutions for your business.
            </p>
            <Link to="/get-started">
              <AnimatedButton>Get Started</AnimatedButton>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogArticle;
