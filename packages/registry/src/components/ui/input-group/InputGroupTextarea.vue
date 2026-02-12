<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { reactiveOmit } from '@vueuse/core'

import { TextareaInput } from '@/components/ui/input'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props {
  id?: string
  name?: string
  defaultValue?: string | undefined
  modelValue?: string | undefined
  class?: HTMLAttributes['class']
  required?: boolean
  invalid?: boolean
  disabled?: boolean
  loading?: boolean
  readonly?: boolean
}

interface Emits {
  (e: 'update:modelValue', payload: string | undefined): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const delegatedProps = reactiveOmit(props, ['class'])
const forwardedProps = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <TextareaInput
    v-bind="forwardedProps"
    data-part="control"
    :class="cn(
      `
        flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none
        focus-visible:ring-0
        dark:bg-transparent
      `,
      props.class,
    )"
  />
</template>
