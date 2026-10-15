import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth/session';
import { verifyPaymentSignature } from '@/lib/payments/razorpay';
import { capturePaymentAndGrantEntitlement, findOrderByRazorpayOrderId } from '@/lib/db/store';

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }

    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = await req.json();

    if (!razorpayOrderId || !razorpayPaymentId) {
      return NextResponse.json(
        { error: 'Missing required payment verification fields.' },
        { status: 400 }
      );
    }

    // Verify cryptographic signature
    const isValidSignature = verifyPaymentSignature({
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature: razorpaySignature || '',
    });

    if (!isValidSignature) {
      return NextResponse.json(
        { error: 'Payment signature verification failed. Untrusted response.' },
        { status: 400 }
      );
    }

    // Validate that order belongs to current user
    const existingOrder = await findOrderByRazorpayOrderId(razorpayOrderId);
    if (!existingOrder) {
      return NextResponse.json({ error: 'Order record not found.' }, { status: 404 });
    }

    if (existingOrder.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Order ownership mismatch. Access denied.' },
        { status: 403 }
      );
    }

    // Idempotently capture order and grant entitlement
    const result = await capturePaymentAndGrantEntitlement({
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    });

    return NextResponse.json({
      success: true,
      message: 'Payment verified and subject access granted.',
      order: result.order,
      entitlement: result.entitlement,
    });
  } catch (err: any) {
    console.error('[API Payment Verification Error]', err);
    return NextResponse.json(
      { error: err.message || 'Payment confirmation failed.' },
      { status: 500 }
    );
  }
}
