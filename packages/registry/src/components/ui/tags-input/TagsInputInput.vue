<script setup lang="ts">
import type { TagsInputInputProps } from '@ark-ui/vue/tags-input'
import type { HTMLAttributes } from 'vue'

import { TagsInput } from '@ark-ui/vue/tags-input'
import { reactiveOmit } from '@vueuse/core'

import { useForwardProps } from '@/composables/useForwardProps'
import { cn } from '@/lib/utils'

interface Props extends TagsInputInputProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class') as Omit<Props, 'class'>
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TagsInput.Input
    data-scope="tags-input"
    data-part="input"
    v-bind="forwardedProps"
    :class="cn(
      `
        min-h-5 flex-1 bg-transparent px-1 text-sm
        focus:outline-none
      `,
      props.class,
    )"
  />
</template>
