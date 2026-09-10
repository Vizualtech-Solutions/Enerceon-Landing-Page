import { CAPABILITIES } from "@/lib/content";
import { container, eyebrow, reveal, sectionBody, sectionPad, sectionTitle } from "./styles";

const DELAYS = [0, 0.05, 0.1, 0.15, 0.2, 0.05, 0.1, 0.15, 0.2, 0.25];

export default function Capabilities() {
  return (
    <section id="capabilities" data-tone="a" style={{ background: "#040D19", padding: sectionPad }}>
      <div style={container}>
        <div
          className="en-reveal"
          style={{ ...reveal(), maxWidth: "720px", marginBottom: "clamp(26px,5vw,46px)" }}
        >
          <div data-t="mono" className="en-mono" style={eyebrow}>
            04 / Ten capabilities
          </div>
          <h2 data-t="title" className="en-display" style={sectionTitle}>
            Answers to the questions facility teams ask every day.
          </h2>
          <p data-t="body" style={sectionBody}>
            Designed around operational decisions — not dashboards for dashboards&apos; sake.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "0 clamp(24px,5vw,64px)",
          }}
        >
          {CAPABILITIES.map((capability, i) => (
            <div
              key={capability.title}
              className="en-reveal"
              data-line=""
              style={{
                ...reveal(18, 0.6, DELAYS[i]),
                display: "grid",
                gridTemplateColumns: "42px 1fr",
                gap: "14px",
                padding: "20px 0",
                borderTop: "1px solid rgba(255,255,255,.09)",
                ...(i === CAPABILITIES.length - 1
                  ? { borderBottom: "1px solid rgba(255,255,255,.09)" }
                  : null),
              }}
            >
              <span
                data-t="accent"
                className="en-mono"
                style={{ fontSize: "12px", color: "#57D8EE", paddingTop: "3px" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <b
                  data-t="title"
                  className="en-display"
                  style={{
                    display: "block",
                    fontSize: "17px",
                    color: "#fff",
                    marginBottom: "4px",
                  }}
                >
                  {capability.title}
                </b>
                <span data-t="body" style={{ fontSize: "14.5px", color: "#93AABE" }}>
                  {capability.body}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
