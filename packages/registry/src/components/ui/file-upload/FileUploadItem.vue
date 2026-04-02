<script setup lang="ts">
import type { FileUploadItemBaseProps } from '@ark-ui/vue/file-upload'
import type { HTMLAttributes } from 'vue'

import { FileUpload } from '@ark-ui/vue/file-upload'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends FileUploadItemBaseProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <FileUpload.Item
    v-bind="forwardedProps"
    :class="cn(
      `
        flex animate-in items-center gap-3 rounded-lg border border-border bg-background p-3
        fade-in-0 slide-in-from-bottom-2
      `,
      props.class,
    )"
  >
    <slot />
  </FileUpload.Item>
</template>
