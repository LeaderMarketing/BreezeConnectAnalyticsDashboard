import type {
  AMPerformance,
  ChurnAccount,
  GlobalFilters,
  MonthlyRevenuePoint,
  PartnerData,
  PlanData,
  ProductSales,
  StateSales,
} from '../types/dashboard'

/* ── Reference Data ── */
export const states = ['All', 'NSW', 'VIC', 'QLD', 'WA', 'SA']
export const products = ['All', 'SIP', 'NBN', 'Fibre', 'SMS', 'Teams']
export const periods = ['MTD', 'QTD', 'YTD', '12M'] as const

/* ── Revenue Trend (18 months for trailing + forecast) ── */
export const revenueTrend: MonthlyRevenuePoint[] = [
  { month: 'Sep 24', actual: 298000, forecast: 295000 },
  { month: 'Oct 24', actual: 312000, forecast: 308000 },
  { month: 'Nov 24', actual: 327000, forecast: 320000 },
  { month: 'Dec 24', actual: 318000, forecast: 330000 },
  { month: 'Jan 25', actual: 341000, forecast: 340000 },
  { month: 'Feb 25', actual: 352000, forecast: 348000 },
  { month: 'Mar 25', actual: 366000, forecast: 362000 },
  { month: 'Apr 25', actual: 377000, forecast: 372000 },
  { month: 'May 25', actual: 390000, forecast: 386000 },
  { month: 'Jun 25', actual: 401000, forecast: 396000 },
  { month: 'Jul 25', actual: 418000, forecast: 411000 },
  { month: 'Aug 25', actual: 430000, forecast: 424000 },
  { month: 'Sep 25', actual: 446000, forecast: 438000 },
  { month: 'Oct 25', actual: 457000, forecast: 450000 },
  { month: 'Nov 25', actual: 469000, forecast: 461000 },
  { month: 'Dec 25', actual: 481000, forecast: 476000 },
  { month: 'Jan 26', actual: 493000, forecast: 488000 },
  { month: 'Feb 26', actual: 508000, forecast: 499000 },
]

/* ── Product Sales ── */
export const productSalesData: ProductSales[] = [
  { product: 'SIP', revenue: 1_520_000, users: 11_840, growthLM: 6.4, growthYoY: 18.1 },
  { product: 'NBN', revenue: 1_040_000, users: 7_340, growthLM: 4.7, growthYoY: 15.6 },
  { product: 'Fibre', revenue: 860_000, users: 3_110, growthLM: 5.1, growthYoY: 13.9 },
  { product: 'Teams', revenue: 635_000, users: 4_590, growthLM: 5.9, growthYoY: 16.7 },
  { product: 'SMS', revenue: 418_000, users: 2_920, growthLM: 3.8, growthYoY: 11.3 },
]

/* ── State Sales (5 states only) ── */
export const stateSalesData: StateSales[] = [
  { state: 'NSW', revenue: 1_520_000, share: 34.8 },
  { state: 'VIC', revenue: 1_210_000, share: 27.7 },
  { state: 'QLD', revenue: 842_000, share: 19.3 },
  { state: 'WA', revenue: 502_000, share: 11.5 },
  { state: 'SA', revenue: 288_000, share: 6.6 },
]

/* ── AM Performance (real BreezeConnect AMs) ── */
export const amPerformanceData: AMPerformance[] = [
  { name: 'Benson Yin', state: 'NSW', revenue: 420_000, growthLM: 9.2, growth3M: 15.1, growth6M: 23.4, growthYoY: 31.8, margin: 24.2 },
  { name: 'Mia Zhang', state: 'VIC', revenue: 401_000, growthLM: 8.7, growth3M: 14.2, growth6M: 20.1, growthYoY: 29.6, margin: 22.9 },
  { name: 'Harish CK', state: 'QLD', revenue: 364_000, growthLM: 7.4, growth3M: 12.8, growth6M: 19.4, growthYoY: 24.1, margin: 25.1 },
  { name: 'Mark Marikkar', state: 'WA', revenue: 301_000, growthLM: 6.1, growth3M: 10.6, growth6M: 14.9, growthYoY: 19.4, margin: 21.8 },
  { name: 'Raymond Wong', state: 'NSW', revenue: 286_000, growthLM: 5.8, growth3M: 11.2, growth6M: 16.6, growthYoY: 21.2, margin: 23.4 },
  { name: 'David Sloss', state: 'VIC', revenue: 272_000, growthLM: 4.3, growth3M: 9.1, growth6M: 12.2, growthYoY: 17.3, margin: 20.6 },
  { name: 'Andoni Tsokos', state: 'QLD', revenue: 246_000, growthLM: 3.9, growth3M: 8.4, growth6M: 11.1, growthYoY: 14.9, margin: 19.8 },
  { name: 'Scott Shariffdeen', state: 'SA', revenue: 219_000, growthLM: 3.1, growth3M: 7.9, growth6M: 10.3, growthYoY: 13.7, margin: 18.9 },
  { name: 'Andy Kris', state: 'WA', revenue: 204_000, growthLM: 2.7, growth3M: 6.8, growth6M: 9.2, growthYoY: 11.5, margin: 17.7 },
  { name: 'Grant Abbott', state: 'NSW', revenue: 192_000, growthLM: 2.5, growth3M: 6.2, growth6M: 8.4, growthYoY: 10.8, margin: 17.1 },
  { name: 'Chris Eustace', state: 'QLD', revenue: 186_000, growthLM: 2.3, growth3M: 5.4, growth6M: 7.6, growthYoY: 9.9, margin: 16.4 },
  { name: 'Victor Huang', state: 'VIC', revenue: 174_000, growthLM: 2.1, growth3M: 5.0, growth6M: 7.1, growthYoY: 9.2, margin: 16.0 },
  { name: 'Andy Nguyen', state: 'NSW', revenue: 168_000, growthLM: 1.9, growth3M: 4.7, growth6M: 6.4, growthYoY: 7.8, margin: 15.9 },
  { name: 'Nathan Puri', state: 'WA', revenue: 152_000, growthLM: 1.7, growth3M: 4.2, growth6M: 5.8, growthYoY: 7.1, margin: 15.6 },
  { name: 'Kevin Zhang', state: 'SA', revenue: 141_000, growthLM: 1.6, growth3M: 3.9, growth6M: 5.1, growthYoY: 6.2, margin: 15.4 },
]

/* ── Churn Data (all periods mixed – filter by months field) ── */
export const churnData: ChurnAccount[] = [
  // 1M churn
  { account: 'Harbor Dental Group', partner: 'Connective One', state: 'NSW', product: 'SIP', churnValue: 18_420, churnPct: 67.3, months: '1M' },
  { account: 'Arden Legal', partner: 'Connective One', state: 'QLD', product: 'Teams', churnValue: 14_980, churnPct: 52.4, months: '1M' },
  { account: 'Clarity Optics', partner: 'Voxel Comms', state: 'VIC', product: 'Fibre', churnValue: 12_300, churnPct: 47.1, months: '1M' },
  { account: 'BlueStone HVAC', partner: 'Edge Telecoms', state: 'SA', product: 'NBN', churnValue: 10_890, churnPct: 41.2, months: '1M' },
  { account: 'Westfield Motors', partner: 'Skyline Partner', state: 'WA', product: 'SIP', churnValue: 9_750, churnPct: 38.9, months: '1M' },
  { account: 'TechVault IT', partner: 'BizzTel', state: 'NSW', product: 'Teams', churnValue: 8_400, churnPct: 33.6, months: '1M' },
  // 3M churn
  { account: 'Southline Transport', partner: 'BizzTel', state: 'VIC', product: 'NBN', churnValue: 16_210, churnPct: 59.8, months: '3M' },
  { account: 'Northlake Schools', partner: 'Voxel Comms', state: 'WA', product: 'SIP', churnValue: 12_710, churnPct: 45.7, months: '3M' },
  { account: 'FleetEase Group', partner: 'Skyline Partner', state: 'QLD', product: 'NBN', churnValue: 9_800, churnPct: 34.2, months: '3M' },
  { account: 'GreenLeaf Farms', partner: 'Nova Carrier', state: 'QLD', product: 'SMS', churnValue: 8_100, churnPct: 30.4, months: '3M' },
  { account: 'Summit Engineers', partner: 'Helix Connect', state: 'SA', product: 'Fibre', churnValue: 7_350, churnPct: 28.1, months: '3M' },
  // 6M churn
  { account: 'Metro Health Co', partner: 'Unified Reach', state: 'NSW', product: 'Fibre', churnValue: 13_230, churnPct: 48.1, months: '6M' },
  { account: 'Prime Interior', partner: 'BizzTel', state: 'VIC', product: 'SMS', churnValue: 10_200, churnPct: 37.6, months: '6M' },
  { account: 'Coastal Dining', partner: 'MetroWire', state: 'QLD', product: 'SIP', churnValue: 9_100, churnPct: 32.8, months: '6M' },
  { account: 'Atlas Mining', partner: 'Kite Reach', state: 'WA', product: 'NBN', churnValue: 7_900, churnPct: 27.4, months: '6M' },
  { account: 'Redpoint Legal', partner: 'SolidTel', state: 'SA', product: 'Teams', churnValue: 6_400, churnPct: 23.8, months: '6M' },
]

/* ── Churn by State (summary) ── */
export const churnByState = [
  { state: 'NSW', churnRate: 8.4, atRisk: 14 },
  { state: 'VIC', churnRate: 7.2, atRisk: 11 },
  { state: 'QLD', churnRate: 6.9, atRisk: 9 },
  { state: 'WA', churnRate: 5.8, atRisk: 7 },
  { state: 'SA', churnRate: 5.1, atRisk: 4 },
]

/* ── Churn by Product (summary) ── */
export const churnByProduct = [
  { product: 'SIP', churnRate: 7.6, accounts: 18 },
  { product: 'NBN', churnRate: 6.9, accounts: 14 },
  { product: 'Fibre', churnRate: 5.4, accounts: 8 },
  { product: 'Teams', churnRate: 5.1, accounts: 7 },
  { product: 'SMS', churnRate: 4.3, accounts: 5 },
]

/* ── Churn Trend (12 months) ── */
export const churnTrend = [
  { month: 'Mar 25', rate: 7.8 },
  { month: 'Apr 25', rate: 7.5 },
  { month: 'May 25', rate: 7.1 },
  { month: 'Jun 25', rate: 7.3 },
  { month: 'Jul 25', rate: 6.9 },
  { month: 'Aug 25', rate: 6.6 },
  { month: 'Sep 25', rate: 6.4 },
  { month: 'Oct 25', rate: 7.0 },
  { month: 'Nov 25', rate: 6.7 },
  { month: 'Dec 25', rate: 6.5 },
  { month: 'Jan 26', rate: 6.9 },
  { month: 'Feb 26', rate: 6.8 },
]

/* ── Partners (25 including 3 dormant) ── */
export const partnersData: PartnerData[] = [
  { partner: 'Connective One', signedContract: true, revenue: 720_000, growthYoY: 24.2 },
  { partner: 'BizzTel', signedContract: true, revenue: 654_000, growthYoY: 17.6 },
  { partner: 'Unified Reach', signedContract: true, revenue: 590_000, growthYoY: 12.3 },
  { partner: 'Skyline Partner', signedContract: true, revenue: 534_000, growthYoY: 10.5 },
  { partner: 'Voxel Comms', signedContract: true, revenue: 482_000, growthYoY: 8.9 },
  { partner: 'Edge Telecoms', signedContract: true, revenue: 431_000, growthYoY: 7.4 },
  { partner: 'Helix Connect', signedContract: true, revenue: 389_000, growthYoY: 6.8 },
  { partner: 'Nova Carrier', signedContract: true, revenue: 372_000, growthYoY: 5.2 },
  { partner: 'MetroWire', signedContract: true, revenue: 351_000, growthYoY: 4.6 },
  { partner: 'Kite Reach', signedContract: true, revenue: 340_000, growthYoY: 3.8 },
  { partner: 'SolidTel', signedContract: true, revenue: 322_000, growthYoY: 3.1 },
  { partner: 'Harbor Link', signedContract: true, revenue: 309_000, growthYoY: 2.7 },
  { partner: 'Zenline', signedContract: true, revenue: 286_000, growthYoY: 1.9 },
  { partner: 'Nexus Group', signedContract: true, revenue: 280_000, growthYoY: 1.2 },
  { partner: 'Blue Transit', signedContract: true, revenue: 275_000, growthYoY: -0.9 },
  { partner: 'Core Relay', signedContract: true, revenue: 264_000, growthYoY: -1.6 },
  { partner: 'Astra Networks', signedContract: true, revenue: 249_000, growthYoY: -2.4 },
  { partner: 'Zen Carrier', signedContract: true, revenue: 236_000, growthYoY: -3.1 },
  { partner: 'Pulse Tele', signedContract: true, revenue: 230_000, growthYoY: -4.2 },
  { partner: 'Orbit Wholesale', signedContract: true, revenue: 226_000, growthYoY: -5.1 },
  { partner: 'Origin Relay', signedContract: true, revenue: 210_000, growthYoY: -5.9 },
  { partner: 'Arrow Comms', signedContract: true, revenue: 198_000, growthYoY: -6.7 },
  { partner: 'Dormant Prime', signedContract: true, revenue: 0, growthYoY: -100 },
  { partner: 'Dormant Harbor', signedContract: true, revenue: 0, growthYoY: -100 },
  { partner: 'Dormant Bell', signedContract: true, revenue: 0, growthYoY: -100 },
]

/* ── Top Plans ── */
export const topPlansData: PlanData[] = [
  { plan: 'SIP Unlimited Business 10', product: 'SIP', users: 1_840, contribution: 15.4 },
  { plan: 'NBN Enterprise 250/100', product: 'NBN', users: 1_490, contribution: 13.7 },
  { plan: 'Teams DR Pro 20', product: 'Teams', users: 1_280, contribution: 11.1 },
  { plan: 'Fibre Premium 500/500', product: 'Fibre', users: 910, contribution: 9.8 },
  { plan: 'SMS Connect Bulk 5K', product: 'SMS', users: 760, contribution: 7.4 },
]

/* ── Product Champions (top AM per product) ── */
export const productChampions = [
  { product: 'SIP', am: 'Benson Yin', revenue: 298_000, margin: 25.7 },
  { product: 'NBN', am: 'Mia Zhang', revenue: 254_000, margin: 24.4 },
  { product: 'Fibre', am: 'Mark Marikkar', revenue: 190_000, margin: 22.1 },
  { product: 'Teams', am: 'Harish CK', revenue: 201_000, margin: 23.8 },
  { product: 'SMS', am: 'Raymond Wong', revenue: 124_000, margin: 20.9 },
]

/* ── State Champions (top AM per state) ── */
export const stateChampions = [
  { state: 'NSW', am: 'Benson Yin', revenue: 420_000 },
  { state: 'VIC', am: 'Mia Zhang', revenue: 401_000 },
  { state: 'QLD', am: 'Harish CK', revenue: 364_000 },
  { state: 'WA', am: 'Mark Marikkar', revenue: 301_000 },
  { state: 'SA', am: 'Scott Shariffdeen', revenue: 219_000 },
]

/* ── Dashboard Data Selector ── */
export const getDashboardData = (filters: GlobalFilters) => {
  const stateFilteredAM =
    filters.state === 'All' ? amPerformanceData : amPerformanceData.filter((a) => a.state === filters.state)

  const accountManagerOptions = ['All', ...new Set(amPerformanceData.map((a) => a.name))]

  const focusedAM =
    filters.accountManager === 'All'
      ? stateFilteredAM
      : stateFilteredAM.filter((a) => a.name === filters.accountManager)

  const productFilteredChurn =
    filters.product === 'All' ? churnData : churnData.filter((c) => c.product === filters.product)

  const stateProductFilteredChurn =
    filters.state === 'All' ? productFilteredChurn : productFilteredChurn.filter((c) => c.state === filters.state)

  const periodMultiplier =
    filters.period === 'MTD' ? 0.22 : filters.period === 'QTD' ? 0.68 : filters.period === 'YTD' ? 1 : 1.12

  const totalRevYTD = Math.round(
    revenueTrend.slice(-12).reduce((acc, r) => acc + r.actual, 0) * periodMultiplier,
  )
  const mtdRevenue = revenueTrend[revenueTrend.length - 1].actual
  const totalUsers = productSalesData.reduce((a, p) => a + p.users, 0)

  return {
    accountManagerOptions,
    revenueTrend,
    productSalesData:
      filters.product === 'All' ? productSalesData : productSalesData.filter((p) => p.product === filters.product),
    stateSalesData:
      filters.state === 'All' ? stateSalesData : stateSalesData.filter((s) => s.state === filters.state),
    topAMs: [...focusedAM].sort((a, b) => b.revenue - a.revenue).slice(0, 10),
    growthAMs: [...focusedAM].sort((a, b) => b.growthYoY - a.growthYoY).slice(0, 5),
    stateChampions,
    productChampions,
    churnByState,
    churnByProduct,
    churnTrend,
    churnAccounts1M: [...stateProductFilteredChurn]
      .filter((c) => c.months === '1M')
      .sort((a, b) => b.churnValue - a.churnValue)
      .slice(0, 5),
    churnAccounts3M: [...stateProductFilteredChurn]
      .filter((c) => c.months === '3M')
      .sort((a, b) => b.churnValue - a.churnValue)
      .slice(0, 5),
    churnAccounts6M: [...stateProductFilteredChurn]
      .filter((c) => c.months === '6M')
      .sort((a, b) => b.churnValue - a.churnValue)
      .slice(0, 5),
    nonSpendingPartners: partnersData.filter((p) => p.signedContract && p.revenue === 0),
    topPartners: [...partnersData].filter((p) => p.revenue > 0).sort((a, b) => b.revenue - a.revenue).slice(0, 20),
    topPlansData,
    kpis: {
      ytdRevenue: totalRevYTD,
      mtdRevenue,
      growthVsLM: 5.8,
      growthYoY: 17.2,
      activeAccounts: totalUsers,
      churnRate: 6.8,
      avgMargin: 21.3,
      newPartners: 4,
    },
  }
}
