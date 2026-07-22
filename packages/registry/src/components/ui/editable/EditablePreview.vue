<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { EditablePreviewProps } from './types'

import { Editable } from '@ark-ui/vue/editable'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends EditablePreviewProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Editable.Preview
    v-bind="forwardedProps"
    :class="cn(
      `
        min-w-0 bg-transparent text-base outline-none
        data-placeholder-shown:text-muted-foreground
        md:text-sm
      `,
      props.class,
    )"
  />
</template>
