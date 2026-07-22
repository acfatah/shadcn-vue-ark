<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type {
  PrimitiveInputEmits,
  PrimitiveInputProps,
} from '@/components/ui/input/types'

import { reactiveOmit } from '@vueuse/core'

import { PrimitiveInput } from '@/components/ui/input'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends /* @vue-ignore */ Omit<PrimitiveInputProps, 'scope' | 'type'> {
  type?: PrimitiveInputProps['type']
  class?: HTMLAttributes['class']
}

interface Emits extends /* @vue-ignore */ PrimitiveInputEmits {}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
})

const emits = defineEmits<Emits>()
const delegatedProps = reactiveOmit(props, ['class', 'type'])
const forwardedProps = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <PrimitiveInput
    v-bind="forwardedProps"
    scope="input-group"
    data-part="control"
    :type="props.type"
    :class="cn(
      `
        flex-1 rounded-none border-0 bg-transparent shadow-none
        focus-visible:ring-0
        dark:bg-transparent
      `,
      props.class,
    )"
  />
</template>
