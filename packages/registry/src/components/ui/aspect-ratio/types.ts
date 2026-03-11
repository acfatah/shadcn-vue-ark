import type { HTMLAttributes } from 'vue'

export interface AspectRatioProps {
  /**
   * The desired ratio. Eg: 16/9
   * @defaultValue 1
   */
  ratio?: number
  class?: HTMLAttributes['class']
  asChild?: boolean
  as?: string
}
