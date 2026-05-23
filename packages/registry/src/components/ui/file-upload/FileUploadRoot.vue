<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { FileUpload } from '@ark-ui/vue/file-upload'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type {
  FileUploadRootEmits,
  FileUploadRootProps,
} from './types'

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
    <slot />
  </FileUpload.Root>
</template>
