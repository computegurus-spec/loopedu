import React from 'react';
import { getSessionUser } from '@/lib/auth/session';
import { MissionControlV3 } from '@/components/home/MissionControlV3';

export default async function HomePage() {
  const user = await getSessionUser();

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      <MissionControlV3 isLoggedIn={Boolean(user)} />
    </div>
  );
}
