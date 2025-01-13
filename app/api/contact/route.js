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

        // Professional HTML email template
        const htmlContent = `
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
                        <h1 style="margin: 0; font-size: 24px;">New Project Inquiry</h1>
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
                            <p>© ${new Date().getFullYear()} Your Portfolio. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `🚀 New Project Inquiry from ${data.firstName} ${data.lastName} - ${data.projectType || 'General Inquiry'}`,
            html: htmlContent
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: "Email sent successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
        );
    }
}