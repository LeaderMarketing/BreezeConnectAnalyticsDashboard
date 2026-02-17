import type { GlobalFilters as Filters } from '../../types/dashboard'

interface GlobalFiltersProps {
  filters: Filters
  onChange: (next: Filters) => void
  states: string[]
  products: string[]
  periods: readonly string[]
  accountManagers: string[]
}

export const GlobalFilters = ({ filters, onChange, states, products, periods, accountManagers }: GlobalFiltersProps) => {
  return (
    <section className="filters">
      <div className="field">
        <label>Period</label>
        <select value={filters.period} onChange={(event) => onChange({ ...filters, period: event.target.value as Filters['period'] })}>
          {periods.map((period) => (
            <option key={period} value={period}>
              {period}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>State</label>
        <select value={filters.state} onChange={(event) => onChange({ ...filters, state: event.target.value })}>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Product</label>
        <select value={filters.product} onChange={(event) => onChange({ ...filters, product: event.target.value })}>
          {products.map((product) => (
            <option key={product} value={product}>
              {product}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Account Manager</label>
        <select value={filters.accountManager} onChange={(event) => onChange({ ...filters, accountManager: event.target.value })}>
          {accountManagers.map((am) => (
            <option key={am} value={am}>
              {am}
            </option>
          ))}
        </select>
      </div>
    </section>
  )
}