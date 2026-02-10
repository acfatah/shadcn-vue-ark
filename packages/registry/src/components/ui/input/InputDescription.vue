<script setup lang="ts">
import type { PolymorphicProps } from '@ark-ui/vue'
import type { HTMLAttributes } from 'vue'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends PolymorphicProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <ark.div
    v-bind="forwardedProps"
    data-scope="input"
    data-part="description"
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
  </ark.div>
</template>
