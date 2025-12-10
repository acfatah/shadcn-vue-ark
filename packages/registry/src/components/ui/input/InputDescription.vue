<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div
    data-scope="input"
    data-part="description"
    :class="cn(
      `
        text-sm leading-normal font-normal text-muted-foreground
        group-has-data-[orientation=horizontal]/field:text-balance
        last:mt-0
        nth-last-2:-mt-1
        [&>a]:underline [&>a]:underline-offset-4
        [&>a:hover]:text-primary
        [[data-variant=legend]+&]:-mt-1.5
      `,
      props.class,
    )"
  >
    <slot />
  </div>
</template>
