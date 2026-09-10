import { container, eyebrow, reveal, sectionBody, sectionPad, sectionTitle } from "./styles";

const POINTS = [
  "Multi-site, multi-building structure for portfolios of any size.",
  "Floors, spaces, tenants and meters mapped to the physical estate.",
  "Virtual meters for calculated loads and shared services.",
];

const LEVELS = [
  {
    icon: "◱",
    tone: "cyan",
    iconColor: "#4FD5F0",
    iconBg: "rgba(0,200,245,.12)",
    name: "Site",
    detail: "23 locations across the portfolio",
    tag: "L1",
    indent: "0px",
  },
  {
    icon: "▤",
    tone: "cyan",
    iconColor: "#43C7EC",
    iconBg: "rgba(0,200,245,.12)",
    name: "Building",
    detail: "Asset-level totals and benchmarks",
    tag: "L2",
    indent: "clamp(0px,3vw,22px)",
  },
  {
    icon: "≡",
    tone: "teal",
    iconColor: "#2FC9BE",
    iconBg: "rgba(0,191,166,.14)",
    name: "Floor",
    detail: "Level-by-level comparison",
    tag: "L3",
    indent: "clamp(0px,6vw,44px)",
  },
  {
    icon: "▢",
    tone: "teal",
    iconColor: "#25C79E",
    iconBg: "rgba(0,191,166,.14)",
    name: "Space",
    detail: "Tenant units and operational areas",
    tag: "L4",
    indent: "clamp(0px,9vw,66px)",
  },
];

export default function Structure() {
  return (
    <section id="structure" data-tone="b" style={{ background: "#061424", padding: sectionPad }}>
      <div
        style={{
          ...container,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "clamp(30px,5vw,64px)",
          alignItems: "center",
        }}
      >
        <div className="en-reveal" style={reveal()}>
          <div data-t="mono" className="en-mono" style={eyebrow}>
            03 / A structured energy layer
          </div>
          <h2 data-t="title" className="en-display" style={sectionTitle}>
            Built around how your facilities are actually organised.
          </h2>
          <p data-t="body" style={{ ...sectionBody, maxWidth: "52ch" }}>
            Move from portfolio performance to a single meter without losing context. Categories,
            energy sources and virtual meters give flexible analysis without adding unnecessary
            hierarchy.
          </p>
          <div style={{ display: "grid", gap: "11px", marginTop: "24px" }}>
            {POINTS.map((point) => (
              <div
                key={point}
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start",
                  fontSize: "15px",
                }}
              >
                <span
                  data-t="pos"
                  style={{
                    flex: "0 0 20px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: "rgba(46,204,113,.15)",
                    color: "#2ECC71",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 700,
                    marginTop: "2px",
                  }}
                >
                  ✓
                </span>
                <span data-t="body" style={{ color: "#9DB3C6" }}>
                  {point}
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
            border: "1px solid rgba(255,255,255,.10)",
            borderRadius: "18px",
            background: "rgba(255,255,255,.03)",
            padding: "clamp(18px,4vw,30px)",
          }}
        >
          <div
            data-t="dim"
            className="en-mono"
            style={{
              fontSize: "10px",
              letterSpacing: "1.6px",
              textTransform: "uppercase",
              color: "#6F889E",
              marginBottom: "18px",
            }}
          >
            Site → meter hierarchy
          </div>
          <div style={{ display: "grid", gap: "9px" }}>
            {LEVELS.map((level) => (
              <div
                key={level.name}
                data-soft=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "13px",
                  padding: "13px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,.08)",
                  background: "rgba(255,255,255,.03)",
                  marginLeft: level.indent,
                }}
              >
                <span
                  data-icon={level.tone}
                  style={{
                    width: "36px",
                    height: "36px",
                    flex: "0 0 36px",
                    borderRadius: "10px",
                    background: level.iconBg,
                    color: level.iconColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                  }}
                >
                  {level.icon}
                </span>
                <span style={{ flex: 1 }}>
                  <b
                    data-t="title"
                    className="en-display"
                    style={{ display: "block", fontSize: "15px", color: "#fff" }}
                  >
                    {level.name}
                  </b>
                  <span data-t="dim" style={{ fontSize: "12.5px", color: "#8299AE" }}>
                    {level.detail}
                  </span>
                </span>
                <span
                  data-t="dim"
                  className="en-mono"
                  style={{ fontSize: "10px", color: "#5F788E" }}
                >
                  {level.tag}
                </span>
              </div>
            ))}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "13px",
                padding: "13px",
                borderRadius: "12px",
                border: "1px solid rgba(46,204,113,.32)",
                background: "linear-gradient(90deg,rgba(46,204,113,.12),transparent)",
                marginLeft: "clamp(0px,12vw,88px)",
              }}
            >
              <span
                data-icon="green"
                style={{
                  width: "36px",
                  height: "36px",
                  flex: "0 0 36px",
                  borderRadius: "10px",
                  background: "rgba(46,204,113,.16)",
                  color: "#2ECC71",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                }}
              >
                ◎
              </span>
              <span style={{ flex: 1 }}>
                <b
                  data-t="title"
                  className="en-display"
                  style={{ display: "block", fontSize: "15px", color: "#fff" }}
                >
                  Meter
                </b>
                <span data-t="dim" style={{ fontSize: "12.5px", color: "#8299AE" }}>
                  1,245 physical and virtual sources
                </span>
              </span>
              <span data-t="pos" className="en-mono" style={{ fontSize: "10px", color: "#2ECC71" }}>
                LIVE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
