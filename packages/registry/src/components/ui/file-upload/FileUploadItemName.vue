<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { FileUploadItemNameProps } from './types'

import { FileUpload } from '@ark-ui/vue/file-upload'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends FileUploadItemNameProps {
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
  />
</template>
