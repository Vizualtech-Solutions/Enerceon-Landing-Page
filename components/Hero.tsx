"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import Shot from "./Shot";
import { HERO_STATS, UTILITIES } from "@/lib/content";
import { SCREENS } from "@/lib/screens";
import { useLightbox } from "./Lightbox";

/** Counts up once when the stats come into view. */
function Count({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setN(0);
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      let i = 0;
      const id = setInterval(() => {
        i += 1;
        setN(i);
        if (i >= to) clearInterval(id);
      }, 140);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}</span>;
}

export default function Hero() {
  const open = useLightbox();
  return (
    <section id="home" className="en-sec en-dark en-hero">
      <div className="en-hero-grid" aria-hidden="true" />
      <div className="en-hero-glow" aria-hidden="true" />

      <div className="en-wrap en-hero-row">
        <div className="en-hero-copy">
          <p className="en-pill en-reveal">
            <span className="en-dot-live" aria-hidden="true" />
            Energy Intelligence &amp; Management Platform
          </p>
          <h1 className="en-hero-title en-reveal" style={{ ["--d" as string]: "80ms" }}>
            Every meter. Every tenant. <span className="en-gold-text">Every bill.</span>
          </h1>
          <p className="en-hero-lead en-reveal" style={{ ["--d" as string]: "160ms" }}>
            One web-based platform to monitor electricity, water, gas and BTU/cooling, rank and analyse tenant
            consumption, and create, send and collect utility bills.
          </p>
          <div className="en-hero-ctas en-reveal" style={{ ["--d" as string]: "240ms" }}>
            <a href="#live-preview" className="en-btn en-btn-gold">
              <Icon name="play" size={16} />
              Live Preview
            </a>
            <a href="#features" className="en-btn en-btn-ghost">
              Explore features
              <Icon name="arrowDown" size={16} />
            </a>
          </div>
          <ul className="en-utility-row en-reveal" style={{ ["--d" as string]: "320ms" }} aria-label="Supported utilities">
            {UTILITIES.map((u) => (
              <li key={u.key} className={`en-utility en-u-${u.key}`}>
                <Icon name={u.icon} size={15} />
                {u.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="en-hero-visual en-reveal" style={{ ["--d" as string]: "200ms" }}>
          <Shot
            k="rankingDark"
            title="Tenant Energy Consumption Ranking"
            sizes="(max-width: 1100px) 60vw, 460px"
            className="en-hero-back"
          />
          <Shot
            k="energyDashboard"
            title="Energy Management Dashboard"
            priority
            sizes="(max-width: 1100px) 94vw, 660px"
            className="en-hero-main"
          />
          <button
            type="button"
            className="en-hero-bill"
            onClick={() => open(SCREENS.billPreview, "Utility bill preview")}
            aria-label="Enlarge the utility bill preview"
          >
            <Image
              src={SCREENS.billPreview.src}
              alt={SCREENS.billPreview.alt}
              width={SCREENS.billPreview.w}
              height={SCREENS.billPreview.h}
              sizes="240px"
              priority
            />
          </button>
          <div className="en-hero-chip en-hero-chip-a" aria-hidden="true">
            <span className="en-dot-live" />
            <div>
              <strong>Live power</strong>
              <small>refreshing every few seconds</small>
            </div>
          </div>
          <div className="en-hero-chip en-hero-chip-b" aria-hidden="true">
            <Icon name="send" size={16} />
            <div>
              <strong>Bill sent</strong>
              <small>E-mail · WhatsApp</small>
            </div>
          </div>
        </div>
      </div>

      <div className="en-wrap">
        <dl className="en-stats en-reveal">
          {HERO_STATS.map((s) => (
            <div key={s.label} className="en-stat">
              <dt>{s.label}</dt>
              <dd className="en-stat-num">
                <Count to={s.value} />
              </dd>
              <dd className="en-stat-note">{s.note}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
