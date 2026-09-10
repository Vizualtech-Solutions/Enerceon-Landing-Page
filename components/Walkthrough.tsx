"use client";

import { STEPS } from "@/lib/content";
import { container, eyebrow, reveal, sectionBody, sectionPad, sectionTitle } from "./styles";

const STEP_SUMMARIES = [
  "23 sites, 1,245 meters and today's totals in one glance.",
  "Site → building → floor → space → meter, context intact.",
  "Monthly limits drawn straight onto the consumption chart.",
  "Ready-to-send performance reports for tenants and management.",
];

const STEP_TITLES = [
  "Portfolio overview",
  "Drill to a meter",
  "Compare to threshold",
  "Report & share",
];

type Props = {
  step: number;
  progress: number;
  onPickStep: (index: number) => void;
};

export default function Walkthrough({ step, progress, onPickStep }: Props) {
  const active = STEPS[step];

  return (
    <section id="console" data-tone="a" style={{ background: "#040D19", padding: sectionPad }}>
      <div style={container}>
        <div className="en-reveal" style={{ ...reveal(), maxWidth: "760px" }}>
          <div data-t="mono" className="en-mono" style={eyebrow}>
            01 / A guided walkthrough
          </div>
          <h2
            data-t="title"
            className="en-display"
            style={{ ...sectionTitle, fontSize: "clamp(27px,5.6vw,44px)", lineHeight: 1.08 }}
          >
            Watch a facility explain itself.
          </h2>
          <p data-t="body" style={sectionBody}>
            Four steps on a loop — the path an operator takes each morning. Tap any step to jump.
          </p>
        </div>

        <div
          style={{
            marginTop: "clamp(26px,5vw,46px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "clamp(18px,3.5vw,34px)",
            alignItems: "start",
          }}
        >
          <div style={{ display: "grid", gap: "10px" }}>
            {STEP_TITLES.map((title, i) => (
              <button
                key={title}
                type="button"
                onClick={() => onPickStep(i)}
                aria-pressed={step === i}
                className={`en-step${step === i ? " is-active" : ""}`}
              >
                <span data-t="accent" className="en-mono" style={{ fontSize: "10.5px", color: "#57D8EE" }}>
                  STEP {String(i + 1).padStart(2, "0")}
                </span>
                <b
                  data-t="title"
                  className="en-display"
                  style={{ display: "block", fontSize: "16px", color: "#fff", margin: "5px 0 4px" }}
                >
                  {title}
                </b>
                <span data-t="body" style={{ fontSize: "13.5px", color: "#93AABE" }}>
                  {STEP_SUMMARIES[i]}
                </span>
              </button>
            ))}
          </div>

          <div
            data-panel=""
            style={{
              border: "1px solid rgba(255,255,255,.10)",
              borderRadius: "18px",
              background: "linear-gradient(160deg,rgba(0,200,245,.07),rgba(46,204,113,.03))",
              padding: "clamp(14px,3vw,22px)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
                flexWrap: "wrap",
                marginBottom: "12px",
              }}
            >
              <span
                data-t="dim"
                className="en-mono"
                style={{ fontSize: "10px", letterSpacing: "1.3px", color: "#6F889E" }}
              >
                {active.crumb}
              </span>
              <span data-t="pos" className="en-mono" style={{ fontSize: "10px", color: "#2ECC71" }}>
                ● {active.status}
              </span>
            </div>

            <div
              data-soft=""
              style={{
                height: "3px",
                borderRadius: "2px",
                background: "rgba(255,255,255,.08)",
                overflow: "hidden",
                marginBottom: "16px",
              }}
            >
              <i
                style={{
                  display: "block",
                  height: "100%",
                  width: `${progress}%`,
                  background: "linear-gradient(90deg,#007BFF,#00C8F5,#2ECC71)",
                  transition: "width .35s linear",
                }}
              />
            </div>

            <div
              data-t="title"
              className="en-display"
              style={{
                fontSize: "clamp(17px,3.6vw,21px)",
                fontWeight: 600,
                color: "#fff",
                marginBottom: "6px",
              }}
            >
              {active.headline}
            </div>
            <p
              data-t="body"
              style={{
                margin: "0 0 16px",
                fontSize: "14.5px",
                lineHeight: 1.65,
                color: "#93AABE",
              }}
            >
              {active.body}
            </p>

            <div
              data-app=""
              style={{
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,.09)",
                background: "#07162A",
                overflow: "hidden",
              }}
            >
              <div
                className="en-mono"
                style={{
                  height: "34px",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 12px",
                  background: "rgba(255,255,255,.03)",
                  borderBottom: "1px solid rgba(255,255,255,.06)",
                  fontSize: "9.5px",
                  color: "#5F788E",
                }}
              >
                {active.screen}
              </div>
              <div style={{ padding: "16px", display: "grid", gap: "12px" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(92px,1fr))",
                    gap: "8px",
                  }}
                >
                  {active.metrics.map(([label, value]) => (
                    <div
                      key={label}
                      style={{
                        border: "1px solid rgba(255,255,255,.07)",
                        borderRadius: "9px",
                        padding: "10px",
                        background: "rgba(255,255,255,.03)",
                      }}
                    >
                      <div className="en-mono" style={{ fontSize: "8.5px", color: "#6E8599" }}>
                        {label}
                      </div>
                      <div
                        className="en-display"
                        style={{ fontSize: "15px", color: "#fff", marginTop: "4px" }}
                      >
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    height: "clamp(118px,24vw,150px)",
                    borderRadius: "9px",
                    border: "1px solid rgba(255,255,255,.07)",
                    background: "rgba(255,255,255,.02)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <svg
                    viewBox="0 0 500 150"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                  >
                    <path
                      d={active.p1}
                      fill="none"
                      stroke="#00C8F5"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      style={{ transition: "d 1.1s cubic-bezier(.4,0,.2,1)" }}
                    />
                    <path
                      d={active.p2}
                      fill="none"
                      stroke="#2ECC71"
                      strokeWidth="1.8"
                      opacity=".8"
                      style={{ transition: "d 1.1s cubic-bezier(.4,0,.2,1)" }}
                    />
                  </svg>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(90deg,transparent,rgba(0,200,245,.09),transparent)",
                      width: "32%",
                      animation: "en-sweep 6s linear infinite",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
