// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/editable@1.x).
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.

// ── Detail types (inlined from @zag-js/editable) ─────────────────────────────
export interface ValueChangeDetails {
  value: string
}

export interface EditChangeDetails {
  edit: boolean
}

export type ActivationMode = 'focus' | 'dblclick' | 'click' | 'none'

export type SubmitMode = 'enter' | 'blur' | 'both' | 'none'

export interface IntlTranslations {
  edit: string
  submit: string
  cancel: string
  input: string
}

// ── Outside-event types (inlined from @zag-js/interact-outside) ──────────────
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
export interface EditableRootProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean

  /**
   * The activation mode for the preview element.
   *
   * - "focus" - Enter edit mode when the preview is focused
   * - "dblclick" - Enter edit mode when the preview is double-clicked
   * - "click" - Enter edit mode when the preview is clicked
   *
   * @default "focus"
   */
  activationMode?: ActivationMode

  /**
   * Whether the editable should auto-resize to fit the content.
   */
  autoResize?: boolean

  /**
   * Whether the editable is in edit mode by default.
   */
  defaultEdit?: boolean

  /**
   * The initial value of the editable when rendered.
   * Use when you don't need to control the value of the editable.
   */
  defaultValue?: string

  /**
   * Whether the editable is disabled.
   */
  disabled?: boolean

  /**
   * Whether the editable is in edit mode.
   */
  edit?: boolean

  /**
   * The element to receive focus when the editable is closed.
   */
  finalFocusEl?: () => HTMLElement | null

  /**
   * The associate form of the underlying input.
   */
  form?: string

  /**
   * The unique identifier of the machine.
   */
  id?: string

  /**
   * The ids of the elements in the editable. Useful for composition.
   */
  ids?: Partial<{
    root: string
    area: string
    label: string
    preview: string
    input: string
    control: string
    submitTrigger: string
    cancelTrigger: string
    editTrigger: string
  }>

  /**
   * Whether the input's value is invalid.
   */
  invalid?: boolean

  /**
   * The maximum number of characters allowed in the editable
   */
  maxLength?: number

  /**
   * The v-model value of the editable
   */
  modelValue?: string

  /**
   * The name attribute of the editable component. Used for form submission.
   */
  name?: string

  /**
   * The placeholder text for the editable.
   */
  placeholder?: string | {
    edit: string
    preview: string
  }

  /**
   * Whether the editable is read-only.
   */
  readOnly?: boolean

  /**
   * Whether the editable is required.
   */
  required?: boolean

  /**
   * Whether to select the text in the input when it is focused.
   * @default true
   */
  selectOnFocus?: boolean

  /**
   * The action that triggers submit in the edit mode:
   *
   * - "enter" - Trigger submit when the enter key is pressed
   * - "blur" - Trigger submit when the editable is blurred
   * - "none" - No action will trigger submit. You need to use the submit button
   * - "both" - Pressing `Enter` and blurring the input will trigger submit
   *
   * @default "both"
   */
  submitMode?: SubmitMode

  /**
   * The translations for the editable.
   */
  translations?: IntlTranslations
}

export interface EditableRootEmits {
  /**
   * Function to call when the edit mode changes.
   */
  'editChange': [details: EditChangeDetails]

  /**
   * Function called when the focus is moved outside the component
   */
  'focusOutside': [event: FocusOutsideEvent]

  /**
   * Function called when an interaction happens outside the component
   */
  'interactOutside': [event: InteractOutsideEvent]

  /**
   * Function called when the pointer is pressed down outside the component
   */
  'pointerDownOutside': [event: PointerDownOutsideEvent]

  /**
   * Function to call when the value changes.
   */
  'valueChange': [details: ValueChangeDetails]

  /**
   * Function to call when the value is committed.
   */
  'valueCommit': [details: ValueChangeDetails]

  /**
   * Function to call when the value is reverted.
   */
  'valueRevert': [details: ValueChangeDetails]

  /**
   * The callback fired when the model value changes.
   */
  'update:modelValue': [value: string]

  /**
   * Event handler called when the edit state of the editable changes.
   */
  'update:edit': [edit: boolean]
}

// ── Sub-parts ────────────────────────────────────────────────────────────────
export interface EditableAreaProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface EditablePreviewProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface EditableInputProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface EditableControlProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface EditableEditTriggerProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface EditableCancelTriggerProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface EditableSubmitTriggerProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface EditableLabelProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}
