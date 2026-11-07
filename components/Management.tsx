import Icon from "./Icon";
import SectionHead from "./SectionHead";
import Shot from "./Shot";
import Showcase from "./Showcase";
import { ACCOUNT_POINTS, ACCOUNT_TYPES, MANAGEMENT_TABS } from "@/lib/content";

export default function Management() {
  return (
    <section id="management" className="en-sec en-dark">
      <div className="en-wrap">
        <SectionHead
          index="04"
          label="Accounts & management"
          title={
            <>
              Three account types, <em>clear billing responsibility</em>
            </>
          }
          lead="Every bill is issued to one account, so each charge reaches the party responsible for that consumption. Meters, users and settings are managed in the same place."
        />

        <div className="en-accounts">
          <div className="en-account-types">
            {ACCOUNT_TYPES.map((a, i) => (
              <div key={a.key} className={`en-account en-acc-${a.key} en-reveal`} style={{ ["--d" as string]: `${i * 80}ms` }}>
                <span className="en-badge">{a.label}</span>
                <strong>{a.label}</strong>
                <p>{a.text}</p>
              </div>
            ))}
            <ul className="en-account-points en-reveal">
              {ACCOUNT_POINTS.map((p) => (
                <li key={p.title}>
                  <Icon name={p.icon} size={17} />
                  <div>
                    <strong>{p.title}</strong>
                    <p>{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="en-reveal" style={{ ["--d" as string]: "120ms" }}>
            <Shot k="accountsManagement" title="Accounts Management" sizes="(max-width: 1000px) 94vw, 680px" />
          </div>
        </div>

        <div className="en-subhead en-reveal">
          <h3>Meters, users and settings</h3>
          <p>Register and control every meter, give every person the right access, and configure once.</p>
        </div>
        <Showcase tabs={MANAGEMENT_TABS} tone="dark" label="Management" />
      </div>
    </section>
  );
}
