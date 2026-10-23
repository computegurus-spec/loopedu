// ==============================================================================
// Synthetic Notice Amendment & Watchlist Recalculation Engine
// ==============================================================================

export interface StoredAmendment {
  id: string;
  examFamily: string;
  noticeNumber: string;
  title: string;
  summary: string;
  sourceUrl: string;
  effectiveDate: string;
  verifiedBy: string;
  scope: string;
  authority: string;
}

export const SYNTHETIC_AMENDMENTS: StoredAmendment[] = [
  {
    id: 'amend_jee_2027_01',
    examFamily: 'JEE',
    noticeNumber: 'NTA/JEE-Main/2027/Notice-04',
    title: 'Extension of Online Application Window for Session 1',
    summary: 'NTA has extended the online submission window by 4 days to accommodate candidates from remote and hill regions.',
    sourceUrl: 'https://nta.ac.in',
    effectiveDate: '2026-10-22',
    verifiedBy: 'Dr. Anita Desai (Reviewer)',
    scope: 'All India Engineering Aspirants',
    authority: 'National Testing Agency (NTA)',
  },
  {
    id: 'amend_kcet_2027_01',
    examFamily: 'KCET',
    noticeNumber: 'KEA/KCET/2027/Admission-Rule-02',
    title: 'Clarification on Class 10/12 Kannada Medium Study Proof',
    summary: 'KEA gazette notice clarifying affidavit requirements for 7-year rural and Kannada medium quota eligibility.',
    sourceUrl: 'https://cetonline.karnataka.gov.in',
    effectiveDate: '2026-10-20',
    verifiedBy: 'Vikram Rao (Senior Editor)',
    scope: 'Karnataka State Admissions',
    authority: 'Karnataka Examinations Authority (KEA)',
  },
  {
    id: 'amend_rrb_ntpc_2026_02',
    examFamily: 'RRB NTPC',
    noticeNumber: 'RRB/CEN-05/Corrigendum-01',
    title: 'Corrigendum on EWS Certificate Validity Window',
    summary: 'Ministry of Railways clarification regarding Financial Year 2025-2026 Income & Asset certificate validity for Level 5/6 posts.',
    sourceUrl: 'https://indianrailways.gov.in',
    effectiveDate: '2026-10-18',
    verifiedBy: 'Meera Sundaram (Review Authority)',
    scope: 'Graduate Recruitment Posts',
    authority: 'Ministry of Railways (RRB)',
  },
];

export interface ExamAmendmentRecord {
  id: string;
  examCode: string;
  fieldChanged: string; // e.g. "applicationClose"
  previousValue: string;
  newValue: string;
  amendmentReason: string;
  gazetteNoticeRef: string;
  authorizedEditor: string;
  reviewedBy: string; // Distinct from author
  effectiveTimestamp: string;
  contentHash: string;
  acknowledgedByUserIds: string[];
}

export const INITIAL_AMENDMENTS_LOG: ExamAmendmentRecord[] = [
  {
    id: 'amend-jee-2027-01',
    examCode: 'JEE-MAIN',
    fieldChanged: 'applicationClose',
    previousValue: '2026-11-30',
    newValue: '2026-12-04',
    amendmentReason: 'NTA Public Notice regarding server maintenance window & extension for Jammu & Kashmir / NE candidates',
    gazetteNoticeRef: 'NTA/JEE-Main/Ext-02/2026',
    authorizedEditor: 'Vikram Rao (Senior Editor)',
    reviewedBy: 'Dr. Anita Desai (Reviewing Authority)',
    effectiveTimestamp: '2026-10-21T14:30:00Z',
    contentHash: 'sha256:8838192830192830192830192830192830192830192830192830192830192830',
    acknowledgedByUserIds: ['demo-student-aarav'],
  },
  {
    id: 'amend-rrb-ntpc-02',
    examCode: 'RRB-NTPC',
    fieldChanged: 'correctionWindow',
    previousValue: '2026-10-25 to 2026-10-28',
    newValue: '2026-10-23 to 2026-10-30',
    amendmentReason: 'Ministry of Railways gazette corrigendum expanding photograph/signature re-upload window',
    gazetteNoticeRef: 'RRB/CEN-05/Corrigendum-1',
    authorizedEditor: 'Vikram Rao',
    reviewedBy: 'Meera Sundaram',
    effectiveTimestamp: '2026-10-22T09:15:00Z',
    contentHash: 'sha256:7738192830192830192830192830192830192830192830192830192830192830',
    acknowledgedByUserIds: [],
  },
];

export function getExamAmendments(examCode?: string): ExamAmendmentRecord[] {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('loopedu_amendments');
    if (stored) {
      try {
        const all: ExamAmendmentRecord[] = JSON.parse(stored);
        if (examCode) return all.filter((a) => a.examCode === examCode);
        return all;
      } catch (e) {}
    }
  }
  if (examCode) return INITIAL_AMENDMENTS_LOG.filter((a) => a.examCode === examCode);
  return INITIAL_AMENDMENTS_LOG;
}

export function publishSyntheticAmendment(amendment: Omit<ExamAmendmentRecord, 'id' | 'effectiveTimestamp' | 'contentHash' | 'acknowledgedByUserIds'>): ExamAmendmentRecord {
  const newRecord: ExamAmendmentRecord = {
    ...amendment,
    id: `amend-${Date.now()}`,
    effectiveTimestamp: new Date().toISOString(),
    contentHash: `sha256:${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
    acknowledgedByUserIds: [],
  };

  if (typeof window !== 'undefined') {
    const existing = getExamAmendments();
    const updated = [newRecord, ...existing];
    localStorage.setItem('loopedu_amendments', JSON.stringify(updated));

    // Also dispatch a custom event for immediate UI recalculation
    window.dispatchEvent(new CustomEvent('loopedu_amendment_published', { detail: newRecord }));
  }

  return newRecord;
}

export function acknowledgeAmendment(amendmentId: string, userId: string) {
  if (typeof window !== 'undefined') {
    const existing = getExamAmendments();
    const updated = existing.map((a) => {
      if (a.id === amendmentId && !a.acknowledgedByUserIds.includes(userId)) {
        return {
          ...a,
          acknowledgedByUserIds: [...a.acknowledgedByUserIds, userId],
        };
      }
      return a;
    });
    localStorage.setItem('loopedu_amendments', JSON.stringify(updated));
  }
}
