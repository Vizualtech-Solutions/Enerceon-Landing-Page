"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { container, eyebrow, reveal, sectionBody, sectionPad, sectionTitle } from "./styles";

/* The mock screens stay fluid, so the same artwork serves both the album stage
   (given a fixed base width and scaled up by CSS) and the thumbnail strip. */
const screenFrame: CSSProperties = {
  position: "relative",
  width: "100%",
  borderRadius: "12px",
  overflow: "hidden",
  background: "#07162A",
  border: "1px solid rgba(255,255,255,.08)",
  aspectRatio: "4/3",
  padding: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const miniTile: CSSProperties = {
  border: "1px solid rgba(255,255,255,.07)",
  borderRadius: "7px",
  padding: "7px",
  background: "rgba(255,255,255,.03)",
};

const miniBarRow: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "34px 1fr 22px",
  gap: "6px",
  alignItems: "center",
  fontSize: "7px",
  color: "#8FA6B9",
};

const miniTrack: CSSProperties = {
  height: "5px",
  borderRadius: "3px",
  background: "rgba(255,255,255,.07)",
  overflow: "hidden",
  display: "block",
};

const reportLine = (width: string, alpha: string): CSSProperties => ({
  height: "5px",
  width,
  borderRadius: "3px",
  background: `rgba(255,255,255,${alpha})`,
  display: "block",
});

function ScreenOverview() {
  return (
    <div data-app="" style={screenFrame}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "6px" }}>
        <div style={miniTile}>
          <div className="en-mono" style={{ fontSize: "6.5px", color: "#6E8599" }}>
            kWh
          </div>
          <div className="en-display" style={{ fontSize: "11px", color: "#fff" }}>
            18.75M
          </div>
        </div>
        <div style={miniTile}>
          <div className="en-mono" style={{ fontSize: "6.5px", color: "#6E8599" }}>
            kW
          </div>
          <div className="en-display" style={{ fontSize: "11px", color: "#fff" }}>
            4,875
          </div>
        </div>
        <div style={miniTile}>
          <div className="en-mono" style={{ fontSize: "6.5px", color: "#6E8599" }}>
            ALERTS
          </div>
          <div className="en-display" style={{ fontSize: "11px", color: "#FF8A78" }}>
            23
          </div>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          border: "1px solid rgba(255,255,255,.07)",
          borderRadius: "8px",
          background: "rgba(255,255,255,.02)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <svg
          viewBox="0 0 200 90"
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          <defs>
            <linearGradient id="tg1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#00C8F5" stopOpacity=".35" />
              <stop offset="1" stopColor="#00C8F5" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,70 C24,66 34,52 52,50 C72,48 82,34 104,36 C126,38 138,22 160,24 C178,26 190,16 200,14 L200,90 L0,90Z"
            fill="url(#tg1)"
          />
          <path
            d="M0,70 C24,66 34,52 52,50 C72,48 82,34 104,36 C126,38 138,22 160,24 C178,26 190,16 200,14"
            fill="none"
            stroke="#00C8F5"
            strokeWidth="1.8"
          />
          <path
            d="M0,80 C30,78 50,72 80,68 C112,64 132,58 160,54 C180,51 192,49 200,48"
            fill="none"
            stroke="#2ECC71"
            strokeWidth="1.4"
            opacity=".85"
          />
        </svg>
      </div>
    </div>
  );
}

function ScreenAnalytics() {
  return (
    <div data-app="" style={screenFrame}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="en-display" style={{ fontSize: "9.5px", color: "#DCEAF5" }}>
          Monthly consumption
        </span>
        <span
          className="en-mono"
          style={{
            fontSize: "6.5px",
            color: "#F0B23E",
            border: "1px solid rgba(240,178,62,.35)",
            padding: "2px 4px",
            borderRadius: "3px",
          }}
        >
          THRESHOLD
        </span>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "flex-end",
          gap: "4px",
          position: "relative",
          paddingBottom: "2px",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "26%",
            borderTop: "1px dashed rgba(240,178,62,.7)",
          }}
        />
        {[
          ["38%", false],
          ["52%", false],
          ["46%", false],
          ["68%", false],
          ["81%", true],
          ["59%", false],
          ["72%", false],
        ].map(([height, peak], i) => (
          <i
            key={i}
            style={{
              flex: 1,
              height: height as string,
              borderRadius: "2px",
              background: peak
                ? "linear-gradient(180deg,#2ECC71,#00BFA6)"
                : "linear-gradient(180deg,#00C8F5,#007BFF)",
            }}
          />
        ))}
      </div>
      <div
        className="en-mono"
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "6px",
          color: "#5F788E",
        }}
      >
        <span>Nov</span>
        <span>Jan</span>
        <span>Mar</span>
        <span>May</span>
      </div>
    </div>
  );
}

function ScreenDrilldown() {
  return (
    <div data-app="" style={screenFrame}>
      <div className="en-mono" style={{ fontSize: "6.5px", color: "#6E8599", letterSpacing: ".6px" }}>
        TOWER A / L7 / MAIN INCOMER
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "46px",
            height: "46px",
            flex: "0 0 46px",
            borderRadius: "50%",
            background: "conic-gradient(#007BFF 0 62%,#2ECC71 62% 80%,#00C8F5 80% 92%,#F0B23E 92%)",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              inset: "10px",
              borderRadius: "50%",
              background: "#07162A",
            }}
          />
        </div>
        <div style={{ flex: 1, display: "grid", gap: "3px", fontSize: "7px", color: "#93A9BC" }}>
          <span style={{ display: "flex", justifyContent: "space-between" }}>
            Elec<b style={{ color: "#DDE9F3" }}>62%</b>
          </span>
          <span style={{ display: "flex", justifyContent: "space-between" }}>
            Cooling<b style={{ color: "#DDE9F3" }}>18%</b>
          </span>
          <span style={{ display: "flex", justifyContent: "space-between" }}>
            Water<b style={{ color: "#DDE9F3" }}>12%</b>
          </span>
        </div>
      </div>
      <div style={{ flex: 1, display: "grid", gap: "5px", alignContent: "center" }}>
        {[
          ["Chiller", "88%", "linear-gradient(90deg,#007BFF,#00C8F5)", "31%"],
          ["AHU-3", "64%", "linear-gradient(90deg,#00A8D8,#00BFA6)", "22%"],
          ["Lifts", "41%", "linear-gradient(90deg,#00BFA6,#2ECC71)", "14%"],
        ].map(([label, width, gradient, share]) => (
          <div key={label} style={miniBarRow}>
            <span>{label}</span>
            <span style={miniTrack}>
              <i style={{ display: "block", height: "100%", width, background: gradient }} />
            </span>
            <b style={{ color: "#DDE9F3" }}>{share}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenReports() {
  return (
    <div data-app="" style={screenFrame}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="en-display" style={{ fontSize: "9.5px", color: "#DCEAF5" }}>
          May tenant pack
        </span>
        <span className="en-mono" style={{ fontSize: "6.5px", color: "#2ECC71" }}>
          READY
        </span>
      </div>
      <div
        style={{
          flex: 1,
          border: "1px solid rgba(255,255,255,.07)",
          borderRadius: "8px",
          background: "rgba(255,255,255,.02)",
          padding: "9px",
          display: "grid",
          gap: "6px",
          alignContent: "start",
        }}
      >
        <i style={reportLine("82%", ".16")} />
        <i style={reportLine("64%", ".11")} />
        <i style={reportLine("73%", ".11")} />
        <i style={reportLine("48%", ".11")} />
        <div style={{ display: "flex", gap: "5px", marginTop: "4px" }}>
          <span
            className="en-mono"
            style={{
              fontSize: "6.5px",
              color: "#7BE7FB",
              border: "1px solid rgba(0,200,245,.35)",
              borderRadius: "3px",
              padding: "2px 5px",
            }}
          >
            PDF
          </span>
          <span
            className="en-mono"
            style={{
              fontSize: "6.5px",
              color: "#8FE9BB",
              border: "1px solid rgba(46,204,113,.35)",
              borderRadius: "3px",
              padding: "2px 5px",
            }}
          >
            CSV
          </span>
        </div>
      </div>
      <div className="en-mono" style={{ fontSize: "6.5px", color: "#5F788E" }}>
        48 tenants · sent 09:12
      </div>
    </div>
  );
}

/* The clip itself: poster frame, transport bar and a play affordance. Swapped for a
   real <video> once the CMS supplies one — the frame and controls stay as they are. */
function VideoStage({ compact = false }: { compact?: boolean }) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* A real <img> rather than a CSS background, so the poster is indexable and
          carries alt text. The thumbnail copy is decorative — its button is labelled. */}
      <Image
        src="/assets/energy-campus.webp"
        alt={
          compact
            ? ""
            : "Energy-efficient commercial campus at dusk, with wind turbines and illuminated office buildings"
        }
        fill
        sizes={compact ? "200px" : "(min-width: 700px) 60vw, 92vw"}
        style={{ objectFit: "cover" }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg,rgba(4,13,25,.35),rgba(4,13,25,.82))",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: compact ? "30px" : "clamp(58px,9vw,86px)",
            height: compact ? "30px" : "clamp(58px,9vw,86px)",
            borderRadius: "50%",
            background: "rgba(4,13,25,.5)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(0,200,245,.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 18px 44px rgba(0,0,0,.45)",
          }}
        >
          <span
            style={{
              fontSize: compact ? "10px" : "clamp(18px,3vw,26px)",
              color: "#7BE7FB",
              marginLeft: compact ? "2px" : "4px",
            }}
          >
            ▶
          </span>
        </div>
      </div>
      {!compact && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: "clamp(12px,2vw,18px)",
            background: "linear-gradient(180deg,transparent,rgba(4,13,25,.85))",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "11px", color: "#CFE3F1" }}>▮▮</span>
            <span
              style={{
                flex: 1,
                height: "4px",
                borderRadius: "3px",
                background: "rgba(255,255,255,.16)",
                overflow: "hidden",
                display: "block",
              }}
            >
              <i
                style={{
                  display: "block",
                  height: "100%",
                  borderRadius: "3px",
                  background: "linear-gradient(90deg,#00C8F5,#2ECC71)",
                  animation: "en-scrub 14s ease-in-out infinite alternate",
                }}
              />
            </span>
            <span
              className="en-mono"
              style={{ fontSize: "10px", color: "#CFE3F1", whiteSpace: "nowrap" }}
            >
              0:34 / 1:42
            </span>
            <span style={{ fontSize: "11px", color: "#CFE3F1" }}>⤢</span>
          </div>
          <div
            className="en-mono"
            style={{ fontSize: "10px", letterSpacing: "1.2px", color: "#8FA8BD", marginTop: "9px" }}
          >
            PRODUCT WALKTHROUGH · SAMPLE CLIP
          </div>
        </div>
      )}
    </div>
  );
}

type MediaItem = {
  id: string;
  kind: "video" | "image";
  title: string;
  meta: string;
  screen?: () => ReactNode;
};

const ALBUM: MediaItem[] = [
  { id: "clip", kind: "video", title: "Product walkthrough", meta: "1:42" },
  { id: "overview", kind: "image", title: "Portfolio overview", meta: "Console", screen: ScreenOverview },
  {
    id: "analytics",
    kind: "image",
    title: "Consumption analytics",
    meta: "Console",
    screen: ScreenAnalytics,
  },
  { id: "drilldown", kind: "image", title: "Meter drill-down", meta: "Console", screen: ScreenDrilldown },
  { id: "reports", kind: "image", title: "Reports & exports", meta: "Console", screen: ScreenReports },
];

export default function ProductTour() {
  const [active, setActive] = useState(0);
  const current = ALBUM[active];
  const step = (delta: number) => setActive((i) => (i + delta + ALBUM.length) % ALBUM.length);

  return (
    <section id="tour" data-tone="a" style={{ background: "#040D19", padding: sectionPad }}>
      <div style={container}>
        <div
          className="en-reveal"
          style={{ ...reveal(), maxWidth: "760px", marginBottom: "clamp(24px,5vw,44px)" }}
        >
          <div data-t="mono" className="en-mono" style={eyebrow}>
            02 / Product tour
          </div>
          <h2 data-t="title" className="en-display" style={sectionTitle}>
            See the software, not just the pitch.
          </h2>
          <p data-t="body" style={sectionBody}>
            An album of sample screens and a walkthrough clip. Real captures and video will come from
            the CMS once it is wired up.
          </p>
        </div>

        <div
          className="en-reveal"
          data-panel=""
          style={{
            ...reveal(),
            border: "1px solid rgba(255,255,255,.10)",
            borderRadius: "20px",
            background: "rgba(255,255,255,.03)",
            padding: "clamp(12px,2.4vw,18px)",
          }}
        >
          {/* Stage — the selected album item, shown large. */}
          <div
            data-app=""
            className="en-tour-stage"
            style={{
              position: "relative",
              borderRadius: "14px",
              overflow: "hidden",
              backgroundColor: "#07162A",
              border: "1px solid rgba(255,255,255,.08)",
              display: "grid",
              placeItems: "center",
            }}
          >
            {current.kind === "video" ? (
              <VideoStage />
            ) : (
              <div className="en-tour-fig" aria-hidden="true">
                {current.screen?.()}
              </div>
            )}
          </div>

          {/* Caption row — which item, and where it sits in the album. */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: "12px",
              flexWrap: "wrap",
              margin: "clamp(12px,2vw,16px) 0 clamp(10px,1.6vw,14px)",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
              <span
                data-t="accent"
                className="en-mono"
                style={{ fontSize: "10.5px", color: "#57D8EE", letterSpacing: "1.3px" }}
              >
                {String(active + 1).padStart(2, "0")} / {String(ALBUM.length).padStart(2, "0")}
              </span>
              <span
                data-t="title"
                className="en-display"
                style={{ fontSize: "clamp(15px,3vw,18px)", fontWeight: 600, color: "#fff" }}
              >
                {current.title}
              </span>
            </div>
            <span data-t="dim" className="en-mono" style={{ fontSize: "10px", color: "#6F889E" }}>
              {current.kind === "video" ? "VIDEO" : "IMAGE"} · {current.meta}
            </span>
          </div>

          {/* Phones: a compact transport with full-size touch targets, so the album
              is navigable without a thumbnail grid to scroll past. */}
          <div className="en-tour-transport">
            <button
              type="button"
              className="en-tour-arrow"
              aria-label="Previous item"
              onClick={() => step(-1)}
            >
              ‹
            </button>
            <div className="en-tour-dots" role="tablist" aria-label="Product tour album">
              {ALBUM.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`${item.title} — ${item.kind}`}
                  className={`en-tour-dot${i === active ? " is-active" : ""}`}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>
            <button
              type="button"
              className="en-tour-arrow"
              aria-label="Next item"
              onClick={() => step(1)}
            >
              ›
            </button>
          </div>

          {/* Wider screens get the full album strip in place of the dots. */}
          <div role="tablist" aria-label="Product tour album" className="en-tour-strip">
            {ALBUM.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`${item.title} — ${item.kind}`}
                onClick={() => setActive(i)}
                className={`en-thumb${i === active ? " is-active" : ""}`}
              >
                <span className="en-thumb-frame" data-app="">
                  {item.kind === "video" ? (
                    <VideoStage compact />
                  ) : (
                    <span className="en-tour-thumb-fig" aria-hidden="true">
                      {item.screen?.()}
                    </span>
                  )}
                </span>
                <span className="en-thumb-label">
                  <span
                    data-t="dim"
                    className="en-mono"
                    style={{ fontSize: "9px", letterSpacing: ".9px", color: "#6F889E" }}
                  >
                    {item.kind === "video" ? "▶" : "▣"} {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    data-t="body"
                    style={{ fontSize: "11.5px", color: "#93AABE", lineHeight: 1.35 }}
                  >
                    {item.title}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
