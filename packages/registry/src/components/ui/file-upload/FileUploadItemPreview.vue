<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { FileUpload } from '@ark-ui/vue/file-upload'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { FileUploadItemPreviewProps } from './types'

interface Props extends FileUploadItemPreviewProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <FileUpload.ItemPreview
    v-bind="forwardedProps"
    :class="cn(
      `
        flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md border
        border-border
      `,
      props.class,
    )"
  >
    <slot />
  </FileUpload.ItemPreview>
</template>
