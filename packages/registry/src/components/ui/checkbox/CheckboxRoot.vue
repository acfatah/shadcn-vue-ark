<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from '@ark-ui/vue/checkbox'
import type { HTMLAttributes } from 'vue'
import { Checkbox } from '@ark-ui/vue/checkbox'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

type Props = CheckboxRootProps & {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const emit = defineEmits<CheckboxRootEmits>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
</script>

<template>
  <Checkbox.Root
    v-bind="forwardedProps"
    :class="cn(`
      group flex gap-3
      disabled:opacity-50
      has-data-[part=checkbox-content]:items-start
    `, props.class)"
  >
    <slot />
  </Checkbox.Root>
</template>
