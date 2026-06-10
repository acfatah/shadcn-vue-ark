import type { ComputedRef } from 'vue'

import { createContext } from '@/composables/createContext'

import type {
  CollectionItem,
  HighlightChangeDetails,
  IntlTranslations,
  ListCollection,
  OpenChangeDetails,
  PositioningOptions,
  ScrollToIndexDetails,
  SelectApi,
  SelectionDetails,
  ValueChangeDetails,
} from './types'

// Faithful hand-written copy of @ark-ui/vue's `UseSelectProps<T>`
// (≈ Optional<Omit<select.Props<T>, 'dir' | 'getRootNode' | 'collection'>, 'id'>
// plus `modelValue` and `collection`). Extended locally with `loading`/`invalid`.
export interface UseSelectProps<T extends CollectionItem> {
  /** The unique identifier of the machine. */
  id?: string
  /** The localized strings for the accessibility elements and their states */
  translations?: IntlTranslations
  /** The collection of items */
  collection: ListCollection<T>
  /** The ids of the elements in the select. Useful for composition. */
  ids?: Partial<{
    root: string
    content: string
    control: string
    trigger: string
    clearTrigger: string
    label: string
    hiddenSelect: string
    positioner: string
    item: (id: string | number) => string
    itemGroup: (id: string | number) => string
    itemGroupLabel: (id: string | number) => string
  }>
  /** The `name` attribute of the underlying select. */
  name?: string
  /** The associate form of the underlying select. */
  form?: string
  /** The autocomplete attribute for the hidden select. */
  autoComplete?: string
  /** Whether the select is disabled */
  disabled?: boolean
  /** Whether the select is invalid */
  invalid?: boolean
  /** Whether the select is read-only */
  readOnly?: boolean
  /** Whether the select is required */
  required?: boolean
  /**
   * Whether the select should close after an item is selected
   * @default true
   */
  closeOnSelect?: boolean
  /** Function called when an item is selected */
  onSelect?: (details: SelectionDetails) => void
  /** The callback fired when the highlighted item changes. */
  onHighlightChange?: (details: HighlightChangeDetails<T>) => void
  /** The callback fired when the selected item changes. */
  onValueChange?: (details: ValueChangeDetails<T>) => void
  /** Function called when the popup is opened */
  onOpenChange?: (details: OpenChangeDetails) => void
  /** The positioning options of the menu. */
  positioning?: PositioningOptions
  /** The model value of the select */
  modelValue?: string[]
  /**
   * The initial default value of the select when rendered.
   * Use when you don't need to control the value of the select.
   */
  defaultValue?: string[]
  /** The controlled key of the highlighted item */
  highlightedValue?: string | null
  /**
   * The initial value of the highlighted item when opened.
   * Use when you don't need to control the highlighted value of the select.
   */
  defaultHighlightedValue?: string | null
  /**
   * Whether to loop the keyboard navigation through the options
   * @default false
   */
  loopFocus?: boolean
  /** Whether to allow multiple selection */
  multiple?: boolean
  /** Whether the select menu is open */
  open?: boolean
  /** Whether the select's open state is controlled by the user */
  defaultOpen?: boolean
  /** Function to scroll to a specific index */
  scrollToIndexFn?: (details: ScrollToIndexDetails) => void
  /**
   * Whether the select is a composed with other composite widgets like tabs or combobox
   * @default true
   */
  composite?: boolean
  /**
   * Whether the value can be cleared by clicking the selected item.
   *
   * **Note:** this is only applicable for single selection
   */
  deselectable?: boolean
  /** Whether the select is in a loading state */
  loading?: boolean
}

export type ExtendedSelectApi<T extends CollectionItem> = SelectApi<T> & {
  loading: boolean
  disabled: boolean
  /** Reflects the invalid state reported by the native select element. */
  nativeInvalid: boolean
  setNativeInvalid: (value?: boolean) => void
}

export type UseSelectReturn<T extends CollectionItem>
  = ComputedRef<ExtendedSelectApi<T>>

export interface UseSelectContext<T extends CollectionItem>
  extends UseSelectReturn<T> {}

export const [SelectProvider, useSelectContext]
  = createContext<UseSelectContext<CollectionItem>>('SelectContext')
