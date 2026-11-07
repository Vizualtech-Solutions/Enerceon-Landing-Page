"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "./Icon";
import SectionHead from "./SectionHead";
import { APP_LOGIN_URL } from "@/lib/site";

type Phase = "idle" | "loading" | "ready";

/** Only http(s) addresses are opened; anything else is treated as not configured. */
function parseUrl(raw: string): URL | null {
  try {
    const url = new URL(raw);
    return url.protocol === "https:" || url.protocol === "http:" ? url : null;
  } catch {
    return null;
  }
}

/**
 * Live Preview — loads the real Enerceon registration page (the existing page of the
 * web app, configured with NEXT_PUBLIC_ENERCEON_APP_URL) inside a browser frame,
 * with full-screen and new-tab options. Nothing is copied or mocked.
 */
export default function LivePreview() {
  const url = useMemo(() => parseUrl(APP_LOGIN_URL), []);
  const [phase, setPhase] = useState<Phase>("idle");
  const [expanded, setExpanded] = useState(false);
  const [slow, setSlow] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  // A secure (https) page cannot embed an http address — the browser blocks it.
  useEffect(() => {
    if (url && window.location.protocol === "https:" && url.protocol === "http:") setBlocked(true);
  }, [url]);

  useEffect(() => {
    if (phase !== "loading") return;
    const id = setTimeout(() => setSlow(true), 10000);
    return () => clearTimeout(id);
  }, [phase]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setExpanded(false);
    document.addEventListener("keydown", onKey);
    document.body.classList.add("en-lock");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("en-lock");
    };
  }, [expanded]);

  const launch = () => {
    if (!url) return;
    if (blocked) {
      window.open(url.href, "_blank", "noopener,noreferrer");
      return;
    }
    setSlow(false);
    setPhase("loading");
    frameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const reload = () => {
    setPhase("idle");
    setSlow(false);
    requestAnimationFrame(() => setPhase("loading"));
  };

  return (
    <section id="live-preview" className="en-sec en-light en-live">
      <div className="en-wrap">
        <SectionHead
          index="07"
          label="Live Preview"
          title={
            <>
              Open the real <em>Enerceon</em>
            </>
          }
          lead="No video, no mock-up: this opens the actual Enerceon registration page. Create your account or sign in, and explore the dashboards, diagrams and billing yourself."
          center
        />

        <div className="en-live-card en-reveal">
          <div className="en-live-side">
            <ul className="en-live-steps">
              <li>
                <span>1</span>
                <div>
                  <strong>Launch the preview</strong>
                  <p>The Enerceon registration page loads right here, in a browser frame.</p>
                </div>
              </li>
              <li>
                <span>2</span>
                <div>
                  <strong>Register or sign in</strong>
                  <p>Create your Enerceon account, or sign in with the access provided by our team.</p>
                </div>
              </li>
              <li>
                <span>3</span>
                <div>
                  <strong>Explore</strong>
                  <p>Go full screen, or open Enerceon in its own tab at any time.</p>
                </div>
              </li>
            </ul>
            <div className="en-live-actions">
              <button type="button" className="en-btn en-btn-gold" onClick={launch} disabled={!url}>
                <Icon name="play" size={16} />
                {phase === "idle" ? "Launch Live Preview" : "Live Preview open"}
              </button>
              {url && (
                <a href={url.href} target="_blank" rel="noopener noreferrer" className="en-btn en-btn-ghost">
                  Open in new tab
                  <Icon name="external" size={15} />
                </a>
              )}
            </div>
            <p className="en-live-help">
              No access yet? <a href="#contact">Ask us for a demo account</a>.
            </p>
          </div>

          <div ref={frameRef} className={`en-browser${expanded ? " is-expanded" : ""}`}>
            {expanded && <div className="en-browser-backdrop" onClick={() => setExpanded(false)} aria-hidden="true" />}
            <div className="en-browser-window" role={expanded ? "dialog" : undefined} aria-modal={expanded || undefined} aria-label={expanded ? "Enerceon live preview" : undefined}>
              <div className="en-browser-bar">
                <span className="en-browser-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="en-browser-url" title={url?.href}>
                  <Icon name="lock" size={12} />
                  {url ? `${url.host}${url.pathname === "/" ? "" : url.pathname}` : "Not configured"}
                </span>
                <span className="en-browser-tools">
                  {phase !== "idle" && (
                    <button type="button" onClick={reload} aria-label="Reload preview" title="Reload">
                      <Icon name="refresh" size={15} />
                    </button>
                  )}
                  {phase !== "idle" && (
                    <button
                      type="button"
                      onClick={() => setExpanded((v) => !v)}
                      aria-label={expanded ? "Exit full screen" : "Full screen"}
                      title={expanded ? "Exit full screen" : "Full screen"}
                    >
                      <Icon name={expanded ? "minimize" : "maximize"} size={15} />
                    </button>
                  )}
                  {url && (
                    <a href={url.href} target="_blank" rel="noopener noreferrer" aria-label="Open in new tab" title="Open in new tab">
                      <Icon name="external" size={15} />
                    </a>
                  )}
                  {expanded && (
                    <button type="button" onClick={() => setExpanded(false)} aria-label="Close full screen" title="Close">
                      <Icon name="x" size={16} />
                    </button>
                  )}
                </span>
              </div>

              <div className="en-browser-view">
                {phase === "idle" ? (
                  <div className="en-browser-idle">
                    <span className="en-browser-mark" aria-hidden="true">
                      <Icon name="monitor" size={30} />
                    </span>
                    <strong>{url ? "Enerceon registration page" : "Live Preview is not configured"}</strong>
                    <p>
                      {!url
                        ? "Set NEXT_PUBLIC_ENERCEON_APP_URL to the address of the Enerceon registration page."
                        : blocked
                          ? "This page is secure (https) and the Enerceon address is not, so the browser will open it in a new tab."
                          : "Press launch to load the live application here."}
                    </p>
                    {url && (
                      <button type="button" className="en-btn en-btn-gold en-btn-sm" onClick={launch}>
                        <Icon name={blocked ? "external" : "play"} size={15} />
                        {blocked ? "Open registration page" : "Launch Live Preview"}
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    {phase === "loading" && (
                      <div className="en-browser-loading" aria-live="polite">
                        <span className="en-spinner" aria-hidden="true" />
                        <p>Connecting to Enerceon…</p>
                        {slow && (
                          <p className="en-browser-slow">
                            Taking longer than usual? The application may not allow embedding or may be unreachable
                            from your network.{" "}
                            <a href={url!.href} target="_blank" rel="noopener noreferrer">
                              Open it in a new tab
                            </a>
                            .
                          </p>
                        )}
                      </div>
                    )}
                    <iframe
                      src={url!.href}
                      title="Enerceon registration page"
                      onLoad={() => setPhase("ready")}
                      referrerPolicy="strict-origin-when-cross-origin"
                      allow="clipboard-write; fullscreen"
                      className={phase === "ready" ? "is-ready" : ""}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
