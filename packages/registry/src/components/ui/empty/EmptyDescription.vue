<script setup lang="ts">
import type { PolymorphicProps } from '@ark-ui/vue'
import type { HTMLAttributes } from 'vue'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends PolymorphicProps {
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
