<script setup lang="ts">
import type { TagsInputItemInputProps } from '@ark-ui/vue/tags-input'
import type { HTMLAttributes } from 'vue'

import { TagsInput } from '@ark-ui/vue/tags-input'
import { reactiveOmit } from '@vueuse/core'

import { useForwardProps } from '@/composables/useForwardProps'
import { cn } from '@/lib/utils'

interface Props extends TagsInputItemInputProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class') as Omit<Props, 'class'>
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TagsInput.ItemInput
    data-scope="tags-input"
    data-part="item-input"
    v-bind="forwardedProps"
    :class="cn(
      'min-w-0 bg-transparent px-2 py-0.5 text-sm outline-none',
      props.class,
    )"
  />
</template>
