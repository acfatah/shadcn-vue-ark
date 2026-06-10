<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { Editable } from '@ark-ui/vue/editable'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { EditableInputProps } from './types'

interface Props extends EditableInputProps {
  asChild?: boolean
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class') as Omit<Props, 'class'>
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Editable.Input
    v-bind="forwardedProps"
    :class="cn(
      `
        min-w-0 border-0 bg-transparent p-0 text-base shadow-none outline-none
        placeholder:text-muted-foreground
        focus-visible:border-none
        disabled:pointer-events-none disabled:opacity-50
        md:text-sm
      `,
      props.class,
    )"
  >
    <slot />
  </Editable.Input>
</template>
