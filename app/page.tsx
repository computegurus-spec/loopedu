import React from 'react';
import { Metadata } from 'next';
import { EnterpriseHomePage } from '@/components/enterprise/EnterpriseHomePage';

export const metadata: Metadata = {
  title: 'LoopEdu Enterprise • India’s Exam & Career Intelligence Companion',
  description:
    'Authoritative statutory eligibility AST checker, 3-pathway career comparison with unbundled college cost calculators, and active 15-minute daily diagnostic practice. Built on gazette clarity, zero marketing telecalls, and fair modular pricing.',
  keywords: [
    'IIT JEE Main',
    'NEET UG',
    'UPSC CSE',
    'SSC CGL',
    'IBPS PO',
    'RRB NTPC',
    'CBSE Class 10',
    'CBSE Class 12',
    'Exam Eligibility AST',
    'College Cost Calculator',
    'Tele-MANAS',
  ],
};

export default function HomePage() {
  return <EnterpriseHomePage />;
}
