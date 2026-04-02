<script setup lang="ts">
import type { FileUploadItemSizeTextBaseProps } from '@ark-ui/vue/file-upload'
import type { HTMLAttributes } from 'vue'

import { FileUpload } from '@ark-ui/vue/file-upload'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends FileUploadItemSizeTextBaseProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <FileUpload.ItemSizeText
    v-bind="forwardedProps"
    :class="cn('text-xs text-muted-foreground', props.class)"
  >
    <slot />
  </FileUpload.ItemSizeText>
</template>
