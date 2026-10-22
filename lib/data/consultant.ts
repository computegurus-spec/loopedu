export interface CareerTrajectory {
  id: string;
  title: string;
  category: 'Engineering & Tech' | 'Healthcare & Science' | 'Business & Finance' | 'Law & Public Policy' | 'Design & Media';
  tagline: string;
  recommendedStream: string;
  mandatory12thSubjects: string[];
  keyEntranceExams: string[];
  topCollegesIndia: string[];
  globalPathways: string[];
  sunriseSpecializations: string[];
  startingSkillset: string[];
  class10FocusAreas: string[];
}

export interface StreamOption {
  id: string;
  name: string;
  badge: string;
  suitedFor: string;
  coreSubjects: string[];
  popularElectives: string[];
  careerGateways: string[];
  riskWarnings: string[];
  academicIntensity: 'High' | 'Very High' | 'Balanced';
}

export const STREAM_OPTIONS: StreamOption[] = [
  {
    id: 'science-pcm',
    name: 'Science (PCM) - Engineering & Technology',
    badge: 'Physics, Chemistry, Mathematics',
    suitedFor: 'Students with strong analytical reasoning, quantitative problem-solving, and interest in architecture, computer science, aerospace, or data science.',
    coreSubjects: ['Physics (042)', 'Chemistry (043)', 'Mathematics (041)', 'English Core (301)'],
    popularElectives: ['Computer Science (083)', 'Economics (030)', 'Physical Education (048)'],
    careerGateways: ['Software Architecture & AI', 'Aerospace & Robotics', 'Data Science & Quants', 'Defense (NDA)', 'Architecture (B.Arch)'],
    riskWarnings: ['Requires high mathematical rigor and 15+ hours weekly self-study for competitive entrance tests (JEE/BITSAT).'],
    academicIntensity: 'Very High',
  },
  {
    id: 'science-pcb',
    name: 'Science (PCB) - Medicine, Biotechnology & Life Sciences',
    badge: 'Physics, Chemistry, Biology',
    suitedFor: 'Students with high memory retention, biological sciences interest, and passion for healthcare, pharmaceuticals, genetics, or environmental science.',
    coreSubjects: ['Physics (042)', 'Chemistry (043)', 'Biology (044)', 'English Core (301)'],
    popularElectives: ['Psychology (037)', 'Biotechnology (045)', 'Physical Education (048)', 'Applied Mathematics (241)'],
    careerGateways: ['MBBS / Medicine & Surgery', 'Biomedical Engineering & Genetics', 'Pharmacy & Clinical Research', 'Veterinary & Agriculture'],
    riskWarnings: ['Heavy reliance on NCERT memorization; NEET has ~2.4M applicants for limited government medical seats.'],
    academicIntensity: 'Very High',
  },
  {
    id: 'commerce-math',
    name: 'Commerce with Mathematics',
    badge: 'Accountancy, Business Studies, Economics, Math',
    suitedFor: 'Students fascinated by business models, capital markets, chartered accountancy, economics, and corporate leadership.',
    coreSubjects: ['Accountancy (055)', 'Business Studies (054)', 'Economics (030)', 'Mathematics / Applied Math (241)', 'English Core (301)'],
    popularElectives: ['Informatics Practices (065)', 'Entrepreneurship (066)'],
    careerGateways: ['Chartered Accountancy (CA)', 'Investment Banking & Venture Capital', 'Corporate Law (via CLAT)', 'Actuarial Science & Analytics'],
    riskWarnings: ['Selecting Commerce without Mathematics limits eligibility for top-tier Economics (Hons) and FinTech programs at premier universities.'],
    academicIntensity: 'Balanced',
  },
  {
    id: 'humanities-arts',
    name: 'Humanities & Social Sciences',
    badge: 'History, Political Science, Psychology, Economics',
    suitedFor: 'Students with strong verbal articulation, writing skills, critical analysis, and interest in law, diplomacy, public policy, or journalism.',
    coreSubjects: ['History (027)', 'Political Science (028)', 'Economics (030)', 'Psychology (037)', 'English Core (301)'],
    popularElectives: ['Sociology (039)', 'Legal Studies (074)', 'Geography (029)'],
    careerGateways: ['Corporate Law & Litigation (NLUs)', 'Civil Services (UPSC / IFS)', 'International Relations & Diplomacy', 'UX Research & Behavioral Design'],
    riskWarnings: ['Requires expansive reading habits, essay writing proficiency, and active extracurricular portfolio building.'],
    academicIntensity: 'Balanced',
  },
];

export const CAREER_TRAJECTORIES: CareerTrajectory[] = [
  {
    id: 'car-ai-software',
    title: 'Software & AI Systems Architect',
    category: 'Engineering & Tech',
    tagline: 'Design autonomous systems, scalable cloud infrastructure, and frontier computing platforms.',
    recommendedStream: 'Science (PCM) with Computer Science',
    mandatory12thSubjects: ['Mathematics (041)', 'Physics (042)', 'Chemistry (043)'],
    keyEntranceExams: ['JEE Main & Advanced', 'BITSAT', 'UGEE (IIIT Hyderabad)', 'SAT / ACT for US/UK'],
    topCollegesIndia: ['IIT Bombay / Delhi / Madras', 'IIIT Hyderabad', 'BITS Pilani', 'NIT Trichy'],
    globalPathways: ['MIT', 'Stanford University', 'CMU (Carnegie Mellon)', 'NUS Singapore', 'TU Munich'],
    sunriseSpecializations: ['Generative AI & LLM Systems', 'Distributed Computing', 'Quantum Algorithm Engineering', 'Robotic Process Automation'],
    startingSkillset: ['Python programming fundamentals', 'Discrete mathematics logic', 'Algorithmic problem-solving'],
    class10FocusAreas: ['Quadratic Equations & Polynomials', 'Coordinate Geometry', 'Logic & Probability'],
  },
  {
    id: 'car-aerospace',
    title: 'Aerospace & Autonomous Flight Engineer',
    category: 'Engineering & Tech',
    tagline: 'Develop rocket propulsion, satellites, unmanned aerial vehicles, and deep-space instrumentation.',
    recommendedStream: 'Science (PCM)',
    mandatory12thSubjects: ['Mathematics (041)', 'Physics (042)', 'Chemistry (043)'],
    keyEntranceExams: ['JEE Advanced (for IIST Thiruvananthapuram)', 'JEE Main', 'MET (Manipal)'],
    topCollegesIndia: ['IIST Thiruvananthapuram (ISRO Direct Entry)', 'IIT Madras / IIT Kanpur', 'MIT Chennai'],
    globalPathways: ['Caltech', 'Purdue University', 'Georgia Tech', 'TU Delft (Netherlands)'],
    sunriseSpecializations: ['Electric Aircraft Propulsion', 'Orbital Mechanics & CubeSats', 'Hypersonic Aerodynamics'],
    startingSkillset: ['Physics mechanics intuition', 'Vector calculus fundamentals', '3D spatial visualization'],
    class10FocusAreas: ['Light: Optics & Ray Diagrams', 'Electricity & Magnetic Effects', 'Trigonometry & Heights/Distances'],
  },
  {
    id: 'car-neurosurgeon',
    title: 'Specialist Physician / Neurosurgeon',
    category: 'Healthcare & Science',
    tagline: 'Diagnose complex neurological conditions and perform precision surgical interventions.',
    recommendedStream: 'Science (PCB)',
    mandatory12thSubjects: ['Biology (044)', 'Chemistry (043)', 'Physics (042)'],
    keyEntranceExams: ['NEET-UG', 'USMLE (USA Pathway)', 'PLAB (UK Pathway)'],
    topCollegesIndia: ['AIIMS New Delhi', 'CMC Vellore', 'JIPMER Puducherry', 'KGMU Lucknow'],
    globalPathways: ['Johns Hopkins Medicine', 'Harvard Medical School', 'Oxford University Medical School'],
    sunriseSpecializations: ['Robotic Minimally Invasive Surgery', 'Neural Interface Implants', 'Regenerative Neurobiology'],
    startingSkillset: ['High factual recall accuracy', 'Deep biology diagnostics', 'Steady manual focus and stamina'],
    class10FocusAreas: ['Life Processes (Human Physiology)', 'Control & Coordination (Nervous System)', 'Carbon & Its Compounds'],
  },
  {
    id: 'car-corporate-law',
    title: 'Corporate M&A Lawyer / Cross-Border Counsel',
    category: 'Law & Public Policy',
    tagline: 'Structure multinational acquisitions, negotiate venture contracts, and advise tech founders.',
    recommendedStream: 'Humanities or Commerce with Math',
    mandatory12thSubjects: ['Any stream with English (Legal Studies recommended)'],
    keyEntranceExams: ['CLAT (Consortium of NLUs)', 'AILET (NLU Delhi)', 'LSAT India'],
    topCollegesIndia: ['NLSIU Bengaluru', 'NALSAR Hyderabad', 'WBNUJS Kolkata', 'NLU Delhi'],
    globalPathways: ['Harvard Law School (LLM)', 'Cambridge University (BA Law)', 'LSE (London School of Economics)'],
    sunriseSpecializations: ['AI & Data Privacy Regulation', 'Cross-Border Technology Mergers', 'Intellectual Property & Patents'],
    startingSkillset: ['Speed reading comprehension', 'Logical deductions & fallacy detection', 'Debating & argumentation'],
    class10FocusAreas: ['Democratic Politics / Constitution', 'English Reading Comprehension', 'Analytical Reasoning'],
  },
  {
    id: 'car-fintech-quant',
    title: 'Quantitative Trader & Investment Banker',
    category: 'Business & Finance',
    tagline: 'Engineer algorithmic trading models, value capital assets, and manage global hedge fund portfolios.',
    recommendedStream: 'Commerce with Math OR Science (PCM)',
    mandatory12thSubjects: ['Mathematics (041) is mandatory'],
    keyEntranceExams: ['IPMAT (IIM Indore/Rohtak)', 'CUET-UG (SRCC/St. Stephen’s)', 'JEE Main (for IIT-to-Finance)'],
    topCollegesIndia: ['SRCC New Delhi', 'IIM Indore (IPM 5-year)', 'IIT Bombay (Finance Minor)', 'St. Xavier’s College'],
    globalPathways: ['Wharton (UPenn)', 'Columbia University', 'LSE (UK)', 'NYU Stern'],
    sunriseSpecializations: ['High-Frequency Algorithmic Trading', 'Decentralized Finance (DeFi) Protocols', 'ESG & Climate Capital Valuation'],
    startingSkillset: ['Statistical probability', 'Financial statement intuition', 'Spreadsheet modeling'],
    class10FocusAreas: ['Statistics & Probability', 'Arithmetic Progressions', 'Linear Equations'],
  },
];
