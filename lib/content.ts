export type Series = {
  title: string;
  color: string;
  line: string;
  area: string;
  bars: [number, number, number];
};

export type Step = {
  crumb: string;
  status: string;
  headline: string;
  body: string;
  screen: string;
  metrics: [string, string][];
  p1: string;
  p2: string;
};

export type Quote = {
  text: string;
  name: string;
  role: string;
  initials: string;
};

export type Project = {
  name: string;
  tag: string;
  scale: string;
  meters: string;
  utils: string;
  out: string;
  quote: number;
};

export const SERIES: Series[] = [
  {
    title: "Electricity — hourly load",
    color: "#00C8F5",
    line: "M0,110 C32,104 52,96 72,82 C93,66 116,75 137,67 C158,58 174,70 195,54 C217,38 235,46 257,40 C281,31 296,47 319,39 C344,31 360,17 382,27 C409,40 421,25 444,31 C463,35 481,18 500,21",
    area: "M0,110 C32,104 52,96 72,82 C93,66 116,75 137,67 C158,58 174,70 195,54 C217,38 235,46 257,40 C281,31 296,47 319,39 C344,31 360,17 382,27 C409,40 421,25 444,31 C463,35 481,18 500,21 L500,150 L0,150Z",
    bars: [88, 69, 52],
  },
  {
    title: "Cooling (BTU) — hourly load",
    color: "#2ECC71",
    line: "M0,128 C40,124 68,118 96,104 C124,90 150,96 178,80 C206,64 232,74 260,58 C288,42 314,54 342,44 C370,34 396,48 424,38 C452,28 476,36 500,30",
    area: "M0,128 C40,124 68,118 96,104 C124,90 150,96 178,80 C206,64 232,74 260,58 C288,42 314,54 342,44 C370,34 396,48 424,38 C452,28 476,36 500,30 L500,150 L0,150Z",
    bars: [74, 61, 44],
  },
  {
    title: "Demand (kW) — 24h profile",
    color: "#3B9BFF",
    line: "M0,132 C28,130 44,120 66,118 C90,116 104,72 128,70 C152,68 166,96 190,92 C214,88 228,34 254,36 C280,38 292,86 318,84 C344,82 356,44 382,48 C408,52 422,104 448,106 C472,108 486,124 500,126",
    area: "M0,132 C28,130 44,120 66,118 C90,116 104,72 128,70 C152,68 166,96 190,92 C214,88 228,34 254,36 C280,38 292,86 318,84 C344,82 356,44 382,48 C408,52 422,104 448,106 C472,108 486,124 500,126 L500,150 L0,150Z",
    bars: [92, 58, 66],
  },
];

export const STEPS: Step[] = [
  {
    crumb: "ALL SITES / OVERVIEW",
    status: "STREAMING",
    headline: "Start with the whole portfolio.",
    body: "Totals, demand and open alerts across every connected site — the first screen an operator opens.",
    screen: "enerceon / overview",
    metrics: [
      ["SITES", "23"],
      ["METERS", "1,245"],
      ["ALERTS", "23"],
    ],
    p1: "M0,120 C60,112 100,96 160,92 C220,88 250,66 310,62 C370,58 420,40 500,34",
    p2: "M0,136 C70,132 120,124 180,118 C250,111 300,100 360,94 C420,88 460,80 500,76",
  },
  {
    crumb: "NORTH CAMPUS / TOWER A / L7 / MAIN INCOMER",
    status: "DRILLED IN",
    headline: "Follow the hierarchy to one meter.",
    body: "Site, building, floor, space and meter stay linked, so the number you land on still carries its context.",
    screen: "enerceon / meters / main-incomer",
    metrics: [
      ["TODAY", "4.82 MWh"],
      ["PEAK", "612 kW"],
      ["LOAD", "78%"],
    ],
    p1: "M0,132 C30,128 48,88 76,86 C104,84 118,116 148,112 C178,108 190,54 220,56 C250,58 262,102 292,100 C322,98 336,58 366,62 C396,66 412,110 442,112 C468,114 486,126 500,128",
    p2: "M0,140 C60,138 110,132 170,128 C240,123 290,118 350,112 C410,106 460,98 500,94",
  },
  {
    crumb: "TOWER A / MAY / THRESHOLD",
    status: "76% USED",
    headline: "Measure against the level you set.",
    body: "Monthly consumption thresholds are drawn onto every relevant chart period, so drift is visible early.",
    screen: "enerceon / analytics / thresholds",
    metrics: [
      ["MTD", "318.4 MWh"],
      ["LIMIT", "418 MWh"],
      ["USED", "76.2%"],
    ],
    p1: "M0,142 C50,136 90,124 140,112 C190,100 230,86 280,74 C330,62 380,50 430,40 C460,34 484,30 500,28",
    p2: "M0,60 L500,60",
  },
  {
    crumb: "REPORTS / MAY / TENANT PACK",
    status: "READY",
    headline: "Send the story, not the spreadsheet.",
    body: "Consumption, ranking and time-of-day breakdowns compile into reports for management and tenant billing.",
    screen: "enerceon / reports / may-2026",
    metrics: [
      ["REPORTS", "12"],
      ["TENANTS", "48"],
      ["EXPORTS", "PDF · CSV"],
    ],
    p1: "M0,110 C40,110 60,84 100,84 C140,84 160,60 200,60 C240,60 260,96 300,96 C340,96 360,44 400,44 C440,44 470,72 500,72",
    p2: "M0,128 C50,128 80,116 130,116 C180,116 210,104 260,104 C310,104 340,92 390,92 C440,92 470,84 500,84",
  },
];

// Placeholder quotes — swap for real customer testimonials when they arrive.
export const QUOTES: Quote[] = [
  {
    text: "We stopped guessing which building was drifting. The threshold line makes it obvious before the invoice does.",
    name: "Facility Director",
    role: "Mixed-use portfolio · 6 buildings",
    initials: "FD",
  },
  {
    text: "Tenant billing used to be three days of spreadsheets. Now it's a report we send the same morning.",
    name: "Operations Manager",
    role: "Retail & mall operator",
    initials: "OM",
  },
  {
    text: "It sits above our BMS instead of replacing it — that's the reason the project got approved.",
    name: "Head of Engineering",
    role: "Campus & data centre estate",
    initials: "HE",
  },
];

// Placeholder references — swap for the live portfolio when it is confirmed.
export const PROJECTS: Project[] = [
  {
    name: "Waterfront Office Towers",
    tag: "OFFICES",
    scale: "Three towers, 42 floors of leasable space on one hierarchy.",
    meters: "312 meters",
    utils: "Elec · Cooling · Water",
    out: "-11% cooling load",
    quote: 0,
  },
  {
    name: "City Central Mall",
    tag: "RETAIL",
    scale: "Mall common areas plus 180 tenant units billed monthly.",
    meters: "228 meters",
    utils: "Elec · Water",
    out: "Billing in 20 min",
    quote: 1,
  },
  {
    name: "Airport Hotel & Conference",
    tag: "HOSPITALITY",
    scale: "Rooms, kitchens, laundry and event halls separated by use.",
    meters: "96 meters",
    utils: "Elec · Gas · BTU",
    out: "-8% night baseline",
    quote: 2,
  },
  {
    name: "University North Campus",
    tag: "CAMPUS",
    scale: "Eleven buildings compared on the same EUI benchmark.",
    meters: "174 meters",
    utils: "Elec · Cooling",
    out: "4 buildings retuned",
    quote: 0,
  },
  {
    name: "Regional Data Centre",
    tag: "DATA CENTRE",
    scale: "Hall-level load profiles beside chiller plant performance.",
    meters: "148 meters",
    utils: "Elec · BTU",
    out: "PUE visible daily",
    quote: 2,
  },
  {
    name: "Industrial Park Utilities",
    tag: "INDUSTRIAL",
    scale: "Shared utilities allocated across nine plots and processes.",
    meters: "287 meters",
    utils: "Elec · Gas · Water",
    out: "Allocation automated",
    quote: 1,
  },
];

export const NAV_LINKS: { href: string; label: string }[] = [
  { href: "#console", label: "01 / Console" },
  { href: "#tour", label: "02 / Product tour" },
  { href: "#structure", label: "03 / Structure" },
  { href: "#capabilities", label: "04 / Capabilities" },
  { href: "#utilities", label: "05 / Utilities" },
  { href: "#integration", label: "06 / Integration" },
  { href: "#projects", label: "07 / Projects" },
  { href: "#voices", label: "08 / Voices" },
  { href: "#contact", label: "09 / Contact" },
];

export const CAPABILITIES: { title: string; body: string }[] = [
  {
    title: "Multi-site structure",
    body: "Site, building, floor, space and meter hierarchy for practical navigation.",
  },
  {
    title: "Multi-utility monitoring",
    body: "Electricity, water, gas, BTU / cooling and virtual meters in one interface.",
  },
  {
    title: "Consumption analytics",
    body: "Hourly, daily, weekly, monthly and yearly trends with period comparison.",
  },
  {
    title: "Consumption thresholds",
    body: "Preferred consumption levels drawn directly onto the charts.",
  },
  {
    title: "Load profile & peak demand",
    body: "Identify peaks and understand when the facility works hardest.",
  },
  {
    title: "Time-of-day breakdown",
    body: "Night, morning, afternoon and evening usage visibility.",
  },
  {
    title: "Ranking & contribution",
    body: "Highest consumers and their contribution to portfolio totals.",
  },
  {
    title: "Reporting & tenant access",
    body: "Facility-manager view plus tenant-specific access and reports.",
  },
  {
    title: "Integration & connectivity",
    body: "Niagara, BMS, meters, SQL and an API-friendly architecture.",
  },
  {
    title: "On-premise ready",
    body: "Browser-based access with local deployment control.",
  },
];
