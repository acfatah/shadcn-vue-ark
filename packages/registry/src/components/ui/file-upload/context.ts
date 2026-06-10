import { createContext } from '@/composables/createContext'

import type { UseFileUploadContext } from './types'

export const [FileUploadProvider, useFileUploadContext]
  = createContext<UseFileUploadContext>('FileUploadContext')
