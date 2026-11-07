import Icon from "./Icon";
import SectionHead from "./SectionHead";
import { FEATURES, WORKFLOW } from "@/lib/content";

export default function Features() {
  return (
    <section id="features" className="en-sec en-light">
      <div className="en-wrap">
        <SectionHead
          index="01"
          label="Platform overview"
          title={
            <>
              From meter reading to <em>paid bill</em>, in one place
            </>
          }
          lead="Enerceon follows your energy from the meter to the money: monitor and analyse every utility, understand how meters connect, then bill, send and collect — without switching tools."
        />

        <ol className="en-flow" aria-label="How Enerceon works">
          {WORKFLOW.map((step, i) => (
            <li key={step.title} className="en-flow-step en-reveal" style={{ ["--d" as string]: `${i * 90}ms` }}>
              <span className="en-flow-icon">
                <Icon name={step.icon} size={22} />
                <i className="en-flow-num">{i + 1}</i>
              </span>
              <strong>{step.title}</strong>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="en-subhead en-reveal">
          <h3>Everything Enerceon does</h3>
          <p>Select a feature to see it in the software.</p>
        </div>

        <div className="en-feature-grid">
          {FEATURES.map((f, i) => (
            <a
              key={f.title}
              href={f.href}
              className="en-feature en-reveal"
              style={{ ["--d" as string]: `${(i % 4) * 60}ms` }}
            >
              <span className="en-feature-icon">
                <Icon name={f.icon} size={20} />
              </span>
              <span className="en-feature-tag">{f.tag}</span>
              <strong>{f.title}</strong>
              <p>{f.text}</p>
              <span className="en-feature-more">
                See it <Icon name="arrowRight" size={14} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
