<script setup lang="ts">
import type { CollapsibleRootEmits, CollapsibleRootProps } from '@ark-ui/vue/collapsible'
import type { HTMLAttributes } from 'vue'

import { Collapsible } from '@ark-ui/vue/collapsible'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

interface Props extends CollapsibleRootProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const emit = defineEmits<CollapsibleRootEmits>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
</script>

<template>
  <Collapsible.Root
    v-bind="forwardedProps"
    :class="props.class"
  >
    <slot />
  </Collapsible.Root>
</template>
