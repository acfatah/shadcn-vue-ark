<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { FileUpload } from '@ark-ui/vue/file-upload'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { FileUploadDropzoneProps } from './types'

interface Props extends FileUploadDropzoneProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <FileUpload.Dropzone
    v-bind="forwardedProps"
    :class="cn(
      `
        flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed
        border-border bg-background p-8 text-center transition-colors
      `,
      'hover:border-ring/50 hover:bg-accent/50',
      'data-dragging:border-ring data-dragging:bg-accent/50',
      'data-disabled:pointer-events-none data-disabled:opacity-50',
      `focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none`,
      props.class,
    )"
  >
    <slot />
  </FileUpload.Dropzone>
</template>
