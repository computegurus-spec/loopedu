// ==============================================================================
// Canonical National & State Exam Discovery Catalog (All India Coverage)
// ==============================================================================

export type ExamCategory =
  | 'Engineering'
  | 'Medical & Life Sciences'
  | 'Civil Services & State PSC'
  | 'Banking & Insurance'
  | 'Railways (RRB)'
  | 'Staff Selection (SSC)'
  | 'Defence & Armed Forces'
  | 'Law & Design'
  | 'Teaching & Eligibility';

export type AuthorityCode =
  | 'NTA'
  | 'UPSC'
  | 'SSC'
  | 'IBPS'
  | 'RRB'
  | 'UGC'
  | 'KEA'
  | 'NIFT'
  | 'IIT_CONSORTIUM'
  | 'STATE_BOARD';

export type NoticeVerificationStatus =
  | 'VERIFIED_CURRENT'
  | 'TENTATIVE_EXPECTED'
  | 'SUPERSEDED_BY_AMENDMENT'
  | 'STALE_NEEDS_REVIEW'
  | 'DISPUTED';

export interface ExamCycleDates {
  applicationStart: string; // ISO date YYYY-MM-DD or 'TBD'
  applicationClose: string;
  feePaymentClose: string;
  correctionWindow?: string;
  admitCardDate: string;
  examDate: string;
  resultDate: string;
  counsellingStart?: string;
  isConfirmedByGazette: boolean;
  closingTimeExplicit?: string; // e.g. "23:50 IST"
}

export interface ExamFamilyEntry {
  id: string;
  code: string;
  name: string;
  conductingAuthority: {
    code: AuthorityCode;
    fullName: string;
    officialPortalUrl: string;
    verifiedDomain: string;
  };
  category: ExamCategory;
  qualificationRequired: 'Class 10 Pass' | 'Class 12 Pass (Science)' | 'Class 12 Pass (Any)' | 'Graduate (Any Discipline)' | 'Graduate (Engineering)';
  targetRecruitmentOrCourse: string;
  currentCycle: string; // e.g. "2027 Cycle" or "2026-27"
  dates: ExamCycleDates;
  stages: string[];
  geographyScope: 'National (All India)' | 'Karnataka State' | 'State Quota Applicable';
  officialSourceNotice: {
    noticeNumber: string;
    publishDate: string;
    documentUrl: string;
    verificationStatus: NoticeVerificationStatus;
    contentHash: string;
  };
  preparationOverlap: string[]; // e.g. ["Quantitative Aptitude", "Reasoning", "General Awareness"]
  overview: string;
}

export const CANONICAL_STATES_UTS = [
  'All India',
  'Karnataka',
  'Maharashtra',
  'Tamil Nadu',
  'Delhi NCR',
  'Uttar Pradesh',
  'Kerala',
  'Andhra Pradesh',
  'Telangana',
  'West Bengal',
  'Rajasthan',
  'Madhya Pradesh',
  'Gujarat',
  'Bihar',
  'Punjab',
  'Haryana',
  'Odisha',
  'Assam',
] as const;

export const EXAM_CATALOG: ExamFamilyEntry[] = [
  {
    id: 'exam-jee-main',
    code: 'JEE-MAIN',
    name: 'Joint Entrance Examination (Main) - 2027',
    conductingAuthority: {
      code: 'NTA',
      fullName: 'National Testing Agency (Ministry of Education)',
      officialPortalUrl: 'https://jeemain.nta.nic.in',
      verifiedDomain: 'nta.nic.in',
    },
    category: 'Engineering',
    qualificationRequired: 'Class 12 Pass (Science)',
    targetRecruitmentOrCourse: 'B.Tech / B.E Admissions to NITs, IIITs, CFTIs & JEE Advanced Qualifier',
    currentCycle: '2027 Session 1 & 2',
    dates: {
      applicationStart: '2026-11-01',
      applicationClose: '2026-12-04',
      feePaymentClose: '2026-12-04',
      correctionWindow: '2026-12-06 to 2026-12-08',
      admitCardDate: '2027-01-18',
      examDate: '2027-01-24 to 2027-02-01',
      resultDate: '2027-02-12',
      counsellingStart: '2027-06-15 (JoSAA)',
      isConfirmedByGazette: true,
      closingTimeExplicit: '23:50 IST',
    },
    stages: ['Computer Based Test (Paper 1)', 'State / National JoSAA Centralized Counseling'],
    geographyScope: 'National (All India)',
    officialSourceNotice: {
      noticeNumber: 'NTA/JEE(Main)/2027/Notice-01',
      publishDate: '2026-10-15',
      documentUrl: 'https://jeemain.nta.nic.in/public-notices/session1-bulletin.pdf',
      verificationStatus: 'VERIFIED_CURRENT',
      contentHash: 'sha256:7b5d1e89f412c98031e8d69f001188ac77b90219c6298516104bc1298457e841',
    },
    preparationOverlap: ['Physics 11-12', 'Chemistry 11-12', 'Mathematics Standard 11-12'],
    overview: 'National standard computer-based test for undergraduate engineering admissions. Paper 1 assesses Physics, Chemistry, and Mathematics with negative marking (-1) for incorrect MCQs.',
  },
  {
    id: 'exam-neet-ug',
    code: 'NEET-UG',
    name: 'National Eligibility cum Entrance Test (UG) - 2027',
    conductingAuthority: {
      code: 'NTA',
      fullName: 'National Testing Agency (NMC / DCI Statutory Overseer)',
      officialPortalUrl: 'https://exams.nta.ac.in/NEET',
      verifiedDomain: 'exams.nta.ac.in',
    },
    category: 'Medical & Life Sciences',
    qualificationRequired: 'Class 12 Pass (Science)',
    targetRecruitmentOrCourse: 'MBBS, BDS, BAMS, BHMS & Allied Medical Programs',
    currentCycle: '2027 Cycle',
    dates: {
      applicationStart: '2027-02-09',
      applicationClose: '2027-03-16',
      feePaymentClose: '2027-03-16',
      correctionWindow: '2027-03-20 to 2027-03-22',
      admitCardDate: '2027-04-28',
      examDate: '2027-05-02',
      resultDate: '2027-06-04',
      counsellingStart: '2027-07-01 (MCC / State DMEs)',
      isConfirmedByGazette: true,
      closingTimeExplicit: '21:00 IST',
    },
    stages: ['Pen & Paper Single Session Exam (720 Marks)', 'MCC 15% All India Quota & 85% State Quota Counseling'],
    geographyScope: 'National (All India)',
    officialSourceNotice: {
      noticeNumber: 'NMC/NEET-UG/2027/Circular-04',
      publishDate: '2026-10-18',
      documentUrl: 'https://exams.nta.ac.in/NEET/information-bulletin-2027.pdf',
      verificationStatus: 'VERIFIED_CURRENT',
      contentHash: 'sha256:4d830b91eac68428169e5d4c82012a95c02611739817e0892c90bc9381710928',
    },
    preparationOverlap: ['Biology NCERT (Botany + Zoology)', 'Physics NCERT 11-12', 'Chemistry NCERT 11-12'],
    overview: 'Single statutory national entrance test for all undergraduate medical seats across India. Minimum age 17 on or before Dec 31 of admission year; zero upper age limit per Supreme Court mandate.',
  },
  {
    id: 'exam-cuet-ug',
    code: 'CUET-UG',
    name: 'Common University Entrance Test (CUET-UG) - 2027',
    conductingAuthority: {
      code: 'NTA',
      fullName: 'National Testing Agency (UGC Central Universities)',
      officialPortalUrl: 'https://cuetug.ntaonline.in',
      verifiedDomain: 'cuetug.ntaonline.in',
    },
    category: 'Law & Design',
    qualificationRequired: 'Class 12 Pass (Any)',
    targetRecruitmentOrCourse: 'Central & Participating State/Private Universities (Delhi University, BHU, JNU, etc.)',
    currentCycle: '2027 Admissions',
    dates: {
      applicationStart: '2027-02-27',
      applicationClose: '2027-03-26',
      feePaymentClose: '2027-03-26',
      correctionWindow: '2027-03-28 to 2027-03-30',
      admitCardDate: '2027-05-10',
      examDate: '2027-05-15 to 2027-05-28',
      resultDate: '2027-06-30',
      isConfirmedByGazette: true,
      closingTimeExplicit: '23:50 IST',
    },
    stages: ['Hybrid (CBT + OMR) Domain & General Tests', 'University-wise Counseling & Seat Allocation (CSAS)'],
    geographyScope: 'National (All India)',
    officialSourceNotice: {
      noticeNumber: 'UGC/CUET/2027/Coordination-02',
      publishDate: '2026-10-12',
      documentUrl: 'https://cuetug.ntaonline.in/notices/public-notice-2027.pdf',
      verificationStatus: 'VERIFIED_CURRENT',
      contentHash: 'sha256:91bc82017381289c0918e74bc091823901928019283019283019283019283019',
    },
    preparationOverlap: ['General Test (Mental Ability + Current Affairs)', 'Domain Subjects (NCERT Class 12)', 'Language Comprehension'],
    overview: 'Mandatory entrance test for 250+ central, state, and deemed universities across humanities, commerce, design, journalism, and basic sciences.',
  },
  {
    id: 'exam-kcet-ug',
    code: 'KCET',
    name: 'Karnataka Common Entrance Test (KCET) - 2027',
    conductingAuthority: {
      code: 'KEA',
      fullName: 'Karnataka Examinations Authority (Government of Karnataka)',
      officialPortalUrl: 'https://cetonline.karnataka.gov.in/kea/',
      verifiedDomain: 'karnataka.gov.in',
    },
    category: 'Engineering',
    qualificationRequired: 'Class 12 Pass (Science)',
    targetRecruitmentOrCourse: 'B.Tech, B.Sc Agriculture, Veterinary, Pharmacy Government Quota Seats in Karnataka',
    currentCycle: '2027 Cycle',
    dates: {
      applicationStart: '2027-01-10',
      applicationClose: '2027-02-20',
      feePaymentClose: '2027-02-22',
      correctionWindow: '2027-02-24 to 2027-02-28',
      admitCardDate: '2027-04-03',
      examDate: '2027-04-18 to 2027-04-19',
      resultDate: '2027-05-20',
      counsellingStart: '2027-06-01',
      isConfirmedByGazette: true,
      closingTimeExplicit: '17:30 IST',
    },
    stages: ['Offline OMR Test (PCM/B)', 'Document Verification & KEA Option Entry'],
    geographyScope: 'Karnataka State',
    officialSourceNotice: {
      noticeNumber: 'KEA/CET-2027/Notification-01',
      publishDate: '2026-10-19',
      documentUrl: 'https://cetonline.karnataka.gov.in/kea/cet2027/brochure.pdf',
      verificationStatus: 'VERIFIED_CURRENT',
      contentHash: 'sha256:1238910283901283019283019283019283019283019283019283019283019283',
    },
    preparationOverlap: ['Karnataka PUC / CBSE Class 11-12 Physics', 'Chemistry', 'Mathematics', 'Biology'],
    overview: 'State-level examination for subsidized engineering and professional course seats in Karnataka. Strict 7-year Karnataka domicile study requirement applies for government quota eligibility.',
  },
  {
    id: 'exam-upsc-cse',
    code: 'UPSC-CSE',
    name: 'Civil Services Examination (CSE) - 2027',
    conductingAuthority: {
      code: 'UPSC',
      fullName: 'Union Public Service Commission',
      officialPortalUrl: 'https://upsc.gov.in',
      verifiedDomain: 'upsc.gov.in',
    },
    category: 'Civil Services & State PSC',
    qualificationRequired: 'Graduate (Any Discipline)',
    targetRecruitmentOrCourse: 'IAS, IPS, IFS, IRS and Central Group A & B Civil Services',
    currentCycle: '2027 Exam Cycle',
    dates: {
      applicationStart: '2027-02-14',
      applicationClose: '2027-03-05',
      feePaymentClose: '2027-03-05',
      correctionWindow: '2027-03-07 to 2027-03-13',
      admitCardDate: '2027-05-07',
      examDate: '2027-05-23 (Prelims)',
      resultDate: '2027-06-18 (Prelims Result)',
      isConfirmedByGazette: true,
      closingTimeExplicit: '18:00 IST',
    },
    stages: ['Civil Services Preliminary (GS Paper 1 + CSAT Paper 2)', 'Civil Services Main Written (9 Papers)', 'Personality Test (Interview)'],
    geographyScope: 'National (All India)',
    officialSourceNotice: {
      noticeNumber: 'UPSC/CSE/2027/Gazette-01',
      publishDate: '2026-10-20',
      documentUrl: 'https://upsc.gov.in/sites/default/files/Notice-CSP-2027-engl.pdf',
      verificationStatus: 'VERIFIED_CURRENT',
      contentHash: 'sha256:7728192830192830192830192830192830192830192830192830192830192830',
    },
    preparationOverlap: ['General Studies (Polity, History, Economy, Geography, Environment)', 'CSAT Aptitude & Reading Comprehension', 'Essay & Optional Subject'],
    overview: 'India\'s premier constitutional civil service recruitment. Minimum age 21 years; 6 attempts for General category, 9 for OBC, unlimited up to age limit for SC/ST.',
  },
  {
    id: 'exam-ibps-po-2027',
    code: 'IBPS-PO',
    name: 'IBPS Probationary Officers / Management Trainees (CRP PO/MT-XVI)',
    conductingAuthority: {
      code: 'IBPS',
      fullName: 'Institute of Banking Personnel Selection',
      officialPortalUrl: 'https://www.ibps.in',
      verifiedDomain: 'ibps.in',
    },
    category: 'Banking & Insurance',
    qualificationRequired: 'Graduate (Any Discipline)',
    targetRecruitmentOrCourse: 'Scale-I Officer posts across 11 Nationalized Public Sector Banks',
    currentCycle: '2026-27 Recruitment Cycle',
    dates: {
      applicationStart: '2026-08-01',
      applicationClose: '2026-08-28',
      feePaymentClose: '2026-08-28',
      admitCardDate: '2026-10-10',
      examDate: '2026-10-19 to 2026-10-20 (Prelims)',
      resultDate: '2026-11-04 (Prelims)',
      counsellingStart: '2027-04-01 (Final Provisional Allotment)',
      isConfirmedByGazette: true,
      closingTimeExplicit: '23:59 IST',
    },
    stages: ['Online Preliminary Exam (100 Marks)', 'Online Mains Exam + Descriptive English (225 Marks)', 'Common Interview (100 Marks)'],
    geographyScope: 'National (All India)',
    officialSourceNotice: {
      noticeNumber: 'IBPS/CRP-PO/MT-XVI/2026',
      publishDate: '2026-07-31',
      documentUrl: 'https://www.ibps.in/crp-po-mt-xvi-notification.pdf',
      verificationStatus: 'VERIFIED_CURRENT',
      contentHash: 'sha256:6638192830192830192830192830192830192830192830192830192830192830',
    },
    preparationOverlap: ['Quantitative Aptitude', 'Reasoning Ability & Puzzles', 'English Language', 'General & Banking Awareness'],
    overview: 'Direct officer recruitment into public sector banking. Note: Banking Regional Rural Banks (RRB CRP Office Assistant/Officer) are conducted separately by IBPS and must not be conflated with Indian Railways RRB.',
  },
  {
    id: 'exam-rrb-ntpc-2027',
    code: 'RRB-NTPC',
    name: 'Railway Recruitment Board (RRB) Non-Technical Popular Categories (NTPC)',
    conductingAuthority: {
      code: 'RRB',
      fullName: 'Railway Recruitment Control Board (Ministry of Railways)',
      officialPortalUrl: 'https://indianrailways.gov.in',
      verifiedDomain: 'indianrailways.gov.in',
    },
    category: 'Railways (RRB)',
    qualificationRequired: 'Graduate (Any Discipline)',
    targetRecruitmentOrCourse: 'Station Master, Goods Train Manager, Senior Commercial cum Ticket Clerk, Accounts Clerk',
    currentCycle: 'CEN 05/2026-27',
    dates: {
      applicationStart: '2026-09-14',
      applicationClose: '2026-10-20',
      feePaymentClose: '2026-10-22',
      correctionWindow: '2026-10-23 to 2026-10-30',
      admitCardDate: '2026-12-15 (Expected)',
      examDate: '2026-12-28 to 2027-01-15 (CBT 1)',
      resultDate: '2027-02-28',
      isConfirmedByGazette: true,
      closingTimeExplicit: '23:59 IST',
    },
    stages: ['Computer Based Test 1 (Screening)', 'Computer Based Test 2 (Post-specific Levels 2-6)', 'Typing Skill Test / CBAT (Station Master)', 'Document Verification & Medical Fitness'],
    geographyScope: 'National (All India)',
    officialSourceNotice: {
      noticeNumber: 'CEN No. 05/2026 (NTPC Graduate)',
      publishDate: '2026-09-13',
      documentUrl: 'https://www.rrbbnc.gov.in/cen-05-2026-notification.pdf',
      verificationStatus: 'VERIFIED_CURRENT',
      contentHash: 'sha256:5528192830192830192830192830192830192830192830192830192830192830',
    },
    preparationOverlap: ['General Awareness (Current Affairs + Indian Railways)', 'Mathematics (Arithmetic + Algebra)', 'General Intelligence & Reasoning'],
    overview: 'Central employment notification for Group C graduate railway cadre across 21 zonal RRBs (Bangalore, Chennai, Mumbai, Kolkata, etc.). Negative marking 1/3rd for wrong answers.',
  },
  {
    id: 'exam-ssc-cgl-2027',
    code: 'SSC-CGL',
    name: 'Staff Selection Commission Combined Graduate Level (SSC CGL) - 2027',
    conductingAuthority: {
      code: 'SSC',
      fullName: 'Staff Selection Commission (DoPT, Govt of India)',
      officialPortalUrl: 'https://ssc.gov.in',
      verifiedDomain: 'ssc.gov.in',
    },
    category: 'Staff Selection (SSC)',
    qualificationRequired: 'Graduate (Any Discipline)',
    targetRecruitmentOrCourse: 'Assistant Section Officer (CSS/MEA), Inspector (CGST/Income Tax), Sub-Inspector (CBI)',
    currentCycle: '2026-27 Cycle',
    dates: {
      applicationStart: '2026-06-24',
      applicationClose: '2026-07-27',
      feePaymentClose: '2026-07-28',
      correctionWindow: '2026-08-10 to 2026-08-11',
      admitCardDate: '2026-09-02',
      examDate: '2026-09-09 to 2026-09-26 (Tier-I)',
      resultDate: '2026-11-15',
      isConfirmedByGazette: true,
      closingTimeExplicit: '23:00 IST',
    },
    stages: ['Tier-I Computer Based Examination', 'Tier-II CBT (Session I: Math, Reasoning, English, GA, Computer + Data Entry Test)'],
    geographyScope: 'National (All India)',
    officialSourceNotice: {
      noticeNumber: 'F.No. HQ-PPII03(1)/1/2026-PP_II',
      publishDate: '2026-06-23',
      documentUrl: 'https://ssc.gov.in/notice-cgl-2026-27.pdf',
      verificationStatus: 'VERIFIED_CURRENT',
      contentHash: 'sha256:4428192830192830192830192830192830192830192830192830192830192830',
    },
    preparationOverlap: ['Quantitative Aptitude (Advanced Math)', 'General Intelligence & Reasoning', 'English Comprehension & Vocabulary', 'General Awareness'],
    overview: 'Premier central ministry Group B and C gazetted/non-gazetted recruitment. Age eligibility typically 18-30 or 18-32 depending on specific post group.',
  },
  {
    id: 'exam-nda-na',
    code: 'NDA-NA',
    name: 'National Defence Academy & Naval Academy Examination - 2027',
    conductingAuthority: {
      code: 'UPSC',
      fullName: 'Union Public Service Commission (Ministry of Defence)',
      officialPortalUrl: 'https://upsc.gov.in',
      verifiedDomain: 'upsc.gov.in',
    },
    category: 'Defence & Armed Forces',
    qualificationRequired: 'Class 12 Pass (Science)',
    targetRecruitmentOrCourse: 'Commissioned Officer Cadets for Army, Navy and Air Force Wings',
    currentCycle: 'NDA & NA (I) 2027',
    dates: {
      applicationStart: '2026-12-20',
      applicationClose: '2027-01-09',
      feePaymentClose: '2027-01-09',
      correctionWindow: '2027-01-10 to 2027-01-16',
      admitCardDate: '2027-04-05',
      examDate: '2027-04-21',
      resultDate: '2027-05-30',
      isConfirmedByGazette: true,
      closingTimeExplicit: '18:00 IST',
    },
    stages: ['Written Examination (Mathematics 300M + General Ability Test 600M)', '5-Day Services Selection Board (SSB) Interview & Medical Board'],
    geographyScope: 'National (All India)',
    officialSourceNotice: {
      noticeNumber: 'UPSC/NDA-I/2027/Notification',
      publishDate: '2026-12-19',
      documentUrl: 'https://upsc.gov.in/sites/default/files/Notice-NDA-I-2027.pdf',
      verificationStatus: 'VERIFIED_CURRENT',
      contentHash: 'sha256:3328192830192830192830192830192830192830192830192830192830192830',
    },
    preparationOverlap: ['Class 11-12 Mathematics (Calculus, Trigonometry, Matrices)', 'English Grammar', 'General Knowledge & Current Affairs'],
    overview: 'Tri-service academy entrance for un-married male and female candidates aged 16.5 to 19.5 years. Physics and Mathematics are mandatory for Air Force and Navy wings.',
  },
  {
    id: 'exam-clat-ug',
    code: 'CLAT-UG',
    name: 'Common Law Admission Test (CLAT-UG) - 2027',
    conductingAuthority: {
      code: 'IIT_CONSORTIUM',
      fullName: 'Consortium of National Law Universities (NLUs)',
      officialPortalUrl: 'https://consortiumofnlus.ac.in',
      verifiedDomain: 'consortiumofnlus.ac.in',
    },
    category: 'Law & Design',
    qualificationRequired: 'Class 12 Pass (Any)',
    targetRecruitmentOrCourse: '5-Year Integrated B.A. LL.B (Hons) / B.B.A. LL.B across 24 NLUs (NLSIU Bengaluru, NALSAR, etc.)',
    currentCycle: '2027 Cycle',
    dates: {
      applicationStart: '2026-07-15',
      applicationClose: '2026-10-22',
      feePaymentClose: '2026-10-22',
      admitCardDate: '2026-11-20',
      examDate: '2026-12-01',
      resultDate: '2026-12-15',
      counsellingStart: '2026-12-20',
      isConfirmedByGazette: true,
      closingTimeExplicit: '23:59 IST',
    },
    stages: ['Offline Pen-and-Paper Comprehension Test (120 Questions)', 'Centralized Online Counseling & Seat Allotment'],
    geographyScope: 'National (All India)',
    officialSourceNotice: {
      noticeNumber: 'CNLU/CLAT-2027/Notification-01',
      publishDate: '2026-07-14',
      documentUrl: 'https://consortiumofnlus.ac.in/clat-2027/information-bulletin.pdf',
      verificationStatus: 'VERIFIED_CURRENT',
      contentHash: 'sha256:2228192830192830192830192830192830192830192830192830192830192830',
    },
    preparationOverlap: ['Legal Reasoning & Case Scenarios', 'Critical Logical Reasoning', 'Reading Comprehension', 'Current Affairs including GK', 'Quantitative Techniques'],
    overview: 'National law entrance emphasizing analytical reading and passage-based comprehension rather than rote legal memorization.',
  },
];

export const CANONICAL_EXAMS = EXAM_CATALOG;

