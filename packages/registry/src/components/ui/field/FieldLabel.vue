<script setup lang="ts">
import type { FieldLabelProps } from '@ark-ui/vue/field'
import type { HTMLAttributes } from 'vue'
import { Field } from '@ark-ui/vue/field'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

type Props = FieldLabelProps & {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {})
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Field.Label
    v-bind="forwardedProps"
    :class="cn(
      `
        flex items-center text-sm leading-none font-medium select-none
        group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50
        peer-disabled:cursor-not-allowed peer-disabled:opacity-50
      `,
      props.class,
    )"
  >
    <slot />
  </Field.Label>
</template>
