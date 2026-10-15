import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://boardedge.ai';

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/catalogue',
          '/challenge',
          '/samples',
          '/subject/*',
          '/about',
          '/contact',
          '/terms',
          '/privacy',
          '/refund',
          '/llms.txt',
          '/llms-full.txt',
        ],
        disallow: ['/study/*', '/library', '/admin/*', '/api/*'],
      },
      // GEO / AEO Explicitly Welcomed Crawlers (ChatGPT Search, Perplexity, Claude, Google SGE)
      {
        userAgent: ['GPTBot', 'PerplexityBot', 'ClaudeBot', 'Google-Extended', 'Applebot-Extended'],
        allow: ['/', '/catalogue', '/challenge', '/samples', '/subject/*', '/llms.txt', '/llms-full.txt'],
        disallow: ['/admin/*', '/api/*'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
