<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { Progress } from '@ark-ui/vue/progress'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { ProgressRootEmits, ProgressRootProps } from './types'

interface Props extends ProgressRootProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const emit = defineEmits<ProgressRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
</script>

<template>
  <Progress.Root
    v-bind="forwardedProps"
    :class="cn(
      'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
      props.class,
    )"
  >
    <Progress.Track class="size-full">
      <Progress.Range class="size-full flex-1 bg-primary transition-all" />
    </Progress.Track>
  </Progress.Root>
</template>
