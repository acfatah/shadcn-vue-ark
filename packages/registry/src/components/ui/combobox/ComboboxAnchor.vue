<script setup lang="ts">
import type { ComboboxControlProps } from '@ark-ui/vue/combobox'
import type { HTMLAttributes } from 'vue'

import { Combobox } from '@ark-ui/vue/combobox'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends ComboboxControlProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Combobox.Control
    data-scope="combobox"
    data-part="control"
    v-bind="forwardedProps"
    :class="cn(
      'w-[200px]',
      props.class
    )"
  >
    <slot />
  </Combobox.Control>
</template>
