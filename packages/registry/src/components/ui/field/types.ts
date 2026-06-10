// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/field@1.x).
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.

import type { ComputedRef, HTMLAttributes, InputHTMLAttributes, Ref, TextareaHTMLAttributes, UnwrapRef } from 'vue'

// ── Detail types (inlined from @zag-js/field) ────────────────────────────────
export interface ElementIds {
  root?: string
  control?: string
  label?: string
  errorText?: string
  helperText?: string
}

// ── Detail types (inlined from @zag-js/dom-query) ────────────────────────────
export type Booleanish = boolean | 'true' | 'false'

// ── Detail types (inlined from @zag-js/checkbox) ─────────────────────────────
export type CheckedState = boolean | 'indeterminate'

// ── Root ─────────────────────────────────────────────────────────────────────
export interface FieldRootProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean

  /**
   * Indicates whether the field is disabled.
   */
  disabled?: boolean

  /**
   * The id of the field.
   */
  id?: string

  /**
   * The ids of the field parts.
   */
  ids?: ElementIds

  /**
   * Indicates whether the field is invalid.
   */
  invalid?: boolean

  /**
   * Indicates whether the field is read-only.
   */
  readOnly?: boolean

  /**
   * Indicates whether the field is required.
   */
  required?: boolean

  /**
   * The target field item value the label should point to.
   */
  target?: string
}

// ── Field API (faithful minimal copy of @ark-ui/vue's UseFieldReturn value) ──
// Ark's `UseFieldReturn = ComputedRef<FieldApi>`; mirror that exact wrapping so
// `UnwrapRef<UseFieldReturn>` resolves identically below.
export interface FieldApi {
  ariaDescribedby: string | undefined

  ids: {
    control: string
    label: string
    errorText: string
    helperText: string
  }

  refs: {
    rootRef: Ref<null, null>
  }

  disabled: boolean | undefined
  invalid: boolean | undefined
  readOnly: boolean | undefined
  required: boolean | undefined

  getLabelProps: () => {
    'id': string
    'data-disabled': Booleanish
    'data-invalid': Booleanish
    'data-readonly': Booleanish
    'data-required': Booleanish
    'htmlFor': string
    'data-scope': string
    'data-part': string
  }

  getRootProps: () => {
    'id': string
    'role': string
    'data-disabled': Booleanish
    'data-invalid': Booleanish
    'data-readonly': Booleanish
    'data-scope': string
    'data-part': string
  }

  getInputProps: () => {
    'data-scope': string
    'data-part': string
    'aria-describedby': string | undefined
    'aria-invalid': 'true' | undefined
    'data-invalid': Booleanish
    'data-required': Booleanish
    'data-readonly': Booleanish
    'id': string
    'required': boolean | undefined
    'disabled': boolean | undefined
    'readOnly': boolean | undefined
  }

  getTextareaProps: () => {
    'data-scope': string
    'data-part': string
    'aria-describedby': string | undefined
    'aria-invalid': 'true' | undefined
    'data-invalid': Booleanish
    'data-required': Booleanish
    'data-readonly': Booleanish
    'id': string
    'required': boolean | undefined
    'disabled': boolean | undefined
    'readOnly': boolean | undefined
  }

  getSelectProps: () => {
    'data-scope': string
    'data-part': string
    'aria-describedby': string | undefined
    'aria-invalid': 'true' | undefined
    'data-invalid': Booleanish
    'data-required': Booleanish
    'data-readonly': Booleanish
    'id': string
    'required': boolean | undefined
    'disabled': boolean | undefined
    'readOnly': boolean | undefined
  }

  getHelperTextProps: () => {
    'data-disabled': Booleanish
    'data-scope': string
    'data-part': string
    'id': string
  }

  getErrorTextProps: () => HTMLAttributes
  getRequiredIndicatorProps: () => HTMLAttributes
}

// ── Root Provider ────────────────────────────────────────────────────────────
export interface FieldRootProviderProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean

  /**
   * The field machine API exposed via `useField`.
   */
  value: UnwrapRef<ComputedRef<FieldApi>>
}

// ── Sub-parts ────────────────────────────────────────────────────────────────
export interface FieldInputProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean

  modelValue?: InputHTMLAttributes['value']
}

export interface FieldTextareaProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean

  /**
   * Whether the textarea should autoresize
   * @default false
   */
  autoresize?: boolean

  modelValue?: TextareaHTMLAttributes['value']
}

export interface FieldLabelProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface FieldErrorTextProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface FieldHelperTextProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface FieldRequiredIndicatorProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

// ── Field group (PolymorphicProps) ───────────────────────────────────────────
export interface FieldGroupProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

// ── Checkbox (local copy — field has no `checkbox` registryDependency) ───────
// Faithful 1:1 copy of @ark-ui/vue/checkbox CheckboxRootProps.

export interface CheckboxRootProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean

  /**
   * The controlled checked state of the checkbox
   */
  checked?: CheckedState

  /**
   * The initial checked state of the checkbox when rendered.
   * Use when you don't need to control the checked state of the checkbox.
   */
  defaultChecked?: CheckedState

  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean

  /**
   * The id of the form that the checkbox belongs to.
   */
  form?: string

  /**
   * The unique identifier of the machine.
   */
  id?: string

  /**
   * The ids of the elements in the checkbox. Useful for composition.
   */
  ids?: Partial<{
    root: string
    hiddenInput: string
    control: string
    label: string
  }>

  /**
   * Whether the checkbox is invalid
   */
  invalid?: boolean

  /**
   * The name of the input field in a checkbox.
   * Useful for form submission.
   */
  name?: string

  /**
   * Whether the checkbox is read-only
   */
  readOnly?: boolean

  /**
   * Whether the checkbox is required
   */
  required?: boolean

  /**
   * The value of checkbox input. Useful for form submission.
   * @default "on"
   */
  value?: string
}
