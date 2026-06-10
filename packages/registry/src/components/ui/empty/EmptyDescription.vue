<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { EmptyDescriptionProps } from './types'

interface Props extends EmptyDescriptionProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <ark.p
    v-bind="forwardedProps"
    data-scope="empty"
    data-part="description"
    :class="cn(
      `
        text-sm/relaxed text-muted-foreground
        [&>a]:underline [&>a]:underline-offset-4
        [&>a:hover]:text-primary
      `,
      props.class,
    )"
  >
    <slot />
  </ark.p>
</template>
