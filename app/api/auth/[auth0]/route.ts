import { NextRequest } from 'next/server';
import { handleAuth } from '@auth0/nextjs-auth0';
import { ensureAuth0Config } from '@/lib/auth/auth0-config';

const authHandler = handleAuth();

export async function GET(req: NextRequest, ctx: any) {
  ensureAuth0Config(req);
  return authHandler(req, ctx);
}
