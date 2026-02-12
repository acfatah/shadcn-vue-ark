<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { reactiveOmit } from '@vueuse/core'

import type {
  Emits as PrimitiveInputEmits,
  Props as PrimitiveInputProps,
} from '@/components/ui/input/PrimitiveInput.vue'

import { PrimitiveInput } from '@/components/ui/input'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends Omit<PrimitiveInputProps, 'scope' | 'type'> {
  type?: PrimitiveInputProps['type']
  class?: HTMLAttributes['class']
}

interface Emits extends PrimitiveInputEmits {}

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
