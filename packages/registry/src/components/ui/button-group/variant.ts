import { cva } from 'class-variance-authority'

export const orientation = {
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
}

export const buttonGroupVariants = cva(
  `
    flex w-fit items-stretch
    *:focus-visible:relative *:focus-visible:z-10
    has-[>[data-scope=button-group]]:gap-2
    has-[select[aria-hidden=true]:last-child]:[&>[data-scope=select]:last-of-type]:rounded-r-md
    [&>[data-scope=select]:not([class*='w-'])]:w-fit
    [&>input]:flex-1
  `,
  {
    variants: {
      orientation,
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  },
)
