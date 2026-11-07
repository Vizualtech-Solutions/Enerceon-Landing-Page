import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import Footer from "./Footer";

/** Shared chrome for the standalone legal pages (privacy, terms), in the same
 *  graphite + gold theme as the landing page. Server-rendered. */
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
    <div className="en-root">
      <header className="en-page-header">
        <div className="en-wrap">
          <Link href="/" className="en-logo" aria-label="Enerceon home">
            <Image
              src="/assets/enerceon-wordmark-light.png"
              alt="ENERCEON"
              width={1405}
              height={170}
              priority
              sizes="156px"
            />
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <Link href="/" className="en-page-back">
              ← Home
            </Link>
            <Link href="/#contact" className="en-btn en-btn-gold en-btn-sm">
              Book a demo
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="en-page-hero">
          <div
            className="en-wrap"
            style={{
              display: "grid",
              gridTemplateColumns: aside ? "repeat(auto-fit,minmax(280px,1fr))" : "1fr",
              gap: "clamp(20px,4vw,44px)",
              alignItems: "end",
            }}
          >
            <div style={{ maxWidth: "720px" }}>
              <p className="en-eyebrow en-rise">{eyebrow}</p>
              <h1 className="en-rise" style={{ ["--d" as string]: "60ms" }}>
                {title}
              </h1>
              {intro && (
                <p className="en-rise" style={{ ["--d" as string]: "120ms" }}>
                  {intro}
                </p>
              )}
              {updated && (
                <p className="en-page-updated en-rise" style={{ ["--d" as string]: "170ms" }}>
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

        <div className="en-page-body">
          <div className="en-wrap en-prose">{children}</div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export const proseP: CSSProperties = {
  fontSize: "15px",
  lineHeight: 1.72,
  color: "#a1a1aa",
  margin: "0 0 12px",
};
