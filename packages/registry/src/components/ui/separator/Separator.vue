<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

type Orientation = 'horizontal' | 'vertical'

interface Props {
  orientation?: Orientation
  decorative?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'horizontal',
  decorative: true,
})

const role = computed(() => props.decorative ? 'none' : 'separator')
const ariaHidden = computed(() => props.decorative ? 'true' : undefined)
const ariaOrientation = computed(() => props.decorative ? undefined : props.orientation)
</script>

<template>
  <div
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
