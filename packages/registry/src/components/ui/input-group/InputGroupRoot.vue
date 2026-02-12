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
    data-scope="input-group"
    data-part="root"
    role="group"
    :class="cn(
      `
        group/input-group relative flex w-full items-center rounded-md border border-input shadow-xs
        transition-[color,box-shadow] outline-none
        dark:bg-input/30
      `,
      `
        h-9 min-w-0
        has-[>textarea]:h-auto
      `,

      // Variants based on alignment.
      'has-[>[data-align=inline-start]]:*:data-[part=control]:pl-2',
      'has-[>[data-align=inline-end]]:*:data-[part=control]:pr-2',
      `
        has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col
        has-[>[data-align=block-start]]:*:data-[part=control]:pb-3
      `,
      `
        has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col
        has-[>[data-align=block-end]]:*:data-[part=control]:pt-3
      `,

      // Focus state.
      `
        has-[[data-part=control]:focus-visible]:border-ring
        has-[[data-part=control]:focus-visible]:ring-[3px]
        has-[[data-part=control]:focus-visible]:ring-ring/50
      `,

      // Error state.
      `
        has-[[data-part=control][aria-invalid=true]]:border-destructive
        has-[[data-part=control][aria-invalid=true]]:ring-destructive/20
        dark:has-[[data-part=control][aria-invalid=true]]:ring-destructive/40
      `,

      props.class,
    )"
  >
    <slot />
  </ark.div>
</template>
