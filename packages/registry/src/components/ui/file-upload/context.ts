import type { UseFileUploadContext as UseArkFileUploadContext } from '@ark-ui/vue/file-upload'

import { createContext } from '@/composables/createContext'

export const [FileUploadProvider, useFileUploadContext]
  = createContext<UseArkFileUploadContext>('FileUploadContext')
