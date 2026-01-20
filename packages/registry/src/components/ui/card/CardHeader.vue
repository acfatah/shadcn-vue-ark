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
    data-scope="card"
    data-part="header"
    v-bind="delegatedProps"
    :class="cn(
      `
        @container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6
        has-data-[slot=card-action]:grid-cols-[1fr_auto]
        [.border-b]:pb-6
      `,
      props.class,
    )"
  >
    <slot />
  </ark.div>
</template>
