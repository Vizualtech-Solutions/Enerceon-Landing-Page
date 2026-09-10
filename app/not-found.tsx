import type { Metadata } from "next";
import Link from "next/link";

// A real 404 with a genuine status code, so crawlers never treat a missing URL as
// a thin duplicate of the home page.
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100svh",
        background: "#040D19",
        color: "#E9F2F9",
        display: "grid",
        placeItems: "center",
        padding: "clamp(24px,6vw,64px)",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "560px" }}>
        <p
          className="en-mono"
          style={{
            fontSize: "11px",
            letterSpacing: "1.8px",
            textTransform: "uppercase",
            color: "#57D8EE",
            marginBottom: "14px",
          }}
        >
          Error 404
        </p>
        <h1
          className="en-display"
          style={{
            fontSize: "clamp(28px,6vw,44px)",
            lineHeight: 1.1,
            letterSpacing: "-.03em",
            fontWeight: 700,
            margin: "0 0 15px",
            color: "#fff",
          }}
        >
          That page isn&apos;t on the grid.
        </h1>
        <p
          style={{
            fontSize: "clamp(15px,3.2vw,17px)",
            lineHeight: 1.72,
            color: "#9DB3C6",
            margin: "0 0 clamp(22px,4vw,30px)",
          }}
        >
          The link may be out of date. Head back to the Enerceon overview to pick up where you left
          off.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "15px 26px",
            borderRadius: "999px",
            background: "linear-gradient(90deg,#007BFF,#00C8F5 55%,#2ECC71)",
            color: "#04121F",
            fontWeight: 600,
            fontSize: "15px",
          }}
        >
          Back to Enerceon <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}
