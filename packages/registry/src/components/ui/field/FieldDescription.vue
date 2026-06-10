<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { reactiveOmit } from '@vueuse/core'

import { Input } from '@/components/ui/input'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

import type { FieldHelperTextProps } from './types'

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
