<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Switch } from '@ark-ui/vue/switch'
import { reactiveOmit } from '@vueuse/core'
import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {})
const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <Switch.Control
    v-bind="delegatedProps"
    :class="cn(
      `
        inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent
        shadow-xs transition-all outline-none
        data-[state=checked]:bg-primary
        data-[state=unchecked]:bg-input
        dark:data-[state=unchecked]:bg-input/80
      `,
      props.class,
    )"
  >
    <slot />
  </Switch.Control>
</template>
