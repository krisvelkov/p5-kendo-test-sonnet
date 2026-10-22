import { useState } from 'react'
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs'
import { Button } from '@progress/kendo-react-buttons'

export function ConfirmDialog() {
  const [open, setOpen] = useState(false)
  const [result, setResult] = useState('')

  const close = (message: string) => {
    setOpen(false)
    setResult(message)
  }

  return (
    <section aria-labelledby="dialog-heading">
      <h2 id="dialog-heading">Confirmation dialog</h2>
      <Button themeColor="error" onClick={() => setOpen(true)}>
        Delete account
      </Button>
      <div role="status" aria-live="polite">
        {result && <p>{result}</p>}
      </div>
      {open && (
        <Dialog title="Delete account" onClose={() => close('Deletion cancelled.')} width={400} aria-label="Delete account">
          <p>This action cannot be undone. Are you sure you want to continue?</p>
          <DialogActionsBar>
            <Button onClick={() => close('Deletion cancelled.')}>Cancel</Button>
            <Button themeColor="error" autoFocus onClick={() => close('Account deleted.')}>
              Delete
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </section>
  )
}
