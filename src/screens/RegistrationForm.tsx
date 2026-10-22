import { useState } from 'react'
import {
  Field,
  Form,
  FormElement,
  type FieldRenderProps,
  type FormRenderProps,
} from '@progress/kendo-react-form'
import { Input } from '@progress/kendo-react-inputs'
import { DatePicker } from '@progress/kendo-react-dateinputs'
import { Button } from '@progress/kendo-react-buttons'
import { Error, Hint, Label } from '@progress/kendo-react-labels'

interface FormValues {
  fullName: string
  email: string
  startDate: Date | null
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const requiredValidator = (message: string) => (value: unknown) =>
  value === null || value === undefined || String(value).trim() === '' ? message : ''

const nameValidator = requiredValidator('Full name is required.')

const emailValidator = (value: string) =>
  !value ? 'Email is required.' : emailRegex.test(value) ? '' : 'Enter a valid email address.'

const dateValidator = (value: Date | null) => {
  if (!value) return 'Start date is required.'
  if (Number.isNaN(value.getTime())) return 'Enter a valid date.'
  return ''
}

interface FieldExtras {
  label: string
  hint?: string
  type?: string
}

function TextField({ label, hint, type, validationMessage, visited, ...rest }: FieldRenderProps & FieldExtras) {
  const showError = visited && validationMessage
  const id = rest.name
  return (
    <div className="field">
      <Label editorId={id}>{label} *</Label>
      <Input
        id={id}
        name={rest.name}
        type={type}
        value={String(rest.value ?? '')}
        valid={!showError}
        required
        ariaDescribedBy={showError ? `${id}-error` : hint ? `${id}-hint` : undefined}
        aria-invalid={!!showError}
        onChange={rest.onChange}
        onBlur={rest.onBlur}
        onFocus={rest.onFocus}
      />
      {showError ? <Error id={`${id}-error`}>{validationMessage}</Error> : hint && <Hint id={`${id}-hint`}>{hint}</Hint>}
    </div>
  )
}

function DateField({ label, hint, validationMessage, visited, ...rest }: FieldRenderProps & FieldExtras) {
  const showError = visited && validationMessage
  const id = rest.name
  return (
    <div className="field">
      <Label editorId={id}>{label} *</Label>
      <DatePicker
        id={id}
        name={rest.name}
        value={rest.value}
        valid={!showError}
        required
        ariaDescribedBy={showError ? `${id}-error` : hint ? `${id}-hint` : undefined}
        onChange={rest.onChange}
        onBlur={rest.onBlur}
        onFocus={rest.onFocus}
      />
      {showError ? <Error id={`${id}-error`}>{validationMessage}</Error> : hint && <Hint id={`${id}-hint`}>{hint}</Hint>}
    </div>
  )
}

export function RegistrationForm() {
  const [submitted, setSubmitted] = useState<FormValues | null>(null)

  return (
    <section aria-labelledby="form-heading">
      <h2 id="form-heading">New employee</h2>
      <Form
        initialValues={{ fullName: '', email: '', startDate: null } satisfies FormValues}
        onSubmit={(values) => setSubmitted(values as FormValues)}
        render={(formRenderProps: FormRenderProps) => (
          <FormElement style={{ maxWidth: 420 }} noValidate>
            <Field name="fullName" component={TextField} label="Full name" validator={nameValidator} />
            <Field
              name="email"
              component={TextField}
              type="email"
              label="Email"
              hint="We'll use this for account notifications."
              validator={emailValidator}
            />
            <Field name="startDate" component={DateField} label="Start date" validator={dateValidator} />
            <div className="actions">
              <Button type="submit" themeColor="primary" disabled={!formRenderProps.allowSubmit}>
                Submit
              </Button>
              <Button type="button" onClick={formRenderProps.onFormReset}>
                Clear
              </Button>
            </div>
          </FormElement>
        )}
      />
      <div role="status" aria-live="polite">
        {submitted && (
          <p>
            Saved <strong>{submitted.fullName}</strong> ({submitted.email}), starting{' '}
            {submitted.startDate?.toLocaleDateString()}.
          </p>
        )}
      </div>
    </section>
  )
}
