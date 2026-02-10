<script setup lang="ts">
import type { TabTriggerProps } from '@ark-ui/vue/tabs'
import type { HTMLAttributes } from 'vue'

import { Tabs } from '@ark-ui/vue/tabs'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import { tabsTriggerVariants } from '.'
import { useTabsOptions } from './context'

interface Props extends TabTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const options = useTabsOptions(computed(() => ({
  variant: 'pill',
})))

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Tabs.Trigger
    data-scope="tabs"
    data-part="trigger"
    v-bind="forwardedProps"
    :value="props.value"
    :class="cn(
      tabsTriggerVariants({ variant: options.variant }),
      props.class,
    )"
  >
    <slot />
  </Tabs.Trigger>
</template>
