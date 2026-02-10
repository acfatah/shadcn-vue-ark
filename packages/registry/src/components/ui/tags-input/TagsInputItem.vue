<script setup lang="ts">
import type { TagsInputItemProps } from '@ark-ui/vue/tags-input'
import type { HTMLAttributes } from 'vue'

import { TagsInput } from '@ark-ui/vue/tags-input'
import { reactiveOmit } from '@vueuse/core'

import { useForwardProps } from '@/composables/useForwardProps'
import { cn } from '@/lib/utils'

interface Props extends TagsInputItemProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TagsInput.Item
    data-scope="tags-input"
    data-part="item"
    v-bind="forwardedProps"
    :class="cn(
      `
        flex h-5 items-center rounded-md bg-secondary ring-offset-background
        data-[state=active]:ring-2 data-[state=active]:ring-ring data-[state=active]:ring-offset-2
      `,
      props.class,
    )"
  >
    <slot />
  </TagsInput.Item>
</template>
