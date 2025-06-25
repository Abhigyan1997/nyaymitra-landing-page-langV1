import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const { name, email, phone, subject, category, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 587,
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    // Email options
    const mailOptions = {
      from: `"Nyay Mitra Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_RECIPIENT || "your-email@example.com",
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Phone:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${phone || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Category:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${category || "Not specified"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Subject:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${subject}</td>
            </tr>
            <tr>
              <td colspan="2" style="padding: 8px; font-weight: bold;">Message:</td>
            </tr>
            <tr>
              <td colspan="2" style="padding: 8px; border-top: 1px solid #ddd;">${message.replace(/\n/g, '<br>')}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; font-size: 0.9em; color: #666;">
            This email was sent from the contact form on Nyay Mitra website.
          </p>
        </div>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    // Send confirmation email to user
    const userMailOptions = {
      from: `"Nyay Mitra" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for contacting Nyay Mitra",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Thank you for contacting Nyay Mitra</h2>
          <p>Dear ${name},</p>
          <p>We've received your message and our team will get back to you within 24 hours.</p>
          <p>Here's a summary of your submission:</p>
          <ul>
            <li><strong>Subject:</strong> ${subject}</li>
            <li><strong>Category:</strong> ${category || "Not specified"}</li>
          </ul>
          <p>If you need immediate assistance, please call our support team at +91 11 4567 8900.</p>
          <p style="margin-top: 20px; font-size: 0.9em; color: #666;">
            This is an automated message. Please do not reply directly to this email.
          </p>
        </div>
      `,
    }

    await transporter.sendMail(userMailOptions)

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      { message: "Failed to send email", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}