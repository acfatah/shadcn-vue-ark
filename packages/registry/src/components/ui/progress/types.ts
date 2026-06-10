// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/progress@1.x).
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.

// ── Detail types (inlined from @zag-js/progress) ─────────────────────────────
export interface ValueTranslationDetails {
  value: number | null
  max: number
  min: number
  percent: number
  formatter: Intl.NumberFormat
}

export interface ValueChangeDetails {
  value: number | null
}

export interface IntlTranslations {
  value: (details: ValueTranslationDetails) => string
}

// ── Root ─────────────────────────────────────────────────────────────────────
export interface ProgressRootProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean

  /**
   * The initial value of the progress bar when rendered.
   * Use when you don't need to control the value of the progress bar.
   * @default 50
   */
  defaultValue?: number | null

  /**
   * The options to use for formatting the value.
   * @default { style: "percent" }
   */
  formatOptions?: Intl.NumberFormatOptions

  /**
   * The unique identifier of the machine.
   */
  id?: string

  /**
   * The ids of the elements in the progress bar. Useful for composition.
   */
  ids?: Partial<{
    root: string
    track: string
    label: string
    circle: string
  }>

  /**
   * The locale to use for formatting the value.
   * @default "en-US"
   */
  locale?: string

  /**
   * The maximum allowed value of the progress bar.
   * @default 100
   */
  max?: number

  /**
   * The minimum allowed value of the progress bar.
   * @default 0
   */
  min?: number

  /**
   * The v-model value of the progress
   */
  modelValue?: number | null

  /**
   * The orientation of the element.
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical'

  /**
   * The localized messages to use.
   */
  translations?: IntlTranslations
}

export interface ProgressRootEmits {
  /**
   * Callback fired when the value changes.
   */
  'valueChange': [details: ValueChangeDetails]

  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: number | null]
}

// ── Sub-parts (minimal — usually just asChild) ───────────────────────────────
export interface ProgressTrackProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface ProgressRangeProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}
