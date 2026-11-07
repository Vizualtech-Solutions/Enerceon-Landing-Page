import type { IconName } from "@/components/Icon";
import type { ScreenKey } from "./screens";

/* ─── navigation ─────────────────────────────────────────────────────────── */
export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "features", label: "Features" },
  { id: "dashboards", label: "Dashboards" },
  { id: "diagrams", label: "Diagrams" },
  { id: "management", label: "Management" },
  { id: "billing", label: "Billing" },
  { id: "live-preview", label: "Live Preview" },
] as const;

/* ─── utilities ──────────────────────────────────────────────────────────── */
export const UTILITIES = [
  { key: "elec", label: "Electricity", unit: "kWh", icon: "zap" },
  { key: "water", label: "Water", unit: "m³", icon: "droplet" },
  { key: "gas", label: "Gas", unit: "m³", icon: "flame" },
  { key: "btu", label: "BTU / Cooling", unit: "BTU", icon: "snowflake" },
] as const satisfies readonly { key: string; label: string; unit: string; icon: IconName }[];

/* ─── hero ───────────────────────────────────────────────────────────────── */
export const HERO_STATS = [
  { value: 4, label: "Utility types", note: "Electricity · Water · Gas · BTU" },
  { value: 6, label: "Dashboards & diagrams", note: "Ranking to Single Line Diagram" },
  { value: 3, label: "Account types", note: "Tenant · Owner · Management" },
  { value: 2, label: "Ways to send bills", note: "E-mail and WhatsApp" },
];

/* ─── workflow ───────────────────────────────────────────────────────────── */
export const WORKFLOW: { title: string; text: string; icon: IconName }[] = [
  { title: "Meters", text: "Every utility, at every site, building, floor and space.", icon: "gauge" },
  { title: "Analyse", text: "Rankings, yearly trends, live power and diagrams.", icon: "chart" },
  { title: "Bill Builder", text: "One account per bill, peak and off-peak priced.", icon: "fileText" },
  { title: "Send", text: "Bill PDF by e-mail or on WhatsApp, every send logged.", icon: "send" },
  { title: "Collect", text: "Record payments and close the gaps with Missing Bills.", icon: "wallet" },
];

/* ─── feature grid (everything links to the section that shows it) ───────── */
export interface Feature {
  title: string;
  text: string;
  icon: IconName;
  href: string;
  tag: string;
}

export const FEATURES: Feature[] = [
  {
    title: "Energy & Meter Monitoring",
    text: "Live power, peak demand, average power and meters online, refreshed every few seconds with 15-minute intervals and Online, Delayed or Offline status per meter.",
    icon: "activity",
    href: "#dashboards",
    tag: "Dashboards",
  },
  {
    title: "Reports & Analytics",
    text: "Tenant ranking, yearly month-by-month trends, seasonality, top consumers, consumption distribution and meter statements, with PDF and Excel export.",
    icon: "chart",
    href: "#dashboards",
    tag: "Dashboards",
  },
  {
    title: "Single Line Diagram",
    text: "Your complete metering hierarchy — main meters, child meters and sub-meters — drawn level by level, with link warnings and a meter detail panel.",
    icon: "network",
    href: "#diagrams",
    tag: "Diagrams",
  },
  {
    title: "Energy Sources",
    text: "Meters grouped by utility and energy source, with each source's consumption distribution and every meter's share of it.",
    icon: "plug",
    href: "#diagrams",
    tag: "Diagrams",
  },
  {
    title: "Meter Management",
    text: "Register, assign and verify meters; set a monthly threshold; open live monitoring, deactivate, edit or export the register.",
    icon: "gauge",
    href: "#management",
    tag: "Management",
  },
  {
    title: "Accounts Management",
    text: "Tenant, Building Owner and Building Management accounts, so every charge reaches the party responsible for that consumption.",
    icon: "users",
    href: "#management",
    tag: "Management",
  },
  {
    title: "Bill Builder",
    text: "Professional utility bills in seven steps: account, period, spaces, meter types, meters, tax and discounts, and due date — with a live preview.",
    icon: "fileText",
    href: "#billing",
    tag: "Billing",
  },
  {
    title: "Billing Overview",
    text: "Bills generated, total billed, latest period and bills past due, billed per month, top tenants and recently saved bills.",
    icon: "layout",
    href: "#billing",
    tag: "Billing",
  },
  {
    title: "History, Payments & Missing Bills",
    text: "Search every bill, record full or partial payments, find months with consumption but no bill, and see each tenant's full billing history.",
    icon: "history",
    href: "#billing",
    tag: "Billing",
  },
  {
    title: "E-mail & WhatsApp Delivery",
    text: "Send any saved bill with its PDF by e-mail or as an approved WhatsApp template, after a review-and-approve check. Every send is logged.",
    icon: "send",
    href: "#distribution",
    tag: "Billing",
  },
  {
    title: "Users & Roles",
    text: "System Admin, Admin and Operator access, plus accounts that sign in to see their own meters, consumption and bills.",
    icon: "shield",
    href: "#management",
    tag: "Management",
  },
  {
    title: "Settings, Tariffs & Units",
    text: "Date, time and currency formats, meter types, peak and off-peak billing rates, units and decimals, password rules and backups.",
    icon: "settings",
    href: "#management",
    tag: "Configuration",
  },
];

/* ─── dashboards ─────────────────────────────────────────────────────────── */
export interface ShowcaseTab {
  id: string;
  label: string;
  icon: IconName;
  kicker: string;
  title: string;
  text: string;
  points: string[];
  shots: ScreenKey[];
}

export const DASHBOARD_TABS: ShowcaseTab[] = [
  {
    id: "ranking",
    label: "All Tenants Ranking",
    icon: "trophy",
    kicker: "Ranking & drill-down",
    title: "See who consumes the most, at a glance",
    text: "Rank every tenant by consumption for any scope and meter type, then drill down from the portfolio to a single meter.",
    points: [
      "KPIs for total, peak and intensity per area for the selected period",
      "Scope by site, building, floor, space, tenant and meter type",
      "Active tenant cards open each tenant's meters",
      "Meter Statement: every meter with its location, tenant and consumption",
    ],
    shots: ["rankingLight", "activeTenants", "meterStatement"],
  },
  {
    id: "yearly",
    label: "All Tenants Yearly",
    icon: "calendar",
    kicker: "Month by month",
    title: "The whole year, month by month",
    text: "Monthly consumption stacked by tenant, with seasonality, insights and the top consumers of the year.",
    points: [
      "Monthly energy consumption stacked by tenant",
      "Seasonality: the highest and lowest months of the year",
      "Insights and top consumers with their share",
      "Tenant Energy Ranking with each tenant's monthly pattern",
    ],
    shots: ["monthlyConsumption", "yearlyInsights", "yearlyRanking"],
  },
  {
    id: "meters",
    label: "Tenant Meters Consumption",
    icon: "layers",
    kicker: "Every utility",
    title: "Inside every meter, for every utility",
    text: "Today, the previous day, today's peak with meter and hour, and active meters. Choose daily, weekly, monthly or yearly, any date, and compare with another period.",
    points: [
      "All meters merged or stacked, hour by hour, with a meter-by-meter tooltip",
      "Consumption distribution donut with the top consumer highlighted",
      "Threshold line from each meter's monthly target; zero consumption flagged",
      "Group by meter, tenant, space, floor, building or site",
    ],
    shots: ["combinedConsumption", "consumptionDistribution", "consumptionByMeter"],
  },
  {
    id: "live",
    label: "Live Monitoring",
    icon: "activity",
    kicker: "Real-time visibility",
    title: "Live power, every 15 minutes",
    text: "Live power, peak power with its time, average power and meters online, refreshing every few seconds.",
    points: [
      "Power (kW) or Energy view; scope by site down to a single meter",
      "Multi-meter power chart at 15-minute intervals, with zoom",
      "Online, Delayed and Offline status, last reading and today's peak",
      "Export a PDF report of the selected view",
    ],
    shots: ["liveMonitoring", "powerMonitoring", "meterStatus"],
  },
];

export const THEME_NOTES = [
  { title: "Comfortable", text: "Dark mode for control rooms and long shifts; light mode for reports and daylight." },
  { title: "Per user", text: "Each user picks the mode they like, with one click." },
  { title: "Same features", text: "Every dashboard, chart and table works the same in both modes." },
];

/* ─── diagrams ───────────────────────────────────────────────────────────── */
export const SLD_POINTS: { title: string; text: string; icon: IconName }[] = [
  { title: "Hierarchy at a glance", text: "Totals for meters, main meters, child and sub-meters, levels, buildings and link warnings to review.", icon: "chart" },
  { title: "Find any meter", text: "Search by name, tag, space, panel, serial or tenant; filter by building, floor, status, hierarchy and meter type.", icon: "search" },
  { title: "Diagram or tree list", text: "Colour-coded lines per utility, inactive links dashed. Expand, collapse, zoom and full screen.", icon: "layers" },
  { title: "Meter detail panel", text: "Path, parent, child meters, category, energy source, status and location. Locate, show this branch only, or open live monitoring.", icon: "gauge" },
];

export const SOURCE_GROUPS: { utility: string; icon: IconName; key: string; sources: string }[] = [
  { utility: "Electric", icon: "zap", key: "elec", sources: "Grid, Solar, Wind, Hydro, Battery, UPS, Generator, Fuel Cell, Cogeneration (CHP)" },
  { utility: "Water", icon: "droplet", key: "water", sources: "Municipal supply, Borewell, Groundwater, Tanker, Rainwater, Desalinated, Recycled, Treated sewage effluent" },
  { utility: "Gas", icon: "flame", key: "gas", sources: "Piped gas network, Natural gas, LPG, CNG, Biogas" },
  { utility: "BTU / Cooling", icon: "snowflake", key: "btu", sources: "Chiller plant, Absorption chiller, Heat pump, DX unit, Boiler, Cooling tower, Thermal energy storage" },
];

/* ─── management ─────────────────────────────────────────────────────────── */
export const ACCOUNT_TYPES = [
  { key: "tenant", label: "Tenant", text: "The occupant of a space. Meters in the tenant's spaces are billed to the tenant." },
  { key: "owner", label: "Building Owner", text: "The owner of the property. Consumption the owner is responsible for is billed to this account." },
  { key: "mgmt", label: "Building Management", text: "The facility or management company, for consumption under its responsibility." },
];

export const ACCOUNT_POINTS: { title: string; text: string; icon: IconName }[] = [
  { title: "Account details", text: "Account code, contact person and number, e-mail, tags (VIP, Critical Load, 24×7 Operations…), status and last login.", icon: "users" },
  { title: "Find fast", text: "Search by name, e-mail, ID or code; filter by type; table or grid view; sort any column.", icon: "search" },
  { title: "Secure access", text: "Accounts can sign in to their own portal; passwords are masked and only the Super Admin can reveal them.", icon: "lock" },
];

export const MANAGEMENT_TABS: ShowcaseTab[] = [
  {
    id: "meters",
    label: "Meters",
    icon: "gauge",
    kicker: "Meters Management",
    title: "Register, assign and control every meter",
    text: "Total, active, inactive and assigned meters, with location, assigned space, installation date and account.",
    points: [
      "Filter by meter type and assignment",
      "Set a monthly threshold per meter",
      "Open live monitoring, deactivate, edit or delete",
      "New meters are verified before they are added; export the register",
    ],
    shots: ["metersManagement"],
  },
  {
    id: "users",
    label: "Users & Roles",
    icon: "shield",
    kicker: "User Management",
    title: "The right access for every person",
    text: "Admin and operator accounts with system access: total, active, admins and operators, with search, role filter and table or grid view.",
    points: [
      "System Admin — everything, including all Settings",
      "Admin — full access to dashboards, billing and management",
      "Operator — dashboards and view-only management",
      "Accounts — their own meters, consumption and bills",
    ],
    shots: ["userManagement"],
  },
  {
    id: "settings",
    label: "Settings",
    icon: "settings",
    kicker: "Configured once, applied everywhere",
    title: "Your formats, tariffs and units",
    text: "Set it once and every dashboard, report and bill follows it.",
    points: [
      "General: date and time format, week start, currency, language, area and temperature units",
      "Meter types: enable only the utilities you use",
      "Tariffs: peak and off-peak cost per unit, Commercial and Residential, overnight peaks supported",
      "Units and 0–3 decimals; password rules, session timeout, login-attempt limit and database backups",
    ],
    shots: ["billingRates", "generalSettings"],
  },
];

/* ─── billing ────────────────────────────────────────────────────────────── */
export const BILL_STEPS = [
  { title: "Tenant", text: "Choose the account the bill is issued to." },
  { title: "Billing period", text: "Monthly or yearly; closed periods marked Final." },
  { title: "Spaces", text: "One, several or all of the account's spaces." },
  { title: "Meter types", text: "Each keeps its own unit and rate." },
  { title: "Meters", text: "Every matching meter with its consumption." },
  { title: "Tax, discounts & late payment", text: "Service tax %, discount and late-payment % per meter type." },
  { title: "Due date & note", text: "On receipt, 7, 15 or 30 days, or a date." },
];

export const BILL_HIGHLIGHTS = [
  "Live bill preview with bill number, issue date, period and due date",
  "Peak and off-peak consumption priced at each tariff's rates",
  "Amounts payable by and after the due date",
  "Final preview, saved bills, and download as PDF or Excel",
];

export const BILLING_TABS: ShowcaseTab[] = [
  {
    id: "overview",
    label: "Billing Overview",
    icon: "layout",
    kicker: "Every bill, exactly as it was billed",
    title: "The state of billing on one page",
    text: "Every bill saved from the Bill Builder, with amounts exactly as they were billed.",
    points: [
      "Bills generated, total billed, latest period and bills past due",
      "Billed per month, including late-payment charges",
      "Top tenants by amount",
      "Recently saved bills with preview, print and Excel",
    ],
    shots: ["billingOverview"],
  },
  {
    id: "history",
    label: "Bill History",
    icon: "fileText",
    kicker: "Search, send, collect",
    title: "Every generated bill in one place",
    text: "Counts of all, draft, saved, sent and e-mail-failed bills, with search and filters for everything that matters.",
    points: [
      "Filter by payment status, month, site, building, floor, space, tenant and meter",
      "Show the latest revision only",
      "Preview, print, export, send by e-mail or WhatsApp, mark paid or delete",
    ],
    shots: ["billHistory"],
  },
  {
    id: "payments",
    label: "Payments",
    icon: "wallet",
    kicker: "Collect",
    title: "Track every payment",
    text: "Bills grouped as Unpaid, Partially paid and Completely paid, with the amount open today.",
    points: [
      "Record a payment date and amount; balance and status update instantly",
      "Full or partial payments, each approved before it is saved",
      "Shows payable by and after the due date, and when the bill was sent",
    ],
    shots: ["payments", "addPayment"],
  },
  {
    id: "missing",
    label: "Missing Bills",
    icon: "alert",
    kicker: "No revenue left behind",
    title: "Miss no bill",
    text: "Completed months that have saved consumption but no bill.",
    points: [
      "Missing bills, partly billed, tenants affected and meters without a bill",
      "The exact meters without a bill, per tenant and month",
      "A Generate bill button on every row",
    ],
    shots: ["missingBills"],
  },
  {
    id: "tenant",
    label: "Tenant History",
    icon: "history",
    kicker: "Every period, every revision",
    title: "A tenant's complete billing history",
    text: "Pick a tenant to see every bill period by period, with revisions, and start a new bill for that tenant in one click.",
    points: [
      "Filter by site, building, floor and space, or search",
      "Total billed, average per month, latest bill and due dates passed",
      "Newest first, with older revisions under each period",
      "Bill Preview: any saved bill exactly as the account receives it",
    ],
    shots: ["tenantHistory"],
  },
];

export const DELIVERY = [
  {
    channel: "E-mail",
    icon: "mail" as IconName,
    shot: "sendEmail" as ScreenKey,
    points: [
      "Bill PDF attached; add CC addresses and a personal message",
      "Invalid addresses are caught before sending",
      "Every send is logged: how many times, when and to whom",
    ],
  },
  {
    channel: "WhatsApp",
    icon: "whatsapp" as IconName,
    shot: "sendWhatsApp" as ScreenKey,
    points: [
      "An approved message template plus the bill PDF, to the account's registered number",
      "Carries account, bill number, period, meters, consumption, peak / off-peak, amount, due date and payment status",
      "A review-and-approve checkbox must be ticked before any bill is sent",
    ],
  },
];

/* ─── why ────────────────────────────────────────────────────────────────── */
export const VALUES: { title: string; text: string; icon: IconName }[] = [
  { title: "Complete visibility", text: "Every site, building, floor, space, tenant and meter in one place, live and historical, for all four utilities.", icon: "eye" },
  { title: "Numbers that agree", text: "Dashboards, reports and bills use the same records, so every bill matches the consumption shown.", icon: "check" },
  { title: "Fair, transparent billing", text: "Peak and off-peak tariffs, tax, discounts and late-payment rules applied consistently to every account.", icon: "fileText" },
  { title: "Faster collection", text: "Send bills by e-mail or WhatsApp in seconds and track every payment and outstanding balance.", icon: "refresh" },
  { title: "No revenue left behind", text: "Missing Bills finds every month with consumption but no bill, ready to generate.", icon: "alert" },
  { title: "Know your infrastructure", text: "Single Line Diagram and Energy Sources show how meters connect and what powers them.", icon: "network" },
];

export const BUILT_FOR = [
  "Shopping malls",
  "Office towers",
  "Residential buildings",
  "Mixed-use developments",
  "Hotels",
  "Data centres",
  "Facility management companies",
  "Property owners",
];
