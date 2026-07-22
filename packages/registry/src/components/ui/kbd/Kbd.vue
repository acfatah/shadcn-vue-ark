<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { KbdProps } from './types'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'

import { cn } from '@/lib/utils'

interface Props extends KbdProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ark.kbd
    data-scope="kbd"
    data-part="root"
    v-bind="delegatedProps"
    :class="cn(
      `
        pointer-events-none inline-flex h-5 min-w-5 items-center justify-center gap-1 rounded-sm
        border border-input bg-muted px-1.5 text-[10px] font-medium text-muted-foreground
        select-none
      `,
      '[&_svg:not([class*=\'size-\'])]:size-3',
      props.class,
    )"
  >
    <slot />
  </ark.kbd>
</template>
