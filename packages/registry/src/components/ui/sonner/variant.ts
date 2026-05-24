import { cva } from 'class-variance-authority'

export const variant = {
  default: `
    justify-start
    group-[.toaster]:rounded-sm!
  `,
  success:
    `
      group-[.toaster]:border-success! group-[.toaster]:bg-success!
      group-[.toaster]:text-success-foreground!
    `,
  error:
    `
      group-[.toaster]:border-error! group-[.toaster]:bg-error!
      group-[.toaster]:text-error-foreground!
    `,
  warning:
    `
      group-[.toaster]:border-warning! group-[.toaster]:bg-warning!
      group-[.toaster]:text-warning-foreground!
    `,
  info:
    `group-[.toaster]:border-info! group-[.toaster]:bg-info! group-[.toaster]:text-info-foreground!`,
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
