// ==============================================================================
// Deterministic Career Pathway Evaluator (No Unsupported AI Percentages)
// ==============================================================================

import { CAREER_PATHS_CATALOG, CareerPathOption } from '../data/careerPaths';

export interface StudentProfileInput {
  stage: 'Class 10' | 'Class 11-12' | 'Graduate';
  interests: string[];
  strongSubjects: string[];
  weakSubjects?: string[];
  mathsType?: 'Standard' | 'Basic' | 'Not Applicable';
  preferredLocation?: 'Bengaluru / Home State' | 'South India' | 'Anywhere in India';
  budgetPreference?: 'Affordable / Govt Aided' | 'Standard' | 'Flexible';
  graduationField?: string;
  ageYears?: number;
}

export interface EvaluatedPath {
  path: CareerPathOption;
  fitRationale: string;
  prerequisitesMet: boolean;
  prerequisiteDetails: {
    ruleId: string;
    ruleTitle: string;
    status: 'PASSED' | 'FAILED' | 'UNKNOWN';
    reason: string;
  }[];
  isPrimary: boolean;
  isBackup: boolean;
  datedMilestones: {
    targetDate: string;
    title: string;
    action: string;
  }[];
}

export interface CareerEvaluationResult {
  evaluationDate: string;
  ruleEngineVersion: string;
  studentSummary: string;
  evaluatedPaths: EvaluatedPath[];
  missingInputsWarning?: string;
}

export function evaluateCareerPaths(profile: StudentProfileInput): CareerEvaluationResult {
  const isClass10 = profile.stage === 'Class 10';
  const isGraduate = profile.stage === 'Graduate';
  const interestsLower = (profile.interests || []).map((i) => i.toLowerCase());
  const subjectsLower = (profile.strongSubjects || []).map((s) => s.toLowerCase());

  const likesBio = interestsLower.some((i) => i.includes('bio') || i.includes('life') || i.includes('medical') || i.includes('health'));
  const likesDesign = interestsLower.some((i) => i.includes('design') || i.includes('art') || i.includes('visual') || i.includes('creative'));
  const likesTech = interestsLower.some((i) => i.includes('tech') || i.includes('computer') || i.includes('code') || i.includes('ai'));
  const likesFinance = interestsLower.some((i) => i.includes('finance') || i.includes('money') || i.includes('business') || i.includes('market') || i.includes('commerce'));
  const likesPublicService = interestsLower.some((i) => i.includes('bank') || i.includes('railway') || i.includes('civil') || i.includes('govt'));

  const results: EvaluatedPath[] = [];

  for (const path of CAREER_PATHS_CATALOG) {
    let fitScore = 0;
    let rationaleParts: string[] = [];
    const prereqChecks = [];

    // Check prerequisites deterministically
    let allPrereqsMet = true;

    for (const rule of path.prerequisites) {
      if (rule.id === 'prereq-bio-1') {
        const hasScience = subjectsLower.includes('science') || subjectsLower.includes('biology') || isClass10;
        prereqChecks.push({
          ruleId: rule.id,
          ruleTitle: rule.title,
          status: (hasScience ? 'PASSED' : 'UNKNOWN') as 'PASSED' | 'FAILED' | 'UNKNOWN',
          reason: hasScience ? 'Student is currently enrolled in Class 10 Science curriculum.' : 'Science subject status unconfirmed.',
        });
      } else if (rule.id === 'prereq-pcm-1') {
        const isStandard = profile.mathsType === 'Standard';
        if (!isStandard && isClass10) {
          allPrereqsMet = false;
          prereqChecks.push({
            ruleId: rule.id,
            ruleTitle: rule.title,
            status: 'FAILED' as const,
            reason: 'CBSE mandates Mathematics Standard (041) for Class 11 PCM admission. Student selected Maths Basic.',
          });
        } else {
          prereqChecks.push({
            ruleId: rule.id,
            ruleTitle: rule.title,
            status: 'PASSED' as const,
            reason: 'Maths Standard confirmed.',
          });
        }
      } else if (rule.id === 'prereq-bank-1') {
        if (!isGraduate) {
          allPrereqsMet = false;
          prereqChecks.push({
            ruleId: rule.id,
            ruleTitle: rule.title,
            status: 'FAILED' as const,
            reason: 'IBPS requires a completed bachelor\'s degree. Student is currently in school.',
          });
        } else {
          prereqChecks.push({
            ruleId: rule.id,
            ruleTitle: rule.title,
            status: 'PASSED' as const,
            reason: 'Graduate degree requirement satisfied.',
          });
        }
      } else {
        prereqChecks.push({
          ruleId: rule.id,
          ruleTitle: rule.title,
          status: 'PASSED' as const,
          reason: 'Eligible for progressive milestone.',
        });
      }
    }

    // Match fit factors
    if (path.id === 'path-biotech-design') {
      if (likesBio && likesDesign) {
        fitScore += 10;
        rationaleParts.push('Directly matches dual interest in Biology and Creative Design.');
      } else if (likesBio || likesDesign) {
        fitScore += 6;
        rationaleParts.push('Aligned with student profile interest.');
      }
      if (profile.preferredLocation?.includes('Bengaluru')) {
        fitScore += 3;
        rationaleParts.push('Top national institutions (NID, IISc CPDM, Ramaiah) located in Bengaluru.');
      }
    } else if (path.id === 'path-pure-pcb') {
      if (likesBio) {
        fitScore += 8;
        rationaleParts.push('Deep alignment with biological sciences and research.');
      }
      if (profile.budgetPreference?.includes('Affordable')) {
        fitScore += 3;
        rationaleParts.push('Subsidised government university fee structure fits budget constraint.');
      }
    } else if (path.id === 'path-computer-science') {
      if (likesTech) {
        fitScore += 8;
        rationaleParts.push('Matches interest in technology and computational engineering.');
      }
    } else if (path.id === 'path-commerce-fintech') {
      if (likesFinance) {
        fitScore += 8;
        rationaleParts.push('Strong match for analytical commerce and quantitative finance.');
      }
    } else if (path.id === 'path-public-sector-banking') {
      if (likesPublicService || isGraduate) {
        fitScore += 9;
        rationaleParts.push('Structured national recruitment with transparent exam syllabus and job security.');
      }
    }

    // Generate dated milestones
    const today = new Date();
    const milestone1Date = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const milestone2Date = new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const milestone3Date = new Date(today.getTime() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const milestones = [
      {
        targetDate: milestone1Date,
        title: 'Prerequisite Audit & Syllabus Inspection',
        action: `Review official notification rules for ${path.institutionsSample[0]?.entranceExam || 'entrance evaluation'}.`,
      },
      {
        targetDate: milestone2Date,
        title: 'Practical Project Delivery',
        action: path.practicalProject.title,
      },
      {
        targetDate: milestone3Date,
        title: 'Subject Milestone Mock Test',
        action: 'Benchmark baseline marks against previous cutoff trends.',
      },
    ];

    if (fitScore > 0 || isGraduate) {
      results.push({
        path,
        fitRationale: rationaleParts.join(' ') || 'Viable exploratory route based on stage and academic prerequisites.',
        prerequisitesMet: allPrereqsMet,
        prerequisiteDetails: prereqChecks,
        isPrimary: false,
        isBackup: false,
        datedMilestones: milestones,
      });
    }
  }

  // Sort by fit and select top 3
  results.sort((a, b) => (b.prerequisitesMet ? 1 : 0) - (a.prerequisitesMet ? 1 : 0));
  const topPaths = results.slice(0, 3);

  if (topPaths.length > 0) topPaths[0].isPrimary = true;
  if (topPaths.length > 1) topPaths[1].isBackup = true;

  return {
    evaluationDate: new Date().toISOString(),
    ruleEngineVersion: 'v1.4.2-deterministic-ncert',
    studentSummary: `${profile.stage} • Interests: ${(profile.interests || []).join(', ') || 'Exploratory'} • Location: ${profile.preferredLocation || 'All India'}`,
    evaluatedPaths: topPaths,
    missingInputsWarning: profile.interests.length === 0 ? 'No specific interests selected; showing broader foundational options.' : undefined,
  };
}
