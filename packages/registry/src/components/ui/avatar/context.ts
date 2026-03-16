import { createContext } from '@/composables/createContext'

export const [provideAvatarContext, useAvatarContext] = createContext<{
  shape: 'round' | 'square'
  size: 'sm' | 'md' | 'lg' | 'xl'
}>('Avatar')
