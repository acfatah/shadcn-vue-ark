<script setup lang="ts">
import type { DialogTitleProps } from '@ark-ui/vue/dialog'
import type { HTMLAttributes } from 'vue'

import { Dialog } from '@ark-ui/vue/dialog'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends DialogTitleProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Dialog.Title
    v-bind="forwardedProps"
    data-scope="dialog"
    data-part="title"
    :class="cn(
      'text-lg leading-none font-semibold',
      props.class,
    )"
  >
    <slot />
  </Dialog.Title>
</template>
