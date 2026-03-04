import { cva } from 'class-variance-authority'

export const listVariant = {
  pill: 'h-9 rounded-lg bg-muted p-[3px]',
  underline: `
    relative h-10 w-full justify-start gap-2 border-b border-border bg-transparent p-0
  `,
}

export const triggerVariant = {
  pill: `
    h-[calc(100%-1px)] rounded-md border border-transparent px-2 py-1
    data-selected:bg-background data-selected:shadow-sm
    dark:data-selected:border-input dark:data-selected:bg-input/30
    dark:data-selected:text-foreground
  `,
  underline: `
    h-10 rounded-none px-3 py-2
    data-selected:border-b-primary data-selected:bg-transparent data-selected:text-foreground
    data-selected:shadow-none
  `,
}

export const tabsListVariants = cva(
  'inline-flex w-fit items-center justify-center text-muted-foreground',
  {
    variants: {
      variant: listVariant,
    },
    defaultVariants: {
      variant: 'pill',
    },
  },
)

export const tabsTriggerVariants = cva(
  `
    inline-flex flex-1 items-center justify-center gap-1.5 text-sm font-medium whitespace-nowrap
    text-foreground transition-[color,box-shadow]
    focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50
    focus-visible:outline-1 focus-visible:outline-ring
    disabled:pointer-events-none disabled:opacity-50
    dark:text-muted-foreground
    [&_svg]:pointer-events-none [&_svg]:shrink-0
    [&_svg:not([class*='size-'])]:size-4
  `,
  {
    variants: {
      variant: triggerVariant,
    },
    defaultVariants: {
      variant: 'pill',
    },
  },
)
