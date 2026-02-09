<script setup lang="ts">
import type { TagsInputItemTextProps } from '@ark-ui/vue/tags-input'
import type { HTMLAttributes } from 'vue'

import { TagsInput } from '@ark-ui/vue/tags-input'
import { reactiveOmit } from '@vueuse/core'

import { useForwardProps } from '@/composables/use-forward-props'
import { cn } from '@/lib/utils'

interface Props extends TagsInputItemTextProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TagsInput.ItemText
    data-scope="tags-input"
    data-part="item-text"
    v-bind="forwardedProps"
    :class="cn(
      'rounded-sm bg-transparent px-2 py-0.5 text-sm',
      props.class,
    )"
  >
    <slot />
  </TagsInput.ItemText>
</template>
