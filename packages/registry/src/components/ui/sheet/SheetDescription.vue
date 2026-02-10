<script setup lang="ts">
import type { DialogDescriptionProps } from '@ark-ui/vue/dialog'
import type { HTMLAttributes } from 'vue'

import { Dialog } from '@ark-ui/vue/dialog'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends DialogDescriptionProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Dialog.Description
    v-bind="forwardedProps"
    data-scope="sheet"
    data-part="description"
    :class="cn('text-sm text-muted-foreground', props.class)"
  >
    <slot />
  </Dialog.Description>
</template>
