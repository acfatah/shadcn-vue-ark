<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <label
    v-bind="forwardedProps"
    data-scope="input"
    data-part="label"
    :class="cn(
      `
        flex items-center text-sm leading-none font-medium select-none
        group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50
        peer-disabled:opacity-50
        peer-aria-disabled:opacity-50
      `,
      props.class,
    )"
  >
    <slot />
  </label>
</template>
