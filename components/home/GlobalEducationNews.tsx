'use client';

import React, { useState, useMemo } from 'react';
import {
  Globe,
  ExternalLink,
  Search,
  Calendar,
  Sparkles,
  BookOpen,
  GraduationCap,
  Award,
  Filter,
  ArrowUpRight,
  TrendingUp,
  Building,
} from 'lucide-react';

export interface EducationNewsItem {
  id: string;
  title: string;
  category: 'CBSE & Boards' | 'Competitive (JEE/NEET)' | 'Study Abroad' | 'Scholarships & Higher Ed';
  source: string;
  date: string;
  summary: string;
  sourceUrl: string;
  badgeColor: string;
}

const GLOBAL_EDUCATION_NEWS: EducationNewsItem[] = [
  {
    id: 'cbse-twice-a-year',
    title: 'CBSE Formally Implements Twice-a-Year Board Exams for Class 10 (NEP 2020)',
    category: 'CBSE & Boards',
    source: 'Hindustan Times / Ministry of Education',
    date: 'Updated Daily • Live Policy',
    summary:
      'Starting with the 2026 academic cycle, Class 10 students receive a mandatory Phase 1 board examination in Feb-March and an optional Phase 2 improvement exam in May-June. The best score between both attempts will be retained on the official marksheet to eliminate single-exam test anxiety.',
    sourceUrl: 'https://www.hindustantimes.com/education/board-exams',
    badgeColor: 'bg-blue-50 text-[#0066FF] border-blue-200',
  },
  {
    id: 'germany-indian-students-boom',
    title: 'Germany Emerges as Top Global Choice for Indian Students with 59,000+ Enrolled',
    category: 'Study Abroad',
    source: 'Economic Times / DAAD Germany',
    date: 'Global Student Wire',
    summary:
      'According to the German Academic Exchange Service (DAAD), Indian students have overtaken all other international cohorts in Germany. Zero or nominal public tuition fees, English-taught STEM master’s programs, and an 18-month post-study job seeker visa are driving exponential demand.',
    sourceUrl: 'https://economictimes.indiatimes.com/nri/study',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'jee-main-ncert-normalization',
    title: 'NTA JEE Main: Standardized Shift Normalization & NCERT Question Rationalization',
    category: 'Competitive (JEE/NEET)',
    source: 'The Hindu Education Plus',
    date: 'NTA Circular',
    summary:
      'The National Testing Agency has updated its percentile normalization guidelines across multi-shift sessions. The 2026 paper design adheres strictly to rationalized NCERT physics, chemistry, and mathematics syllabus guidelines, penalizing rote coaching shortcuts.',
    sourceUrl: 'https://jeemain.nta.nic.in',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  {
    id: 'us-f1-stem-opt',
    title: 'US Consulates Reaffirm 36-Month OPT for Indian STEM Graduates Amid Application Influx',
    category: 'Study Abroad',
    source: 'US Embassy Education Advisory',
    date: 'Study Abroad Wire',
    summary:
      'US Consulates in India emphasize academic intent and transparent financial documentation for F-1 visa interviews. Qualified graduates in STEM degrees (Computer Science, Data, Biotech) remain eligible for the 24-month STEM OPT extension on top of standard 12-month OPT.',
    sourceUrl: 'https://travel.state.gov/content/travel/en/us-visas/study.html',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'cuet-ug-single-shift',
    title: 'CUET-UG Adopts Single-Shift Testing for High-Volume Subjects to Prevent Score Skew',
    category: 'Competitive (JEE/NEET)',
    source: 'Indian Express Education',
    date: 'UGC Notification',
    summary:
      'To eliminate multi-day normalization score discrepancies, UGC and NTA conduct high-registration subjects (English, General Test, Commerce, Chemistry) in single-shift hybrid formats, ensuring equal difficulty for over 1.3 million candidates.',
    sourceUrl: 'https://cuetug.ntaonline.in',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  {
    id: 'uk-graduate-route-stability',
    title: 'UK Government Reconfirms 2-Year Graduate Route Work Visa for Indian University Grads',
    category: 'Study Abroad',
    source: 'The Hindu / UK Home Office',
    date: 'UK Higher Ed Bureau',
    summary:
      'Following a comprehensive review by the Migration Advisory Committee, the UK government has maintained the 2-year post-study work visa (3 years for doctoral graduates) for Indian students graduating from recognized UK higher education institutions.',
    sourceUrl: 'https://www.gov.uk/graduate-visa',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'neet-ug-security-protocols',
    title: 'NEET-UG: Biometric Digital Audits and Transparent Center Allotment Implemented',
    category: 'Competitive (JEE/NEET)',
    source: 'Times of India Education',
    date: 'Medical Council Bulletin',
    summary:
      'The National Medical Commission (NMC) and NTA have introduced biometric attendance, real-time CCTV feeds at all centers, and automated randomized question sequence distribution for the National Eligibility cum Entrance Test.',
    sourceUrl: 'https://neet.nta.nic.in',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  {
    id: 'iit-global-campuses-expanding',
    title: 'IIT Abu Dhabi & IIT Madras Zanzibar Announce Expanded Cohorts for Global Indians',
    category: 'Scholarships & Higher Ed',
    source: 'LiveMint Education',
    date: 'Global Indian Campuses',
    summary:
      'India’s premier engineering institutes are accelerating their global outreach. IIT Delhi Abu Dhabi and IIT Madras Zanzibar campus cohorts feature specialized programs in Energy Transitions, AI & Data Science, offering direct admission pathways for NRI and domestic Indian talent.',
    sourceUrl: 'https://www.livemint.com/education',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
];

export const GlobalEducationNews: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Updates');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All Updates',
    'CBSE & Boards',
    'Competitive (JEE/NEET)',
    'Study Abroad',
    'Scholarships & Higher Ed',
  ];

  const filteredNews = useMemo(() => {
    return GLOBAL_EDUCATION_NEWS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All Updates' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.source.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="education-news" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 border border-blue-200 text-[#0066FF]">
              <Globe className="w-3.5 h-3.5" />
              <span>GLOBAL EDUCATION WIRE • DAILY UPDATES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Education News for Indian Students Across the Globe
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Curated daily reporting on official CBSE circulars, national entrance exams (JEE, NEET, CUET), study abroad regulations in the US, UK, Germany, and scholarships worldwide. Click to read the full source coverage.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news, exams, countries..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:bg-white transition"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap border ${
                  isActive
                    ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredNews.map((news) => (
            <article
              key={news.id}
              className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/90 hover:border-blue-300 hover:bg-white hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${news.badgeColor}`}
                  >
                    {news.category}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{news.date}</span>
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-[#0066FF] transition-colors">
                  {news.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {news.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500 truncate max-w-[200px]">
                  Source: <span className="text-slate-800 font-bold">{news.source}</span>
                </span>

                <a
                  href={news.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0066FF] hover:text-blue-700 hover:underline transition"
                >
                  <span>Read Full Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12 rounded-3xl bg-slate-50 border border-slate-200 p-6 space-y-2">
            <p className="text-sm font-bold text-slate-700">No education updates found</p>
            <p className="text-xs text-slate-500">
              Try searching for &quot;CBSE&quot;, &quot;Germany&quot;, &quot;NEET&quot;, or reset your category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All Updates');
                setSearchQuery('');
              }}
              className="mt-2 text-xs font-bold text-[#0066FF] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
