"use client";

import type { CSSProperties } from "react";
import { SERIES } from "@/lib/content";
import { consoleCard, container, pillCta } from "./styles";

const statLabel: CSSProperties = {
  fontSize: "10.5px",
  letterSpacing: "1.2px",
  textTransform: "uppercase",
  color: "#6C8399",
  marginTop: "3px",
};

const statValue: CSSProperties = {
  fontSize: "clamp(20px,4.6vw,26px)",
  fontWeight: 600,
  color: "#fff",
};

const kpiLabel: CSSProperties = {
  fontSize: "9px",
  letterSpacing: ".8px",
  color: "#6E8599",
};

const kpiValue: CSSProperties = {
  fontSize: "clamp(16px,3.4vw,19px)",
  fontWeight: 600,
  color: "#fff",
  marginTop: "5px",
};

const barTrack: CSSProperties = {
  height: "6px",
  borderRadius: "3px",
  background: "rgba(255,255,255,.07)",
  display: "block",
  overflow: "hidden",
};

const barRow: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "56px 1fr 30px",
  gap: "8px",
  alignItems: "center",
};

type Props = {
  series: number;
  onPickSeries: (index: number) => void;
  meters: string;
  points: string;
  demand: string;
};

export default function Hero({ series, onPickSeries, meters, points, demand }: Props) {
  const active = SERIES[series];
  const [barA, barB, barC] = active.bars;

  return (
    <section
      id="top"
      data-tone="a"
      style={{ position: "relative", overflow: "hidden", background: "#040D19" }}
    >
      <div
        data-grid=""
        data-parallax="0.08"
        style={{
          position: "absolute",
          inset: "-10% 0",
          backgroundImage:
            "linear-gradient(rgba(120,170,210,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(120,170,210,.06) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(1000px 560px at 25% 12%,#000,transparent 78%)",
          WebkitMaskImage: "radial-gradient(1000px 560px at 25% 12%,#000,transparent 78%)",
          willChange: "transform",
        }}
      />
      <div
        data-glow=""
        data-parallax="0.16"
        style={{
          position: "absolute",
          inset: "-10% 0",
          background:
            "radial-gradient(1100px 660px at 6% -14%,rgba(0,123,255,.18),transparent 62%),radial-gradient(860px 600px at 100% 2%,rgba(46,204,113,.11),transparent 64%)",
          pointerEvents: "none",
          willChange: "transform",
        }}
      />
      <div
        data-cursor=""
        style={{
          position: "absolute",
          width: "520px",
          height: "520px",
          left: 0,
          top: 0,
          margin: "-260px 0 0 -260px",
          borderRadius: "50%",
          background: "radial-gradient(closest-side,rgba(0,200,245,.16),transparent 72%)",
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity .6s ease",
          willChange: "transform",
        }}
      />

      <div
        style={{
          ...container,
          position: "relative",
          padding: "clamp(44px,8vw,92px) 0 clamp(52px,9vw,104px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(330px,1fr))",
          gap: "clamp(34px,5vw,64px)",
          alignItems: "center",
        }}
      >
        <div>
          <div
            data-chip=""
            className="en-mono"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              padding: "7px 14px",
              borderRadius: "999px",
              border: "1px solid rgba(0,200,245,.30)",
              background: "rgba(0,200,245,.07)",
              fontSize: "clamp(9.5px,2.2vw,11px)",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: "#71E4F6",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#2ECC71",
                boxShadow: "0 0 0 4px rgba(46,204,113,.15)",
                animation: "en-pulse 2.4s ease-in-out infinite",
              }}
            />
            Energy intelligence platform
          </div>

          <h1
            data-t="title"
            className="en-display"
            style={{
              fontSize: "clamp(35px,7.4vw,66px)",
              lineHeight: 1.02,
              letterSpacing: "-.035em",
              fontWeight: 700,
              margin: "clamp(18px,3vw,28px) 0 18px",
              color: "#fff",
              textWrap: "balance",
            }}
          >
            Know where your energy goes.
            <span
              data-hero-grad=""
              style={{
                display: "block",
                background: "linear-gradient(92deg,#3B9BFF,#00C8F5 46%,#2ECC71)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Know what to do next.
            </span>
          </h1>

          <p
            data-t="body"
            style={{
              fontSize: "clamp(15px,3.4vw,18px)",
              lineHeight: 1.7,
              color: "#9DB3C6",
              maxWidth: "54ch",
              margin: "0 0 clamp(22px,4vw,32px)",
              textWrap: "pretty",
            }}
          >
            Enerceon turns meter and building-system data into clear energy intelligence across sites,
            buildings, floors, spaces and tenants — live and historical, in one browser-based platform.
          </p>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginBottom: "clamp(26px,5vw,38px)",
            }}
          >
            <a href="#contact" className="en-cta" style={pillCta}>
              Request a demo <span>→</span>
            </a>
            <a
              data-chip=""
              className="en-chip-hover"
              href="#console"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "15px 26px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,.16)",
                color: "#DCE8F2",
                fontWeight: 600,
                fontSize: "15px",
              }}
            >
              Watch the console
            </a>
          </div>

          <div
            data-line=""
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(124px,1fr))",
              gap: "16px",
              paddingTop: "22px",
              borderTop: "1px solid rgba(255,255,255,.08)",
            }}
          >
            <div>
              <div data-t="title" className="en-display" style={statValue}>
                {meters}
              </div>
              <div data-t="dim" className="en-mono" style={statLabel}>
                Meters streaming
              </div>
            </div>
            <div>
              <div data-t="title" className="en-display" style={statValue}>
                {points}
              </div>
              <div data-t="dim" className="en-mono" style={statLabel}>
                Data points today
              </div>
            </div>
            <div>
              <div data-t="title" className="en-display" style={statValue}>
                23
              </div>
              <div data-t="dim" className="en-mono" style={statLabel}>
                Sites connected
              </div>
            </div>
          </div>
        </div>

        <div
          data-tilt=""
          style={{
            position: "relative",
            transformStyle: "preserve-3d",
            willChange: "transform",
            transition: "transform .35s cubic-bezier(.2,.7,.3,1)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "-1px",
              borderRadius: "20px",
              background:
                "linear-gradient(140deg,rgba(0,200,245,.45),rgba(46,204,113,.22),transparent 60%)",
              filter: "blur(18px)",
              opacity: 0.5,
            }}
          />
          <div
            data-app=""
            style={{
              position: "relative",
              borderRadius: "18px",
              border: "1px solid rgba(255,255,255,.12)",
              background: "#07162A",
              overflow: "hidden",
              boxShadow: "0 40px 90px rgba(4,20,40,.45)",
            }}
          >
            <div
              style={{
                height: "42px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "0 14px",
                background: "rgba(255,255,255,.03)",
                borderBottom: "1px solid rgba(255,255,255,.07)",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#2ECC71",
                  animation: "en-blink 2.6s ease-in-out infinite",
                }}
              />
              <span
                className="en-mono"
                style={{ fontSize: "10px", letterSpacing: "1.2px", color: "#6F889E" }}
              >
                ENERCEON · LIVE OVERVIEW
              </span>
            </div>

            <div style={{ padding: "clamp(13px,3vw,20px)", display: "grid", gap: "11px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(100px,1fr))",
                  gap: "8px",
                }}
              >
                <div style={{ ...consoleCard, borderRadius: "10px", padding: "12px" }}>
                  <div className="en-mono" style={kpiLabel}>
                    TOTAL kWh
                  </div>
                  <div className="en-display" style={kpiValue}>
                    18.75 M
                  </div>
                  <div style={{ fontSize: "9.5px", color: "#2ECC71", marginTop: "2px" }}>
                    ↑ 12.5% vs Apr
                  </div>
                </div>
                <div style={{ ...consoleCard, borderRadius: "10px", padding: "12px" }}>
                  <div className="en-mono" style={kpiLabel}>
                    DEMAND kW
                  </div>
                  <div className="en-display" style={kpiValue}>
                    {demand}
                  </div>
                  <div style={{ fontSize: "9.5px", color: "#00C8F5", marginTop: "2px" }}>Live</div>
                </div>
                <div style={{ ...consoleCard, borderRadius: "10px", padding: "12px" }}>
                  <div className="en-mono" style={kpiLabel}>
                    ALERTS
                  </div>
                  <div className="en-display" style={{ ...kpiValue, color: "#FF8A78" }}>
                    23
                  </div>
                  <div style={{ fontSize: "9.5px", color: "#6E8599", marginTop: "2px" }}>
                    3 new today
                  </div>
                </div>
              </div>

              <div style={consoleCard}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    className="en-display"
                    style={{ fontSize: "13.5px", fontWeight: 600, color: "#DCEAF5" }}
                  >
                    {active.title}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "4px",
                      background: "rgba(255,255,255,.05)",
                      padding: "3px",
                      borderRadius: "999px",
                    }}
                  >
                    {["ELEC", "COOLING", "DEMAND"].map((label, i) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => onPickSeries(i)}
                        aria-pressed={series === i}
                        className={`en-tab${series === i ? " is-active" : ""}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    position: "relative",
                    height: "clamp(128px,26vw,166px)",
                    marginTop: "12px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    background:
                      "repeating-linear-gradient(to bottom,transparent 0,transparent 33px,rgba(255,255,255,.05) 34px)",
                  }}
                >
                  <svg
                    viewBox="0 0 500 150"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                  >
                    <defs>
                      <linearGradient id="enFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#00C8F5" stopOpacity=".38" />
                        <stop offset="1" stopColor="#00C8F5" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d={active.area}
                      fill="url(#enFill)"
                      style={{ transition: "d 1.1s cubic-bezier(.4,0,.2,1)" }}
                    />
                    <path
                      d={active.line}
                      fill="none"
                      stroke={active.color}
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      style={{ transition: "d 1.1s cubic-bezier(.4,0,.2,1),stroke .6s ease" }}
                    />
                    <line
                      x1="0"
                      y1="44"
                      x2="500"
                      y2="44"
                      stroke="#F0B23E"
                      strokeWidth="1.3"
                      strokeDasharray="6 5"
                      opacity=".85"
                    />
                  </svg>
                  <span
                    className="en-mono"
                    style={{
                      position: "absolute",
                      right: "8px",
                      top: "8px",
                      fontSize: "8.5px",
                      color: "#F0B23E",
                      border: "1px solid rgba(240,178,62,.35)",
                      background: "rgba(240,178,62,.10)",
                      padding: "2px 6px",
                      borderRadius: "3px",
                    }}
                  >
                    THRESHOLD
                  </span>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(90deg,transparent,rgba(0,200,245,.10),transparent)",
                      width: "35%",
                      animation: "en-sweep 5.5s linear infinite",
                    }}
                  />
                </div>

                <div
                  className="en-mono"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "8.5px",
                    color: "#5F788E",
                    marginTop: "8px",
                  }}
                >
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>24:00</span>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
                  gap: "8px",
                }}
              >
                <div style={consoleCard}>
                  <div
                    className="en-mono"
                    style={{ ...kpiLabel, marginBottom: "10px" }}
                  >
                    TOP CONSUMERS
                  </div>
                  <div style={{ display: "grid", gap: "8px", fontSize: "10px", color: "#8FA6B9" }}>
                    <div style={barRow}>
                      <span>Chiller</span>
                      <span style={barTrack}>
                        <i
                          style={{
                            display: "block",
                            height: "100%",
                            width: `${barA}%`,
                            background: "linear-gradient(90deg,#007BFF,#00C8F5)",
                            transition: "width 1s ease",
                          }}
                        />
                      </span>
                      <b style={{ color: "#DDE9F3" }}>31%</b>
                    </div>
                    <div style={barRow}>
                      <span>Tower A</span>
                      <span style={barTrack}>
                        <i
                          style={{
                            display: "block",
                            height: "100%",
                            width: `${barB}%`,
                            background: "linear-gradient(90deg,#00A8D8,#00BFA6)",
                            transition: "width 1s ease",
                          }}
                        />
                      </span>
                      <b style={{ color: "#DDE9F3" }}>24%</b>
                    </div>
                    <div style={barRow}>
                      <span>Data hall</span>
                      <span style={barTrack}>
                        <i
                          style={{
                            display: "block",
                            height: "100%",
                            width: `${barC}%`,
                            background: "linear-gradient(90deg,#00BFA6,#2ECC71)",
                            transition: "width 1s ease",
                          }}
                        />
                      </span>
                      <b style={{ color: "#DDE9F3" }}>18%</b>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    ...consoleCard,
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "62px",
                      height: "62px",
                      flex: "0 0 62px",
                      borderRadius: "50%",
                      background:
                        "conic-gradient(#007BFF 0 62%,#2ECC71 62% 80%,#00C8F5 80% 92%,#F0B23E 92%)",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        inset: "13px",
                        borderRadius: "50%",
                        background: "#0A1B2E",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      flex: 1,
                      display: "grid",
                      gap: "4px",
                      fontSize: "10px",
                      color: "#93A9BC",
                    }}
                  >
                    <span style={{ display: "flex", justifyContent: "space-between" }}>
                      Electricity<b style={{ color: "#DDE9F3" }}>62%</b>
                    </span>
                    <span style={{ display: "flex", justifyContent: "space-between" }}>
                      Cooling<b style={{ color: "#DDE9F3" }}>18%</b>
                    </span>
                    <span style={{ display: "flex", justifyContent: "space-between" }}>
                      Water<b style={{ color: "#DDE9F3" }}>12%</b>
                    </span>
                    <span style={{ display: "flex", justifyContent: "space-between" }}>
                      Gas<b style={{ color: "#DDE9F3" }}>8%</b>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
