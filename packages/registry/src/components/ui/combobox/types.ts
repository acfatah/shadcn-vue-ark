// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/combobox@1.x).
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.

// ── Collection primitives (inlined from @zag-js/collection) ──────────────────
export type CollectionItem = any

export interface CollectionSearchState {
  keysSoFar: string
  timer: number
}

export interface CollectionSearchOptions {
  state: CollectionSearchState
  currentValue: string | null
  timeout?: number | undefined
}

export interface CollectionMethods<T extends CollectionItem = CollectionItem> {
  /** The value of the item */
  itemToValue: (item: T) => string

  /** The label of the item */
  itemToString: (item: T) => string

  /** Whether the item is disabled */
  isItemDisabled: (item: T) => boolean
}

export interface CollectionOptions<T extends CollectionItem = CollectionItem> extends Partial<CollectionMethods<T>> {
  /** The options of the select */
  items: Iterable<T> | Readonly<Iterable<T>>

  /** Function to group items */
  groupBy?: ((item: T, index: number) => string) | undefined

  /** Function to sort items */
  groupSort?: ((a: string, b: string) => number) | string[] | 'asc' | 'desc' | undefined
}

/**
 * Structural mirror of the runtime `ListCollection` class from `@zag-js/collection`.
 * Kept faithful to its public surface so `:collection` / `v-bind` stay assignable
 * to the runtime `<Combobox.Root>`.
 */
export interface ListCollection<T extends CollectionItem = CollectionItem> {
  /** The items in the collection */
  items: T[]

  /** Copy the collection */
  copy: (items?: T[]) => ListCollection<T>

  /** Check if the collection is equal to another collection */
  isEqual: (other: ListCollection<T>) => boolean

  /** Function to update the collection items */
  setItems: (items: T[]) => ListCollection<T>

  /** Returns all the values in the collection */
  getValues: (items?: T[]) => string[]

  /** Get the item based on its value */
  find: (value: string | null | undefined) => T | null

  /** Get the items based on its values */
  findMany: (values: string[]) => T[]

  /** Get the item based on its index */
  at: (index: number) => T | null

  /** Sort the values based on their index */
  sort: (values: string[]) => string[]

  /** Convert an item to a value */
  getItemValue: (item: T | null | undefined) => string | null

  /** Whether an item is disabled */
  getItemDisabled: (item: T | null) => boolean

  /** Convert an item to a string */
  stringifyItem: (item: T | null) => string | null

  /** Convert a value to a string */
  stringify: (value: string | null) => string | null

  /** Convert an array of items to a string */
  stringifyItems: (items: T[], separator?: string) => string

  /** Convert an array of items to a string */
  stringifyMany: (value: string[], separator?: string) => string

  /** Whether the collection has a value */
  has: (value: string | null) => boolean

  /** Whether the collection has an item */
  hasItem: (item: T | null) => boolean

  /** Returns the number of items in the collection */
  readonly size: number

  /** Group items by the groupBy function provided in options */
  group: () => [string, T[]][]

  /** Returns the first value in the collection */
  readonly firstValue: string | null

  /** Returns the last value in the collection */
  readonly lastValue: string | null

  /** Returns the next value in the collection */
  getNextValue: (value: string, step?: number, clamp?: boolean) => string | null

  /** Returns the previous value in the collection */
  getPreviousValue: (value: string, step?: number, clamp?: boolean) => string | null

  /** Get the index of an item based on its key */
  indexOf: (value: string | null) => number

  /** Search for a value based on a query */
  search: (queryString: string, options: CollectionSearchOptions) => string | null

  [Symbol.iterator]: () => Generator<T, void, unknown>

  /** Update an item in the collection */
  update: (value: string, item: T) => ListCollection<T>

  /** Update an item in the collection if it exists, otherwise append it */
  upsert: (value: string, item: T, mode?: 'append' | 'prepend') => ListCollection<T>

  /** Insert items at a specific index */
  insert: (index: number, ...items: T[]) => ListCollection<T>

  /** Insert items before a specific value */
  insertBefore: (value: string, ...items: T[]) => ListCollection<T>

  /** Insert items after a specific value */
  insertAfter: (value: string, ...items: T[]) => ListCollection<T>

  /** Prepend items to the collection */
  prepend: (...items: T[]) => ListCollection<T>

  /** Append items to the collection */
  append: (...items: T[]) => ListCollection<T>

  /** Filter the collection */
  filter: (fn: (itemString: string, index: number, item: T) => boolean) => ListCollection<T>

  /** Remove items from the collection */
  remove: (...itemsOrValues: Array<T | string>) => ListCollection<T>

  /** Move an item to a specific index */
  move: (value: string, toIndex: number) => ListCollection<T>

  /** Move items before a specific value */
  moveBefore: (value: string, ...values: string[]) => ListCollection<T>

  /** Move items after a specific value */
  moveAfter: (value: string, ...values: string[]) => ListCollection<T>

  /** Reorder items */
  reorder: (fromIndex: number, toIndex: number) => ListCollection<T>

  /** Compare two values */
  compareValue: (a: string, b: string) => 1 | -1 | 0

  /** Get the range of values between two values */
  getValueRange: (from: string | null, to: string | null) => string[]

  /** Convert the collection to a string */
  toString: () => string

  /** Convert the collection to a JSON object */
  toJSON: () => {
    size: number
    first: string | null
    last: string | null
  }
}

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

// ── Outside-event details (inlined from @zag-js/dismissable → @zag-js/interact-outside) ──
export interface EventDetails<T> {
  originalEvent: T
  contextmenu: boolean
  focusable: boolean
  target: EventTarget
}

export type PointerDownOutsideEvent = CustomEvent<EventDetails<PointerEvent>>

export type FocusOutsideEvent = CustomEvent<EventDetails<FocusEvent>>

export type InteractOutsideEvent = PointerDownOutsideEvent | FocusOutsideEvent

// ── Detail types (inlined from @zag-js/combobox) ─────────────────────────────
export interface ValueChangeDetails<T extends CollectionItem = CollectionItem> {
  value: string[]
  items: T[]
}

export interface HighlightChangeDetails<T extends CollectionItem = CollectionItem> {
  highlightedValue: string | null
  highlightedItem: T | null
}

/** The reason for the input value change */
export type InputValueChangeReason = 'input-change' | 'item-select' | 'clear-trigger' | 'script' | 'interact-outside'

export interface InputValueChangeDetails {
  inputValue: string
  reason?: InputValueChangeReason | undefined
}

/** The reason for the combobox open/close state change */
export type OpenChangeReason = 'input-click' | 'trigger-click' | 'script' | 'arrow-key' | 'input-change' | 'interact-outside' | 'escape-key' | 'item-select' | 'clear-trigger'

export interface OpenChangeDetails {
  open: boolean
  reason?: OpenChangeReason | undefined
  value: string[]
}

export interface ScrollToIndexDetails {
  index: number
  immediate?: boolean | undefined
  getElement: () => HTMLElement | null
}

export interface NavigateDetails {
  value: string
  node: HTMLAnchorElement
  href: string
}

export interface SelectionDetails {
  value: string[]
  itemValue: string
}

export interface IntlTranslations {
  triggerLabel?: string | undefined
  clearTriggerLabel?: string | undefined
}

// ── Root ─────────────────────────────────────────────────────────────────────
export interface ComboboxRootProps<T extends CollectionItem = CollectionItem> {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean

  /**
   * Whether to allow typing custom values in the input
   */
  allowCustomValue?: boolean

  /**
   * Whether to allow bypassing the default two-step behavior (Enter to close combobox, then Enter to submit form)
   * and instead submit the form immediately on Enter press. This is useful for single-field autocomplete forms
   * where Enter should submit the form directly.
   */
  alwaysSubmitOnEnter?: boolean

  /**
   * Whether to autofocus the input on mount
   */
  autoFocus?: boolean

  /**
   * Whether to close the combobox when an item is selected.
   */
  closeOnSelect?: boolean

  /**
   * The collection of items
   */
  collection?: ListCollection<T>

  /**
   * Whether the combobox is a composed with other composite widgets like tabs
   * @default true
   */
  composite?: boolean

  /**
   * The initial highlighted value of the combobox when rendered.
   * Use when you don't need to control the highlighted value of the combobox.
   */
  defaultHighlightedValue?: string

  /**
   * The initial value of the combobox's input when rendered.
   * Use when you don't need to control the value of the combobox's input.
   * @default ""
   */
  defaultInputValue?: string

  /**
   * The initial open state of the combobox when rendered.
   * Use when you don't need to control the open state of the combobox.
   */
  defaultOpen?: boolean

  /**
   * The initial value of the combobox's selected items when rendered.
   * Use when you don't need to control the value of the combobox's selected items.
   * @default []
   */
  defaultValue?: string[]

  /**
   * Whether to disable registering this a dismissable layer
   */
  disableLayer?: boolean

  /**
   * Whether the combobox is disabled
   */
  disabled?: boolean

  /**
   * The associate form of the combobox.
   */
  form?: string

  /**
   * The controlled highlighted value of the combobox
   */
  highlightedValue?: string

  /**
   * The unique identifier of the machine.
   */
  id?: string

  /**
   * The ids of the elements in the combobox. Useful for composition.
   */
  ids?: Partial<{
    root: string
    label: string
    control: string
    input: string
    content: string
    trigger: string
    clearTrigger: string
    item: (id: string, index?: number) => string
    positioner: string
    itemGroup: (id: string | number) => string
    itemGroupLabel: (id: string | number) => string
  }>

  /**
   * Defines the auto-completion behavior of the combobox.
   *
   * - `autohighlight`: The first focused item is highlighted as the user types
   * - `autocomplete`: Navigating the listbox with the arrow keys selects the item and the input is updated
   *
   * @default "none"
   */
  inputBehavior?: 'autohighlight' | 'autocomplete' | 'none'

  /**
   * The controlled value of the combobox's input
   */
  inputValue?: string

  /**
   * Whether the combobox is invalid
   */
  invalid?: boolean

  /**
   * Whether to loop the keyboard navigation through the items
   * @default true
   */
  loopFocus?: boolean

  /**
   * The v-model value of the combobox
   */
  modelValue?: string[]

  /**
   * Whether to allow multiple selection.
   *
   * **Good to know:** When `multiple` is `true`, the `selectionBehavior` is automatically set to `clear`.
   * It is recommended to render the selected items in a separate container.
   */
  multiple?: boolean

  /**
   * The `name` attribute of the combobox's input. Useful for form submission
   */
  name?: string

  /**
   * Function to navigate to the selected item
   */
  navigate?: (details: NavigateDetails) => void

  /**
   * The controlled open state of the combobox
   */
  open?: boolean

  /**
   * Whether to show the combobox when the input value changes
   * @default true
   */
  openOnChange?: boolean | ((details: InputValueChangeDetails) => boolean)

  /**
   * Whether to open the combobox popup on initial click on the input
   * @default false
   */
  openOnClick?: boolean

  /**
   * Whether to open the combobox on arrow key press
   * @default true
   */
  openOnKeyPress?: boolean

  /**
   * The placeholder text of the combobox's input
   */
  placeholder?: string

  /**
   * The positioning options to dynamically position the menu
   * @default { placement: "bottom-start" }
   */
  positioning?: PositioningOptions

  /**
   * Whether the combobox is readonly. This puts the combobox in a "non-editable" mode
   * but the user can still interact with it
   */
  readOnly?: boolean

  /**
   * Whether the combobox is required
   */
  required?: boolean

  /**
   * Function to scroll to a specific index
   */
  scrollToIndexFn?: (details: ScrollToIndexDetails) => void

  /**
   * The behavior of the combobox input when an item is selected
   *
   * - `replace`: The selected item string is set as the input value
   * - `clear`: The input value is cleared
   * - `preserve`: The input value is preserved
   *
   * @default "replace"
   */
  selectionBehavior?: 'clear' | 'replace' | 'preserve'

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

export interface ComboboxRootEmits<T extends CollectionItem = CollectionItem> {
  /**
   * Function called when the animation ends in the closed state
   */
  'exitComplete': []

  /**
   * Function called when the focus is moved outside the component
   */
  'focusOutside': [event: FocusOutsideEvent]

  /**
   * Function called when an item is highlighted using the pointer
   * or keyboard navigation.
   */
  'highlightChange': [details: HighlightChangeDetails<T>]

  /**
   * Function called when the input's value changes
   */
  'inputValueChange': [details: InputValueChangeDetails]

  /**
   * Function called when an interaction happens outside the component
   */
  'interactOutside': [event: InteractOutsideEvent]

  /**
   * Function called when the popup is opened
   */
  'openChange': [details: OpenChangeDetails]

  /**
   * Function called when the pointer is pressed down outside the component
   */
  'pointerDownOutside': [event: PointerDownOutsideEvent]

  /**
   * Function called when a new item is selected
   */
  'valueChange': [details: ValueChangeDetails<T>]

  /**
   * Function called when an item is selected
   */
  'select': [details: {
    value: string[]
    itemValue: string
  }]

  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: string[]]

  /**
   * The callback fired when the highlighted value changes.
   */
  'update:highlightedValue': [value: string | null]

  /**
   * The callback fired when the input value changes.
   */
  'update:inputValue': [value: string]

  /**
   * The callback fired when the open state changes.
   */
  'update:open': [value: boolean]
}

// ── Sub-parts ────────────────────────────────────────────────────────────────
export interface ComboboxInputProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface ComboboxTriggerProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean

  /**
   * Whether the trigger is focusable
   */
  focusable?: boolean
}

export interface ComboboxContentProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface ComboboxListProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface ComboboxControlProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface ComboboxPositionerProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface ComboboxItemProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean

  /**
   * Whether hovering outside should clear the highlighted state
   */
  persistFocus?: boolean

  /**
   * The item to render
   */
  item: CollectionItem
}

export interface ComboboxItemIndicatorProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

export interface ComboboxItemGroupProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean

  id?: string
}

export interface ComboboxEmptyProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}

// ── Separator (custom part rendered via `ark.div`; PolymorphicProps inlined) ──
export interface ComboboxSeparatorProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean
}
