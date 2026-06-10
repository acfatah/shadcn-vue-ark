// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/accordion@1.x).
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.

// ── Detail types (inlined from @zag-js/accordion) ────────────────────────────
export interface ValueChangeDetails {
  value: string[]
}

export interface FocusChangeDetails {
  value: string | null
}

// ── Root ─────────────────────────────────────────────────────────────────────
export interface AccordionRootProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean

  /**
   * Whether an accordion item can be closed after it has been expanded.
   * @default false
   */
  collapsible?: boolean

  /**
   * The initial value of the expanded accordion items.
   * Use when you don't need to control the value of the accordion.
   */
  defaultValue?: string[]

  /**
   * Whether the accordion items are disabled
   */
  disabled?: boolean

  /**
   * The unique identifier of the machine.
   */
  id?: string

  /**
   * The ids of the elements in the accordion. Useful for composition.
   */
  ids?: Partial<{
    root: string
    item: (value: string) => string
    itemContent: (value: string) => string
    itemTrigger: (value: string) => string
  }>

  /**
   * Whether to enable lazy mounting
   * @default false
   */
  lazyMount?: boolean

  /**
   * The v-model value of the accordion
   */
  modelValue?: string[]

  /**
   * Whether multiple accordion items can be expanded at the same time.
   * @default false
   */
  multiple?: boolean

  /**
   *  The orientation of the accordion items.
   *  @default "vertical"
   */
  orientation?: 'horizontal' | 'vertical'

  /**
   * Whether to unmount on exit.
   * @default false
   */
  unmountOnExit?: boolean
}

export interface AccordionRootEmits {
  /**
   * The callback fired when the focused accordion item changes.
   */
  'focusChange': [details: FocusChangeDetails]

  /**
   * The callback fired when the state of expanded/collapsed accordion items changes.
   */
  'valueChange': [details: ValueChangeDetails]

  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: string[]]
}

// ── Sub-parts ────────────────────────────────────────────────────────────────
export interface AccordionItemProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean

  /**
   * The value of the accordion item.
   */
  value: string

  /**
   * Whether the accordion item is disabled.
   */
  disabled?: boolean
}

export interface AccordionItemContentProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface AccordionItemTriggerProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}
