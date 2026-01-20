<script setup lang="ts">
import type { PolymorphicProps } from '@ark-ui/vue'
import type { HTMLAttributes } from 'vue'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'

import { cn } from '@/lib/utils'

interface Props extends PolymorphicProps {
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
