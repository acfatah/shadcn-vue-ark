<script setup lang="ts">
import type { FieldRequiredIndicatorProps } from '@ark-ui/vue/field'
import type { HTMLAttributes } from 'vue'

import { Field } from '@ark-ui/vue/field'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

type Props = FieldRequiredIndicatorProps & {
  class?: HTMLAttributes['class']
}

defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<Props>(), {})
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Field.RequiredIndicator
    v-bind="forwardedProps"
    as-child
  >
    <span
      :class="cn(
        'text-xs leading-none font-normal text-destructive',
        props.class)"
    >
      <slot>*</slot>
    </span>
  </Field.RequiredIndicator>
</template>
