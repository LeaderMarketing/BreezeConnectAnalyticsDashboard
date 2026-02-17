import type { IconType } from 'react-icons'

interface PanelProps {
  className?: string
  title: string
  subtitle?: string
  icon?: IconType
  children: React.ReactNode
  rightContent?: React.ReactNode
}

export const Panel = ({ className = '', title, subtitle, icon: Icon, children, rightContent }: PanelProps) => {
  return (
    <section className={`panel ${className}`}>
      <div className="panel-header">
        <div>
          <h3 className="panel-title">
            {Icon ? <Icon size={16} color="#0469f8" /> : null}
            {title}
          </h3>
          {subtitle ? <p className="panel-subtitle">{subtitle}</p> : null}
        </div>
        {rightContent}
      </div>
      {children}
    </section>
  )
}