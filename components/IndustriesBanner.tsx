import { container, reveal } from "./styles";

const SEGMENTS = [
  "Commercial & offices",
  "Malls & mixed use",
  "Hotels & campuses",
  "Data centers & industry",
  "Residential",
];

export default function IndustriesBanner() {
  return (
    <section data-tone="a" style={{ background: "#040D19", padding: "0 0 clamp(58px,10vw,104px)" }}>
      <div style={container}>
        <div
          className="en-reveal"
          data-parallax-bg="18"
          style={{
            ...reveal(),
            minHeight: "clamp(340px,50vw,460px)",
            borderRadius: "20px",
            overflow: "hidden",
            display: "flex",
            alignItems: "flex-end",
            padding: "clamp(22px,5vw,54px)",
            backgroundImage:
              "linear-gradient(180deg,rgba(4,13,25,.30) 0%,rgba(4,13,25,.86) 60%,rgba(4,13,25,.95)),url('/assets/energy-campus.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center 50%",
          }}
        >
          <div style={{ maxWidth: "620px", color: "#fff" }}>
            <div
              className="en-mono"
              style={{
                fontSize: "11px",
                letterSpacing: "1.8px",
                textTransform: "uppercase",
                color: "#66E0EF",
                marginBottom: "13px",
              }}
            >
              Designed for modern facilities
            </div>
            <h2
              className="en-display"
              style={{
                fontSize: "clamp(25px,5.4vw,40px)",
                lineHeight: 1.1,
                letterSpacing: "-.03em",
                fontWeight: 700,
                margin: "0 0 13px",
                color: "#fff",
                textWrap: "balance",
              }}
            >
              One energy view across buildings, portfolios and industries.
            </h2>
            <p
              style={{
                fontSize: "clamp(14.5px,3.2vw,16.5px)",
                lineHeight: 1.72,
                color: "#BFD2E1",
                margin: 0,
                textWrap: "pretty",
              }}
            >
              From a single commercial building to a multi-site estate, without losing the detail that
              matters.
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "20px" }}>
              {SEGMENTS.map((segment) => (
                <span
                  key={segment}
                  style={{
                    fontSize: "12.5px",
                    padding: "8px 13px",
                    border: "1px solid rgba(255,255,255,.20)",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,.10)",
                    color: "#fff",
                  }}
                >
                  {segment}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
