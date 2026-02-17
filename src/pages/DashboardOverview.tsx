import { useState } from 'react'
import {
  HiOutlineArrowTrendingUp,
  HiOutlineBuildingOffice2,
  HiOutlineChartBarSquare,
  HiOutlineUserGroup,
  HiOutlineShieldExclamation,
  HiOutlineTrophy,
  HiOutlineClipboardDocumentList,
} from 'react-icons/hi2'
import { HiArrowUpRight, HiArrowDownRight } from 'react-icons/hi2'
import { ProductBarChart } from '../components/charts/ProductBarChart'
import { RevenueTrendChart } from '../components/charts/RevenueTrendChart'
import { StateShareChart } from '../components/charts/StateShareChart'
import { Panel } from '../components/ui/Panel'
import { ProductIcon } from '../components/ui/ProductIcon'
import type { ReturnTypeDashboardData } from './types'
import { formatCurrency, formatNumber, formatPercent } from '../utils/format'

interface Props {
  dashboard: ReturnTypeDashboardData
}

type AMTab = 'top10' | 'growth' | 'stateChamp' | 'productChamp'
type ChurnWindow = '1M' | '3M' | '6M'
type PartnerTab = 'top20' | 'dormant'

const rankClass = (i: number) => (i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '')

export const DashboardOverview = ({ dashboard }: Props) => {
  const [amTab, setAmTab] = useState<AMTab>('top10')
  const [churnWindow, setChurnWindow] = useState<ChurnWindow>('1M')
  const [partnerTab, setPartnerTab] = useState<PartnerTab>('top20')

  const churnAccounts =
    churnWindow === '1M'
      ? dashboard.churnAccounts1M
      : churnWindow === '3M'
        ? dashboard.churnAccounts3M
        : dashboard.churnAccounts6M

  const totalChurnValue = churnAccounts.reduce((a, c) => a + c.churnValue, 0)
  const highRisk = churnAccounts.filter((c) => c.churnPct > 50).length

  return (
    <>
      {/* ── KPI Row ── */}
      <section className="kpi-grid">
        <article className="kpi-card">
          <h4>Total Revenue YTD</h4>
          <p className="kpi-value">{formatCurrency(dashboard.kpis.ytdRevenue)}</p>
          <div className="kpi-meta trend-up"><HiArrowUpRight size={14} /> vs plan +8.4%</div>
        </article>

        <article className="kpi-card">
          <h4>Revenue MTD</h4>
          <p className="kpi-value">{formatCurrency(dashboard.kpis.mtdRevenue)}</p>
          <div className="kpi-meta trend-up"><HiArrowUpRight size={14} /> {formatPercent(dashboard.kpis.growthVsLM)} vs LM</div>
        </article>

        <article className="kpi-card">
          <h4>Growth YoY</h4>
          <p className="kpi-value">{formatPercent(dashboard.kpis.growthYoY)}</p>
          <div className="kpi-meta trend-up"><HiArrowUpRight size={14} /> year over year</div>
        </article>

        <article className="kpi-card">
          <h4>Active Accounts</h4>
          <p className="kpi-value">{formatNumber(dashboard.kpis.activeAccounts)}</p>
          <div className="kpi-meta trend-up"><HiArrowUpRight size={14} /> +312 this month</div>
        </article>

        <article className="kpi-card">
          <h4>Churn Rate</h4>
          <p className="kpi-value">{dashboard.kpis.churnRate.toFixed(1)}%</p>
          <div className="kpi-meta trend-down"><HiArrowDownRight size={14} /> revenue + payments</div>
        </article>
      </section>

      {/* ── Growth & Forecast  +  Sales by State ── */}
      <section className="panel-grid">
        <Panel
          className="span-8"
          title="Growth & Forecast"
          subtitle="18-month revenue trend with forecast baseline"
          icon={HiOutlineArrowTrendingUp}
        >
          <RevenueTrendChart data={dashboard.revenueTrend} />
        </Panel>

        <Panel className="span-4" title="Sales by State" subtitle="Revenue share by state" icon={HiOutlineBuildingOffice2}>
          <StateShareChart data={dashboard.stateSalesData} />
          <div style={{ marginTop: 8 }}>
            {dashboard.stateSalesData.map((s) => (
              <div key={s.state} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0' }}>
                <span style={{ fontSize: 11, fontWeight: 500, width: 30 }}>{s.state}</span>
                <div className="progress-bar" style={{ flex: 1 }}>
                  <div
                    className="progress-fill"
                    style={{ width: `${s.share}%`, background: 'var(--color-primary)' }}
                  />
                </div>
                <span style={{ fontSize: 11, color: 'var(--color-text-muted)', width: 38, textAlign: 'right' }}>
                  {s.share.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      {/* ── Sales by Product Type ── */}
      <section className="panel-grid">
        <Panel
          className="span-12"
          title="Sales by Product Type"
          subtitle="Revenue, users and growth by service family"
          icon={HiOutlineChartBarSquare}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', alignItems: 'start' }}>
            <ProductBarChart data={dashboard.productSalesData} />
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th style={{ textAlign: 'right' }}>Revenue</th>
                  <th style={{ textAlign: 'right' }}># Users</th>
                  <th style={{ textAlign: 'right' }}>vs LM</th>
                  <th style={{ textAlign: 'right' }}>YoY</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.productSalesData.map((p) => (
                  <tr key={p.product}>
                    <td>
                      <ProductIcon product={p.product} />
                    </td>
                    <td style={{ textAlign: 'right' }}>{formatCurrency(p.revenue)}</td>
                    <td style={{ textAlign: 'right' }}>{formatNumber(p.users)}</td>
                    <td style={{ textAlign: 'right' }}><span className="trend-up">{formatPercent(p.growthLM)}</span></td>
                    <td style={{ textAlign: 'right' }}><span className="trend-up">{formatPercent(p.growthYoY)}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </section>

      {/* ── AM Performance (tabbed) ── */}
      <section className="panel-grid">
        <Panel
          className="span-12"
          title="Account Manager Performance"
          subtitle="Top AMs, growth leaders, state and product champions"
          icon={HiOutlineTrophy}
          rightContent={
            <div className="tab-bar">
              {([['top10', 'Top 10'], ['growth', 'Growth Leaders'], ['stateChamp', 'State Champions'], ['productChamp', 'Product Champions']] as const).map(([key, label]) => (
                <button key={key} className={`tab-btn ${amTab === key ? 'active' : ''}`} onClick={() => setAmTab(key as AMTab)}>{label}</button>
              ))}
            </div>
          }
        >
          {amTab === 'top10' && (
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: 34 }}>#</th>
                  <th>Account Manager</th>
                  <th>State</th>
                  <th style={{ textAlign: 'right' }}>Revenue</th>
                  <th style={{ textAlign: 'right' }}>Margin</th>
                  <th style={{ textAlign: 'right' }}>YoY</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.topAMs.map((am, i) => (
                  <tr key={am.name}>
                    <td><span className={`rank-badge ${rankClass(i)}`}>{i + 1}</span></td>
                    <td>{am.name}</td>
                    <td><span className="chip info">{am.state}</span></td>
                    <td style={{ textAlign: 'right' }}>{formatCurrency(am.revenue)}</td>
                    <td style={{ textAlign: 'right' }}>{am.margin.toFixed(1)}%</td>
                    <td style={{ textAlign: 'right' }}><span className="trend-up">{formatPercent(am.growthYoY)}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {amTab === 'growth' && (
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: 34 }}>#</th>
                  <th>Account Manager</th>
                  <th style={{ textAlign: 'right' }}>vs LM</th>
                  <th style={{ textAlign: 'right' }}>3M</th>
                  <th style={{ textAlign: 'right' }}>6M</th>
                  <th style={{ textAlign: 'right' }}>YoY</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.growthAMs.map((am, i) => (
                  <tr key={am.name}>
                    <td><span className={`rank-badge ${rankClass(i)}`}>{i + 1}</span></td>
                    <td>{am.name}</td>
                    <td style={{ textAlign: 'right' }}><span className="trend-up">{formatPercent(am.growthLM)}</span></td>
                    <td style={{ textAlign: 'right' }}><span className="trend-up">{formatPercent(am.growth3M)}</span></td>
                    <td style={{ textAlign: 'right' }}><span className="trend-up">{formatPercent(am.growth6M)}</span></td>
                    <td style={{ textAlign: 'right' }}><span className="trend-up">{formatPercent(am.growthYoY)}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {amTab === 'stateChamp' && (
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
                    <td><span className="chip info">{c.state}</span></td>
                    <td>{c.am}</td>
                    <td style={{ textAlign: 'right' }}>{formatCurrency(c.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {amTab === 'productChamp' && (
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Top AM</th>
                  <th style={{ textAlign: 'right' }}>Revenue</th>
                  <th style={{ textAlign: 'right' }}>Margin %</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.productChampions.map((c) => (
                  <tr key={c.product}>
                    <td><span className="chip info">{c.product}</span></td>
                    <td>{c.am}</td>
                    <td style={{ textAlign: 'right' }}>{formatCurrency(c.revenue)}</td>
                    <td style={{ textAlign: 'right' }}>{c.margin.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Panel>
      </section>

      {/* ── Churn Analysis ── */}
      <section className="panel-grid">
        <Panel
          className="span-12"
          title="Churn Analysis"
          subtitle="Revenue churn by state, product and account risk"
          icon={HiOutlineShieldExclamation}
          rightContent={
            <div className="tab-bar">
              {(['1M', '3M', '6M'] as const).map((w) => (
                <button key={w} className={`tab-btn ${churnWindow === w ? 'active' : ''}`} onClick={() => setChurnWindow(w)}>{w}</button>
              ))}
            </div>
          }
        >
          {/* Churn KPI tiles */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
            <div className="metric-tile">
              <h5>Churn Rate</h5>
              <p>{dashboard.kpis.churnRate.toFixed(1)}%</p>
            </div>
            <div className="metric-tile">
              <h5>At-Risk ({churnWindow})</h5>
              <p>{highRisk}</p>
            </div>
            <div className="metric-tile">
              <h5>Revenue at Risk</h5>
              <p>{formatCurrency(totalChurnValue)}</p>
            </div>
            <div className="metric-tile">
              <h5>Moved Carriers</h5>
              <p>12</p>
            </div>
          </div>

          {/* Two-column: breakdown + table */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            {/* Churn by state + product */}
            <div>
              <h4 style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', color: 'var(--color-text-muted)', marginBottom: 10 }}>By State</h4>
              {dashboard.churnByState.map((s) => (
                <div key={s.state} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
                  <span style={{ width: 30, fontSize: 11, fontWeight: 500 }}>{s.state}</span>
                  <div className="progress-bar" style={{ flex: 1 }}>
                    <div className="progress-fill" style={{ width: `${(s.churnRate / 10) * 100}%`, background: s.churnRate > 7 ? 'var(--color-danger)' : s.churnRate > 5 ? 'var(--color-accent)' : 'var(--color-success)' }} />
                  </div>
                  <span style={{ width: 38, fontSize: 11, textAlign: 'right', color: s.churnRate > 7 ? 'var(--color-danger)' : 'var(--color-text-muted)' }}>{s.churnRate}%</span>
                </div>
              ))}

              <h4 style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', color: 'var(--color-text-muted)', margin: '18px 0 10px' }}>By Product</h4>
              {dashboard.churnByProduct.map((p) => (
                <div key={p.product} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
                  <span style={{ width: 40, fontSize: 11, fontWeight: 500 }}>{p.product}</span>
                  <div className="progress-bar" style={{ flex: 1 }}>
                    <div className="progress-fill" style={{ width: `${(p.churnRate / 10) * 100}%`, background: p.churnRate > 7 ? 'var(--color-danger)' : p.churnRate > 5 ? 'var(--color-accent)' : 'var(--color-success)' }} />
                  </div>
                  <span style={{ width: 38, fontSize: 11, textAlign: 'right' }}>{p.churnRate}%</span>
                </div>
              ))}
            </div>

            {/* Top 5 accounts */}
            <div>
              <h4 style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', color: 'var(--color-text-muted)', marginBottom: 10 }}>Top 5 Accounts ({churnWindow} Window)</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th>Account</th>
                    <th>Product</th>
                    <th style={{ textAlign: 'right' }}>$ Churn</th>
                    <th style={{ textAlign: 'right' }}>% Churn</th>
                  </tr>
                </thead>
                <tbody>
                  {churnAccounts.map((c) => (
                    <tr key={c.account}>
                      <td>
                        <div>{c.account}</div>
                        <div style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>{c.partner} &middot; {c.state}</div>
                      </td>
                      <td>{c.product}</td>
                      <td style={{ textAlign: 'right' }}>{formatCurrency(c.churnValue)}</td>
                      <td style={{ textAlign: 'right' }}>
                        <span className={c.churnPct > 50 ? 'chip bad' : c.churnPct > 30 ? 'chip warn' : 'chip good'}>
                          {c.churnPct.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                  {churnAccounts.length === 0 && (
                    <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: 20 }}>No churn data for current filters</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Panel>
      </section>

      {/* ── Partners  +  Top Plans ── */}
      <section className="panel-grid">
        <Panel
          className="span-7"
          title="Partner Performance"
          subtitle="Top revenue partners and dormant accounts"
          icon={HiOutlineUserGroup}
          rightContent={
            <div className="tab-bar">
              <button className={`tab-btn ${partnerTab === 'top20' ? 'active' : ''}`} onClick={() => setPartnerTab('top20')}>Top 20</button>
              <button className={`tab-btn ${partnerTab === 'dormant' ? 'active' : ''}`} onClick={() => setPartnerTab('dormant')}>
                Not Spending <span className="chip bad" style={{ marginLeft: 4 }}>{dashboard.nonSpendingPartners.length}</span>
              </button>
            </div>
          }
        >
          {partnerTab === 'top20' && (
            <div style={{ maxHeight: 380, overflowY: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: 30 }}>#</th>
                    <th>Partner</th>
                    <th style={{ textAlign: 'right' }}>Revenue</th>
                    <th style={{ textAlign: 'right' }}>YoY</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboard.topPartners.map((p, i) => (
                    <tr key={p.partner}>
                      <td><span className={`rank-badge ${rankClass(i)}`}>{i + 1}</span></td>
                      <td>{p.partner}</td>
                      <td style={{ textAlign: 'right' }}>{formatCurrency(p.revenue)}</td>
                      <td style={{ textAlign: 'right' }}>
                        <span className={p.growthYoY >= 0 ? 'trend-up' : 'trend-down'}>{formatPercent(p.growthYoY)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {partnerTab === 'dormant' && (
            <>
              <div className="metric-tile" style={{ marginBottom: 'var(--space-3)' }}>
                <h5>Partners Signed but Not Spending</h5>
                <p>{dashboard.nonSpendingPartners.length}</p>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Partner</th>
                    <th>Contract</th>
                    <th style={{ textAlign: 'right' }}>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboard.nonSpendingPartners.map((p) => (
                    <tr key={p.partner}>
                      <td>{p.partner}</td>
                      <td><span className="chip warn">Signed</span></td>
                      <td style={{ textAlign: 'right', color: 'var(--color-danger)' }}>$0</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </Panel>

        <Panel
          className="span-5"
          title="Top 5 Product Plans"
          subtitle="By user base and revenue contribution"
          icon={HiOutlineClipboardDocumentList}
        >
          <table className="table">
            <thead>
              <tr>
                <th>Plan</th>
                <th>Product</th>
                <th style={{ textAlign: 'right' }}># Users</th>
                <th style={{ textAlign: 'right' }}>Contribution</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.topPlansData.map((p) => (
                <tr key={p.plan}>
                  <td>{p.plan}</td>
                  <td><span className="chip info">{p.product}</span></td>
                  <td style={{ textAlign: 'right' }}>{formatNumber(p.users)}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
                      <div className="progress-bar" style={{ width: 60 }}>
                        <div className="progress-fill" style={{ width: `${(p.contribution / 16) * 100}%`, background: 'var(--color-primary)' }} />
                      </div>
                      <span>{p.contribution.toFixed(1)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </section>
    </>
  )
}
