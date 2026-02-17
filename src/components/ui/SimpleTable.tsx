interface Column<T> {
  key: string
  header: string
  render: (row: T) => React.ReactNode
}

interface SimpleTableProps<T> {
  rows: T[]
  columns: Column<T>[]
}

export const SimpleTable = <T,>({ rows, columns }: SimpleTableProps<T>) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.key}>{column.render(row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}