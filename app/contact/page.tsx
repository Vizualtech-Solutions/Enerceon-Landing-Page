import type { Metadata } from "next";
import Link from "next/link";
import PageShell, { proseH2, proseP } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the Enerceon team about demonstrations, pricing and pilots, or about deployment and integration support.",
  alternates: { canonical: "/contact" },
};

const MAILBOXES = [
  {
    icon: "✉",
    label: "Sales and demonstrations",
    address: "sales@enerceon.com",
    body: "Demos, pricing and pilot projects. Tell us roughly how many sites and meters you have and which utilities you need covered — it makes the first conversation much faster.",
    color: "#4FD5F0",
    bg: "rgba(0,200,245,.12)",
  },
  {
    icon: "◈",
    label: "Deployment and integration",
    address: "support@enerceon.com",
    body: "On-premise installation, BMS and metering integration, Niagara, Modbus, SQL and API questions.",
    color: "#4FE0A8",
    bg: "rgba(46,204,113,.12)",
  },
];

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Talk to the Enerceon team."
      intro="Tell us about your site or portfolio and we will map a demonstration to your building and meter structure."
    >
      <div className="en-card-grid" style={{ marginBottom: "clamp(22px,4vw,34px)" }}>
        {MAILBOXES.map((m, i) => (
          <a
            key={m.address}
            href={`mailto:${m.address}`}
            data-panel=""
            className="en-card en-rise en-contact-row"
            style={{ display: "block", ["--d" as string]: `${i * 80}ms` }}
          >
            <span
              aria-hidden="true"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "34px",
                height: "34px",
                borderRadius: "10px",
                background: m.bg,
                color: m.color,
                fontSize: "15px",
                marginBottom: "12px",
              }}
            >
              {m.icon}
            </span>
            <p
              data-t="dim"
              className="en-mono"
              style={{
                fontSize: "10px",
                letterSpacing: "1.3px",
                textTransform: "uppercase",
                color: "#6F889E",
                margin: "0 0 6px",
              }}
            >
              {m.label}
            </p>
            <p
              data-t="title"
              className="en-display"
              style={{ fontSize: "16.5px", fontWeight: 600, color: "#fff", margin: "0 0 8px" }}
            >
              {m.address}
            </p>
            <p data-t="body" style={{ ...proseP, margin: 0, fontSize: "13.5px" }}>
              {m.body}
            </p>
          </a>
        ))}
      </div>

      <section
        data-panel=""
        className="en-card en-rise"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: "clamp(16px,3vw,32px)",
          alignItems: "center",
          padding: "clamp(20px,3.4vw,30px)",
          ["--d" as string]: "160ms",
        }}
      >
        <div>
          <h2
            data-t="title"
            className="en-display"
            style={{ ...proseH2, fontSize: "clamp(18px,3.4vw,22px)" }}
          >
            Request a demo
          </h2>
          <p data-t="body" style={{ ...proseP, margin: 0 }}>
            The form on the home page reaches the same inbox as sales@enerceon.com and takes about a
            minute. Enerceon is published by <strong>VizualTech</strong> — read more{" "}
            <Link href="/about">about the platform</Link>, or see how we handle your details in our{" "}
            <Link href="/privacy">privacy notice</Link>.
          </p>
        </div>
        <div>
          <Link
            href="/#contact"
            className="en-cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              padding: "14px 24px",
              borderRadius: "999px",
              background: "linear-gradient(90deg,#007BFF,#00C8F5 55%,#2ECC71)",
              color: "#04121F",
              fontWeight: 600,
              fontSize: "14.5px",
            }}
          >
            Open the demo form <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
