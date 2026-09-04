import dns from 'node:dns';
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

dns.setDefaultResultOrder('ipv4first');

const GMAIL_USER = 'yogeshchavanassociates@gmail.com';
const GMAIL_PASS = process.env.GMAIL_APP_PASSWORD;

export async function POST(request) {
  if (!GMAIL_PASS) {
    console.error('GMAIL_APP_PASSWORD env variable is not set');
    return NextResponse.json(
      { error: 'Mail service is not configured.' },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { name, email, phone, service, budget, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: 'Name, email, and message are required.' },
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS,
    },
    tls: { rejectUnauthorized: true },
    requireTLS: true,
  });

  const rows = [
    ['Name', name],
    ['Email', email],
    phone && ['Phone', phone],
    service && ['Service', service],
    budget && ['Budget', budget],
  ].filter(Boolean);

  const textBody = rows.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\nMessage:\n${message}`;

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1A1A1A; border-bottom: 2px solid #B08D57; padding-bottom: 12px;">
        New Enquiry — YCA Website
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        ${rows
      .map(
        ([label, value]) => `
          <tr>
            <td style="padding: 10px 12px; color: #4A4A4A; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; width: 120px; vertical-align: top;">${label}</td>
            <td style="padding: 10px 12px; color: #1A1A1A; font-size: 14px;">${value}</td>
          </tr>`
      )
      .join('')}
      </table>
      <div style="background: #FAF8F5; padding: 20px; margin-top: 16px; border-left: 3px solid #B08D57;">
        <p style="margin: 0 0 8px; color: #4A4A4A; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
        <p style="margin: 0; color: #1A1A1A; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
      </div>
      <p style="margin-top: 24px; font-size: 12px; color: #999;">
        Reply directly to this email to respond to <strong>${name}</strong> at
        <a href="mailto:${email}" style="color: #B08D57;">${email}</a>.
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"YCA Website" <${GMAIL_USER}>`,
      to: GMAIL_USER,
      replyTo: email,
      subject: `New Enquiry from ${name}${service ? ` — ${service}` : ''}`,
      text: textBody,
      html: htmlBody,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Failed to send email:', err);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
