import { cva } from 'class-variance-authority'

export const variant = {
  default: 'bg-transparent',
  outline: 'border-border',
  muted: 'bg-muted/50',
}

export const size = {
  default: 'gap-4 p-4',
  sm: 'gap-2.5 px-4 py-3',
}

export const mediaVariant = {
  default: 'bg-transparent',
  icon: `
    size-8 rounded-sm border bg-muted
    [&_svg:not([class*='size-'])]:size-4
  `,
  image:
    `
      size-10 overflow-hidden rounded-sm
      [&_img]:size-full [&_img]:object-cover
    `,
}

export const itemVariants = cva(
  `
    group/item flex flex-wrap items-center rounded-md border border-transparent text-sm
    transition-colors duration-100 outline-none
    focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50
    [a]:transition-colors
    [a]:hover:bg-accent/50
  `,
  {
    variants: {
      variant,
      size,
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export const itemMediaVariants = cva(
  `
    flex shrink-0 items-center justify-center gap-2
    group-has-data-[slot=item-description]/item:translate-y-0.5
    group-has-data-[slot=item-description]/item:self-start
    [&_svg]:pointer-events-none
  `,
  {
    variants: {
      variant: mediaVariant,
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)
