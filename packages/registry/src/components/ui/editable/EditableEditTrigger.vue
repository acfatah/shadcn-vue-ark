<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { Editable } from '@ark-ui/vue/editable'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { EditableEditTriggerProps } from './types'

interface Props extends EditableEditTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Editable.EditTrigger
    v-bind="forwardedProps"
    :class="cn(
      '',
      props.class,
    )"
    as-child
  >
    <slot :class="props.class" />
  </Editable.EditTrigger>
</template>
