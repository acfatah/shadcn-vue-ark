<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { Switch } from '@ark-ui/vue/switch'
import { reactiveOmit } from '@vueuse/core'

import { Label } from '@/components/ui/label'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'

import type { SwitchLabelProps } from './types'

interface Props extends SwitchLabelProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Switch.Label v-bind="forwardedProps" as-child>
    <Label
      data-scope="switch"
      data-part="label"
      as="span"
      :class="props.class"
    >
      <slot />
    </Label>
  </Switch.Label>
</template>
