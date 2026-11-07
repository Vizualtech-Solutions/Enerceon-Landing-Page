import type { Metadata } from "next";
import Link from "next/link";

// A real 404 with a genuine status code, so crawlers never treat a missing URL as
// a thin duplicate of the home page.
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="en-notfound">
      <div>
        <p className="en-eyebrow">Error 404</p>
        <h1>That page isn&apos;t on the grid.</h1>
        <p>
          The link may be out of date. Head back to the Enerceon overview to pick up where you left
          off.
        </p>
        <Link href="/" className="en-btn en-btn-gold">
          Back to Enerceon <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}
