<script setup lang="ts">
import type { SwitchRootEmits, SwitchRootProps } from '@ark-ui/vue/switch'
import type { HTMLAttributes } from 'vue'

import { Switch } from '@ark-ui/vue/switch'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends SwitchRootProps {
  class?: HTMLAttributes['class']
  loading?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<SwitchRootEmits>()
const delegatedProps = reactiveOmit(props, ['class', 'disabled', 'loading'])
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)

const ariaDisabled = computed(() => props.disabled || props.loading || undefined)
const ariaBusy = computed(() => (props.loading || undefined))
</script>

<template>
  <Switch.Root
    :disabled="ariaDisabled"
    :aria-disabled="ariaDisabled"
    :aria-busy="ariaBusy"
    v-bind="forwardedProps"
    :class="cn(
      `
        inline-flex space-x-2 bg-transparent outline-none
        data-disabled:pointer-events-none data-disabled:opacity-50
      `,

      // Focus interaction on `data-part=control` when the `data-part=input` is
      // focused.
      `
        [&:focus-within_[data-part=control]]:border-ring
        [&:focus-within_[data-part=control]]:ring-[3px]
        [&:focus-within_[data-part=control]]:ring-ring/50
      `,
      props.class,
    )"
  >
    <slot />
  </Switch.Root>
</template>
