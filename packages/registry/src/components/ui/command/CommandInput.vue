<script setup lang="ts">
import type { ListboxInputProps } from '@ark-ui/vue/listbox'
import type { HTMLAttributes } from 'vue'

import { Listbox } from '@ark-ui/vue/listbox'
import { reactiveOmit } from '@vueuse/core'
import { Search } from 'lucide-vue-next'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

import { useCommand } from './context'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props>()

interface Props extends ListboxInputProps {
  class?: HTMLAttributes['class']
}

const delegatedProps = reactiveOmit(props, 'class') as Omit<Props, 'class'>
const forwardedProps = useForwardPropsEmits(delegatedProps)

const { search } = useCommand()

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement | null
  const value = target?.value ?? ''
  search.value = value
}
</script>

<template>
  <div
    data-scope="command"
    data-part="input-wrapper"
    class="flex h-9 items-center gap-2 border-b px-3"
  >
    <Search class="size-4 shrink-0 opacity-50" />
    <Listbox.Input
      v-bind="{ ...forwardedProps, ...$attrs }"
      :value="search"
      data-scope="command"
      data-part="input"
      autofocus
      :class="cn(
        `
          flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden
          placeholder:text-muted-foreground
          disabled:cursor-not-allowed disabled:opacity-50
        `,
        props.class,
      )"
      @input="handleInput"
    />
  </div>
</template>
