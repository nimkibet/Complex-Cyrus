import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/', // Prevents bots from crawling your API routes
    },
    sitemap: 'https://seek-on.app/sitemap.xml',
  };
}
