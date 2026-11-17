import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { cleanContact, validateContact, type ContactValues } from "@/lib/contact";


export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 16 * 1024;

// ─── simple per-IP rate limit (5 requests / 10 minutes per server instance) ──
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // keep memory bounded
  return false;
}

// ─── SMTP transport (created once, from env) ────────────────────────────────
let transporter: Transporter | null = null;

function smtpConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = String(process.env.SMTP_SECURE || "false").toLowerCase() === "true";
  const user = process.env.SMTP_USER?.trim();
  // Gmail shows app passwords in groups of four — spaces are not part of it
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, "");
  if (!host || !user || !pass || !Number.isFinite(port)) return null;
  return { host, port, secure, user, pass };
}

function getTransporter() {
  if (transporter) return transporter;
  const c = smtpConfig();
  if (!c) return null;
  transporter = nodemailer.createTransport({
    host: c.host,
    port: c.port,
    secure: c.secure, // false on 587 → upgraded with STARTTLS
    requireTLS: !c.secure, // never send credentials without TLS
    auth: { user: c.user, pass: c.pass },
    connectionTimeout: 15_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
  return transporter;
}

// ─── e-mail content ─────────────────────────────────────────────────────────
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

function buildEmail(v: ContactValues, received: string, page: string) {
  const subject = `New demo request — ${v.company || v.name}`;
  const rows: [string, string][] = [
    ["Name", v.name],
    ["E-mail", v.email],
    ["Company / property", v.company || "—"],
  ];

  const text = [
    "New demo request from the Enerceon website",
    "",
    ...rows.map(([k, val]) => `${k}: ${val}`),
    "",
    "Message:",
    v.message,
    "",
    `Received: ${received}`,
    page ? `Page: ${page}` : "",
    "",
    "Reply to this e-mail to answer the visitor directly.",
  ]
    .filter((l, i, a) => !(l === "" && a[i - 1] === ""))
    .join("\n");

  const html = `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f3efe6;font-family:Segoe UI,Arial,sans-serif;color:#18181b">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e7e1d4">
    <tr><td style="background:#18181b;padding:22px 26px;border-bottom:3px solid #cda658">
      <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#cda658;font-weight:700">Enerceon website</div>
      <div style="font-size:20px;font-weight:700;color:#ffffff;margin-top:4px">New demo request</div>
    </td></tr>
    <tr><td style="padding:22px 26px">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:14px">
        ${rows
          .map(
            ([k, val]) => `<tr>
          <td style="padding:8px 0;color:#8b857a;width:170px;vertical-align:top">${esc(k)}</td>
          <td style="padding:8px 0;font-weight:600">${
            k === "E-mail" ? `<a href="mailto:${esc(val)}" style="color:#a7843b">${esc(val)}</a>` : esc(val)
          }</td></tr>`
          )
          .join("")}
      </table>
      <div style="margin-top:16px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#a7843b;font-weight:700">Message</div>
      <div style="margin-top:8px;padding:14px 16px;background:#faf8f4;border:1px solid #efe7d4;border-radius:10px;font-size:14px;line-height:1.6;white-space:pre-wrap">${esc(
        v.message
      )}</div>
      <div style="margin-top:18px;font-size:12px;color:#8b857a">Received ${esc(received)}${
        page ? ` · ${esc(page)}` : ""
      }<br>Reply to this e-mail to answer ${esc(v.name)} directly.</div>
    </td></tr>
  </table>
</body></html>`;

  return { subject, text, html };
}

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

// ─── handler ────────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  // Same-site check: browsers send Origin on POST; it must match this host.
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return json({ ok: false, error: "Request not allowed." }, 403);
    } catch {
      return json({ ok: false, error: "Request not allowed." }, 403);
    }
  }

  const len = Number(request.headers.get("content-length") || 0);
  if (len > MAX_BODY_BYTES) return json({ ok: false, error: "Your message is too long." }, 413);

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "local";
  if (rateLimited(ip)) {
    return json({ ok: false, error: "Too many requests. Please wait a few minutes and try again." }, 429);
  }

  let raw: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return json({ ok: false, error: "Your message is too long." }, 413);
    raw = JSON.parse(text);
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("bad body");
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  // Honeypot: real visitors never fill it. Pretend success so bots learn nothing.
  if (typeof raw.botcheck === "string" && raw.botcheck.trim()) return json({ ok: true });

  const values = cleanContact(raw);
  const errors = validateContact(values);
  if (Object.keys(errors).length) {
    return json({ ok: false, error: "Please check the highlighted fields.", errors }, 422);
  }

  const mailer = getTransporter();
  const cfg = smtpConfig();
  if (!mailer || !cfg) {
    console.error("[contact] SMTP is not configured — set SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASS.");
    return json({ ok: false, error: "The form is temporarily unavailable." }, 503);
  }

  const tz = process.env.CONTACT_TIMEZONE || "Asia/Karachi";
  let received: string;
  try {
    received = new Date().toLocaleString("en-GB", { timeZone: tz, dateStyle: "medium", timeStyle: "short" }) + ` (${tz})`;
  } catch {
    received = new Date().toISOString();
  }
  const page = typeof raw.page === "string" ? raw.page.slice(0, 200) : "";
  const { subject, text, html } = buildEmail(values, received, page);

  try {
    await mailer.sendMail({
      from: { name: "Enerceon Website", address: cfg.user }, // Gmail sends as the authenticated account
      to: process.env.CONTACT_TO?.trim() || cfg.user,
      replyTo: { name: values.name, address: values.email },
      subject,
      text,
      html,
    });
    return json({ ok: true });
  } catch (err) {
    // Log the reason on the server only — never send SMTP details to the browser.
    const e = err as { code?: string; responseCode?: number; message?: string };
    console.error("[contact] sending failed:", e.code || "", e.responseCode || "", e.message || err);
    return json({ ok: false, error: "We couldn't send your message just now." }, 502);
  }
}

export function GET() {
  return json({ ok: false, error: "Method not allowed." }, 405);
}
