import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { site } from "@/lib/site";

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  company: z.string().max(160).optional(),
  intent: z.enum(["role", "freelance", "other"]),
  message: z.string().min(20).max(5000),
});

const intentLabels: Record<z.infer<typeof schema>["intent"], string> = {
  role: "Full-time role",
  freelance: "Freelance project",
  other: "Other",
};

/** Values land inside an HTML email — escape before interpolating. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const shell = (body: string) => `
<!DOCTYPE html>
<html lang="en">
  <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
  <body style="margin:0;background:#faf9f7;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#16140f;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e3dfd7;padding:40px 32px;">
      ${body}
      <p style="margin:40px 0 0;padding-top:20px;border-top:1px solid #e3dfd7;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#8c867c;">
        ${escapeHtml(site.name)} · ${escapeHtml(site.role)}
      </p>
    </div>
  </body>
</html>`;

export async function POST(req: Request) {
  let data: z.infer<typeof schema>;

  try {
    data = schema.parse(await req.json());
  } catch {
    return NextResponse.json(
      { error: "Invalid submission" },
      { status: 400 },
    );
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    console.error("Contact form: EMAIL_USER / EMAIL_APP_PASSWORD not set");
    return NextResponse.json(
      { error: "Mail is not configured" },
      { status: 500 },
    );
  }

  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const company = data.company ? escapeHtml(data.company) : "—";
  const intent = intentLabels[data.intent];
  const message = escapeHtml(data.message).replace(/\n/g, "<br />");

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f3f1ed;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#8c867c;width:38%;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #f3f1ed;font-size:15px;color:#16140f;">${value}</td>
    </tr>`;

  const adminHtml = shell(`
    <p style="margin:0;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#b8400f;">New enquiry</p>
    <h1 style="margin:12px 0 28px;font-size:26px;letter-spacing:-0.02em;font-weight:600;">${name}</h1>
    <table style="width:100%;border-collapse:collapse;">
      ${row("Email", `<a href="mailto:${email}" style="color:#b8400f;text-decoration:none;">${email}</a>`)}
      ${row("Company", company)}
      ${row("About", intent)}
    </table>
    <p style="margin:28px 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#8c867c;">Message</p>
    <p style="margin:0;font-size:15px;line-height:1.65;color:#5f5a52;">${message}</p>
    <p style="margin:32px 0 0;">
      <a href="mailto:${email}" style="display:inline-block;background:#16140f;color:#faf9f7;padding:12px 24px;font-size:14px;text-decoration:none;">Reply to ${name}</a>
    </p>
  `);

  const userHtml = shell(`
    <p style="margin:0;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#b8400f;">Message received</p>
    <h1 style="margin:12px 0 24px;font-size:26px;letter-spacing:-0.02em;font-weight:600;">Thanks, ${name}.</h1>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#5f5a52;">
      Your message came through and I'll read it properly — expect a personal reply within a day.
    </p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.65;color:#5f5a52;">
      For reference, here's what you sent:
    </p>
    <p style="margin:0;padding:20px;background:#f3f1ed;font-size:15px;line-height:1.65;color:#5f5a52;">${message}</p>
    <p style="margin:28px 0 0;font-size:15px;line-height:1.65;color:#5f5a52;">
      If anything's urgent, reply to this email directly.
    </p>
  `);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    await Promise.all([
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: data.email,
        subject: `${intent} — ${data.name}`,
        html: adminHtml,
      }),
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: data.email,
        replyTo: process.env.EMAIL_USER,
        subject: `Thanks for reaching out, ${data.name}`,
        html: userHtml,
      }),
    ]);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form: failed to send", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
