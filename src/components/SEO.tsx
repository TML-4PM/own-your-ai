
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "AI Brand Protection | Secure & Monetize Your AI Assets",
  description = "The first AI Brand Protection Service that helps businesses own, license, and secure their AI-generated content and likenesses. Start your free trial today.",
  keywords = "AI protection, brand protection, AI licensing, AI monetization, deepfake protection, AI authentication, digital rights",
  image = "/og-image.png",
  url = "https://aiprotect.com",
  type = "website"
}) => {
  const fullTitle = title.includes('|') ? title : `${title} | AI Brand Protection`;
  const fullUrl = url.startsWith('http') ? url : `https://aiprotect.com${url}`;
  const fullImage = image.startsWith('http') ? image : `https://aiprotect.com${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="AI Brand Protection" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="AI Brand Protection" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#6366f1" />
      <meta name="msapplication-TileColor" content="#6366f1" />
    </Helmet>
  );
};

export default SEO;
