"use client";

import { PROJECTS } from "@/lib/content";
import { container, eyebrow, reveal, sectionBody, sectionPad, sectionTitle } from "./styles";

const DELAYS = [0, 0.06, 0.12, 0, 0.06, 0.12];

type Props = {
  project: number;
  onPickProject: (index: number) => void;
};

export default function Projects({ project, onPickProject }: Props) {
  return (
    <section id="projects" data-tone="b" style={{ background: "#061424", padding: sectionPad }}>
      <div style={container}>
        <div
          className="en-reveal"
          style={{ ...reveal(), maxWidth: "760px", marginBottom: "clamp(24px,5vw,44px)" }}
        >
          <div data-t="mono" className="en-mono" style={eyebrow}>
            07 / Projects
          </div>
          <h2 data-t="title" className="en-display" style={sectionTitle}>
            Where Enerceon runs today.
          </h2>
          <p data-t="body" style={sectionBody}>
            Select a project to read the quote it came with — placeholder references for now, ready to
            swap for your live portfolio.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))",
            gap: "13px",
          }}
        >
          {PROJECTS.map((item, i) => (
            <article
              key={item.name}
              className="en-reveal"
              style={reveal(0, 0.7, DELAYS[i])}
            >
              <div
                onClick={() => onPickProject(i)}
                className={`en-project${project === i ? " is-active" : ""}`}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                    alignItems: "flex-start",
                  }}
                >
                  <h3
                    data-t="title"
                    className="en-display"
                    style={{ fontSize: "18px", fontWeight: 600, margin: 0, color: "#fff" }}
                  >
                    {item.name}
                  </h3>
                  <span
                    data-t="accent"
                    className="en-mono"
                    style={{ fontSize: "10px", color: "#57D8EE" }}
                  >
                    {item.tag}
                  </span>
                </div>

                <p
                  data-t="body"
                  style={{
                    margin: "8px 0 0",
                    fontSize: "13.5px",
                    lineHeight: 1.6,
                    color: "#93AABE",
                  }}
                >
                  {item.scale}
                </p>

                <div
                  data-line=""
                  style={{
                    display: "flex",
                    gap: "14px",
                    flexWrap: "wrap",
                    marginTop: "14px",
                    paddingTop: "14px",
                    borderTop: "1px solid rgba(255,255,255,.09)",
                  }}
                >
                  <span
                    data-t="dim"
                    className="en-mono"
                    style={{ fontSize: "10.5px", color: "#6F889E" }}
                  >
                    {item.meters}
                  </span>
                  <span
                    data-t="dim"
                    className="en-mono"
                    style={{ fontSize: "10.5px", color: "#6F889E" }}
                  >
                    {item.utils}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                    marginTop: "12px",
                  }}
                >
                  <b
                    data-t="pos"
                    className="en-display"
                    style={{ fontSize: "15px", color: "#2ECC71" }}
                  >
                    {item.out}
                  </b>
                  <a
                    data-t="accent"
                    href="#voices"
                    onClick={() => onPickProject(i)}
                    style={{ fontSize: "12.5px", color: "#57D8EE" }}
                  >
                    Read their words →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
