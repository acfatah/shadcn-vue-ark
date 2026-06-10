<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'

import { cn } from '@/lib/utils'

import type { CardContentProps } from './types'

interface Props extends CardContentProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ark.div
    data-scope="card"
    data-part="content"
    v-bind="delegatedProps"
    :class="cn(
      'px-6',
      props.class,
    )"
  >
    <slot />
  </ark.div>
</template>
