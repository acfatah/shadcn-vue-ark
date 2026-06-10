// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/collapsible@1.x).
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.

// ── Detail types (inlined from @zag-js/collapsible) ──────────────────────────
export interface OpenChangeDetails {
  open: boolean
}

// ── Root ─────────────────────────────────────────────────────────────────────
export interface CollapsibleRootProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean

  /**
   * The height of the content when collapsed.
   */
  collapsedHeight?: number | string

  /**
   * The width of the content when collapsed.
   */
  collapsedWidth?: number | string

  /**
   * The initial open state of the collapsible when rendered.
   * Use when you don't need to control the open state of the collapsible.
   */
  defaultOpen?: boolean

  /**
   * Whether the collapsible is disabled.
   */
  disabled?: boolean

  /**
   * The unique identifier of the machine.
   */
  id?: string

  /**
   * The ids of the elements in the collapsible. Useful for composition.
   */
  ids?: Partial<{
    root: string
    content: string
    trigger: string
  }>

  /**
   * Whether to enable lazy mounting
   * @default false
   */
  lazyMount?: boolean

  /**
   * The controlled open state of the collapsible.
   */
  open?: boolean

  /**
   * Whether to unmount on exit.
   * @default false
   */
  unmountOnExit?: boolean
}

export interface CollapsibleRootEmits {
  /**
   * The callback invoked when the exit animation completes.
   */
  'exitComplete': []

  /**
   * The callback invoked when the open state changes.
   */
  'openChange': [details: OpenChangeDetails]

  /**
   * Event handler called when the open state of the collapsible changes.
   */
  'update:open': [open: boolean]
}

// ── Sub-parts (minimal — usually just asChild) ───────────────────────────────
export interface CollapsibleContentProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface CollapsibleTriggerProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}
