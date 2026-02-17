export type Period = 'MTD' | 'QTD' | 'YTD' | '12M'

export interface GlobalFilters {
  period: Period
  state: string
  product: string
  accountManager: string
}

export interface MonthlyRevenuePoint {
  month: string
  actual: number
  forecast: number
}

export interface ProductSales {
  product: string
  revenue: number
  users: number
  growthLM: number
  growthYoY: number
}

export interface StateSales {
  state: string
  revenue: number
  share: number
}

export interface AMPerformance {
  name: string
  state: string
  revenue: number
  growthLM: number
  growth3M: number
  growth6M: number
  growthYoY: number
  margin: number
}

export interface ChurnAccount {
  account: string
  partner: string
  state: string
  product: string
  churnValue: number
  churnPct: number
  months: '1M' | '3M' | '6M'
}

export interface PartnerData {
  partner: string
  signedContract: boolean
  revenue: number
  growthYoY: number
}

export interface PlanData {
  plan: string
  product: string
  users: number
  contribution: number
}

export interface AMProductBreakdown {
  product: string
  revenue: number
}

export interface AMProfile {
  name: string
  state: string
  revenue: number
  growthYoY: number
  margin: number
  products: AMProductBreakdown[]
}