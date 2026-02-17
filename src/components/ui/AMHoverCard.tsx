import { useState, useRef, useEffect } from 'react'
import { getAMProfile } from '../../data/mockData'
import { ProductIcon } from './ProductIcon'
import {
  HiOutlineArrowTrendingUp,
  HiOutlineChartBarSquare,
  HiOutlineMapPin,
} from 'react-icons/hi2'

const formatCurrency = (v: number) =>
  '$' + v.toLocaleString('en-AU', { maximumFractionDigits: 0 })

const stateColors: Record<string, string> = {
  NSW: '#0469f8',
  VIC: '#6d28d9',
  QLD: '#d97706',
  WA: '#059669',
  SA: '#dc2626',
}

const productColors: Record<string, string> = {
  SIP: '#0469f8',
  NBN: '#059669',
  Fibre: '#d97706',
  Teams: '#6d28d9',
  SMS: '#ec4899',
}

interface AMHoverCardProps {
  name: string
  children: React.ReactNode
}

export const AMHoverCard = ({ name, children }: AMHoverCardProps) => {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState<'bottom' | 'top'>('bottom')
  const triggerRef = useRef<HTMLSpanElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  const profile = getAMProfile(name)
  if (!profile) return <>{children}</>

  const maxProductRevenue = Math.max(...profile.products.map((p) => p.revenue))

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect()
        const spaceBelow = window.innerHeight - rect.bottom
        setPosition(spaceBelow < 340 ? 'top' : 'bottom')
      }
      setVisible(true)
    }, 250)
  }

  const handleLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setVisible(false), 200)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <span
      className="am-hover-trigger"
      ref={triggerRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
      {visible && (
        <div
          className={`am-hover-card ${position === 'top' ? 'am-hover-card-top' : ''}`}
          ref={cardRef}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {/* Header */}
          <div className="am-hover-header">
            <div className="am-hover-avatar">
              {name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="am-hover-identity">
              <span className="am-hover-name">{profile.name}</span>
              <span className="am-hover-state">
                <HiOutlineMapPin size={12} />
                {profile.state}
              </span>
            </div>
            <span
              className="am-hover-state-badge"
              style={{ background: `${stateColors[profile.state] || '#0469f8'}18`, color: stateColors[profile.state] || '#0469f8' }}
            >
              {profile.state}
            </span>
          </div>

          {/* KPI row */}
          <div className="am-hover-kpis">
            <div className="am-hover-kpi">
              <span className="am-hover-kpi-label">Total Revenue</span>
              <span className="am-hover-kpi-value">{formatCurrency(profile.revenue)}</span>
            </div>
            <div className="am-hover-kpi">
              <span className="am-hover-kpi-label">
                <HiOutlineArrowTrendingUp size={11} />
                Growth YoY
              </span>
              <span className="am-hover-kpi-value am-hover-kpi-green">+{profile.growthYoY.toFixed(1)}%</span>
            </div>
            <div className="am-hover-kpi">
              <span className="am-hover-kpi-label">
                <HiOutlineChartBarSquare size={11} />
                Margin
              </span>
              <span className="am-hover-kpi-value">{profile.margin.toFixed(1)}%</span>
            </div>
          </div>

          {/* Product breakdown */}
          <div className="am-hover-products">
            <span className="am-hover-section-label">Revenue by Product</span>
            {profile.products.map((p) => {
              const pct = profile.revenue > 0 ? ((p.revenue / profile.revenue) * 100).toFixed(1) : '0'
              return (
                <div key={p.product} className="am-hover-product-row">
                  <div className="am-hover-product-label">
                    <ProductIcon product={p.product} size={13} showLabel={false} />
                    <span>{p.product}</span>
                  </div>
                  <div className="am-hover-product-bar-track">
                    <div
                      className="am-hover-product-bar-fill"
                      style={{
                        width: `${maxProductRevenue > 0 ? (p.revenue / maxProductRevenue) * 100 : 0}%`,
                        background: productColors[p.product] || '#0469f8',
                      }}
                    />
                  </div>
                  <span className="am-hover-product-amount">{formatCurrency(p.revenue)}</span>
                  <span className="am-hover-product-pct">{pct}%</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </span>
  )
}
