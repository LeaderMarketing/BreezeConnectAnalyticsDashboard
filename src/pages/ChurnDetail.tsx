import { useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  HiOutlineExclamationTriangle,
  HiOutlineShieldExclamation,
  HiOutlineArrowTrendingDown,
} from 'react-icons/hi2'
import { HiArrowDownRight } from 'react-icons/hi2'
import { Panel } from '../components/ui/Panel'
import type { ReturnTypeDashboardData } from './types'
import { formatCurrency } from '../utils/format'

interface Props {
  dashboard: ReturnTypeDashboardData
}

type ChurnWindow = '1M' | '3M' | '6M'
type BreakdownView = 'state' | 'product'

const pieColors = ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e', '#06b6d4', '#8b5cf6']
const stateChipClass = (s: string) => `chip state-${s.toLowerCase()}`
const productChipClass = (p: string) => `chip product-${p.toLowerCase()}`

export const ChurnDetail = ({ dashboard }: Props) => {
  const [window, setWindow] = useState<ChurnWindow>('1M')
  const [breakdown, setBreakdown] = useState<BreakdownView>('state')

  const churnAccounts =
    window === '1M'
      ? dashboard.churnAccounts1M
      : window === '3M'
        ? dashboard.churnAccounts3M
        : dashboard.churnAccounts6M

  const totalChurnValue = churnAccounts.reduce((a, c) => a + c.churnValue, 0)
  const highRisk = churnAccounts.filter((c) => c.churnPct > 50).length
  const avgChurn = churnAccounts.length > 0
    ? churnAccounts.reduce((a, c) => a + c.churnPct, 0) / churnAccounts.length
    : 0

  return (
    <>
      {/* KPI Row */}
      <section className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <article className="kpi-card">
          <h4>Overall Churn Rate</h4>
          <p className="kpi-value">{dashboard.kpis.churnRate.toFixed(1)}%</p>
          <div className="kpi-meta trend-down"><HiArrowDownRight size={14} /> hybrid revenue + payments</div>
        </article>
        <article className="kpi-card">
          <h4>Revenue at Risk ({window})</h4>
          <p className="kpi-value">{formatCurrency(totalChurnValue)}</p>
          <div className="kpi-meta trend-down"><HiArrowDownRight size={14} /> {churnAccounts.length} accounts</div>
        </article>
        <article className="kpi-card">
          <h4>High-Risk Accounts</h4>
          <p className="kpi-value">{highRisk}</p>
          <div className="kpi-meta trend-down"><HiArrowDownRight size={14} /> {'>'} 50% decline</div>
        </article>
        <article className="kpi-card">
          <h4>Avg. Churn %</h4>
          <p className="kpi-value">{avgChurn.toFixed(1)}%</p>
          <div className="kpi-meta trend-down"><HiArrowDownRight size={14} /> across window</div>
        </article>
      </section>

      {/* Churn Trend */}
      <section className="panel-grid">
        <Panel
          className="span-8"
          title="Churn Rate Trend"
          subtitle="12-month monthly churn rate"
          icon={HiOutlineArrowTrendingDown}
        >
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={dashboard.churnTrend} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
              <defs>
                <linearGradient id="churnGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#edf2fb" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#5b6475', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 10]} tick={{ fill: '#5b6475', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(v) => `${Number(v ?? 0).toFixed(1)}%`} contentStyle={{ borderRadius: 10, border: '1px solid #d9e5f8', fontSize: 11 }} />
              <Area type="monotone" dataKey="rate" name="Churn Rate" stroke="#ef4444" strokeWidth={2.2} fill="url(#churnGrad)" dot={{ r: 3, fill: '#ef4444' }} />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>

        <Panel className="span-4" title="Risk Definition" subtitle="For concept demo" icon={HiOutlineExclamationTriangle}>
          <div style={{ display: 'grid', gap: 10, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="chip good">Green</span>
              <span style={{ fontSize: 11 }}>Stable / normal payment pattern</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="chip warn">Amber</span>
              <span style={{ fontSize: 11 }}>1-2 missed payments or 25%+ decline</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="chip bad">Red</span>
              <span style={{ fontSize: 11 }}>3+ missed payments or 50%+ decline</span>
            </div>
          </div>
          <div className="metric-tile">
            <h5>Moved Carriers</h5>
            <p>12</p>
          </div>
        </Panel>
      </section>

      {/* Breakdown by state / product */}
      <section className="panel-grid">
        <Panel
          className="span-6"
          title="Churn Breakdown"
          subtitle="Rate and at-risk accounts by dimension"
          icon={HiOutlineShieldExclamation}
          rightContent={
            <div className="tab-bar">
              <button className={`tab-btn ${breakdown === 'state' ? 'active' : ''}`} onClick={() => setBreakdown('state')}>By State</button>
              <button className={`tab-btn ${breakdown === 'product' ? 'active' : ''}`} onClick={() => setBreakdown('product')}>By Product</button>
            </div>
          }
        >
          {breakdown === 'state' && (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={dashboard.churnByState} layout="vertical" margin={{ top: 4, right: 12, left: 8, bottom: 4 }}>
                  <CartesianGrid stroke="#edf2fb" horizontal={false} />
                  <XAxis type="number" domain={[0, 10]} tick={{ fontSize: 11, fill: '#5b6475' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                  <YAxis type="category" dataKey="state" tick={{ fontSize: 11, fill: '#5b6475' }} axisLine={false} tickLine={false} width={34} />
                  <Tooltip formatter={(v) => `${Number(v ?? 0).toFixed(1)}%`} contentStyle={{ borderRadius: 10, border: '1px solid #d9e5f8', fontSize: 11 }} />
                  <Bar dataKey="churnRate" name="Churn Rate" radius={[0, 5, 5, 0]}>
                    {dashboard.churnByState.map((s) => (
                      <Cell key={s.state} fill={s.churnRate > 7 ? '#ef4444' : s.churnRate > 5 ? '#f59e0b' : '#22c55e'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <table className="table" style={{ marginTop: 8 }}>
                <thead>
                  <tr>
                    <th>State</th>
                    <th style={{ textAlign: 'right' }}>Churn Rate</th>
                    <th style={{ textAlign: 'right' }}>At-Risk</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboard.churnByState.map((s) => (
                    <tr key={s.state}>
                      <td><span className={stateChipClass(s.state)}>{s.state}</span></td>
                      <td style={{ textAlign: 'right' }}>
                        <span className={s.churnRate > 7 ? 'trend-down' : ''}>{s.churnRate}%</span>
                      </td>
                      <td style={{ textAlign: 'right' }}>{s.atRisk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {breakdown === 'product' && (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={dashboard.churnByProduct} dataKey="accounts" nameKey="product" innerRadius={55} outerRadius={80} paddingAngle={3}>
                    {dashboard.churnByProduct.map((p, i) => (
                      <Cell key={p.product} fill={pieColors[i % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v, name) => [`${Number(v ?? 0)} accounts`, String(name)]}
                    contentStyle={{ borderRadius: 10, border: '1px solid #d9e5f8', fontSize: 11 }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <table className="table" style={{ marginTop: 8 }}>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th style={{ textAlign: 'right' }}>Churn Rate</th>
                    <th style={{ textAlign: 'right' }}>Accounts</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboard.churnByProduct.map((p) => (
                    <tr key={p.product}>
                      <td>{p.product}</td>
                      <td style={{ textAlign: 'right' }}>{p.churnRate}%</td>
                      <td style={{ textAlign: 'right' }}>{p.accounts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </Panel>

        {/* Top churn accounts with period toggle */}
        <Panel
          className="span-6"
          title="Top Churn Accounts"
          subtitle="Accounts with highest revenue decline"
          icon={HiOutlineShieldExclamation}
          rightContent={
            <div className="tab-bar">
              {(['1M', '3M', '6M'] as const).map((w) => (
                <button key={w} className={`tab-btn ${window === w ? 'active' : ''}`} onClick={() => setWindow(w)}>{w}</button>
              ))}
            </div>
          }
        >
          <table className="table">
            <thead>
              <tr>
                <th>Account</th>
                <th>Product</th>
                <th>State</th>
                <th style={{ textAlign: 'right' }}>$ Churn</th>
                <th style={{ textAlign: 'right' }}>% Churn</th>
              </tr>
            </thead>
            <tbody>
              {churnAccounts.map((c) => (
                <tr key={c.account}>
                  <td>
                    <div style={{ fontWeight: 500 }}>{c.account}</div>
                    <div style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>{c.partner}</div>
                  </td>
                  <td><span className={productChipClass(c.product)}>{c.product}</span></td>
                  <td>{c.state}</td>
                  <td style={{ textAlign: 'right' }}>{formatCurrency(c.churnValue)}</td>
                  <td style={{ textAlign: 'right' }}>
                    <span className={c.churnPct > 50 ? 'chip bad' : c.churnPct > 30 ? 'chip warn' : 'chip good'}>
                      {c.churnPct.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
              {churnAccounts.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: 24 }}>No churn data for current filters</td></tr>
              )}
            </tbody>
          </table>
        </Panel>
      </section>
    </>
  )
}
