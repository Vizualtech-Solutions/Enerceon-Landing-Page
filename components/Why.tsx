import Icon from "./Icon";
import SectionHead from "./SectionHead";
import { BUILT_FOR, VALUES } from "@/lib/content";

export default function Why() {
  return (
    <section id="why" className="en-sec en-dark en-why">
      <div className="en-wrap">
        <SectionHead
          index="06"
          label="Why Enerceon"
          title={
            <>
              Accurate bills, faster collection, <em>full visibility</em>
            </>
          }
          center
        />
        <div className="en-value-grid">
          {VALUES.map((v, i) => (
            <div key={v.title} className="en-value en-reveal" style={{ ["--d" as string]: `${(i % 3) * 80}ms` }}>
              <span className="en-value-icon">
                <Icon name={v.icon} size={20} />
              </span>
              <strong>{v.title}</strong>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
        <div className="en-built en-reveal">
          <p className="en-eyebrow">Built for</p>
          <ul>
            {BUILT_FOR.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
