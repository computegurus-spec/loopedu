'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, CheckCircle2, AlertCircle, Loader2, Lock, ArrowRight } from 'lucide-react';
import { SubjectSlug } from '@/types';

interface CheckoutButtonProps {
  subjectSlug: SubjectSlug;
  subjectName: string;
  priceInr: number;
  isPublished: boolean;
  className?: string;
  buttonText?: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  subjectSlug,
  subjectName,
  priceInr,
  isPublished,
  className = '',
  buttonText = 'Enrol for ₹299/mo',
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [simulatedCheckoutData, setSimulatedCheckoutData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [processingPayment, setProcessingPayment] = useState(false);

  if (!isPublished) {
    return (
      <div className="space-y-1.5">
        <button
          disabled
          className={`w-full py-3 px-5 rounded-xl font-bold text-xs uppercase tracking-wider bg-paper-300 text-forest-700 cursor-not-allowed border border-academic-border ${className}`}
        >
          {subjectSlug === 'german' ? 'Coverage Review Pending' : 'Review in Progress'}
        </button>
        <p className="text-[11px] text-academic-subtle text-center">
          {subjectSlug === 'german'
            ? 'Prescribed textbook verification in progress. Unavailable for purchase.'
            : 'Pre-order and purchase open after editorial review.'}
        </p>
      </div>
    );
  }

  const handleStartCheckout = async () => {
    setLoading(true);
    setErrorMsg('');

    try {
      // 1. Check session
      const sessRes = await fetch('/api/auth/session');
      const sessData = await sessRes.json();

      let currentUser = sessData.user;
      if (!currentUser) {
        // Automatically assign default student session for smooth testing
        const loginRes = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'student@blocks-and-loops.com',
            name: 'Class 10 Student',
          }),
        });
        const loginData = await loginRes.json();
        currentUser = loginData.user;
      }

      // 2. Create order on server
      const orderRes = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subjectSlug }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        if (orderRes.status === 409) {
          // Already owned!
          router.push(`/study/${subjectSlug}`);
          return;
        }
        throw new Error(orderData.error || 'Failed to create order.');
      }

      // 3. Check if simulated mode or live Razorpay
      if (orderData.razorpay?.isSimulated || !window.Razorpay) {
        setSimulatedCheckoutData(orderData);
        setModalOpen(true);
      } else {
        // Live Razorpay hosted modal
        const options = {
          key: orderData.razorpay.keyId,
          amount: orderData.razorpay.amount,
          currency: orderData.razorpay.currency,
          name: 'LoopEdu by Blocks and Loops',
          description: `${subjectName} - Modular Study Track`,
          order_id: orderData.razorpay.orderId,
          prefill: {
            email: currentUser.email,
          },
          theme: {
            color: '#14342B',
          },
          handler: async function (response: any) {
            await verifyAndComplete(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature
            );
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during checkout initialization.');
    } finally {
      setLoading(false);
    }
  };

  const verifyAndComplete = async (
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ) => {
    setProcessingPayment(true);
    try {
      const verifyRes = await fetch('/api/checkout/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpayOrderId,
          razorpayPaymentId,
          razorpaySignature,
        }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) {
        throw new Error(verifyData.error || 'Payment signature verification failed.');
      }

      setModalOpen(false);
      router.push(`/study/${subjectSlug}?enrolled=true`);
    } catch (err: any) {
      setErrorMsg(err.message || 'Payment verification failed.');
    } finally {
      setProcessingPayment(false);
    }
  };

  const handleSimulatedPay = async () => {
    if (!simulatedCheckoutData) return;
    const fakePaymentId = `pay_sim_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const fakeSignature = `sim_sig_${Date.now()}`;

    await verifyAndComplete(
      simulatedCheckoutData.razorpay.orderId,
      fakePaymentId,
      fakeSignature
    );
  };

  return (
    <>
      <div className="space-y-2">
        <button
          onClick={handleStartCheckout}
          disabled={loading}
          className={`w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider bg-forest-900 hover:bg-forest-800 text-limeaccent transition shadow flex items-center justify-center gap-2 disabled:opacity-60 ${className}`}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Initializing secure checkout...</span>
            </>
          ) : (
            <>
              <Lock className="w-3.5 h-3.5 text-limeaccent" />
              <span>{buttonText}</span>
            </>
          )}
        </button>

        {errorMsg && (
          <div className="p-3 bg-red-50 text-red-900 border border-red-200 rounded-lg text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-700 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Razorpay Test & Simulation Modal */}
      {modalOpen && simulatedCheckoutData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white border border-academic-border shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-academic-border">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-forest-900 text-limeaccent flex items-center justify-center font-bold text-xs">
                  B
                </div>
                <div>
                  <div className="font-serif font-bold text-forest-950 text-base">
                    BoardEdge AI Checkout
                  </div>
                  <div className="text-[10px] text-academic-subtle">
                    Razorpay Secure INR Gateway
                  </div>
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                Razorpay Test Mode
              </span>
            </div>

            <div className="bg-paper p-4 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between text-forest-900">
                <span>Subject:</span>
                <span className="font-bold">{subjectName}</span>
              </div>
              <div className="flex justify-between text-forest-900">
                <span>Curriculum / Track:</span>
                <span>Active Board Syllabus</span>
              </div>
              <div className="flex justify-between text-forest-900">
                <span>Plan Terms:</span>
                <span>Modular monthly subscription (cancel anytime)</span>
              </div>
              <div className="pt-2 border-t border-academic-border flex justify-between text-forest-950 font-bold text-sm">
                <span>Payable Amount:</span>
                <span className="text-forest-900 text-base">₹{priceInr || 299}/mo</span>
              </div>
            </div>

            <div className="p-3 bg-forest-50 border border-forest-200 rounded-xl text-xs text-forest-800 leading-relaxed space-y-1">
              <div className="font-semibold flex items-center gap-1.5 text-forest-950">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest-700" />
                <span>Modular Subscription Access</span>
              </div>
              <p className="text-[11px] text-forest-700">
                Order ID: <code className="font-mono">{simulatedCheckoutData.razorpay.orderId}</code>.
                Instant digital access granted to Daily Five, Mistake Comeback, and unlockable question bank.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={handleSimulatedPay}
                disabled={processingPayment}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider bg-forest-900 hover:bg-forest-800 text-limeaccent transition shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {processingPayment ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying HMAC Signature...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Complete Test Payment (₹{priceInr || 299})</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setModalOpen(false)}
                disabled={processingPayment}
                className="w-full py-2 px-4 rounded-xl text-xs text-academic-subtle hover:text-forest-900 transition"
              >
                Cancel Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
