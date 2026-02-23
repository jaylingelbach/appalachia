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
  email: z.email().trim().max(254),
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

  // Escape user input
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = company ? escapeHtml(company) : 'N/A';
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

  try {
    await Promise.all([
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
          <p>${safeMessage}</p>
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
        `
      })
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(
      'Contact form error:',
      error instanceof Error ? error.message : String(error)
    );

    return NextResponse.json(
      { success: false, error: 'Server error. Please try again later.' },
      { status: 500 }
    );
  }
}
