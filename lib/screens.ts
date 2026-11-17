/** Real Enerceon screenshots (fictional demo data), taken from the product brochure.
 *  Files live in /public/assets/screens; sizes are the intrinsic pixel sizes so
 *  next/image can reserve the space and avoid layout shift. */
export type ScreenKey = keyof typeof SCREENS;

export interface Screen {
  src: string;
  w: number;
  h: number;
  alt: string;
}

const s = (file: string, w: number, h: number, alt: string): Screen => ({
  src: `/assets/screens/${file}.webp`,
  w,
  h,
  alt,
});

export const SCREENS = {
  energyDashboard: s("energy-dashboard", 3176, 1118, "Energy Management Dashboard with consumption KPIs, scope filters and meter types"),
  billPreview: s("bill-preview", 2346, 2500, "Utility bill preview with charges by meter type, tax and amounts payable by and after the due date"),
  rankingLight: s("ranking-light", 3176, 1424, "Tenant Energy Consumption Ranking chart in light mode"),
  rankingDark: s("ranking-dark", 3176, 1450, "Tenant Energy Consumption Ranking chart in dark mode"),
  powerDark: s("power-dark", 3176, 1142, "Power Monitoring chart in dark mode"),
  thermalDistributionDark: s("thermal-distribution-dark", 3176, 1196, "Thermal energy consumption distribution donut in dark mode"),
  activeTenants: s("active-tenants", 3176, 1402, "Active Tenants cards with consumption per tenant"),
  meterStatement: s("meter-statement", 3176, 1222, "Meter Statement table by site, building, floor, space and tenant"),
  monthlyConsumption: s("monthly-consumption", 3176, 1180, "Monthly Energy Consumption stacked by tenant"),
  yearlyInsights: s("yearly-insights", 3176, 920, "Seasonality, electric insights and top consumers"),
  yearlyRanking: s("yearly-ranking", 3176, 1176, "Tenant Energy Ranking with the monthly pattern of each tenant"),
  combinedConsumption: s("combined-consumption", 3200, 1416, "Overall Combined Energy Consumption, stacked by meter, hour by hour"),
  consumptionDistribution: s("consumption-distribution", 3176, 1196, "Energy Consumption Distribution donut with the ranked meter list"),
  consumptionByMeter: s("consumption-by-meter", 3176, 1230, "Energy Consumption by Meter, grouped by meter, tenant, space, floor, building or site"),
  liveMonitoring: s("live-monitoring", 3200, 1164, "Electric Live Monitoring Dashboard with live, peak and average power and meters online"),
  powerMonitoring: s("power-monitoring", 3200, 1106, "Power Monitoring, multi-meter, 15-minute intervals"),
  meterStatus: s("meter-status", 3176, 940, "Electric Meter Status with online status, live power, last reading and today's peak"),
  singleLineDiagram: s("single-line-diagram", 3200, 2114, "Single Line Diagram of main meters, child meters and sub-meters with the meter detail panel"),
  energySourcesDiagram: s("energy-sources-diagram", 3022, 1566, "Electric meters grouped by energy source: battery, generator and grid"),
  accountsManagement: s("accounts-management", 3178, 2522, "Accounts Management with tenants, building owners and building management"),
  billBuilder: s("bill-builder", 792, 2586, "Bill Builder panel: tenant, billing period, spaces, meter types, meters, tax and due date"),
  billingOverview: s("billing-overview", 3200, 2176, "Billing Overview with bills generated, total billed, billed per month and top tenants"),
  billHistory: s("bill-history", 3200, 1346, "Bill History with search, filters, payment status and send actions"),
  sendEmail: s("send-email", 1210, 1526, "Send bill by e-mail with the bill PDF attached"),
  sendWhatsApp: s("send-whatsapp", 1212, 1290, "Send bill on WhatsApp with an approved template and the bill PDF"),
  payments: s("payments", 3200, 1120, "Payments grouped as unpaid, partially paid and completely paid"),
  addPayment: s("add-payment", 1208, 940, "Add payment dialog with remaining balance and status after saving"),
  missingBills: s("missing-bills", 3200, 1384, "Missing Bills: completed months with saved consumption but no bill"),
  tenantHistory: s("tenant-history", 3200, 2352, "Tenant History: every bill of a tenant, period by period"),
  metersManagement: s("meters-management", 3178, 1606, "Meters Management with total, active, inactive and assigned meters"),
  userManagement: s("user-management", 3148, 1332, "User Management with admin and operator accounts"),
  generalSettings: s("general-settings", 3200, 1094, "General settings and meter types"),
  billingRates: s("billing-rates", 3200, 1962, "Billing rates: peak and off-peak cost per unit, commercial and residential"),
} satisfies Record<string, Screen>;
