import { NextResponse } from "next/server";

import {
  isValidBranch,
  isValidCity,
  isValidInterest,
  type ContactFormPayload,
} from "@/lib/contact-form";

export const runtime = "nodejs";

const MIN_FILL_SECONDS = 3;

function badRequest(message: string, status = 422) {
  return NextResponse.json({ ok: false, message }, { status });
}

function sanitize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildTextBody(payload: ContactFormPayload) {
  return [
    "New website inquiry",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Interest: ${payload.interest}`,
    ...(payload.product ? [`Product: ${payload.product}`] : []),
    `City: ${payload.city}`,
    `Preferred Branch: ${payload.preferredBranch}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Partial<ContactFormPayload> | null;
  if (!body) {
    return badRequest("Invalid submission data.");
  }

  const payload: ContactFormPayload = {
    name: sanitize(body.name),
    email: sanitize(body.email),
    phone: sanitize(body.phone),
    interest: sanitize(body.interest),
    city: sanitize(body.city),
    preferredBranch: sanitize(body.preferredBranch),
    product: sanitize(body.product),
    message: sanitize(body.message),
    company: sanitize(body.company),
    startedAt: Number(body.startedAt ?? 0),
  };

  if (payload.company !== "") {
    return NextResponse.json({ ok: true, message: "Your inquiry has been sent successfully." });
  }

  const elapsedSeconds = payload.startedAt > 0 ? Date.now() / 1000 - payload.startedAt / 1000 : MIN_FILL_SECONDS;
  if (elapsedSeconds < MIN_FILL_SECONDS) {
    return badRequest("Please take a moment and submit the form again.");
  }

  if (
    !payload.name ||
    !payload.email ||
    !payload.phone ||
    !payload.interest ||
    !payload.city ||
    !payload.preferredBranch ||
    !payload.message
  ) {
    return badRequest("Please complete all required fields.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return badRequest("Please enter a valid email address.");
  }

  if (!isValidInterest(payload.interest)) {
    return badRequest("Please select a valid inquiry type.");
  }

  if (!isValidCity(payload.city)) {
    return badRequest("Please select a valid city.");
  }

  if (!isValidBranch(payload.city, payload.preferredBranch)) {
    return badRequest("Please select a valid branch.");
  }

  if (payload.message.length < 10) {
    return badRequest("Please provide a little more detail in your message.");
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !toEmail || !fromEmail) {
    return badRequest("Contact form is not configured yet.", 500);
  }

  const subjectPrefix = process.env.CONTACT_SUBJECT_PREFIX || "Website Inquiry";
  const text = buildTextBody(payload);
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#102246">
      <h2 style="margin:0 0 16px">New website inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
      <p><strong>Interest:</strong> ${escapeHtml(payload.interest)}</p>
      ${payload.product ? `<p><strong>Product:</strong> ${escapeHtml(payload.product)}</p>` : ""}
      <p><strong>City:</strong> ${escapeHtml(payload.city)}</p>
      <p><strong>Preferred Branch:</strong> ${escapeHtml(payload.preferredBranch)}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(payload.message)}</p>
    </div>
  `;

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      cc: process.env.CONTACT_CC_EMAIL ? [process.env.CONTACT_CC_EMAIL] : undefined,
      reply_to: payload.email,
      subject: `${subjectPrefix} | ${payload.interest} | ${payload.city} | ${payload.name}`,
      html,
      text,
    }),
  });

  if (!emailResponse.ok) {
    const errorText = await emailResponse.text().catch(() => "");
    console.error("Resend API error", errorText);
    return badRequest("Unable to send your message right now.", 500);
  }

  return NextResponse.json({
    ok: true,
    message: "Your inquiry has been sent successfully.",
  });
}
