import Image from "next/image";
import Icon, { type IconName } from "./Icon";
import SectionHead from "./SectionHead";
import { APP_LOGIN_URL } from "@/lib/site";
import { SCREENS } from "@/lib/screens";

/** Only http(s) addresses are opened; anything else is treated as not configured. */
function parseUrl(raw: string): URL | null {
  try {
    const url = new URL(raw);
    return url.protocol === "https:" || url.protocol === "http:" ? url : null;
  } catch {
    return null;
  }
}

const TRY: { label: string; icon: IconName }[] = [
  { label: "Tenant ranking & yearly trends", icon: "chart" },
  { label: "Live power monitoring", icon: "activity" },
  { label: "Single Line Diagram", icon: "network" },
  { label: "Energy Sources", icon: "plug" },
  { label: "Bill Builder", icon: "fileText" },
  { label: "E-mail & WhatsApp delivery", icon: "send" },
];

/**
 * Live Preview — invites visitors to open the real Enerceon software
 * (NEXT_PUBLIC_ENERCEON_APP_URL) in a new tab. Nothing is embedded.
 */
export default function LivePreview() {
  const url = parseUrl(APP_LOGIN_URL);

  return (
    <section id="live-preview" className="en-sec en-light en-live">
      <div className="en-wrap">
        <SectionHead
          index="07"
          label="Live Preview"
          title={
            <>
              Don&apos;t just read about it — <em>drive it</em>
            </>
          }
          lead="The real Enerceon software, running live. Open it in a new tab and see for yourself how every meter, tenant and bill comes together."
          center
        />

        <div className="en-live-card en-reveal">
          <div className="en-live-copy">
            <p className="en-live-badge">
              <span className="en-dot-live" aria-hidden="true" />
              Live demo · nothing to install
            </p>
            <h3>Step inside Enerceon</h3>
            <p className="en-live-text">
              Skip the slideshow. Click through the actual dashboards, trace any meter back to its main incomer,
              see what each energy source consumes and build a bill in seconds — the same screens your team
              will use every day.
            </p>

            <p className="en-live-try-label">What you can try</p>
            <ul className="en-live-try">
              {TRY.map((t) => (
                <li key={t.label}>
                  <Icon name={t.icon} size={15} />
                  {t.label}
                </li>
              ))}
            </ul>

            <div className="en-live-actions">
              {url ? (
                <a href={url.href} target="_blank" rel="noopener noreferrer" className="en-btn en-btn-gold en-live-cta "style={{ pointerEvents: "none", opacity: 0.5, cursor: "not-allowed" }}> 
                  <Icon name="play" size={16} />
                  Open Live Demo
                  <Icon name="external" size={15} />
                </a>
              ) : (
                <span className="en-btn en-btn-gold en-live-cta" aria-disabled="true">
                  Live demo coming soon
                </span>
              )}
              <a href="#contact" className="en-btn en-btn-ghost">
                Book a guided demo
              </a>
            </div>
            <p className="en-live-help">
              <Icon name="external" size={13} />
              <span>
                Opens in a new tab. Need access? <a href="#contact">Ask our team</a>.
              </span>
            </p>
          </div>

          {/* Static collage of real screens — a link to the live demo, not an embedded app */}
          {url ? (
            <a style={{ pointerEvents: "none", cursor: "not-allowed" }}
              href={url.href}
              target="_blank"
              rel="noopener noreferrer"
              className="en-live-collage"
              aria-label="Open the Enerceon live demo in a new tab"
            >
              <Collage />
            </a>
          ) : (
            <div className="en-live-collage" aria-hidden="true">
              <Collage />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Collage() {
  const back = SCREENS.singleLineDiagram;
  const main = SCREENS.liveMonitoring;
  const front = SCREENS.billPreview;
  return (
    <>
      <span className="en-live-shot is-back">
        <Image src={back.src} alt="" width={back.w} height={back.h} quality={90} sizes="(max-width: 1040px) 60vw, 380px" />
      </span>
      <span className="en-live-shot is-main">
        <Image src={main.src} alt="" width={main.w} height={main.h} quality={90} sizes="(max-width: 1040px) 86vw, 620px" />
      </span>
      <span className="en-live-shot is-front">
        <Image src={front.src} alt="" width={front.w} height={front.h} quality={90} sizes="(max-width: 1040px) 34vw, 220px" />
      </span>
      <span className="en-live-pill" aria-hidden="true">
        <span className="en-dot-live" />
        LIVE
      </span>
      <span className="en-live-open" aria-hidden="true">
        <Icon name="external" size={18} />
      </span>
    </>
  );
}
