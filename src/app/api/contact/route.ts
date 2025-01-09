import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  phoneNumber?: string;
  message: string;
}

export async function POST(req: NextRequest) {
  // if (req.method !== 'POST') {
  //   res.setHeader('Allow', ['POST']);
  //   return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  // }

  try {
    const body: ContactFormData = await req.json();
    const { name, email, phoneNumber, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVICE,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: `"${name}" <${email}>`,
      subject: `Neue Kontaktanfrage von ${name}`,
      text: `
        Du hast eine neue Nachricht von deinem Kontaktformular erhalten:

        Name: ${name}
        Email: ${email}
        Telefon: ${phoneNumber || 'Nicht angegeben'}
        
        Nachricht:
        ${message}
      `,
      html: `
        <p>Du hast eine neue Nachricht von Margit Lisa Photography erhalten:</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Telefon:</strong> ${phoneNumber || 'Nicht angegeben'}</li>
        </ul>
        <p><strong>Nachricht:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return NextResponse.json({ message: 'Message successfully sent!' }, { status: 200 });
  } catch (error) {
    console.error('Error sending the email:', error); // Debugging
    return NextResponse.json(
      { message: 'There was an issue sending your message. Please try again later.' },
      { status: 500 }
    );
  }
}
