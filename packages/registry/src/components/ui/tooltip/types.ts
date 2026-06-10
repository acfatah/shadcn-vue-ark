// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/tooltip@1.x).
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

// ── Detail types (inlined from @zag-js/tooltip) ──────────────────────────────
export interface OpenChangeDetails {
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

// ── Root ─────────────────────────────────────────────────────────────────────
export interface TooltipRootProps {
  /**
   * Custom label for the tooltip.
   */
  'aria-label'?: string

  /**
   * The close delay of the tooltip.
   * @default 500
   */
  'closeDelay'?: number

  /**
   * Whether the tooltip should close on click
   * @default true
   */
  'closeOnClick'?: boolean

  /**
   * Whether to close the tooltip when the Escape key is pressed.
   * @default true
   */
  'closeOnEscape'?: boolean

  /**
   * Whether to close the tooltip on pointerdown.
   * @default true
   */
  'closeOnPointerDown'?: boolean

  /**
   * Whether the tooltip should close on scroll
   * @default true
   */
  'closeOnScroll'?: boolean

  /**
   * The initial open state of the tooltip when rendered.
   * Use when you don't need to control the open state of the tooltip.
   */
  'defaultOpen'?: boolean

  /**
   * Whether the tooltip is disabled
   */
  'disabled'?: boolean

  /**
   * The unique identifier of the machine.
   */
  'id'?: string

  /**
   * The ids of the elements in the tooltip. Useful for composition.
   */
  'ids'?: Partial<{
    trigger: string
    content: string
    arrow: string
    positioner: string
  }>

  /**
   * Whether the tooltip's content is interactive.
   * In this mode, the tooltip will remain open when user hovers over the content.
   * @see https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus
   *
   * @default false
   */
  'interactive'?: boolean

  /**
   * The controlled open state of the tooltip
   */
  'open'?: boolean

  /**
   * The open delay of the tooltip.
   * @default 1000
   */
  'openDelay'?: number

  /**
   * The user provided options used to position the popover content
   */
  'positioning'?: PositioningOptions

  /**
   * The value of the trigger that currently open the tooltip
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
}

export interface TooltipRootEmits {
  /**
   * Function called when the animation ends in the closed state
   */
  'exitComplete': []

  /**
   * Function called when the tooltip is opened.
   */
  'openChange': [details: OpenChangeDetails]

  /**
   * Function called when the trigger value changes
   */
  'triggerValueChange': [details: TriggerValueChangeDetails]

  /**
   * The callback fired when the open state changes.
   */
  'update:open': [open: boolean]
}

// ── Sub-parts ────────────────────────────────────────────────────────────────
export interface TooltipTriggerProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean

  /**
   * The value that identifies this specific trigger
   */
  value?: string
}

export interface TooltipContentProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface TooltipArrowProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

// ── Root provider (imperative API bridge) ────────────────────────────────────
// Minimal hand-written shape of @zag-js/tooltip's `Api` (the value returned by
// `useTooltip()`), used as the `value` prop of `TooltipRootProvider`.
//
// Ark's `TooltipRootProvider` expects `value: UnwrapRef<UseTooltipReturn>`, i.e.
// `tooltip.Api<PropTypes>`, whose element getters return framework-specific prop
// bags (`PropTypes['button']` / `PropTypes['element']`). To stay assignable to
// that generic without importing @zag-js, model the getters' return as the
// permissive `any` (the value is runtime-only and never inspected here).
export interface TooltipApi {
  /**
   * Whether the tooltip is open.
   */
  open: boolean

  /**
   * Function to open the tooltip.
   */
  setOpen: (open: boolean) => void

  /**
   * The trigger value
   */
  triggerValue: string | null

  /**
   * Function to set the trigger value
   */
  setTriggerValue: (value: string | null) => void

  /**
   * Function to reposition the popover
   */
  reposition: (options?: Partial<PositioningOptions>) => void

  getTriggerProps: (props?: { value?: string }) => any
  getArrowProps: () => any
  getArrowTipProps: () => any
  getPositionerProps: () => any
  getContentProps: () => any
}

export interface TooltipRootProviderProps {
  value: TooltipApi

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

export interface TooltipRootProviderEmits {
  /**
   * Function called when the animation ends in the closed state
   */
  exitComplete: []
}
