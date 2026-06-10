// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/toggle-group@1.x).
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.

// ── Detail types (inlined from @zag-js/toggle-group) ─────────────────────────
export interface ValueChangeDetails {
  value: string[]
}

// ── Shared primitives (inlined from @zag-js/types) ───────────────────────────
export type Orientation = 'horizontal' | 'vertical'

// ── Root ─────────────────────────────────────────────────────────────────────
export interface ToggleGroupRootProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean

  /**
   * The initial selected value of the toggle group when rendered.
   * Use when you don't need to control the selected value of the toggle group.
   */
  defaultValue?: string[]

  /**
   * Whether the toggle group allows empty selection.
   * **Note:** This is ignored if `multiple` is `true`.
   *
   * @default true
   */
  deselectable?: boolean

  /**
   * Whether the toggle is disabled.
   */
  disabled?: boolean

  /**
   * The unique identifier of the machine.
   */
  id?: string

  /**
   * The ids of the elements in the toggle. Useful for composition.
   */
  ids?: Partial<{
    root: string
    item: (value: string) => string
  }>

  /**
   * Whether to loop focus inside the toggle group.
   * @default true
   */
  loopFocus?: boolean

  /**
   * The v-model value of the toggle group
   */
  modelValue?: string[]

  /**
   * Whether to allow multiple toggles to be selected.
   */
  multiple?: boolean

  /**
   * The orientation of the toggle group.
   * @default "horizontal"
   */
  orientation?: Orientation

  /**
   * Whether to use roving tab index to manage focus.
   * @default true
   */
  rovingFocus?: boolean
}

export interface ToggleGroupRootEmits {
  /**
   * Function to call when the toggle is clicked.
   */
  'valueChange': [details: ValueChangeDetails]

  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: string[]]
}

// ── Item ─────────────────────────────────────────────────────────────────────
export interface ToggleGroupItemProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean

  value: string
  disabled?: boolean
}
