import { createContext } from '@/composables/createContext'

import type { size } from './variant'

export const [provideAvatarContext, useAvatarContext] = createContext<{
  shape: 'round' | 'square'
  size: keyof typeof size
}>('Avatar')
