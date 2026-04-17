import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';

const Blog = () => {
  // Blog posts
  const blogPosts = [
    {
      id: 1,
      title: "How to Own Your AI in 2025: A Practical Guide",
      excerpt: "As AI tools become embedded in every workflow, knowing what you actually own — and what owns you — has never been more critical. Here's how to take back control.",
      date: "May 12, 2025",
      category: "Ownership",
      author: "Alex Johnson",
      imageUrl: "/src/assets/patterns/grid.svg"
    },
    {
      id: 2,
      title: "The Legal Framework for AI Copyright: What You Need to Know",
      excerpt: "Understanding the evolving legal landscape around AI-generated content and intellectual property rights in 2025.",
      date: "April 28, 2025",
      category: "Legal",
      author: "Sandra Martinez",
      imageUrl: "/src/assets/patterns/grid.svg"
    },
    {
      id: 3,
      title: "AI Tool Sprawl: Why Most Businesses Don't Know What They're Using",
      excerpt: "The average business uses 14+ AI tools without a clear register. Here's what that means for your data, your IP, and your liability.",
      date: "April 10, 2025",
      category: "Technology",
      author: "Michael Chen",
      imageUrl: "/src/assets/patterns/grid.svg"
    },
    {
      id: 4,
      title: "From Chaos to Clarity: Building an AI Ownership Register",
      excerpt: "A step-by-step guide to mapping your AI stack, understanding what you own, and putting governance in place before regulators force you to.",
      date: "March 22, 2025",
      category: "Governance",
      author: "Rachel Williams",
      imageUrl: "/src/assets/patterns/grid.svg"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="pt-24 pb-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">AI Ownership Insights</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Expert articles, guides, and updates on owning your AI stack
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map(post => (
              <div key={post.id} className="border border-border rounded-xl overflow-hidden bg-background/50 hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span>{post.date}</span>
                    <span>&bull;</span>
                    <span className="text-primary">{post.category}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-3 leading-snug">{post.title}</h2>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">By {post.author}</span>
                    <Link
                      to={`/blog/${post.id}`}
                      className="flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      Read more <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center p-8 rounded-xl border border-border bg-background/50">
            <h3 className="text-xl font-bold mb-2">Stay updated with our latest articles</h3>
            <p className="text-muted-foreground mb-4">Get AI ownership insights delivered to your inbox</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border border-border rounded-md bg-background/50 flex-grow"
              />
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
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
