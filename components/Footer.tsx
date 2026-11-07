import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/content";
import { SALES_EMAIL, SITE_TAGLINE, SUPPORT_EMAIL } from "@/lib/site";

/** Shared by the landing page and the legal pages, so section links use "/#id". */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="en-footer">
      <div className="en-wrap">
        <div className="en-footer-grid">
          <div className="en-footer-brand">
            <Link href="/#home" aria-label="Enerceon home">
              <Image src="/assets/enerceon-wordmark-light.png" alt="ENERCEON" width={1405} height={170} sizes="170px" />
            </Link>
            <p>{SITE_TAGLINE}</p>
            <p className="en-footer-small">Energy Intelligence &amp; Management Platform — monitoring, analytics, diagrams and utility billing for every meter.</p>
          </div>
          <nav aria-label="Sections">
            <h4>Explore</h4>
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <Link href={`/#${l.id}`}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company">
            <h4>Company</h4>
            <ul>
              <li>
                <Link href="/#contact">Book a demo</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy notice</Link>
              </li>
              <li>
                <Link href="/terms">Terms of use</Link>
              </li>
            </ul>
          </nav>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>
                <a href={`mailto:${SALES_EMAIL}`}>{SALES_EMAIL}</a>
              </li>
              <li>
                <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
              </li>
              <li>
                <a href="https://www.enerceon.com">www.enerceon.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="en-footer-bottom">
          <span>© {year} Enerceon. All rights reserved.</span>
          <span>
            A <b>VizualTech</b> product
          </span>
        </div>
      </div>
    </footer>
  );
}
