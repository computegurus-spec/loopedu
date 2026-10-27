'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface CareerPathData {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  duration: string;
  targetColleges: string;
  costBreakdown: {
    tuition: number; // in Lakhs
    hostelLiving: number;
    mandatoryFees: number;
    prepMaterials: number;
    total: number;
  };
  backupRoute: {
    name: string;
    admissionVia: string;
    costSavings: string;
    careerParity: string;
  };
  practicalDiscoveryStep: string;
}

const COMPARISON_PATHS: CareerPathData[] = [
  {
    id: 'biomimetic-devices',
    title: 'Biomimetic Medical Devices',
    badge: 'High Healthcare Demand',
    tagline: 'Design prosthetics, neural interfaces, and cardiovascular robotic systems.',
    duration: '4 Years (B.Tech / B.E.)',
    targetColleges: 'IIT Madras, IIT Delhi, Manipal, VIT, IISc',
    costBreakdown: {
      tuition: 8.5,
      hostelLiving: 4.8,
      mandatoryFees: 0.8,
      prepMaterials: 0.6,
      total: 14.7,
    },
    backupRoute: {
      name: 'B.Sc / B.Tech in Biotechnology or Mechatronics via State CET / CUET',
      admissionVia: 'KEA KCET / MHT-CET / CUET UG',
      costSavings: '₹6.5 Lakhs Lower Outlay',
      careerParity: 'Direct lateral entry to Biomedical M.Tech / R&D without drop year.',
    },
    practicalDiscoveryStep: 'Analyze open-source 3D CAD prosthetic arm designs on GrabCAD (30-min exercise).',
  },
  {
    id: 'ai-software-systems',
    title: 'Distributed Software Systems & AI',
    badge: 'High Global Mobility',
    tagline: 'Architect cloud-native platforms, low-latency microservices, and autonomous agents.',
    duration: '4 Years (B.Tech / B.Sc CS)',
    targetColleges: 'IITs, NITs, BITS Pilani, IIIT Hyderabad',
    costBreakdown: {
      tuition: 10.0,
      hostelLiving: 5.2,
      mandatoryFees: 0.9,
      prepMaterials: 0.5,
      total: 16.6,
    },
    backupRoute: {
      name: 'B.Sc Data Science (IIT Madras Online) + Local BCA/B.Sc',
      admissionVia: 'Qualifier exam (No JEE required)',
      costSavings: '₹12.0 Lakhs Lower Outlay',
      careerParity: 'Identical software engineering industry recruitment and GitHub proof-of-work.',
    },
    practicalDiscoveryStep: 'Deploy a simple Next.js API endpoint with a database query on Vercel.',
  },
  {
    id: 'biomedical-genomics',
    title: 'Biomedical Research & Genomics',
    badge: 'Pure Science & R&D',
    tagline: 'Investigate CRISPR gene therapies, oncology markers, and personalized mRNA vaccines.',
    duration: '5 Years (BS-MS Dual Degree)',
    targetColleges: 'IISc Bangalore, IISERs, NISER, AIIMS R&D',
    costBreakdown: {
      tuition: 3.2,
      hostelLiving: 3.5,
      mandatoryFees: 0.5,
      prepMaterials: 0.4,
      total: 7.6,
    },
    backupRoute: {
      name: 'BS-MS at Central Universities via CUET-UG or German Public University',
      admissionVia: 'CUET UG / TestAS (Germany)',
      costSavings: 'Subsidized Zero-Tuition in Germany',
      careerParity: 'Direct eligibility for European PhD and industrial biotech research labs.',
    },
    practicalDiscoveryStep: 'Run a BLAST sequence alignment search on NCBI genome database for human insulin.',
  },
];

export function PathwayCostCalculatorWidget() {
  const [selectedPathId, setSelectedPathId] = useState('biomimetic-devices');
  const activePath = COMPARISON_PATHS.find(p => p.id === selectedPathId) || COMPARISON_PATHS[0];

  return (
    <section className="py-16 lg:py-24 bg-slate-900/40 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-teal-500/10 text-teal-400 text-xs font-semibold uppercase tracking-wider">
            Unbundled Financial Transparency
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Compare 3 Career Pathways & Real 4-Year Costs
          </h2>
          <p className="text-sm text-slate-400">
            Coaching institutes only quote tuition. LoopEdu unbundles tuition, hostel living, mandatory fees, and prep materials while automatically generating guaranteed backup routes.
          </p>
        </div>

        {/* 3 Pathway Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {COMPARISON_PATHS.map(path => {
            const isSelected = path.id === selectedPathId;
            return (
              <button
                key={path.id}
                onClick={() => setSelectedPathId(path.id)}
                className={`p-6 rounded-2xl text-left border transition relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-teal-500 shadow-xl shadow-teal-950/30 ring-1 ring-teal-500'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                      {path.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">{path.duration}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{path.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{path.tagline}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Est. 4-Yr Outlay:</span>
                  <span className="text-sm font-extrabold text-white">₹{path.costBreakdown.total.toFixed(1)} Lakhs</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Deep Dive Breakdown Card for Active Pathway */}
        <div className="rounded-3xl bg-slate-900 border border-slate-700/80 p-6 sm:p-10 shadow-2xl space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
                Unbundled Cost Breakdown (All-Inclusive Outlay)
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                {activePath.title} • {activePath.duration}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Target Institutions: <strong className="text-slate-200">{activePath.targetColleges}</strong>
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">Net Estimated Cost (4 Years)</div>
              <div className="text-3xl font-black text-emerald-400">
                ₹{activePath.costBreakdown.total.toFixed(1)} Lakhs
              </div>
            </div>
          </div>

          {/* Unbundled Cost Line Items */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs text-slate-400">Tuition Fees</div>
              <div className="text-lg font-bold text-white mt-1">₹{activePath.costBreakdown.tuition.toFixed(1)}L</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Direct institutional fees</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs text-slate-400">Hostel & Living</div>
              <div className="text-lg font-bold text-white mt-1">₹{activePath.costBreakdown.hostelLiving.toFixed(1)}L</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Room, mess & utilities</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs text-slate-400">Mandatory Charges</div>
              <div className="text-lg font-bold text-white mt-1">₹{activePath.costBreakdown.mandatoryFees.toFixed(1)}L</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Labs, library, exams</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs text-slate-400">Prep Materials</div>
              <div className="text-lg font-bold text-white mt-1">₹{activePath.costBreakdown.prepMaterials.toFixed(1)}L</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Laptops & diagnostic tools</div>
            </div>
          </div>

          {/* Guaranteed Backup Route Container */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-950 to-teal-950/40 border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Guaranteed Parallel Backup Route (No Drop Year Required)
              </span>
              <span className="text-xs font-semibold text-emerald-400 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                {activePath.backupRoute.costSavings}
              </span>
            </div>
            <h4 className="text-base font-bold text-white">
              {activePath.backupRoute.name}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
              <div>
                <span className="text-slate-400">Admission Process: </span>
                <span className="text-slate-200 font-medium">{activePath.backupRoute.admissionVia}</span>
              </div>
              <div>
                <span className="text-slate-400">Industry Career Parity: </span>
                <span className="text-slate-200 font-medium">{activePath.backupRoute.careerParity}</span>
              </div>
            </div>
          </div>

          {/* Practical Mini Project Step */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 font-bold flex items-center justify-center shrink-0">
                🔬
              </div>
              <div>
                <span className="font-semibold text-white">Practical Exploration Mini-Project: </span>
                <span className="text-slate-300">{activePath.practicalDiscoveryStep}</span>
              </div>
            </div>
            <Link
              href="/paths"
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 shrink-0 text-center transition"
            >
              Explore Full Pathways →
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
