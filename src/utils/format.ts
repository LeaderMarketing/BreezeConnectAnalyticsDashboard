export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(value)

export const formatPercent = (value: number) => `${value > 0 ? '+' : ''}${value.toFixed(1)}%`

export const formatNumber = (value: number) => new Intl.NumberFormat('en-AU').format(value)