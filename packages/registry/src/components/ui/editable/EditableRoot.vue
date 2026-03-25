<script setup lang="ts">
import type { EditableRootEmits, EditableRootProps } from '@ark-ui/vue/editable'
import type { HTMLAttributes } from 'vue'

import { Editable } from '@ark-ui/vue/editable'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends EditableRootProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const emit = defineEmits<EditableRootEmits>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
</script>

<template>
  <Editable.Root
    v-bind="forwardedProps"
    :class="cn('inline-flex flex-col gap-1.5', props.class)"
  >
    <slot />
  </Editable.Root>
</template>
