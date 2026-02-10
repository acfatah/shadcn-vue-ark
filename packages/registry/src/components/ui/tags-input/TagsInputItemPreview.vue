<script setup lang="ts">
import type { TagsInputItemPreviewProps } from '@ark-ui/vue/tags-input'
import type { HTMLAttributes } from 'vue'

import { TagsInput } from '@ark-ui/vue/tags-input'
import { reactiveOmit } from '@vueuse/core'

import { useForwardProps } from '@/composables/useForwardProps'
import { cn } from '@/lib/utils'

interface Props extends TagsInputItemPreviewProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TagsInput.ItemPreview
    data-scope="tags-input"
    data-part="item-preview"
    v-bind="forwardedProps"
    :class="cn(
      'flex items-center',
      props.class,
    )"
  >
    <slot />
  </TagsInput.ItemPreview>
</template>
