import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
}

// In-memory contact submission store (can be persisted to Supabase)
const contactSubmissions: ContactMessage[] = [];

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!email || !email.includes('@') || !message) {
      return NextResponse.json(
        { error: 'Valid email and message are required.' },
        { status: 400 }
      );
    }

    const newContact: ContactMessage = {
      id: `cnt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: name?.trim() || 'Student / Parent',
      email: email.trim().toLowerCase(),
      subject: subject || 'General Class 10 CBSE Inquiry',
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    contactSubmissions.push(newContact);

    return NextResponse.json({
      success: true,
      messageId: newContact.id,
      confirmation:
        'Thank you! Your message has been received by our academic desk. We typically reply within 2–4 hours.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ submissions: contactSubmissions });
}
