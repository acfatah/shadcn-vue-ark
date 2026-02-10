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
    data-scope="radio-group"
    data-part="items"
    v-bind="forwardedProps"
    :class="cn(
      `
        flex gap-3
        group-has-data-[orientation=vertical]:flex-col
        group-has-data-[orientation=horizontal]:md:flex-row
      `,

      // Override for horizontal orientation on smaller screens
      'group-has-data-[orientation=horizontal]:flex-col',
      props.class,
    )"
  >
    <slot />
  </ark.div>
</template>
