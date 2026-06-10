// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/pin-input@1.x).
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.

// ── Detail types (inlined from @zag-js/pin-input) ────────────────────────────
export interface ValueChangeDetails {
  value: string[]
  valueAsString: string
}

export interface ValueInvalidDetails {
  value: string
  index: number
}

export interface IntlTranslations {
  inputLabel: (index: number, length: number) => string
}

// ── Root ─────────────────────────────────────────────────────────────────────
export interface PinInputRootProps {
  /**
   * Whether to auto-focus the first input.
   */
  autoFocus?: boolean

  /**
   * Whether to auto-submit the owning form when all inputs are filled.
   */
  autoSubmit?: boolean

  /**
   * Whether to blur the input when the value is complete
   */
  blurOnComplete?: boolean

  /**
   * The number of inputs to render to improve SSR aria attributes.
   * This will be required in next major version.
   */
  count?: number

  /**
   * The initial value of the the pin input when rendered.
   * Use when you don't need to control the value of the pin input.
   */
  defaultValue?: string[]

  /**
   * Whether the inputs are disabled
   */
  disabled?: boolean

  /**
   * The associate form of the underlying input element.
   */
  form?: string

  /**
   * The unique identifier of the machine.
   */
  id?: string

  /**
   * The ids of the elements in the pin input. Useful for composition.
   */
  ids?: Partial<{
    root: string
    hiddenInput: string
    label: string
    control: string
    input: (id: string) => string
  }>

  /**
   * Whether the pin input is in the invalid state
   */
  invalid?: boolean

  /**
   * If `true`, the input's value will be masked just like `type=password`
   */
  mask?: boolean

  /**
   * The v-model value of the pin input
   */
  modelValue?: string[]

  /**
   * The name of the input element. Useful for form submission.
   */
  name?: string

  /**
   * If `true`, the pin input component signals to its fields that they should
   * use `autocomplete="one-time-code"`.
   */
  otp?: boolean

  /**
   * The regular expression that the user-entered input value is checked against.
   */
  pattern?: string

  /**
   * The placeholder text for the input
   * @default "○"
   */
  placeholder?: string

  /**
   * Whether the pin input is in the valid state
   */
  readOnly?: boolean

  /**
   * Whether the pin input is required
   */
  required?: boolean

  /**
   * Function to sanitize pasted values before validation.
   * Useful for stripping dashes, spaces, or other formatting.
   */
  sanitizeValue?: (value: string) => string

  /**
   * Whether to select input value when input is focused
   */
  selectOnFocus?: boolean

  /**
   * Specifies the localized strings that identifies the accessibility elements and their states
   */
  translations?: IntlTranslations

  /**
   * The type of value the pin-input should allow
   * @default "numeric"
   */
  type?: 'alphanumeric' | 'numeric' | 'alphabetic'

  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface PinInputRootEmits {
  /**
   * Function called on input change
   */
  'valueChange': [details: ValueChangeDetails]

  /**
   * Function called when all inputs have valid values
   */
  'valueComplete': [details: ValueChangeDetails]

  /**
   * Function called when an invalid value is entered
   */
  'valueInvalid': [details: ValueInvalidDetails]

  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: string[]]
}

// ── Sub-parts ────────────────────────────────────────────────────────────────
export interface PinInputControlProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface PinInputInputProps {
  /** The index of the input. */
  index: number

  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface PinInputHiddenInputProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface PinInputSeparatorProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}
