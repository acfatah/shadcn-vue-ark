<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { useSelectContext } from '@ark-ui/vue/select'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
const selectContext = useSelectContext()
const collection = computed(() => selectContext.value.collection)
</script>

<template>
  <div
    v-if="collection.size === 0"
    v-bind="forwardedProps"
    data-scope="select"
    data-part="empty"
    role="presentation"
    :class="cn(
      `
        pointer-events-none relative flex w-full cursor-default items-center gap-2 truncate
        rounded-sm py-1.5 pr-8 pl-2 text-sm opacity-50 outline-hidden select-none
        [&_svg]:pointer-events-none [&_svg]:shrink-0
        [&_svg:not([class*='size-'])]:size-4
        [&_svg:not([class*='text-'])]:text-muted-foreground
        *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2
      `,
      props.class,
    )"
  >
    <slot />
  </div>
</template>
