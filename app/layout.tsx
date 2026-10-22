import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ChatWidget } from '@/components/ChatWidget';
import { MobileBottomNav } from '@/components/MobileBottomNav';

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://loopedu.in';

export const metadata: Metadata = {
  title: 'LoopEdu • The 15-Minute Daily Exam Habit | a product of itappens.ai',
  description:
    'The 15-minute daily habit platform for school and competitive exams. The Daily Five routine, active recall Mistake Comeback, and real-time Parent Observability. A product of itappens.ai | Blocks and Loops technologies pvt ltd - Bangalore, Karnataka.',
  keywords: [
    'LoopEdu',
    'loopedu.in',
    'CBSE Class 10 daily practice',
    'JEE Main daily practice',
    'NEET daily questions',
    'competitive exams daily habit',
    'Olympiad foundation',
    'The Daily Five',
    'Duolingo for exams',
    'Blocks and Loops technologies pvt ltd',
    'itappens.ai',
    'Maths Standard Code 041',
    'Maths Basic Code 241',
    'Science Class 10 daily questions',
    'Social Science Class 10 CBSE',
    'CBSE AI 417 question bank',
    'German Code 017 CBSE Class 10',
    'Parent Observability Hub',
    'NCERT step-marking solutions',
  ],
  authors: [{ name: 'Blocks and Loops technologies pvt ltd' }, { name: 'itappens.ai' }],
  creator: 'Blocks and Loops technologies pvt ltd',
  publisher: 'itappens.ai',
  metadataBase: new URL(appUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'LoopEdu • The 15-Minute Daily Exam Habit | a product of itappens.ai',
    description:
      'The 15-minute daily habit platform for school and competitive exams. The Daily Five routine, active recall Mistake Comeback, and real-time Parent Observability. ₹299/mo modular subscription.',
    url: appUrl,
    siteName: 'LoopEdu • loopedu.in',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // AEO / GEO Structured Data (JSON-LD) for AI Search & Generative Engines (Perplexity, ChatGPT, Gemini, Google SGE)
  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': `${appUrl}/#organization`,
        name: 'LoopEdu',
        url: appUrl,
        parentOrganization: {
          '@type': 'Organization',
          name: 'Blocks and Loops technologies pvt ltd',
          alternateName: 'itappens.ai',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Bangalore',
            addressRegion: 'Karnataka',
            addressCountry: 'IN',
          },
        },
        description:
          'AI-powered 15-minute daily habit platform for CBSE Class 10 board examinations. A product of itappens.ai | Blocks and Loops technologies pvt ltd - Bangalore, Karnataka.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bangalore',
          addressRegion: 'Karnataka',
          addressCountry: 'IN',
        },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${appUrl}/#application`,
        name: 'LoopEdu Daily Practice App',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Web, Android, iOS',
        offers: {
          '@type': 'Offer',
          price: '299.00',
          priceCurrency: 'INR',
          billingDuration: 'P1M',
          availability: 'https://schema.org/InStock',
        },
        featureList: [
          'The Daily Five bite-sized 15-minute routine',
          'The Mistake Comeback active recall vault with 3d, 7d, 14d spaced repetition',
          'The Parent Hub anti-micromanagement dashboard with Honesty Metre',
          'Unlockable 10-Year CBSE Board Question Bank chapter milestone PDFs',
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${appUrl}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is LoopEdu (loopedu.in)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'LoopEdu is a Duolingo-style 15-minute daily habit platform for CBSE Class 10 candidates. It features The Daily Five high-yield questions, an automated Mistake Comeback active recall engine, and a Parent Observability Hub. A product of itappens.ai | Blocks and Loops technologies pvt ltd - Bangalore, Karnataka.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is The Daily Five?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Every morning, the student receives exactly five high-yield questions tailored to their selected CBSE Class 10 subject tracks to prevent study fatigue. Completing the set multiplies streak XP, and finishing a unit loop unlocks the curated 10-Year Question Bank PDF.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does The Mistake Comeback active recall work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Every incorrectly answered question is automatically routed into a personalized Error Vault. It resurfaces at 3-day, 7-day, and 14-day intervals. A concept is cleared and marked Mastered only when solved correctly twice in a row without hints.',
            },
          },
          {
            '@type': 'Question',
            name: 'What does the Parent Hub display?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The Parent Hub offers an anti-micromanagement view answering whether the child completed today\'s path and which chapters are secure. Its Honesty Metre displays absolute questions attempted versus actual accuracy with automated weekly WhatsApp summary insights.',
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-paper text-forest-900 selection:bg-limeaccent selection:text-forest-950">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ChatWidget />
        <MobileBottomNav />
      </body>
    </html>
  );
}
