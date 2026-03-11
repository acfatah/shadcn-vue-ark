import type { HTMLAttributes } from 'vue'

export type Orientation = 'horizontal' | 'vertical'

export interface SeparatorProps {
  orientation?: Orientation
  decorative?: boolean
  class?: HTMLAttributes['class']
}
