/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Dev-only: Next blocks cross-origin requests to /_next/* by default, which
  // leaves the page unhydrated (and so blank) when opened on the network URL.
  allowedDevOrigins: ["192.168.12.1", "192.168.210.1", "192.168.100.8"],
  async redirects() {
    return [
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
