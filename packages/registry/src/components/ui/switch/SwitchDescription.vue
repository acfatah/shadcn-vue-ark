<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Description } from '@/components/ui/description'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {})
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Description
    data-scope="switch"
    data-part="description"
    v-bind="forwardedProps"
    :class="props.class"
  >
    <slot />
  </Description>
</template>
