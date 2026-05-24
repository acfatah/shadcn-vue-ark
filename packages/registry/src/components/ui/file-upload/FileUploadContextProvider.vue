<script setup lang="ts">
import { useFileUploadContext as useArkFileUploadContext } from '@ark-ui/vue/file-upload'

import { FileUploadProvider } from './context'

const fileUploadContext = useArkFileUploadContext()
FileUploadProvider(fileUploadContext)
</script>

<template>
  <slot />
</template>
