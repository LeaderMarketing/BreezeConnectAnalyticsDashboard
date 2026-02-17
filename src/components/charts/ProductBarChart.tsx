import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { ProductSales } from '../../types/dashboard'
import { formatCurrency, formatNumber } from '../../utils/format'

interface ProductBarChartProps {
  data: ProductSales[]
}

export const ProductBarChart = ({ data }: ProductBarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
        <CartesianGrid stroke="#edf2fb" vertical={false} />
        <XAxis dataKey="product" tick={{ fill: '#5b6475', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis yAxisId="left" tick={{ fill: '#5b6475', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
        <YAxis yAxisId="right" orientation="right" hide />
        <Tooltip
          contentStyle={{ borderRadius: 10, border: '1px solid #d9e5f8', fontSize: 11 }}
          formatter={(value, name) => (name === 'Revenue' ? formatCurrency(Number(value ?? 0)) : formatNumber(Number(value ?? 0)))}
        />
        <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#0469f8" radius={[5, 5, 0, 0]} />
        <Bar yAxisId="right" dataKey="users" name="Users" fill="rgb(248 163 66)" radius={[5, 5, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}