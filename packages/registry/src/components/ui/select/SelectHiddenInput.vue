<script setup lang="ts">
import type { SelectHiddenSelectProps } from '@ark-ui/vue/select'
import type { HTMLAttributes } from 'vue'

import { Select } from '@ark-ui/vue/select'
import { reactiveOmit } from '@vueuse/core'

import { useForwardExpose } from '@/composables/useForwardExpose'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import { useSelectContext } from './context'

interface Props extends SelectHiddenSelectProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
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
