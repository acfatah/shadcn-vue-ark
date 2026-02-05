<script setup lang="ts">
import type { ListboxEmptyProps } from '@ark-ui/vue/listbox'
import type { HTMLAttributes } from 'vue'

import { Listbox } from '@ark-ui/vue/listbox'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends ListboxEmptyProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Listbox.Empty
    data-scope="command"
    data-part="empty"
    v-bind="forwardedProps"
    :class="cn(
      'py-6 text-center text-sm',
      props.class,
    )"
  >
    <slot />
  </Listbox.Empty>
</template>
