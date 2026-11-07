"use client";

import Icon from "./Icon";
import SectionHead from "./SectionHead";
import Shot from "./Shot";
import { SLD_POINTS, SOURCE_GROUPS } from "@/lib/content";

/* ─── animated hierarchy: main meter → child meters → sub-meters ─────────── */
const NODES = [
  { id: "m", x: 210, y: 34, label: "Main incomer", tag: "L1", kind: "main" },
  { id: "c1", x: 112, y: 124, label: "Child meter", tag: "L2", kind: "child" },
  { id: "c2", x: 308, y: 124, label: "Child meter", tag: "L2", kind: "child" },
  { id: "s1", x: 58, y: 214, label: "Tenant", tag: "L3", kind: "sub" },
  { id: "s2", x: 166, y: 214, label: "Tenant", tag: "L3", kind: "sub" },
  { id: "s3", x: 254, y: 214, label: "Lighting", tag: "L3", kind: "sub" },
  { id: "s4", x: 362, y: 214, label: "HVAC", tag: "L3", kind: "sub", inactive: true },
] as const;

const LINKS: [string, string, boolean?][] = [
  ["m", "c1"],
  ["m", "c2"],
  ["c1", "s1"],
  ["c1", "s2"],
  ["c2", "s3"],
  ["c2", "s4", true],
];

function HierarchyArt() {
  const at = (id: string) => NODES.find((n) => n.id === id)!;
  return (
    <svg className="en-tree" viewBox="0 0 420 252" role="img" aria-label="Meter hierarchy: a main meter feeds child meters, which feed sub-meters">
      <defs>
        <pattern id="en-dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="currentColor" opacity=".16" />
        </pattern>
      </defs>
      <rect width="420" height="252" fill="url(#en-dots)" rx="14" />
      {LINKS.map(([a, b, dashed]) => {
        const p = at(a);
        const c = at(b);
        const midY = (p.y + 17 + c.y - 17) / 2;
        const d = `M${p.x} ${p.y + 17} V${midY} H${c.x} V${c.y - 17}`;
        return (
          <g key={a + b}>
            <path d={d} className={`en-tree-line${dashed ? " is-off" : ""}`} />
            {!dashed && <path d={d} className="en-tree-flow" />}
          </g>
        );
      })}
      {NODES.map((n, i) => (
        <g
          key={n.id}
          className={`en-tree-node is-${n.kind}${"inactive" in n ? " is-off" : ""}`}
          style={{ ["--d" as string]: `${i * 110}ms` }}
          transform={`translate(${n.x - 46} ${n.y - 17})`}
        >
          <rect width="92" height="34" rx="8" />
          <text x="10" y="14" className="en-tree-tag">
            {n.tag}
          </text>
          <text x="10" y="26" className="en-tree-label">
            {n.label}
          </text>
          <circle cx="80" cy="12" r="3.2" className="en-tree-status" />
        </g>
      ))}
    </svg>
  );
}

/* ─── consumption distribution: one donut per source, one gauge per meter ── */
const SOURCE_METERS = [
  { name: "ELECTRICITY_METER_002", value: 8420.6 },
  { name: "ELECTRICITY_METER_018", value: 6210.3 },
  { name: "ELECTRICITY_METER_005", value: 4102.0 },
  { name: "ELECTRICITY_METER_011", value: 2582.5 },
];
const SHADES = ["#8a6a26", "#b08a3e", "#cda658", "#e6cd94"];
const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

function Donut() {
  const total = SOURCE_METERS.reduce((s, m) => s + m.value, 0);
  const size = 168;
  const stroke = 20;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="en-donut">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" className="en-track" strokeWidth={stroke} />
          {SOURCE_METERS.map((m, i) => {
            const len = (m.value / total) * c;
            const dash = Math.max(0, len - 3);
            const el = (
              <circle
                key={m.name}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={SHADES[i]}
                strokeWidth={stroke}
                strokeDasharray={`${dash} ${c - dash}`}
                strokeDashoffset={-offset}
                className="en-donut-seg"
                style={{ ["--d" as string]: `${i * 120}ms` }}
              />
            );
            offset += len;
            return el;
          })}
        </g>
      </svg>
      <div className="en-donut-mid">
        <b>{fmt(total)}</b>
        <span>kWh · Grid</span>
      </div>
    </div>
  );
}

function Gauge({ pct, color }: { pct: number; color: string }) {
  const size = 66;
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const arc = c * 0.75;
  return (
    <div className="en-gauge">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <g transform={`rotate(135 ${size / 2} ${size / 2})`}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" className="en-track" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={`${arc} ${c}`} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${(arc * pct) / 100} ${c}`}
            className="en-gauge-fill"
          />
        </g>
      </svg>
      <span>{pct.toFixed(0)}%</span>
    </div>
  );
}

function SourceDistribution() {
  const total = SOURCE_METERS.reduce((s, m) => s + m.value, 0);
  return (
    <div className="en-dist" role="img" aria-label="Example of the consumption distribution of one energy source: a donut per source and a gauge per meter">
      <div className="en-dist-head">
        <span className="en-dist-icon">
          <Icon name="zap" size={16} />
        </span>
        <div>
          <strong>Grid</strong>
          <small>Electric · 4 meters · October</small>
        </div>
        <span className="en-dist-share">58% of Electric</span>
      </div>
      <div className="en-dist-body">
        <Donut />
        <ul className="en-dist-meters">
          {SOURCE_METERS.map((m, i) => (
            <li key={m.name}>
              <Gauge pct={(m.value / total) * 100} color={SHADES[i]} />
              <div>
                <strong>{m.name}</strong>
                <small>{fmt(m.value)} kWh</small>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <p className="en-dist-note">Illustrative values. Totals are kept per meter type, so different units are never added together.</p>
    </div>
  );
}

export default function Diagrams() {
  return (
    <section id="diagrams" className="en-sec en-light">
      <div className="en-wrap">
        <SectionHead
          index="03"
          label="Diagrams"
          title={
            <>
              Know how meters connect — <em>and what powers them</em>
            </>
          }
          lead="Two live diagrams built from your own meter register: the Single Line Diagram draws the parent/child hierarchy, and Energy Sources shows which source feeds which meter and how consumption is shared."
        />

        {/* Single Line Diagram */}
        <div className="en-diagram">
          <div className="en-diagram-copy en-reveal">
            <p className="en-kicker">
              <Icon name="network" size={15} /> Single Line Diagram
            </p>
            <h3>Main meters, child meters and sub-meters</h3>
            <p>
              Your complete metering hierarchy, level by level, from main incomers down to tenant sub-meters, across
              every utility. Inactive links are dashed and broken links are flagged for review.
            </p>
            <HierarchyArt />
          </div>
          <div className="en-reveal" style={{ ["--d" as string]: "120ms" }}>
            <Shot k="singleLineDiagram" title="Single Line Diagram" sizes="(max-width: 1000px) 94vw, 700px" />
          </div>
        </div>
        <div className="en-point-grid">
          {SLD_POINTS.map((p, i) => (
            <div key={p.title} className="en-point en-reveal" style={{ ["--d" as string]: `${i * 70}ms` }}>
              <Icon name={p.icon} size={18} />
              <strong>{p.title}</strong>
              <p>{p.text}</p>
            </div>
          ))}
        </div>

        {/* Energy Sources */}
        <div className="en-diagram is-flipped">
          <div className="en-diagram-copy en-reveal">
            <p className="en-kicker">
              <Icon name="plug" size={15} /> Energy Sources
            </p>
            <h3>Every meter, traced to its energy source</h3>
            <p>
              Meters are grouped by meter type and energy source, so you see at a glance what runs on the grid, solar,
              a generator or UPS — and which meters still need a source. Each source shows its consumption
              distribution: a donut of its meters and a gauge with every meter&apos;s share, for the month or the year.
            </p>
            <SourceDistribution />
          </div>
          <div className="en-reveal" style={{ ["--d" as string]: "120ms" }}>
            <Shot k="energySourcesDiagram" title="Energy Sources" sizes="(max-width: 1000px) 94vw, 700px" />
            <p className="en-caption">
              Each source card lists its meters, how many are active and its share, with every connected meter&apos;s
              status, category, space, building and parent meter.
            </p>
          </div>
        </div>
        <div className="en-source-grid">
          {SOURCE_GROUPS.map((g, i) => (
            <div key={g.utility} className={`en-source en-u-${g.key} en-reveal`} style={{ ["--d" as string]: `${i * 70}ms` }}>
              <span className="en-source-icon">
                <Icon name={g.icon} size={17} />
              </span>
              <strong>{g.utility}</strong>
              <p>{g.sources}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
