<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { FileUploadItemGroupProps } from './types'

import { FileUpload } from '@ark-ui/vue/file-upload'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends FileUploadItemGroupProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <FileUpload.ItemGroup
    v-bind="forwardedProps"
    :class="cn('flex flex-col gap-2', props.class)"
  >
    <slot />
  </FileUpload.ItemGroup>
</template>
