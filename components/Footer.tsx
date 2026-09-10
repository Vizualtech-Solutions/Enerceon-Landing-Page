import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { container } from "./styles";

const columnLabel: CSSProperties = {
  fontSize: "10.5px",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  color: "#5F788E",
  marginBottom: "12px",
};

const linkList: CSSProperties = { display: "grid", gap: "7px", fontSize: "13.5px" };

const CONTACT_LINKS = [
  { href: "mailto:sales@enerceon.com", label: "sales@enerceon.com" },
  { href: "mailto:support@enerceon.com", label: "support@enerceon.com" },
  { href: "https://www.enerceon.com", label: "www.enerceon.com" },
];

const PLATFORM_LINKS = [
  { href: "#console", label: "Live console" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#integration", label: "Integration" },
  { href: "#contact", label: "Request a demo" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy notice" },
  { href: "/terms", label: "Terms of use" },
];

export default function Footer() {
  return (
    <footer
      data-tone="a"
      data-line=""
      style={{
        background: "#03101C",
        borderTop: "1px solid rgba(255,255,255,.07)",
        padding: "clamp(32px,6vw,48px) 0 28px",
      }}
    >
      <div
        style={{
          ...container,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))",
          gap: "clamp(24px,4vw,40px)",
        }}
      >
        <div>
          <Image
            data-logo=""
            src="/assets/enerceon-logo-tagline.png"
            alt="ENERCEON — Your Energy. Reimagined."
            width={1399}
            height={280}
            sizes="214px"
            style={{
              width: "clamp(178px,44vw,214px)",
              height: "auto",
              filter: "brightness(0) invert(1)",
              opacity: 0.92,
            }}
          />
          <p
            data-t="body"
            style={{
              margin: "16px 0 0",
              fontSize: "13.5px",
              lineHeight: 1.7,
              color: "#8299AE",
              maxWidth: "34ch",
            }}
          >
            Energy Intelligence &amp; Management Platform for multi-site, multi-utility monitoring,
            analytics and reporting.
          </p>
        </div>

        <div>
          <div data-t="dim" className="en-mono" style={columnLabel}>
            Contact
          </div>
          <div style={linkList}>
            {CONTACT_LINKS.map((link) => (
              <a
                key={link.href}
                data-t="body"
                className="en-footer-link"
                href={link.href}
                style={{ color: "#C3D3E1" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div data-t="dim" className="en-mono" style={columnLabel}>
            Company
          </div>
          <div style={linkList}>
            {COMPANY_LINKS.map((link) => (
              <Link
                key={link.href}
                data-t="body"
                className="en-footer-link"
                href={link.href}
                style={{ color: "#C3D3E1" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div data-t="dim" className="en-mono" style={columnLabel}>
            Platform
          </div>
          <div style={linkList}>
            {PLATFORM_LINKS.map((link) => (
              <a
                key={link.href}
                data-t="body"
                className="en-footer-link"
                href={link.href}
                style={{ color: "#C3D3E1" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        data-line=""
        style={{
          ...container,
          margin: "clamp(24px,4vw,36px) auto 0",
          paddingTop: "18px",
          borderTop: "1px solid rgba(255,255,255,.07)",
          display: "flex",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <span data-t="dim" style={{ fontSize: "12px", color: "#6F889E" }}>
          © 2026 Enerceon · A VizualTech product
        </span>
        <span data-t="dim" style={{ fontSize: "12px", color: "#6F889E" }}>
          Your Energy. Reimagined.
        </span>
      </div>
    </footer>
  );
}
