// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/fieldset@1.x).
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.

// ── Root ─────────────────────────────────────────────────────────────────────
export interface FieldsetRootProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean

  /**
   * Indicates whether the fieldset is disabled.
   */
  disabled?: boolean | 'true' | 'false'

  /**
   * The id of the fieldset.
   */
  id?: string

  /**
   * Indicates whether the fieldset is invalid.
   */
  invalid?: boolean
}

// ── Sub-parts ────────────────────────────────────────────────────────────────
export interface FieldsetLegendProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface FieldsetErrorTextProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}

export interface FieldsetHelperTextProps {
  /**
   * Use the provided child element as the default rendered element, combining
   * their props and behavior.
   */
  asChild?: boolean
}
