// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/date-picker@1.41.1).
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.

import type {
  Calendar,
  CalendarDate,
  CalendarDateTime,
  CalendarIdentifier,
  ZonedDateTime,
} from '@internationalized/date'
import type { Reactive } from 'vue'

// ── Local layout abstraction (NOT from Ark) ──────────────────────────────────
// date-picker re-exports this via the registry dependency edge; keep it here.
export type LayoutTypes = 'month-and-year' | 'month-only' | 'year-only' | undefined

// ── Date primitive (inlined from @internationalized/date, not @zag-js) ───────
// Ark types these as @zag-js/date-utils' DateValue; we re-anchor to the
// @internationalized/date union to avoid the deep @zag-js coupling.
export type DateValue = CalendarDate | CalendarDateTime | ZonedDateTime

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

// ── Enums & locale primitives (inlined from @zag-js/date-picker) ─────────────
export type DateView = 'day' | 'month' | 'year'

export type SelectionMode = 'single' | 'multiple' | 'range'

export interface LocaleDetails {
  locale: string
  timeZone: string
}

// ── Detail types (inlined from @zag-js/date-picker) ──────────────────────────
export interface ValueChangeDetails {
  value: DateValue[]
  valueAsString: string[]
  view: DateView
}

export interface FocusChangeDetails extends ValueChangeDetails {
  focusedValue: DateValue
  view: DateView
}

export interface ViewChangeDetails {
  view: DateView
}

export interface VisibleRangeChangeDetails {
  view: DateView

  visibleRange: {
    start: DateValue
    end: DateValue
  }
}

export interface OpenChangeDetails {
  open: boolean
  value: DateValue[]
}

// ── Table cell state shapes (referenced by IntlTranslations) ─────────────────
export interface TableCellState {
  focused: boolean
  selectable: boolean
  selected: boolean
  valueText: string
  inRange: boolean
  firstInRange: boolean
  lastInRange: boolean
  inHoveredRange: boolean
  firstInHoveredRange: boolean
  lastInHoveredRange: boolean
  value: DateValue
  outsideRange: boolean
  readonly disabled: boolean
}

export interface DayTableCellState extends TableCellState {
  invalid: boolean
  unavailable: boolean
  today: boolean
  weekend: boolean
}

export interface IntlTranslations {
  dayCell: (state: DayTableCellState) => string
  nextTrigger: (view: DateView) => string
  monthSelect: string
  yearSelect: string
  viewTrigger: (view: DateView) => string
  prevTrigger: (view: DateView) => string
  presetTrigger: (value: string[]) => string
  clearTrigger: string
  trigger: (open: boolean) => string
  content: string

  placeholder: (locale: string) => {
    year: string
    month: string
    day: string
  }

  weekColumnHeader?: string | undefined
  weekNumberCell?: ((weekNumber: number) => string) | undefined
}

// ── Range/Visible primitives (referenced by table part props) ────────────────
export interface Range<T> {
  start: T
  end: T
}

export type VisibleRange = Range<DateValue>

// ── Root ─────────────────────────────────────────────────────────────────────
export interface DatePickerRootProps {
  /**
   * Whether the calendar should close after the date selection is complete.
   * This is ignored when the selection mode is `multiple`.
   * @default true
   */
  closeOnSelect?: boolean

  /**
   * A function that creates a Calendar object for a given calendar identifier.
   * Enables non-Gregorian calendar support (Persian, Buddhist, Islamic, etc.)
   * without bundling all calendars by default.
   *
   * @example
   * import { createCalendar } from "@internationalized/date"
   * { locale: "fa-IR", createCalendar }
   */
  createCalendar?: (identifier: CalendarIdentifier) => Calendar

  /**
   * The initial focused date when rendered.
   * Use when you don't need to control the focused date of the date picker.
   */
  defaultFocusedValue?: DateValue

  /**
   * The initial open state of the date picker when rendered.
   * Use when you don't need to control the open state of the date picker.
   */
  defaultOpen?: boolean

  /**
   * The initial selected date(s) when rendered.
   * Use when you don't need to control the selected date(s) of the date picker.
   */
  defaultValue?: DateValue[]

  /**
   * The default view of the calendar
   * @default "day"
   */
  defaultView?: DateView

  /**
   * Whether the calendar is disabled.
   */
  disabled?: boolean

  /**
   * Whether the calendar should have a fixed number of weeks.
   * This renders the calendar with 6 weeks instead of 5 or 6.
   */
  fixedWeeks?: boolean

  /**
   * The controlled focused date.
   */
  focusedValue?: DateValue

  /**
   * The format of the date to display in the input.
   */
  format?: (date: DateValue, details: LocaleDetails) => string

  /**
   * The unique identifier of the machine.
   */
  id?: string

  /**
   * The ids of the elements in the date picker. Useful for composition.
   */
  ids?: Partial<{
    root: string
    label: (index: number) => string
    table: (id: string) => string
    tableHeader: (id: string) => string
    tableBody: (id: string) => string
    tableRow: (id: string) => string
    content: string
    cellTrigger: (id: string) => string
    prevTrigger: (view: DateView) => string
    nextTrigger: (view: DateView) => string
    viewTrigger: (view: DateView) => string
    clearTrigger: string
    control: string
    input: (index: number) => string
    trigger: string
    monthSelect: string
    yearSelect: string
    positioner: string
  }>

  /**
   * Returns whether a date of the calendar is available.
   */
  isDateUnavailable?: (date: DateValue, locale: string) => boolean

  /**
   * The locale (BCP 47 language tag) to use when formatting the date.
   * @default "en-US"
   */
  locale?: string

  /**
   * The maximum date that can be selected.
   */
  max?: DateValue

  /**
   * The maximum number of dates that can be selected.
   * This is only applicable when `selectionMode` is `multiple`.
   */
  maxSelectedDates?: number

  /**
   * The maximum view of the calendar
   * @default "year"
   */
  maxView?: DateView

  /**
   * The minimum date that can be selected.
   */
  min?: DateValue

  /**
   * The minimum view of the calendar
   * @default "day"
   */
  minView?: DateView

  /**
   * The v-model value of the date picker
   */
  modelValue?: DateValue[]

  /**
   * The `name` attribute of the input element.
   */
  name?: string

  /**
   * The number of months to display.
   */
  numOfMonths?: number

  /**
   * The controlled open state of the date picker
   */
  open?: boolean

  /**
   * Whether to open the calendar when the input is clicked.
   * @default false
   */
  openOnClick?: boolean

  /**
   * Whether day outside the visible range can be selected.
   * @default false
   */
  outsideDaySelectable?: boolean

  /**
   * Function to parse the date from the input back to a DateValue.
   */
  parse?: (value: string, details: LocaleDetails) => DateValue | undefined

  /**
   * The placeholder text to display in the input.
   */
  placeholder?: string

  /**
   * The user provided options used to position the date picker content
   */
  positioning?: PositioningOptions

  /**
   * Whether the calendar is read-only.
   */
  readOnly?: boolean

  /**
   * The selection mode of the calendar.
   * - `single` - only one date can be selected
   * - `multiple` - multiple dates can be selected
   * - `range` - a range of dates can be selected
   *
   * @default "single"
   */
  selectionMode?: SelectionMode

  /**
   * Whether to show the week number column in the day view.
   */
  showWeekNumbers?: boolean

  /**
   * The first day of the week.
   *  `0` - Sunday
   *  `1` - Monday
   *  `2` - Tuesday
   *  `3` - Wednesday
   *  `4` - Thursday
   *  `5` - Friday
   *  `6` - Saturday
   */
  startOfWeek?: number

  /**
   * The time zone to use
   * @default "UTC"
   */
  timeZone?: string

  /**
   * The localized messages to use.
   */
  translations?: IntlTranslations

  /**
   * The view of the calendar
   */
  view?: DateView

  /**
   * Whether the date picker is inline
   */
  inline?: boolean

  /**
   * Whether the date picker is in an invalid state
   */
  invalid?: boolean

  /**
   * Whether the date picker is required
   */
  required?: boolean
}

export interface DatePickerRootEmits {
  /**
   * Function called when the animation ends in the closed state
   */
  'exitComplete': []

  /**
   * Function called when the focused date changes.
   */
  'focusChange': [details: FocusChangeDetails]

  /**
   * Function called when the calendar opens or closes.
   */
  'openChange': [details: OpenChangeDetails]

  /**
   * Function called when the value changes.
   */
  'valueChange': [details: ValueChangeDetails]

  /**
   * Function called when the view changes.
   */
  'viewChange': [details: ViewChangeDetails]

  /**
   * Function called when the visible date range changes.
   */
  'visibleRangeChange': [details: VisibleRangeChangeDetails]

  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: DateValue[]]

  /**
   * The callback fired when the open state changes.
   */
  'update:open': [open: boolean]

  /**
   * The callback fired when the view changes.
   */
  'update:view': [view: DateView]

  /**
   * The callback fired when the focused date changes.
   */
  'update:focusedValue': [focusedValue: DateValue]
}

// ── Sub-parts ────────────────────────────────────────────────────────────────
// PolymorphicProps inlined as `asChild?: boolean`. Each part also accepts the
// underlying HTMLAttributes (omitted here — provided via the .vue local Props /
// attribute fall-through), matching Ark's `@vue-ignore`d HTML attribute merge.

export interface DatePickerTableProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean

  view?: DateView | undefined
  columns?: number | undefined
  id?: string | undefined
}

export interface DatePickerTableBodyProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface DatePickerTableHeadProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface DatePickerTableHeaderProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface DatePickerTableRowProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface DatePickerTableCellProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean

  disabled?: boolean | undefined
  columns?: number | undefined
  visibleRange?: VisibleRange | undefined
  value: Reactive<number | DateValue>
}

export interface DatePickerTableCellTriggerProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface DatePickerViewControlProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface DatePickerViewTriggerProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface DatePickerNextTriggerProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface DatePickerPrevTriggerProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}
