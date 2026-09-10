"use client";

import { useState } from "react";
import Image from "next/image";
import { NAV_LINKS } from "@/lib/content";
import { container } from "./styles";

export default function Header({ onToggleTheme }: { onToggleTheme: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
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
        transition: "background .5s ease",
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
        <a href="#top" style={{ display: "flex", alignItems: "center", flex: "0 0 auto" }}>
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
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Switch theme"
            data-chip=""
            className="en-chip-hover"
            style={{
              cursor: "pointer",
              width: "40px",
              height: "40px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,.14)",
              background: "rgba(255,255,255,.05)",
              color: "#BFF1FF",
              fontSize: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span className="en-theme-sun" aria-hidden="true">
              ☀
            </span>
            <span className="en-theme-moon" aria-hidden="true">
              ☾
            </span>
          </button>
          <a
            href="#contact"
            className="en-cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "11px clamp(14px,3vw,22px)",
              borderRadius: "999px",
              background: "linear-gradient(90deg,#007BFF,#00C8F5 55%,#2ECC71)",
              color: "#04121F",
              fontWeight: 600,
              fontSize: "13.5px",
              whiteSpace: "nowrap",
            }}
          >
            <span className="en-cta-full">Request a demo</span>
            <span className="en-cta-short">Demo</span>
          </a>
          <button
            type="button"
            className="en-menu-btn en-chip-hover"
            data-chip=""
            aria-label={menuOpen ? "Close sections menu" : "Open sections menu"}
            aria-expanded={menuOpen}
            aria-controls="en-section-menu"
            onClick={() => setMenuOpen((open) => !open)}
            style={{
              cursor: "pointer",
              width: "40px",
              height: "40px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,.14)",
              background: "rgba(255,255,255,.05)",
              color: "#BFF1FF",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <i className={`en-burger${menuOpen ? " is-open" : ""}`} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Wide screens: the full section index, wrapping to a second row rather than
          scrolling sideways, so every link stays reachable without a swipe. */}
      <nav className="en-rail" aria-label="Page sections" data-line="">
        <div
          className="en-mono en-rail-list"
          style={{
            ...container,
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(12px,2.6vw,30px)",
            padding: "11px 0",
            fontSize: "11px",
            letterSpacing: "1.4px",
            textTransform: "uppercase",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              data-t="nav"
              className="en-navlink"
              href={link.href}
              style={{ color: "#6A8299", whiteSpace: "nowrap" }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Narrow screens: the same index as a disclosure panel, two per row. */}
      <nav
        id="en-section-menu"
        className={`en-menu-panel${menuOpen ? " is-open" : ""}`}
        aria-label="Page sections"
        data-line=""
        hidden={!menuOpen}
      >
        <div
          className="en-mono"
          style={{
            ...container,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
            gap: "4px",
            padding: "10px 0 16px",
            fontSize: "11px",
            letterSpacing: "1.4px",
            textTransform: "uppercase",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              data-t="nav"
              className="en-navlink en-menu-link"
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{ color: "#6A8299" }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
