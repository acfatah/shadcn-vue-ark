<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { Editable } from '@ark-ui/vue/editable'
import { reactiveOmit } from '@vueuse/core'

import { Label } from '@/components/ui/label'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

import type { EditableLabelProps } from './types'

interface Props extends EditableLabelProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Editable.Label
    v-bind="forwardedProps"
    as-child
  >
    <Label :class="props.class">
      <slot />
    </Label>
  </Editable.Label>
</template>
