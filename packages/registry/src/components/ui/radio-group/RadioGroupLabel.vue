<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core'
import type { LabelProps } from '@/components/ui/label'
import { Label } from '@/components/ui/label'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

const props = defineProps<LabelProps>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Label
    data-scope="radio-group"
    data-part="label"
    v-bind="forwardedProps"
    :class="cn(
      `
        text-sm leading-none font-medium select-none
        data-disabled:opacity-50
      `,
      props.class,
    )"
  >
    <slot />
  </Label>
</template>
