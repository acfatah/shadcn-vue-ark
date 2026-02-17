<script setup lang="ts">
import type { FieldRootProviderProps } from '@ark-ui/vue/field'
import type { HTMLAttributes } from 'vue'

import { Field } from '@ark-ui/vue/field'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

type Props = FieldRootProviderProps & {
  class?: HTMLAttributes['class']
  value?: FieldRootProviderProps['value']
}

const props = withDefaults(defineProps<Props>(), {})
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Field.RootProvider
    v-bind="forwardedProps"
    :class="cn('', props.class)"
    :value="value"
  >
    <slot />
  </Field.RootProvider>
</template>
