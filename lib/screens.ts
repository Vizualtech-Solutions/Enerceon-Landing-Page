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
  energyDashboard: s("energy-dashboard", 1588, 559, "Energy Management Dashboard with consumption KPIs, scope filters and meter types"),
  billPreview: s("bill-preview", 1173, 1250, "Utility bill preview with charges by meter type, tax and amounts payable by and after the due date"),
  rankingLight: s("ranking-light", 1588, 712, "Tenant Energy Consumption Ranking chart in light mode"),
  rankingDark: s("ranking-dark", 1588, 725, "Tenant Energy Consumption Ranking chart in dark mode"),
  powerDark: s("power-dark", 1588, 571, "Power Monitoring chart in dark mode"),
  thermalDistributionDark: s("thermal-distribution-dark", 1588, 598, "Thermal energy consumption distribution donut in dark mode"),
  activeTenants: s("active-tenants", 1588, 701, "Active Tenants cards with consumption per tenant"),
  meterStatement: s("meter-statement", 1588, 611, "Meter Statement table by site, building, floor, space and tenant"),
  monthlyConsumption: s("monthly-consumption", 1588, 590, "Monthly Energy Consumption stacked by tenant"),
  yearlyInsights: s("yearly-insights", 1588, 460, "Seasonality, electric insights and top consumers"),
  yearlyRanking: s("yearly-ranking", 1588, 588, "Tenant Energy Ranking with the monthly pattern of each tenant"),
  combinedConsumption: s("combined-consumption", 1600, 708, "Overall Combined Energy Consumption, stacked by meter, hour by hour"),
  consumptionDistribution: s("consumption-distribution", 1588, 598, "Energy Consumption Distribution donut with the ranked meter list"),
  consumptionByMeter: s("consumption-by-meter", 1588, 615, "Energy Consumption by Meter, grouped by meter, tenant, space, floor, building or site"),
  liveMonitoring: s("live-monitoring", 1600, 582, "Electric Live Monitoring Dashboard with live, peak and average power and meters online"),
  powerMonitoring: s("power-monitoring", 1600, 553, "Power Monitoring, multi-meter, 15-minute intervals"),
  meterStatus: s("meter-status", 1588, 470, "Electric Meter Status with online status, live power, last reading and today's peak"),
  singleLineDiagram: s("single-line-diagram", 1600, 1057, "Single Line Diagram of main meters, child meters and sub-meters with the meter detail panel"),
  energySourcesDiagram: s("energy-sources-diagram", 1511, 783, "Electric meters grouped by energy source: battery, generator and grid"),
  accountsManagement: s("accounts-management", 1589, 1261, "Accounts Management with tenants, building owners and building management"),
  billBuilder: s("bill-builder", 396, 1293, "Bill Builder panel: tenant, billing period, spaces, meter types, meters, tax and due date"),
  billingOverview: s("billing-overview", 1600, 1088, "Billing Overview with bills generated, total billed, billed per month and top tenants"),
  billHistory: s("bill-history", 1600, 673, "Bill History with search, filters, payment status and send actions"),
  sendEmail: s("send-email", 605, 763, "Send bill by e-mail with the bill PDF attached"),
  sendWhatsApp: s("send-whatsapp", 606, 645, "Send bill on WhatsApp with an approved template and the bill PDF"),
  payments: s("payments", 1600, 560, "Payments grouped as unpaid, partially paid and completely paid"),
  addPayment: s("add-payment", 604, 470, "Add payment dialog with remaining balance and status after saving"),
  missingBills: s("missing-bills", 1600, 692, "Missing Bills: completed months with saved consumption but no bill"),
  tenantHistory: s("tenant-history", 1600, 1176, "Tenant History: every bill of a tenant, period by period"),
  metersManagement: s("meters-management", 1589, 803, "Meters Management with total, active, inactive and assigned meters"),
  userManagement: s("user-management", 1574, 666, "User Management with admin and operator accounts"),
  generalSettings: s("general-settings", 1600, 547, "General settings and meter types"),
  billingRates: s("billing-rates", 1600, 981, "Billing rates: peak and off-peak cost per unit, commercial and residential"),
} satisfies Record<string, Screen>;
