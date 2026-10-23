// ==============================================================================
// Synthetic Personas for Isolated Demo Execution (Zero Credentials Required)
// ==============================================================================

export type UserRole = 'student' | 'adult' | 'parent' | 'counsellor' | 'reviewer' | 'admin';

export interface DemoPersona {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar: string;
  headline: string;
  location: string;
  context: {
    stage: string;
    targetGoals: string[];
    savedPathIds: string[];
    savedExamIds: string[];
    isMinor: boolean;
    guardianLinked?: boolean;
    counsellorLinked?: boolean;
  };
}

export const DEMO_PERSONAS: Record<string, DemoPersona> = {
  'aarav-student': {
    id: 'demo-student-aarav',
    name: 'Aarav Sharma',
    role: 'student',
    email: 'aarav.demo@loopedu.in',
    avatar: 'AS',
    headline: 'Class 10 Student (CBSE) • Bengaluru',
    location: 'Bengaluru, Karnataka',
    context: {
      stage: 'Class 10',
      targetGoals: ['Biology + Industrial Design Pathway', 'Medical Bio-Tech', 'NIFT / UCEED Foundation'],
      savedPathIds: ['path-biotech-design', 'path-pure-pcb'],
      savedExamIds: ['exam-cbse-10-2027', 'exam-uceed-foundation', 'exam-kcet-bio'],
      isMinor: true,
      guardianLinked: true,
      counsellorLinked: true,
    },
  },
  'priya-adult': {
    id: 'demo-adult-priya',
    name: 'Priya Nair',
    role: 'adult',
    email: 'priya.demo@loopedu.in',
    avatar: 'PN',
    headline: 'Graduate Aspirant • Banking & Railways',
    location: 'Mysuru, Karnataka',
    context: {
      stage: 'Graduate (B.Sc)',
      targetGoals: ['IBPS Probationary Officer (PO)', 'RRB NTPC Graduate Posts'],
      savedPathIds: ['path-public-sector-banking', 'path-railways-administration'],
      savedExamIds: ['exam-ibps-po-2027', 'exam-rrb-ntpc-2027', 'exam-ssc-cgl-2027'],
      isMinor: false,
    },
  },
  'rajesh-parent': {
    id: 'demo-parent-rajesh',
    name: 'Rajesh Sharma',
    role: 'parent',
    email: 'rajesh.parent@loopedu.in',
    avatar: 'RS',
    headline: 'Guardian / Parent of Aarav Sharma',
    location: 'Bengaluru, Karnataka',
    context: {
      stage: 'Parent of Class 10 Student',
      targetGoals: ['Aarav - College Fee Planning', 'Aarav - Board Exam Milestones'],
      savedPathIds: ['path-biotech-design'],
      savedExamIds: ['exam-cbse-10-2027'],
      isMinor: false,
    },
  },
  'anita-counsellor': {
    id: 'demo-counsellor-anita',
    name: 'Dr. Anita Desai',
    role: 'counsellor',
    email: 'anita.counsellor@loopedu.in',
    avatar: 'AD',
    headline: 'Independent Academic Advisory Fellow',
    location: 'Bengaluru, Karnataka',
    context: {
      stage: 'Certified Educational Psychologist',
      targetGoals: ['Reviewing Aarav Sharma Biology/Design Request'],
      savedPathIds: [],
      savedExamIds: [],
      isMinor: false,
    },
  },
  'vikram-reviewer': {
    id: 'demo-reviewer-vikram',
    name: 'Vikram Rao',
    role: 'reviewer',
    email: 'vikram.editorial@loopedu.in',
    avatar: 'VR',
    headline: 'Senior Exam Verification Editor',
    location: 'Bengaluru, Karnataka',
    context: {
      stage: 'Editorial Console Lead',
      targetGoals: ['NTA JEE Notice Verification', 'IBPS Calendar Consistency Check'],
      savedPathIds: [],
      savedExamIds: [],
      isMinor: false,
    },
  },
  'meera-admin': {
    id: 'demo-admin-meera',
    name: 'Meera Sundaram',
    role: 'admin',
    email: 'meera.admin@loopedu.in',
    avatar: 'MS',
    headline: 'Platform Operations Administrator',
    location: 'Bengaluru, Karnataka',
    context: {
      stage: 'Blocks & Loops Platform Admin',
      targetGoals: ['System Health', 'AI Quotas', 'Webhook Diagnostics'],
      savedPathIds: [],
      savedExamIds: [],
      isMinor: false,
    },
  },
};

export const DEFAULT_DEMO_PERSONA = DEMO_PERSONAS['aarav-student'];
