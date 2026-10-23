import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/payments/razorpay';
import {
  capturePaymentAndGrantEntitlement,
  revokeEntitlement,
  findOrderByRazorpayOrderId,
  logAdminAction,
} from '@/lib/db/store';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature') || '';

    // Verify signature
    const isValid = verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;
    const payment = payload.payload?.payment?.entity;
    const order = payload.payload?.order?.entity;
    const refund = payload.payload?.refund?.entity;

    console.log(`[Razorpay Webhook] Received event: ${event}`);

    // Process subscription events with idempotency ledger
    const { processSubscriptionWebhook } = await import('@/lib/payments/subscriptionPlans');
    const subResult = processSubscriptionWebhook(
      rawBody,
      signature,
      process.env.RAZORPAY_WEBHOOK_SECRET || 'dev_webhook_simulation'
    );

    if (event === 'payment.captured' || event === 'order.paid') {
      const razorpayOrderId = order?.id || payment?.order_id;
      const razorpayPaymentId = payment?.id;

      if (razorpayOrderId && razorpayPaymentId) {
        await capturePaymentAndGrantEntitlement({
          razorpayOrderId,
          razorpayPaymentId,
        });
      }
    } else if (event === 'refund.processed') {
      const paymentId = refund?.payment_id;
      if (paymentId) {
        // Find order and revoke entitlement
        const allOrders = await (await import('@/lib/db/store')).getAllOrders();
        const matchedOrder = allOrders.find((o) => o.razorpay_payment_id === paymentId);

        if (matchedOrder) {
          await revokeEntitlement(
            matchedOrder.user_id,
            matchedOrder.subject_slug,
            `Refund processed: ${refund.id}`,
            'system_webhook'
          );
        }
      }
    }

    await logAdminAction('system_webhook', 'WEBHOOK_PROCESSED', 'webhook_event', event, {
      id: payload.id,
      event,
      subStatus: subResult.status,
    });

    return NextResponse.json({ status: 'ok', received: true, event, subStatus: subResult.status });
  } catch (err: any) {
    console.error('[Razorpay Webhook Error]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
