import { cva } from 'class-variance-authority'

export const variant = {
  default: `
    justify-start
    group-[.toaster]:rounded-sm!
  `,
  success: `
    group-[.toaster]:border-success/30!
    group-[.toaster]:bg-[color-mix(in_oklab,var(--color-success)_10%,var(--color-popover))]!
    group-[.toaster]:text-success!
  `,
  error: `
    group-[.toaster]:border-error/30!
    group-[.toaster]:bg-[color-mix(in_oklab,var(--color-error)_10%,var(--color-popover))]!
    group-[.toaster]:text-error!
  `,
  warning: `
    group-[.toaster]:border-warning/40!
    group-[.toaster]:bg-[color-mix(in_oklab,var(--color-warning)_15%,var(--color-popover))]!
    group-[.toaster]:text-warning-foreground!
    dark:group-[.toaster]:text-warning!
  `,
  info: `
    group-[.toaster]:border-info/30!
    group-[.toaster]:bg-[color-mix(in_oklab,var(--color-info)_10%,var(--color-popover))]!
    group-[.toaster]:text-info!
  `,
}

export const sonnerVariants = cva(
  `
    toast group
    group-[.toaster]:rounded-md group-[.toaster]:border group-[.toaster]:border-border
    group-[.toaster]:bg-popover group-[.toaster]:px-4 group-[.toaster]:py-3
    group-[.toaster]:text-popover-foreground group-[.toaster]:shadow-lg
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

export function defaultToastClasses() {
  return {
    toast: sonnerVariants({ variant: 'default' }),
    title: 'text-sm font-medium',
    description: 'group-[.toast]:text-muted-foreground text-sm',
    actionButton:
      'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-md group-[.toast]:px-3 group-[.toast]:py-1.5',
    cancelButton:
      'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-md group-[.toast]:px-3 group-[.toast]:py-1.5',
    closeButton:
      'group-[.toast]:bg-transparent! group-[.toast]:text-muted-foreground! group-[.toast]:border-none! top-3.5! right-3.5!',
    success: variant.success,
    error: variant.error,
    warning: variant.warning,
    info: variant.info,
  }
}
