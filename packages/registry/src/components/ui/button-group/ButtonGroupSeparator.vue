<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { reactiveOmit } from '@vueuse/core'

import type { SeparatorProps } from '@/components/ui/separator'

import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface Props extends SeparatorProps {
  class?: HTMLAttributes['class']
  orientation?: SeparatorProps['orientation']
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'vertical',
})

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <Separator
    data-scope="button-group"
    data-part="separator"
    v-bind="delegatedProps"
    :orientation="props.orientation"
    :class="cn(
      `
        relative m-0! self-stretch bg-input
        data-[orientation=vertical]:h-auto
      `,
      props.class,
    )"
  />
</template>
