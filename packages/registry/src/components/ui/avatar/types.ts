// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/avatar@1.x).
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.

// ── Detail types (inlined from @zag-js/avatar) ───────────────────────────────
export type LoadStatus = 'error' | 'loaded'

export interface StatusChangeDetails {
  status: LoadStatus
}

// ── Root ─────────────────────────────────────────────────────────────────────
export interface AvatarRootProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean

  /**
   * The unique identifier of the machine.
   */
  id?: string

  /**
   * The ids of the elements in the avatar. Useful for composition.
   */
  ids?: Partial<{
    root: string
    image: string
    fallback: string
  }>
}

export interface AvatarRootEmits {
  /**
   * Functional called when the image loading status changes.
   */
  statusChange: [details: StatusChangeDetails]
}

// ── Sub-parts ────────────────────────────────────────────────────────────────
export interface AvatarImageProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface AvatarFallbackProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

// ── Group (factory polymorphic element) ──────────────────────────────────────
export interface AvatarGroupProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}
