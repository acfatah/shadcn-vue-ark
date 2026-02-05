<script setup lang="ts">
import type { ListboxItemGroupProps } from '@ark-ui/vue/listbox'
import type { HTMLAttributes } from 'vue'

import { Listbox } from '@ark-ui/vue/listbox'
import { reactiveOmit } from '@vueuse/core'
import { computed, onMounted, onUnmounted, useId } from 'vue'

import { cn } from '@/lib/utils'

import { CommandGroupProvider, useCommand } from './context'

interface Props extends ListboxItemGroupProps {
  class?: HTMLAttributes['class']
  heading?: string
}

const props = defineProps<Props>()
const delegatedProps = reactiveOmit(props, 'class', 'heading')

const { groups, isGroupVisible } = useCommand()
const id = props.id ?? useId()

const isRender = computed(() => isGroupVisible(id))

CommandGroupProvider({ id })
onMounted(() => {
  if (!groups.value.has(id))
    groups.value.set(id, new Set())
})
onUnmounted(() => {
  groups.value.delete(id)
})
</script>

<template>
  <Listbox.ItemGroup
    v-bind="delegatedProps"
    :id="id"
    data-scope="command"
    data-part="group"
    :class="cn(
      'overflow-hidden p-1 text-foreground',
      props.class,
    )"
    :hidden="isRender ? undefined : true"
  >
    <Listbox.ItemGroupLabel
      v-if="heading"
      data-scope="command"
      data-part="group-heading"
      class="px-2 py-1.5 text-xs font-medium text-muted-foreground"
    >
      {{ heading }}
    </Listbox.ItemGroupLabel>
    <slot />
  </Listbox.ItemGroup>
</template>
