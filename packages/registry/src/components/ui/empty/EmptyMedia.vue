<script setup lang="ts">
import type { PolymorphicProps } from '@ark-ui/vue'
import type { HTMLAttributes } from 'vue'
import { ark } from '@ark-ui/vue'
import { cn } from '@/lib/utils'
import type { EmptyMediaVariants } from '.'
import { emptyMediaVariants } from '.'

interface Props extends PolymorphicProps {
  class?: HTMLAttributes['class']
  variant?: EmptyMediaVariants['variant']
}

const props = defineProps<Props>()
</script>

<template>
  <ark.div
    data-scope="empty"
    data-part="media"
    :data-variant="variant"
    :class="cn(emptyMediaVariants({ variant }), props.class)"
  >
    <slot />
  </ark.div>
</template>
