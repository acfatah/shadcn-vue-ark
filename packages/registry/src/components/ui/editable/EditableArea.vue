<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { EditableAreaProps } from './types'

import { Editable } from '@ark-ui/vue/editable'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends EditableAreaProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Editable.Area
    v-bind="forwardedProps"
    :class="cn(
      `
        data-focus:ring-none
        relative inline-block
      `,
      props.class,
    )"
  >
    <slot />
  </Editable.Area>
</template>
