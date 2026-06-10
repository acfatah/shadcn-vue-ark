<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'

import { cn } from '@/lib/utils'

import type { CardDescriptionProps } from './types'

interface Props extends CardDescriptionProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ark.p
    data-scope="card"
    data-part="description"
    v-bind="delegatedProps"
    :class="cn(
      'text-sm text-muted-foreground',
      props.class,
    )"
  >
    <slot />
  </ark.p>
</template>
