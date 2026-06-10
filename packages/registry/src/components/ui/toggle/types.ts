// Types extracted from @ark-ui/vue@5.37.0 (re-exports @zag-js/toggle@1.x).
// Faithful 1:1 copy — re-sync by hand when upgrading @ark-ui/vue.

import type { VariantProps } from 'class-variance-authority'

import type { toggleVariants } from './variant'

export type ToggleVariants = VariantProps<typeof toggleVariants>

// ── Root ─────────────────────────────────────────────────────────────────────
export interface ToggleRootProps {
  /** Use the provided child element as the default rendered element, combining their props and behavior. */
  asChild?: boolean

  /**
   * The default pressed state of the toggle.
   */
  defaultPressed?: boolean

  /**
   * Whether the toggle is disabled.
   */
  disabled?: boolean

  /**
   * The pressed state of the toggle.
   */
  pressed?: boolean
}

export interface ToggleRootEmits {
  /**
   * Event handler called when the pressed state of the toggle changes.
   */
  'pressedChange': [pressed: boolean]

  /**
   * The callback fired when the pressed state changes.
   */
  'update:pressed': [pressed: boolean]
}
