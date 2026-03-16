import { cva } from 'class-variance-authority'

export const shape = {
  round: 'rounded-full',
  square: 'rounded-sm',
}

export const size = {
  sm: 'size-8 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-12 text-base',
  xl: 'size-14 text-lg',
}

export const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden',
  {
    variants: { shape, size },
    defaultVariants: { shape: 'round', size: 'md' },
  },
)
