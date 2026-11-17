"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import Icon from "./Icon";
import { SALES_EMAIL, SUPPORT_EMAIL } from "@/lib/site";
import {
  CONTACT_LIMITS,
  cleanContact,
  validateContact,
  type ContactErrors,
  type ContactValues,
} from "@/lib/contact";

type Status = "idle" | "sending" | "sent" | "error";
type Field = keyof ContactValues;

const EMPTY: ContactValues = { name: "", email: "", company: "", message: "" };
const FIELD_ORDER: Field[] = ["name", "email", "company", "message"];
const FALLBACK = `If it keeps happening, e-mail ${SALES_EMAIL}.`;

/**
 * "Talk to us" — the form posts to /api/contact, which e-mails it to the
 * Enerceon inbox through Gmail SMTP on the server. No credentials here.
 */
export default function Contact() {
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [shaking, setShaking] = useState(false);
  const [sentName, setSentName] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const honeyRef = useRef<HTMLInputElement>(null);

  // replay the "shake" animation (remove the class, add it on the next frame)
  const shake = () => {
    setShaking(false);
    requestAnimationFrame(() => setShaking(true));
  };

  const recheck = (next: ContactValues) => setErrors(validateContact(cleanContact({ ...next })));

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as Field;
    const next = { ...values, [name]: e.target.value };
    setValues(next);
    if (touched[name]) recheck(next);
    if (status === "error") setStatus("idle");
  };

  const onBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as Field;
    setTouched((t) => ({ ...t, [name]: true }));
    recheck(values);
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const clean = cleanContact({ ...values });
    const found = validateContact(clean);
    setTouched({ name: true, email: true, company: true, message: true });
    setErrors(found);
    if (Object.keys(found).length) {
      shake();
      const first = FIELD_ORDER.find((f) => found[f]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    setServerError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...clean,
          botcheck: honeyRef.current?.value || "",
          page: typeof window !== "undefined" ? window.location.pathname : "",
        }),
      });
      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string; errors?: ContactErrors }
        | null;

      if (response.ok && result?.ok) {
        setSentName(clean.name.split(" ")[0] || clean.name);
        setStatus("sent");
        setValues(EMPTY);
        setTouched({});
        setErrors({});
        return;
      }
      if (result?.errors) setErrors(result.errors);
      setServerError(`${result?.error || "We couldn't send your message just now."} ${FALLBACK}`);
      setStatus("error");
      shake();
    } catch {
      setServerError(`We couldn't reach the server. Please check your connection and try again. ${FALLBACK}`);
      setStatus("error");
      shake();
    }
  }

  const show = (f: Field) => (touched[f] ? errors[f] : undefined);
  const isValid = (f: Field) => touched[f] && !errors[f] && values[f].trim() !== "";
  const sending = status === "sending";

  return (
    <section id="contact" className="en-sec en-dark en-contact">
      <div className="en-wrap en-contact-row">
        <div className="en-contact-copy en-reveal">
          <p className="en-eyebrow">
            <span>08</span>Talk to us
          </p>
          <h2 className="en-h2">
            See your facility <em>in Enerceon</em>.
          </h2>
          <p className="en-lead">
            Ask us for a live walkthrough with your own sites, meters and accounts — from the first dashboard to the
            first bill sent.
          </p>
          <ul className="en-contact-list">
            <li>
              <a href={`mailto:${SALES_EMAIL}`}>
                <span>
                  <Icon name="mail" size={18} />
                </span>
                <div>
                  <strong>{SALES_EMAIL}</strong>
                  <small>Demos, pricing and pilots</small>
                </div>
              </a>
            </li>
            <li>
              <a href={`mailto:${SUPPORT_EMAIL}`}>
                <span>
                  <Icon name="shield" size={18} />
                </span>
                <div>
                  <strong>{SUPPORT_EMAIL}</strong>
                  <small>Deployment and support</small>
                </div>
              </a>
            </li>
          </ul>
          <Image
            src="/assets/enerceon-logo-tagline-light.png"
            alt="Enerceon — Your Energy. Reimagined."
            width={1399}
            height={280}
            sizes="240px"
            className="en-contact-logo"
          />
        </div>

        <div className="en-form-wrap en-reveal" style={{ ["--d" as string]: "120ms" }}>
          {status === "sent" ? (
            <div className="en-form en-form-success" role="status" aria-live="polite">
              <svg className="en-check" viewBox="0 0 64 64" aria-hidden="true">
                <circle className="en-check-ring" cx="32" cy="32" r="29" />
                <path className="en-check-tick" d="M19 33.5 28 42l17-19" />
              </svg>
              <h3>Thank you{sentName ? `, ${sentName}` : ""}!</h3>
              <p>
                Your request has reached the Enerceon team. We&apos;ll reply to your e-mail shortly.
              </p>
              <button type="button" className="en-btn en-btn-ghost" onClick={() => setStatus("idle")}>
                Send another message
              </button>
            </div>
          ) : (
            <form
              ref={formRef}
              className={`en-form${shaking ? " is-shaking" : ""}${sending ? " is-sending" : ""}`}
              onAnimationEnd={(e) => {
                if (e.target === e.currentTarget) setShaking(false);
              }}
              onSubmit={handleSubmit}
              noValidate
              aria-busy={sending}
            >
              <span className="en-form-progress" aria-hidden="true" />
              <fieldset disabled={sending} className="en-form-fields">
                <legend className="en-sr-only">Request a demo</legend>
                <div className="en-form-grid">
                  <FieldBox
                    label="Name"
                    name="name"
                    required
                    error={show("name")}
                    valid={isValid("name")}
                    input={
                      <input
                        id="cf-name"
                        name="name"
                        autoComplete="name"
                        maxLength={CONTACT_LIMITS.name.max}
                        placeholder="Your name"
                        value={values.name}
                        onChange={onChange}
                        onBlur={onBlur}
                        aria-invalid={!!show("name")}
                        aria-describedby={show("name") ? "cf-name-err" : undefined}
                      />
                    }
                  />
                  <FieldBox
                    label="Work e-mail"
                    name="email"
                    required
                    error={show("email")}
                    valid={isValid("email")}
                    input={
                      <input
                        id="cf-email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        maxLength={CONTACT_LIMITS.email.max}
                        placeholder="you@company.com"
                        value={values.email}
                        onChange={onChange}
                        onBlur={onBlur}
                        aria-invalid={!!show("email")}
                        aria-describedby={show("email") ? "cf-email-err" : undefined}
                      />
                    }
                  />
                  <FieldBox
                    label="Company / property"
                    name="company"
                    wide
                    error={show("company")}
                    valid={isValid("company")}
                    hint="Optional"
                    input={
                      <input
                        id="cf-company"
                        name="company"
                        autoComplete="organization"
                        maxLength={CONTACT_LIMITS.company.max}
                        placeholder="Company or building name"
                        value={values.company}
                        onChange={onChange}
                        onBlur={onBlur}
                        aria-invalid={!!show("company")}
                        aria-describedby={show("company") ? "cf-company-err" : undefined}
                      />
                    }
                  />
                  <FieldBox
                    label="Message"
                    name="message"
                    required
                    wide
                    error={show("message")}
                    valid={isValid("message")}
                    hint={`${values.message.length}/${CONTACT_LIMITS.message.max}`}
                    input={
                      <textarea
                        id="cf-message"
                        name="message"
                        rows={4}
                        maxLength={CONTACT_LIMITS.message.max}
                        placeholder="Sites, number of meters, utilities, how you bill today…"
                        value={values.message}
                        onChange={onChange}
                        onBlur={onBlur}
                        aria-invalid={!!show("message")}
                        aria-describedby={show("message") ? "cf-message-err" : undefined}
                      />
                    }
                  />
                </div>
              </fieldset>

              {/* honeypot — hidden from people, bots fill it */}
              <input
                ref={honeyRef}
                type="text"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="en-hp"
                defaultValue=""
              />

              {status === "error" && (
                <div className="en-form-alert" role="alert">
                  <Icon name="alert" size={18} />
                  <p>{serverError}</p>
                </div>
              )}

              <button type="submit" className="en-btn en-btn-gold en-form-submit" disabled={sending}>
                {sending ? (
                  <>
                    <span className="en-btn-spinner" aria-hidden="true" />
                    Sending your request…
                  </>
                ) : (
                  <>
                    {status === "error" ? "Try again" : "Request a demo"}
                    <Icon name={status === "error" ? "refresh" : "arrowRight"} size={16} />
                  </>
                )}
              </button>
              <p className="en-form-note">
                We use these details only to reply to you. See the <Link href="/privacy">privacy notice</Link>.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function FieldBox({
  label,
  name,
  input,
  error,
  valid,
  required,
  wide,
  hint,
}: {
  label: string;
  name: Field;
  input: React.ReactNode;
  error?: string;
  valid?: boolean;
  required?: boolean;
  wide?: boolean;
  hint?: string;
}) {
  return (
    <div className={`en-field${wide ? " is-wide" : ""}${error ? " has-error" : ""}${valid ? " is-valid" : ""}`}>
      <label htmlFor={`cf-${name}`}>
        <span>
          {label}
          {required && <b aria-hidden="true"> *</b>}
        </span>
        {hint && <small>{hint}</small>}
      </label>
      <div className="en-field-box">
        {input}
        {valid && (
          <span className="en-field-ok" aria-hidden="true">
            <Icon name="check" size={14} />
          </span>
        )}
      </div>
      <p className="en-field-error" id={`cf-${name}-err`} aria-live="polite">
        {error && (
          <>
            <Icon name="alert" size={13} /> {error}
          </>
        )}
      </p>
    </div>
  );
}
