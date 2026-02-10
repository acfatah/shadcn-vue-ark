<script setup lang="ts">
import type { TagsInputRootEmits, TagsInputRootProps } from '@ark-ui/vue/tags-input'
import type { HTMLAttributes } from 'vue'

import { TagsInput } from '@ark-ui/vue/tags-input'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

interface Props extends TagsInputRootProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const emit = defineEmits<TagsInputRootEmits>()
const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emit)
</script>

<template>
  <TagsInput.Root
    v-slot="slotProps"
    data-scope="tags-input"
    data-part="root"
    v-bind="forwardedProps"
    :class="cn(
      `
        flex flex-wrap items-center gap-2 rounded-md border border-input bg-background px-2 py-1
        text-sm shadow-xs transition-[color,box-shadow] outline-none
      `,
      'focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50',
      `
        aria-invalid:border-destructive aria-invalid:ring-destructive/20
        dark:aria-invalid:ring-destructive/40
      `,
      props.class,
    )"
  >
    <slot v-bind="slotProps" />
  </TagsInput.Root>
</template>
