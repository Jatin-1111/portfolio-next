import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const data = await req.json();
        const date = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_APP_PASSWORD
            }
        });

        // Email 1: Notification email to you
        const adminEmailHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Project Inquiry</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333333;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #ffffff;
                    }
                    .header {
                        background: linear-gradient(135deg, #3B82F6, #6366F1);
                        color: white;
                        padding: 20px;
                        border-radius: 8px 8px 0 0;
                    }
                    .content {
                        padding: 20px;
                        background-color: #ffffff;
                        border: 1px solid #e5e7eb;
                        border-radius: 0 0 8px 8px;
                    }
                    .section {
                        margin-bottom: 20px;
                        padding-bottom: 20px;
                        border-bottom: 1px solid #e5e7eb;
                    }
                    .section:last-child {
                        border-bottom: none;
                        margin-bottom: 0;
                        padding-bottom: 0;
                    }
                    .label {
                        font-weight: bold;
                        color: #4B5563;
                        margin-bottom: 5px;
                    }
                    .value {
                        color: #1F2937;
                    }
                    .message-box {
                        background-color: #F9FAFB;
                        padding: 15px;
                        border-radius: 6px;
                        margin-top: 10px;
                    }
                    .footer {
                        margin-top: 20px;
                        padding-top: 20px;
                        border-top: 1px solid #e5e7eb;
                        font-size: 12px;
                        color: #6B7280;
                        text-align: center;
                    }
                    .highlight {
                        color: #2563EB;
                    }
                    .button {
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #3B82F6;
                        color: white;
                        text-decoration: none;
                        border-radius: 6px;
                        margin-top: 15px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1 style="margin: 0; font-size: 24px;">🚀 New Project Inquiry</h1>
                        <p style="margin: 5px 0 0 0; font-size: 14px;">Received on ${date}</p>
                    </div>
                    
                    <div class="content">
                        <!-- Client Information -->
                        <div class="section">
                            <h2 style="color: #3B82F6; margin-top: 0;">Client Information</h2>
                            <div class="label">Full Name</div>
                            <div class="value">${data.firstName} ${data.lastName}</div>
                            
                            <div class="label" style="margin-top: 15px;">Contact Details</div>
                            <div class="value">
                                📧 ${data.email}<br>
                                📱 ${data.phone || 'Not provided'}<br>
                                🏢 ${data.company || 'Not provided'}
                            </div>
                        </div>

                        <!-- Project Details -->
                        <div class="section">
                            <h2 style="color: #3B82F6; margin-top: 0;">Project Requirements</h2>
                            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                                <div>
                                    <div class="label">Project Type</div>
                                    <div class="value highlight">${data.projectType || 'Not specified'}</div>
                                </div>
                                <div>
                                    <div class="label">Timeline</div>
                                    <div class="value highlight">${data.timeline || 'Not specified'}</div>
                                </div>
                            </div>
                        </div>

                        <!-- Project Message -->
                        <div class="section">
                            <h2 style="color: #3B82F6; margin-top: 0;">Project Description</h2>
                            <div class="message-box">
                                ${data.message}
                            </div>
                        </div>
                        
                        <!-- Quick Actions -->
                        <div class="section" style="text-align: center;">
                            <a href="mailto:${data.email}" class="button">Reply to ${data.firstName}</a>
                        </div>

                        <div class="footer">
                            <p>This is an automated message from your contact form.</p>
                            <p>© ${new Date().getFullYear()} Jatin Kumar Portfolio. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `;

        // Email 2: Professional response to the user
        const userEmailHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Thank you for your inquiry</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333333;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #ffffff;
                    }
                    .header {
                        background: linear-gradient(135deg, #3B82F6, #6366F1);
                        color: white;
                        padding: 30px 20px;
                        border-radius: 8px 8px 0 0;
                        text-align: center;
                    }
                    .content {
                        padding: 30px 20px;
                        background-color: #ffffff;
                        border: 1px solid #e5e7eb;
                        border-radius: 0 0 8px 8px;
                    }
                    .greeting {
                        font-size: 20px;
                        color: #1F2937;
                        margin-bottom: 20px;
                    }
                    .message {
                        color: #4B5563;
                        margin-bottom: 25px;
                    }
                    .next-steps {
                        background-color: #F0F9FF;
                        padding: 20px;
                        border-radius: 8px;
                        border-left: 4px solid #3B82F6;
                        margin: 25px 0;
                    }
                    .contact-info {
                        background-color: #F9FAFB;
                        padding: 20px;
                        border-radius: 8px;
                        margin: 25px 0;
                    }
                    .footer {
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 1px solid #e5e7eb;
                        font-size: 14px;
                        color: #6B7280;
                        text-align: center;
                    }
                    .signature {
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 2px solid #e5e7eb;
                    }
                    .social-links {
                        text-align: center;
                        margin-top: 20px;
                    }
                    .social-links a {
                        color: #3B82F6;
                        text-decoration: none;
                        margin: 0 10px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1 style="margin: 0; font-size: 28px;">Thank You for Reaching Out! 🚀</h1>
                        <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Your message has been received</p>
                    </div>
                    
                    <div class="content">
                        <div class="greeting">
                            Hello ${data.firstName},
                        </div>
                        
                        <div class="message">
                            Thank you for your interest in working together! I've received your project inquiry and I'm excited about the possibility of collaborating with you.
                        </div>

                        <div class="message">
                            I understand you're looking for ${data.projectType || 'development services'} ${data.timeline ? `with a timeline of ${data.timeline.toLowerCase()}` : ''}. I've carefully reviewed your requirements and will be in touch shortly with my thoughts and next steps.
                        </div>

                        <div class="next-steps">
                            <h3 style="margin-top: 0; color: #1F2937;">What happens next?</h3>
                            <ul style="margin: 0; padding-left: 20px; color: #4B5563;">
                                <li style="margin-bottom: 8px;">I'll review your project details thoroughly</li>
                                <li style="margin-bottom: 8px;">I'll prepare a detailed proposal with timeline and approach</li>
                                <li style="margin-bottom: 8px;">I'll reach out within 24 hours to discuss your project</li>
                                <li>We can schedule a call to dive deeper into your requirements</li>
                            </ul>
                        </div>

                        <div class="contact-info">
                            <h3 style="margin-top: 0; color: #1F2937;">Quick Reference</h3>
                            <p style="margin: 5px 0; color: #4B5563;"><strong>Project Type:</strong> ${data.projectType || 'Not specified'}</p>
                            <p style="margin: 5px 0; color: #4B5563;"><strong>Timeline:</strong> ${data.timeline || 'To be discussed'}</p>
                            <p style="margin: 5px 0; color: #4B5563;"><strong>Contact:</strong> ${data.email}</p>
                        </div>

                        <div class="message">
                            In the meantime, feel free to check out my recent work and case studies on my portfolio. If you have any urgent questions or additional information to share, don't hesitate to reach out directly.
                        </div>

                        <div class="signature">
                            <p style="margin: 0; color: #1F2937; font-weight: 600;">Best regards,</p>
                            <p style="margin: 5px 0 0 0; color: #3B82F6; font-size: 18px; font-weight: 600;">Jatin Kumar</p>
                            <p style="margin: 0; color: #6B7280; font-size: 14px;">Full-Stack Web Developer</p>
                            <p style="margin: 5px 0 0 0; color: #6B7280; font-size: 14px;">📧 off.jatin1111@gmail.com</p>
                            
                            <div class="social-links">
                                <a href="https://jatinx.tech/" target="_blank">Portfolio</a>
                                <a href="https://linkedin.com/in/jatin1011" target="_blank">LinkedIn</a>
                                <a href="https://github.com/Jatin-1111" target="_blank">GitHub</a>
                            </div>
                        </div>

                        <div class="footer">
                            <p>This is an automated response. I'll personally follow up with you soon!</p>
                            <p>© ${new Date().getFullYear()} Jatin Kumar. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `;

        // Prepare email options
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `🚀 New Project Inquiry from ${data.firstName} ${data.lastName} - ${data.projectType || 'General Inquiry'}`,
            html: adminEmailHTML
        };

        const userMailOptions = {
            from: process.env.EMAIL_USER,
            to: data.email,
            subject: `Thank you for your inquiry, ${data.firstName}! 🚀`,
            html: userEmailHTML,
            replyTo: process.env.EMAIL_USER
        };

        // Send both emails
        const emailPromises = [
            transporter.sendMail(adminMailOptions),
            transporter.sendMail(userMailOptions)
        ];

        await Promise.all(emailPromises);

        return NextResponse.json(
            {
                message: "Messages sent successfully",
                details: "Notification sent to admin and confirmation sent to user"
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error sending emails:', error);

        // More detailed error logging
        if (error.code === 'EAUTH') {
            console.error('Authentication failed. Check EMAIL_USER and EMAIL_APP_PASSWORD.');
        } else if (error.code === 'ENOTFOUND') {
            console.error('SMTP server not found. Check your internet connection.');
        }

        return NextResponse.json(
            {
                error: "Failed to send emails",
                details: process.env.NODE_ENV === 'development' ? error.message : "Internal server error"
            },
            { status: 500 }
        );
    }
}