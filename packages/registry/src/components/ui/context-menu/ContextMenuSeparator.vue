<script setup lang="ts">
import type { MenuSeparatorProps } from '@ark-ui/vue/menu'
import type { HTMLAttributes } from 'vue'

import { Menu } from '@ark-ui/vue/menu'
import { reactiveOmit } from '@vueuse/core'

import { useForwardExpose } from '@/composables/useForwardExpose'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends MenuSeparatorProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
useForwardExpose()
</script>

<template>
  <Menu.Separator
    v-bind="forwardedProps"
    data-scope="context-menu"
    data-part="separator"
    :class="cn(
      '-mx-1 my-1 h-px bg-border',
      props.class,
    )"
  />
</template>
