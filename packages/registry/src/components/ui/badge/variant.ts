import { cva } from 'class-variance-authority'

export const variant = {
  default:
    `
      border-transparent bg-primary text-primary-foreground
      [a&]:hover:bg-primary/90
    `,
  secondary:
    `
      border-transparent bg-secondary text-secondary-foreground
      [a&]:hover:bg-secondary/90
    `,
  destructive:
    `
      border-transparent bg-destructive text-white
      focus-visible:ring-destructive/20
      dark:bg-destructive/60
      dark:focus-visible:ring-destructive/40
      [a&]:hover:bg-destructive/90
    `,
  success:
    `
      border-transparent bg-success text-success-foreground
      focus-visible:ring-success/20
      dark:bg-success/60
      dark:focus-visible:ring-success/40
      [a&]:hover:bg-success/90
    `,
  info:
    `
      border-transparent bg-info text-info-foreground
      focus-visible:ring-info/20
      dark:bg-info/60
      dark:focus-visible:ring-info/40
      [a&]:hover:bg-info/90
    `,
  warning:
    `
      border-transparent bg-warning text-warning-foreground
      focus-visible:ring-warning/20
      dark:focus-visible:ring-warning/40
      [a&]:hover:bg-warning/90
    `,
  outline:
    `
      text-foreground
      [a&]:hover:bg-accent [a&]:hover:text-accent-foreground
    `,
}

export const badgeVariants = cva(
  `
    inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border
    px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] select-none
    focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50
    aria-invalid:border-destructive aria-invalid:ring-destructive/20
    dark:aria-invalid:ring-destructive/40
    [&>svg]:pointer-events-none [&>svg]:size-3
  `,
  {
    variants: {
      variant,
    },

    defaultVariants: {
      variant: 'default',
    },
  },
)
