// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/checkbox@1.x).
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.

import type { VariantProps } from 'class-variance-authority'

import type { checkboxVariants } from './variant'

export type CheckboxVariants = VariantProps<typeof checkboxVariants>

// ── Detail types (inlined from @zag-js/checkbox) ─────────────────────────────
export type CheckedState = boolean | 'indeterminate'

export interface CheckedChangeDetails {
  checked: CheckedState
}

// ── Root ─────────────────────────────────────────────────────────────────────
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

export interface CheckboxRootEmits {
  /**
   * The callback invoked when the checked state changes.
   */
  'checkedChange': [details: CheckedChangeDetails]

  /**
   * The callback invoked when the checked state changes.
   */
  'update:checked': [checked: CheckedState]
}

// ── Sub-parts ────────────────────────────────────────────────────────────────
export interface CheckboxLabelProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface CheckboxControlProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface CheckboxIndicatorProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean

  indeterminate?: boolean
}

export interface CheckboxHiddenInputProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

// ── Group ────────────────────────────────────────────────────────────────────
export interface CheckboxGroupProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean

  /**
   * The initial value of `value` when uncontrolled
   */
  defaultValue?: string[]

  /**
   * The controlled value of the checkbox group
   */
  modelValue?: string[]

  /**
   * If `true`, the checkbox group is disabled
   */
  disabled?: boolean

  /**
   * If `true`, the checkbox group is read-only
   */
  readOnly?: boolean

  /**
   * The name of the input fields in the checkbox group
   * (Useful for form submission).
   */
  name?: string

  /**
   * If `true`, the checkbox group is invalid
   */
  invalid?: boolean

  /**
   * The maximum number of selected values
   */
  maxSelectedValues?: number
}

export interface CheckboxGroupEmits {
  /**
   * Functional called when the value changes.
   */
  'valueChange': [value: string[]]

  'update:modelValue': [value: string[]]
}
