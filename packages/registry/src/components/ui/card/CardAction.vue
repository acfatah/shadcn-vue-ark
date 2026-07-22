<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { CardActionProps } from './types'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'

import { cn } from '@/lib/utils'

interface Props extends CardActionProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ark.div
    data-scope="card"
    data-part="action"
    v-bind="delegatedProps"
    :class="cn(
      'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
      props.class,
    )"
  >
    <slot />
  </ark.div>
</template>
