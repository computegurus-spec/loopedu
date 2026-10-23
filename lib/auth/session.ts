import { cookies } from 'next/headers';
import { getAuth0Instance } from '@/lib/auth/auth0-config';
import { UserProfile } from '@/types';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'founder@tinko.in,admin@blocks-and-loops.com')
  .toLowerCase()
  .split(',')
  .map((e) => e.trim());

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  personaRole?: string;
  isPro?: boolean;
}

const DEMO_USERS: Record<string, SessionUser> = {
  student: {
    id: 'usr_demo_student_10',
    email: 'student@loopedu.in',
    name: 'Class 10 Student',
    role: 'customer',
    isPro: false,
  },
  admin: {
    id: 'usr_sadish_owner',
    email: 'sadish@loopedu.in',
    name: 'Sadish',
    role: 'admin',
    isPro: true,
  },
};

/**
 * Get current authenticated session user.
 * In production, validates session cookie or Supabase JWT.
 * Returns null if the visitor is not logged in.
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('boardedge_session')?.value;

  if (sessionCookie) {
    try {
      const parsed = JSON.parse(sessionCookie);
      if (parsed.email && parsed.id) {
        const isAdmin = ADMIN_EMAILS.includes(parsed.email.toLowerCase()) || parsed.role === 'admin';
        return {
          id: parsed.id,
          email: parsed.email,
          name: parsed.name || (isAdmin ? 'Admin' : 'Student'),
          role: isAdmin ? 'admin' : 'customer',
          isPro: Boolean(parsed.isPro || isAdmin),
        };
      }
    } catch (e) {
      // Invalid cookie, ignore
    }
  }

  // 2. Auth0 Social / Universal Login Session
  try {
    const auth0 = getAuth0Instance();
    const auth0Session = await auth0.getSession();
    if (auth0Session?.user) {
      const u = auth0Session.user;
      const email = (u.email || `${u.sub}@auth0.user`).toLowerCase();
      const isAdmin = ADMIN_EMAILS.includes(email);
      return {
        id: u.sub,
        email,
        name: u.name || u.nickname || (isAdmin ? 'Admin' : 'Student'),
        role: isAdmin ? 'admin' : 'customer',
        personaRole: isAdmin ? 'admin' : 'student',
        isPro: isAdmin,
      };
    }
  } catch (e) {
    // Auth0 not configured or no active session
  }

  // 3. Demo Mode Persona Fallback (Zero-credentials instant test sandbox)
  const isLive = cookieStore.get('loopedu_app_mode')?.value === 'live';
  if (!isLive) {
    const { DEMO_PERSONAS, DEFAULT_DEMO_PERSONA } = require('@/lib/demo/personas');
    const demoKey = cookieStore.get('loopedu_demo_persona')?.value;
    const persona = (demoKey && DEMO_PERSONAS[demoKey]) || DEFAULT_DEMO_PERSONA;
    const isAdmin = persona.role === 'admin' || persona.role === 'reviewer';
    return {
      id: persona.id,
      email: persona.email,
      name: persona.name,
      role: isAdmin ? 'admin' : 'customer',
      personaRole: persona.role,
      isPro: true,
    };
  }

  return null;
}

export function isUserAdmin(user: SessionUser | null): boolean {
  if (!user) return false;
  return user.role === 'admin' || ADMIN_EMAILS.includes(user.email.toLowerCase());
}
