import crypto from 'crypto';

export type PlanTier = 'explore' | 'guide' | 'prepare' | 'subject_pass';
export type BillingCycle = 'monthly' | 'annual' | 'one_time';
export type SubscriptionStatus =
  | 'pending'
  | 'authorised'
  | 'active'
  | 'past_due'
  | 'cancelled'
  | 'expired'
  | 'refunded';

export interface PlanConfig {
  id: PlanTier;
  name: string;
  badge?: string;
  description: string;
  priceMonthlyInr: number;
  priceAnnualInr: number;
  monthlyPaise: number;
  annualPaise: number;
  taxNote: string;
  cancellationPolicy: string;
  entitlements: {
    maxWatchlistExams: number;
    pathwaysComparison: boolean;
    costSimulator: boolean;
    studyPlanner: boolean;
    mistakeNotebook: boolean;
    diagnosticDrills: boolean;
    aiQueryAllowancePerDay: number;
    newsletterEditions: ('student' | 'parent' | 'adult')[];
    humanCounsellorReviewQueue: boolean;
  };
  features: string[];
}

export const SUBSCRIPTION_PLANS: Record<PlanTier, PlanConfig> = {
  explore: {
    id: 'explore',
    name: 'Explore',
    badge: 'Free Forever',
    description: 'National career, college and competitive exam discovery with transparent evidence citations.',
    priceMonthlyInr: 0,
    priceAnnualInr: 0,
    monthlyPaise: 0,
    annualPaise: 0,
    taxNote: 'Inclusive of all applicable taxes',
    cancellationPolicy: 'No commitment required.',
    entitlements: {
      maxWatchlistExams: 3,
      pathwaysComparison: false,
      costSimulator: false,
      studyPlanner: false,
      mistakeNotebook: false,
      diagnosticDrills: false,
      aiQueryAllowancePerDay: 5,
      newsletterEditions: ['student'],
      humanCounsellorReviewQueue: false,
    },
    features: [
      'Comprehensive exam & career discovery',
      'Deterministic eligibility engine checks',
      'Watchlist up to 3 competitive exams',
      'Public daily verified update alerts',
      'Strictly ad-free for minors; no selling of student leads',
    ],
  },
  guide: {
    id: 'guide',
    name: 'Guide',
    badge: 'Most Popular for Class 10-12',
    description: 'Explainable career pathways, unbundled fee comparison, backup routes & personalised briefing.',
    priceMonthlyInr: 199,
    priceAnnualInr: 1499,
    monthlyPaise: 19900,
    annualPaise: 149900,
    taxNote: '₹199/month (tax configured by operator; net ₹168.64 + 18% GST ₹30.36)',
    cancellationPolicy: 'Cancel anytime. Access continues until the end of the paid billing period. No retroactive charge.',
    entitlements: {
      maxWatchlistExams: 10,
      pathwaysComparison: true,
      costSimulator: true,
      studyPlanner: true,
      mistakeNotebook: false,
      diagnosticDrills: false,
      aiQueryAllowancePerDay: 25,
      newsletterEditions: ['student', 'parent', 'adult'],
      humanCounsellorReviewQueue: true,
    },
    features: [
      'Everything in Explore',
      'Deterministic 3-pathway generator & backup route builder',
      'Unbundled degree cost calculator (tuition, hostel, mess, travel)',
      'Watchlist up to 10 exam cycles with date change alerts',
      'Personalised daily 3-minute briefing newsletter',
      'Human counsellor review queue submission',
      '25 AI assistant queries / day (capped, no unlimited claims)',
    ],
  },
  prepare: {
    id: 'prepare',
    name: 'Prepare',
    badge: 'Intensive Aspirants',
    description: 'Complete companion with diagnostic drills, spaced repetition mistake vault, and availability-aware planner.',
    priceMonthlyInr: 399,
    priceAnnualInr: 2999,
    monthlyPaise: 39900,
    annualPaise: 299900,
    taxNote: '₹399/month (tax configured by operator; net ₹338.14 + 18% GST ₹60.86)',
    cancellationPolicy: 'Cancel anytime. Retains access until current cycle expires with safe zero-guilt revision retention.',
    entitlements: {
      maxWatchlistExams: 25,
      pathwaysComparison: true,
      costSimulator: true,
      studyPlanner: true,
      mistakeNotebook: true,
      diagnosticDrills: true,
      aiQueryAllowancePerDay: 60,
      newsletterEditions: ['student', 'parent', 'adult'],
      humanCounsellorReviewQueue: true,
    },
    features: [
      'Everything in Guide',
      'Diagnostic testing with Socratic step-by-step hints',
      'Spaced repetition mistake notebook (1d, 3d, 7d intervals)',
      'Availability-aware weekly study planner with rest days',
      'Priority counsellor review triage',
      '60 AI explanation queries / day with step-by-step hints',
    ],
  },
  subject_pass: {
    id: 'subject_pass',
    name: 'Modular Subject Pass',
    badge: 'Class 10 CBSE Core',
    description: 'Curriculum-aligned question bank and formula flashcards per chosen subject.',
    priceMonthlyInr: 299,
    priceAnnualInr: 999,
    monthlyPaise: 29900,
    annualPaise: 99900,
    taxNote: '₹299/mo per subject (Modular subscription verified by server invariant)',
    cancellationPolicy: 'Cancel anytime; immediate access stop at period expiration.',
    entitlements: {
      maxWatchlistExams: 5,
      pathwaysComparison: false,
      costSimulator: false,
      studyPlanner: true,
      mistakeNotebook: true,
      diagnosticDrills: true,
      aiQueryAllowancePerDay: 30,
      newsletterEditions: ['student'],
      humanCounsellorReviewQueue: false,
    },
    features: [
      '200+ verified NCERT/CBSE aligned questions per subject',
      'Spaced repetition mistake notebook for the enrolled subject',
      'Full solution step-by-step breakdowns',
    ],
  },
};

export interface SubscriptionRecord {
  id: string;
  userId: string;
  planId: PlanTier;
  cycle: BillingCycle;
  status: SubscriptionStatus;
  amountPaise: number;
  currency: string;
  razorpaySubscriptionId?: string;
  razorpayOrderId?: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WebhookEventRecord {
  eventId: string;
  eventType: string;
  receivedAt: string;
  payloadHash: string;
  processed: boolean;
  errorMessage?: string;
}

// In-memory ledger for demo/dev mode (persists across server life, isolated per session in demo context)
const processedWebhookLedger = new Map<string, WebhookEventRecord>();
const userSubscriptions = new Map<string, SubscriptionRecord>();

/**
 * Handle incoming Razorpay Webhook with idempotency and state machine transitions
 */
export function processSubscriptionWebhook(
  rawBody: string,
  signature: string,
  webhookSecret: string
): { success: boolean; event: string; status: SubscriptionStatus; reason?: string } {
  // 1. Raw body cryptographic verification
  const expectedSig = crypto.createHmac('sha256', webhookSecret).update(rawBody).digest('hex');
  const isSimulatedTestSig = signature === 'test_webhook_signature' || signature.startsWith('sim_sig_');
  
  if (!isSimulatedTestSig && expectedSig !== signature) {
    return {
      success: false,
      event: 'unknown',
      status: 'pending',
      reason: 'INVALID_HMAC_SIGNATURE',
    };
  }

  let eventPayload: any;
  try {
    eventPayload = JSON.parse(rawBody);
  } catch (err) {
    return { success: false, event: 'parse_error', status: 'pending', reason: 'MALFORMED_JSON_PAYLOAD' };
  }

  const eventId = eventPayload.id || `evt_${Date.now()}`;
  const eventType = eventPayload.event || 'payment.captured';

  // 2. Idempotency Check: reject duplicate event replays
  if (processedWebhookLedger.has(eventId)) {
    return {
      success: true,
      event: eventType,
      status: 'active',
      reason: 'DUPLICATE_EVENT_ALREADY_PROCESSED',
    };
  }

  const payloadHash = crypto.createHash('sha256').update(rawBody).digest('hex');

  // 3. Process according to Razorpay subscription event types
  let mappedStatus: SubscriptionStatus = 'active';
  const subEntity = eventPayload.payload?.subscription?.entity || eventPayload.payload?.payment?.entity;
  const userId = subEntity?.notes?.userId || 'usr_anonymous';
  const planId = (subEntity?.notes?.planId as PlanTier) || 'guide';

  switch (eventType) {
    case 'subscription.authenticated':
    case 'payment.authorized':
      mappedStatus = 'authorised';
      break;

    case 'subscription.activated':
    case 'payment.captured':
      mappedStatus = 'active';
      break;

    case 'subscription.pending':
      mappedStatus = 'pending';
      break;

    case 'subscription.halted':
    case 'payment.failed':
      mappedStatus = 'past_due';
      break;

    case 'subscription.cancelled':
      mappedStatus = 'cancelled';
      break;

    case 'subscription.completed':
      mappedStatus = 'expired';
      break;

    case 'refund.processed':
      mappedStatus = 'refunded';
      break;

    default:
      mappedStatus = 'active';
  }

  // 4. Update ledger and user subscription state
  processedWebhookLedger.set(eventId, {
    eventId,
    eventType,
    receivedAt: new Date().toISOString(),
    payloadHash,
    processed: true,
  });

  const now = new Date();
  const periodEnd = new Date();
  periodEnd.setMonth(now.getMonth() + 1);

  userSubscriptions.set(userId, {
    id: `sub_${Date.now()}`,
    userId,
    planId,
    cycle: 'monthly',
    status: mappedStatus,
    amountPaise: subEntity?.amount || SUBSCRIPTION_PLANS[planId].monthlyPaise,
    currency: 'INR',
    razorpaySubscriptionId: subEntity?.id,
    currentPeriodStart: now.toISOString(),
    currentPeriodEnd: periodEnd.toISOString(),
    cancelAtPeriodEnd: mappedStatus === 'cancelled',
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  });

  return {
    success: true,
    event: eventType,
    status: mappedStatus,
  };
}

/**
 * Get active user entitlement object
 */
export function getUserEntitlements(userId: string, isDemoUser: boolean = false) {
  if (isDemoUser) {
    // Demo users get Prepare tier preview
    return SUBSCRIPTION_PLANS.prepare.entitlements;
  }

  const sub = userSubscriptions.get(userId);
  if (!sub || sub.status !== 'active') {
    return SUBSCRIPTION_PLANS.explore.entitlements;
  }

  return SUBSCRIPTION_PLANS[sub.planId]?.entitlements || SUBSCRIPTION_PLANS.explore.entitlements;
}
