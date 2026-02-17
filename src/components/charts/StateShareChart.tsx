import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { StateSales } from '../../types/dashboard'

const colors = ['#0469f8', '#2b81fb', '#599cff', '#8ab7ff', 'rgb(248 163 66)']

interface StateShareChartProps {
  data: StateSales[]
}

export const StateShareChart = ({ data }: StateShareChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie data={data} dataKey="share" nameKey="state" innerRadius={62} outerRadius={90} paddingAngle={2}>
          {data.map((entry, index) => (
            <Cell key={entry.state} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${Number(value ?? 0).toFixed(1)}%`} contentStyle={{ borderRadius: 10, border: '1px solid #d9e5f8', fontSize: 11 }} />
      </PieChart>
    </ResponsiveContainer>
  )
}