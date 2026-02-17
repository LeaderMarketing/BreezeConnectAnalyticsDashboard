import {
  HiOutlinePhone,
  HiOutlineGlobeAlt,
  HiOutlineBolt,
  HiOutlineMicrophone,
  HiOutlineChatBubbleLeft,
} from 'react-icons/hi2'

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  SIP: HiOutlinePhone,
  NBN: HiOutlineGlobeAlt,
  Fibre: HiOutlineBolt,
  Teams: HiOutlineMicrophone,
  SMS: HiOutlineChatBubbleLeft,
}

const colorMap: Record<string, string> = {
  SIP: '#0469f8',
  NBN: '#2b81fb',
  Fibre: '#599cff',
  Teams: '#8ab7ff',
  SMS: 'rgb(248,163,66)',
}

interface ProductIconProps {
  product: string
  size?: number
  showLabel?: boolean
}

export const ProductIcon = ({ product, size = 14, showLabel = true }: ProductIconProps) => {
  const Icon = iconMap[product]
  const color = colorMap[product] || 'var(--color-text-muted)'

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
      {Icon ? <Icon size={size} color={color} /> : null}
      {showLabel && <span>{product}</span>}
    </span>
  )
}

export const getProductColor = (product: string) => colorMap[product] || '#999'
