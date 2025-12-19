<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Dynamic } from '@/composables/dynamic'
import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
  asChild?: boolean
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, ['asChild', 'class'])
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <component
    :is="props.asChild ? Dynamic : 'label'"
    data-scope="label"
    v-bind="forwardedProps"
    :class="cn(
      `
        group/field-label peer/field-label flex w-fit items-center gap-2 text-sm leading-snug
        font-medium select-none
        group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50
        group-data-[disabled=true]/field:opacity-50
        peer-disabled:cursor-not-allowed peer-disabled:opacity-50
        has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5
        has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col
        has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border
        *:data-[slot=field]:p-4
        dark:has-data-[state=checked]:bg-primary/10
      `,
      props.class,
    )"
  >
    <slot />
  </component>
</template>
