import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import Footer from "./Footer";
import { container } from "./styles";

/** Shared chrome for the standalone pages (about, privacy, terms, contact).
 *  Server-rendered: no theme toggle here, but the pre-paint script in the root
 *  layout still applies the visitor's stored theme, so light mode carries over. */
export default function PageShell({
  eyebrow,
  title,
  intro,
  updated,
  aside,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  updated?: string;
  /** Optional content pinned beside the heading on wide screens. */
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="en-root" style={{ background: "#040D19", color: "#E9F2F9", lineHeight: 1.6 }}>
      <header
        data-tone="bar"
        data-line=""
        style={{
          position: "sticky",
          top: 0,
          zIndex: 80,
          background: "rgba(4,13,25,.86)",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(255,255,255,.07)",
        }}
      >
        <div
          style={{
            ...container,
            minHeight: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <Image
              data-logo=""
              src="/assets/enerceon-wordmark.png"
              alt="ENERCEON"
              width={1405}
              height={170}
              priority
              sizes="164px"
              style={{
                display: "block",
                width: "clamp(122px,25vw,164px)",
                height: "auto",
                filter: "brightness(0) invert(1)",
              }}
            />
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link
              href="/"
              data-t="nav"
              className="en-navlink en-mono"
              style={{
                color: "#6A8299",
                fontSize: "11px",
                letterSpacing: "1.4px",
                textTransform: "uppercase",
              }}
            >
              ← Home
            </Link>
            <Link
              href="/#contact"
              className="en-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "11px clamp(14px,3vw,22px)",
                borderRadius: "999px",
                background: "linear-gradient(90deg,#007BFF,#00C8F5 55%,#2ECC71)",
                color: "#04121F",
                fontWeight: 600,
                fontSize: "13.5px",
                whiteSpace: "nowrap",
              }}
            >
              Request a demo
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero band — same grid + glow language as the home page. */}
        <section
          data-tone="a"
          style={{
            position: "relative",
            overflow: "hidden",
            background: "#040D19",
            borderBottom: "1px solid rgba(255,255,255,.07)",
          }}
        >
          <div
            data-grid=""
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "-20% 0",
              backgroundImage:
                "linear-gradient(rgba(120,170,210,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(120,170,210,.06) 1px,transparent 1px)",
              backgroundSize: "72px 72px",
              maskImage: "radial-gradient(760px 420px at 20% 0%,#000,transparent 76%)",
              WebkitMaskImage: "radial-gradient(760px 420px at 20% 0%,#000,transparent 76%)",
            }}
          />
          <div
            data-glow=""
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(820px 420px at 4% -30%,rgba(0,123,255,.20),transparent 62%),radial-gradient(620px 380px at 96% 0%,rgba(46,204,113,.10),transparent 64%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              ...container,
              position: "relative",
              padding: "clamp(38px,7vw,74px) 0 clamp(30px,5vw,52px)",
              display: "grid",
              gridTemplateColumns: aside ? "repeat(auto-fit,minmax(280px,1fr))" : "1fr",
              gap: "clamp(20px,4vw,44px)",
              alignItems: "end",
            }}
          >
            <div style={{ maxWidth: "720px" }}>
              <p
                data-t="mono"
                className="en-mono en-rise"
                style={{
                  fontSize: "11px",
                  letterSpacing: "1.8px",
                  textTransform: "uppercase",
                  color: "#57D8EE",
                  margin: "0 0 14px",
                }}
              >
                {eyebrow}
              </p>
              <h1
                data-t="title"
                className="en-display en-rise"
                style={{
                  fontSize: "clamp(30px,6.2vw,50px)",
                  lineHeight: 1.06,
                  letterSpacing: "-.032em",
                  fontWeight: 700,
                  margin: "0 0 16px",
                  color: "#fff",
                  textWrap: "balance",
                  ["--d" as string]: "60ms",
                }}
              >
                {title}
              </h1>
              {intro && (
                <p
                  data-t="body"
                  className="en-rise"
                  style={{
                    fontSize: "clamp(15px,3.2vw,18px)",
                    lineHeight: 1.7,
                    color: "#9DB3C6",
                    margin: 0,
                    textWrap: "pretty",
                    ["--d" as string]: "120ms",
                  }}
                >
                  {intro}
                </p>
              )}
              {updated && (
                <p
                  data-t="dim"
                  className="en-mono en-rise"
                  style={{
                    fontSize: "10.5px",
                    letterSpacing: "1.2px",
                    color: "#6F889E",
                    margin: "14px 0 0",
                    ["--d" as string]: "170ms",
                  }}
                >
                  LAST UPDATED {updated.toUpperCase()}
                </p>
              )}
            </div>
            {aside && (
              <div className="en-rise" style={{ ["--d" as string]: "200ms" }}>
                {aside}
              </div>
            )}
          </div>
        </section>

        <div
          style={{ ...container, padding: "clamp(28px,5vw,54px) 0 clamp(44px,8vw,88px)" }}
          className="en-prose"
        >
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export const proseH2: CSSProperties = {
  fontSize: "clamp(19px,4vw,24px)",
  lineHeight: 1.25,
  letterSpacing: "-.02em",
  fontWeight: 700,
  color: "#fff",
  margin: "0 0 12px",
};

export const proseP: CSSProperties = {
  fontSize: "15px",
  lineHeight: 1.72,
  color: "#9DB3C6",
  margin: "0 0 12px",
};
