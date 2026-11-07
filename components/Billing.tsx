import Icon from "./Icon";
import SectionHead from "./SectionHead";
import Shot from "./Shot";
import Showcase from "./Showcase";
import { BILL_HIGHLIGHTS, BILL_STEPS, BILLING_TABS, DELIVERY } from "@/lib/content";

export default function Billing() {
  return (
    <section id="billing" className="en-sec en-light">
      <div className="en-wrap">
        <SectionHead
          index="05"
          label="Billing"
          title={
            <>
              Professional utility bills, <em>built in seven steps</em>
            </>
          }
          lead="The Bill Builder turns saved consumption into a clear, priced bill for one account — peak and off-peak, tax, discounts and late payment included — with a live preview as you choose."
        />

        <div className="en-builder">
          <ol className="en-steps en-reveal">
            {BILL_STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="en-step-num">{i + 1}</span>
                <div>
                  <strong>{s.title}</strong>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="en-builder-media en-reveal" style={{ ["--d" as string]: "120ms" }}>
            <Shot k="billBuilder" chrome={false} sizes="220px" className="en-builder-panel" />
            <Shot k="billPreview" title="Bill preview" sizes="(max-width: 1000px) 80vw, 520px" className="en-builder-bill" />
          </div>

          <ul className="en-highlights en-reveal" style={{ ["--d" as string]: "200ms" }}>
            {BILL_HIGHLIGHTS.map((h) => (
              <li key={h}>
                <Icon name="check" size={15} />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="en-subhead en-reveal">
          <h3>Billing Management</h3>
          <p>Overview, history, payments, missing bills and every tenant&apos;s billing history.</p>
        </div>
        <Showcase tabs={BILLING_TABS} tone="light" label="Billing Management" />

        <div id="distribution" className="en-delivery">
          <div className="en-delivery-head en-reveal">
            <p className="en-kicker">
              <Icon name="send" size={15} /> Bill distribution
            </p>
            <h3>
              Deliver bills by <em>E-mail</em> or <em>WhatsApp</em>
            </h3>
            <p>
              Send any saved bill straight to the account from Bill History, with the bill PDF attached, and keep a
              record of every delivery. The dialog shows the amount payable by and after the due date before you send.
            </p>
          </div>
          <div className="en-delivery-grid">
            {DELIVERY.map((d, i) => (
              <article key={d.channel} className="en-channel en-reveal" style={{ ["--d" as string]: `${i * 120}ms` }}>
                <header>
                  <span className={`en-channel-icon is-${d.channel === "E-mail" ? "mail" : "wa"}`}>
                    <Icon name={d.icon} size={18} />
                  </span>
                  <strong>{d.channel}</strong>
                </header>
                <Shot k={d.shot} chrome={false} sizes="(max-width: 800px) 90vw, 420px" />
                <ul className="en-checks">
                  {d.points.map((p) => (
                    <li key={p}>
                      <Icon name="check" size={15} />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="en-fineprint">Screens shown with fictional demo data.</p>
        </div>
      </div>
    </section>
  );
}
