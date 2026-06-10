// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/dialog@1.x).
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.

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

// ── Sub-parts ────────────────────────────────────────────────────────────────
export interface DialogTriggerProps {
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

export interface DialogContentProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface DialogBackdropProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface DialogPositionerProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface DialogCloseTriggerProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface DialogTitleProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface DialogDescriptionProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}
