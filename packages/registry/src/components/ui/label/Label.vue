<script setup lang="ts">
import type { LabelProps } from './types'

import { reactiveOmit } from '@vueuse/core'

import { Dynamic } from '@/composables/dynamic'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<LabelProps>(), {
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
