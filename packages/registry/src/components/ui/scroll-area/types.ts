// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/scroll-area@1.x).
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.

// ── Detail types (inlined from @zag-js/types) ────────────────────────────────
export type Orientation = 'horizontal' | 'vertical'

// ── Root ─────────────────────────────────────────────────────────────────────
export interface ScrollAreaRootProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean

  /** The unique identifier of the machine. */
  id?: string

  /** The ids of the scroll area elements */
  ids?: Partial<{
    root: string
    viewport: string
    content: string
    scrollbar: string
    thumb: string
  }>
}

// ── Scrollbar ────────────────────────────────────────────────────────────────
export interface ScrollAreaScrollbarProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean

  orientation?: Orientation
}
