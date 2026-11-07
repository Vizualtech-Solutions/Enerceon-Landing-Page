"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import { NAV_LINKS } from "@/lib/content";

/** Sticky top bar: transparent over the hero, solid once the page scrolls.
 *  Links are plain #anchors (smooth scrolling comes from CSS), and the link of
 *  the section in view is highlighted. */
export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section that crosses the upper third of the viewport.
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    if (!("IntersectionObserver" in window) || !sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -65% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu with Escape or when the viewport grows to desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1120px)");
    const onMq = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <header className={`en-header${solid || open ? " is-solid" : ""}${open ? " is-open" : ""}`}>
      <div className="en-wrap en-header-row">
        <a href="#home" className="en-logo" aria-label="Enerceon — back to top" onClick={() => setOpen(false)}>
          <Image
            src="/assets/enerceon-wordmark-light.png"
            alt="ENERCEON"
            width={1405}
            height={170}
            priority
            sizes="160px"
          />
        </a>

        <nav className="en-nav" aria-label="Sections">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`en-nav-link${active === link.id ? " is-active" : ""}`}
              aria-current={active === link.id ? "true" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="en-header-cta">
          <a href="#contact" className="en-btn en-btn-gold en-btn-sm">
            Book a demo
          </a>
          <button
            type="button"
            className="en-burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="en-mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "x" : "menu"} size={22} />
          </button>
        </div>
      </div>

      <nav id="en-mobile-nav" className="en-mobile-nav" aria-label="Sections" hidden={!open}>
        <div className="en-wrap">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`en-mobile-link${active === link.id ? " is-active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
              <Icon name="arrowRight" size={16} />
            </a>
          ))}
          <a href="#contact" className="en-btn en-btn-gold en-mobile-cta" onClick={() => setOpen(false)}>
            Book a demo
          </a>
        </div>
      </nav>
    </header>
  );
}
