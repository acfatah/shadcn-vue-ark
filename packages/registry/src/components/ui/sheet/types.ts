import type { DialogContentProps } from '@ark-ui/vue/dialog'
import type { HTMLAttributes } from 'vue'

export type SheetSide = 'top' | 'right' | 'bottom' | 'left'

export interface SheetContentProps extends DialogContentProps {
  class?: HTMLAttributes['class']
  /** @default 'right' */
  side?: SheetSide
  /** @default true */
  showCloseButton?: boolean
}
