"use client";

import type { CSSProperties } from "react";
import { QUOTES } from "@/lib/content";
import { container, eyebrow, reveal, sectionBody, sectionPad, sectionTitle } from "./styles";

const STATS = [
  {
    value: "-14%",
    tone: "green",
    color: "#2ECC71",
    body: "after-hours consumption in the first quarter of monitoring.",
    delay: 0,
  },
  {
    value: "3 days → 20 min",
    tone: "cyan",
    color: "#00C8F5",
    body: "to compile the monthly tenant consumption pack.",
    delay: 0.07,
  },
  {
    value: "1,245",
    tone: "blue",
    color: "#3B9BFF",
    body: "meters under one hierarchy, across 23 sites.",
    delay: 0.14,
  },
];

const statCard: CSSProperties = {
  border: "1px solid rgba(255,255,255,.09)",
  borderRadius: "16px",
  background: "rgba(255,255,255,.03)",
  padding: "22px",
};

type Props = {
  quote: number;
  projectName: string;
  onPickQuote: (index: number) => void;
};

export default function Voices({ quote, projectName, onPickQuote }: Props) {
  const active = QUOTES[quote];

  return (
    <section id="voices" data-tone="b" style={{ background: "#061424", padding: sectionPad }}>
      <div style={container}>
        <div
          className="en-reveal"
          style={{ ...reveal(), maxWidth: "700px", marginBottom: "clamp(24px,5vw,44px)" }}
        >
          <div data-t="mono" className="en-mono" style={eyebrow}>
            08 / Voices from the field
          </div>
          <h2 data-t="title" className="en-display" style={sectionTitle}>
            What the teams running buildings say.
          </h2>
          <p data-t="body" style={sectionBody}>
            Placeholder quotes — send us the real ones and we&apos;ll drop them straight in.
          </p>
        </div>

        <div
          className="en-reveal"
          data-quote=""
          style={{
            ...reveal(),
            border: "1px solid rgba(255,255,255,.10)",
            borderRadius: "20px",
            background: "linear-gradient(150deg,rgba(0,200,245,.08),rgba(46,204,113,.03))",
            padding: "clamp(24px,5vw,48px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden="true"
            className="en-display"
            style={{
              position: "absolute",
              right: "clamp(-10px,2vw,24px)",
              top: "-18px",
              fontSize: "clamp(120px,22vw,200px)",
              lineHeight: 1,
              color: "rgba(0,200,245,.08)",
            }}
          >
            ”
          </div>

          <a
            data-t="accent"
            href="#projects"
            className="en-mono"
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "10.5px",
              letterSpacing: "1.4px",
              textTransform: "uppercase",
              color: "#57D8EE",
              marginBottom: "14px",
            }}
          >
            Project · {projectName} ↗
          </a>

          <blockquote
            data-t="title"
            className="en-display"
            style={{
              position: "relative",
              margin: 0,
              fontSize: "clamp(19px,4vw,30px)",
              lineHeight: 1.35,
              letterSpacing: "-.02em",
              color: "#fff",
              maxWidth: "24ch",
              minHeight: "clamp(112px,17vw,150px)",
              textWrap: "pretty",
            }}
          >
            {active.text}
          </blockquote>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              marginTop: "clamp(20px,4vw,32px)",
              flexWrap: "wrap",
            }}
          >
            <div
              className="en-display"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "linear-gradient(140deg,#007BFF,#00C8F5,#2ECC71)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                color: "#04121F",
                fontSize: "15px",
              }}
            >
              {active.initials}
            </div>
            <div style={{ flex: 1, minWidth: "180px" }}>
              <b
                data-t="title"
                className="en-display"
                style={{ display: "block", fontSize: "15px", color: "#fff" }}
              >
                {active.name}
              </b>
              <span data-t="dim" style={{ fontSize: "13px", color: "#8299AE" }}>
                {active.role}
              </span>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {QUOTES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onPickQuote(i)}
                  aria-label={`Quote ${i + 1}`}
                  aria-pressed={quote === i}
                  className={`en-dot${quote === i ? " is-active" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: "13px",
            marginTop: "13px",
          }}
        >
          {STATS.map((stat) => (
            <div
              key={stat.value}
              className="en-reveal"
              data-panel=""
              style={{ ...reveal(20, 0.7, stat.delay), ...statCard }}
            >
              <div
                data-stat={stat.tone}
                className="en-display"
                style={{
                  fontSize: "clamp(24px,4.5vw,30px)",
                  fontWeight: 600,
                  color: stat.color,
                }}
              >
                {stat.value}
              </div>
              <div
                data-t="body"
                style={{ fontSize: "14px", color: "#93AABE", marginTop: "6px" }}
              >
                {stat.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
