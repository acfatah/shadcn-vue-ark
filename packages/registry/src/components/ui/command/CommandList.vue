<script setup lang="ts">
import type { ListboxContentProps } from '@ark-ui/vue/listbox'
import type { HTMLAttributes } from 'vue'

import { Listbox } from '@ark-ui/vue/listbox'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends ListboxContentProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Listbox.Content
    data-scope="command"
    data-part="list"
    v-bind="forwardedProps"
    :class="cn(
      'max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto',
      props.class,
    )"
  >
    <div role="presentation">
      <slot />
    </div>
  </Listbox.Content>
</template>
