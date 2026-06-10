// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/steps@1.x).
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.

// ── Detail types (inlined from @zag-js/steps) ────────────────────────────────
export interface StepChangeDetails {
  step: number
}

export interface StepInvalidDetails {
  step: number
  action: 'next' | 'set'
  targetStep?: number
}

export interface ElementIds {
  root?: string | undefined
  list?: string | undefined
  triggerId?: ((index: number) => string) | undefined
  contentId?: ((index: number) => string) | undefined
}

// ── Structural item props (inlined from @zag-js/steps) ───────────────────────
export interface ItemProps {
  index: number
}

// ── Root ─────────────────────────────────────────────────────────────────────
export interface StepsRootProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean

  /**
   * The total number of steps
   */
  count?: number

  /**
   * The initial value of the stepper when rendered.
   * Use when you don't need to control the value of the stepper.
   */
  defaultStep?: number

  /**
   * The unique identifier of the machine.
   */
  id?: string

  /**
   * The custom ids for the stepper elements
   */
  ids?: ElementIds

  /**
   * Function that returns whether a step can be skipped
   */
  isStepSkippable?: (index: number) => boolean

  /**
   * Function that returns whether a step is valid
   */
  isStepValid?: (index: number) => boolean

  /**
   * If `true`, the stepper requires the user to complete the steps in order
   */
  linear?: boolean

  /**
   * The orientation of the stepper
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical'

  /**
   * The controlled value of the stepper
   */
  step?: number
}

export interface StepsRootEmits {
  /**
   * Callback to be called when the value changes
   */
  'stepChange': [details: StepChangeDetails]

  /**
   * Callback to be called when a step is completed
   */
  'stepComplete': []

  /**
   * Callback to be called when a step is invalid
   */
  'stepInvalid': [details: StepInvalidDetails]

  /**
   * The callback fired when the model value changes.
   */
  'update:step': [step: number]
}

// ── Sub-parts ────────────────────────────────────────────────────────────────
export interface StepsListProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface StepsItemProps extends ItemProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface StepsTriggerProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface StepsIndicatorProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface StepsSeparatorProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface StepsContentProps extends ItemProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface StepsCompletedContentProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface StepsNextTriggerProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface StepsPrevTriggerProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}
