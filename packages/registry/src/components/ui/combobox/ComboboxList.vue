<script setup lang="ts">
import type { ComboboxContentProps } from '@ark-ui/vue/combobox'
import type { HTMLAttributes } from 'vue'

import { Combobox } from '@ark-ui/vue/combobox'
import { reactiveOmit } from '@vueuse/core'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props>()

interface Props extends ComboboxContentProps {
  class?: HTMLAttributes['class']
}

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <Teleport to="body" defer>
    <Combobox.Positioner
      class="
        -mt-1.5 w-(--available-width) max-w-(--available-width)
        md:w-64 md:min-w-64
      "
    >
      <Combobox.Content
        data-scope="combobox"
        data-part="content"
        v-bind="{ ...$attrs, ...forwardedProps }"
        :class="cn(
          `
            z-50 w-full origin-(--transform-origin) overflow-hidden rounded-md border bg-popover
            text-popover-foreground shadow-md outline-none
          `,
          `
            data-[side=bottom]:slide-in-from-top-2
            data-[side=left]:slide-in-from-right-2
            data-[side=right]:slide-in-from-left-2
            data-[side=top]:slide-in-from-bottom-2
            data-[state=closed]:animate-out data-[state=closed]:fade-out-0
            data-[state=closed]:zoom-out-95
            data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
          `,
          props.class,
        )"
      >
        <slot />
      </Combobox.Content>
    </Combobox.Positioner>
  </Teleport>
</template>
