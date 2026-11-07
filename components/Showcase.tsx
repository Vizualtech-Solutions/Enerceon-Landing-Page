"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import Icon from "./Icon";
import Shot from "./Shot";
import type { ShowcaseTab } from "@/lib/content";
import { SCREENS } from "@/lib/screens";

/**
 * Tabbed product showcase: one tab per screen of the software, with its
 * description, key points and real screenshots (thumbnails switch the large one).
 */
export default function Showcase({
  tabs,
  tone,
  label,
}: {
  tabs: ShowcaseTab[];
  /** section background the showcase sits on */
  tone: "dark" | "light";
  label: string;
}) {
  const [tab, setTab] = useState(0);
  const [shot, setShot] = useState(0);
  const uid = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const current = tabs[tab];
  const main = current.shots[Math.min(shot, current.shots.length - 1)];

  const pick = (i: number) => {
    setTab(i);
    setShot(0);
  };

  // Arrow keys move between tabs (WAI-ARIA tabs pattern).
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const next =
      e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : (tab + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    pick(next);
    listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };

  return (
    <div className={`en-showcase en-showcase-${tone} en-reveal`}>
      <div className="en-tabs" role="tablist" aria-label={label} ref={listRef} onKeyDown={onKey}>
        {tabs.map((t, i) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`${uid}-tab-${t.id}`}
            aria-selected={i === tab}
            aria-controls={`${uid}-panel`}
            tabIndex={i === tab ? 0 : -1}
            className={`en-tab${i === tab ? " is-active" : ""}`}
            onClick={() => pick(i)}
          >
            <Icon name={t.icon} size={16} />
            {t.label}
          </button>
        ))}
      </div>

      <div
        className="en-showcase-panel"
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${current.id}`}
        key={current.id}
      >
        <div className="en-showcase-copy">
          <p className="en-kicker">{current.kicker}</p>
          <h3>{current.title}</h3>
          <p className="en-showcase-text">{current.text}</p>
          <ul className="en-checks">
            {current.points.map((p) => (
              <li key={p}>
                <Icon name="check" size={15} />
                {p}
              </li>
            ))}
          </ul>
          {current.shots.length > 1 && (
            <div className="en-thumbs" aria-label="More screens">
              {current.shots.map((k, i) => (
                <button
                  key={k}
                  type="button"
                  className={`en-thumb${i === shot ? " is-active" : ""}`}
                  onClick={() => setShot(i)}
                  aria-pressed={i === shot}
                  aria-label={`Show: ${SCREENS[k].alt}`}
                >
                  <Image src={SCREENS[k].src} alt="" width={SCREENS[k].w} height={SCREENS[k].h} sizes="140px" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="en-showcase-media">
          <Shot k={main} title={current.label} key={main} sizes="(max-width: 1000px) 94vw, 760px" className="en-fade" />
        </div>
      </div>
    </div>
  );
}
