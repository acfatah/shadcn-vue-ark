<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { TagsInput } from '@ark-ui/vue/tags-input'
import { reactiveOmit } from '@vueuse/core'

import { useForwardProps } from '@/composables/useForwardProps'
import { cn } from '@/lib/utils'

import type { TagsInputControlProps } from './types'

interface Props extends TagsInputControlProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TagsInput.Control
    data-scope="tags-input"
    data-part="control"
    v-bind="forwardedProps"
    :class="cn(
      'flex flex-wrap items-center gap-2',
      props.class,
    )"
  >
    <slot />
  </TagsInput.Control>
</template>
