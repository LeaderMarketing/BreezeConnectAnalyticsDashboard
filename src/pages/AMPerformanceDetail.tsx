import { useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  HiOutlineTrophy,
  HiOutlineUserGroup,
  HiOutlineBuildingOffice2,
  HiOutlineChartBarSquare,
} from 'react-icons/hi2'
import { HiArrowUpRight } from 'react-icons/hi2'
import { Panel } from '../components/ui/Panel'
import { AMHoverCard } from '../components/ui/AMHoverCard'
import { amProfiles } from '../data/mockData'
import type { ReturnTypeDashboardData } from './types'
import { formatCurrency, formatPercent } from '../utils/format'

interface Props {
  dashboard: ReturnTypeDashboardData
}

type GrowthPeriod = 'growthLM' | 'growth3M' | 'growth6M' | 'growthYoY'
type SortField = 'revenue' | 'growthYoY' | 'margin'

const periodLabels: Record<GrowthPeriod, string> = {
  growthLM: 'vs Last Month',
  growth3M: 'vs 3 Months',
  growth6M: 'vs 6 Months',
  growthYoY: 'Year over Year',
}

const rankClass = (i: number) => (i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '')
const stateChipClass = (s: string) => `chip state-${s.toLowerCase()}`
const productChipClass = (p: string) => `chip product-${p.toLowerCase()}`

export const AMPerformanceDetail = ({ dashboard }: Props) => {
  const [growthPeriod, setGrowthPeriod] = useState<GrowthPeriod>('growthYoY')
  const [sortField, setSortField] = useState<SortField>('revenue')

  const sortedAMs = [...dashboard.topAMs].sort((a, b) => {
    if (sortField === 'revenue') return b.revenue - a.revenue
    if (sortField === 'growthYoY') return b.growthYoY - a.growthYoY
    return b.margin - a.margin
  })

  const growthSorted = [...dashboard.topAMs].sort((a, b) => b[growthPeriod] - a[growthPeriod]).slice(0, 5)

  const totalRevenue = dashboard.topAMs.reduce((a, am) => a + am.revenue, 0)
  const avgMargin = dashboard.topAMs.length > 0
    ? dashboard.topAMs.reduce((a, am) => a + am.margin, 0) / dashboard.topAMs.length
    : 0
  const topGrowth = dashboard.topAMs.length > 0
    ? Math.max(...dashboard.topAMs.map((am) => am.growthYoY))
    : 0

  return (
    <>
      {/* KPI Row */}
      <section className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <article className="kpi-card">
          <h4>Total AM Revenue</h4>
          <p className="kpi-value">{formatCurrency(totalRevenue)}</p>
          <div className="kpi-meta trend-up"><HiArrowUpRight size={14} /> {dashboard.topAMs.length} active AMs</div>
        </article>
        <article className="kpi-card">
          <h4>Avg. Margin</h4>
          <p className="kpi-value">{avgMargin.toFixed(1)}%</p>
          <div className="kpi-meta trend-up"><HiArrowUpRight size={14} /> across portfolio</div>
        </article>
        <article className="kpi-card">
          <h4>Top Growth (YoY)</h4>
          <p className="kpi-value">{formatPercent(topGrowth)}</p>
          <div className="kpi-meta trend-up"><HiArrowUpRight size={14} /> best performer</div>
        </article>
        <article className="kpi-card">
          <h4>Avg. YoY Growth</h4>
          <p className="kpi-value">{formatPercent(dashboard.topAMs.reduce((a, am) => a + am.growthYoY, 0) / dashboard.topAMs.length)}</p>
          <div className="kpi-meta trend-up"><HiArrowUpRight size={14} /> team average</div>
        </article>
      </section>

      {/* Top AM Table + Revenue Chart */}
      <section className="panel-grid">
        <Panel
          className="span-7"
          title="All Account Managers"
          subtitle="Click column headers to sort"
          icon={HiOutlineUserGroup}
          rightContent={
            <div className="tab-bar">
              {([['revenue', 'Revenue'], ['growthYoY', 'Growth'], ['margin', 'Margin']] as const).map(([key, label]) => (
                <button key={key} className={`tab-btn ${sortField === key ? 'active' : ''}`} onClick={() => setSortField(key as SortField)}>{label}</button>
              ))}
            </div>
          }
        >
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: 34 }}>#</th>
                <th>Account Manager</th>
                <th>State</th>
                <th style={{ textAlign: 'right' }}>Revenue</th>
                <th style={{ textAlign: 'right' }}>Margin</th>
                <th style={{ textAlign: 'right' }}>YoY</th>
                <th style={{ width: 110 }}>Share</th>
              </tr>
            </thead>
            <tbody>
              {sortedAMs.map((am, i) => (
                <tr key={am.name}>
                  <td><span className={`rank-badge ${rankClass(i)}`}>{i + 1}</span></td>
                  <td style={{ fontWeight: 500 }}><AMHoverCard name={am.name}>{am.name}</AMHoverCard></td>
                  <td><span className={stateChipClass(am.state)}>{am.state}</span></td>
                  <td style={{ textAlign: 'right' }}>{formatCurrency(am.revenue)}</td>
                  <td style={{ textAlign: 'right' }}>{am.margin.toFixed(1)}%</td>
                  <td style={{ textAlign: 'right' }}><span className="trend-up">{formatPercent(am.growthYoY)}</span></td>
                  <td>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${totalRevenue > 0 ? (am.revenue / totalRevenue) * 100 : 0}%`,
                          background: 'var(--color-primary)',
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel className="span-5" title="Revenue Distribution" subtitle="By account manager & product" icon={HiOutlineChartBarSquare}>
          <ResponsiveContainer width="100%" height={380}>
            <BarChart
              data={sortedAMs.map((am) => {
                const profile = amProfiles.find((p) => p.name === am.name)
                return {
                  name: am.name,
                  SIP: profile?.products.find((p) => p.product === 'SIP')?.revenue ?? 0,
                  NBN: profile?.products.find((p) => p.product === 'NBN')?.revenue ?? 0,
                  Fibre: profile?.products.find((p) => p.product === 'Fibre')?.revenue ?? 0,
                  Teams: profile?.products.find((p) => p.product === 'Teams')?.revenue ?? 0,
                  SMS: profile?.products.find((p) => p.product === 'SMS')?.revenue ?? 0,
                }
              })}
              layout="vertical"
              margin={{ top: 4, right: 12, left: 8, bottom: 4 }}
            >
              <CartesianGrid stroke="#edf2fb" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#5b6475' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#5b6475' }} axisLine={false} tickLine={false} width={80} />
              <Tooltip
                formatter={(v, name) => [formatCurrency(Number(v ?? 0)), String(name)]}
                contentStyle={{ borderRadius: 10, border: '1px solid #d9e5f8', fontSize: 11 }}
              />
              <Bar dataKey="SIP" name="SIP" stackId="revenue" fill="#0469f8" />
              <Bar dataKey="NBN" name="NBN" stackId="revenue" fill="#059669" />
              <Bar dataKey="Fibre" name="Fibre" stackId="revenue" fill="#d97706" />
              <Bar dataKey="Teams" name="Teams" stackId="revenue" fill="#6d28d9" />
              <Bar dataKey="SMS" name="SMS" stackId="revenue" fill="#ec4899" radius={[0, 5, 5, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </section>

      {/* Growth Leaders + Champions */}
      <section className="panel-grid">
        <Panel
          className="span-6"
          title="Growth Leaders"
          subtitle={periodLabels[growthPeriod]}
          icon={HiOutlineTrophy}
          rightContent={
            <div className="tab-bar">
              {([['growthLM', 'LM'], ['growth3M', '3M'], ['growth6M', '6M'], ['growthYoY', 'YoY']] as const).map(([key, label]) => (
                <button key={key} className={`tab-btn ${growthPeriod === key ? 'active' : ''}`} onClick={() => setGrowthPeriod(key as GrowthPeriod)}>
                  {label}
                </button>
              ))}
            </div>
          }
        >
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: 34 }}>#</th>
                <th>Account Manager</th>
                <th>State</th>
                <th style={{ textAlign: 'right' }}>Growth</th>
                <th style={{ textAlign: 'right' }}>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {growthSorted.map((am, i) => (
                <tr key={am.name}>
                  <td><span className={`rank-badge ${rankClass(i)}`}>{i + 1}</span></td>
                  <td style={{ fontWeight: 500 }}><AMHoverCard name={am.name}>{am.name}</AMHoverCard></td>
                  <td><span className={stateChipClass(am.state)}>{am.state}</span></td>
                  <td style={{ textAlign: 'right' }}>
                    <span className="trend-up" style={{ fontWeight: 600 }}>{formatPercent(am[growthPeriod])}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>{formatCurrency(am.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel className="span-3" title="State Champions" subtitle="Top AM per state" icon={HiOutlineBuildingOffice2}>
          <table className="table">
            <thead>
              <tr>
                <th>State</th>
                <th>Top AM</th>
                <th style={{ textAlign: 'right' }}>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.stateChampions.map((c) => (
                <tr key={c.state}>
                  <td><span className={stateChipClass(c.state)}>{c.state}</span></td>
                  <td><AMHoverCard name={c.am}>{c.am}</AMHoverCard></td>
                  <td style={{ textAlign: 'right' }}>{formatCurrency(c.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel className="span-3" title="Product Champions" subtitle="Top AM per product &amp; margin" icon={HiOutlineTrophy}>
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Top AM</th>
                <th style={{ textAlign: 'right' }}>Margin</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.productChampions.map((c) => (
                <tr key={c.product}>
                  <td><span className={productChipClass(c.product)}>{c.product}</span></td>
                  <td><AMHoverCard name={c.am}>{c.am}</AMHoverCard></td>
                  <td style={{ textAlign: 'right' }}>{c.margin.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </section>
    </>
  )
}
