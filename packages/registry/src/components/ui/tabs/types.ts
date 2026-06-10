// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/tabs@1.x).
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.

import type { VariantProps } from 'class-variance-authority'

import type { tabsListVariants, tabsTriggerVariants } from './variant'

// ── Detail types (inlined from @zag-js/tabs) ─────────────────────────────────
export interface ValueChangeDetails {
  value: string
}

export interface FocusChangeDetails {
  focusedValue: string
}

export interface NavigateDetails {
  value: string
  node: HTMLAnchorElement
  href: string
}

export interface IntlTranslations {
  listLabel?: string | undefined
}

// ── Root ─────────────────────────────────────────────────────────────────────
export interface TabsRootProps {
  /**
   * The activation mode of the tabs. Can be `manual` or `automatic`
   * - `manual`: Tabs are activated when clicked or press `enter` key.
   * - `automatic`: Tabs are activated when receiving focus
   *
   * @default "automatic"
   */
  activationMode?: 'manual' | 'automatic'

  /**
   * Whether the tab is composite
   */
  composite?: boolean

  /**
   * The initial selected tab value when rendered.
   * Use when you don't need to control the selected tab value.
   */
  defaultValue?: string

  /**
   * Whether the active tab can be deselected when clicking on it.
   */
  deselectable?: boolean

  /**
   * The unique identifier of the machine.
   */
  id?: string

  /**
   * The ids of the elements in the tabs. Useful for composition.
   */
  ids?: Partial<{
    root: string
    trigger: (id: string) => string
    content: (id: string) => string
    list: string
    indicator: string
  }>

  /**
   * Whether the keyboard navigation will loop from last tab to first, and vice versa.
   * @default true
   */
  loopFocus?: boolean

  /**
   * The v-model value of the tabs
   */
  modelValue?: string

  /**
   * Function to navigate to the selected tab when clicking on it.
   * Useful if tab triggers are anchor elements.
   */
  navigate?: (details: NavigateDetails) => void

  /**
   * The orientation of the tabs. Can be `horizontal` or `vertical`
   * - `horizontal`: only left and right arrow key navigation will work.
   * - `vertical`: only up and down arrow key navigation will work.
   *
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical'

  /**
   * Specifies the localized strings that identifies the accessibility elements and their states
   */
  translations?: IntlTranslations

  /**
   * Whether to enable lazy mounting
   * @default false
   */
  lazyMount?: boolean

  /**
   * Whether to unmount on exit.
   * @default false
   */
  unmountOnExit?: boolean
}

export interface TabsRootEmits {
  /**
   * Callback to be called when the focused tab changes
   */
  'focusChange': [details: FocusChangeDetails]

  /**
   * Callback to be called when the selected/active tab changes
   */
  'valueChange': [details: ValueChangeDetails]

  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: string]
}

// ── Sub-parts ────────────────────────────────────────────────────────────────
export interface TabListProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface TabTriggerProps {
  /**
   * The value of the tab
   */
  value: string

  /**
   * Whether the tab is disabled
   */
  disabled?: boolean

  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface TabContentProps {
  /**
   * The value of the tab
   */
  value: string

  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface TabIndicatorProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

// ── Registry / CVA variant types (non-Ark) ───────────────────────────────────
export type TabsListVariants = VariantProps<typeof tabsListVariants>
export type TabsTriggerVariants = VariantProps<typeof tabsTriggerVariants>
export type TabsVariant = NonNullable<TabsListVariants['variant']>
