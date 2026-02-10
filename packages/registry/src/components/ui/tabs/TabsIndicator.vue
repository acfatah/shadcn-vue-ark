<script setup lang="ts">
import type { TabIndicatorProps } from '@ark-ui/vue/tabs'
import type { HTMLAttributes } from 'vue'

import { Tabs } from '@ark-ui/vue/tabs'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import { useTabsOptions } from './context'

interface Props extends TabIndicatorProps {
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
  <Tabs.Indicator
    data-scope="tabs"
    data-part="indicator"
    v-bind="forwardedProps"
    :class="cn(
      'pointer-events-none absolute z-0 hidden',
      'transition-[width,height,left,top] duration-200 ease-out',
      `data-[orientation=horizontal]:h-(--height) data-[orientation=horizontal]:w-(--width)`,
      'data-[orientation=vertical]:h-(--height) data-[orientation=vertical]:w-(--width)',
      options.variant === 'underline'
        ? 'bottom-0 block h-0.5 border-b-2 border-primary'
        : 'rounded-md bg-muted',
      props.class,
    )"
  />
</template>
