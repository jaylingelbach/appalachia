import { NextResponse } from 'next/server';
import { z } from 'zod';
import postmark from 'postmark';

/* -------------------------------------------------------------------------- */
/*                           Runtime Environment Guard                        */
/* -------------------------------------------------------------------------- */

const requiredEnv = [
  'POSTMARK_SERVER_TOKEN',
  'CONTACT_FROM',
  'CONTACT_TO'
] as const;

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const POSTMARK_SERVER_TOKEN = process.env.POSTMARK_SERVER_TOKEN!;
const CONTACT_FROM = process.env.CONTACT_FROM!;
const CONTACT_TO = process.env.CONTACT_TO!;

const client = new postmark.ServerClient(POSTMARK_SERVER_TOKEN);

/* -------------------------------------------------------------------------- */
/*                                Validation Schema                           */
/* -------------------------------------------------------------------------- */

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().max(254).pipe(z.email()),
  company: z.string().trim().max(200).optional(),
  message: z.string().trim().min(10).max(5000)
});

/* -------------------------------------------------------------------------- */
/*                          HTML Escaping Helper (Security)                   */
/* -------------------------------------------------------------------------- */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* -------------------------------------------------------------------------- */
/*                                    Route                                   */
/* -------------------------------------------------------------------------- */

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body.' },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'Validation failed.',
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const { name, email, company, message } = parsed.data;

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = company ? escapeHtml(company) : 'N/A';
  const safeMessageHtml = escapeHtml(message).replace(/\n/g, '<br />');
  const safeMessageText = message; // already validated + trimmed

  try {
    const results = await Promise.allSettled([
      // Internal notification
      client.sendEmail({
        From: CONTACT_FROM,
        To: CONTACT_TO,
        ReplyTo: email,
        Subject: `New Contact Form Submission — ${safeName}`,
        HtmlBody: `
          <h2>New Inquiry</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Company:</strong> ${safeCompany}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessageHtml}</p>
        `,
        TextBody: `
New Inquiry

Name: ${name}
Email: ${email}
Company: ${company ?? 'N/A'}

Message:
${safeMessageText}
        `
      }),

      // Confirmation email
      client.sendEmail({
        From: CONTACT_FROM,
        To: email,
        Subject: `Thanks for reaching out — Brown Bear Creative`,
        HtmlBody: `
          <h2>Hey ${safeName},</h2>
          <p>Thanks for reaching out to Brown Bear Creative.</p>
          <p>I’ve received your message and will get back to you within 1–2 business days.</p>
          <br />
          <p>– Jay</p>
        `,
        TextBody: `
Hey ${name},

Thanks for reaching out to Brown Bear Creative.

I’ve received your message and will get back to you within 1–2 business days.

– Jay
        `
      })
    ]);

    const [adminResult, userResult] = results;

    if (adminResult.status === 'rejected') {
      console.error('Admin email failed:', adminResult.reason);
    }

    if (userResult.status === 'rejected') {
      console.error('Confirmation email failed for:', email, userResult.reason);
    }

    // We consider the request successful if the internal email succeeds.
    if (adminResult.status === 'fulfilled') {
      return NextResponse.json({ success: true });
    }

    // If internal notification fails, treat as server error
    return NextResponse.json(
      { success: false, error: 'Failed to send message.' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error. Please try again later.' },
      { status: 500 }
    );
  }
}
