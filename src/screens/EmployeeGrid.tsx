import { useState } from 'react'
import { Grid, GridColumn } from '@progress/kendo-react-grid'
import { process, type State } from '@progress/kendo-data-query'
import { employees } from '../data/employees'

const initialState: State = {
  skip: 0,
  take: 10,
  sort: [{ field: 'name', dir: 'asc' }],
}

export function EmployeeGrid() {
  const [dataState, setDataState] = useState<State>(initialState)
  const result = process(employees, dataState)

  return (
    <section aria-labelledby="grid-heading">
      <h2 id="grid-heading">Employees</h2>
      <Grid
        aria-label="Employees"
        data={result}
        {...dataState}
        total={result.total}
        dataItemKey="id"
        sortable
        filterable
        pageable={{ pageSizes: [5, 10, 20], buttonCount: 5 }}
        onDataStateChange={(e) => setDataState(e.dataState)}
        style={{ maxHeight: 640 }}
      >
        <GridColumn field="id" title="ID" width="80px" filter="numeric" />
        <GridColumn field="name" title="Name" width="200px" />
        <GridColumn field="email" title="Email" width="280px" />
        <GridColumn field="department" title="Department" width="150px" />
        <GridColumn field="salary" title="Salary" width="130px" filter="numeric" format="{0:c0}" />
        <GridColumn field="hired" title="Hired" width="150px" filter="date" format="{0:d}" />
        <GridColumn field="active" title="Active" width="110px" filter="boolean" />
      </Grid>
    </section>
  )
}
