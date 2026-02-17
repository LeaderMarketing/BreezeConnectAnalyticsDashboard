import { HiArrowDownRight, HiArrowUpRight } from 'react-icons/hi2'

interface KpiCardProps {
  title: string
  value: string
  meta: string
  positive?: boolean
}

export const KpiCard = ({ title, value, meta, positive = true }: KpiCardProps) => {
  return (
    <article className="kpi-card">
      <h4>{title}</h4>
      <p className="kpi-value">{value}</p>
      <div className={`kpi-meta ${positive ? 'trend-up' : 'trend-down'}`}>
        {positive ? <HiArrowUpRight size={14} /> : <HiArrowDownRight size={14} />} {meta}
      </div>
    </article>
  )
}