<script setup lang="ts">
import type { TagsInputItemDeleteTriggerProps } from '@ark-ui/vue/tags-input'
import type { HTMLAttributes } from 'vue'

import { TagsInput } from '@ark-ui/vue/tags-input'
import { reactiveOmit } from '@vueuse/core'
import { X } from 'lucide-vue-next'

import { useForwardProps } from '@/composables/useForwardProps'
import { cn } from '@/lib/utils'

interface Props extends TagsInputItemDeleteTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TagsInput.ItemDeleteTrigger
    data-scope="tags-input"
    data-part="item-delete-trigger"
    v-bind="forwardedProps"
    :class="cn(
      'mr-1 flex rounded-sm bg-transparent',
      props.class,
    )"
  >
    <slot>
      <X class="size-4" />
    </slot>
  </TagsInput.ItemDeleteTrigger>
</template>
