<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { FileUpload } from '@ark-ui/vue/file-upload'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { FileUploadItemPreviewImageProps } from './types'

interface Props extends FileUploadItemPreviewImageProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <FileUpload.ItemPreviewImage
    v-bind="forwardedProps"
    :class="cn('aspect-square size-full object-cover', props.class)"
  />
</template>
