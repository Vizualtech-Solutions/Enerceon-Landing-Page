/**
 * Demo-request form rules — shared by the browser (instant feedback) and the
 * /api/contact route (the check that really counts). No secrets in here.
 */
export interface ContactValues {
  name: string;
  email: string;
  company: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export const CONTACT_LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 160 },
  company: { max: 120 },
  message: { min: 10, max: 2000 },
} as const;

// Practical e-mail check: one @, a dot in the domain, no spaces.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Trim and collapse; strips control characters (incl. CR/LF in one-line fields). */
export function cleanContact(input: Record<string, unknown>): ContactValues {
  const line = (v: unknown) =>
    String(v ?? "")
      .replace(/[\u0000-\u001f\u007f]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  const block = (v: unknown) =>
    String(v ?? "")
      .replace(/\r\n?/g, "\n")
      .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]+/g, "")
      .replace(/\n{4,}/g, "\n\n\n")
      .trim();
  return {
    name: line(input.name),
    email: line(input.email).toLowerCase(),
    company: line(input.company),
    message: block(input.message),
  };
}

export function validateContact(v: ContactValues): ContactErrors {
  const e: ContactErrors = {};
  const L = CONTACT_LIMITS;

  if (!v.name) e.name = "Please enter your name.";
  else if (v.name.length < L.name.min) e.name = "Your name looks too short.";
  else if (v.name.length > L.name.max) e.name = `Please keep your name under ${L.name.max} characters.`;

  if (!v.email) e.email = "Please enter your work e-mail.";
  else if (v.email.length > L.email.max || !EMAIL_RE.test(v.email))
    e.email = "Please enter a valid e-mail address, e.g. you@company.com.";

  if (v.company.length > L.company.max) e.company = `Please keep this under ${L.company.max} characters.`;

  if (!v.message) e.message = "Tell us a little about your sites, meters or billing.";
  else if (v.message.length < L.message.min) e.message = `Please write at least ${L.message.min} characters.`;
  else if (v.message.length > L.message.max) e.message = `Please keep your message under ${L.message.max} characters.`;

  return e;
}
