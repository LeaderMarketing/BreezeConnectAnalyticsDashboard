import { useMemo, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { GlobalFilters } from './components/filters/GlobalFilters'
import { AppShell } from './components/layout/AppShell'
import { getDashboardData, periods, products, states } from './data/mockData'
import { AMPerformanceDetail } from './pages/AMPerformanceDetail'
import { ChurnDetail } from './pages/ChurnDetail'
import { DashboardOverview } from './pages/DashboardOverview'
import type { GlobalFilters as Filters } from './types/dashboard'

const defaultFilters: Filters = {
  period: 'YTD',
  state: 'All',
  product: 'All',
  accountManager: 'All',
}

function App() {
  const [filters, setFilters] = useState<Filters>(defaultFilters)

  const dashboard = useMemo(() => getDashboardData(filters), [filters])

  return (
    <AppShell>
      <GlobalFilters
        filters={filters}
        onChange={setFilters}
        periods={periods}
        states={states}
        products={products}
        accountManagers={dashboard.accountManagerOptions}
      />

      <Routes>
        <Route path="/" element={<DashboardOverview dashboard={dashboard} />} />
        <Route path="/churn" element={<ChurnDetail dashboard={dashboard} />} />
        <Route path="/am-performance" element={<AMPerformanceDetail dashboard={dashboard} />} />
      </Routes>
    </AppShell>
  )
}

export default App
