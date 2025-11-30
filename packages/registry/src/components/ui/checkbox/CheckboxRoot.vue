<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Checkbox } from '@ark-ui/vue/checkbox'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
}>(), {})

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Checkbox.Root
    v-bind="forwardedProps"
    :class="cn(`
      group flex gap-4
      not-has-data-[part=checkbox-content]:items-center
      disabled:cursor-not-allowed disabled:opacity-50
      has-data-[part=checkbox-content]:items-start
    `, props.class)"
  >
    <slot />
  </Checkbox.Root>
</template>
