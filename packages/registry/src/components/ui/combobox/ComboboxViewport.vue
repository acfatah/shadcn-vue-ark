<script setup lang="ts">
import type { ComboboxListProps } from '@ark-ui/vue/combobox'
import type { HTMLAttributes } from 'vue'

import { Combobox } from '@ark-ui/vue/combobox'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends ComboboxListProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Combobox.List
    data-scope="combobox"
    data-part="list"
    v-bind="forwardedProps"
    :class="cn(
      'max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto',
      props.class,
    )"
  >
    <slot />
  </Combobox.List>
</template>
