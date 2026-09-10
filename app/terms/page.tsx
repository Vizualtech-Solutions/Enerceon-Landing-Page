import type { Metadata } from "next";
import Link from "next/link";
import Disclosure from "@/components/Disclosure";
import PageShell, { proseP } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Terms of use",
  description:
    "The terms that apply to visitors of www.enerceon.com, the marketing website for Enerceon, a VizualTech product.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Terms"
      title="Terms of use"
      intro="These terms apply to this website. They are not the agreement under which the Enerceon platform itself is licensed — that is a separate contract."
      updated="6 September 2026"
      aside={
        <div className="en-fact">
          <p
            data-t="dim"
            className="en-mono"
            style={{ fontSize: "10px", letterSpacing: "1.3px", color: "#6F889E", margin: "0 0 8px" }}
          >
            THE SHORT VERSION
          </p>
          <p data-t="body" style={{ ...proseP, margin: 0, fontSize: "14.5px" }}>
            The dashboards and figures shown on this site are illustrative samples, not customer
            records. Sending an enquiry does not create a contract. Everything here is published by{" "}
            <strong>VizualTech</strong>.
          </p>
        </div>
      }
    >
      <Disclosure index={1} title="About this site" defaultOpen delay={40}>
        <p data-t="body" style={{ ...proseP, margin: 0 }}>
          www.enerceon.com is published by <strong>VizualTech</strong> to describe Enerceon. It is
          informational. Using it means accepting these terms; if you do not accept them, please stop
          using the site.
        </p>
      </Disclosure>

      <Disclosure index={2} title="Illustrative content" delay={70}>
        <p data-t="body" style={{ ...proseP, margin: 0 }}>
          The dashboards, charts, figures, project references and quotations shown on this site are{" "}
          <strong>illustrative samples</strong> used to demonstrate the interface. They are not
          records of a specific customer deployment and should not be read as performance guarantees,
          benchmarks or endorsements. Ask us for a demonstration to see the product against real
          data.
        </p>
      </Disclosure>

      <Disclosure index={3} title="No warranty" delay={100}>
        <p data-t="body" style={{ ...proseP, margin: 0 }}>
          We take care to keep this site accurate and available, but provide it &ldquo;as is&rdquo;.
          We do not warrant that it will be uninterrupted or error-free, and specifications described
          here may change as the product develops. Nothing on this site is technical, commercial or
          legal advice.
        </p>
      </Disclosure>

      <Disclosure index={4} title="Enquiries are not a contract" delay={130}>
        <p data-t="body" style={{ ...proseP, margin: 0 }}>
          Submitting the demo form, or any other enquiry, does not create a contract and does not
          oblige either of us to proceed. Pricing, scope and terms are agreed separately in writing.
        </p>
      </Disclosure>

      <Disclosure index={5} title="Intellectual property" delay={160}>
        <p data-t="body" style={{ ...proseP, margin: 0 }}>
          The Enerceon name, logo, interface designs, text and images on this site belong to
          VizualTech or its licensors. You may view, quote and link to this site for ordinary
          business purposes with attribution. You may not copy it wholesale, present it as your own,
          or use our branding to imply a relationship that does not exist.
        </p>
      </Disclosure>

      <Disclosure index={6} title="Acceptable use" delay={190}>
        <ul>
          <li>Do not attempt to disrupt, overload or gain unauthorised access to the site.</li>
          <li>Do not submit false details, other people&apos;s data, or unlawful content.</li>
          <li>Do not use the demo form to send bulk, automated or promotional messages.</li>
          <li>Do not scrape the site in a way that degrades it for other visitors.</li>
        </ul>
      </Disclosure>

      <Disclosure index={7} title="Links to other sites" delay={220}>
        <p data-t="body" style={{ ...proseP, margin: 0 }}>
          Where we link to a third party we do so for convenience. We do not control those sites and
          are not responsible for their content or their handling of your data.
        </p>
      </Disclosure>

      <Disclosure index={8} title="Changes and contact" delay={250}>
        <p data-t="body" style={proseP}>
          We may update these terms. The date at the top of this page shows when they last changed,
          and continuing to use the site after a change means accepting the revised terms.
        </p>
        <p data-t="body" style={{ ...proseP, margin: 0 }}>
          Questions go to <a href="mailto:sales@enerceon.com">sales@enerceon.com</a>. See also our{" "}
          <Link href="/privacy">privacy notice</Link>.
        </p>
      </Disclosure>
    </PageShell>
  );
}
