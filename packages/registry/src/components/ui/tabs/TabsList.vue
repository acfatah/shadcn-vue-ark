<script setup lang="ts">
import type { TabListProps } from '@ark-ui/vue/tabs'
import type { HTMLAttributes } from 'vue'

import { Tabs } from '@ark-ui/vue/tabs'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import { tabsListVariants } from '.'
import { useTabsOptions } from './context'

interface Props extends TabListProps {
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
  <Tabs.List
    data-scope="tabs"
    data-part="list"
    v-bind="forwardedProps"
    :class="cn(
      tabsListVariants({ variant: options.variant }),
      props.class,
    )"
  >
    <slot />
  </Tabs.List>
</template>
