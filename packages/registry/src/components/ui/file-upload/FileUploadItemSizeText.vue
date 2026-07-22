<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { FileUploadItemSizeTextProps } from './types'

import { FileUpload } from '@ark-ui/vue/file-upload'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends FileUploadItemSizeTextProps {
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
  />
</template>
