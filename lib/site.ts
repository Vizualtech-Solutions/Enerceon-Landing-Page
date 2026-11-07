/** Single source of truth for the canonical origin, shared by metadata,
 *  robots.txt, the sitemap and the JSON-LD graph. */
export const SITE_URL = "https://www.enerceon.com";
export const SITE_NAME = "Enerceon";
export const SITE_TAGLINE = "Your Energy. Reimagined.";
export const SITE_DESCRIPTION =
  "Enerceon is a web-based energy intelligence and management platform: monitor electricity, water, gas and BTU/cooling meters, rank and analyse tenant consumption, map meter hierarchies and energy sources, and create, send and collect utility bills by e-mail or WhatsApp.";

/**
 * Live Preview — the real Enerceon registration page of the running Enerceon
 * web app (not a copy). The Enerceon app keeps its own port (3000); this
 * website runs on port 7000. Override per deployment in `.env.local`:
 *
 *   NEXT_PUBLIC_ENERCEON_APP_URL=https://app.your-domain.com/registration
 *
 * NEXT_PUBLIC_ values are built into the page, so only put the public address
 * of the page here — never a user name, password or token.
 */
export const APP_LOGIN_URL =
  process.env.NEXT_PUBLIC_ENERCEON_APP_URL?.trim() || "http://192.168.100.202:3000/registration";

export const SALES_EMAIL = "sales@enerceon.com";
export const SUPPORT_EMAIL = "support@enerceon.com";
