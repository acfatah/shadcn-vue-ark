<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

type Orientation = 'horizontal' | 'vertical'

export interface Props {
  orientation?: Orientation
  decorative?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'horizontal',
  decorative: true,
})

const delegatedProps = reactiveOmit(props, ['class', 'decorative', 'orientation'])
const forwardedProps = useForwardPropsEmits(delegatedProps)
const role = computed(() => props.decorative ? 'none' : 'separator')
const ariaHidden = computed(() => props.decorative ? 'true' : undefined)
const ariaOrientation = computed(() => props.decorative ? undefined : props.orientation)
</script>

<template>
  <div
    v-bind="forwardedProps"
    data-scope="separator"
    :data-orientation="orientation"
    :role="role"
    :aria-hidden="ariaHidden"
    :aria-orientation="ariaOrientation"
    :class="cn(
      `
        shrink-0 bg-border
        data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full
        data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px
      `,
      props.class,
    )"
  />
</template>
