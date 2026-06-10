// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/menu@1.x).
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.

// ── Positioning primitives (inlined from @zag-js/popper → @floating-ui/dom) ──
export type PlacementSide = 'top' | 'right' | 'bottom' | 'left'

export type PlacementAlign = 'start' | 'end'

export type Placement = PlacementSide | `${PlacementSide}-${PlacementAlign}`

export interface Rect { x: number, y: number, width: number, height: number }

export interface SideObject { top: number, right: number, bottom: number, left: number }

export type ClientRectObject = Rect & SideObject

export interface VirtualElement {
  getBoundingClientRect: () => ClientRectObject
  getClientRects?: () => Array<ClientRectObject> | DOMRectList
  contextElement?: Element
}

export type Boundary = 'clippingAncestors' | Element | Element[] | Rect

export interface AutoUpdateOptions {
  ancestorScroll?: boolean
  ancestorResize?: boolean
  elementResize?: boolean
  layoutShift?: boolean
  animationFrame?: boolean
}

export interface AnchorRect {
  x?: number | undefined
  y?: number | undefined
  width?: number | undefined
  height?: number | undefined
}

export interface PositioningOptions {
  /**
   * Whether styles applied by the positioning utility should be restored on cleanup.
   */
  restoreStyles?: boolean | undefined

  /**
   * Whether the popover should be hidden when the reference element is detached
   */
  hideWhenDetached?: boolean | undefined

  /**
   * The strategy to use for positioning
   */
  strategy?: 'absolute' | 'fixed' | undefined

  /**
   * The initial placement of the floating element
   */
  placement?: Placement | undefined

  /**
   * The offset of the floating element
   */
  offset?: {
    mainAxis?: number | undefined
    crossAxis?: number | undefined
  } | undefined

  /**
   * The main axis offset or gap between the reference and floating elements
   */
  gutter?: number | undefined

  /**
   * The secondary axis offset or gap between the reference and floating elements
   */
  shift?: number | undefined

  /**
   * The virtual padding around the viewport edges to check for overflow
   */
  overflowPadding?: number | undefined

  /**
   * The minimum padding between the arrow and the floating element's corner.
   * @default 4
   */
  arrowPadding?: number | undefined

  /**
   * Whether to flip the placement
   */
  flip?: boolean | Placement[] | undefined

  /**
   * Whether the popover should slide when it overflows.
   */
  slide?: boolean | undefined

  /**
   * Whether the floating element can overlap the reference element
   * @default false
   */
  overlap?: boolean | undefined

  /**
   * Whether to make the floating element same width as the reference element
   */
  sameWidth?: boolean | undefined

  /**
   * Whether the popover should fit the viewport.
   */
  fitViewport?: boolean | undefined

  /**
   * Whether to use the size middleware from Floating UI.
   * It computes and sets CSS variables (`--reference-width`, `--reference-height`, `--available-width`, `--available-height`) used by `sameWidth` and `fitViewport`.
   *
   * Disabling it improves scroll performance with heavy content by avoiding layout thrashing on each update.
   * Only applies when both `sameWidth` and `fitViewport` are false — the middleware is always used when either is enabled.
   * @default true
   */
  sizeMiddleware?: boolean | undefined

  /**
   * The overflow boundary of the reference element
   * Accepts a function returning a Boundary, a Boundary directly,
   * or the shorthand string 'clipping-ancestors' which maps to Floating UI's 'clippingAncestors'.
   */
  boundary?: (() => Boundary) | Boundary | 'clipping-ancestors' | undefined

  /**
   * Options to activate auto-update listeners
   */
  listeners?: boolean | AutoUpdateOptions | undefined

  /**
   * Function called when the placement is computed
   */
  onComplete?: ((data: any) => void) | undefined

  /**
   * Function called when the floating element is positioned or not
   */
  onPositioned?: ((data: {
    placed: boolean
  }) => void) | undefined

  /**
   * Function that returns the anchor element.
   * Useful when you want to use a different element as the anchor.
   */
  getAnchorElement?: (() => HTMLElement | VirtualElement | null) | undefined

  /**
   *  Function that returns the anchor rect
   * @deprecated Use `getAnchorElement` instead
   */
  getAnchorRect?: ((element: HTMLElement | VirtualElement | null) => AnchorRect | null) | undefined

  /**
   * A callback that will be called when the popover needs to calculate its
   * position.
   */
  updatePosition?: ((data: {
    updatePosition: () => Promise<void>
    floatingElement: HTMLElement | null
  }) => void | Promise<void>) | undefined
}

// ── Geometry (inlined from @zag-js/rect-utils) ───────────────────────────────
export interface Point {
  x: number
  y: number
}

// ── Outside-event details (inlined from @zag-js/interact-outside) ────────────
export interface EventDetails<T> {
  originalEvent: T
  contextmenu: boolean
  focusable: boolean
  target: EventTarget
}

export type PointerDownOutsideEvent = CustomEvent<EventDetails<PointerEvent>>

export type FocusOutsideEvent = CustomEvent<EventDetails<FocusEvent>>

export type InteractOutsideEvent = PointerDownOutsideEvent | FocusOutsideEvent

// ── Detail types (inlined from @zag-js/menu) ─────────────────────────────────
export interface OpenChangeDetails {
  /**
   * Whether the menu is open
   */
  open: boolean
}

export interface TriggerValueChangeDetails {
  /**
   * The value of the trigger
   */
  value: string | null

  /**
   * The trigger element
   */
  triggerElement: HTMLElement | null
}

export interface SelectionDetails {
  /**
   * The value of the selected menu item
   */
  value: string
}

export interface HighlightChangeDetails {
  /**
   * The value of the highlighted menu item
   */
  highlightedValue: string | null
}

export interface NavigateDetails {
  value: string
  node: HTMLAnchorElement
  href: string
}

/**
 * The value change details of the menu item group (radio item group).
 */
export interface ValueChangeDetails {
  value: string
}

// ── Root ─────────────────────────────────────────────────────────────────────
export interface MenuRootProps {
  /**
   * The positioning point for the menu. Can be set by the context menu trigger
   * or the button trigger.
   */
  'anchorPoint'?: Point

  /**
   * The accessibility label for the menu
   */
  'aria-label'?: string

  /**
   * Whether to close the menu when an option is selected
   * @default true
   */
  'closeOnSelect'?: boolean

  /**
   * Whether the menu is a composed with other composite widgets like a combobox or tabs
   * @default true
   */
  'composite'?: boolean

  /**
   * The initial highlighted value of the menu item when rendered.
   * Use when you don't need to control the highlighted value of the menu item.
   */
  'defaultHighlightedValue'?: string

  /**
   * The initial open state of the menu when rendered.
   * Use when you don't need to control the open state of the menu.
   */
  'defaultOpen'?: boolean

  /**
   * The controlled highlighted value of the menu item.
   */
  'highlightedValue'?: string

  /**
   * The unique identifier of the machine.
   */
  'id'?: string

  /**
   * The ids of the elements in the menu. Useful for composition.
   */
  'ids'?: Partial<{
    trigger: string
    contextTrigger: string
    content: string
    groupLabel: (id: string) => string
    group: (id: string) => string
    positioner: string
    arrow: string
  }>

  /**
   * Whether to loop the keyboard navigation.
   * @default false
   */
  'loopFocus'?: boolean

  /**
   * Function to navigate to the selected item if it's an anchor element
   */
  'navigate'?: (details: NavigateDetails) => void

  /**
   * The controlled open state of the menu
   */
  'open'?: boolean

  /**
   * The options used to dynamically position the menu
   */
  'positioning'?: PositioningOptions

  /**
   * Whether the pressing printable characters should trigger typeahead navigation
   * @default true
   */
  'typeahead'?: boolean

  /**
   * The value of the trigger that currently open the menu
   */
  'triggerValue'?: string | null

  /**
   * The initial trigger value when rendered.
   * Use when you don't need to control the trigger value.
   */
  'defaultTriggerValue'?: string | null

  /**
   * Whether to enable lazy mounting
   * @default false
   */
  'lazyMount'?: boolean

  /**
   * Whether to unmount on exit.
   * @default false
   */
  'unmountOnExit'?: boolean

  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  'asChild'?: boolean
}

export interface MenuRootEmits {
  /**
   * Function called when the escape key is pressed
   */
  'escapeKeyDown': [event: KeyboardEvent]

  /**
   * Function called when the animation ends in the closed state
   */
  'exitComplete': []

  /**
   * Function called when the focus is moved outside the component
   */
  'focusOutside': [event: FocusOutsideEvent]

  /**
   * Function called when the highlighted menu item changes.
   */
  'highlightChange': [details: HighlightChangeDetails]

  /**
   * Function called when an interaction happens outside the component
   */
  'interactOutside': [event: InteractOutsideEvent]

  /**
   * Function called when the menu opens or closes
   */
  'openChange': [details: OpenChangeDetails]

  /**
   * Function called when the pointer is pressed down outside the component
   */
  'pointerDownOutside': [event: PointerDownOutsideEvent]

  /**
   * Function called when this layer is closed due to a parent layer being closed
   */
  'requestDismiss': [
    event: CustomEvent<{
      originalLayer: HTMLElement
      targetLayer: HTMLElement | undefined
      originalIndex: number
      targetIndex: number
    }>,
  ]

  /**
   * Function called when a menu item is selected.
   */
  'select': [details: SelectionDetails]

  /**
   * Function called when the trigger value changes
   */
  'triggerValueChange': [details: TriggerValueChangeDetails]

  /**
   * Function called when the menu is opened or closed.
   */
  'update:open': [open: boolean]

  /**
   * Function called when the highlighted menu item changes.
   */
  'update:highlightedValue': [highlightedValue: string | null]
}

// ── Root provider ────────────────────────────────────────────────────────────
// The return value of the `useMenu` composable, passed to the root provider.
// `api`/`machine` are the opaque Zag menu machine surfaces (inlined as `unknown`
// to avoid a @zag-js dependency — they are runtime-only and never inspected here).
export interface UseMenuReturn {
  /**
   * The reactive menu api (ComputedRef<menu.Api>).
   */
  api: unknown

  /**
   * The menu state machine service (menu.Service).
   */
  machine: unknown
}

export interface MenuRootProviderProps {
  /** The value returned by the `useMenu` composable. */
  value: UseMenuReturn

  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean

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

// Ark: MenuRootProviderEmits extends presence RootEmits (only `exitComplete`),
// NOT the full MenuRootEmits.
export interface MenuRootProviderEmits {
  /**
   * Function called when the animation ends in the closed state
   */
  exitComplete: []
}

// ── Trigger ──────────────────────────────────────────────────────────────────
export interface MenuTriggerProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean

  /**
   * The value that identifies this specific trigger
   */
  value?: string
}

// ── Context trigger (right-click trigger) ────────────────────────────────────
export interface MenuContextTriggerProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

// ── Trigger item (submenu trigger) ───────────────────────────────────────────
export interface MenuTriggerItemProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

// ── Positioner ───────────────────────────────────────────────────────────────
export interface MenuPositionerProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

// ── Content ──────────────────────────────────────────────────────────────────
export interface MenuContentProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

// ── Arrow ────────────────────────────────────────────────────────────────────
export interface MenuArrowProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface MenuArrowTipProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

// ── Indicator (open/close indicator) ─────────────────────────────────────────
export interface MenuIndicatorProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

// ── Item ─────────────────────────────────────────────────────────────────────
export interface MenuItemProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean

  /**
   * The unique value of the menu item option.
   */
  value: string

  /**
   * Whether the menu item is disabled
   */
  disabled?: boolean | undefined

  /**
   * The textual value of the option. Used in typeahead navigation of the menu.
   * If not provided, the text content of the menu item will be used.
   */
  valueText?: string | undefined

  /**
   * Whether the menu should be closed when the option is selected.
   */
  closeOnSelect?: boolean | undefined
}

export interface MenuItemEmits {
  /**
   * Function called when the item is selected
   */
  select: []
}

// ── Item text ────────────────────────────────────────────────────────────────
export interface MenuItemTextProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

// ── Item indicator ───────────────────────────────────────────────────────────
export interface MenuItemIndicatorProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

// ── Item group ───────────────────────────────────────────────────────────────
export interface MenuItemGroupProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean

  /**
   * The `id` of the element that provides accessibility label to the option group
   */
  id?: string
}

// ── Item group label ─────────────────────────────────────────────────────────
export interface MenuItemGroupLabelProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

// ── Separator ────────────────────────────────────────────────────────────────
export interface MenuSeparatorProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

// ── Checkbox item ────────────────────────────────────────────────────────────
// Ark: Omit<OptionItemProps, 'type' | 'onCheckedChange'> + PolymorphicProps
export interface MenuCheckboxItemProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean

  /**
   * Whether the option is checked
   */
  checked: boolean

  /**
   * The value of the option
   */
  value: string

  /**
   * Whether the menu item is disabled
   */
  disabled?: boolean | undefined

  /**
   * The textual value of the option. Used in typeahead navigation of the menu.
   * If not provided, the text content of the menu item will be used.
   */
  valueText?: string | undefined

  /**
   * Whether the menu should be closed when the option is selected.
   */
  closeOnSelect?: boolean | undefined
}

export interface MenuCheckboxItemEmits {
  'update:checked': [value: boolean]
}

// ── Radio item group ─────────────────────────────────────────────────────────
export interface MenuRadioItemGroupProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean

  id?: string
  modelValue?: string
}

export interface MenuRadioItemGroupEmits {
  'update:modelValue': [value: string]
}

// ── Radio item ───────────────────────────────────────────────────────────────
// Ark: Omit<OptionItemProps, 'type' | 'onCheckedChange' | 'checked'> + PolymorphicProps
export interface MenuRadioItemProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean

  /**
   * The value of the option
   */
  value: string

  /**
   * Whether the menu item is disabled
   */
  disabled?: boolean | undefined

  /**
   * The textual value of the option. Used in typeahead navigation of the menu.
   * If not provided, the text content of the menu item will be used.
   */
  valueText?: string | undefined

  /**
   * Whether the menu should be closed when the option is selected.
   */
  closeOnSelect?: boolean | undefined
}
