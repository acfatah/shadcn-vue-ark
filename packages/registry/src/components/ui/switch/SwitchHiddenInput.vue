<script setup lang="ts">
import type { SwitchHiddenInputProps } from '@ark-ui/vue/switch'
import type { HTMLAttributes } from 'vue'

import { Switch } from '@ark-ui/vue/switch'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends SwitchHiddenInputProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Switch.HiddenInput
    data-scope="switch"
    data-part="input"
    v-bind="forwardedProps"
    :class="cn(`peer sr-only`, props.class)"
  >
    <slot />
  </Switch.HiddenInput>
</template>
