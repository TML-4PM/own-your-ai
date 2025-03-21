
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlurredBackground from '@/components/BlurredBackground';
import { ArrowRight } from 'lucide-react';

const Blog = () => {
  // Sample blog posts
  const blogPosts = [
    {
      id: 1,
      title: "How to Protect Your AI-Generated Content in 2023",
      excerpt: "With the rise of AI-generated content, protecting your intellectual property has never been more important. Learn the essential steps to safeguard your AI assets.",
      date: "October 15, 2023",
      category: "Protection",
      author: "Alex Johnson",
      imageUrl: "/src/assets/patterns/grid.svg"
    },
    {
      id: 2,
      title: "The Legal Framework for AI Copyright: What You Need to Know",
      excerpt: "Understanding the evolving legal landscape around AI-generated content and intellectual property rights.",
      date: "September 28, 2023",
      category: "Legal",
      author: "Sandra Martinez",
      imageUrl: "/src/assets/patterns/grid.svg"
    },
    {
      id: 3,
      title: "Blockchain and AI: A Perfect Match for Content Protection",
      excerpt: "How blockchain technology is revolutionizing the way we verify ownership of AI-generated content.",
      date: "September 12, 2023",
      category: "Technology",
      author: "Michael Chen",
      imageUrl: "/src/assets/patterns/grid.svg"
    },
    {
      id: 4,
      title: "Case Study: How Company X Saved Millions by Protecting Their AI Assets",
      excerpt: "A real-world example of how proper AI protection measures prevented intellectual property theft and saved a company millions in revenue.",
      date: "August 30, 2023",
      category: "Case Study",
      author: "Rachel Williams",
      imageUrl: "/src/assets/patterns/grid.svg"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BlurredBackground />
      <Navbar />
      
      <main className="pt-24 pb-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">AI Protection Insights</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Expert articles, case studies, and updates on protecting your AI-generated intellectual property
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {blogPosts.map(post => (
              <article key={post.id} className="bg-background/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-gradient-to-br from-primary/20 via-blue-400/20 to-violet-500/20 relative">
                  <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url(${post.imageUrl})`, backgroundSize: "40px 40px" }}></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span className="text-primary">{post.category}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-3 hover:text-primary transition-colors">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">By {post.author}</span>
                    <Link to={`/blog/${post.id}`} className="flex items-center text-primary hover:underline text-sm">
                      <span>Read more</span>
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-muted-foreground mb-6">Stay updated with our latest articles and AI protection tips</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <input 
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border border-border rounded-md bg-background/50 flex-grow"
              />
              <button 
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
