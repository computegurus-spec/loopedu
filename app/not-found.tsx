import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] max-w-xl mx-auto px-4 flex flex-col items-center justify-center text-center space-y-5 py-20">
      <div className="w-12 h-12 rounded-xl bg-forest-100 text-forest-900 flex items-center justify-center font-bold text-lg font-serif">
        404
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-academic-subtle leading-relaxed">
          The requested page does not exist or was moved. Explore our Class 10 CBSE 2027 practice question catalogue below.
        </p>
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-forest-900 text-limeaccent font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider hover:bg-forest-800 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
        <Link
          href="/catalogue"
          className="inline-flex items-center gap-2 bg-white text-forest-900 border border-academic-border font-semibold px-5 py-2.5 rounded-xl text-xs hover:bg-paper-50 transition"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Explore Subjects (₹999)</span>
        </Link>
      </div>
    </div>
  );
}
