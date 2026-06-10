<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { Editable } from '@ark-ui/vue/editable'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { EditableSubmitTriggerProps } from './types'

interface Props extends EditableSubmitTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Editable.SubmitTrigger
    v-bind="forwardedProps"
    :class="cn(
      '',
      props.class,
    )"
  >
    <slot />
  </Editable.SubmitTrigger>
</template>
