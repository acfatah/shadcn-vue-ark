<script setup lang="ts">
import type { ComboboxInputProps } from '@ark-ui/vue/combobox'
import type { HTMLAttributes } from 'vue'

import { Combobox } from '@ark-ui/vue/combobox'
import { SearchIcon } from 'lucide-vue-next'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props>()

interface Props extends ComboboxInputProps {
  class?: HTMLAttributes['class']
}

const forwardedProps = useForwardPropsEmits(props as Record<string, unknown>)
</script>

<template>
  <div
    data-scope="combobox"
    data-part="input-wrapper"
    class="flex h-9 items-center gap-2 border-b px-3"
  >
    <SearchIcon class="size-4 shrink-0 opacity-50" />
    <Combobox.Input
      data-scope="combobox"
      data-part="input"
      :class="cn(
        `
          flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden
          placeholder:text-muted-foreground
          disabled:cursor-not-allowed disabled:opacity-50
        `,
        props.class,
      )"
      v-bind="{ ...$attrs, ...forwardedProps }"
    >
      <slot />
    </Combobox.Input>
  </div>
</template>
