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
    data-part="content"
    :class="cn(
      'flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance',
      props.class,
    )"
  >
    <slot />
  </ark.div>
</template>
