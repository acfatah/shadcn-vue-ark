<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
  inline?: boolean
}

const props = withDefaults(defineProps<Props>(), {})
const delegatedProps = reactiveOmit(props, 'class', 'inline')
const forwardedProps = useForwardPropsEmits(delegatedProps)
const inline = computed(() => props.inline ? 'true' : 'false')
</script>

<template>
  <div
    v-bind="forwardedProps"
    data-scope="input-group"
    :data-inline="inline"
    :class="cn(
      'flex max-w-md flex-col gap-3',
      `md:data-[inline=true]:grid md:data-[inline=true]:grid-cols-3`,
      `md:data-[inline=true]:[&_[data-scope=input][data-part=label]]:col-span-1`,
      `md:data-[inline=true]:**:data-[scope$='-input']:col-span-2`,
      `
        md:data-[inline=true]:[&_[data-scope=input][data-part=description]]:col-span-2
        md:data-[inline=true]:[&_[data-scope=input][data-part=description]]:col-start-2
      `,
      `
        md:data-[inline=true]:[&_[data-scope=input][data-part=error]]:col-span-2
        md:data-[inline=true]:[&_[data-scope=input][data-part=error]]:col-start-2
      `,
      props.class,
    )"
  >
    <slot />
  </div>
</template>
