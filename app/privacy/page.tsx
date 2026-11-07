import type { Metadata } from "next";
import Disclosure from "@/components/Disclosure";
import PageShell, { proseP } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Privacy notice",
  description:
    "How Enerceon, a VizualTech product, handles the information you send through this website — what is collected, why, who processes it and how to reach us.",
  alternates: { canonical: "/privacy" },
};

const FACTS = [
  { k: "No tracking cookies", v: "None set, and no third-party analytics." },
  { k: "Used only to reply", v: "Never sold, rented or profiled for ads." },
  { k: "Deleted on request", v: "Email us and we action it." },
];

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Privacy"
      title="Privacy notice"
      intro="What this website collects, why, and who else handles it. Covers www.enerceon.com only — not the Enerceon platform as deployed inside a customer environment."
      updated="7 November 2026"
    >
      <div className="en-card-grid en-rise" style={{ marginBottom: "clamp(22px,4vw,34px)" }}>
        {FACTS.map((f, i) => (
          <div key={f.k} className="en-fact" style={{ ["--d" as string]: `${i * 70}ms` }}>
            <p
              data-t="title"
              className="en-display"
              style={{ fontSize: "15px", fontWeight: 600, color: "#fff", margin: "0 0 5px" }}
            >
              {f.k}
            </p>
            <p data-t="body" style={{ ...proseP, margin: 0, fontSize: "13.5px" }}>
              {f.v}
            </p>
          </div>
        ))}
      </div>

      <Disclosure index={1} title="Who is responsible" defaultOpen delay={40}>
        <p data-t="body" style={proseP}>
          This website is operated by <strong>VizualTech</strong>, which publishes Enerceon. For any
          question about this notice, or about information you have sent us, email{" "}
          <a href="mailto:sales@enerceon.com">sales@enerceon.com</a>.
        </p>
      </Disclosure>

      <Disclosure index={2} title="What we collect" delay={80}>
        <ul>
          <li>
            <strong>Demo requests.</strong> The name, work email, company and message you type into
            the form. Nothing else is added to that submission.
          </li>
          <li>
            <strong>Email you send us.</strong> Correspondence to sales@ or support@enerceon.com,
            held so we can reply.
          </li>
          <li>
            <strong>Server logs.</strong> Our host records standard request data — IP address,
            timestamp, requested URL, user agent — for security and reliability.
          </li>
        </ul>
        <p data-t="body" style={{ ...proseP, margin: 0 }}>
          We do not ask for, and this site has no way to collect, payment details or any special
          category of personal data.
        </p>
      </Disclosure>

      <Disclosure index={3} title="Why we use it" delay={110}>
        <p data-t="body" style={{ ...proseP, margin: 0 }}>
          Solely to answer your enquiry, arrange a demonstration and continue that conversation. We
          do not sell it, rent it, or use it to build advertising profiles, and we do not add you to
          a marketing list on the strength of a demo request alone.
        </p>
      </Disclosure>

      <Disclosure index={4} title="Who else handles it" delay={140}>
        <ul>
          <li>
            <strong>Web3Forms</strong> delivers the demo form to our inbox — your submission passes
            through their systems.
          </li>
          <li>
            <strong>Vercel</strong> hosts this website and processes the server logs above.
          </li>
        </ul>
        <p data-t="body" style={{ ...proseP, margin: 0 }}>
          Both act as processors on our behalf. We share your details with nobody else unless legally
          required to.
        </p>
      </Disclosure>

      <Disclosure index={5} title="Cookies and local storage" delay={170}>
        <p data-t="body" style={{ ...proseP, margin: 0 }}>
          This site sets no cookies of its own, runs no advertising or third-party analytics and
          stores nothing in your browser. If you press <strong>Launch Live Preview</strong>, the
          Enerceon registration page is loaded from the Enerceon application server inside the page;
          anything you type there is sent to that application, not to this website.
        </p>
      </Disclosure>

      <Disclosure index={6} title="How long we keep it" delay={200}>
        <p data-t="body" style={{ ...proseP, margin: 0 }}>
          Enquiry correspondence is kept for as long as it takes to deal with your request, and a
          reasonable period afterwards in case you come back to us. Ask us to delete it sooner and we
          will. Server logs follow our host&apos;s standard retention schedule.
        </p>
      </Disclosure>

      <Disclosure index={7} title="Your choices" delay={230}>
        <p data-t="body" style={{ ...proseP, margin: 0 }}>
          You can ask for a copy of what we hold about you, ask us to correct it, or ask us to delete
          it. Email <a href="mailto:sales@enerceon.com">sales@enerceon.com</a> and we will action it.
          Depending on where you live, you may also have the right to complain to a data protection
          authority.
        </p>
      </Disclosure>

      <Disclosure index={8} title="Changes to this notice" delay={260}>
        <p data-t="body" style={{ ...proseP, margin: 0 }}>
          If this notice changes we update the date shown at the top of this page. Material changes
          are described here rather than made quietly.
        </p>
      </Disclosure>
    </PageShell>
  );
}
