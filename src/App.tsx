import { useState } from 'react'
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout'
import { EmployeeGrid } from './screens/EmployeeGrid'
import { RegistrationForm } from './screens/RegistrationForm'
import { ConfirmDialog } from './screens/ConfirmDialog'

function App() {
  const [tab, setTab] = useState(0)

  return (
    <main className="app">
      <h1>KendoReact demo</h1>
      <TabStrip selected={tab} onSelect={(e) => setTab(e.selected)}>
        <TabStripTab title="Grid">
          <EmployeeGrid />
        </TabStripTab>
        <TabStripTab title="Form">
          <RegistrationForm />
        </TabStripTab>
        <TabStripTab title="Dialog">
          <ConfirmDialog />
        </TabStripTab>
      </TabStrip>
    </main>
  )
}

export default App
