import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'

import type { sidebarMenuButtonVariants } from './variant'

export interface SidebarProps {
  side?: 'left' | 'right'
  variant?: 'sidebar' | 'floating' | 'inset'
  collapsible?: 'offcanvas' | 'icon' | 'none'
  class?: HTMLAttributes['class']
}

export interface SidebarMenuButtonProps {
  asChild?: boolean
  variant?: SidebarMenuButtonVariants['variant']
  size?: SidebarMenuButtonVariants['size']
  isActive?: boolean
  class?: HTMLAttributes['class']
}

export type SidebarMenuButtonVariants = VariantProps<typeof sidebarMenuButtonVariants>
