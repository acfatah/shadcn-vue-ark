import type { VariantProps } from 'class-variance-authority'

import { cva } from 'class-variance-authority'

export { default as ButtonGroupRoot } from './ButtonGroupRoot.vue'
export { default as ButtonGroupSeparator } from './ButtonGroupSeparator.vue'
export { default as ButtonGroupText } from './ButtonGroupText.vue'
export { ButtonGroup } from './namespace'

export const buttonGroupVariants = cva(
  `
    flex w-fit items-stretch
    *:focus-visible:relative *:focus-visible:z-10
    has-[>[data-scope=button-group]]:gap-2
    has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md
    [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit
    [&>input]:flex-1
  `,
  {
    variants: {
      orientation: {
        horizontal:
          `
            [&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0
            [&>*:not(:last-child)]:rounded-r-none
          `,
        vertical:
          `
            flex-col
            [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0
            [&>*:not(:last-child)]:rounded-b-none
          `,
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  },
)

export type ButtonGroupVariants = VariantProps<typeof buttonGroupVariants>
