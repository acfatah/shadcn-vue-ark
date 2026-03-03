import { cva } from 'class-variance-authority'

export const variant = {
  default: ``,
  card: `
    rounded-lg border p-3
    focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50
    hover:bg-accent/50
    data-invalid:border-destructive/50
    data-invalid:focus-within:ring-destructive/20
    data-invalid:hover:bg-destructive/10
    focus-within:*:data-[part=control]:ring-transparent
    data-[state=checked]:bg-primary/5
    data-invalid:data-[state=checked]:bg-destructive/5
    dark:data-invalid:focus-within:ring-destructive/40
  `,
}

export const checkboxVariants = cva(
  `
    group flex gap-3
    has-data-[part=content]:items-start
    data-disabled:pointer-events-none data-disabled:opacity-50
    *:data-[part=control]:data-[state=checked]:border-primary
    *:data-[part=control]:data-[state=checked]:bg-primary
    *:data-[part=control]:data-[state=checked]:text-primary-foreground
    *:data-invalid:data-[part=control]:data-[state=checked]:border-destructive
    *:data-invalid:data-[part=control]:data-[state=checked]:bg-destructive
    *:data-[state=unchecked]:data-invalid:border-destructive/50
  `,
  {
    variants: { variant },
    defaultVariants: { variant: 'default' },
  },
)
