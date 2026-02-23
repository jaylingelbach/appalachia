import { NextResponse } from 'next/server';
import { z } from 'zod';
import postmark from 'postmark';

const client = new postmark.ServerClient(
  process.env.POSTMARK_SERVER_TOKEN as string
);

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10)
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.parse(body);

    const { name, email, company, message } = parsed;

    // Internal Notification (to you)
    await client.sendEmail({
      From: process.env.CONTACT_FROM as string,
      To: process.env.CONTACT_TO as string,
      ReplyTo: email,
      Subject: `New Contact Form Submission — ${name}`,
      HtmlBody: `
        <h2>New Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `
    });

    //  Confirmation Email (to user)
    await client.sendEmail({
      From: process.env.CONTACT_FROM as string,
      To: email,
      Subject: `Thanks for reaching out — Brown Bear Creative`,
      HtmlBody: `
        <h2>Hey ${name},</h2>
        <p>Thanks for reaching out to Brown Bear Creative.</p>
        <p>I’ve received your message and will get back to you within 1–2 business days.</p>
        <br />
        <p>– Jay</p>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);

    return NextResponse.json(
      { success: false, error: 'Something went wrong.' },
      { status: 400 }
    );
  }
}
