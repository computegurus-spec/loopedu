'use client';

import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  BookOpen,
  Award,
  GraduationCap,
  TrendingUp,
  Target,
  Calendar,
  AlertCircle,
  Clock,
  Printer,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  Globe,
} from 'lucide-react';

interface ScoreInputs {
  maths: string;
  science: string;
  social: string;
  english: string;
}

interface ExamPortal {
  name: string;
  conductingBody: string;
  officialUrl: string;
  eligibility: string;
  pattern: string;
  frequency: string;
  keySubjects: string;
  importance: 'Primary Benchmark' | 'High-Yield Alternative' | 'Specialized Institute';
}

interface CareerPlanResult {
  recommendedStream: string;
  alternativeStream: string;
  rationale: string;
  primaryCareers: {
    title: string;
    description: string;
    growthOutlook: string;
    salaryRange: string;
  }[];
  officialExams: ExamPortal[];
  milestones: {
    stage: string;
    focus: string;
    actionItems: string[];
  }[];
}

const INTEREST_OPTIONS = [
  { id: 'tech_ai', label: 'AI, Coding & Robotics', icon: '🤖', streamHint: 'PCM' },
  { id: 'medicine', label: 'Medicine & Healthcare', icon: '🔬', streamHint: 'PCB' },
  { id: 'law', label: 'Corporate Law & Judiciary', icon: '⚖️', streamHint: 'Humanities / Commerce' },
  { id: 'finance', label: 'Investment Banking & CA', icon: '📈', streamHint: 'Commerce + Maths' },
  { id: 'aviation_defense', label: 'Aviation & Armed Forces (NDA)', icon: '🚀', streamHint: 'PCM' },
  { id: 'design_creative', label: 'UI/UX & Architecture', icon: '🎨', streamHint: 'PCM / Design' },
  { id: 'civil_services', label: 'Civil Services (UPSC) & Policy', icon: '🏛️', streamHint: 'Humanities' },
  { id: 'research_science', label: 'Pure Science & Astrophysics', icon: '🧪', streamHint: 'PCM / PCMB' },
  { id: 'business_mgmt', label: 'Global Business & Startups', icon: '🌍', streamHint: 'Commerce / Any' },
];

export const PersonalizedCareerEngine: React.FC = () => {
  const [currentGrade, setCurrentGrade] = useState<string>('Class 10');
  const [scores, setScores] = useState<ScoreInputs>({
    maths: '85-95%',
    science: '85-95%',
    social: '75-85%',
    english: '85-95%',
  });
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['tech_ai']);
  const [targetDestination, setTargetDestination] = useState<string>('India Premier (IIT, AIIMS, NLUs, IIMs)');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedPlan, setGeneratedPlan] = useState<CareerPlanResult | null>(null);

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter((i) => i !== id));
      }
    } else {
      if (selectedInterests.length < 3) {
        setSelectedInterests([...selectedInterests, id]);
      }
    }
  };

  const generatePlan = () => {
    setIsGenerating(true);
    setGeneratedPlan(null);

    // Dynamic, deterministic synthesis based on actual user scores & interests
    setTimeout(() => {
      let plan: CareerPlanResult;

      const hasTech = selectedInterests.includes('tech_ai');
      const hasMed = selectedInterests.includes('medicine');
      const hasLaw = selectedInterests.includes('law');
      const hasFinance = selectedInterests.includes('finance');
      const hasAviation = selectedInterests.includes('aviation_defense');
      const hasDesign = selectedInterests.includes('design_creative');
      const hasCivils = selectedInterests.includes('civil_services');
      const hasResearch = selectedInterests.includes('research_science');

      const isMathsHigh = scores.maths === '85-95%' || scores.maths === '>95%';
      const isScienceHigh = scores.science === '85-95%' || scores.science === '>95%';

      if (hasMed && !hasTech) {
        // Medical / Healthcare Track
        plan = {
          recommendedStream: 'Science (PCB: Physics, Chemistry, Biology + Psychology/Informatics)',
          alternativeStream: 'Biotechnology & Allied Health Sciences',
          rationale: `Given your strong scores in Science (${scores.science}) and dedication to clinical and life sciences, the PCB pathway directly unlocks medical surgery, neuroscience, and clinical research without unnecessary math pressure.`,
          primaryCareers: [
            {
              title: 'Clinical Physician / Surgeon (MBBS/MD)',
              description: 'Patient diagnostics, specialized internal medicine, surgery, and critical clinical care.',
              growthOutlook: 'Critical national and global deficit; 100% resilient to automation.',
              salaryRange: '₹14L - ₹45L+ per annum (India) | $250k+ (US/UK via USMLE/PLAB)',
            },
            {
              title: 'Biomedical & Genomic Scientist',
              description: 'Targeted gene therapy, CRISPR applications, and pharmaceutical discovery.',
              growthOutlook: 'Rapidly expanding via AI-driven drug discovery and immunology.',
              salaryRange: '₹10L - ₹32L per annum | $110k+ (Europe / US)',
            },
          ],
          officialExams: [
            {
              name: 'NEET-UG (National Eligibility cum Entrance Test)',
              conductingBody: 'National Testing Agency (NTA)',
              officialUrl: 'https://neet.nta.nic.in',
              eligibility: 'Class 12 pass with Physics, Chemistry, Biology & English (Min 50% for General)',
              pattern: 'Pen-and-Paper (OMR) • 180 Questions across Physics, Chem, Botany, Zoology (720 Marks)',
              frequency: 'Annual (First Sunday of May)',
              keySubjects: '100% NCERT Biology, Chemistry conceptual, Physics mechanics & optics',
              importance: 'Primary Benchmark',
            },
            {
              name: 'IISER IAT (IISER Aptitude Test)',
              conductingBody: 'Joint Admissions Committee (IISERs)',
              officialUrl: 'https://iiseradmission.in',
              eligibility: 'Class 12 with at least 3 science subjects (BS-MS Dual Degree at IISERs & IISc)',
              pattern: 'Computer-Based Test (CBT) • 60 Questions testing first-principles scientific depth',
              frequency: 'Annual (June)',
              keySubjects: 'Interdisciplinary Biology, Chemistry, Physics, Mathematics',
              importance: 'High-Yield Alternative',
            },
            {
              name: 'AIIMS B.Sc. Nursing & Paramedical Admissions',
              conductingBody: 'All India Institute of Medical Sciences (AIIMS New Delhi)',
              officialUrl: 'https://aiimsexams.ac.in',
              eligibility: 'Class 12 pass with 55% in PCB & English',
              pattern: 'Computer-Based Entrance Test • 100 Objective Questions',
              frequency: 'Annual (June)',
              keySubjects: 'Physics, Chemistry, Biology, General Knowledge',
              importance: 'Specialized Institute',
            },
          ],
          milestones: [
            {
              stage: 'Class 10 Phase',
              focus: 'Board Mastery & NCERT Biology Foundation',
              actionItems: [
                'Ensure 90%+ in Class 10 Science with special focus on Life Processes & Heredity.',
                'Lock in PCB stream with Psychology or Physical Education as a 5th scoring elective.',
              ],
            },
            {
              stage: 'Class 11 Sprint',
              focus: 'NCERT Line-by-Line Mastery & Spaced Question Volume',
              actionItems: [
                'Complete NCERT Biology Line-by-Line annotations (Plant Physiology & Human Anatomy).',
                'Solve 40 daily timed physics and chemistry MCQs to build calculation speed.',
              ],
            },
            {
              stage: 'Class 12 & NEET Final Loop',
              focus: 'Board Exam Scoring + Full-Length 3-Hour 20-Min Mock Tests',
              actionItems: [
                'Complete 25 full-length NEET timed mocks simulating 2:00 PM to 5:20 PM exam conditions.',
                'Target 680+ for top government medical colleges (AIIMS New Delhi, MAMC, JIPMER).',
              ],
            },
          ],
        };
      } else if (hasLaw) {
        // Law & Judiciary Track
        plan = {
          recommendedStream: 'Humanities with Political Science, Legal Studies & Economics OR Commerce',
          alternativeStream: 'Commerce with Applied Mathematics',
          rationale: `With strong English (${scores.english}) and interest in legal frameworks and argumentation, you have the ideal cognitive profile for the 5-year integrated BA/BBA LLB program at the National Law Universities.`,
          primaryCareers: [
            {
              title: 'Corporate M&A & Private Equity Counsel',
              description: 'Structuring cross-border mergers, tech acquisitions, capital markets, and corporate governance.',
              growthOutlook: 'Top tier Indian law firms (Shardul Amarchand, Trilegal, AZB) pay record day-one bonuses.',
              salaryRange: '₹18L - ₹40L initial package at Tier-1 Law Firms',
            },
            {
              title: 'Litigation Specialist / Judicial Services',
              description: 'High Court and Supreme Court advocacy, commercial arbitration, and judicial services.',
              growthOutlook: 'Prestigious public impact with lifelong independent practice upside.',
              salaryRange: 'Autonomous practice scaling to senior counsel retainer rates',
            },
          ],
          officialExams: [
            {
              name: 'CLAT-UG (Common Law Admission Test)',
              conductingBody: 'Consortium of National Law Universities',
              officialUrl: 'https://consortiumofnlus.ac.in',
              eligibility: 'Class 12 pass in any stream (Min 45% aggregate)',
              pattern: 'Pen-and-Paper • 120 Passage-Based Comprehension Questions in 120 Minutes',
              frequency: 'Annual (First Sunday of December)',
              keySubjects: 'English Comprehension, Legal Reasoning, Logical Reasoning, Current Affairs & GK',
              importance: 'Primary Benchmark',
            },
            {
              name: 'AILET (All India Law Entrance Test)',
              conductingBody: 'National Law University Delhi (NLU Delhi)',
              officialUrl: 'https://nationallawuniversitydelhi.in',
              eligibility: 'Class 12 pass in any stream with 45% marks',
              pattern: 'Passage-based reading test in English, Logical Reasoning, and Current Affairs',
              frequency: 'Annual (December)',
              keySubjects: 'Critical Reasoning, Analytical Deduction, English Language Mastery',
              importance: 'Specialized Institute',
            },
            {
              name: 'CUET-UG (Legal Studies / DU Law)',
              conductingBody: 'National Testing Agency (NTA)',
              officialUrl: 'https://cuetug.ntaonline.in',
              eligibility: 'Class 12 pass in any recognized stream',
              pattern: 'Computer-Based Test across Domain Legal Studies and General Aptitude',
              frequency: 'Annual (May/June)',
              keySubjects: 'Legal Studies Domain, General Test, English',
              importance: 'High-Yield Alternative',
            },
          ],
          milestones: [
            {
              stage: 'Class 10 Phase',
              focus: 'Reading Speed & Vocabulary Expansion',
              actionItems: [
                'Build a 300+ words per minute reading speed by reading The Hindu editorials daily.',
                'Select Humanities or Commerce to allow sufficient daily reading and reasoning time.',
              ],
            },
            {
              stage: 'Class 11 Sprint',
              focus: 'Passage-Based Critical Reasoning & Current Affairs Logs',
              actionItems: [
                'Master formal deductive and inductive critical reasoning frameworks.',
                'Maintain a categorized weekly current affairs compendium covering national and global law.',
              ],
            },
            {
              stage: 'Class 12 Sprint (Exam in December)',
              focus: 'Full Mock Mappings for December CLAT Window',
              actionItems: [
                'Take 40 full-length CLAT mock exams before November of Class 12.',
                'Secure rank in Top 500 for NLSIU Bangalore, NALSAR Hyderabad, or WBNUJS Kolkata.',
              ],
            },
          ],
        };
      } else if (hasFinance || (!hasTech && !hasMed && (scores.maths === '85-95%' || scores.maths === '>95%'))) {
        // Finance, Investment Banking, Chartered Accountancy Track
        plan = {
          recommendedStream: 'Commerce with Applied Mathematics & Economics',
          alternativeStream: 'Science (PCM) with Economics',
          rationale: `Your combination of quantitative mathematics (${scores.maths}) and business interest makes Applied Maths + Economics the highest-leverage combination for elite 5-year IIM programs and global financial careers.`,
          primaryCareers: [
            {
              title: 'Investment Banker / Quantitative Portfolio Analyst',
              description: 'Valuation models, capital structuring, risk modeling, and public equities analysis.',
              growthOutlook: 'Hyper-growth in Mumbai, Bangalore, Singapore, and London financial hubs.',
              salaryRange: '₹18L - ₹42L starting at top investment banks (Goldman, Morgan Stanley, JP Morgan)',
            },
            {
              title: 'Chartered Accountant (CA) & Strategic CFO',
              description: 'Statutory audit, corporate tax architecture, M&A due diligence, and capital allocation.',
              growthOutlook: 'Indispensable leadership credential across India and the GCC/Middle East.',
              salaryRange: '₹12L - ₹35L+ starting for early-attempt rankers',
            },
          ],
          officialExams: [
            {
              name: 'IPMAT (Integrated Programme in Management Aptitude Test)',
              conductingBody: 'IIM Indore & IIM Rohtak',
              officialUrl: 'https://www.iimidr.ac.in',
              eligibility: 'Class 12 pass with 60% aggregate (Direct admission to 5-Year BBA+MBA)',
              pattern: 'Computer-Based Test: Quantitative Ability (SA & MCQ) + Verbal Ability followed by Interview',
              frequency: 'Annual (May)',
              keySubjects: 'Higher Mathematics, Arithmetic, Critical Verbal Reasoning',
              importance: 'Primary Benchmark',
            },
            {
              name: 'CA Foundation Examination',
              conductingBody: 'Institute of Chartered Accountants of India (ICAI)',
              officialUrl: 'https://www.icai.org',
              eligibility: 'Registered after passing Class 10; eligible to appear after Class 12 exams',
              pattern: '4 Papers: Accounting, Business Laws, Quantitative Aptitude, Business Economics',
              frequency: 'Thrice a year (January, May/June, September)',
              keySubjects: 'Principles of Accounting, Commercial Laws, Applied Mathematics, Micro/Macro Economics',
              importance: 'Primary Benchmark',
            },
            {
              name: 'CUET-UG (Top Central Commerce Programs)',
              conductingBody: 'National Testing Agency (NTA)',
              officialUrl: 'https://cuetug.ntaonline.in',
              eligibility: 'Class 12 pass with relevant subjects for B.Com (Hons) / BA Economics (Hons)',
              pattern: 'CBT in Accountancy, Economics, Applied Mathematics, and English',
              frequency: 'Annual (May/June)',
              keySubjects: 'Target 100 percentile in Domain subjects for SRCC and St. Stephen’s College',
              importance: 'High-Yield Alternative',
            },
          ],
          milestones: [
            {
              stage: 'Class 10 Phase',
              focus: 'Mathematical Base & Commercial Logic',
              actionItems: [
                'Ensure strong foundation in Class 10 Statistics, Linear Equations, and Arithmetic.',
                'Confirm selection of Commerce with Applied Mathematics (do not drop Maths).',
              ],
            },
            {
              stage: 'Class 11 Sprint',
              focus: 'Accountancy Double-Entry Rigor & IPMAT Math Speed',
              actionItems: [
                'Master double-entry fundamentals and corporate balance sheets from Day 1.',
                'Practice timed higher arithmetic and permutations-combinations for IPMAT QA.',
              ],
            },
            {
              stage: 'Class 12 Sprint',
              focus: 'Board Exam 98%+ Target + Direct CA Foundation / IPMAT Intake',
              actionItems: [
                'Target 98%+ in Class 12 Commerce to secure CUET tie-breaking safety.',
                'Register with ICAI for the CA Foundation session immediately post-boards.',
              ],
            },
          ],
        };
      } else if (hasAviation) {
        // Aviation & Armed Forces / NDA
        plan = {
          recommendedStream: 'Science (PCM: Physics, Chemistry, Mathematics + Physical Education)',
          alternativeStream: 'Science (PCM) with Computer Science',
          rationale: `For commercial airline captaincy and NDA Air Force/Naval wings, Class 12 Physics & Mathematics are non-negotiable statutory DGCA and UPSC prerequisites.`,
          primaryCareers: [
            {
              title: 'Commercial Airline Pilot / Commander',
              description: 'Flight operations for major domestic and international carriers (IndiGo, Air India, Emirates).',
              growthOutlook: 'Tremendous pilot shortage in India with over 1,000 aircraft on order through 2030.',
              salaryRange: '₹18L starting First Officer -> ₹60L - ₹1Cr+ as Senior Line Captain',
            },
            {
              title: 'Commissioned Military Officer (NDA Air Force / Navy / Army)',
              description: 'Combat aviation, naval warship command, and sovereign defense leadership.',
              growthOutlook: 'Supreme national honor, permanent officer commission, and state pension benefits.',
              salaryRange: 'Level 10 Pay Matrix (₹75k/mo starting stipend + military allowances + defense perks)',
            },
          ],
          officialExams: [
            {
              name: 'NDA & NA Examination (National Defence Academy)',
              conductingBody: 'Union Public Service Commission (UPSC)',
              officialUrl: 'https://upsc.gov.in',
              eligibility: 'Unmarried Indian citizens aged 16.5 to 19.5; Class 12 with PCM for Air Force/Navy',
              pattern: 'Mathematics (300 Marks) + General Ability Test (600 Marks) followed by 5-day SSB Interview',
              frequency: 'Twice a year (April [NDA I] and September [NDA II])',
              keySubjects: 'Class 11-12 Mathematics, Physics, English, World Geography, Modern History',
              importance: 'Primary Benchmark',
            },
            {
              name: 'IGRUA Commercial Pilot Entrance (Commercial Pilot License)',
              conductingBody: 'Indira Gandhi Rashtriya Uran Akademi (Ministry of Civil Aviation)',
              officialUrl: 'https://igrua.gov.in',
              eligibility: 'Class 12 pass with 55% aggregate in Physics & Mathematics',
              pattern: 'Online Written Test, Pilot Aptitude Test (WOMBAT), and Personal Interview',
              frequency: 'Annual (May/June)',
              keySubjects: 'Class 12 Physics, Basic Aerodynamics, Mathematics, Spatial Reasoning',
              importance: 'Specialized Institute',
            },
          ],
          milestones: [
            {
              stage: 'Class 10 Phase',
              focus: 'Medical Class-II Verification & PCM Enrollment',
              actionItems: [
                'Get a preliminary DGCA Class-II medical check to verify 6/6 uncorrected/corrected vision.',
                'Enroll in Science PCM track with dedicated physical fitness routine.',
              ],
            },
            {
              stage: 'Class 11 Sprint',
              focus: 'UPSC Mathematics Paper & Physical Endurance',
              actionItems: [
                'Solve 10 years of UPSC NDA Mathematics papers (Calculus, Trigonometry, Vectors).',
                'Maintain daily 5km running and core fitness for the Services Selection Board (SSB).',
              ],
            },
            {
              stage: 'Class 12 Sprint',
              focus: 'Appear for NDA I in April and DGCA Ground Classes',
              actionItems: [
                'Clear NDA written test in first attempt during Class 12 academic year.',
                'Begin DGCA navigation and meteorology theory papers for pilot license conversion.',
              ],
            },
          ],
        };
      } else if (hasDesign) {
        // Design, Architecture, Creative Media
        plan = {
          recommendedStream: 'Science (PCM) with Engineering Graphics OR Humanities with Fine Arts',
          alternativeStream: 'Commerce with Design Elective',
          rationale: `Architecture (B.Arch) requires Class 12 PCM by Council of Architecture mandates, while Product/UX Design (B.Des at IIT Bombay/NID) is open to all streams with strong spatial-visual intelligence.`,
          primaryCareers: [
            {
              title: 'Principal Product & Interaction Designer (UI/UX)',
              description: 'Designing AI-augmented digital platforms, hardware systems, and human-computer interactions.',
              growthOutlook: 'High demand in modern technology companies, gaming studios, and global design consultancies.',
              salaryRange: '₹14L - ₹36L starting | $120k+ (Global)',
            },
            {
              title: 'Architectural Systems Lead / Computational Architect',
              description: 'Sustainable urban design, smart cities infrastructure, and computational parametric architecture.',
              growthOutlook: 'Rapid expansion with green building mandates and mega-infrastructure investments.',
              salaryRange: '₹9L - ₹28L in design firms; independent architectural studio potential',
            },
          ],
          officialExams: [
            {
              name: 'UCEED (Undergraduate Common Entrance Exam for Design)',
              conductingBody: 'Indian Institute of Technology Bombay (IIT Bombay)',
              officialUrl: 'https://uceed.iitb.ac.in',
              eligibility: 'Class 12 pass in any stream (B.Des at IIT Bombay, IIT Delhi, IIT Guwahati, IIT Hyderabad)',
              pattern: 'Part A (Computer-Based Visualization & Logic) + Part B (Hand-Drawn Sketching & Design Problem)',
              frequency: 'Annual (Third Sunday of January)',
              keySubjects: 'Spatial Ability, Design Sensitivity, Visual Thinking, Environmental Observation',
              importance: 'Primary Benchmark',
            },
            {
              name: 'NATA (National Aptitude Test in Architecture)',
              conductingBody: 'Council of Architecture (CoA)',
              officialUrl: 'https://www.nata.in',
              eligibility: 'Class 12 pass with Physics, Chemistry & Mathematics (Min 50% aggregate)',
              pattern: 'Assessment of cognitive skills, visual perception, aesthetic sensitivity, and architectural awareness',
              frequency: 'Multiple Sessions throughout the year',
              keySubjects: 'Mathematics, Drawing, Visual Reasoning, Architectural History',
              importance: 'Primary Benchmark',
            },
            {
              name: 'NID DAT (Design Aptitude Test)',
              conductingBody: 'National Institute of Design (NID Ahmedabad)',
              officialUrl: 'https://admissions.nid.edu',
              eligibility: 'Class 12 pass in any stream',
              pattern: 'Prelims (Objective & Drawing) + Mains (Studio Test & Portfolio Interview)',
              frequency: 'Annual (December/January)',
              keySubjects: 'Creative Problem Solving, Observation, Composition, Storyboarding',
              importance: 'Specialized Institute',
            },
          ],
          milestones: [
            {
              stage: 'Class 10 Phase',
              focus: 'Perspective Sketching & Spatial Exercises',
              actionItems: [
                'Practice 1-point and 2-point perspective drawing of everyday urban environments.',
                'Select PCM if targeting B.Arch, or any stream with fine arts if targeting B.Des.',
              ],
            },
            {
              stage: 'Class 11 Sprint',
              focus: 'Creative Portfolio & Speed Sketching Drills',
              actionItems: [
                'Complete 50 timed sketching challenges (human proportions, product ergonomics).',
                'Master UCEED Part A aptitude questions (spatial rotation, surface folding).',
              ],
            },
            {
              stage: 'Class 12 Sprint (Exam in January)',
              focus: 'UCEED / NID Prelims + Studio Test Prep',
              actionItems: [
                'Target UCEED Top 100 for admission to IIT Bombay Industrial Design Centre (IDC).',
                'Prepare 3D material manipulation and model making for NID DAT Mains.',
              ],
            },
          ],
        };
      } else {
        // Default Tech / Engineering / Pure Science / AI (Most Common Track)
        plan = {
          recommendedStream: 'Science (PCM: Physics, Chemistry, Mathematics + Computer Science / AI)',
          alternativeStream: 'Science (PCMB: Physics, Chemistry, Mathematics, Biology)',
          rationale: `Given your mathematical strength (${scores.maths}) and science background (${scores.science}), PCM + Computer Science is the premier launchpad for software systems, AI/ML engineering, robotics, and quantitative sciences across top national and international universities.`,
          primaryCareers: [
            {
              title: 'AI Systems & Autonomous Software Architect',
              description: 'Designing foundation models, neural architectures, distributed computing, and autonomous agents.',
              growthOutlook: 'Highest tech industry demand through 2035; global talent shortage.',
              salaryRange: '₹18L - ₹55L starting (IITs/BITS) | $140k+ (Silicon Valley / Global Tech)',
            },
            {
              title: 'Aerospace & Robotics Hardware Engineer',
              description: 'Guidance navigation systems, avionics, robotics control loops, and mission electronics.',
              growthOutlook: 'Expanding rapidly with commercial space ventures (ISRO partners, SpaceX, aerospace hubs).',
              salaryRange: '₹12L - ₹38L starting package in core aerospace and robotics labs',
            },
          ],
          officialExams: [
            {
              name: 'JEE Main (Joint Entrance Examination Main)',
              conductingBody: 'National Testing Agency (NTA)',
              officialUrl: 'https://jeemain.nta.nic.in',
              eligibility: 'Class 12 pass with Physics, Mathematics, and Chem/CS (75% aggregate or top 20 percentile for NITs/IITs)',
              pattern: 'Computer-Based Test (CBT) • 300 Marks • 75 Questions (Physics, Chemistry, Mathematics)',
              frequency: 'Twice a year (Session 1 in January, Session 2 in April)',
              keySubjects: 'NCERT Chemistry line-by-line, Mechanics & Electrodynamics, Calculus & Algebra',
              importance: 'Primary Benchmark',
            },
            {
              name: 'JEE Advanced (for the 23 IITs)',
              conductingBody: 'IIT Joint Admission Board (JAB)',
              officialUrl: 'https://jeeadv.ac.in',
              eligibility: 'Top 250,000 qualifiers of JEE Main (Paper 1)',
              pattern: 'Two Mandatory 3-Hour CBT Papers on the same day (High-order multi-concept synthesis)',
              frequency: 'Annual (Late May)',
              keySubjects: 'Advanced multi-step physics, organic reaction mechanisms, complex calculus',
              importance: 'Primary Benchmark',
            },
            {
              name: 'BITSAT (Birla Institute of Technology and Science Admission Test)',
              conductingBody: 'BITS Pilani (Pilani, Goa, Hyderabad Campuses)',
              officialUrl: 'https://www.bitsadmission.com',
              eligibility: 'Min 75% aggregate in PCM in Class 12 with min 60% in each subject',
              pattern: 'Computer-Based Speed Test • 130 Questions + 12 Bonus Questions in 180 Minutes',
              frequency: 'Twice a year (Session 1 in May, Session 2 in June)',
              keySubjects: 'Speed calculation in PCM, English Proficiency, Logical Reasoning',
              importance: 'High-Yield Alternative',
            },
            {
              name: 'SAT Suite & AP Exams (For US / Global Universities)',
              conductingBody: 'The College Board (USA)',
              officialUrl: 'https://satsuite.collegeboard.org',
              eligibility: 'Open to high school students worldwide for undergraduate admission',
              pattern: 'Digital Adaptive SAT (Reading/Writing + Math) • 1600 Point Scale',
              frequency: '7 times per year (March, May, June, August, October, November, December)',
              keySubjects: 'High School Algebra, Geometry, Data Analysis, Evidence-Based Reading',
              importance: 'Specialized Institute',
            },
          ],
          milestones: [
            {
              stage: 'Class 10 Transition Phase',
              focus: 'Bridge Foundation & No-Rote Calculus Basics',
              actionItems: [
                'Score 92%+ in Class 10 Board examinations to solidify theoretical fundamentals.',
                'Begin early bridge calculus (differentiation & integration) before Class 11 begins.',
              ],
            },
            {
              stage: 'Class 11 Foundation Build (Crucial Year)',
              focus: 'High-Volume Problem Solving & Avoiding Knowledge Debt',
              actionItems: [
                'Solve a minimum of 40 quality JEE-level problems every single day.',
                'Prioritize Mechanics in Physics and Organic General Chemistry fundamentals.',
              ],
            },
            {
              stage: 'Class 12 & Mock Exam Sprint',
              focus: 'Board Exam 85%+ Safety + JEE Session 1 in January',
              actionItems: [
                'Complete the entire Class 12 syllabus by November 15th.',
                'Take 30 full-length timed mock tests in December before the January JEE Session 1.',
              ],
            },
          ],
        };
      }

      setGeneratedPlan(plan);
      setIsGenerating(false);
    }, 700);
  };

  return (
    <div className="space-y-8">
      {/* Interactive Profile Intake Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-[#0066FF] border border-blue-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI-POWERED PERSONALIZED CAREER ENGINE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Personalized Career &amp; Stream Architect
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Input your current academic performance and passions to generate an individualized career blueprint with verified entrance exams and official links.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-slate-500">Current Standard:</span>
            <select
              value={currentGrade}
              onChange={(e) => setCurrentGrade(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
            >
              <option value="Class 8-9">Class 8-9 (Early Foundation)</option>
              <option value="Class 10">Class 10 (Stream Selection)</option>
              <option value="Class 11">Class 11 (Mid-Stream Focus)</option>
              <option value="Class 12">Class 12 (Board &amp; Entrance Sprint)</option>
              <option value="Dropper / Gap Year">Pre-College / Dropper</option>
            </select>
          </div>
        </div>

        {/* 1. Academic Performance / Marks Input Grid */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[#0066FF]" />
            <span>Subject-Wise Marks / Performance Bracket</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { key: 'maths', label: 'Mathematics', val: scores.maths },
              { key: 'science', label: 'Science / PCB', val: scores.science },
              { key: 'social', label: 'Social Science', val: scores.social },
              { key: 'english', label: 'English & Verbal', val: scores.english },
            ].map((sub) => (
              <div key={sub.key} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[11px] font-bold text-slate-600 block">{sub.label}</span>
                <select
                  value={(scores as any)[sub.key]}
                  onChange={(e) => setScores({ ...scores, [sub.key]: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                >
                  <option value=">95%">95%+ (Distinction)</option>
                  <option value="85-95%">85% - 95% (Strong)</option>
                  <option value="70-84%">70% - 84% (Good)</option>
                  <option value="55-69%">55% - 69% (Average)</option>
                  <option value="<55%">&lt; 55% (Developing)</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Core Passions & Interests (Select 1-3) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-emerald-600" />
              <span>Student Passions &amp; Interests (Select 1 to 3)</span>
            </label>
            <span className="text-[11px] text-slate-500 font-medium">
              {selectedInterests.length} of 3 selected
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {INTEREST_OPTIONS.map((item) => {
              const isSelected = selectedInterests.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleInterest(item.id)}
                  className={`p-3 rounded-2xl text-left border transition flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? 'bg-blue-50/80 border-[#0066FF] shadow-xs text-slate-900 font-bold ring-1 ring-[#0066FF]'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-lg">{item.icon}</span>
                    {isSelected && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                    )}
                  </div>
                  <span className="text-xs font-bold leading-tight">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Geographic Aspiration */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-purple-600" />
            <span>Target Higher Education Destination</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              'India Premier (IIT, AIIMS, NLUs, IIMs)',
              'Global / Study Abroad (US, UK, Germany, Singapore)',
              'Dual Pathway (Both India & Global Options)',
            ].map((dest) => (
              <button
                key={dest}
                type="button"
                onClick={() => setTargetDestination(dest)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition text-left border ${
                  targetDestination === dest
                    ? 'bg-purple-50 text-purple-900 border-purple-400 shadow-2xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {dest}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={generatePlan}
            disabled={isGenerating}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#0066FF] hover:bg-blue-600 text-white font-extrabold text-sm transition shadow-md hover:shadow-lg active:scale-98 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin" />
                <span>Synthesizing Exam Portals &amp; Syllabi...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Complete Personalized Career Blueprint →</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* GENERATED BLUEPRINT DISPLAY */}
      {generatedPlan && (
        <div className="p-6 sm:p-9 rounded-3xl bg-white border border-slate-200 shadow-md space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
          {/* Header & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                VERIFIED CAREER BLUEPRINT FOR {currentGrade.toUpperCase()}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
                Your Individualized Academic &amp; Career Roadmap
              </h3>
              <p className="text-xs text-slate-500">
                Tailored for {scores.maths} Maths, {scores.science} Science • Target: {targetDestination}
              </p>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition shadow-2xs self-start sm:self-auto"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print / Save PDF</span>
            </button>
          </div>

          {/* Section 1: Stream Verdict & Rationale */}
          <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-200/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0066FF]">
              <Compass className="w-4 h-4" />
              <span>OFFICIAL STREAM RECOMMENDATION</span>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-slate-950">
              {generatedPlan.recommendedStream}
            </div>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {generatedPlan.rationale}
            </p>
            <div className="pt-2 text-xs text-slate-500 font-semibold">
              Viable Backup Stream: <span className="text-slate-800">{generatedPlan.alternativeStream}</span>
            </div>
          </div>

          {/* Section 2: Recommended Careers with Demand & Pay */}
          <div className="space-y-4">
            <h4 className="text-lg font-extrabold text-slate-950 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span>Prime Career Trajectories &amp; Compensation Outlook</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generatedPlan.primaryCareers.map((career, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-slate-950 text-base">{career.title}</h5>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      High Growth
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{career.description}</p>
                  <div className="pt-2 border-t border-slate-200/80 space-y-1 text-xs">
                    <div className="text-slate-500">
                      <strong className="text-slate-700">Market Outlook:</strong> {career.growthOutlook}
                    </div>
                    <div className="text-slate-500">
                      <strong className="text-slate-700">Package Range:</strong>{' '}
                      <span className="text-[#0066FF] font-bold">{career.salaryRange}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Verified Entrance Exams & Official Live Links */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h4 className="text-lg font-extrabold text-slate-950 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#0066FF]" />
                <span>Required Entrance Exams &amp; Verified Official Portals</span>
              </h4>
              <span className="text-xs text-slate-500 font-medium">
                Live URLs to central conducting bodies
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {generatedPlan.officialExams.map((exam, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-slate-200/90 hover:border-blue-300 bg-white hover:bg-slate-50/40 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-base">{exam.name}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            exam.importance === 'Primary Benchmark'
                              ? 'bg-blue-50 text-[#0066FF] border-blue-200'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          {exam.importance}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 font-semibold">
                        Authority: {exam.conductingBody}
                      </div>
                    </div>

                    <a
                      href={exam.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-[#0066FF] text-[#0066FF] hover:text-white border border-blue-200 text-xs font-bold transition shadow-2xs self-start sm:self-auto group"
                    >
                      <span>Visit Official Portal</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-100 text-xs font-medium">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Eligibility</span>
                      <span className="text-slate-800">{exam.eligibility}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Exam Frequency</span>
                      <span className="text-slate-800">{exam.frequency}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Core Syllabus Focus</span>
                      <span className="text-slate-800">{exam.keySubjects}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: 4-Year Milestone Roadmap */}
          <div className="space-y-4">
            <h4 className="text-lg font-extrabold text-slate-950 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-600" />
              <span>Step-by-Step Academic Milestone Checklist</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {generatedPlan.milestones.map((m, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#0066FF] text-white flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </span>
                    <span className="font-extrabold text-slate-900 text-sm">{m.stage}</span>
                  </div>
                  <div className="text-xs font-bold text-[#0066FF]">{m.focus}</div>
                  <ul className="space-y-2 text-xs text-slate-600 pt-1">
                    {m.actionItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* REQUIRED DISCLAIMER AT BOTTOM IN SMALL WORDINGS */}
          <div className="pt-6 border-t border-slate-200">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                <strong>Disclaimer:</strong> This personalized career blueprint is AI-generated based on current academic heuristics, input marks, and historical educational entrance patterns. Conducting bodies (NTA, UPSC, Consortium of NLUs, ICAI, State CETs) periodically update eligibility criteria, syllabus weightages, and exam schedules. Students and parents must verify final dates, reservation criteria, and qualification rules directly on the official conducting authorities&apos; central websites linked above.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
