import React from 'react';
import { Metadata } from 'next';
import { PublicLandingPage } from '@/components/landing/PublicLandingPage';

export const metadata: Metadata = {
  title: 'LoopEdu • India Exam & Career Companion | Tools, Pathways & Practice',
  description:
    'An information-first guide to LoopEdu tools. Compare career pathways after Class 10 & 12, verify national exam eligibility, and build consistent 15-minute daily study habits.',
};

export default function HomePage() {
  return <PublicLandingPage />;
}

