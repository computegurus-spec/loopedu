import crypto from 'crypto';
import Razorpay from 'razorpay';
import { SubjectSlug } from '@/types';
import { getSubject } from '@/lib/db/store';

const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'dev_secret_simulation';
const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || 'dev_webhook_simulation';

// Determine if we are in simulated test mode
export const isSimulatedPaymentMode =
  RAZORPAY_KEY_ID.includes('placeholder') ||
  RAZORPAY_KEY_ID.includes('simulated') ||
  !process.env.RAZORPAY_KEY_SECRET;

let razorpayClient: Razorpay | null = null;

function getRazorpayClient(): Razorpay | null {
  if (isSimulatedPaymentMode) return null;
  if (!razorpayClient) {
    razorpayClient = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });
  }
  return razorpayClient;
}

export interface CreateOrderParams {
  subjectSlug: SubjectSlug;
  userId: string;
  userEmail: string;
  plan?: 'monthly' | 'annual';
}

export interface CreateOrderResult {
  orderId: string;
  razorpayOrderId: string;
  amount: number; // 99900
  currency: string; // 'INR'
  keyId: string;
  subjectName: string;
  isSimulated: boolean;
}

export async function createRazorpayOrder(params: CreateOrderParams): Promise<CreateOrderResult> {
  const subject = await getSubject(params.subjectSlug);
  if (!subject) {
    throw new Error('Subject not found');
  }

  // Publication availability validation
  if (subject.status !== 'published') {
    if (params.subjectSlug === 'german') {
      throw new Error(
        'German question bank is currently undergoing prescribed textbook verification and is not yet available for purchase.'
      );
    }
    throw new Error(`Subject ${subject.name} is currently ${subject.status} and not open for purchase.`);
  }

  // Price validation: ₹299/mo (29,900 paise) or ₹999 full-course (99,900 paise)
  const isAnnual = params.plan === 'annual';
  const amountInPaise = isAnnual ? 99900 : 29900;
  const currency = 'INR';

  if (!isSimulatedPaymentMode) {
    const client = getRazorpayClient();
    if (!client) throw new Error('Razorpay client initialization failed');

    const rzpOrder = await client.orders.create({
      amount: amountInPaise,
      currency: currency,
      receipt: `rcpt_${params.subjectSlug}_${Date.now()}`,
      notes: {
        subjectSlug: params.subjectSlug,
        userId: params.userId,
        userEmail: params.userEmail,
        grade: 'Class 10',
        examYear: '2027',
      },
    });

    return {
      orderId: rzpOrder.id,
      razorpayOrderId: rzpOrder.id,
      amount: amountInPaise,
      currency: currency,
      keyId: RAZORPAY_KEY_ID,
      subjectName: subject.name,
      isSimulated: false,
    };
  }

  // Development simulated order
  const simulatedRzpId = `order_sim_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  return {
    orderId: simulatedRzpId,
    razorpayOrderId: simulatedRzpId,
    amount: amountInPaise,
    currency: currency,
    keyId: RAZORPAY_KEY_ID,
    subjectName: subject.name,
    isSimulated: true,
  };
}

/**
 * Verify Razorpay payment signature using HMAC SHA256
 */
export function verifyPaymentSignature(params: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}): boolean {
  if (isSimulatedPaymentMode) {
    // In dev simulation mode, accept signatures starting with "sim_sig_" or test format
    return (
      params.razorpaySignature.startsWith('sim_sig_') ||
      params.razorpayPaymentId.startsWith('pay_sim_')
    );
  }

  const generatedSignature = crypto
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(`${params.razorpayOrderId}|${params.razorpayPaymentId}`)
    .digest('hex');

  return generatedSignature === params.razorpaySignature;
}

/**
 * Verify Razorpay Webhook signature
 */
export function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  if (isSimulatedPaymentMode && signature === 'test_webhook_signature') {
    return true;
  }

  const expectedSignature = crypto
    .createHmac('sha256', RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest('hex');

  return expectedSignature === signature;
}
