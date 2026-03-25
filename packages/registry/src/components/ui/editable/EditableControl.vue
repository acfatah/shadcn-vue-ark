<script setup lang="ts">
import type { EditableControlProps } from '@ark-ui/vue/editable'
import type { HTMLAttributes } from 'vue'

import { Editable } from '@ark-ui/vue/editable'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends EditableControlProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Editable.Control
    v-bind="forwardedProps"
    :class="cn(
      'flex items-center gap-2',
      props.class,
    )"
  >
    <slot />
  </Editable.Control>
</template>
