// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/splitter@1.x).
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.
// Ark subpath: splitter.

// ── Detail types (inlined from @zag-js/splitter) ─────────────────────────────
type PanelId = string

type PanelSize = number | string

type ResizeTriggerId = `${PanelId}:${PanelId}` | `${PanelId}:` | `:${PanelId}`

type PanelResizeBehavior = 'preserve-relative-size' | 'preserve-pixel-size'

export interface PanelData {
  /**
   * The id of the panel.
   */
  id: PanelId

  /**
   * The order of the panel. useful of you intend to conditionally render the panel.
   */
  order?: number | undefined

  /**
   * The minimum size of the panel.
   */
  minSize?: PanelSize | undefined

  /**
   * The maximum size of the panel.
   */
  maxSize?: PanelSize | undefined

  /**
   * Whether the panel is collapsible.
   */
  collapsible?: boolean | undefined

  /**
   * How the panel should behave when the parent group is resized.
   */
  resizeBehavior?: PanelResizeBehavior | undefined

  /**
   * The size of the panel when collapsed.
   */
  collapsedSize?: PanelSize | undefined
}

export interface ResizeDetails {
  size: number[]
  resizeTriggerId: string | null
  layout: string
  expandToSizes: Record<string, number>
}

export interface ResizeEndDetails {
  size: number[]
  resizeTriggerId: string | null
}

export interface ExpandCollapseDetails {
  panelId: string
  size: number
}

/**
 * The splitter registry used for multi-drag support.
 * When provided, enables dragging at the intersection of multiple splitters.
 */
export interface SplitterRegistry {
  register: (data: {
    id: string
    element: HTMLElement
    orientation: 'horizontal' | 'vertical'
    onActivate: (point: { x: number, y: number }) => void
    onDeactivate: () => void
  }) => () => void
}

// ── Root ─────────────────────────────────────────────────────────────────────
export interface SplitterRootProps {
  /**
   * The initial size of the panels when rendered.
   * Use when you don't need to control the size of the panels.
   */
  defaultSize?: number[]

  /**
   * The unique identifier of the machine.
   */
  id?: string

  /**
   * The ids of the elements in the splitter. Useful for composition.
   */
  ids?: Partial<{
    root: string
    resizeTrigger: (id: string) => string
    label: (id: string) => string
    panel: (id: string | number) => string
  }>

  /**
   * The number of pixels to resize the panel by when the keyboard is used.
   */
  keyboardResizeBy?: number

  /**
   * The nonce for the injected splitter cursor stylesheet.
   */
  nonce?: string

  /**
   * The orientation of the splitter. Can be `horizontal` or `vertical`
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical'

  /**
   * The size constraints of the panels.
   */
  panels: PanelData[]

  /**
   * The splitter registry to use for multi-drag support.
   */
  registry?: SplitterRegistry

  /**
   * The controlled size data of the panels
   */
  size?: number[]

  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface SplitterRootEmits {
  /**
   * Function called when a panel is collapsed.
   */
  'collapse': [details: ExpandCollapseDetails]

  /**
   * Function called when a panel is expanded.
   */
  'expand': [details: ExpandCollapseDetails]

  /**
   * Function called when the splitter is resized.
   */
  'resize': [details: ResizeDetails]

  /**
   * Function called when the splitter resize ends.
   */
  'resizeEnd': [details: ResizeEndDetails]

  /**
   * Function called when the splitter resize starts.
   */
  'resizeStart': []

  /**
   * The callback fired when the model value changes.
   */
  'update:size': [size: number[]]
}

// ── Sub-parts ────────────────────────────────────────────────────────────────
export interface SplitterPanelProps {
  id: PanelId

  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface SplitterResizeTriggerProps {
  id: ResizeTriggerId
  disabled?: boolean | undefined

  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}
