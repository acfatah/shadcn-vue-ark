<script setup lang="ts">
import type { CollapsibleTriggerProps } from '@ark-ui/vue/collapsible'
import type { HTMLAttributes } from 'vue'

import { Collapsible } from '@ark-ui/vue/collapsible'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends CollapsibleTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Collapsible.Trigger
    v-bind="forwardedProps"
    :class="cn(props.class)"
  >
    <slot />
  </Collapsible.Trigger>
</template>
