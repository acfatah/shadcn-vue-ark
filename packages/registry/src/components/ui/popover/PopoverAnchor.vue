<script setup lang="ts">
import type { PopoverAnchorProps } from '@ark-ui/vue/popover'
import type { HTMLAttributes } from 'vue'

import { Popover } from '@ark-ui/vue/popover'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

interface Props extends PopoverAnchorProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Popover.Anchor
    v-bind="forwardedProps"
    data-scope="popover"
    data-part="anchor"
    :class="props.class"
  >
    <slot />
  </Popover.Anchor>
</template>
