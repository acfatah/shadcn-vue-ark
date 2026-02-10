<script setup lang="ts">
import type { TabsRootEmits, TabsRootProps } from '@ark-ui/vue/tabs'
import type { HTMLAttributes } from 'vue'

import { Tabs } from '@ark-ui/vue/tabs'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { TabsVariant } from '.'

import { TabsOptionsProvider } from './context'

interface Props extends TabsRootProps {
  class?: HTMLAttributes['class']
  variant?: TabsVariant
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'pill',
})
const emit = defineEmits<TabsRootEmits>()

const options = computed(() => ({
  variant: props.variant,
}))

TabsOptionsProvider(options)

const delegatedProps = reactiveOmit(props, ['class', 'variant'])
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
</script>

<template>
  <Tabs.Root
    v-slot="slotProps"
    data-scope="tabs"
    data-part="root"
    :data-variant="props.variant"
    v-bind="forwardedProps"
    :class="cn(
      'group/tabs flex flex-col gap-2',
      props.class,
    )"
  >
    <slot v-bind="slotProps" />
  </Tabs.Root>
</template>
