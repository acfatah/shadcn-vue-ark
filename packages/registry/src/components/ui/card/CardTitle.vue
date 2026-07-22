<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { CardTitleProps } from './types'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'

import { cn } from '@/lib/utils'

interface Props extends CardTitleProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ark.h3
    data-scope="card"
    data-part="title"
    v-bind="delegatedProps"
    :class="cn(
      'leading-none font-semibold',
      props.class,
    )"
  >
    <slot />
  </ark.h3>
</template>
