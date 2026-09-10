import type { CSSProperties } from "react";
import { container, eyebrow, reveal, sectionBody, sectionPad, sectionTitle } from "./styles";

const card: CSSProperties = {
  border: "1px solid rgba(255,255,255,.09)",
  borderRadius: "16px",
  padding: "22px",
  background: "rgba(255,255,255,.03)",
};

const cardHead: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "12px",
};

const iconBox: CSSProperties = {
  width: "38px",
  height: "38px",
  borderRadius: "11px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "17px",
};

const cardBody: CSSProperties = {
  margin: 0,
  fontSize: "14px",
  lineHeight: 1.6,
  color: "#93AABE",
};

const unitLine: CSSProperties = {
  marginTop: "11px",
  fontSize: "10.5px",
  color: "#6F889E",
};

const barsWrap: CSSProperties = {
  display: "flex",
  alignItems: "flex-end",
  gap: "4px",
  height: "32px",
  marginTop: "14px",
};

const flowTrack: CSSProperties = {
  height: "32px",
  marginTop: "14px",
  position: "relative",
  overflow: "hidden",
  borderRadius: "4px",
  background: "rgba(255,255,255,.05)",
};

function Bars({ heights, gradient, delays }: { heights: string[]; gradient: string; delays: number[] }) {
  return (
    <div style={barsWrap}>
      {heights.map((height, i) => (
        <i
          key={i}
          style={{
            flex: 1,
            height,
            borderRadius: "2px",
            background: gradient,
            transformOrigin: "bottom",
            animation: `en-rise 1.4s ease-out ${delays[i]}s both`,
          }}
        />
      ))}
    </div>
  );
}

function Flow({ width, color, duration }: { width: string; color: string; duration: string }) {
  return (
    <div data-soft="" style={flowTrack}>
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width,
          background: `linear-gradient(90deg,transparent,${color},transparent)`,
          animation: `en-flow ${duration} linear infinite`,
        }}
      />
    </div>
  );
}

export default function Utilities() {
  return (
    <section id="utilities" data-tone="b" style={{ background: "#061424", padding: sectionPad }}>
      <div style={container}>
        <div
          className="en-reveal"
          style={{ ...reveal(), maxWidth: "700px", marginBottom: "clamp(24px,5vw,44px)" }}
        >
          <div data-t="mono" className="en-mono" style={eyebrow}>
            05 / Multi-utility by design
          </div>
          <h2
            data-t="title"
            className="en-display"
            style={{ ...sectionTitle, textWrap: "wrap" }}
          >
            Energy is more than electricity.
          </h2>
          <p data-t="body" style={sectionBody}>
            One consistent interface for every resource your sites consume, with each utility&apos;s own
            measurements intact.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
            gap: "13px",
          }}
        >
          <div className="en-reveal" data-panel="" style={{ ...reveal(20, 0.7), ...card }}>
            <div style={cardHead}>
              <span data-icon="cyan" style={{ ...iconBox, background: "rgba(0,200,245,.12)" }}>
                ⚡
              </span>
              <b data-t="title" className="en-display" style={{ fontSize: "17px", color: "#fff" }}>
                Electricity
              </b>
            </div>
            <p data-t="body" style={cardBody}>
              Energy, demand, voltage and current across incomers, panels, tenants and major loads.
            </p>
            <Bars
              heights={["45%", "72%", "56%", "90%", "62%"]}
              gradient="linear-gradient(180deg,#00C8F5,#007BFF)"
              delays={[0, 0.08, 0.16, 0.24, 0.32]}
            />
            <div data-t="dim" className="en-mono" style={unitLine}>
              kWh · kW · V · A
            </div>
          </div>

          <div className="en-reveal" data-panel="" style={{ ...reveal(20, 0.7, 0.07), ...card }}>
            <div style={cardHead}>
              <span data-icon="cyan" style={{ ...iconBox, background: "rgba(0,200,245,.12)" }}>
                💧
              </span>
              <b data-t="title" className="en-display" style={{ fontSize: "17px", color: "#fff" }}>
                Water
              </b>
            </div>
            <p data-t="body" style={cardBody}>
              Consumption and flow across mains, tenants, domestic services and irrigation.
            </p>
            <Flow width="25%" color="rgba(0,168,216,.55)" duration="3.2s" />
            <div data-t="dim" className="en-mono" style={unitLine}>
              volume · flow rate
            </div>
          </div>

          <div className="en-reveal" data-panel="" style={{ ...reveal(20, 0.7, 0.14), ...card }}>
            <div style={cardHead}>
              <span
                data-icon="green"
                style={{ ...iconBox, background: "rgba(46,204,113,.12)", color: "#2ECC71" }}
              >
                ◉
              </span>
              <b data-t="title" className="en-display" style={{ fontSize: "17px", color: "#fff" }}>
                Gas
              </b>
            </div>
            <p data-t="body" style={cardBody}>
              Gas use by source, process, boiler, kitchen, tenant or operational category.
            </p>
            <Flow width="18%" color="rgba(0,191,166,.55)" duration="4.4s" />
            <div data-t="dim" className="en-mono" style={unitLine}>
              volume · flow rate
            </div>
          </div>

          <div className="en-reveal" data-panel="" style={{ ...reveal(20, 0.7, 0.21), ...card }}>
            <div style={cardHead}>
              <span
                data-icon="green"
                style={{ ...iconBox, background: "rgba(46,204,113,.12)", color: "#4FE0A8" }}
              >
                ❄
              </span>
              <b data-t="title" className="en-display" style={{ fontSize: "17px", color: "#fff" }}>
                BTU / Cooling
              </b>
            </div>
            <p data-t="body" style={cardBody}>
              Chilled-water and cooling energy across plants, AHUs, FCUs and common areas.
            </p>
            <Bars
              heights={["60%", "38%", "84%", "52%", "70%"]}
              gradient="linear-gradient(180deg,#2ECC71,#00BFA6)"
              delays={[0.05, 0.13, 0.21, 0.29, 0.37]}
            />
            <div data-t="dim" className="en-mono" style={unitLine}>
              cooling energy
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
