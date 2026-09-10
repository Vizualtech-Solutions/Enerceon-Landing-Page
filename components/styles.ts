import type { CSSProperties } from "react";

export const container: CSSProperties = {
  width: "min(1280px, 100% - 32px)",
  margin: "0 auto",
};

export const sectionPad = "clamp(58px,10vw,116px) 0";

export const eyebrow: CSSProperties = {
  fontSize: "11px",
  letterSpacing: "1.8px",
  textTransform: "uppercase",
  color: "#57D8EE",
  marginBottom: "14px",
};

export const sectionTitle: CSSProperties = {
  fontSize: "clamp(27px,5.6vw,42px)",
  lineHeight: 1.1,
  letterSpacing: "-.03em",
  fontWeight: 700,
  margin: "0 0 15px",
  color: "#fff",
  textWrap: "balance",
};

export const sectionBody: CSSProperties = {
  fontSize: "clamp(15px,3.2vw,17px)",
  lineHeight: 1.72,
  color: "#9DB3C6",
  margin: 0,
  textWrap: "pretty",
};

export const panel: CSSProperties = {
  border: "1px solid rgba(255,255,255,.10)",
  borderRadius: "18px",
  background: "rgba(255,255,255,.03)",
};

export const consoleCard: CSSProperties = {
  background: "rgba(255,255,255,.035)",
  border: "1px solid rgba(255,255,255,.07)",
  borderRadius: "12px",
  padding: "14px",
};

export const pillCta: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  padding: "15px 26px",
  borderRadius: "999px",
  background: "linear-gradient(90deg,#007BFF,#00C8F5 55%,#2ECC71)",
  color: "#04121F",
  fontWeight: 600,
  fontSize: "15px",
};

/** Per-element tuning for the shared `.en-reveal` transition. */
export function reveal(y = 24, dur = 0.8, delay = 0): CSSProperties {
  return {
    ["--reveal-y" as string]: `${y}px`,
    ["--reveal-dur" as string]: `${dur}s`,
    ["--reveal-delay" as string]: `${delay}s`,
  } as CSSProperties;
}
