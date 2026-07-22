<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { FieldHelperTextProps } from './types'

import { reactiveOmit } from '@vueuse/core'

import { Input } from '@/components/ui/input'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

type Props = FieldHelperTextProps & {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {})
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Input.Description v-bind="forwardedProps">
    <slot />
  </Input.Description>
</template>
