<script setup lang="ts">
import type { TabsRootEmits, TabsRootProps } from '@ark-ui/vue/tabs'
import type { HTMLAttributes } from 'vue'

import { Tabs } from '@ark-ui/vue/tabs'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends TabsRootProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const emit = defineEmits<TabsRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
</script>

<template>
  <Tabs.Root
    v-slot="slotProps"
    data-scope="tabs"
    data-part="root"
    v-bind="forwardedProps"
    :class="cn(
      'flex flex-col gap-2',
      props.class,
    )"
  >
    <slot v-bind="slotProps" />
  </Tabs.Root>
</template>
