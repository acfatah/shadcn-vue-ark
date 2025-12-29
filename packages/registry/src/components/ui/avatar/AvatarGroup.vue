<script setup lang="ts">
import type { PolymorphicProps } from '@ark-ui/vue'
import type { HTMLAttributes } from 'vue'
import { ark } from '@ark-ui/vue'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props extends PolymorphicProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <ark.div
    data-scope="avatar"
    data-part="group"
    v-bind="forwardedProps"
    :class="cn(`
      flex -space-x-2
      *:data-[scope=avatar]:ring-2 *:data-[scope=avatar]:ring-background
      *:data-[scope=avatar]:grayscale
    `, props.class)"
  >
    <slot />
  </ark.div>
</template>
