import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

const PAGE_TITLE = "Enerceon — Energy Intelligence & Management Platform";
const SHORT_PITCH =
  "Every meter. Every tenant. Every bill. Monitor electricity, water, gas and BTU/cooling, analyse tenant consumption, and create, send and collect utility bills — in one web-based platform.";

const OG_IMAGE = {
  url: "/assets/og-enerceon.png",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: PAGE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  category: "technology",
  authors: [{ name: "VizualTech" }],
  creator: "VizualTech",
  publisher: "VizualTech",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    title: PAGE_TITLE,
    description: SHORT_PITCH,
    url: "/",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: SHORT_PITCH,
    images: [OG_IMAGE],
  },
  appleWebApp: { capable: true, title: SITE_NAME, statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#18181b",
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/assets/enerceon-logo-tagline.png`,
      image: `${SITE_URL}/assets/og-enerceon.png`,
      description: SITE_DESCRIPTION,
      slogan: SITE_TAGLINE,
      parentOrganization: { "@type": "Organization", name: "VizualTech" },
      contactPoint: [
        { "@type": "ContactPoint", contactType: "sales", email: "sales@enerceon.com" },
        { "@type": "ContactPoint", contactType: "technical support", email: "support@enerceon.com" },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#site`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: PAGE_TITLE,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      isPartOf: { "@id": `${SITE_URL}/#site` },
      about: { "@id": `${SITE_URL}/#org` },
      primaryImageOfPage: `${SITE_URL}/assets/og-enerceon.png`,
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#app`,
      name: SITE_NAME,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Energy Management Software",
      operatingSystem: "Web browser",
      url: `${SITE_URL}/`,
      publisher: { "@id": `${SITE_URL}/#org` },
      description:
        "Web-based energy intelligence and management platform for multi-utility monitoring, tenant consumption analytics, meter hierarchy diagrams and utility billing.",
      featureList: [
        "Electricity, water, gas and BTU/cooling monitoring",
        "Live monitoring: live, peak and average power, meter status, 15-minute intervals",
        "All Tenants Ranking, All Tenants Yearly and Tenant Meters Consumption dashboards",
        "Single Line Diagram of main, child and sub-meters",
        "Energy Sources diagram with consumption distribution",
        "Meter Management and User Management",
        "Accounts Management: Tenant, Building Owner and Building Management",
        "Bill Builder with peak and off-peak tariffs, tax, discounts and late payment",
        "Billing Overview, Bill History, Payments, Missing Bills and Tenant History",
        "Bill delivery by e-mail and WhatsApp",
        "Light and dark mode",
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plexSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <noscript>
          <style>{`.en-reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
