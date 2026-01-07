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
    data-part="root"
    v-bind="delegatedProps"
    :class="
      cn(
        'flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm',
        props.class,
      )
    "
  >
    <slot />
  </ark.div>
</template>
