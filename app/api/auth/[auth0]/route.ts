import { NextRequest } from 'next/server';
import { handleAuth, handleCallback, handleLogout } from '@auth0/nextjs-auth0';
import { ensureAuth0Config } from '@/lib/auth/auth0-config';

export async function GET(req: NextRequest, ctx: any) {
  const origin = ensureAuth0Config(req);
  const route = ctx?.params?.auth0;

  if (route === 'callback') {
    return (handleCallback as any)(req, ctx, {
      redirectUri: `${origin}/api/auth/callback`,
    });
  }

  if (route === 'logout') {
    return (handleLogout as any)(req, ctx, {
      returnTo: `${origin}/`,
    });
  }

  return handleAuth()(req, ctx);
}
