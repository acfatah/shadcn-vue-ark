<script setup lang="ts">
import type { SelectValueTextProps } from '@ark-ui/vue/select'
import type { HTMLAttributes } from 'vue'
import { Select, useSelectContext } from '@ark-ui/vue/select'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'
import { useForwardExpose } from '@/composables/use-forward-expose'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends SelectValueTextProps {
  placeholder?: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select an option',
})

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
const selectContext = useSelectContext()

const mergedProps = computed(() => ({
  ...forwardedProps.value,
  ...selectContext.value.getValueTextProps(),
}))

const dir = computed(() => selectContext.value.getValueTextProps().dir)
useForwardExpose()
</script>

<template>
  <Select.ValueText
    v-bind="mergedProps"
    :placeholder="props.placeholder"
    :class="cn(
      'truncate',
      dir === 'rtl' ? 'ml-4' : 'mr-4',
      props.class,
    )"
  >
    <slot>{{ selectContext.valueAsString || props.placeholder }}</slot>
  </Select.ValueText>
</template>
