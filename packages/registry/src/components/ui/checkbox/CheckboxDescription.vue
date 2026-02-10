<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { reactiveOmit } from '@vueuse/core'

import type { DescriptionProps } from '@/components/ui/description'

import { Description } from '@/components/ui/description'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends DescriptionProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Description
    data-scope="checkbox"
    data-part="description"
    v-bind="forwardedProps"
    :class="cn(
      `
        text-sm text-muted-foreground
        data-disabled:opacity-50
      `,
      props.class,
    )"
  >
    <slot />
  </Description>
</template>
