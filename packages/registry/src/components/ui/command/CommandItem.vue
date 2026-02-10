<script setup lang="ts">
import type { ListboxItemProps } from '@ark-ui/vue/listbox'
import type { HTMLAttributes } from 'vue'

import { Listbox } from '@ark-ui/vue/listbox'
import { reactiveOmit, useCurrentElement } from '@vueuse/core'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

import { useForwardExpose } from '@/composables/useForwardExpose'
import { useForwardPropsEmits } from '@/composables/useForwardPropsEmits'
import { cn } from '@/lib/utils'

import type { CommandItemData } from './context'

import { useCommand, useCommandGroup } from './context'

interface Props extends Omit<ListboxItemProps, 'item'> {
  value: string
  disabled?: boolean
  textValue?: string
  keywords?: string[]
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const emits = defineEmits<{
  (e: 'select', payload: { detail: { value: string } }): void
}>()

const delegatedProps = reactiveOmit(props, [
  'class',
  'value',
  'textValue',
  'keywords',
])

const forwardedProps = useForwardPropsEmits(delegatedProps)

const command = useCommand()
const groupContext = useCommandGroup()

const itemRef = ref()
const currentElement = useCurrentElement(itemRef)

const item = computed<CommandItemData>(() => {
  const existing = command.getItem(props.value)
  const label = existing?.label ?? props.textValue ?? props.value

  return {
    value: props.value,
    label,
    disabled: props.disabled ?? existing?.disabled,
    keywords: props.keywords ?? existing?.keywords,
    groupId: groupContext?.id ?? existing?.groupId,
  }
})

const isRender = computed(() => command.isItemVisible(props.value))

function register() {
  command.registerItem(item.value)
}

function unregister(value: string) {
  command.unregisterItem(value)
}

register()
watch(() => props.value, (nextValue, prevValue) => {
  if (prevValue && prevValue !== nextValue)
    unregister(prevValue)

  register()
})
watch(() => [props.disabled, props.textValue, props.keywords, groupContext?.id], register)

onMounted(() => {
  if (props.textValue)
    return

  if (!(currentElement.value instanceof HTMLElement))
    return

  command.updateItemLabel(
    props.value,
    currentElement.value.textContent ?? props.value,
  )
})

onUnmounted(() => {
  unregister(props.value)
})

useForwardExpose()

watch(() => command.selectedValue.value, (nextValue) => {
  if (nextValue !== props.value)
    return

  command.search.value = ''
  emits('select', { detail: { value: props.value } })
})
</script>

<template>
  <Listbox.Item
    v-if="isRender"
    ref="itemRef"
    data-scope="command"
    data-part="item"
    v-bind="forwardedProps"
    :item="item"
    :data-disabled="item.disabled || undefined"
    :class="cn(
      `
        relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm
        outline-hidden select-none
      `,
      'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
      'data-disabled:pointer-events-none data-disabled:opacity-50',
      `
        [&_svg]:pointer-events-none [&_svg]:shrink-0
        [&_svg:not([class*='size-'])]:size-4
        [&_svg:not([class*='text-'])]:text-muted-foreground
      `,
      props.class,
    )"
  >
    <slot />
  </Listbox.Item>
</template>
