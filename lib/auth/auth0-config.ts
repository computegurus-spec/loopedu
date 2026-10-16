import { NextRequest } from 'next/server';
import { initAuth0 } from '@auth0/nextjs-auth0';

export function getRequestOrigin(req?: NextRequest | Request): string {
  if (req) {
    const host = req.headers.get('x-forwarded-host') || req.headers.get('host');
    if (host) {
      const proto = req.headers.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');
      return `${proto}://${host}`;
    }
  }
  if (process.env.AUTH0_BASE_URL && !process.env.AUTH0_BASE_URL.includes('localhost')) {
    return process.env.AUTH0_BASE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return process.env.AUTH0_BASE_URL || 'https://loopedu.vercel.app';
}

export function getAuth0Instance(origin?: string) {
  const baseURL = origin || getRequestOrigin();
  return initAuth0({
    secret: process.env.AUTH0_SECRET || '814b7e8832a8f3d6b052e424223f0fb711c2a1e3f892d19f6a4e5c8b7d9e1a3b',
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL || 'https://dev-lyprc73sna08tv7e.us.auth0.com',
    baseURL,
    clientID: process.env.AUTH0_CLIENT_ID || 'stT9wjVZmLdaaP1WWhgGU8EkueXomUjG',
    clientSecret: process.env.AUTH0_CLIENT_SECRET || '8tInbM-Z0-UL67cp6s7Kh9rK3YV4XtQI5ngIxtpgHV-DsI1FP6EBZB0rW6-eSkdl',
  });
}

export function ensureAuth0Config(req?: NextRequest | Request): string {
  const origin = getRequestOrigin(req);
  process.env.AUTH0_BASE_URL = origin;
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
  return origin;
}
