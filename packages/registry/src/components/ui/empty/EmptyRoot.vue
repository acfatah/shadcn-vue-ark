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
    data-scope="empty"
    data-part="root"
    v-bind="forwardedProps"
    :class="cn(
      `
        flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6
        text-center text-balance
        md:p-12
      `,
      props.class,
    )"
  >
    <slot />
  </ark.div>
</template>
