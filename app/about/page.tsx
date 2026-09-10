import type { Metadata } from "next";
import Link from "next/link";
import PageShell, { proseH2, proseP } from "@/components/PageShell";
import { CAPABILITIES } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Enerceon is an energy intelligence and management platform built by VizualTech for multi-site, multi-utility monitoring, analytics and reporting.",
  alternates: { canonical: "/about" },
};

const PILLARS = [
  {
    k: "Structured",
    h: "Organised the way the estate is run",
    b: "Site, building, floor, space and meter stay linked, so a portfolio number can be traced to the meter behind it without losing context.",
  },
  {
    k: "Multi-utility",
    h: "More than electricity",
    b: "Electricity, water, gas and BTU / cooling in one interface, each keeping its own measurements, plus virtual meters for calculated loads.",
  },
  {
    k: "On-premise",
    h: "Your data stays yours",
    b: "The application and its data run inside the customer environment. Authorised users open it in a browser — nothing to install.",
  },
  {
    k: "Additive",
    h: "Sits above your stack",
    b: "Niagara, BMS, Modbus, SQL and API sources feed one model. Dashboards are separated from acquisition, so integrations can evolve.",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="An energy layer above the systems you already run."
      intro="Enerceon turns meter and building-system data into energy intelligence facility teams can act on — across sites, buildings, floors, spaces and tenants."
      aside={
        <div className="en-fact">
          <p
            data-t="dim"
            className="en-mono"
            style={{ fontSize: "10px", letterSpacing: "1.3px", color: "#6F889E", margin: "0 0 8px" }}
          >
            AT A GLANCE
          </p>
          <p data-t="body" style={{ ...proseP, margin: 0, fontSize: "14.5px" }}>
            An energy intelligence and management platform published by{" "}
            <strong>VizualTech</strong>. Browser-based, deployed on-premise, and built to work with
            the controls stack already in place.
          </p>
        </div>
      }
    >
      <section style={{ marginBottom: "clamp(30px,5vw,52px)" }}>
        <h2 data-t="title" className="en-display en-rise" style={proseH2}>
          What it is
        </h2>
        <div className="en-card-grid">
          {PILLARS.map((p, i) => (
            <div
              key={p.k}
              data-panel=""
              className="en-card en-rise"
              style={{ ["--d" as string]: `${i * 70}ms` }}
            >
              <p
                data-t="accent"
                className="en-mono"
                style={{
                  fontSize: "10px",
                  letterSpacing: "1.3px",
                  textTransform: "uppercase",
                  color: "#57D8EE",
                  margin: "0 0 10px",
                }}
              >
                {p.k}
              </p>
              <h3
                data-t="title"
                className="en-display"
                style={{ fontSize: "16px", fontWeight: 600, color: "#fff", margin: "0 0 7px" }}
              >
                {p.h}
              </h3>
              <p data-t="body" style={{ ...proseP, margin: 0, fontSize: "14px" }}>
                {p.b}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: "clamp(30px,5vw,52px)" }}>
        <h2 data-t="title" className="en-display en-rise" style={proseH2}>
          What it covers
        </h2>
        <div
          className="en-rise"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: "0 clamp(18px,3vw,40px)",
          }}
        >
          {CAPABILITIES.map((c, i) => (
            <div
              key={c.title}
              data-line=""
              style={{
                display: "grid",
                gridTemplateColumns: "26px 1fr",
                gap: "10px",
                padding: "13px 0",
                borderTop: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <span
                data-t="accent"
                className="en-mono"
                style={{ fontSize: "10px", color: "#57D8EE", paddingTop: "3px" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <b
                  data-t="title"
                  className="en-display"
                  style={{ display: "block", fontSize: "14.5px", color: "#fff", marginBottom: "3px" }}
                >
                  {c.title}
                </b>
                <span data-t="body" style={{ fontSize: "13.5px", color: "#9DB3C6", lineHeight: 1.6 }}>
                  {c.body}
                </span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section
        data-panel=""
        className="en-card en-rise"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: "clamp(16px,3vw,32px)",
          alignItems: "center",
          padding: "clamp(20px,3.4vw,30px)",
        }}
      >
        <div>
          <h2
            data-t="title"
            className="en-display"
            style={{ ...proseH2, fontSize: "clamp(18px,3.4vw,22px)" }}
          >
            See it against your own data
          </h2>
          <p data-t="body" style={{ ...proseP, margin: 0 }}>
            The quickest way to evaluate Enerceon is a demonstration mapped to your building and
            meter structure. Sales and pricing:{" "}
            <a href="mailto:sales@enerceon.com">sales@enerceon.com</a>. Deployment and integration:{" "}
            <a href="mailto:support@enerceon.com">support@enerceon.com</a>.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
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
            Request a demo <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/contact"
            data-chip=""
            className="en-chip-hover"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "14px 22px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,.16)",
              color: "#DCE8F2",
              fontWeight: 600,
              fontSize: "14.5px",
            }}
          >
            Contact
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
