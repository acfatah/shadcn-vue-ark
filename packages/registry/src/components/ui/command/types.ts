// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/listbox@1.x + @zag-js/dialog@1.x).
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.
//
// Command wraps TWO Ark surfaces:
//   (A) listbox  — the command palette body (Root + parts), generic over a
//       collection item type. Inlined from @ark-ui/vue/listbox (+ @zag-js/listbox,
//       @zag-js/collection).
//   (B) dialog   — the optional modal wrapper used by CommandDialog.vue. Command
//       has NO registryDependencies edge to dialog, so it owns its own copy of the
//       Dialog* surface (mirrors packages/registry/src/components/ui/dialog/types.ts).

// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║ (A) LISTBOX SURFACE                                                        ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

// ── Collection primitives (inlined from @zag-js/collection) ──────────────────
// `CollectionItem` is intentionally `any` in @zag-js/collection — keep it so the
// generic stays structurally permissive (CommandItemData extends this).
export type CollectionItem = any

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

export interface CollectionSearchState {
  keysSoFar: string
  timer: number
}

export interface CollectionSearchOptions {
  state: CollectionSearchState
  currentValue: string | null
  timeout?: number | undefined
}

/**
 * Faithful structural copy of @zag-js/collection's `ListCollection<T>` public
 * instance surface. Modelled as an interface (pure structural compare, no
 * `private` nominal brand) so a real runtime `createListCollection<T>(...)`
 * return value stays assignable to this local type where `:collection` binds.
 */
export interface ListCollection<T extends CollectionItem = CollectionItem> {
  /** The items in the collection */
  items: T[]

  /** Copy the collection */
  copy: (items?: T[]) => ListCollection<T>

  /**
   * Check if the collection is equal to another collection.
   * Parameter widened to `any` so the contravariant position does not block the
   * real zag `createListCollection()` class instance from being assignable here.
   */
  isEqual: (other: any) => boolean

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

  /**
   * Group items by the groupBy function provided in options
   * Returns an array of [groupKey, items] tuples
   */
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

// ── Selection mode (inlined from @zag-js/collection) ─────────────────────────
export type SelectionMode = 'single' | 'multiple' | 'none' | 'extended'

// ── Detail types (inlined from @zag-js/listbox) ──────────────────────────────
export interface ValueChangeDetails<T extends CollectionItem = CollectionItem> {
  value: string[]
  items: T[]
}

export interface HighlightChangeDetails<T extends CollectionItem = CollectionItem> {
  highlightedValue: string | null
  highlightedItem: T | null
  highlightedIndex: number
}

export interface ScrollToIndexDetails {
  index: number
  immediate?: boolean | undefined
  getElement: () => HTMLElement | null
}

export interface SelectionDetails {
  value: string
}

// ── Root ─────────────────────────────────────────────────────────────────────
export interface ListboxRootProps<T extends CollectionItem = CollectionItem> {
  /**
   * The collection of items
   */
  collection: ListCollection<T>

  /**
   * The initial value of the highlighted item when opened.
   * Use when you don't need to control the highlighted value of the listbox.
   */
  defaultHighlightedValue?: string

  /**
   * The initial default value of the listbox when rendered.
   * Use when you don't need to control the value of the listbox.
   *
   * @default []
   */
  defaultValue?: string[]

  /**
   * Whether to disallow empty selection
   */
  deselectable?: boolean

  /**
   * Whether the listbox is disabled
   */
  disabled?: boolean

  /**
   * Whether to disallow selecting all items when `meta+a` is pressed
   */
  disallowSelectAll?: boolean

  /**
   * The controlled key of the highlighted item
   */
  highlightedValue?: string

  /**
   * The unique identifier of the machine.
   */
  id?: string

  /**
   * The ids of the elements in the listbox. Useful for composition.
   */
  ids?: Partial<{
    root: string
    content: string
    label: string
    item: (id: string | number) => string
    itemGroup: (id: string | number) => string
    itemGroupLabel: (id: string | number) => string
  }>

  /**
   * Whether to loop the keyboard navigation through the options
   * @default false
   */
  loopFocus?: boolean

  /**
   * The model value of the listbox
   */
  modelValue?: string[]

  /**
   * The orientation of the element.
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical'

  /**
   * Function to scroll to a specific index
   */
  scrollToIndexFn?: (details: ScrollToIndexDetails) => void

  /**
   * Whether to select the item when it is highlighted
   */
  selectOnHighlight?: boolean

  /**
   * How multiple selection should behave in the listbox.
   *
   * - `single`: The user can select a single item.
   * - `multiple`: The user can select multiple items without using modifier keys.
   * - `extended`: The user can select multiple items by using modifier keys.
   *
   * @default "single"
   */
  selectionMode?: SelectionMode

  /**
   * Whether to enable typeahead on the listbox
   */
  typeahead?: boolean

  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface ListboxRootEmits<T extends CollectionItem = CollectionItem> {
  /**
   * The callback fired when the highlighted item changes.
   */
  'highlightChange': [details: HighlightChangeDetails<T>]

  /**
   * Function called when an item is selected
   */
  'select': [details: SelectionDetails]

  /**
   * The callback fired when the selected item changes.
   */
  'valueChange': [details: ValueChangeDetails<T>]

  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: string[]]
}

// ── Sub-parts ────────────────────────────────────────────────────────────────
// ListboxItemProps extends @zag-js ItemProps<T> + PolymorphicProps + HTMLAttributes
export interface ListboxItemProps<T extends CollectionItem = CollectionItem> {
  /**
   * The item to render
   */
  item: T

  /**
   * Whether to highlight the item on hover
   */
  highlightOnHover?: boolean | undefined

  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

// ListboxItemGroupProps extends Partial<@zag-js ItemGroupProps> + PolymorphicProps
export interface ListboxItemGroupProps {
  id?: string

  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface ListboxContentProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface ListboxEmptyProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

// ListboxInputProps extends @zag-js InputProps + PolymorphicProps + InputHTMLAttributes
export interface ListboxInputProps {
  /**
   * Whether to automatically highlight the item when typing
   * @default false
   */
  autoHighlight?: boolean | undefined

  /**
   * Determines how keyboard conflicts in the input are resolved.
   * - "caret": keep native text-editing behavior
   * - "navigate": forward supported keys to listbox navigation
   * @default "caret"
   */
  keyboardPriority?: 'caret' | 'navigate' | undefined

  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║ (B) DIALOG SURFACE (own copy — no registryDependencies edge to dialog)     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

// ── Detail types (inlined from @zag-js/dialog) ───────────────────────────────
export interface OpenChangeDetails {
  open: boolean
}

export interface TriggerValueChangeDetails {
  /** The value of the trigger that activated the dialog */
  value: string | null

  /** The trigger element */
  triggerElement: HTMLElement | null
}

// ── Outside-event types (inlined from @zag-js/dismissable → @zag-js/interact-outside) ──
export interface EventDetails<T> {
  originalEvent: T
  contextmenu: boolean
  focusable: boolean
  target: EventTarget
}

export type PointerDownOutsideEvent = CustomEvent<EventDetails<PointerEvent>>
export type FocusOutsideEvent = CustomEvent<EventDetails<FocusEvent>>
export type InteractOutsideEvent = PointerDownOutsideEvent | FocusOutsideEvent

// ── Root ─────────────────────────────────────────────────────────────────────
export interface DialogRootProps {
  /**
   * Human readable label for the dialog, in event the dialog title is not rendered
   */
  'aria-label'?: string

  /**
   * Whether to close the dialog when the escape key is pressed
   * @default true
   */
  'closeOnEscape'?: boolean

  /**
   * Whether to close the dialog when the outside is clicked
   * @default true
   */
  'closeOnInteractOutside'?: boolean

  /**
   * The initial open state of the dialog when rendered.
   * Use when you don't need to control the open state of the dialog.
   * @default false
   */
  'defaultOpen'?: boolean

  /**
   * Element to receive focus when the dialog is closed
   */
  'finalFocusEl'?: () => HTMLElement | null

  /**
   * The unique identifier of the machine.
   */
  'id'?: string

  /**
   * The ids of the elements in the dialog. Useful for composition.
   */
  'ids'?: Partial<{
    trigger: string
    positioner: string
    backdrop: string
    content: string
    closeTrigger: string
    title: string
    description: string
  }>

  /**
   * Element to receive focus when the dialog is opened
   */
  'initialFocusEl'?: () => HTMLElement | null

  /**
   * Whether to prevent pointer interaction outside the element and hide all content below it
   * @default true
   */
  'modal'?: boolean

  /**
   * The controlled open state of the dialog
   */
  'open'?: boolean

  /**
   * Returns the persistent elements that:
   * - should not have pointer-events disabled
   * - should not trigger the dismiss event
   */
  'persistentElements'?: (() => Element | null)[]

  /**
   * Whether to prevent scrolling behind the dialog when it's opened
   * @default true
   */
  'preventScroll'?: boolean

  /**
   * Whether to restore focus to the element that had focus before the dialog was opened
   */
  'restoreFocus'?: boolean

  /**
   * The dialog's role
   * @default "dialog"
   */
  'role'?: 'dialog' | 'alertdialog'

  /**
   * Whether to trap focus inside the dialog when it's opened
   * @default true
   */
  'trapFocus'?: boolean

  /**
   * The value of the trigger that currently open the dialog
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

export interface DialogRootEmits {
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
   * Function called when an interaction happens outside the component
   */
  'interactOutside': [event: InteractOutsideEvent]

  /**
   * Function to call when the dialog's open state changes
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
   * Function called when the trigger value changes
   */
  'triggerValueChange': [details: TriggerValueChangeDetails]

  /**
   * The callback fired when the open state changes.
   */
  'update:open': [open: boolean]
}
