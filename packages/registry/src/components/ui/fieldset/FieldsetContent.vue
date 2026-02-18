<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { ark } from '@ark-ui/vue'

import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <ark.div
    data-slot="fieldset-content"
    :class="cn(
      'group/fieldset-content flex flex-1 flex-col gap-1.5 leading-snug',
      props.class,
    )"
  >
    <slot />
  </ark.div>
</template>
