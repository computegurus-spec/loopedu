import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'BoardEdge AI by itappens | Class 10 CBSE 2027 Practice Question Banks',
  description:
    '200 AI-curated practice questions per subject, with model answers and explanations. Prioritized using historical board-paper topic analysis. ₹999 per subject.',
  keywords: [
    'CBSE 2027',
    'Class 10 CBSE practice questions',
    'BoardEdge AI',
    'itappens',
    'Maths Standard 2027',
    'Maths Basic 2027',
    'Science Class 10 questions',
    'Social Science Class 10',
    'CBSE AI 417 question bank',
  ],
  authors: [{ name: 'itappens.ai' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://itappens.ai'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'BoardEdge AI by itappens | CBSE 2027 Practice Question Banks',
    description:
      'A little more focus. A lot more practice. 200 AI-curated practice questions per subject for Class 10 CBSE 2027 exams.',
    url: 'https://itappens.ai',
    siteName: 'BoardEdge AI by itappens',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-paper text-forest-900 selection:bg-limeaccent selection:text-forest-950">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
