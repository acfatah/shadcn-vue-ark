import { cva } from 'class-variance-authority'

export const variant = {
  default: 'bg-card text-card-foreground',
  destructive:
    `
      bg-card text-destructive
      *:data-[part=description]:text-destructive/90
      [&>svg]:text-current
    `,
  success:
    `
      bg-card text-success
      *:data-[part=description]:text-success
      [&>svg]:text-current
    `,
  info:
    `
      bg-card text-info
      *:data-[part=description]:text-info
      [&>svg]:text-current
    `,
  warning:
    `
      bg-card text-warning-foreground
      *:data-[part=description]:text-warning-foreground
      dark:text-warning
      dark:*:data-[part=description]:text-warning
      [&>svg]:text-current
    `,
}

export const alertVariants = cva(
  `
    relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm
    has-[>svg]:grid-cols-[--spacing(4)_1fr] has-[>svg]:gap-x-3
    [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current
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
