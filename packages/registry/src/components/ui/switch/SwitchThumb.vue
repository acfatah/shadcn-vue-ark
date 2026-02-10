<script setup lang="ts">
import type { SwitchThumbProps } from '@ark-ui/vue/switch'
import type { HTMLAttributes } from 'vue'

import { Switch } from '@ark-ui/vue/switch'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends SwitchThumbProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Switch.Thumb
    v-bind="forwardedProps"
    :class="cn(
      `
        pointer-events-none block size-4 rounded-full bg-background ring-0 transition-transform
        data-[state=checked]:translate-x-[calc(100%-2px)]
        data-[state=unchecked]:translate-x-0
        dark:data-[state=checked]:bg-primary-foreground
        dark:data-[state=unchecked]:bg-foreground
      `,
      props.class,
    )"
  >
    <slot />
  </Switch.Thumb>
</template>
