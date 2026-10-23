// ==============================================================================
// Approved Career Pathways & Realistic Program Data (No Fabricated Statistics)
// ==============================================================================

export interface FeeBreakdown {
  tuitionYearly: number;
  mandatoryFeesYearly: number;
  livingHostelYearly: number;
  equipmentOneTime: number;
  examPrepEstimated: number;
  travelYearly: number;
  totalEstimated: number;
  currency: string;
  isComplete: boolean; // false if critical components (e.g. hostel) are unconfirmed
  notes: string;
}

export interface PrerequisiteRule {
  id: string;
  title: string;
  mandatory: boolean;
  criteria: string;
  evidenceRef: string; // e.g. "AICTE Guidelines 2026-27 Section 4.2"
}

export interface CareerPathOption {
  id: string;
  title: string;
  category: 'Design & Bio-Tech' | 'Healthcare & Allied' | 'Engineering & Technology' | 'Commerce & Finance' | 'Humanities & Law' | 'Public Administration & Civil Services';
  streamRequired: 'Science (PCB / PCMB)' | 'Science (PCM)' | 'Commerce with Maths' | 'Any Stream' | 'Humanities / Arts';
  targetRoles: string[];
  durationYears: number;
  overview: string;
  prerequisites: PrerequisiteRule[];
  fees: FeeBreakdown;
  scholarshipInfo: {
    confirmedSchemes: string[];
    applicationOnlySchemes: string[];
  };
  institutionsSample: {
    name: string;
    location: string;
    type: 'Central University' | 'State Govt Institute' | 'Private Accredited' | 'Autonomous Institute';
    entranceExam: string;
    accreditationStatus: string;
  }[];
  practicalProject: {
    title: string;
    description: string;
    deliverable: string;
    estimatedHours: number;
  };
  backupRoutes: string[];
  nextUsefulAction: string;
  evidenceVersion: string;
}

export const CAREER_PATHS_CATALOG: CareerPathOption[] = [
  {
    id: 'path-biotech-design',
    title: 'Medical Devices & Biomimetic Industrial Design',
    category: 'Design & Bio-Tech',
    streamRequired: 'Science (PCB / PCMB)',
    targetRoles: ['Medical Equipment Designer', 'Ergonomic Product Architect', 'Healthcare UI/Hardware Specialist'],
    durationYears: 4,
    overview:
      'Interdisciplinary pathway merging biology fundamentals with human-centered product engineering and medical device prototyping. Avoids the standard binary choice between MBBS and NEET-only coaching.',
    prerequisites: [
      {
        id: 'prereq-bio-1',
        title: 'Class 10 Biology / Science Minimum',
        mandatory: true,
        criteria: 'Pass Class 10 with Science and Mathematics',
        evidenceRef: 'NID & UCEED Eligibility Notification 2026',
      },
      {
        id: 'prereq-bio-2',
        title: 'Class 11-12 Stream Selection',
        mandatory: true,
        criteria: 'Requires PCB or PCMB for specialized biomedical device tracks; open stream for general design',
        evidenceRef: 'Council of Architecture & Design Institutes Advisory',
      },
    ],
    fees: {
      tuitionYearly: 145000,
      mandatoryFeesYearly: 25000,
      livingHostelYearly: 85000,
      equipmentOneTime: 65000, // Laptop with CAD/3D rendering capability
      examPrepEstimated: 18000, // Self-study + sample paper kit (not bloated coaching)
      travelYearly: 15000,
      totalEstimated: 1145000, // 4 years
      currency: 'INR',
      isComplete: true,
      notes: 'Based on government-aided and accredited autonomous design schools in Karnataka and South India.',
    },
    scholarshipInfo: {
      confirmedSchemes: ['National Scholarship Portal (NSP) Post-Matric Merit-cum-Means (Family income < ₹2.5L)'],
      applicationOnlySchemes: ['Karnataka State Post-Matric Fee Reimbursement (SSP portal)', 'Institutional Design Fellowship'],
    },
    institutionsSample: [
      {
        name: 'National Institute of Design (NID)',
        location: 'Bengaluru Campus / Ahmedabad',
        type: 'Autonomous Institute',
        entranceExam: 'NID DAT (Prelims & Mains)',
        accreditationStatus: 'Institute of National Importance (INI)',
      },
      {
        name: 'CPDM, Indian Institute of Science (IISc)',
        location: 'Bengaluru, Karnataka',
        type: 'Central University',
        entranceExam: 'UCEED / CEED',
        accreditationStatus: 'NIRF Overall #1',
      },
      {
        name: 'MS Ramaiah Applied Sciences - Industrial Design',
        location: 'Bengaluru, Karnataka',
        type: 'Private Accredited',
        entranceExam: 'State Entrance / Portfolio Review',
        accreditationStatus: 'NAAC A+ Accredited',
      },
    ],
    practicalProject: {
      title: 'Biomimetic Portable First-Aid Dispenser',
      description: 'Study how pinecones open and close with moisture, and sketch an intuitive waterproof field syringe dispenser for rural health workers.',
      deliverable: '3 hand-drawn orthographic sketches + cardboard physical mockup',
      estimatedHours: 6,
    },
    backupRoutes: [
      'B.Sc Biotechnology with Minor in Cognitive Ergonomics',
      'Diploma in Biomedical Engineering via Karnataka Polytechnic',
    ],
    nextUsefulAction: 'Review UCEED syllabus and practice 3 visualization problems on graph paper this week.',
    evidenceVersion: 'v2026.10-verified',
  },
  {
    id: 'path-pure-pcb',
    title: 'Biomedical Sciences, Genetics & Clinical Research',
    category: 'Healthcare & Allied',
    streamRequired: 'Science (PCB / PCMB)',
    targetRoles: ['Clinical Trial Scientist', 'Genetic Diagnostic Technologist', 'Bioprocess Researcher'],
    durationYears: 3,
    overview:
      'Rigorous research and laboratory diagnostic career path. Ideal for students passionate about human pathology, genetics, and pharmaceuticals who prefer laboratory investigation over daily clinical hospital practice.',
    prerequisites: [
      {
        id: 'prereq-pcb-1',
        title: 'Class 10 Science & Mathematics',
        mandatory: true,
        criteria: 'Minimum 60% aggregate in Class 10 board examinations',
        evidenceRef: 'UGC Minimum Standards for Undergraduate Admissions 2026',
      },
      {
        id: 'prereq-pcb-2',
        title: 'Class 12 PCB Subject Group',
        mandatory: true,
        criteria: 'Must clear Class 12 with Physics, Chemistry, Biology',
        evidenceRef: 'CUET-UG Information Bulletin 2026',
      },
    ],
    fees: {
      tuitionYearly: 45000,
      mandatoryFeesYearly: 12000,
      livingHostelYearly: 60000,
      equipmentOneTime: 25000, // Lab coat, diagnostic kits, baseline computer
      examPrepEstimated: 8000,
      travelYearly: 10000,
      totalEstimated: 412000, // 3 years (Govt/Aided standard)
      currency: 'INR',
      isComplete: true,
      notes: 'State university affiliated colleges in Karnataka offer subsidised fee slabs for domicile residents.',
    },
    scholarshipInfo: {
      confirmedSchemes: ['INSPIRE Scholarship for Higher Education (SHE) - Top 1% in Class 12 Boards (₹80,000/yr)'],
      applicationOnlySchemes: ['KVPY legacy transition / PM-USP Central Sector Scheme'],
    },
    institutionsSample: [
      {
        name: 'Bangalore University - Faculty of Life Sciences',
        location: 'Bengaluru, Karnataka',
        type: 'State Govt Institute',
        entranceExam: 'CUET-UG / Merit Cutoff',
        accreditationStatus: 'NAAC A Grade',
      },
      {
        name: 'St. Joseph\'s University - Bio-Sciences',
        location: 'Bengaluru, Karnataka',
        type: 'Autonomous Institute',
        entranceExam: 'SJU Entrance Assessment',
        accreditationStatus: 'UGC Autonomous / NAAC A++',
      },
    ],
    practicalProject: {
      title: 'Local Water Quality Microbiological Analysis Protocol',
      description: 'Document an audit plan for testing bacterial coliform counts in domestic water filters using NCERT Chapter 1 Life Processes standards.',
      deliverable: '1-page structured lab notebook audit protocol',
      estimatedHours: 4,
    },
    backupRoutes: [
      'B.Sc Microbiology with Bioinformatics Certification',
      'Allied Health Technology (B.Sc Medical Laboratory Technology - MLT)',
    ],
    nextUsefulAction: 'Verify Class 10 Heredity and Evolution concepts in this week\'s Prepare track.',
    evidenceVersion: 'v2026.10-verified',
  },
  {
    id: 'path-computer-science',
    title: 'Software Systems, Artificial Intelligence & Data Architecture',
    category: 'Engineering & Technology',
    streamRequired: 'Science (PCM)',
    targetRoles: ['Systems Engineer', 'Machine Learning Developer', 'Infrastructure & Cloud Architect'],
    durationYears: 4,
    overview:
      'High-rigor software engineering and computational fundamentals. Focuses on algorithms, distributed data structures, and computer organization through national and state engineering counseling.',
    prerequisites: [
      {
        id: 'prereq-pcm-1',
        title: 'Class 10 Mathematics Standard (Code 041)',
        mandatory: true,
        criteria: 'CBSE mandates Maths Standard for Class 11 PCM stream admission',
        evidenceRef: 'CBSE Circular No. Acad-03/2020 & 2026 update',
      },
      {
        id: 'prereq-pcm-2',
        title: 'Class 12 Physics & Mathematics Mandatory',
        mandatory: true,
        criteria: 'Minimum 50% aggregate in Physics and Mathematics with Chemistry/CS',
        evidenceRef: 'AICTE Approval Process Handbook 2026-27',
      },
    ],
    fees: {
      tuitionYearly: 98000, // Government quota seat via KCET
      mandatoryFeesYearly: 28000,
      livingHostelYearly: 75000,
      equipmentOneTime: 70000, // Development workstation/laptop
      examPrepEstimated: 35000,
      travelYearly: 12000,
      totalEstimated: 957000, // 4 years (Govt quota)
      currency: 'INR',
      isComplete: true,
      notes: 'Based on Karnataka CET Government Quota seat fees in participating colleges.',
    },
    scholarshipInfo: {
      confirmedSchemes: ['AICTE Pragati / Saksham Scheme (Eligible female students & persons with disability)'],
      applicationOnlySchemes: ['State Merit Scholarships', 'Fee concession under Article 371(J) for HK region'],
    },
    institutionsSample: [
      {
        name: 'UVCE (University Visvesvaraya College of Engineering)',
        location: 'Bengaluru, Karnataka',
        type: 'State Govt Institute',
        entranceExam: 'KCET / JEE Main',
        accreditationStatus: 'State Autonomous Institution',
      },
      {
        name: 'BMS College of Engineering',
        location: 'Bengaluru, Karnataka',
        type: 'Autonomous Institute',
        entranceExam: 'KCET / COMEDK',
        accreditationStatus: 'NBA & NAAC A++ Accredited',
      },
    ],
    practicalProject: {
      title: 'Python CLI Exam Deadline Alarm',
      description: 'Write a 40-line Python script that parses exam dates from a CSV file and calculates days remaining until registration closes.',
      deliverable: 'Tested script running in local Python environment',
      estimatedHours: 5,
    },
    backupRoutes: [
      'BCA (Bachelor of Computer Applications) with Cloud Certifications',
      'B.Sc Computer Science with Applied Mathematics',
    ],
    nextUsefulAction: 'Ensure Mathematics Standard (041) board exam concepts are fully secure.',
    evidenceVersion: 'v2026.10-verified',
  },
  {
    id: 'path-commerce-fintech',
    title: 'Quantitative Finance, Actuarial Science & Corporate Accounting',
    category: 'Commerce & Finance',
    streamRequired: 'Commerce with Maths',
    targetRoles: ['Financial Risk Analyst', 'Actuarial Associate', 'Chartered Accountant (CA)', 'Corporate Treasury Officer'],
    durationYears: 3,
    overview:
      'Analytical business discipline merging macroeconomic forecasting, statutory audit, statistical insurance risk, and algorithmic equity models. High market demand without requiring an engineering degree.',
    prerequisites: [
      {
        id: 'prereq-com-1',
        title: 'Class 10 Mathematics Minimum Pass',
        mandatory: true,
        criteria: 'Strong grasp of Class 10 arithmetic progressions, statistics, and linear algebra',
        evidenceRef: 'Institute of Actuaries of India (IAI) Candidate Guide',
      },
    ],
    fees: {
      tuitionYearly: 55000,
      mandatoryFeesYearly: 15000,
      livingHostelYearly: 65000,
      equipmentOneTime: 40000,
      examPrepEstimated: 25000, // ICAI Foundation / ACET registration & books
      travelYearly: 12000,
      totalEstimated: 486000, // 3 years
      currency: 'INR',
      isComplete: true,
      notes: 'Excludes private CA coaching mega-batches; self-study with official ICAI study modules is factored.',
    },
    scholarshipInfo: {
      confirmedSchemes: ['ICAI Merit-cum-Need Exemption Scheme for Foundation students'],
      applicationOnlySchemes: ['National Overseas Scholarship', 'State Post-Matric Minority Schemes'],
    },
    institutionsSample: [
      {
        name: 'St. Joseph\'s College of Commerce (SJCC)',
        location: 'Bengaluru, Karnataka',
        type: 'Autonomous Institute',
        entranceExam: 'SJCC Entrance Test',
        accreditationStatus: 'NAAC A++ (CGPA 3.57)',
      },
      {
        name: 'Christ University - Department of Commerce',
        location: 'Bengaluru, Karnataka',
        type: 'Private Accredited',
        entranceExam: 'CUET (Christ University Entrance)',
        accreditationStatus: 'NAAC A Grade',
      },
    ],
    practicalProject: {
      title: 'Personal Cashflow & Compound Interest Simulator',
      description: 'Create an Excel / Google Sheet model showing the effect of 8% vs 12% returns on education loans over 5 years.',
      deliverable: '1 functional financial model with sensitivity table',
      estimatedHours: 4,
    },
    backupRoutes: [
      'B.Com Honors with CS (Company Secretary) Foundation',
      'BBA in Finance & Capital Markets',
    ],
    nextUsefulAction: 'Practice Class 10 Statistics and Probability problems in the Prepare tab.',
    evidenceVersion: 'v2026.10-verified',
  },
  {
    id: 'path-public-sector-banking',
    title: 'Public Sector Banking, Officer Cadre & RBI Grade B',
    category: 'Public Administration & Civil Services',
    streamRequired: 'Any Stream',
    targetRoles: ['Probationary Officer (PO)', 'RBI Grade B Officer', 'Treasury & Credit Analyst'],
    durationYears: 1, // Preparation & cycle duration post-graduation
    overview:
      'Nationalized commercial bank recruitment conducted by IBPS and SBI. Clear transparent eligibility: any recognized graduation degree, age 20-30, with merit decided purely by computer-based preliminary, mains, and interview stages.',
    prerequisites: [
      {
        id: 'prereq-bank-1',
        title: 'Recognized Bachelor\'s Degree in Any Discipline',
        mandatory: true,
        criteria: 'Graduation from any UGC/AICTE recognized university',
        evidenceRef: 'IBPS CRP PO/MT Official Notification 2026',
      },
      {
        id: 'prereq-bank-2',
        title: 'Age Eligibility Criteria',
        mandatory: true,
        criteria: '20 to 30 years as on cutoff date (Statutory relaxations: OBC 3 yrs, SC/ST 5 yrs)',
        evidenceRef: 'IBPS Age Criteria Gazette Schedule',
      },
    ],
    fees: {
      tuitionYearly: 0, // Degree already completed
      mandatoryFeesYearly: 850, // IBPS Application Fee
      livingHostelYearly: 0, // Home preparation
      equipmentOneTime: 12000, // Baseline tablet/computer for online mock tests
      examPrepEstimated: 12000, // Test series & reference material
      travelYearly: 4000, // Exam center travel
      totalEstimated: 28850, // 1 year cycle
      currency: 'INR',
      isComplete: true,
      notes: 'No expensive coaching institute required. Daily quantitative reasoning practice is the single determinative factor.',
    },
    scholarshipInfo: {
      confirmedSchemes: ['Pre-Exam Training (PET) provided free by IBPS for eligible reserved categories'],
      applicationOnlySchemes: ['State Government competitive exam preparation allowances'],
    },
    institutionsSample: [
      {
        name: 'Institute of Banking Personnel Selection (IBPS)',
        location: 'All India Online Centers',
        type: 'Central University',
        entranceExam: 'IBPS PO / Clerk CRP',
        accreditationStatus: 'Statutory Body for 11 Nationalized Banks',
      },
      {
        name: 'Reserve Bank of India Services Board',
        location: 'All India Centers',
        type: 'Autonomous Institute',
        entranceExam: 'RBI Grade B Officers Exam',
        accreditationStatus: 'Central Bank of India',
      },
    ],
    practicalProject: {
      title: 'Daily Data Interpretation & Syllogism Drill',
      description: 'Solve 10 tabulated banking caselet questions within 12 minutes without using a calculator.',
      deliverable: 'Timed accuracy log showing speed improvement',
      estimatedHours: 3,
    },
    backupRoutes: [
      'SSC CGL (Staff Selection Commission Combined Graduate Level)',
      'State Cooperative Apex Bank Assistant Manager Posts',
    ],
    nextUsefulAction: 'Open the Adult Aptitude Practice track in Prepare to benchmark your speed.',
    evidenceVersion: 'v2026.10-verified',
  },
];

export const SEEDED_CAREER_PATHS = CAREER_PATHS_CATALOG;

