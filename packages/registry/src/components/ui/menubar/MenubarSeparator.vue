<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { Menu } from '@ark-ui/vue/menu'
import { reactiveOmit } from '@vueuse/core'

import { useForwardExpose } from '@/composables/useForwardExpose'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { MenuSeparatorProps } from './types'

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
    data-scope="menubar"
    data-part="separator"
    :class="cn(
      '-mx-1 my-1 h-px border-border',
      props.class,
    )"
  />
</template>
