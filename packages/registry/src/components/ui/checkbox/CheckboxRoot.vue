<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from '@ark-ui/vue/checkbox'
import type { HTMLAttributes } from 'vue'

import { Checkbox } from '@ark-ui/vue/checkbox'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends CheckboxRootProps {
  loading?: boolean
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const emit = defineEmits<CheckboxRootEmits>()
const delegatedProps = reactiveOmit(props, ['class', 'loading'])
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
const disabled = computed(() => props.disabled || props.loading || undefined)
const ariaBusy = computed(() => (props.loading || undefined))
</script>

<template>
  <Checkbox.Root
    v-bind="forwardedProps"
    :disabled="disabled"
    :aria-busy="ariaBusy"
    :class="cn(`
      group flex gap-3
      has-data-[part=checkbox-content]:items-start
      data-disabled:pointer-events-none data-disabled:opacity-50
    `, props.class)"
  >
    <slot />
  </Checkbox.Root>
</template>
