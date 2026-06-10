// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/navigation-menu@1.x).
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.

// ── Detail types (inlined from @zag-js/navigation-menu) ──────────────────────
export interface ValueChangeDetails {
  value: string
}

export interface IntlTranslations {
  rootLabel?: string | undefined
}

// ── Root ─────────────────────────────────────────────────────────────────────
// NavigationMenuRootBaseProps extends RootProps, RenderStrategyProps.
export interface NavigationMenuRootProps {
  /**
   * The delay before the menu closes
   * @default 300
   */
  closeDelay?: number

  /**
   * The default value of the navigation menu.
   * Use when you don't want to control the value of the menu.
   */
  defaultValue?: string

  /**
   * Whether to disable the click trigger
   */
  disableClickTrigger?: boolean

  /**
   * Whether to disable the hover trigger
   */
  disableHoverTrigger?: boolean

  /**
   * Whether to disable the pointer leave close
   */
  disablePointerLeaveClose?: boolean

  /**
   * The unique identifier of the machine.
   */
  id?: string

  /**
   * The ids of the elements in the machine.
   */
  ids?: Partial<{
    root: string
    list: string
    item: string
    trigger: (value: string) => string
    content: (value: string) => string
    viewport: string
  }>

  /**
   * The delay before the menu opens
   * @default 200
   */
  openDelay?: number

  /**
   * The orientation of the navigation menu
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical'

  /**
   * Specifies the localized strings that identifies the accessibility elements and their states
   */
  translations?: IntlTranslations

  /**
   * The controlled value of the navigation menu
   */
  value?: string

  // ── RenderStrategyProps ───────────────────────────────────────────────────
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

export interface NavigationMenuRootEmits {
  /**
   * Function called when the value of the navigation menu changes
   */
  'valueChange': [details: ValueChangeDetails]

  /**
   * The callback fired when the model value changes.
   */
  'update:value': [value: string]
}

// ── List ─────────────────────────────────────────────────────────────────────
export interface NavigationMenuListProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

// ── Item ─────────────────────────────────────────────────────────────────────
// NavigationMenuItemBaseProps extends ItemProps, PolymorphicProps.
export interface NavigationMenuItemProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean

  /**
   * The value of the item
   */
  value: string

  /**
   * Whether the item is disabled
   */
  disabled?: boolean
}

// ── Trigger ──────────────────────────────────────────────────────────────────
// NavigationMenuTriggerBaseProps extends Omit<ItemProps, 'value'>, PolymorphicProps.
export interface NavigationMenuTriggerProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean

  /**
   * Whether the item is disabled
   */
  disabled?: boolean
}

// ── Content ──────────────────────────────────────────────────────────────────
// NavigationMenuContentBaseProps extends Partial<ContentProps>, PolymorphicProps.
export interface NavigationMenuContentProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean

  /**
   * The value of the item this content belongs to
   */
  value?: string
}

// ── Link ─────────────────────────────────────────────────────────────────────
// NavigationMenuLinkBaseProps extends Partial<LinkProps>, PolymorphicProps.
export interface NavigationMenuLinkProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean

  /**
   * The value of the item this link belongs to
   */
  value?: string

  /**
   * Whether the link is the current link
   */
  current?: boolean

  /**
   * Function called when the link is selected
   */
  onSelect?: ((event: CustomEvent) => void) | undefined

  /**
   * Whether to close the navigation menu when the link is clicked.
   * @default true
   */
  closeOnClick?: boolean
}

// ── Viewport ─────────────────────────────────────────────────────────────────
// NavigationMenuViewportBaseProps extends PolymorphicProps.
export interface NavigationMenuViewportProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

// ── Indicator ────────────────────────────────────────────────────────────────
// NavigationMenuIndicatorBaseProps extends PolymorphicProps.
export interface NavigationMenuIndicatorProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}
