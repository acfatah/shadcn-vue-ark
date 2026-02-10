<script setup lang="ts">
import type { ComboboxEmptyProps } from '@ark-ui/vue/combobox'
import type { HTMLAttributes } from 'vue'

import { Combobox } from '@ark-ui/vue/combobox'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends ComboboxEmptyProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Combobox.Empty
    data-scope="combobox"
    data-part="empty"
    v-bind="forwardedProps"
    :class="cn(
      'py-6 text-center text-sm',
      props.class,
    )"
  >
    <slot />
  </Combobox.Empty>
</template>
