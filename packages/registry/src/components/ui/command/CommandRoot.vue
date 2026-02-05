<script setup lang="ts">
import type { ListboxRootEmits, ListboxRootProps } from '@ark-ui/vue/listbox'
import type { HTMLAttributes } from 'vue'

import {
  createListCollection,
  Listbox,
} from '@ark-ui/vue/listbox'
import { reactiveOmit } from '@vueuse/core'
import { computed, ref } from 'vue'

import { useForwardPropsEmits } from '@/composables/use-forward-props-emits'
import { cn } from '@/lib/utils'

import type { CommandItemData } from './context'

import { CommandProvider } from './context'

interface Props extends Omit<ListboxRootProps<CommandItemData>, 'collection'> {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const emits = defineEmits<ListboxRootEmits<CommandItemData>>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardPropsEmits(delegatedProps, emits)

const search = ref('')
const selectedValue = ref<string | null>(null)
const items = ref<Map<string, CommandItemData>>(new Map())
const groups = ref<Map<string, Set<string>>>(new Map())

const normalizedSearch = computed(() => search.value.trim().toLowerCase())

const visibleValues = computed(() => {
  if (!normalizedSearch.value)
    return new Set(items.value.keys())

  const result = new Set<string>()
  for (const item of items.value.values()) {
    const label = item.label || item.value
    const searchable = [label, ...(item.keywords ?? [])]
      .join(' ')
      .toLowerCase()

    if (searchable.includes(normalizedSearch.value))
      result.add(item.value)
  }

  return result
})

const visibleGroups = computed(() => {
  if (!normalizedSearch.value)
    return new Set(groups.value.keys())

  const result = new Set<string>()
  for (const [groupId, groupItems] of groups.value) {
    for (const value of groupItems) {
      if (visibleValues.value.has(value)) {
        result.add(groupId)
        break
      }
    }
  }

  return result
})

const collection = computed(() => {
  const filteredItems = Array.from(items.value.values())
    .filter(item => visibleValues.value.has(item.value))

  return createListCollection<CommandItemData>({
    items: filteredItems,
    itemToValue: item => item.value,
    itemToString: item => item.label,
    isItemDisabled: item => !!item.disabled,
  })
})

function registerItem(item: CommandItemData) {
  items.value.set(item.value, item)
  setItemGroup(item.value, item.groupId)
}

function unregisterItem(value: string) {
  items.value.delete(value)
  setItemGroup(value, undefined)
}

function updateItemLabel(value: string, label: string) {
  const current = items.value.get(value)
  if (!current)
    return

  current.label = label || current.label
  items.value.set(value, { ...current })
}

function setItemGroup(value: string, groupId?: string) {
  for (const [existingId, group] of groups.value) {
    if (group.has(value)) {
      group.delete(value)
      if (group.size === 0)
        groups.value.delete(existingId)
    }
  }

  if (!groupId)
    return

  if (!groups.value.has(groupId))
    groups.value.set(groupId, new Set())

  groups.value.get(groupId)?.add(value)
}

function isItemVisible(value: string) {
  if (!items.value.has(value))
    return true

  return visibleValues.value.has(value)
}

function isGroupVisible(groupId: string) {
  if (!normalizedSearch.value)
    return true

  return visibleGroups.value.has(groupId)
}

function getItem(value: string) {
  return items.value.get(value)
}

CommandProvider({
  search,
  selectedValue,
  collection,
  items,
  groups,
  registerItem,
  unregisterItem,
  updateItemLabel,
  setItemGroup,
  isItemVisible,
  isGroupVisible,
  getItem,
})

function handleValueChange(details: { value?: string[] }) {
  selectedValue.value = details.value?.[0] ?? null
}
</script>

<template>
  <Listbox.Root
    data-scope="command"
    data-part="root"
    v-bind="forwardedProps"
    :collection="collection"
    :class="cn(
      'flex size-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
      props.class,
    )"
    @value-change="handleValueChange"
  >
    <slot />
  </Listbox.Root>
</template>
