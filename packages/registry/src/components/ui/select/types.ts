import type { CollectionItem, SelectRootProps } from '@ark-ui/vue/select'
import type { HTMLAttributes } from 'vue'

export interface SelectProps extends SelectRootProps<CollectionItem> {
  align?: 'start' | 'center' | 'end'
  alignOffset?: number
  class?: HTMLAttributes['class']
  invalid?: boolean
  loading?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
}

export type Placement = NonNullable<
  NonNullable<SelectRootProps<CollectionItem>['positioning']>['placement']
>
