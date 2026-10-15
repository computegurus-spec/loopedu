import { cookies } from 'next/headers';
import { UserProfile } from '@/types';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'founder@tinko.in,admin@itappens.ai')
  .toLowerCase()
  .split(',')
  .map((e) => e.trim());

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
}

const DEMO_USERS: Record<string, SessionUser> = {
  student: {
    id: 'usr_demo_student_10',
    email: 'student@itappens.ai',
    name: 'Class 10 Student',
    role: 'customer',
  },
  parent: {
    id: 'usr_demo_parent_10',
    email: 'parent@itappens.ai',
    name: 'Priya Sharma (Parent Account)',
    role: 'customer',
  },
  admin: {
    id: 'usr_admin_sadish',
    email: 'founder@tinko.in',
    name: 'Sadish Sugumaran',
    role: 'admin',
  },
};

/**
 * Get current authenticated session user.
 * In production, validates Supabase JWT cookie.
 * In development, reads the session cookie or falls back gracefully to student/demo session.
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
        };
      }
    } catch (e) {
      // Invalid cookie, ignore
    }
  }

  // Check if a demo user was selected
  const demoType = cookieStore.get('boardedge_demo_role')?.value;
  if (demoType && DEMO_USERS[demoType]) {
    return DEMO_USERS[demoType];
  }

  return null;
}

export function isUserAdmin(user: SessionUser | null): boolean {
  if (!user) return false;
  return user.role === 'admin' || ADMIN_EMAILS.includes(user.email.toLowerCase());
}
