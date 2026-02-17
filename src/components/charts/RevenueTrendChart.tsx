import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { MonthlyRevenuePoint } from '../../types/dashboard'
import { formatCurrency } from '../../utils/format'

interface RevenueTrendChartProps {
  data: MonthlyRevenuePoint[]
}

export const RevenueTrendChart = ({ data }: RevenueTrendChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={290}>
      <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
        <CartesianGrid stroke="#edf2fb" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: '#5b6475', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#5b6475', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
        <Tooltip formatter={(value) => formatCurrency(Number(value ?? 0))} contentStyle={{ borderRadius: 10, border: '1px solid #d9e5f8', fontSize: 11 }} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Line type="monotone" dataKey="actual" name="Actual Revenue" stroke="#0469f8" strokeWidth={2.5} dot={false} />
        <Line
          type="monotone"
          dataKey="forecast"
          name="Forecast"
          stroke="rgb(248 163 66)"
          strokeDasharray="4 4"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}