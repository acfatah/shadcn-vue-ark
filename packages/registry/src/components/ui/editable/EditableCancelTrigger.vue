<script setup lang="ts">
import type { EditableCancelTriggerProps } from '@ark-ui/vue/editable'
import type { HTMLAttributes } from 'vue'

import { Editable } from '@ark-ui/vue/editable'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends EditableCancelTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Editable.CancelTrigger
    v-bind="forwardedProps"
    :class="cn(
      '',
      props.class,
    )"
  >
    <slot />
  </Editable.CancelTrigger>
</template>
