import { container } from "./styles";

const UTILITIES = ["Electricity", "Water", "Gas", "BTU / Cooling", "Virtual meters"];

export default function UtilityStrip() {
  return (
    <div
      data-tone="b"
      data-line=""
      style={{
        borderTop: "1px solid rgba(255,255,255,.07)",
        borderBottom: "1px solid rgba(255,255,255,.07)",
        background: "#061424",
      }}
    >
      <div
        style={{
          ...container,
          padding: "16px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <span
          data-t="dim"
          className="en-mono"
          style={{
            fontSize: "10.5px",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            color: "#5F788E",
          }}
        >
          Every utility on site
        </span>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {UTILITIES.map((utility) => (
            <span
              key={utility}
              data-chip=""
              style={{
                padding: "7px 13px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,.10)",
                fontSize: "12.5px",
                color: "#A9BFD2",
              }}
            >
              {utility}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
