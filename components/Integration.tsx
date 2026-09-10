import type { CSSProperties } from "react";
import { container, eyebrow, reveal, sectionBody, sectionPad, sectionTitle } from "./styles";

const PILLARS = [
  {
    title: "On-premise first",
    body: "Application and data stay inside the customer environment.",
  },
  { title: "Browser access", body: "Authorised users open Enerceon — no client to install." },
  {
    title: "Source-independent",
    body: "Dashboards separated from acquisition, so integrations can evolve.",
  },
  { title: "Role-aware access", body: "Facility teams see the estate; tenants see assigned meters." },
];

const SOURCES = [
  { label: "Niagara / BMS", delay: "0s" },
  { label: "Metering systems", delay: ".5s" },
  { label: "Modbus · APIs · SQL", delay: "1s" },
];

const OUTPUTS = ["Live & historical views", "Analytics & comparison", "Reports & user access"];

const sourceRow: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "14px",
  border: "1px solid rgba(255,255,255,.10)",
  borderRadius: "12px",
  background: "rgba(255,255,255,.04)",
  fontSize: "13px",
};

const connector: CSSProperties = {
  height: "42px",
  position: "relative",
  overflow: "hidden",
  margin: "6px 0",
};

export default function Integration() {
  return (
    <section
      id="integration"
      data-tone="a"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#040D19",
        padding: sectionPad,
      }}
    >
      <div
        data-orb=""
        data-parallax="0.10"
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          left: "-280px",
          top: "-300px",
          background: "radial-gradient(circle,rgba(0,200,245,.12),transparent 65%)",
          pointerEvents: "none",
          willChange: "transform",
        }}
      />
      <div
        style={{
          ...container,
          position: "relative",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "clamp(30px,5vw,64px)",
          alignItems: "center",
        }}
      >
        <div className="en-reveal" style={reveal()}>
          <div data-t="mono" className="en-mono" style={eyebrow}>
            06 / Works with your infrastructure
          </div>
          <h2 data-t="title" className="en-display" style={sectionTitle}>
            An energy layer above the stack you already run.
          </h2>
          <p data-t="body" style={{ ...sectionBody, maxWidth: "54ch" }}>
            Bring building systems and metering sources into one SQL-backed model, then let dashboards
            and analytics work from a single clean source of truth.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
              gap: "11px",
              marginTop: "26px",
            }}
          >
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                data-panel=""
                style={{
                  padding: "16px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,.10)",
                  background: "rgba(255,255,255,.04)",
                }}
              >
                <b
                  data-t="title"
                  className="en-display"
                  style={{
                    display: "block",
                    color: "#fff",
                    fontSize: "14px",
                    marginBottom: "5px",
                  }}
                >
                  {pillar.title}
                </b>
                <span data-t="body" style={{ fontSize: "13.5px", color: "#93AABE" }}>
                  {pillar.body}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="en-reveal"
          data-panel=""
          style={{
            ...reveal(24, 0.8, 0.1),
            position: "relative",
            border: "1px solid rgba(255,255,255,.10)",
            borderRadius: "18px",
            padding: "clamp(16px,3.4vw,26px)",
            background: "rgba(255,255,255,.03)",
          }}
        >
          <div style={{ display: "grid", gap: "9px" }}>
            {SOURCES.map((source) => (
              <div key={source.label} data-soft="" style={sourceRow}>
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#00C8F5",
                    animation: `en-pulse 2s ease-in-out ${source.delay} infinite`,
                  }}
                />
                <span data-t="body" style={{ color: "#C3D3E1" }}>
                  {source.label}
                </span>
              </div>
            ))}
          </div>

          <div style={connector}>
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: "1px",
                background:
                  "linear-gradient(180deg,rgba(0,200,245,.1),rgba(0,200,245,.6),rgba(46,204,113,.2))",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "calc(50% - 3px)",
                top: 0,
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#00C8F5",
                boxShadow: "0 0 10px #00C8F5",
                animation: "en-drop 2.2s linear infinite",
              }}
            />
          </div>

          <div
            data-app=""
            style={{
              padding: "22px 16px",
              background: "linear-gradient(150deg,rgba(0,123,255,.24),rgba(0,191,166,.16))",
              border: "1px solid rgba(76,213,225,.32)",
              borderRadius: "16px",
              textAlign: "center",
            }}
          >
            <b
              className="en-display"
              style={{
                display: "block",
                fontSize: "15px",
                letterSpacing: "1.6px",
                color: "#fff",
              }}
            >
              ENERCEON
            </b>
            <span style={{ display: "block", fontSize: "11px", color: "#A6C6D8", marginTop: "5px" }}>
              Ingestion &amp; energy data layer
            </span>
          </div>

          <div style={connector}>
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: "1px",
                background: "linear-gradient(180deg,rgba(46,204,113,.5),rgba(46,204,113,.15))",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "calc(50% - 3px)",
                top: 0,
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#2ECC71",
                boxShadow: "0 0 10px #2ECC71",
                animation: "en-drop 2.2s linear .6s infinite",
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
              gap: "9px",
            }}
          >
            {OUTPUTS.map((output) => (
              <div
                key={output}
                data-soft=""
                style={{
                  padding: "14px",
                  border: "1px solid rgba(255,255,255,.10)",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,.04)",
                  fontSize: "12.5px",
                }}
              >
                <span data-t="body" style={{ color: "#C3D3E1" }}>
                  {output}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
