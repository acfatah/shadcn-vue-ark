<script setup lang="ts">
import type { PolymorphicProps } from '@ark-ui/vue'
import type { HTMLAttributes } from 'vue'
import { ark } from '@ark-ui/vue'
import { cn } from '@/lib/utils'

interface Props extends PolymorphicProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <ark.div
    data-scope="empty"
    data-part="title"
    :class="cn(
      'text-lg font-medium tracking-tight',
      props.class,
    )"
  >
    <slot />
  </ark.div>
</template>
