"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import Icon from "./Icon";
import { SALES_EMAIL, SUPPORT_EMAIL } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

const BUTTON_LABEL: Record<Status, string> = {
  idle: "Request a demo",
  sending: "Sending…",
  sent: "Thanks — we'll be in touch",
  error: "Try again",
};

const FALLBACK = `Please email ${SALES_EMAIL} instead.`;

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

        <form className="en-form en-reveal" style={{ ["--d" as string]: "120ms" }} onSubmit={handleSubmit} noValidate={false}>
          <div className="en-form-grid">
            <label>
              <span>Name</span>
              <input name="name" autoComplete="name" required maxLength={120} placeholder="Your name" />
            </label>
            <label>
              <span>Work e-mail</span>
              <input name="email" type="email" autoComplete="email" required maxLength={160} placeholder="you@company.com" />
            </label>
            <label className="is-wide">
              <span>Company / property</span>
              <input name="company" autoComplete="organization" maxLength={160} placeholder="Company or building name" />
            </label>
            <label className="is-wide">
              <span>Message</span>
              <textarea
                name="message"
                rows={4}
                maxLength={2000}
                placeholder="Sites, number of meters, utilities, how you bill today…"
              />
            </label>
          </div>
          {/* honeypot */}
          <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="en-hp" />
          <button type="submit" className="en-btn en-btn-gold en-form-submit" disabled={status === "sending"}>
            {BUTTON_LABEL[status]}
            {status !== "sending" && <Icon name={status === "sent" ? "check" : "arrowRight"} size={16} />}
          </button>
          <p className="en-form-status" role="status" aria-live="polite">
            {status === "error" ? error : status === "sent" ? "Your request has been sent." : ""}
          </p>
          <p className="en-form-note">
            We use these details only to reply to you. See the <Link href="/privacy">privacy notice</Link>.
          </p>
        </form>
      </div>
    </section>
  );
}
