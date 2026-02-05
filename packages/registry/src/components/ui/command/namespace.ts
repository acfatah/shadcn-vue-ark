import CommandDialog from './CommandDialog.vue'
import CommandEmpty from './CommandEmpty.vue'
import CommandGroup from './CommandGroup.vue'
import CommandInput from './CommandInput.vue'
import CommandItem from './CommandItem.vue'
import CommandList from './CommandList.vue'
import CommandRoot from './CommandRoot.vue'
import CommandSeparator from './CommandSeparator.vue'
import CommandShortcut from './CommandShortcut.vue'

export const Command = {
  /**
   * CommandRoot component
   */
  Root: CommandRoot,

  /**
   * CommandDialog component
   *
   * Dialog wrapper for the command palette
   */
  Dialog: CommandDialog,

  /**
   * CommandInput component
   *
   * Search input used to filter items
   */
  Input: CommandInput,

  /**
   * CommandList component
   *
   * Scrollable container for command items
   */
  List: CommandList,

  /**
   * CommandEmpty component
   *
   * Empty state shown when no results match
   */
  Empty: CommandEmpty,

  /**
   * CommandGroup component
   *
   * Groups related command items
   */
  Group: CommandGroup,

  /**
   * CommandItem component
   *
   * Represents a selectable command
   */
  Item: CommandItem,

  /**
   * CommandSeparator component
   *
   * Visual divider between groups
   */
  Separator: CommandSeparator,

  /**
   * CommandShortcut component
   *
   * Displays keyboard shortcuts for items
   */
  Shortcut: CommandShortcut,
}
