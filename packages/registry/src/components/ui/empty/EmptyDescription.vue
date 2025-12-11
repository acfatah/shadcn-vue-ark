<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <p
    data-scope="empty"
    data-part="description"
    :class="cn(
      `
        text-sm/relaxed text-muted-foreground
        [&>a]:underline [&>a]:underline-offset-4
        [&>a:hover]:text-primary
      `,
      props.class,
    )"
  >
    <slot />
  </p>
</template>
