import { NextRequest, NextResponse } from 'next/server';

interface ContactData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Rate limiting (simple in-memory implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const MAX_REQUESTS = 5; // Maximum 5 requests
const WINDOW_MS = 15 * 60 * 1000; // Per 15 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return true;
  }

  if (userLimit.count >= MAX_REQUESTS) {
    return false;
  }

  userLimit.count++;
  return true;
}

function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json() as ContactData;

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const name = sanitizeInput(body.name);
    const email = sanitizeInput(body.email);
    const phone = body.phone ? sanitizeInput(body.phone) : '';
    const message = sanitizeInput(body.message);

    // Validate inputs
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { ok: false, error: 'Name must be between 2 and 100 characters' },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 1000) {
      return NextResponse.json(
        { ok: false, error: 'Message must be between 10 and 1000 characters' },
        { status: 400 }
      );
    }

    // Log the contact form submission
    console.log('=== New Contact Form Submission ===');
    console.log('Date:', new Date().toISOString());
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone || 'N/A');
    console.log('Message:', message);
    console.log('IP:', ip);
    console.log('===================================');

    // TODO: In production, send this data to:
    // - Email service (SendGrid, AWS SES, Resend, etc.)
    // - CRM system
    // - Database
    // - Notification service (Slack, Discord, etc.)

    // Example with environment variable for email:
    // const contactEmail = process.env.CONTACT_EMAIL || 'contacto@coaching-emocional.com';
    // await sendEmail({
    //   to: contactEmail,
    //   subject: `Nuevo contacto de ${name}`,
    //   body: `
    //     Nombre: ${name}
    //     Email: ${email}
    //     Teléfono: ${phone}
    //     Mensaje: ${message}
    //   `
    // });

    // Return success response
    return NextResponse.json(
      {
        ok: true,
        message: 'Contact form submitted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
