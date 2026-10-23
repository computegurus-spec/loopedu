import React from 'react';
import { redirect } from 'next/navigation';
import { ParentObservabilityDashboard } from '@/components/parent/ParentObservabilityDashboard';
import { getSessionUser } from '@/lib/auth/session';

export const metadata = {
  title: 'Parent Observability Hub | LoopEdu',
  description: 'Monitor your child’s daily board preparation with calm observability. Real-time board readiness index, step accuracy, and weekly habit reports without nagging.',
};

export default async function ParentObservabilityPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect('/login?redirect=/parent');
  }

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6">
      <ParentObservabilityDashboard />
    </div>
  );
}
