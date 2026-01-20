<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { reactiveOmit } from '@vueuse/core'

import { Dynamic } from '@/composables/dynamic'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

export interface Props {
  class?: HTMLAttributes['class']
  asChild?: boolean
  as?: string
}

const props = withDefaults(defineProps<Props>(), {
  as: 'label',
})

const delegatedProps = reactiveOmit(props, ['as', 'asChild', 'class'])
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <component
    :is="props.asChild ? Dynamic : props.as"
    data-scope="label"
    v-bind="forwardedProps"
    :class="cn(
      `flex w-fit items-center text-sm/snug font-medium select-none`,
      `group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50`,
      `
        peer-disabled:pointer-events-none peer-disabled:opacity-50
        peer-aria-disabled:pointer-events-none peer-aria-disabled:opacity-50
      `,
      props.class,
    )"
  >
    <slot />
  </component>
</template>
