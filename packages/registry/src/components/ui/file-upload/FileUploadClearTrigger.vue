<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { FileUpload } from '@ark-ui/vue/file-upload'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { FileUploadClearTriggerProps } from './types'

interface Props extends FileUploadClearTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <FileUpload.ClearTrigger
    v-bind="forwardedProps"
    :class="cn(
      `
        inline-flex items-center justify-center text-sm font-medium text-muted-foreground
        transition-colors
        hover:text-foreground
      `,
      props.class,
    )"
  >
    <slot />
  </FileUpload.ClearTrigger>
</template>
