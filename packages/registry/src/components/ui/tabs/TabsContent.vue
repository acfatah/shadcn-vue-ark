<script setup lang="ts">
import type { TabContentProps } from '@ark-ui/vue/tabs'
import type { HTMLAttributes } from 'vue'

import { Tabs } from '@ark-ui/vue/tabs'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends TabContentProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Tabs.Content
    data-scope="tabs"
    data-part="content"
    v-bind="forwardedProps"
    :value="props.value"
    :class="cn(
      'flex-1 outline-none',
      props.class,
    )"
  >
    <slot />
  </Tabs.Content>
</template>
