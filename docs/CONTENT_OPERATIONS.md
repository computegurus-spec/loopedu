# Lood-edu Content Operations & Editorial Integrity

**Prepared for:** Blocks and Loops Technologies Pvt Ltd  
**Version:** 1.0  

---

## 1. Statutory Source Registry & Crawling Hygiene

Lood-edu strictly restricts factual and regulatory ingestion to verified statutory authorities and government domains. Third-party coaching blogs, unverified aggregator portals, and social media rumours are strictly blocked.

### 1.1. Core Statutory Authority Registry
| Authority Name | Official Primary Domain | Scope | Typical Update Cadence | Ingestion Policy |
|---|---|---|---|---|
| **National Testing Agency (NTA)** | `nta.ac.in` / `jeemain.nta.nic.in` | JEE Main, NEET UG, CUET UG/PG | 6 hours | Automated fetch + SSRF check |
| **Union Public Service Commission (UPSC)** | `upsc.gov.in` | CSE, NDA, CDS, CAPF, Engineering Services | 12 hours | Automated fetch + Gazetted check |
| **Staff Selection Commission (SSC)** | `ssc.gov.in` | CGL, CHSL, MTS, CPO | 12 hours | Automated portal intake |
| **Institute of Banking Personnel Selection (IBPS)** | `ibps.in` | PO, Clerk, Specialist Officer, RRB Officer | 12 hours | Automated portal intake |
| **Ministry of Railways (RRB Central)** | `indianrailways.gov.in` / `rrbapply.gov.in` | NTPC, ALP, Technicians, Group D | 24 hours | Gazetted notification check |
| **Karnataka Examinations Authority (KEA)** | `cetonline.karnataka.gov.in` | KCET, PGCET, State Counselling | 12 hours | State gazette verification |
| **National Scholarship Portal (NSP)** | `scholarships.gov.in` | Central Sector Schemes, Post-Matric | 24 hours | Scheme guidelines intake |
| **University Grants Commission (UGC)** | `ugc.gov.in` | Autonomous Recognition, Deemed Status | Weekly | Accreditation registry sync |

### 1.2. SSRF Protection & Ingestion Boundaries
- **Network Boundaries:** Target URLs are strictly verified via `validateUrlForSsrf()`. All attempts to resolve `localhost`, `127.0.0.1`, `::1`, RFC 1918 private subnets (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), or cloud instance metadata (`169.254.169.254`) are immediately rejected.
- **Payload Boundaries:** Maximum document size is capped at 2MB; request timeout is enforced at 5,000ms.
- **Redirection Validation:** HTTP 3xx redirects are evaluated independently; destinations must satisfy SSRF constraints before following.

---

## 2. Multi-Stage Editorial Pipeline

Every public factual claim (dates, quotas, prerequisite subjects, fees) moves through a 7-stage state machine:

```
[1. Discovered] 
      │ (Raw portal notice or gazette PDF scraped)
      ▼
[2. Extracted Draft] 
      │ (Structured data extracted; AI summaries strictly labeled DRAFT)
      ▼
[3. Evidence Checked] 
      │ (Passage citation locator and SHA-256 content hash verified)
      ▼
[4. Consistency Checked] 
      │ (Cross-checked against existing gazette amendments & exceptions)
      ▼
[5. Application Reviewed] 
      │ (Independent human reviewer confirms cohort and cycle scope)
      ▼
[6. Approved] 
      │ (Cryptographic sign-off by authorized reviewer; Author != Reviewer)
      ▼
[7. Published] 
      │ (Propagated to public catalog and user watchlists)
      ▼
[Amended / Superseded / Withdrawn] (If subsequent corrigendum issued)
```

### 2.1. Dual-Authorization Invariant
To prevent editorial fraud or accidental publishing:
- An author/submitter cannot approve their own submission (`authorId !== reviewerId`).
- A critical publication event requires two distinct verified staff identities.
- AI models are strictly prohibited from acting as approving authorities.

---

## 3. Synthetic Notice Amendments & Plan Propagation

When an authority publishes a corrigendum (e.g. NTA extending the JEE application window by 4 days, or KEA clarifying rural quota affidavits):
1. The amendment is entered into the editorial registry with `fieldChanged`, `previousValue`, `newValue`, `amendmentReason`, and `gazetteNoticeRef`.
2. The recalculation engine identifies all users who have saved or watchlisted the affected exam.
3. User study plans and deadline alerts are updated immediately with a clear delta indicator.
4. Notifications are deduplicated using a unique key (`${userId}:${amendmentId}`) so retries never create duplicate alerts.
5. In the student view, the change is displayed with an authoritative badge and an explicit link to the statutory gazette notice.

---

## 4. Content Honesty Standards

Lood-edu enforces strict truth-in-advertising guidelines:
- **No Fabricated Admissions Probabilities:** We never present "94% chance of admission" without validated historical seat allocation models.
- **No Fake Institutional Salary Figures:** Median CTC figures are only published if backed by mandatory NIRF or institutional disclosure documents.
- **Explicit Unknown States:** When closing times, hostel fee components, or exam dates are not gazetted, the UI explicitly displays **"TBD / Unknown"** rather than guessing.
- **Zero Sponsored Ranking in Academics:** Recommendations and eligibility checkers are 100% free of sponsored placement.
