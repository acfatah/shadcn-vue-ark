// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/number-input@1.x).
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.

// ── Detail types (inlined from @zag-js/number-input) ─────────────────────────
export interface ValueChangeDetails {
  value: string
  valueAsNumber: number
}

export interface FocusChangeDetails extends ValueChangeDetails {
  focused: boolean
}

export type ValidityState = 'rangeUnderflow' | 'rangeOverflow'

export interface ValueInvalidDetails extends ValueChangeDetails {
  reason: ValidityState
}

export interface IntlTranslations {
  /**
   * Function that returns the human-readable value.
   * It is used to set the `aria-valuetext` property of the input
   */
  valueText?: ((value: string) => string) | undefined

  /**
   * The label foe the increment button
   */
  incrementLabel?: string | undefined

  /**
   * The label for the decrement button
   */
  decrementLabel?: string | undefined
}

// ── Root ─────────────────────────────────────────────────────────────────────
export interface NumberInputRootProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean

  /**
   * Whether to allow mouse wheel to change the value
   */
  allowMouseWheel?: boolean

  /**
   * Whether to allow the value overflow the min/max range
   * @default true
   */
  allowOverflow?: boolean

  /**
   * Whether to clamp the value when the input loses focus (blur)
   * @default true
   */
  clampValueOnBlur?: boolean

  /**
   * The initial value of the input when rendered.
   * Use when you don't need to control the value of the input.
   */
  defaultValue?: string

  /**
   * Whether the number input is disabled.
   */
  disabled?: boolean

  /**
   * Whether to focus input when the value changes
   * @default true
   */
  focusInputOnChange?: boolean

  /**
   * The associate form of the input element.
   */
  form?: string

  /**
   * The options to pass to the `Intl.NumberFormat` constructor
   */
  formatOptions?: Intl.NumberFormatOptions

  /**
   * The unique identifier of the machine.
   */
  id?: string

  /**
   * The ids of the elements in the number input. Useful for composition.
   */
  ids?: Partial<{
    root: string
    label: string
    input: string
    incrementTrigger: string
    decrementTrigger: string
    scrubber: string
  }>

  /**
   * Hints at the type of data that might be entered by the user. It also determines
   * the type of keyboard shown to the user on mobile devices
   * @default "decimal"
   */
  inputMode?: 'text' | 'tel' | 'numeric' | 'decimal'

  /**
   * Whether the number input value is invalid.
   */
  invalid?: boolean

  /**
   * The current locale. Based on the BCP 47 definition.
   * @default "en-US"
   */
  locale?: string

  /**
   * The maximum value of the number input
   * @default Number.MAX_SAFE_INTEGER
   */
  max?: number

  /**
   * The minimum value of the number input
   * @default Number.MIN_SAFE_INTEGER
   */
  min?: number

  /**
   * The v-model value of the number input
   */
  modelValue?: string

  /**
   * The name attribute of the number input. Useful for form submission.
   */
  name?: string

  /**
   * The pattern used to check the <input> element's value against
   *
   * @default "[0-9]*(.[0-9]+)?"
   */
  pattern?: string

  /**
   * Whether the number input is readonly
   */
  readOnly?: boolean

  /**
   * Whether the number input is required
   */
  required?: boolean

  /**
   * Whether to spin the value when the increment/decrement button is pressed
   * @default true
   */
  spinOnPress?: boolean

  /**
   * The amount to increment or decrement the value by
   * @default 1
   */
  step?: number

  /**
   * Specifies the localized strings that identifies the accessibility elements and their states
   */
  translations?: IntlTranslations
}

export interface NumberInputRootEmits {
  /**
   * Function invoked when the number input is focused
   */
  'focusChange': [details: FocusChangeDetails]

  /**
   * Function invoked when the value changes
   */
  'valueChange': [details: ValueChangeDetails]

  /**
   * Function invoked when the value overflows or underflows the min/max range
   */
  'valueInvalid': [details: ValueInvalidDetails]

  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: string]
}

// ── Sub-parts (Polymorphic-only — just asChild) ──────────────────────────────
export interface NumberInputInputBaseProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface NumberInputControlBaseProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface NumberInputIncrementTriggerBaseProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface NumberInputDecrementTriggerBaseProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}
