<script setup lang="ts">
import type { FileUploadItemNameBaseProps } from '@ark-ui/vue/file-upload'
import type { HTMLAttributes } from 'vue'

import { FileUpload } from '@ark-ui/vue/file-upload'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends FileUploadItemNameBaseProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <FileUpload.ItemName
    v-bind="forwardedProps"
    :class="cn('truncate text-sm font-medium', props.class)"
  >
    <slot />
  </FileUpload.ItemName>
</template>
