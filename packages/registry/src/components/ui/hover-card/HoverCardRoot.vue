<script setup lang="ts">
import type { HoverCardRootEmits, HoverCardRootProps } from '@ark-ui/vue/hover-card'
import type { HTMLAttributes } from 'vue'

import { HoverCard } from '@ark-ui/vue/hover-card'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

interface Props extends HoverCardRootProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const emit = defineEmits<HoverCardRootEmits>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
</script>

<template>
  <HoverCard.Root
    v-bind="forwardedProps"
    data-scope="hover-card"
    data-part="root"
    :class="props.class"
  >
    <slot />
  </HoverCard.Root>
</template>
