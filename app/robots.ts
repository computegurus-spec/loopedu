import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://itappens.ai';

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/catalogue', '/samples', '/subject/*', '/about', '/contact', '/terms', '/privacy', '/refund'],
      disallow: ['/study/*', '/library', '/admin/*', '/api/*'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
