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
  <ark.span
    data-scope="kbd"
    data-part="group"
    v-bind="delegatedProps"
    :class="cn(
      'inline-flex items-center gap-1',
      props.class,
    )"
  >
    <slot />
  </ark.span>
</template>
