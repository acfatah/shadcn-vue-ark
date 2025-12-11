<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Avatar } from '@ark-ui/vue/avatar'
import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <Avatar.Fallback
    :class="cn(
      `flex size-full items-center justify-center rounded-full bg-muted`,
      props.class,
    )"
  >
    <slot />
  </Avatar.Fallback>
</template>
