<script setup lang="ts">
import type { FieldErrorTextProps } from '@ark-ui/vue/field'
import type { HTMLAttributes } from 'vue'

import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends FieldErrorTextProps {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {})
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <ark.div
    data-scope="input"
    data-part="error"
    v-bind="forwardedProps"
    :class="cn('text-sm font-normal text-destructive', props.class)"
  >
    <slot />
  </ark.div>
</template>
