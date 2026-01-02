<script setup lang="ts">
import type { SelectHiddenSelectProps } from '@ark-ui/vue/select'
import type { HTMLAttributes } from 'vue'
import { Select } from '@ark-ui/vue/select'
import { useForwardExpose } from '@/composables/use-forward-expose'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'
import { useSelectContext } from '.'

interface Props extends SelectHiddenSelectProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const forwardedProps = useForwardPropsEmits(props)
const selectContext = useSelectContext()
useForwardExpose()
</script>

<template>
  <Select.HiddenSelect
    v-bind="forwardedProps"
    :class="cn(
      `peer sr-only`,
      props.class,
    )"
    @invalid="selectContext.setNativeInvalid()"
    @change="selectContext.setNativeInvalid(false)"
  >
    <slot />
  </Select.HiddenSelect>
</template>
