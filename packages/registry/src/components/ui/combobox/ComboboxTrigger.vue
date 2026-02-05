<script setup lang="ts">
import type { ComboboxTriggerProps } from '@ark-ui/vue/combobox'
import type { HTMLAttributes } from 'vue'

import { Combobox } from '@ark-ui/vue/combobox'
import { reactiveOmit } from '@vueuse/core'

import { useForwardExpose } from '@/composables/use-forward-expose'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends ComboboxTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
useForwardExpose()
</script>

<template>
  <Combobox.Trigger
    data-scope="combobox"
    data-part="trigger"
    v-bind="forwardedProps"
    :class="cn('', props.class)"
    tabindex="0"
  >
    <slot />
  </Combobox.Trigger>
</template>
