import type { CollectionItem, ListCollection } from '@ark-ui/vue/listbox'
import type { ComputedRef, Ref } from 'vue'

import { createContext } from '@/composables/create-context'

export interface CommandItemData extends CollectionItem {
  value: string
  label: string
  disabled?: boolean
  keywords?: string[]
  groupId?: string
}

export interface CommandContext {
  search: Ref<string>
  selectedValue: Ref<string | null>
  collection: ComputedRef<ListCollection<CommandItemData>>
  items: Ref<Map<string, CommandItemData>>
  groups: Ref<Map<string, Set<string>>>
  registerItem: (item: CommandItemData) => void
  unregisterItem: (value: string) => void
  updateItemLabel: (value: string, label: string) => void
  setItemGroup: (value: string, groupId?: string) => void
  isItemVisible: (value: string) => boolean
  isGroupVisible: (groupId: string) => boolean
  getItem: (value: string) => CommandItemData | undefined
}

export interface CommandGroupContext {
  id?: string
}

export const [CommandProvider, useCommand]
  = createContext<CommandContext>('Command')

export const [CommandGroupProvider, useCommandGroup]
  = createContext<CommandGroupContext>('CommandGroup')
