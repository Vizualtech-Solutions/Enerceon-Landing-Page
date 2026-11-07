"use client";

import Image from "next/image";
import { useState } from "react";
import Icon from "./Icon";
import SectionHead from "./SectionHead";
import Showcase from "./Showcase";
import { DASHBOARD_TABS, THEME_NOTES, UTILITIES } from "@/lib/content";
import { SCREENS } from "@/lib/screens";

/** Drag (or use the slider) to compare the same dashboard in light and dark mode. */
function ThemeCompare() {
  const [pos, setPos] = useState(52);
  const light = SCREENS.rankingLight;
  const dark = SCREENS.rankingDark;
  return (
    <div className="en-compare" style={{ ["--pos" as string]: `${pos}%` }}>
      <div className="en-compare-stage" style={{ aspectRatio: `${light.w} / ${light.h}` }}>
        <Image src={dark.src} alt={dark.alt} fill sizes="(max-width: 1000px) 94vw, 720px" className="en-compare-img" />
        <div className="en-compare-top" aria-hidden="true">
          <Image src={light.src} alt="" fill sizes="(max-width: 1000px) 94vw, 720px" className="en-compare-img" />
        </div>
        <span className="en-compare-handle" aria-hidden="true">
          <Icon name="sun" size={14} />
          <Icon name="moon" size={14} />
        </span>
        <span className="en-compare-tag is-light" aria-hidden="true">Light</span>
        <span className="en-compare-tag is-dark" aria-hidden="true">Dark</span>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Compare light and dark mode"
          className="en-compare-range"
        />
      </div>
    </div>
  );
}

export default function Dashboards() {
  return (
    <section id="dashboards" className="en-sec en-dark">
      <div className="en-wrap">
        <SectionHead
          index="02"
          label="Dashboards & analytics"
          title={
            <>
              See every utility, <em>every tenant, every hour</em>
            </>
          }
          lead="Rank tenants, follow the year month by month, look inside every meter and watch live power — for electricity, water, gas and BTU/cooling, scoped from the whole portfolio down to one meter."
        />

        <Showcase tabs={DASHBOARD_TABS} tone="dark" label="Dashboards" />

        <div className="en-theme-block">
          <div className="en-theme-copy en-reveal">
            <p className="en-kicker">Light &amp; dark mode</p>
            <h3>One click between light and dark</h3>
            <p>Drag the handle to compare the same Tenant Energy Consumption Ranking in both modes.</p>
            <ul className="en-mini-list">
              {THEME_NOTES.map((n) => (
                <li key={n.title}>
                  <strong>{n.title}</strong>
                  <span>{n.text}</span>
                </li>
              ))}
            </ul>
            <ul className="en-utility-row" aria-label="Works for every utility">
              {UTILITIES.map((u) => (
                <li key={u.key} className={`en-utility en-u-${u.key}`}>
                  <Icon name={u.icon} size={15} />
                  {u.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="en-reveal" style={{ ["--d" as string]: "120ms" }}>
            <ThemeCompare />
          </div>
        </div>
      </div>
    </section>
  );
}
