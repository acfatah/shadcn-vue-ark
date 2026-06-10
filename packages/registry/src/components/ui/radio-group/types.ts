// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/radio-group@1.x).
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.

// ── Detail types (inlined from @zag-js/radio-group) ──────────────────────────
export interface ValueChangeDetails {
  value: string | null
}

// ── Root ─────────────────────────────────────────────────────────────────────
export interface RadioGroupRootProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean

  /**
   * The initial value of the checked radio when rendered.
   * Use when you don't need to control the value of the radio group.
   */
  defaultValue?: string | null

  /**
   * If `true`, the radio group will be disabled
   */
  disabled?: boolean

  /**
   * The associate form of the underlying input.
   */
  form?: string

  /**
   * The unique identifier of the machine.
   */
  id?: string

  /**
   * The ids of the elements in the radio. Useful for composition.
   */
  ids?: Partial<{
    root: string
    label: string
    indicator: string
    item: (value: string) => string
    itemLabel: (value: string) => string
    itemControl: (value: string) => string
    itemHiddenInput: (value: string) => string
  }>

  /**
   * Whether the radio group is invalid
   */
  invalid?: boolean

  /**
   * The v-model value of the radio group
   */
  modelValue?: string | null

  /**
   * The name of the input fields in the radio
   * (Useful for form submission).
   */
  name?: string

  /**
   * Orientation of the radio group
   */
  orientation?: 'horizontal' | 'vertical'

  /**
   * Whether the checkbox is read-only
   */
  readOnly?: boolean

  /**
   * Whether the radio group is required
   */
  required?: boolean
}

export interface RadioGroupRootEmits {
  /**
   * Function called once a radio is checked
   */
  'valueChange': [details: ValueChangeDetails]

  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: ValueChangeDetails['value']]
}

// ── Sub-parts ────────────────────────────────────────────────────────────────
export interface RadioGroupItemProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean

  value: string
  disabled?: boolean
  invalid?: boolean
}

export interface RadioGroupItemTextProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface RadioGroupItemControlProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface RadioGroupIndicatorProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface RadioGroupItemHiddenInputProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface RadioGroupItemDescriptionProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface RadioGroupItemContentProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface RadioGroupItemsProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

// ── Root Provider ────────────────────────────────────────────────────────────
/**
 * Minimal local copy of @zag-js/radio-group's `Api` surface — the value passed
 * to `RadioGroupRootProvider` (Ark's `UseRadioGroupReturn` unwrapped). Captures
 * only the members the wrapper relies on; hand-written to avoid the deep generic
 * chain (TS2590).
 */
export interface RadioGroupApi {
  /** The current value of the radio group */
  value: string | null

  /** Function to set the value of the radio group */
  setValue: (value: string) => void

  /** Function to clear the value of the radio group */
  clearValue: () => void

  /** Function to focus the radio group */
  focus: () => void

  /** Returns the state details of a radio input */
  getItemState: (props: RadioGroupItemProps) => {
    value: string
    invalid: boolean
    disabled: boolean
    checked: boolean
    focused: boolean
    focusVisible: boolean
    hovered: boolean
    active: boolean
  }

  getRootProps: () => Record<string, any>
  getLabelProps: () => Record<string, any>
  getItemProps: (props: RadioGroupItemProps) => Record<string, any>
  getItemTextProps: (props: RadioGroupItemProps) => Record<string, any>
  getItemControlProps: (props: RadioGroupItemProps) => Record<string, any>
  getItemHiddenInputProps: (props: RadioGroupItemProps) => Record<string, any>
  getIndicatorProps: () => Record<string, any>
}

export interface RadioGroupRootProviderProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean

  value: RadioGroupApi
}
