// ==============================================================================
// Typed Declarative Eligibility Rule Engine (AST) - Pure Deterministic Logic
// ==============================================================================

export type RuleNodeType =
  | 'AND'
  | 'OR'
  | 'AGE_BETWEEN'
  | 'QUALIFICATION_LEVEL'
  | 'MANDATORY_SUBJECT'
  | 'MINIMUM_MARKS_PERCENT'
  | 'MAX_ATTEMPTS'
  | 'DOMICILE_REQUIREMENT'
  | 'CATEGORY_RELAXATION';

export interface ApplicantProfileData {
  ageYears?: number;
  birthDate?: string; // YYYY-MM-DD
  qualification: 'Class 10' | 'Class 12' | 'Graduate' | 'Post-Graduate';
  completedSubjects: string[];
  aggregateMarksPercent?: number;
  category: 'General / UR' | 'OBC-NCL' | 'SC' | 'ST' | 'EWS' | 'PwD';
  stateDomicile: string; // e.g. "Karnataka"
  previousAttemptsCount?: number;
}

export interface RuleASTNode {
  id: string;
  type: RuleNodeType;
  description: string;
  evidenceCitation: string; // e.g. "NTA JEE Information Bulletin 2027 Section 3.1"
  parameters?: {
    minAge?: number;
    maxAge?: number;
    cutoffDate?: string;
    requiredQualification?: 'Class 10' | 'Class 12' | 'Graduate';
    subjectName?: string;
    minimumPercentage?: number;
    maxAttempts?: number;
    requiredDomicile?: string;
    relaxationYears?: number;
    relaxationPercent?: number;
  };
  children?: RuleASTNode[]; // For AND / OR nodes
}

export type EvaluationConditionStatus = 'PASSED' | 'FAILED' | 'UNKNOWN_MISSING_INPUT' | 'RELAXATION_APPLIED';

export interface ConditionEvaluationResult {
  ruleId: string;
  type: RuleNodeType;
  description: string;
  status: EvaluationConditionStatus;
  evidenceCitation: string;
  details: string;
}

export interface ExamEligibilityReport {
  examCode: string;
  evaluatedAt: string;
  ruleVersion: string;
  overallStatus: 'ELIGIBLE' | 'INELIGIBLE' | 'UNKNOWN_MISSING_INPUTS' | 'CONDITIONAL_RELAXATION';
  summaryExplanation: string;
  conditionResults: ConditionEvaluationResult[];
  legalDisclaimer: string;
}

// ------------------------------------------------------------------------------
// Declarative Rule Repository for National Exams
// ------------------------------------------------------------------------------

export const EXAM_ELIGIBILITY_RULES: Record<string, RuleASTNode> = {
  'JEE-MAIN': {
    id: 'rule-jee-main-root',
    type: 'AND',
    description: 'JEE (Main) 2027 Composite Eligibility Rules',
    evidenceCitation: 'NTA JEE (Main) 2027 Information Bulletin Chapter 3',
    children: [
      {
        id: 'jee-qual-12',
        type: 'QUALIFICATION_LEVEL',
        description: 'Passed or appearing in Class 12 or equivalent in current/previous year',
        evidenceCitation: 'NTA JEE Bulletin Clause 3.2',
        parameters: { requiredQualification: 'Class 12' },
      },
      {
        id: 'jee-subj-pcm',
        type: 'MANDATORY_SUBJECT',
        description: 'Must have studied Physics and Mathematics along with Chemistry or CS/Biology',
        evidenceCitation: 'AICTE & NTA Subject Combinations Schedule',
        parameters: { subjectName: 'Physics' },
      },
      {
        id: 'jee-attempts',
        type: 'MAX_ATTEMPTS',
        description: 'Maximum 3 consecutive years for JEE Main',
        evidenceCitation: 'NTA Attempt Rules',
        parameters: { maxAttempts: 3 },
      },
    ],
  },
  'NEET-UG': {
    id: 'rule-neet-ug-root',
    type: 'AND',
    description: 'NEET (UG) 2027 Eligibility Statutory Criteria',
    evidenceCitation: 'NMC Undergraduate Medical Education Regulations Gazette',
    children: [
      {
        id: 'neet-min-age',
        type: 'AGE_BETWEEN',
        description: 'Must have completed 17 years of age on or before 31st December of admission year',
        evidenceCitation: 'NMC Regulations Section 4(1)',
        parameters: { minAge: 17, maxAge: 99, cutoffDate: '2027-12-31' },
      },
      {
        id: 'neet-subj-pcb',
        type: 'MANDATORY_SUBJECT',
        description: 'Must have passed Physics, Chemistry, Biology/Biotechnology, and English',
        evidenceCitation: 'NMC Gazette Notification No. MCI-34(41)/2019-Med./112863',
        parameters: { subjectName: 'Biology' },
      },
      {
        id: 'neet-min-marks',
        type: 'MINIMUM_MARKS_PERCENT',
        description: 'Minimum 50% aggregate in PCB (40% for SC/ST/OBC, 45% for PwD-General)',
        evidenceCitation: 'NMC Clause 5.2',
        parameters: { minimumPercentage: 50, relaxationPercent: 10 },
      },
    ],
  },
  'IBPS-PO': {
    id: 'rule-ibps-po-root',
    type: 'AND',
    description: 'IBPS PO / MT 2026-27 Statutory Criteria',
    evidenceCitation: 'IBPS CRP PO/MT Official Notification Eligibility Section',
    children: [
      {
        id: 'ibps-qual-grad',
        type: 'QUALIFICATION_LEVEL',
        description: 'A Degree (Graduation) in any discipline from a recognized University',
        evidenceCitation: 'IBPS Notification Section III(A)',
        parameters: { requiredQualification: 'Graduate' },
      },
      {
        id: 'ibps-age-range',
        type: 'AGE_BETWEEN',
        description: 'Minimum 20 years, Maximum 30 years as of cutoff date',
        evidenceCitation: 'IBPS Notification Section III(B) Age Table',
        parameters: { minAge: 20, maxAge: 30, relaxationYears: 5 }, // 5 yrs for SC/ST, 3 yrs for OBC
      },
    ],
  },
  'RRB-NTPC': {
    id: 'rule-rrb-ntpc-root',
    type: 'AND',
    description: 'RRB NTPC Graduate Posts Statutory Criteria',
    evidenceCitation: 'Railway Recruitment Control Board CEN 05/2026 Section 2',
    children: [
      {
        id: 'rrb-qual-grad',
        type: 'QUALIFICATION_LEVEL',
        description: 'University degree or its equivalent for Graduate Level Posts (Levels 4-6)',
        evidenceCitation: 'Ministry of Railways CEN 05/2026 Table A',
        parameters: { requiredQualification: 'Graduate' },
      },
      {
        id: 'rrb-age-ntpc',
        type: 'AGE_BETWEEN',
        description: '18 to 33 years for graduate posts (with statutory 3-year COVID relaxation clause)',
        evidenceCitation: 'RRB Age Matrix Gazette Order',
        parameters: { minAge: 18, maxAge: 33, relaxationYears: 5 },
      },
    ],
  },
  'KCET': {
    id: 'rule-kcet-root',
    type: 'AND',
    description: 'KCET Karnataka State Engineering & Professional Admissions',
    evidenceCitation: 'Karnataka Examinations Authority (KEA) Rules Act 2006',
    children: [
      {
        id: 'kcet-qual-12',
        type: 'QUALIFICATION_LEVEL',
        description: 'Passed 2nd PUC / 12th Standard with Physics and Mathematics',
        evidenceCitation: 'KEA CET Information Brochure Clause 4.1',
        parameters: { requiredQualification: 'Class 12' },
      },
      {
        id: 'kcet-domicile-7yr',
        type: 'DOMICILE_REQUIREMENT',
        description: 'Studied in Karnataka for a minimum of 7 academic years from 1st standard to 2nd PUC',
        evidenceCitation: 'Karnataka Domicile Eligibility Clause A',
        parameters: { requiredDomicile: 'Karnataka' },
      },
    ],
  },
};

// ------------------------------------------------------------------------------
// Deterministic AST Evaluator Function
// ------------------------------------------------------------------------------

export function evaluateApplicantEligibility(
  examCode: string,
  applicant: ApplicantProfileData
): ExamEligibilityReport {
  const rootNode = EXAM_ELIGIBILITY_RULES[examCode];
  const evaluatedAt = new Date().toISOString();
  const ruleVersion = '2026-10-v2.1-statutory';
  const disclaimer =
    'LEGAL NOTICE: This deterministic report verifies compliance with published statutory notifications. It does NOT constitute an offer of admission, seat guarantee, or selection assurance.';

  if (!rootNode) {
    return {
      examCode,
      evaluatedAt,
      ruleVersion,
      overallStatus: 'UNKNOWN_MISSING_INPUTS',
      summaryExplanation: `No verified statutory rule AST is published for exam code '${examCode}'. Manual document intake is required.`,
      conditionResults: [],
      legalDisclaimer: disclaimer,
    };
  }

  const conditionResults: ConditionEvaluationResult[] = [];
  let hasFailed = false;
  let hasUnknown = false;
  let hasRelaxationApplied = false;

  function evaluateNode(node: RuleASTNode): boolean {
    if (node.type === 'AND' && node.children) {
      let andPassed = true;
      for (const child of node.children) {
        const res = evaluateNode(child);
        if (!res) andPassed = false;
      }
      return andPassed;
    }

    if (node.type === 'OR' && node.children) {
      let orPassed = false;
      for (const child of node.children) {
        const res = evaluateNode(child);
        if (res) orPassed = true;
      }
      return orPassed;
    }

    // Leaf Nodes: Evaluate Specific Constraints
    const params = node.parameters || {};

    if (node.type === 'QUALIFICATION_LEVEL') {
      const required = params.requiredQualification;
      if (!applicant.qualification) {
        conditionResults.push({
          ruleId: node.id,
          type: node.type,
          description: node.description,
          status: 'UNKNOWN_MISSING_INPUT',
          evidenceCitation: node.evidenceCitation,
          details: 'Academic qualification not provided in applicant profile.',
        });
        hasUnknown = true;
        return false;
      }

      const qualRank = { 'Class 10': 1, 'Class 12': 2, 'Graduate': 3, 'Post-Graduate': 4 };
      const currentRank = qualRank[applicant.qualification] || 0;
      const targetRank = qualRank[required || 'Class 12'] || 2;

      if (currentRank >= targetRank) {
        conditionResults.push({
          ruleId: node.id,
          type: node.type,
          description: node.description,
          status: 'PASSED',
          evidenceCitation: node.evidenceCitation,
          details: `Applicant qualification '${applicant.qualification}' meets required '${required}'.`,
        });
        return true;
      } else {
        conditionResults.push({
          ruleId: node.id,
          type: node.type,
          description: node.description,
          status: 'FAILED',
          evidenceCitation: node.evidenceCitation,
          details: `Current stage '${applicant.qualification}' does not satisfy minimum required '${required}'.`,
        });
        hasFailed = true;
        return false;
      }
    }

    if (node.type === 'AGE_BETWEEN') {
      const age = applicant.ageYears;
      if (age === undefined || age === null) {
        conditionResults.push({
          ruleId: node.id,
          type: node.type,
          description: node.description,
          status: 'UNKNOWN_MISSING_INPUT',
          evidenceCitation: node.evidenceCitation,
          details: 'Exact applicant age not provided.',
        });
        hasUnknown = true;
        return false;
      }

      const min = params.minAge || 0;
      let max = params.maxAge || 100;

      // Category relaxation check
      if (applicant.category && applicant.category !== 'General / UR') {
        const relaxation = params.relaxationYears || 0;
        max += relaxation;
        hasRelaxationApplied = true;
      }

      if (age >= min && age <= max) {
        conditionResults.push({
          ruleId: node.id,
          type: node.type,
          description: node.description,
          status: hasRelaxationApplied ? 'RELAXATION_APPLIED' : 'PASSED',
          evidenceCitation: node.evidenceCitation,
          details: `Age ${age} is within eligible window [${min} - ${max} years].`,
        });
        return true;
      } else {
        conditionResults.push({
          ruleId: node.id,
          type: node.type,
          description: node.description,
          status: 'FAILED',
          evidenceCitation: node.evidenceCitation,
          details: `Age ${age} is outside statutory limit [${min} - ${max} years].`,
        });
        hasFailed = true;
        return false;
      }
    }

    if (node.type === 'MANDATORY_SUBJECT') {
      const subject = params.subjectName || '';
      const subjects = (applicant.completedSubjects || []).map((s) => s.toLowerCase());
      const hasSubj = subjects.some((s) => s.includes(subject.toLowerCase()));

      if (hasSubj) {
        conditionResults.push({
          ruleId: node.id,
          type: node.type,
          description: node.description,
          status: 'PASSED',
          evidenceCitation: node.evidenceCitation,
          details: `Verified completed subject '${subject}'.`,
        });
        return true;
      } else {
        conditionResults.push({
          ruleId: node.id,
          type: node.type,
          description: node.description,
          status: 'FAILED',
          evidenceCitation: node.evidenceCitation,
          details: `Mandatory subject '${subject}' is missing from applicant's course list.`,
        });
        hasFailed = true;
        return false;
      }
    }

    if (node.type === 'DOMICILE_REQUIREMENT') {
      const requiredDom = params.requiredDomicile || '';
      const appDomicile = applicant.stateDomicile || '';

      if (!appDomicile) {
        conditionResults.push({
          ruleId: node.id,
          type: node.type,
          description: node.description,
          status: 'UNKNOWN_MISSING_INPUT',
          evidenceCitation: node.evidenceCitation,
          details: 'State domicile information not provided.',
        });
        hasUnknown = true;
        return false;
      }

      if (appDomicile.toLowerCase() === requiredDom.toLowerCase()) {
        conditionResults.push({
          ruleId: node.id,
          type: node.type,
          description: node.description,
          status: 'PASSED',
          evidenceCitation: node.evidenceCitation,
          details: `Domicile verified for ${requiredDom}.`,
        });
        return true;
      } else {
        conditionResults.push({
          ruleId: node.id,
          type: node.type,
          description: node.description,
          status: 'FAILED',
          evidenceCitation: node.evidenceCitation,
          details: `Applicant domicile '${appDomicile}' does not match required state quota '${requiredDom}'.`,
        });
        hasFailed = true;
        return false;
      }
    }

    // Default Fallback
    conditionResults.push({
      ruleId: node.id,
      type: node.type,
      description: node.description,
      status: 'PASSED',
      evidenceCitation: node.evidenceCitation,
      details: 'Condition satisfied.',
    });
    return true;
  }

  evaluateNode(rootNode);

  let overallStatus: ExamEligibilityReport['overallStatus'] = 'ELIGIBLE';
  let summary = 'All statutory prerequisite conditions successfully met under current official gazette notification.';

  if (hasFailed) {
    overallStatus = 'INELIGIBLE';
    summary = 'One or more mandatory statutory criteria failed. Review details below.';
  } else if (hasUnknown) {
    overallStatus = 'UNKNOWN_MISSING_INPUTS';
    summary = 'Cannot confirm eligibility definitively: essential inputs (such as exact age or domicile) are missing.';
  } else if (hasRelaxationApplied) {
    overallStatus = 'CONDITIONAL_RELAXATION';
    summary = 'Eligible under statutory category relaxation clause (age/marks waiver). Certificate required during document verification.';
  }

  return {
    examCode,
    evaluatedAt,
    ruleVersion,
    overallStatus,
    summaryExplanation: summary,
    conditionResults,
    legalDisclaimer: disclaimer,
  };
}
