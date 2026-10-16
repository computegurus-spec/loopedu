import { NextRequest } from 'next/server';

export function ensureAuth0Config(req?: NextRequest | Request) {
  if (!process.env.AUTH0_SECRET) {
    process.env.AUTH0_SECRET = '814b7e8832a8f3d6b052e424223f0fb711c2a1e3f892d19f6a4e5c8b7d9e1a3b';
  }
  if (!process.env.AUTH0_ISSUER_BASE_URL) {
    process.env.AUTH0_ISSUER_BASE_URL = 'https://dev-lyprc73sna08tv7e.us.auth0.com';
  }
  if (!process.env.AUTH0_CLIENT_ID) {
    process.env.AUTH0_CLIENT_ID = 'stT9wjVZmLdaaP1WWhgGU8EkueXomUjG';
  }
  if (!process.env.AUTH0_CLIENT_SECRET) {
    process.env.AUTH0_CLIENT_SECRET = '8tInbM-Z0-UL67cp6s7Kh9rK3YV4XtQI5ngIxtpgHV-DsI1FP6EBZB0rW6-eSkdl';
  }
  if (!process.env.AUTH0_BASE_URL) {
    if (req) {
      const host = req.headers.get('x-forwarded-host') || req.headers.get('host');
      const proto = req.headers.get('x-forwarded-proto') || (host?.includes('localhost') ? 'http' : 'https');
      if (host) {
        process.env.AUTH0_BASE_URL = `${proto}://${host}`;
      } else if (process.env.VERCEL_URL) {
        process.env.AUTH0_BASE_URL = `https://${process.env.VERCEL_URL}`;
      } else {
        process.env.AUTH0_BASE_URL = 'https://loopedu.vercel.app';
      }
    } else if (process.env.VERCEL_URL) {
      process.env.AUTH0_BASE_URL = `https://${process.env.VERCEL_URL}`;
    } else {
      process.env.AUTH0_BASE_URL = 'https://loopedu.vercel.app';
    }
  }
}
