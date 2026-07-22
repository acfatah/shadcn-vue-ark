<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type {
  FileUploadRootEmits,
  FileUploadRootProps,
} from './types'

import { FileUpload } from '@ark-ui/vue/file-upload'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import FileUploadContextProvider from './FileUploadContextProvider.vue'

interface Props extends FileUploadRootProps {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<FileUploadRootEmits>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
</script>

<template>
  <FileUpload.Root
    v-bind="forwardedProps"
    :class="cn('flex flex-col gap-4', props.class)"
  >
    <FileUploadContextProvider>
      <slot />
    </FileUploadContextProvider>
  </FileUpload.Root>
</template>
