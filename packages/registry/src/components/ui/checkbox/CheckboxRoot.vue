<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from '@ark-ui/vue/checkbox'
import type { HTMLAttributes } from 'vue'

import { Checkbox } from '@ark-ui/vue/checkbox'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { CheckboxVariants } from './types'

import { checkboxVariants } from './variant'

interface Props extends CheckboxRootProps {
  loading?: boolean
  class?: HTMLAttributes['class']
  variant?: CheckboxVariants['variant']
}

const props = defineProps<Props>()
const emit = defineEmits<CheckboxRootEmits>()
const delegatedProps = reactiveOmit(props, ['class', 'loading', 'variant'])
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
const disabled = computed(() => props.disabled || props.loading || undefined)
const ariaBusy = computed(() => (props.loading || undefined))
</script>

<template>
  <Checkbox.Root
    v-bind="forwardedProps"
    :disabled="disabled"
    :aria-busy="ariaBusy"
    :class="cn(
      checkboxVariants({ variant: props.variant }),
      props.class,
    )"
  >
    <slot />
  </Checkbox.Root>
</template>
