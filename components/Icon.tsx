import type { SVGProps } from "react";

/** Line icons (24 × 24, 1.8 stroke) drawn inline so the site needs no icon package. */
const PATHS = {
  zap: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  droplet: <path d="M12 2.7s6.5 7 6.5 11.6a6.5 6.5 0 1 1-13 0C5.5 9.7 12 2.7 12 2.7Z" />,
  flame: (
    <path d="M12 22c4 0 7-2.8 7-6.8 0-3.8-2.6-6.2-4.3-8.2-.4 2.3-1.6 3.7-3 4.4C12 8.6 10.6 5 8 2.5 8.3 6.6 5 9.4 5 14.6 5 19 8 22 12 22Z" />
  ),
  snowflake: (
    <>
      <path d="M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11" />
      <path d="m9 3.5 3 2.5 3-2.5M9 20.5l3-2.5 3 2.5" />
    </>
  ),
  gauge: (
    <>
      <path d="M12 14l4-4" />
      <path d="M3.3 17a9 9 0 1 1 17.4 0" />
      <circle cx="12" cy="14" r="1.6" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 15v2M11 10v7M15 6v11M19 12v5" />
    </>
  ),
  activity: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  network: (
    <>
      <rect x="9" y="2.5" width="6" height="5" rx="1.2" />
      <rect x="2.5" y="16.5" width="6" height="5" rx="1.2" />
      <rect x="15.5" y="16.5" width="6" height="5" rx="1.2" />
      <path d="M12 7.5v4.5M5.5 16.5V12h13v4.5" />
    </>
  ),
  plug: (
    <>
      <path d="M9 2v5M15 2v5" />
      <path d="M6 7h12v4a6 6 0 0 1-12 0V7Z" />
      <path d="M12 17v5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20.5c.6-3.6 3.3-5.5 6.5-5.5s5.9 1.9 6.5 5.5" />
      <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 15.3c1.9.7 3.2 2.5 3.5 5.2" />
    </>
  ),
  fileText: (
    <>
      <path d="M14 2.5H6.5A1.5 1.5 0 0 0 5 4v16a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 20V7.5L14 2.5Z" />
      <path d="M14 2.5v5h5M8.5 12.5h7M8.5 16.5h7M8.5 8.5h2" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </>
  ),
  history: (
    <>
      <path d="M3 12a9 9 0 1 0 2.6-6.4L3 8" />
      <path d="M3 3v5h5M12 7v5l3.5 2" />
    </>
  ),
  send: (
    <>
      <path d="M22 2 11 13" />
      <path d="m22 2-7 20-4-9-9-4 20-7Z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
    </>
  ),
  wallet: (
    <>
      <path d="M20 7V5.5A1.5 1.5 0 0 0 18.5 4h-13A2.5 2.5 0 0 0 3 6.5v11A2.5 2.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V17" />
      <path d="M3 6.5A2.5 2.5 0 0 0 5.5 9H20a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-4a3 3 0 0 1 0-6h5" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H4.5a2.5 2.5 0 0 0 2.6 4M17 6h2.5a2.5 2.5 0 0 1-2.6 4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4.5" width="18" height="16.5" rx="2" />
      <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
    </>
  ),
  layers: (
    <>
      <path d="m12 2.5 9.5 5-9.5 5-9.5-5 9.5-5Z" />
      <path d="m2.5 12 9.5 5 9.5-5M2.5 16.5l9.5 5 9.5-5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20.5 20.5-4.5-4.5" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="10.5" width="16" height="11" rx="2" />
      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
    </>
  ),
  alert: (
    <>
      <path d="M10.3 3.9 1.9 18a2 2 0 0 0 1.7 3h16.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4M12 17h.01" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M3.5 20.5 5 16.3A8.5 8.5 0 1 1 8 19.2l-4.5 1.3Z" />
      <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 1a4.5 4.5 0 0 1-2.4-2.4l1-1-1-2L9 8.5Z" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  refresh: (
    <>
      <path d="M21 12a9 9 0 0 1-15.4 6.4L3 16" />
      <path d="M3 12a9 9 0 0 1 15.4-6.4L21 8" />
      <path d="M21 3v5h-5M3 21v-5h5" />
    </>
  ),
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowDown: <path d="M12 5v14M6 13l6 6 6-6" />,
  external: (
    <>
      <path d="M14 3h7v7M21 3l-9 9" />
      <path d="M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" />
    </>
  ),
  play: <path d="M7 4.5v15l12-7.5-12-7.5Z" />,
  maximize: <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" />,
  minimize: <path d="M3 8h5V3M21 8h-5V3M3 16h5v5M21 16h-5v5" />,
  x: <path d="M18 6 6 18M6 6l12 12" />,
  menu: <path d="M3 6.5h18M3 12h18M3 17.5h18" />,
  monitor: (
    <>
      <rect x="2.5" y="3.5" width="19" height="13" rx="2" />
      <path d="M8 21h8M12 16.5V21" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z" />,
  building: (
    <>
      <path d="M4 21V4.5A1.5 1.5 0 0 1 5.5 3h8A1.5 1.5 0 0 1 15 4.5V21M15 9h3.5A1.5 1.5 0 0 1 20 10.5V21M2.5 21h19" />
      <path d="M8 7h3M8 11h3M8 15h3" />
    </>
  ),
  zoom: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20.5 20.5-4.5-4.5M11 8v6M8 11h6" />
    </>
  ),
} as const;

export type IconName = keyof typeof PATHS;

export default function Icon({
  name,
  size = 20,
  ...rest
}: { name: IconName; size?: number } & Omit<SVGProps<SVGSVGElement>, "name">) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}
