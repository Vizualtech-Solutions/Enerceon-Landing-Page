"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import Link from "next/link";
import { container, eyebrow, reveal, sectionBody, sectionTitle } from "./styles";

const CONTACTS = [
  {
    href: "mailto:sales@enerceon.com",
    icon: "✉",
    tone: "cyan",
    iconColor: "#4FD5F0",
    iconBg: "rgba(0,200,245,.12)",
    label: "sales@enerceon.com",
    detail: "Demos, pricing and pilots",
  },
  {
    href: "mailto:support@enerceon.com",
    icon: "◈",
    tone: "cyan",
    iconColor: "#4FD5F0",
    iconBg: "rgba(0,200,245,.12)",
    label: "support@enerceon.com",
    detail: "Deployment and integration support",
  },
];

const field: CSSProperties = {
  width: "100%",
  border: "1px solid rgba(255,255,255,.12)",
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  borderRadius: "10px",
  padding: "14px",
  outline: "none",
  fontSize: "15px",
};

type Status = "idle" | "sending" | "sent" | "error";

const BUTTON_LABEL: Record<Status, string> = {
  idle: "Request demo →",
  sending: "Sending…",
  sent: "Thanks — we'll be in touch ✓",
  error: "Try again →",
};

const FALLBACK = "Please email sales@enerceon.com instead.";

/* Web3Forms' free plan accepts submissions from the browser only — server-side
   relaying returns 403 — so the access key is deliberately public. It authorises
   delivery to one registered inbox and nothing else. */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    // Honeypot: bots fill it, people never see it. Pretend success either way.
    if (data.botcheck) {
      form.reset();
      setStatus("sent");
      return;
    }

    if (!ACCESS_KEY) {
      setStatus("error");
      setError(`This form is not configured yet. ${FALLBACK}`);
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Enerceon demo request — ${data.company || data.name}`,
          from_name: "Enerceon website",
          replyto: data.email,
          name: data.name,
          email: data.email,
          company: data.company || "(not given)",
          message: data.message || "(no message provided)",
        }),
      });
      const result = (await response.json().catch(() => null)) as { success?: boolean } | null;

      if (!response.ok || !result?.success) {
        setStatus("error");
        setError(`We could not send that just now. ${FALLBACK}`);
        return;
      }

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
      setError(`We could not reach the form service. ${FALLBACK}`);
    }
  }

  return (
    <section
      id="contact"
      data-tone="b"
      style={{ background: "#061424", padding: "clamp(58px,10vw,104px) 0" }}
    >
      <div
        style={{
          ...container,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "clamp(26px,5vw,54px)",
          alignItems: "start",
        }}
      >
        <div className="en-reveal" style={reveal()}>
          <div data-t="mono" className="en-mono" style={eyebrow}>
            09 / Talk to us
          </div>
          <h2
            data-t="title"
            className="en-display"
            style={{ ...sectionTitle, fontSize: "clamp(27px,5.6vw,40px)" }}
          >
            Your energy data already exists. Make it easier to understand.
          </h2>
          <p data-t="body" style={{ ...sectionBody, maxWidth: "48ch" }}>
            A tailored demonstration, mapped to your building and meter structure, with integration
            discussed against your real data sources.
          </p>

          <div style={{ display: "grid", gap: "10px", marginTop: "26px" }}>
            {CONTACTS.map((contact) => (
              <a
                key={contact.href}
                href={contact.href}
                data-soft=""
                className="en-contact-row"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "15px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,.09)",
                  background: "rgba(255,255,255,.03)",
                }}
              >
                <span
                  data-icon={contact.tone}
                  style={{
                    width: "34px",
                    height: "34px",
                    flex: "0 0 34px",
                    borderRadius: "9px",
                    background: contact.iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "15px",
                    color: contact.iconColor,
                  }}
                >
                  {contact.icon}
                </span>
                <span>
                  <b
                    data-t="title"
                    className="en-display"
                    style={{ display: "block", fontSize: "14.5px", color: "#fff" }}
                  >
                    {contact.label}
                  </b>
                  <span data-t="dim" style={{ fontSize: "12.5px", color: "#8299AE" }}>
                    {contact.detail}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          data-panel=""
          style={{
            background: "#07162A",
            border: "1px solid rgba(255,255,255,.09)",
            borderRadius: "18px",
            padding: "clamp(22px,4.5vw,38px)",
          }}
        >
          <h3
            data-t="title"
            className="en-display"
            style={{ fontSize: "20px", fontWeight: 600, color: "#fff", margin: "0 0 6px" }}
          >
            Request a demo
          </h3>
          <p data-t="dim" style={{ fontSize: "13px", color: "#8CA3B8", margin: "0 0 18px" }}>
            Tell us about your site or portfolio.
          </p>

          <div style={{ display: "grid", gap: "10px" }}>
            <label className="en-sr-only" htmlFor="demo-name">
              Name
            </label>
            <input
              id="demo-name"
              name="name"
              autoComplete="name"
              required
              data-input=""
              className="en-input"
              placeholder="Name"
              style={field}
            />

            <label className="en-sr-only" htmlFor="demo-email">
              Work email
            </label>
            <input
              id="demo-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              data-input=""
              className="en-input"
              placeholder="Work email"
              style={field}
            />

            <label className="en-sr-only" htmlFor="demo-company">
              Company / organisation
            </label>
            <input
              id="demo-company"
              name="company"
              autoComplete="organization"
              data-input=""
              className="en-input"
              placeholder="Company / organisation"
              style={field}
            />

            <label className="en-sr-only" htmlFor="demo-message">
              What would you like to monitor or improve?
            </label>
            <textarea
              id="demo-message"
              name="message"
              data-input=""
              className="en-input"
              placeholder="What would you like to monitor or improve?"
              style={{
                ...field,
                minHeight: "96px",
                resize: "vertical",
                fontFamily: "inherit",
              }}
            />

            {/* Honeypot — visually hidden, never announced, bots fill it. */}
            <input
              type="text"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="en-sr-only"
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="en-submit"
              style={{
                width: "100%",
                border: 0,
                cursor: "pointer",
                padding: "15px",
                borderRadius: "999px",
                background: "linear-gradient(90deg,#007BFF,#00C8F5 55%,#2ECC71)",
                color: "#04121F",
                fontWeight: 600,
                fontSize: "15px",
              }}
            >
              {BUTTON_LABEL[status]}
            </button>
          </div>

          {status === "error" && error && (
            <p
              role="alert"
              style={{
                fontSize: "12.5px",
                color: "#FF8A78",
                margin: "12px 0 0",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}

          <p
            data-t="dim"
            style={{
              fontSize: "11px",
              color: "#6F869B",
              margin: "12px 0 0",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            We use your details only to answer this enquiry. See our{" "}
            <Link href="/privacy" style={{ color: "#7BE7FB" }}>
              privacy notice
            </Link>
            .
          </p>
        </form>
      </div>
    </section>
  );
}
