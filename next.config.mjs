import os from "node:os";

/**
 * Network access in development
 * ─────────────────────────────
 * `next dev` only serves its scripts (/_next/*) to origins it trusts. Opening the
 * site from a phone uses the laptop's Wi-Fi address (e.g. http://192.168.100.25:7000),
 * and if that address is not trusted the phone gets the HTML without JavaScript.
 * The previous list was fixed by hand, so it broke whenever the laptop's address
 * was different. It is now built automatically from:
 *   1. every IPv4 address of this computer (detected at start-up),
 *   2. the private LAN ranges, so a new DHCP address keeps working,
 *   3. optional extra hosts in ALLOWED_DEV_ORIGINS (comma separated) in .env.local.
 * This only affects `next dev`; production (`next start`) has no such check.
 */
const localAddresses = Object.values(os.networkInterfaces())
  .flat()
  .filter((net) => net && net.family === "IPv4" && !net.internal)
  .map((net) => net.address);

const extraOrigins = (process.env.ALLOWED_DEV_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const allowedDevOrigins = [
  ...new Set([
    "localhost",
    "127.0.0.1",
    ...localAddresses,
    "192.168.*.*",
    "10.*.*.*",
    "172.16.*.*",
    "172.17.*.*",
    "172.18.*.*",
    "172.19.*.*",
    "172.20.*.*",
    "172.21.*.*",
    "172.22.*.*",
    "172.23.*.*",
    "172.24.*.*",
    "172.25.*.*",
    "172.26.*.*",
    "172.27.*.*",
    "172.28.*.*",
    "172.29.*.*",
    "172.30.*.*",
    "172.31.*.*",
    "*.local",
    ...extraOrigins,
  ]),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins,
  async redirects() {
    return [
      // The site is a single page now: the old standalone pages point to their sections.
      { source: "/about", destination: "/#features", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      // The production *.vercel.app alias serves the same pages with no noindex
      // header, so it is a crawlable duplicate of the custom domain. Send it to
      // the canonical host. Preview deployments use different hostnames and are
      // unaffected by this exact-host match.
      {
        source: "/:path*",
        has: [{ type: "host", value: "enerceon.vercel.app" }],
        destination: "https://www.enerceon.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
