<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { FileUpload } from '@ark-ui/vue/file-upload'
import { reactiveOmit } from '@vueuse/core'
import { XIcon } from 'lucide-vue-next'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { FileUploadItemDeleteTriggerProps } from './types'

interface Props extends FileUploadItemDeleteTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <FileUpload.ItemDeleteTrigger
    v-bind="forwardedProps"
    :class="cn(
      `
        ml-auto inline-flex size-7 items-center justify-center rounded-md text-muted-foreground
        transition-colors
      `,
      'hover:bg-accent hover:text-foreground',
      `focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none`,
      props.class,
    )"
  >
    <slot>
      <XIcon class="size-4" />
    </slot>
  </FileUpload.ItemDeleteTrigger>
</template>
