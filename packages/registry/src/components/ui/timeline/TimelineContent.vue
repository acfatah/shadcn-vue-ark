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
  <ark.div
    data-scope="timeline"
    data-part="content"
    v-bind="delegatedProps"
    :class="cn(
      'flex flex-1 flex-col gap-1 pb-2',
      props.class,
    )"
  >
    <slot />
  </ark.div>
</template>
