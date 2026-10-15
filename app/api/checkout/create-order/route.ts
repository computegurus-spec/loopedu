import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth/session';
import { createRazorpayOrder } from '@/lib/payments/razorpay';
import { createOrder, hasActiveEntitlement, getSubject } from '@/lib/db/store';
import { SubjectSlug } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required. Please sign in before purchasing.' },
        { status: 401 }
      );
    }

    const { subjectSlug } = await req.json();
    if (!subjectSlug) {
      return NextResponse.json({ error: 'Subject slug is required.' }, { status: 400 });
    }

    const subject = await getSubject(subjectSlug as SubjectSlug);
    if (!subject) {
      return NextResponse.json({ error: 'Invalid subject requested.' }, { status: 404 });
    }

    // Availability validation: German must remain unavailable!
    if (subject.status !== 'published') {
      if (subjectSlug === 'german') {
        return NextResponse.json(
          {
            error:
              'German question bank is currently undergoing prescribed textbook verification and is not yet available for purchase.',
          },
          { status: 403 }
        );
      }
      return NextResponse.json(
        { error: `This subject is currently in ${subject.status} state and cannot be purchased.` },
        { status: 403 }
      );
    }

    // Check if user already owns this subject
    const alreadyOwned = await hasActiveEntitlement(user.id, subjectSlug as SubjectSlug);
    if (alreadyOwned) {
      return NextResponse.json(
        { error: 'You already own an active license for this subject. Visit My Library to study.' },
        { status: 409 }
      );
    }

    // Create Razorpay order
    const rzpResult = await createRazorpayOrder({
      subjectSlug: subjectSlug as SubjectSlug,
      userId: user.id,
      userEmail: user.email,
    });

    const accessDurationDays = Number(process.env.ACCESS_DURATION_DAYS) || 365;

    // Record internal order
    const orderRecord = await createOrder({
      userId: user.id,
      userEmail: user.email,
      subjectSlug: subjectSlug as SubjectSlug,
      amountInPaise: rzpResult.amount, // 99900 paise
      razorpayOrderId: rzpResult.razorpayOrderId,
      accessDurationDays,
    });

    return NextResponse.json({
      success: true,
      order: orderRecord,
      razorpay: {
        orderId: rzpResult.razorpayOrderId,
        amount: rzpResult.amount,
        currency: rzpResult.currency,
        keyId: rzpResult.keyId,
        subjectName: rzpResult.subjectName,
        isSimulated: rzpResult.isSimulated,
      },
    });
  } catch (err: any) {
    console.error('[API Checkout Error]', err);
    return NextResponse.json({ error: err.message || 'Failed to create payment order.' }, { status: 500 });
  }
}
