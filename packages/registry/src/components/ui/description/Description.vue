<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { reactiveOmit } from '@vueuse/core'

import { Dynamic } from '@/composables/dynamic'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

export interface Props {
  class?: HTMLAttributes['class']
  asChild?: boolean
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, ['asChild', 'class'])
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <component
    :is="props.asChild ? Dynamic : 'p'"
    data-scope="description"
    v-bind="forwardedProps"
    :class="cn(
      `
        text-sm/normal font-normal text-muted-foreground
        group-has-data-[orientation=horizontal]/field:text-balance
        last:mt-0
        nth-last-2:-mt-1
        [&>a]:underline [&>a]:underline-offset-4
        [&>a:hover]:text-primary
        [[data-variant=legend]+&]:-mt-1.5
      `,
      props.class,
    )"
  >
    <slot />
  </component>
</template>
